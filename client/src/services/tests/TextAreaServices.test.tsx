import { checkStartingWords, checkMatch } from "../textAreaServies";

test("Function: checkStartingWords", () => {
  // No args
  const twoLetter = "show help";
  const runCheck = checkStartingWords(twoLetter, 2);

  const name = runCheck.name;
  const args = runCheck.args;

  expect(name).toBe("show help");
  expect(args).toHaveLength(0);

  // With args
  const threeLetters = "come fly with me lets fly lets fly away";
  const runCheckTwo = checkStartingWords(threeLetters, 3);

  const nameTwo = runCheckTwo.name;
  const argsTwo = runCheckTwo.args;

  expect(nameTwo).toBe("come fly with");
  expect(argsTwo).toHaveLength(6);
});

test("Function: checkMatch", () => {
  // Valid command found
  const validCommand = "show help woooo";
  const runCheck = checkMatch(validCommand);

  const command = runCheck.command.name;
  const args = runCheck.args;

  // Should find the command.
  expect(command).toBe("show help");
  expect(args).toHaveLength(1);

  // No command found
  const invalidCommand = "cheese and bacon is great";
  const runCheckAgain = checkMatch(invalidCommand);

  const commandTwo = runCheckAgain.command.name;
  const argsTwo = runCheckAgain.args;

  // Should find no command and output error.
  expect(commandTwo).toBe("error");
  expect(argsTwo).toHaveLength(5);
});
