import { showHelpText } from "../services/commandService";

const commands = [{ name: "show help", output: (args: Array<string>) => showHelpText(args) }];

export default commands;
