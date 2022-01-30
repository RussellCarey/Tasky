const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);

// Using SendGrid and its API..
const sendMail = async (message: Object) => {
  try {
    const sendMail = await sgMail.send(message);
    console.log(sendMail);
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export const sendWelcomeEmail = async (username: string, email: string, activateString: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Welcome to Tasky, ${username}!`,
    text: `Welcome! ${username} to my Tasky task recording app!.. (Email design in progress). Please go to the following link to activate your account: https://tasky.russell-carey.com/auth?=${activateString}.`,
    html: `<strong>Welcome! ${username} to Tasky.</strong>
    <br>
    <p>Email design in progress</p>
    <br>
    <p> Please click <a href="https://tasky.russell-carey.com/auth?=${activateString}">here</a> to confirm and activate your account.`,
  };

  await sendMail(msg);

  return msg;
};
