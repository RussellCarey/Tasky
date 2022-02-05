import { checkStarting } from "../checkMatchingCommand";
import { commandMap } from "../../commands/commandMap";
import { clearWindowText, showCommandNotFound } from "../../commands/utilCommandServices";

test("Check matching command matches function", () => {
  const text = "clear";
  const check = checkStarting(text, commandMap);

  expect(check).toMatchObject({
    args: [],
    commandName: "clear",
    fullSentence: "clear",
    commandFunc: clearWindowText,
    passwordRef: "",
  });
});

test("Check non matching command returns error", () => {
  const text = "woo";
  const check = checkStarting(text, commandMap);

  expect(check).toMatchObject({
    args: ["woo"],
    commandName: "error",
    fullSentence: "woo",
    commandFunc: showCommandNotFound,
    passwordRef: "",
  });
});
