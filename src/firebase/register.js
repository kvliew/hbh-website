// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMCwQhx4iXdzo9Hu7LFUcuAcbvQNq4KVI",
  authDomain: "home-building-hub.firebaseapp.com",
  projectId: "home-building-hub",
  storageBucket: "home-building-hub.firebasestorage.app",
  messagingSenderId: "119388808309",
  appId: "1:119388808309:web:2454604d19c9f1bc69043c",
  measurementId: "G-XV8EVLYX5E"
};

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
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const state = document.getElementById("state").value;
  const buildingStage = document.getElementById("building-stage").value;

  try {
    // Add new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User Created');

    // Store user data in 'users' collection
    await setDoc (doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      state: state,
      buildingStage: buildingStage,
    });
    console.log("User data added to Firestore successfully!");
  } catch(error) {
    console.error("Error during registration:", error.message);
    alert(error.message);
  }
  window.location.href = "/dashboard";
});
