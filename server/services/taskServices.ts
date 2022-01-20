import pool from "../utils/pgdb";
import catchAsync from "../utils/catchAsync";

export const createNewTaskName = async (userID: number, taskName: string) => {
  const uploadedTaskName = await pool.query("INSERT into categories (userid, taskname) VALUES ($1, $2)", [
    userID,
    taskName,
  ]);
  return uploadedTaskName;
};

export const findAllTaskNames = async (userID: number) => {
  const allTaskNames = await pool.query("SELECT * FROM categories WHERE userid = $1", [userID]);
  return allTaskNames;
};

export const addNewTaskWithHours = async (userID: number, taskID: number, hours: number) => {
  const getTaskName = await pool.query("SELECT taskname FROM categories WHERE id = $1", [taskID]);

  const taskName = getTaskName.rows[0].taskname;
  const todaysDate = new Date(Date.now()).getTime();

  const addedTaskWithHours = await pool.query(
    "INSERT into tasks (userid, taskname, hours, date) VALUES ($1, $2, $3, $4) ",
    [userID, taskName, hours, todaysDate]
  );

  return addedTaskWithHours;
};

export const deleteTaskName = async (id: number) => {
  const deleteTask = await pool.query("DELETE from categories WHERE id = $1", [id]);
  return deleteTask;
};

export const deleteTaskWithHours = async (id: number) => {
  const deletedTask = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  return deletedTask;
};
