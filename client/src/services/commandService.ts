import { helpScreenText } from "../constants/text";

export const showHelpText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type show help without arguments to use this function."];

  return helpScreenText;
};
