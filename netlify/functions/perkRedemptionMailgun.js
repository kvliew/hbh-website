const Mailgun = require('mailgun.js');
const FormData = require('form-data');

// Initialize the MailGun client with your server API key
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'hbh',  // Use 'api' as the username for Mailgun
  key: 'be008a70724d9e17d9e26fa47c7580a1-3af52e3b-18268219', // Replace with your Mailgun API key
});

exports.handler = async (event, context) => {
  // Check if the request is a POST
  if (event.httpMethod === 'POST') {

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
      from: 'Mailgun Sandbox <postmaster@sandboxd3f8605387cc46b28a4c6ef0f4366e30.mailgun.org>',
      subject: `New Perk Redemption: ${perkName}`,
      text: `A user has redeemed the perk: ${perkName}.\n\nDescription: ${perkDescription}\n\nUser's email: ${userEmail}`,
      html: `<p>A user has redeemed the perk: <strong>${perkName}</strong>.</p><p>Description: ${perkDescription}</p><p><strong>User's email:</strong> ${userEmail}</p>`,
    };

    try {
      // Send the email using Mailgun
      await mg.messages.create('sandboxd3f8605387cc46b28a4c6ef0f4366e30.mailgun.org', msg);
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
