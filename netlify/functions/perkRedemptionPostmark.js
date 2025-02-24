const postmark = require('postmark');

// Initialize the Postmark client with your server API key
const client = new postmark.ServerClient('1db94519-d0d2-47e6-ac87-69bb1cd151b8');

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
      To: 'hello@homebuildinghub.com.au', // CHANGE LATER, test mode requires emails to be sent to hbh domain
      cc: 'hello@homebuildinghub.com.au',
      From: 'hello@homebuildinghub.com.au',
      Subject: `New Perk Redemption: ${perkName}`,
      TextBody: `A user has redeemed the perk: ${perkName}.\n\nDescription: ${perkDescription}\n\nUser's email: ${userEmail}`,
      HtmlBody: `<p>A user has redeemed the perk: <strong>${perkName}</strong>.</p><p>Description: ${perkDescription}</p><p><strong>User's email:</strong> ${userEmail}</p>`,
    };

    try {
      // Send the email using PostMark
      await client.sendEmail(msg);
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
