import { checkValidEmail, checkValidUsername, checkValidPassword } from "../inputValidation";

test("Check for valid email passes", () => {});
test("Check for valid email fails", () => {});
test("Check for valid username passes", () => {});
test("Check for valid username fails", () => {});
test("Check for valid password passes", () => {});
test("Check for valid password fails", () => {});

// export const checkValidEmail = (email: string) => {
//   // Check invalid characters, enough characters, spaces etc.
//   if (!email.includes("@" || ".")) return false;
//   return true;
// };

// export const checkValidUsername = (username: string) => {
//   // Username must be longer that 6 letters and only contain letters
//   if (username.length < 6) return false;

//   const letters = /^[A-Za-z]+$/;
//   if (!username.match(letters)) return false;

//   return true;
// };

// export const checkValidPassword = (password: string, passwordTwo: string) => {
//   if (password !== passwordTwo) return false;
//   if (password.length < 8) return false;
//   return true;
// };
