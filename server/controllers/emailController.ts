const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);

// ---------
// Emails are WIP - Need to tigten up the code / process and create better looking, formatted emails.
//----------

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

export const sendPaymentEmailSuccess = async (username: string, email: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Upgrade ahoooy, ${username}!`,
    text: `${username}, This is just to let you know that your upgrade was successful. Your payment has gone through and your account has been upgraded! If you have any issues, please contact us!`,
    html: `<strong>Upgrade ahoy! ${username}.</strong><br>
    This is just to let you know that your upgrade was successful. <br>
    Your payment has gone through and your account has been upgraded!<br>
    If you have any issues, please contact us!<br><br>
    Thank you for using tasky!`,
  };

  await sendMail(msg);

  return msg;
};
