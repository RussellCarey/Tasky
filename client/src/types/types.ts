export interface ICommandInitalObject {
  commandName: string;
  fullSentence: string;
  commandFunc: Function;
  args: Array<string>;
  passwordRef: string;
}
