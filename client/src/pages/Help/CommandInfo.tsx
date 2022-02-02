import React, { FunctionComponent } from "react";
import { ICommandInfoProps } from "./types/types";
import { CommandInfoDiv, CommandBox } from "./styles/ComandInfo.style";

const CommandInfo: FunctionComponent<ICommandInfoProps> = ({ theme, command, text }) => {
  return (
    <CommandInfoDiv theme={theme}>
      <CommandBox>
        <p>{command}</p>
      </CommandBox>

      <p>{text}</p>
    </CommandInfoDiv>
  );
};

export default CommandInfo;
