import axios from "axios";
import { projectURLS } from "../constants/urls";
import Cookies from "js-cookie";
import isDev from "../utils/isDev";

export const logoutAttempt = async (args: Array<string>) => {
  const logout = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/logout` : `${projectURLS.development}/api/auth/logout`,
    data: {
      username: args[0],
      password: args[1],
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  return logout;
};

export const loginAttempt = async (username: string, password: string) => {
  const login = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/login` : `${projectURLS.development}/api/auth/login`,
    data: {
      username,
      password,
    },
  });

  return login;
};

export const signupAttempt = async (args: Array<string>) => {
  const signup = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev() ? `${projectURLS.productionWithAPI}/auth/signup` : `${projectURLS.development}/api/auth/signup`,
    data: {
      username: args[0],
      email: args[1],
      password: args[2],
      passwordConfirm: args[3],
    },
  });

  return signup;
};

export const addNewTaskNameAttempt = async (newTaskName: string) => {
  const taskName = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/addNewTaskName`
      : `${projectURLS.development}/api/tasks/addNewTaskName`,
    data: {
      taskName: newTaskName,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  return taskName;
};

export const getTaskNames = async () => {
  const taskNames = await axios.request({
    withCredentials: true,
    method: "GET",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/getAllTaskNames`
      : `${projectURLS.development}/api/tasks/getAllTaskNames`,
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  return taskNames;
};

export const deleteTaskName = async (id: number) => {
  const deleteTask = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/deleteTaskName`
      : `${projectURLS.development}/api/tasks/deleteTaskName`,
    data: {
      taskID: id,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  return deleteTask;
};

export const addNewTaskHours = async (hours: number, taskid: number) => {
  const addTaskHours = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/addNewTaskHours`
      : `${projectURLS.development}/api/tasks/addNewTaskHours`,
    data: {
      taskID: taskid,
      taskHours: hours,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(addTaskHours);

  return addTaskHours;
};

export const deleteTaskWithHours = async (taskid: number) => {
  const deleteTask = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/deleteTaskWithHours`
      : `${projectURLS.development}/api/tasks/deleteTaskWithHours`,
    data: {
      taskID: taskid,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(deleteTask);

  return deleteTask;
};

export const getTasksOnDate = async (date: string | null) => {
  const tasks = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/getTasksOnDate`
      : `${projectURLS.development}/api/tasks/getTasksOnDate`,
    data: {
      date: date || new Date(Date.now()).toISOString().slice(0, 10),
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(tasks);

  return tasks;
};

export const getTasksFromDateRange = async (dateFrom: string, dateTo: string) => {
  const tasks = await axios.request({
    withCredentials: true,
    method: "POST",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/getTasksFromDateRange`
      : `${projectURLS.development}/api/tasks/getTasksFromDateRange`,
    data: {
      dateTo: dateTo,
      dateFrom: dateFrom,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(tasks);

  return tasks;
};

export const deleteTasksDate = async (date: string) => {
  const taskToDelete = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/deleteTasksFromDate`
      : `${projectURLS.development}/api/tasks/deleteTasksFromDate`,
    data: {
      date: date,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(taskToDelete);

  return taskToDelete;
};

export const deleteTasksFromDateRange = async (dateFrom: string, dateTo: string) => {
  const deletedTasksRange = await axios.request({
    withCredentials: true,
    method: "DELETE",
    url: !isDev()
      ? `${projectURLS.productionWithAPI}/tasks/deleteTasksFromDateRange`
      : `${projectURLS.development}/api/tasks/deleteTasksFromDateRange`,
    data: {
      dateTo: dateTo,
      dateFrom: dateFrom,
    },
    headers: {
      jwt: `${Cookies.get("jwt")}`,
    },
  });

  console.log(deletedTasksRange);

  return deletedTasksRange;
};
