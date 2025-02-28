import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Reset Password
document.getElementById("reset-password-button").addEventListener("click", function (event) {
  event.preventDefault();
  const resetEmail = document.getElementById("reset-email").value;

  sendPasswordResetEmail(auth, resetEmail)
    .then(() => {
      document.getElementById("reset-message").textContent = "Password reset email sent! Check your inbox.";
      document.getElementById("reset-message").style.color = "green";
    })
    .catch((error) => {
      document.getElementById("reset-message").textContent = error.message;
      document.getElementById("reset-message").style.color = "red";
    });
});
