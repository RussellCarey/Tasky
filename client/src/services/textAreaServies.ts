import { commandMap } from "./commandMap";

export const checkStartingWords = (text: string, words: number) => {
  //   const checkFirstTwo = /^((?:\S+\s+){1}\S+).*/;
  //   const checkFirstThree = /^((?:\S+\s+){2}\S+).*/;
  //   const checkFirstFour = /^((?:\S+\s+){3}\S+).*/;

  // Split the input text, and return the first x numbers of letters and their arguments..
  const usersCommand = text.split(" ");
  const selectedWords = usersCommand.slice(0, words);
  const args = usersCommand.slice(words);

  return { name: selectedWords.join(" "), args: args };
};

export const checkMatch = (text: string) => {
  const commandEntries = Object.entries(commandMap);
  console.log(commandEntries);

  // Loop though current commands and check that the words input match the commands.
  // If so, return the command object (name and function to run);
  for (const command of commandEntries) {
    const formattedString = command[0].replaceAll(" ", "_");

    const fourLetterCheck = checkStartingWords(text, 4);
    if (fourLetterCheck.name === formattedString)
      return { command: command, args: fourLetterCheck.args, passwordRef: "" };

    const threeLetterCheck = checkStartingWords(text, 3);
    if (threeLetterCheck.name === formattedString)
      return { command: command, args: threeLetterCheck.args, passwordRef: "" };

    const twoLetterCheck = checkStartingWords(text, 2);
    if (twoLetterCheck.name === formattedString)
      return { command: command, args: twoLetterCheck.args, passwordRef: "" };

    const oneLetterCheck = checkStartingWords(text, 1);
    if (oneLetterCheck.name === formattedString)
      return { command: command, args: oneLetterCheck.args, passwordRef: "" };
  }

  // [0] Is always the error option in the commands.
  const noMatch = checkStartingWords(text, 0);
  return { command: commandEntries[0][0], args: noMatch.args, passwordRef: "" };
};
