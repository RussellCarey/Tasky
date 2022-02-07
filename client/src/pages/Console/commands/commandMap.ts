import * as TaskCommandServices from "./taskCommandServices";
import * as AccountComandServices from "./accountCommandServices";
import * as AuthCommandSerivces from "./authCommandServices";
import * as UtilCommandSerivces from "./utilCommandServices";
import { ICommandInitalObject } from "../../../types/types";

export type ICommandReturnFunction = (args: ICommandInitalObject) => any;

// Due to how it finds tasks - smaller length strings need to be searched last.
// Ensure they are at the bottom so matching starting strings are not effected.
// Tests will ensure they find the right one, if not the test will fail.
export const commandMap: Record<string, ICommandReturnFunction> = {
  error: UtilCommandSerivces.showCommandNotFound,
  clear: UtilCommandSerivces.clearWindowText,
  about: UtilCommandSerivces.showAboutText,
  show_help: UtilCommandSerivces.showHelpText,
  login: AuthCommandSerivces.login,
  logout: AuthCommandSerivces.logout,
  signup: AuthCommandSerivces.signup,
  add_new_task_name: TaskCommandServices.addNewTaskName,
  delete_task_name: TaskCommandServices.deleteTaskNames,
  add_new_task: TaskCommandServices.addNewTask,
  show_tasks_from: TaskCommandServices.showTasksDateRange,
  show_tasks_for: TaskCommandServices.showTasksOnDate,
  show_task_names: TaskCommandServices.getAllTaskNames,
  show_tasks: TaskCommandServices.showTasksOnDate,
  delete_tasks_from: TaskCommandServices.deleteTasksFromRange,
  delete_tasks_for: TaskCommandServices.deleteTasksOnDate,
  show_info: AccountComandServices.showUserInformation,
  change_password: AccountComandServices.changePassword,
  change_email: AccountComandServices.changeEmail,
  upgrade_account: AccountComandServices.upgradeAccount,
  delete_account: AccountComandServices.deleteAccount,
  delete_task: TaskCommandServices.deleteTask,
};
