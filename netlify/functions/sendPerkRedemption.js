const sgMail = require('@sendgrid/mail');
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
// import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// This will fetch the SendGrid API key from the Netlify environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initialise Firestore
// const firebaseConfig = {
//   apiKey: "AIzaSyCMCwQhx4iXdzo9Hu7LFUcuAcbvQNq4KVI",
//   authDomain: "home-building-hub.firebaseapp.com",
//   projectId: "home-building-hub",
//   storageBucket: "home-building-hub.firebasestorage.app",
//   messagingSenderId: "119388808309",
//   appId: "1:119388808309:web:2454604d19c9f1bc69043c",
//   measurementId: "G-XV8EVLYX5E"
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

exports.handler = async (event, context) => {
  // Check if the request is a POST
  if (event.httpMethod === 'POST') {
    // const perkRef = doc(db, "perks", id);
    // const perkSnap = await getDoc(perkRef);

    const { userEmail, perkName, perkDescription, providerEmail, id } = JSON.parse(event.body);

    const headers = {
      "Access-Control-Allow-Origin": "*", // Allows all origins, adjust if needed
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
  
    if (event.httpMethod === "OPTIONS") {
      // Handle OPTIONS request for pre-flight check
      return {
        statusCode: 200,
        headers,
        body: "",
      };
    }

    // Create the email content
    const msg = {
      to: providerEmail,
      cc: 'hello@homebuildinghub.com.au',
      from: 'hello@homebuildinghub.com.au',
      subject: `New Perk Redemption: ${perkName}`,
      text: `A user has redeemed the perk: ${perkName}.\n\nDescription: ${perkDescription}\n\nUser's email: ${userEmail}`,
      html: `<p>A user has redeemed the perk: <strong>${perkName}</strong>.</p><p>Description: ${perkDescription}</p><p><strong>User's email:</strong> ${userEmail}</p>`,
    };

    try {
      // Send the email using SendGrid
      await sgMail.send(msg);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully!' }),
      };
    } catch (error) {
      console.error('Error sending email:', error);
      let errorMessage = 'An unknown error occurred.';
      if (error.response) {
        errorMessage = error.response.body;
      } else {
        errorMessage = error.message || errorMessage;
      }
      console.log(errorMessage);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: errorMessage }),
      };
    
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
