import pool from "../utils/pgdb";

export const deleteUser = async (id: number) => {
  const deletedUser = await pool.query("DELETE from users WHERE id = $1  RETURNING id, username, email, ismember", [
    id,
  ]);
  return deletedUser;
};

export const changeEmail = async (email: string, id: number) => {
  const newEmail = await pool.query(
    "UPDATE users SET email = $1 WHERE id = $2 RETURNING id, username, email, ismember",
    [email, id]
  );
  return newEmail;
};

export const changePassword = async (password: string, id: number) => {
  const newPW = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING id, username, email, ismember",
    [password, id]
  );
  return newPW;
};

// Update account subscription level
export const updateSubcriptionActive = async (id: number) => {
  const activate = await pool.query(
    "UPDATE users SET ismember = true WHERE id = $1 RETURNING id, username, email, ismember",
    [id]
  );
  return activate;
};
