const sgMail = require('@sendgrid/mail');

// This will fetch the SendGrid API key from the Netlify environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  // Check if the request is a POST
  if (event.httpMethod === 'POST') {

    const { firstName, lastName, region, buildingStage, buyerType, mobileNumber, userEmail, perkName, perkDescription, providerEmail } = JSON.parse(event.body);

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
      from: 'Home Building Hub <hello@homebuildinghub.com.au>',
      subject: `New Perk Redemption: ${perkName}`,
      text: `A Home Building Hub Subscriber has redeemed the perk: ${perkName}.\n\nDescription: ${perkDescription}\n\nName: ${firstName} ${lastName}\nMobile Number: ${mobileNumber}\nEmail: ${userEmail}\nRegion: ${region}\nBuilding Stage: ${buildingStage}\nBuyer Type: ${buyerType}\n`,
      html: `<p>A Home Building Hub Subscriber has redeemed the perk: <strong>${perkName}</strong>.</p>
         <p><strong>Description:</strong> ${perkDescription}</p>
         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
         <p><strong>Mobile Number:</strong> ${mobileNumber}</p>
         <p><strong>Email:</strong> ${userEmail}</p>
         <p><strong>Region:</strong> ${region}</p>
         <p><strong>Building Stage:</strong> ${buildingStage}</p>
         <p><strong>Buyer Type:</strong> ${buyerType}</p>`,
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
