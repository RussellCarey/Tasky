import { ECommandReturnOptions } from "../types/commandReturnEnums";

// Do these need to be objects, enums are better? Might add to them later.. (objects)
const commands = [
  { name: ECommandReturnOptions.error },
  { name: ECommandReturnOptions.about },
  { name: ECommandReturnOptions.showhelp },
  { name: ECommandReturnOptions.clear },
  { name: ECommandReturnOptions.login },
  { name: ECommandReturnOptions.logout },
  { name: ECommandReturnOptions.signup },
  { name: ECommandReturnOptions.addNewTaskName },
  { name: ECommandReturnOptions.showTaskNames },
  { name: ECommandReturnOptions.deleteTaskNames },
  { name: ECommandReturnOptions.addNewTask },
  { name: ECommandReturnOptions.deleteTask },
  { name: ECommandReturnOptions.showTasksFor },
  { name: ECommandReturnOptions.showTasksFrom },
  { name: ECommandReturnOptions.showTasks },
  { name: ECommandReturnOptions.deleteTasksFor },
  { name: ECommandReturnOptions.deleteTasksFrom },
  { name: ECommandReturnOptions.setBackgroundColor },
  { name: ECommandReturnOptions.setBorderColor },
  { name: ECommandReturnOptions.setTextColor },
  { name: ECommandReturnOptions.setTerminalColor },
  { name: ECommandReturnOptions.setShadowColor },
  { name: ECommandReturnOptions.setThemeLight },
  { name: ECommandReturnOptions.setThemeDark },
];

export default commands;
