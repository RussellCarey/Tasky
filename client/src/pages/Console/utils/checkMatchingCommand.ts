import { ICommandReturnFunction } from "../commands/commandMap";

const returnedObject = (args: Array<string>, commandName: string, fullSentence: string, commandFunc: Function) => {
  return {
    args,
    commandName,
    fullSentence,
    commandFunc,
    passwordRef: "",
  };
};

export const checkStarting = (text: string, commandMap: Record<string, ICommandReturnFunction>) => {
  const textArray = text.split(" ");

  // Loop through command hashmap.
  for (const command in commandMap) {
    const commandInText = command.replaceAll("_", " ");
    const commandWordArray = command.split("_");
    const commandWordCount = commandWordArray.length;

    // If text matches a starting string, send back the object else send the error object.
    // Starts with allows extra letter be added onto the last word - this is okay for now.
    if (text.startsWith(commandInText))
      return returnedObject(textArray.slice(commandWordCount), command, text, commandMap[command]);
  }

  // If no command is found above, return the not found error object.
  return returnedObject(textArray, "error", text, commandMap["error"]);
};
