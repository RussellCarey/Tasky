import axios from "axios";
import { projectURLS } from "../../../constants/urls";
import Cookie from "js-cookie";
import isDev from "../../../utils/isDev";

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
  });

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
  });

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
  });

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
  });

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
  });

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
  });

  return deletedTasksRange;
};
