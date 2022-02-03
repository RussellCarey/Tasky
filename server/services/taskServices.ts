import pool from "../utils/pgdb";

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

export const findOneTaskName = async (taskName: number) => {
  const allTaskNames = await pool.query("SELECT * FROM categories WHERE taskname = $1", [taskName]);
  return allTaskNames;
};

export const addNewTaskWithHours = async (userID: number, taskID: number, hours: number) => {
  const getTaskName = await pool.query("SELECT taskname FROM categories WHERE id = $1", [taskID]);

  const taskName = getTaskName.rows[0].taskname;
  const todaysDate = new Date(Date.now()).getTime();

  const addedTaskWithHours = await pool.query(
    "INSERT into tasks (userid, taskname, hours, unix) VALUES ($1, $2, $3, $4)",
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

export const findTasksByDate = async (date: string, userID: number) => {
  const foundTasks = await pool.query(
    "SELECT * FROM tasks WHERE TO_TIMESTAMP(unix / 1000)::DATE = $1 AND userid = $2",
    [date, userID]
  );
  return foundTasks;
};

export const getTasksFromDates = async (dateFrom: string, dateTo: string, userID: string) => {
  const foundTasks = await pool.query(
    "SELECT * FROM tasks WHERE TO_TIMESTAMP(unix / 1000)::DATE >= $1::date AND TO_TIMESTAMP(unix / 1000)::DATE <= $2::date AND userid = $3",
    [dateFrom, dateTo, userID]
  );

  return foundTasks;
};

export const deleteTasksFromDate = async (date: string, userID: number) => {
  const foundTasks = await pool.query("DELETE FROM tasks WHERE TO_TIMESTAMP(unix / 1000)::DATE = $1 AND userid = $2", [
    date,
    userID,
  ]);
  return foundTasks;
};

export const deleteTaskFromDateRange = async (dateFrom: string, dateTo: string, userID: string) => {
  const foundTasks = await pool.query(
    "DELETE FROM tasks WHERE TO_TIMESTAMP(unix / 1000)::DATE >= $1::date AND TO_TIMESTAMP(unix / 1000)::DATE <= $2::date AND userid = $3",
    [dateFrom, dateTo, userID]
  );

  return foundTasks;
};
