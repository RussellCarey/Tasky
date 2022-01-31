import * as CommandServices from "./commandService";
import { ICommandInitalObject } from "../types/types";

export type ICommandReturnFunction = (args: ICommandInitalObject) => any;

//
export const commandMap: Record<string, ICommandReturnFunction> = {
  error: CommandServices.showCommandNotFound,
  clear: CommandServices.clearWindowText,
  about: CommandServices.showAboutText,
  show_help: CommandServices.showHelpText,
  login: CommandServices.login,
  logout: CommandServices.logout,
  signup: CommandServices.signup,
  add_new_task_name: CommandServices.addNewTaskName,
  show_task_names: CommandServices.getAllTaskNames,
  delete_task_name: CommandServices.deleteTaskNames,
  add_new_task: CommandServices.addNewTask,
  delete_task: CommandServices.deleteTask,
  show_tasks_for: CommandServices.showTasksOnDate,
  show_tasks_from: CommandServices.showTasksDateRange,
  show_tasks: CommandServices.showTasksOnDate,
  delete_tasks_for: CommandServices.deleteTasksOnDate,
  delete_tasks_from: CommandServices.deleteTasksFromRange,
};
