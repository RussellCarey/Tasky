import { screen, render, waitFor } from "../../../../mocks/customRender";
import { ITaskObject } from "../../types/types";
import { showCommandNotFound, calculatePercentages } from "../utilCommandServices";

test("Show command not found correctly", () => {
  const commandObject = {
    args: ["test", "command"],
    commandName: "",
    fullSentence: "",
    passwordRef: "",
    commandFunc: () => {},
  };
  const checkShowCommand = showCommandNotFound(commandObject);
  expect(checkShowCommand).toMatchObject(["Did not recognise command test command."]);
});

test("Test generating correct percetanges and object", () => {
  const ITasks: Array<ITaskObject> = [
    { hours: 10, id: 1, taskname: "test", userid: "1" },
    { hours: 10, id: 2, taskname: "test", userid: "2" },
  ];

  const percentageObject = calculatePercentages(ITasks);
  expect(percentageObject).toMatchObject({ test: { id: 1, taskname: "test", hours: 20, percentage: 100 } });
});
