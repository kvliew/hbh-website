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

// Fetch User Details
const uid = user.uid;
const userDocRef = doc(db, "users", uid);
const userDocSnap = await getDoc(userDocRef);

// Fetch Perks
async function fetchPerks() {
  const perksGrid = document.getElementById("perks-container");
  const perksCollection = collection(db, "perks");

  try {
    const querySnapshot = await getDocs(perksCollection);
    const perksGrid = document.getElementById('perks-container');

    querySnapshot.forEach((doc) => {
      const perk = doc.data();
      const perkElement = document.createElement('li');
      perkElement.classList.add('perk-item');

      // Create and append the perk name (h3)
      const perkName = document.createElement('h3');
      perkName.textContent = perk.Name;
      perkElement.appendChild(perkName);
      console.log(perk.Name);

      // Create and append the perk description (p)
      const perkDescription = document.createElement('p');
      perkDescription.textContent = perk.Description;
      perkElement.appendChild(perkDescription);
      console.log(perk.Description);

      // Create button
      const redeemButton = document.createElement('button');
      redeemButton.textContent = "Redeem Perk";
      perkElement.appendChild(redeemButton);

      // Handle Perk Redemption
      redeemButton.addEventListener('click', async() => {
        const response = await fetch("/.netlify/functions/redeem-perk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              userEmail: userDocSnap.data().email, // Fetch authenticated user's email
              perkName: perk.Name,
              perkDescription: perk.Description,
              providerEmail: perk.email, // This stays hidden on the server side
          }),
      });
      const result = await response.json();
      alert(result.message);
      });

      // Append the new list item to the grid
      perksGrid.appendChild(perkElement);
    });
  } catch(error) {
    console.error("Error fetching perks: ", error);
  }
}

// Get User Details
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
    try {

      if(userDocSnap.exists()) {
        console.log(userDocSnap.data());
        document.getElementById("first-name").textContent = userDocSnap.data().firstName;
        document.getElementById("building-stage").textContent = userDocSnap.data().buildingStage;
      } else {
        console.log("No user found");
      }
    } catch(error) {
      console.error("Error Fetching: " + error.message)
    }

    fetchPerks();

    dashboardContent.style.display = "flex";
    loading.style.display = "none";

  } else {
    window.location.href = "/login";
  }
});

logout.addEventListener("click", function(e) {
  signOut(auth);
  // window.location.href = "/login";
});
