// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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
const submit = document.getElementById("register-button");

// Register new user
submit.addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const state = document.getElementById("state").value;
  const buildingStage = document.getElementById("building-stage").value;
  
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      const docRef = addDoc(collection(db, "users"), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        state: state,
        buildingStage: buildingStage,
      });
    console.log('registration successful');
    window.location.href = "/dashboard";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
});
