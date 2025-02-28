// Import the functions you need from the SDKs you need
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const login = document.getElementById("login-button");
const loginStatus = document.getElementById("login-status");

// Login User
login.addEventListener("click", function(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorMessages = {
        "auth/invalid-credential": "Invalid credentials. Please try again.",
        "auth/invalid-email": "Invalid Email. Please try again",
      };
      loginStatus.textContent = errorMessages[errorCode] || "Login failed. Please try again.";
      loginStatus.style.color = "red";
      console.log(errorCode);
      console.log(errorMessage);
    });
});
