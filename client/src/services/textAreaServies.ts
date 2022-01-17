import commands from "../constants/commands";

const checkStartingWords = (text: string, words: number) => {
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
  // Loop though current commands and check that the words input match the commands.
  // If so, return the command object (name and function to run);
  for (const command of commands) {
    const fourLetterCheck = checkStartingWords(text, 4);
    if (fourLetterCheck.name === command.name) return { command: command, args: fourLetterCheck.args };

    const threeLetterCheck = checkStartingWords(text, 3);
    if (threeLetterCheck.name === command.name) return { command: command, args: threeLetterCheck.args };

    const twoLetterCheck = checkStartingWords(text, 2);
    if (twoLetterCheck.name === command.name) return { command: command, args: twoLetterCheck.args };

    const oneLetterCheck = checkStartingWords(text, 1);
    if (oneLetterCheck.name === command.name) return { command: command, args: oneLetterCheck.args };
  }

  // [0] Is always the error option in the commands.
  const noMatch = checkStartingWords(text, 0);
  return { command: commands[0], args: noMatch.args };
};
