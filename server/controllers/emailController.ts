const AppErr = require("../utils/AppError");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

// Using SendGrid and its API..
const sendMail = (message: Object) => {
  sgMail
    .send(message)
    .then(() => {
      console.log("Failed to send email");
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

export const sendWelcomeEmail = async (username: string, email: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Welcome to Tweety ${username}!`,
    text: `Welcome! ${username} to my Twitter scheduling app!.. (Email design in progress)`,
    html: `<strong>Welcome! ${username} to my Twitter scheduling app!..</strong><br><p>Email design in progress</p>`,
  };

  sendMail(msg);
};

export const sendFailedEmail = async (username: string, email: string, message: string) => {
  const msg = {
    to: `${email}`, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `Tweety - ${username}, sorry your tweet failed!`,
    text: `Hello ${username}! this is just to inform you that your message: --${message}-- failed. We apologise and will look into this! Please try again (Email design in progress)`,
    html: `Hello ${username}! this is just to inform you that your message: --${message}-- failed. <br> We apologise and will look into this! Please try again (Email design in progress)`,
  };

  sendMail(msg);
};
