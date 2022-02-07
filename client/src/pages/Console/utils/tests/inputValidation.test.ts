import { checkValidEmail, checkValidUsername, checkValidPassword } from "../inputValidation";

test("Check for valid email passes", () => {
  const text = "testEmail@test.com";
  const checkEmail = checkValidEmail(text);
  expect(checkEmail).toBeTruthy();
});

test("Check for valid email fails", () => {
  const text = "testEmailtest.com";
  const checkEmail = checkValidEmail(text);
  expect(checkEmail).toBeFalsy();
});

test("Check for valid password passes", () => {
  const matching = "moblydoobly";
  const matchingTwo = "moblydoobly";
  const checkPassword = checkValidPassword(matching, matchingTwo);
  expect(checkPassword).toBeTruthy();
});

test("Check for valid password fails", () => {
  const length = "russ";
  const checkLengthFail = checkValidPassword(length, length);
  expect(checkLengthFail).toBeFalsy();

  const notMatchingOne = "12345678";
  const notMatchingTwo = "12345356";
  const checkMatchingFail = checkValidPassword(notMatchingOne, notMatchingTwo);
  expect(checkLengthFail).toBeFalsy();
});

test("Check for valid username passes", () => {
  const username = "welcometothejungle";
  const checkUsername = checkValidUsername(username);
  expect(checkUsername).toBeTruthy();
});

test("Check for valid username fails", () => {
  const username = "hel";
  const checkUsernameFaile = checkValidUsername(username);
  expect(checkUsernameFaile).toBeFalsy();
});
