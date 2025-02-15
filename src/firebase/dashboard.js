// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get VARs
const logout = document.getElementById("signout");
const loading = document.getElementById("loading");
const dashboardContent = document.getElementById("dashboard-content");

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    dashboardContent.style.display = "flex";
    loading.style.display = "none";
  } else {
    window.location.href = "/login";
  }
});

logout.addEventListener("click", function(e) {
  signOut(auth);
  console.log("User signed out successfully");
  window.location.href = "/login";
});
