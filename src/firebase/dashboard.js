// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, getDoc, updateDoc, arrayUnion, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Server variables
const logout = document.getElementById("signout");
const loading = document.getElementById("loading");
const dashboardContent = document.getElementById("dashboard-content");

// Front End Redemption Form
// Hide redemption form when clicking outside the form
const overlay = document.getElementById("overlay");
const close = document.getElementById("close-redemption-form");
const submitRedemption = document.getElementById("submit-redemption");
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    overlay.style.display = "none";
  }
});
close.addEventListener("click", (event) => {
  overlay.style.display = "none";
});
// Store redemption form fields in variables
const firstNameForm = document.getElementById("first-name");
const lastNameForm = document.getElementById("last-name");
const regionForm = document.getElementById("region");
const buildingStageForm = document.getElementById("building-stage");
const buyerTypeForm = document.getElementById("buyer-type");
const mobileNumberForm = document.getElementById("mobile-number");
const signupEmailForm = document.getElementById("signup-email");

// API endpoint
const baseUrl = window.location.origin;
const apiEndPoint = `${baseUrl}/.netlify/functions/sendPerkRedemption`

let currentUserId = null;

// Get User Details
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    // Fetch User Details
    currentUserId = user.uid;
    const userDocRef = doc(db, "users", currentUserId);
    
    try {
      const userDocSnap = await getDoc(userDocRef);
      if(userDocSnap.exists()) {
        console.log(userDocSnap.data());
        document.getElementById("welcome-name").textContent = userDocSnap.data().firstName;
        document.getElementById("welcome-building-stage").textContent = userDocSnap.data().buildingStage;
        fetchPerks(userDocSnap);
      } else {
        console.log("No user found");
      }
    } catch(error) {
      console.error("Error Fetching: " + error.message)
    }

    dashboardContent.style.display = "flex";
    loading.style.display = "none";

  } else {
    window.location.href = "/login";
  }
});

// Fetch Perks
async function fetchPerks(userDocSnap) {
  const perksCollection = collection(db, "perks");

  try {
    const querySnapshot = await getDocs(perksCollection);
    const perksGrid = document.getElementById('perks-container');

    querySnapshot.forEach((doc) => {
      const perk = doc.data();
      const perkId = doc.id;
      const perkElement = document.createElement('li');
      perkElement.classList.add('perk-item');

      // Create and append the company name (h1)
      const perkCompany = document.createElement('h1');
      perkCompany.textContent = perk.company;
      perkElement.appendChild(perkCompany);

      // Create and append the perk name (h3)
      const perkName = document.createElement('h3');
      perkName.textContent = perk.name;
      perkElement.appendChild(perkName);

      // Create and append the perk description (p)
      const perkDescription = document.createElement('p');
      perkDescription.textContent = perk.description;
      perkElement.appendChild(perkDescription);

      // Create button CONDITIONAL
      if (perk.redeemedBy && perk.redeemedBy.includes(currentUserId)) {
        // User has already redeemed the perk, show message
        const redeemedMessage = document.createElement('p');
        redeemedMessage.textContent = "Perk Redeemed";
        redeemedMessage.classList.add('redeemed-message');
        perkElement.appendChild(redeemedMessage);
      } else {
        // User has not redeemed the perk, create the redeem button
        const redeemButton = document.createElement('button');
        redeemButton.textContent = "Redeem Perk";
        perkElement.appendChild(redeemButton);

        // Handle redemption
        redeemButton.addEventListener('click', async() => {
          openRedemptionForm(perk.name, perk.description, perk.contactEmail, userDocSnap, perkId);
        });
      }

      // Append the new list item to the grid
      perksGrid.appendChild(perkElement);
    });
  } catch(error) {
    console.error("Error fetching perks: ", error);
  }
}


function openRedemptionForm(perkName, perkDescription, perkEmail, userDocSnap, perkId) {
  overlay.style.display = "flex";

  // Pre fill user details
  firstNameForm.value = userDocSnap.data().firstName;
  lastNameForm.value = userDocSnap.data().lastName;
  regionForm.value = userDocSnap.data().region;
  buildingStageForm.value = userDocSnap.data().buildingStage;
  buyerTypeForm.value = userDocSnap.data().buyerType;
  mobileNumberForm.value = userDocSnap.data().mobileNumber;
  signupEmailForm.value = userDocSnap.data().email;

  // Store the perk data for submission
  overlay.dataset.perkName = perkName;
  overlay.dataset.perkDescription = perkDescription;
  overlay.dataset.perkEmail = perkEmail;
  overlay.dataset.perkId = perkId;
}

// Handle Redemption
submitRedemption.addEventListener('click', async(event) => {
  event.preventDefault();

  const perkRef = doc(db, "perks", overlay.dataset.perkId);
  await updateDoc(perkRef, {
    redeemedBy: arrayUnion(currentUserId)
  });

  try {
    const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName: firstNameForm.value,
            lastName: lastNameForm.value,
            region: regionForm.value,
            buildingStage: buildingStageForm.value,
            buyerType: buyerTypeForm.value,
            mobileNumber: mobileNumberForm.value,
            userEmail: signupEmailForm.value,
            perkName: overlay.dataset.perkName,
            perkDescription: overlay.dataset.perkDescription,
            providerEmail: overlay.dataset.perkEmail,
        }),
    });

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      // If response status is not OK (not in the 2xx range), throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    overlay.style.display = "none";
    window.location.reload();
  } catch (error) {
    console.error('There was an error!', error);
    alert('There was an error processing your perk redemption. Please try again later.');
  }
});

// Handle Logout
logout.addEventListener("click", function(e) {
  signOut(auth);
});