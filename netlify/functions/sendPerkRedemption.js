const sgMail = require('@sendgrid/mail');

// This will fetch the SendGrid API key from the Netlify environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  // Check if the request is a POST
  if (event.httpMethod === 'POST') {
    const { userEmail, perkName, perkDescription, providerEmail } = JSON.parse(event.body);

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
      to: providerEmail, // Perk provider's email
      cc: 'hello@hbh.com.au',
      from: 'khinvyn@gmail.com',
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
