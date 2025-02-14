// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const login = document.getElementById("login-button");

// Register new user
login.addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      userCredential.user;
      alert('logging in');
      window.location.href = "/perks";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
});
