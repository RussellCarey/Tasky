import pool from "../utils/pgdb";

export const changeUsername = async (newUsername: string, id: number) => {
  const newUser = await pool.query("UPDATE users SET username = $1 WHERE id = $2", [newUsername, id]);
  return newUser;
};

export const changeEmail = async (email: string, id: number) => {
  const newEmail = await pool.query("UPDATE users SET email = $1 WHERE id = $2", [email, id]);
  return newEmail;
};

export const changePassword = async (password: string, id: number) => {
  const newPW = await pool.query("UPDATE users SET password = $1 WHERE id = $2", [password, id]);
  return newPW;
};

// Update account subscription level
export const updateSubcriptionActive = async (id: number) => {
  const activate = await pool.query("UPDATE users SET ismember = true WHERE id = $1", [id]);
  return activate;
};
