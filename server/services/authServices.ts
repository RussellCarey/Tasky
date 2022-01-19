import pool from "../utils/pgdb";
import bcrypt from "bcryptjs";

// Check that both passwords the user has provided mathces
export const checkPasswordsMatch = (passwordOne: string, passwordTwo: string) => {
  if (passwordOne !== passwordTwo) return false;
  return true;
};

// Encrypt the password provided
export const bcryptPassword = async (password: string) => {
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const cryptedPassword = await bcrypt.hash(password, salt);
  return cryptedPassword;
};

export const bcryptComaprePasswords = async (password: string, hasedPassword: string) => {
  const checkedPassword = await bcrypt.compare(password, hasedPassword);
  return checkedPassword;
};

// Check if email exists
export const checkUserExistsEmail = async (email: string) => {
  const user = await pool.query("SELECT * from users WHERE email = $1", [email]);
  return user;
};

// Check if username is taken
export const checkUserExistsUsername = async (username: string) => {
  const user = await pool.query("SELECT * from users WHERE username = $1", [username]);
  return user;
};

// Add users data to the database..
export const addUserToTheDB = async (body: any, password: string) => {
  const addUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [
    body.username,
    body.email,
    password,
  ]);
  return addUser;
};
