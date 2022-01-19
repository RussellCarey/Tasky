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

export const addNewTaskAttempt = async (newTaskName: string) => {
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
