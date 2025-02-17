// Import the functions you need from the SDKs you need
import { firebaseConfig } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Store form elements
const submit = document.getElementById("register-button");
const form = document.getElementById("register-form");

// Handle pressing enter on register form
form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
      e.preventDefault();
      submit.click();
      console.log('clicked');
  }
});

// Register new user
submit.addEventListener("click", async (e) => {
  e.preventDefault();

  // Capture user input
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const region = document.getElementById("region").value;
  const buildingStage = document.getElementById("building-stage").value;
  const buyerType = document.getElementById("buyer-type").value;
  const mobileNumber = document.getElementById("mobile-number").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    // Add new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User Created');

    // Store user data in 'users' collection
    await setDoc (doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      region: region,
      buildingStage: buildingStage,
      buyerType: buyerType,
      mobileNumber: mobileNumber,
      email: email,
    });
    console.log("User data added to Firestore successfully!");
    window.location.href = "/dashboard";
  } catch(error) {
    console.error("Error during registration:", error.message);
    alert(error.message);
  }
});