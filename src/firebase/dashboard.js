// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, getDoc, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get VARs
const logout = document.getElementById("signout");
const loading = document.getElementById("loading");
const dashboardContent = document.getElementById("dashboard-content");

// User Variables


// Get User Details
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    // Fetch User Details
    const uid = user.uid;
    const userDocRef = doc(db, "users", uid);
    
    try {
      const userDocSnap = await getDoc(userDocRef);
      const userEmail = userDocSnap.data().email;
      if(userDocSnap.exists()) {
        console.log(userDocSnap.data());
        document.getElementById("first-name").textContent = userDocSnap.data().firstName;
        document.getElementById("building-stage").textContent = userDocSnap.data().buildingStage;
        fetchPerks(userEmail);
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
async function fetchPerks(userEmail) {
  const perksGrid = document.getElementById("perks-container");
  const perksCollection = collection(db, "perks");

  try {
    const querySnapshot = await getDocs(perksCollection);
    const perksGrid = document.getElementById('perks-container');

    querySnapshot.forEach((doc) => {
      const perk = doc.data();
      console.log(perk.contactEmail);
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

      // Create button
      const redeemButton = document.createElement('button');
      redeemButton.textContent = "Redeem Perk";
      perkElement.appendChild(redeemButton);

      // Handle Perk Redemption
      const baseUrl = window.location.origin;
      const apiEndPoint = `${baseUrl}/.netlify/functions/sendPerkRedemption`
      redeemButton.addEventListener('click', async() => {
        try {
          const response = await fetch(apiEndPoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  userEmail: userEmail,
                  perkName: perk.name,
                  perkDescription: perk.description,
                  providerEmail: perk.contactEmail,
                  id: doc.id,
              }),
          });
  
          // Check if the response is not OK (e.g., 4xx or 5xx errors)
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const result = await response.json();
          alert(result.message);
      } catch (error) {
          // Log the error message to the console and show a user-friendly message
          console.error('There was an error!', error);
          alert('There was an error processing your perk redemption. Please try again later.');
      }
      });

      // Append the new list item to the grid
      perksGrid.appendChild(perkElement);
    });
  } catch(error) {
    console.error("Error fetching perks: ", error);
  }
}

logout.addEventListener("click", function(e) {
  signOut(auth);
  // window.location.href = "/login";
});
