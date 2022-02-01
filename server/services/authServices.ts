import pool from "../utils/pgdb";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

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

// Check if username is taken
export const checkUserExistsID = async (id: string) => {
  const user = await pool.query("SELECT * from users WHERE id = $1", [id]);
  return user;
};

// Add users data to the database..
export const addUserToTheDB = async (body: any, password: string) => {
  const currentDate = new Date(Date.now()).getTime();
  const emailActivateKey = uuidv4();

  // Check the UUID is not there..

  const addUser = await pool.query(
    "INSERT INTO users (username, email, password, created, activekey) VALUES ($1, $2, $3, $4, $5)",
    [body.username, body.email, password, currentDate, emailActivateKey]
  );
  return emailActivateKey;
};

export const findUserByAuthKey = async (uuid: string) => {
  const foundUser = await pool.query("SELECT * FROM users WHERE activekey = $1", [uuid]);
  return foundUser;
};

export const authorizeUser = async (uuid: string) => {
  const changeAuth = await pool.query("UPDATE users SET active = true WHERE activekey = $1", [uuid]);
  return changeAuth;
};
