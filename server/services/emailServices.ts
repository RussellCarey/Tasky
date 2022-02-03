export const prepareSignupSuccessText = (username: string, email: string, activateString: string) => {
  return `Welcome! ${username} to my Tasky task recording app!.. (Email design in progress). Please go to the following link to activate your account: https://tasky.russell-carey.com/auth?=${activateString}.`;
};

export const prepareSignupSuccessHTML = (username: string, email: string, activateString: string) => {
  return `<strong>Welcome! ${username} to Tasky.</strong>
    <br>
    <p>Email design in progress</p>
    <br>
    <p> Please click <a href="https://tasky.russell-carey.com/auth?=${activateString}">here</a> to confirm and activate your account.`;
};

export const preparePaymentSuccessText = (username: string, email: string) => {
  return `${username}, This is just to let you know that your upgrade was successful. Your payment has gone through and your account has been upgraded! If you have any issues, please contact us!`;
};

export const preparePaymentSuccessHTML = (username: string, email: string) => {
  return `<strong>Upgrade ahoy! ${username}.</strong><br>
    This is just to let you know that your upgrade was successful. <br>
    Your payment has gone through and your account has been upgraded!<br>
    If you have any issues, please contact us!<br><br>
    Thank you for using tasky!`;
};

export const preparePaymentFailureText = (username: string, email: string) => {
  return `${username}, This is just to let you know that your upgrade was not successful. Your payment may have gone through. If you have any issues, please contact us!`;
};

//
export const preparePaymentFailureHTML = (username: string, email: string) => {
  return `<strong>Upgrade ahoy! ${username}.</strong><br>
    This is just to let you know that your upgrade may not have been successful. <br>
    Your payment may have gone through.<br>
    If you have any issues, please contact us!<br><br>
    Thank you for using tasky!`;
};
