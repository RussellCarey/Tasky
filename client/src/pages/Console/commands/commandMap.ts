import * as TaskCommandServices from "./taskCommandServices";
import * as AccountComandServices from "./accountCommandServices";
import * as AuthCommandSerivces from "./authCommandServices";
import * as UtilCommandSerivces from "./utilCommandServices";
import { ICommandInitalObject } from "../../../types/types";

export type ICommandReturnFunction = (args: ICommandInitalObject) => any;

//
export const commandMap: Record<string, ICommandReturnFunction> = {
  error: UtilCommandSerivces.showCommandNotFound,
  clear: UtilCommandSerivces.clearWindowText,
  about: UtilCommandSerivces.showAboutText,
  show_help: UtilCommandSerivces.showHelpText,
  login: AuthCommandSerivces.login,
  logout: AuthCommandSerivces.logout,
  signup: AuthCommandSerivces.signup,
  add_new_task_name: TaskCommandServices.addNewTaskName,
  show_task_names: TaskCommandServices.getAllTaskNames,
  delete_task_name: TaskCommandServices.deleteTaskNames,
  add_new_task: TaskCommandServices.addNewTask,
  delete_task: TaskCommandServices.deleteTask,
  show_tasks_for: TaskCommandServices.showTasksOnDate,
  show_tasks_from: TaskCommandServices.showTasksDateRange,
  show_tasks: TaskCommandServices.showTasksOnDate,
  delete_tasks_for: TaskCommandServices.deleteTasksOnDate,
  delete_tasks_from: TaskCommandServices.deleteTasksFromRange,
  show_info: AccountComandServices.showUserInformation,
  change_password: AccountComandServices.changePassword,
  change_email: AccountComandServices.changeEmail,
  upgrade_account: AccountComandServices.upgradeAccount,
  delete_account: AccountComandServices.deleteAccount,
};
