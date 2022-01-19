import { checkValidEmail, checkValidPassword, checkValidUsername } from "../inputValidation";

test("Password validation check", () => {
  const failPassword = "1234";
  const shortPasswordTest = checkValidPassword(failPassword, failPassword);
  expect(shortPasswordTest).toBeFalsy();

  const successPassword = "thisislongerthan8";
  const okPasswordTest = checkValidPassword(successPassword, successPassword);
  expect(okPasswordTest).toBeTruthy();

  const nonMatching = "12345678";
  const nonMathcingTwo = "12345679";
  const passwordsDontMatch = checkValidPassword(nonMatching, nonMathcingTwo);
  expect(passwordsDontMatch).toBeFalsy();
});

test("Email validation check", () => {
  const invalidEmail = "russellatgoogle.com";
  const failedEmail = checkValidEmail(invalidEmail);
  expect(failedEmail).toBeFalsy();

  const validEmail = "russell@google.com";
  const successEmail = checkValidEmail(validEmail);
  expect(successEmail).toBeTruthy();
});

test("Username validation check", () => {
  const invalidUsername = "Russell1122!!";
  const failedUsername = checkValidUsername(invalidUsername);
  expect(failedUsername).toBeFalsy();

  const validUsername = "Russell";
  const successUsername = checkValidUsername(validUsername);
  expect(successUsername).toBeTruthy();
});
