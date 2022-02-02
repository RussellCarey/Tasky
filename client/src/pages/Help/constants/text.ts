export const commandHelpText = [
  { name: "login ", info: "To login to your account type login, followed by your username and password." },
  { name: "logout", info: "To logout to your account type logout with no arguments." },
  { name: "clear", info: "To clear all text from the console" },
  { name: "show help", info: "This will show you some commands to get you started " },
  {
    name: "signup USERNAME EMAIL PASSWORD PASSWORD",
    info: "To sign up, type signup followed by your desired username, your current email and your desired password.",
  },
  { name: "show info", info: "To see your account information." },
  {
    name: "change password CURRENT NEW NEW",
    info: "To change the password of your account type change password followed by your current password and your desired new password.",
  },
  {
    name: "change email CURRENT NEW NEW",
    info: "To change the email of your account type change email followed by your current email and your desired new email.",
  },
  {
    name: "upgrade account",
    info: "To upgrade your account to premium. Will show you a screen where you can purchase the upgrade",
  },
  { name: "delete account", info: "Will permenently delete your account. Caution." },
  { name: "add new task NAME", info: "Will add a new task name. These are used to record your tasks and times." },
  { name: "show task names", info: "Will show all current task names you have recorded for use." },

  {
    name: "delete task name ID",
    info: "To delete a task name, use delete task name followed by the ID of the task. Youc an see the id when you check your task names use show task names.",
  },
  {
    name: "add new task TASKID HOURS",
    info: "To add a new record of your activity and hours spent type; add new task followed by the task name id and the amount of  hours spent. This be recorded for the day you enter this command only.",
  },
  { name: "show tasks", info: "Will show you todays current tasks recorded with times and percentages." },
  {
    name: "show tasks for DATE",
    info: "To see your tasks and times for a certain day type; show tasks for followed by a date in the formar YYYY/MM/DD.",
  },
  {
    name: "show tasks from DATE DATE",
    info: "To see your tasks and times for a certain date range type; show tasks from followed by a date in the formar YYYY/MM/DD for the starting date, and then another day for the end of the range.",
  },
  {
    name: "delete task TASKID",
    info: "Use this to delete one task record. You can get the ID when checking a tasks from a day.",
  },
  {
    name: "delete task for DATE",
    info: "To delete all recorded tasks on a day type; delete tasks for, followed by a date in the format YYYY/MM/DD. ",
  },
  {
    name: "delete tasks from DATE DATE",
    info: "To delete recorded tasks from multiple dates use delete tasks from, followed by a starting date and a date end date.",
  },
  { name: "set theme LIGHT", info: "Change theme to the light theme." },
  { name: "set theme DARK", info: "Change theme to the light theme" },
  {
    name: "set background color HEX",
    info: "Change the app background color by using set background color followed by a hex value, eg #00000",
  },
  {
    name: "set shadow color HEX",
    info: "Change the app shadow color by using set shadow color followed by a hex value, eg #00000",
  },
  {
    name: "set terminal color HEX",
    info: "Change the app terminal color by using set terminal color followed by a hex value, eg #00000",
  },
  {
    name: "set text color HEX",
    info: "Change the app text color by using set text color followed by a hex value, eg #00000",
  },
  {
    name: "set background color HEX",
    info: "Change the app background color by using set background color followed by a hex value, eg #00000",
  },
];

export const documentExplanation = `To use this app you first need to sign up for an account. You can check the command below.\n
Once you have signed up you need to confirm your account from the email we will send you.\n
The first order of business when logged in is to create some task names. Task names are just tasks that you can select from when recording your activities duuring the day.\n 
Once you have some saved you can then record a task and how many hours you have spend doing it. This is done by using add new task TASKID HOURS. You can check the command below.\n 
From there you can check your records on one date or a range of days. Please check the commands below for the full functionality.`;
