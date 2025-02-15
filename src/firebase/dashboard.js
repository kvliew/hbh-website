// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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

// Get VARs
const logout = document.getElementById("signout");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log(user.email);
    // ...
  } else {
    console.log('Your are logged out!');
    window.location.href = "/login";
  }
});

logout.addEventListener("click", function(e) {
  signOut(auth);
  console.log("User signed out successfully");
  window.location.href = "/login";
});
