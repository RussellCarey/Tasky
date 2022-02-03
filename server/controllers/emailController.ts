const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API);
import * as EmailHelper from "../services/emailServices";

// Using SendGrid and its API..
const sendMail = async (message: Object) => {
  try {
    const sendMail = await sgMail.send(message);
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
    text: EmailHelper.prepareSignupSuccessText(username, email, activateString),
    html: EmailHelper.prepareSignupSuccessText(username, email, activateString),
  };

  await sendMail(msg);
  return msg;
};

export const sendPaymentEmailSuccess = async (username: string, email: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Upgrade ahoooy, ${username}!`,
    text: EmailHelper.preparePaymentSuccessText(username, email),
    html: EmailHelper.preparePaymentSuccessHTML(username, email),
  };

  await sendMail(msg);
  return msg;
};

export const sendPaymentEmailFailure = async (username: string, email: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Upgrade ahoooy, ${username}!`,
    text: EmailHelper.preparePaymentFailureText(username, email),
    html: EmailHelper.preparePaymentFailureHTML(username, email),
  };

  await sendMail(msg);
  return msg;
};
