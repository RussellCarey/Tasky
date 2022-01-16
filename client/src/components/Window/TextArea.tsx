import { FunctionComponent, useEffect, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

import { IPropsTextArea } from "../types/types";

const TextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.medium};

  display: flex;
  flex-direction: column;
  word-wrap: break-word;

  overflow-y: scroll;
  overflow-x: hidden;

  /* width */
  &::-webkit-scrollbar {
    width: 40px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${theme.colors.borderColor};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.terminalColor};
    border-left: solid 5px ${theme.colors.borderColor};
    border-right: solid 5px ${theme.colors.borderColor};
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Text = styled.p`
  margin-bottom: ${theme.spacing.medium};
`;

const TextArea: FunctionComponent<IPropsTextArea> = ({ consoleText }) => {
  const textDivElement = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;

  // On change to the text in the  console, scroll to the bottom automatically..
  const scrollToBottom = () => {
    if (textDivElement && textDivElement.current) textDivElement.current?.scrollTo({ behavior: "smooth", top: 1000 });
    console.log(textDivElement);
  };

  //
  useEffect(() => {
    scrollToBottom();
  }, [textDivElement, consoleText]);

  return (
    <TextAreaContainer ref={textDivElement}>
      {consoleText.length && consoleText.length > 0
        ? consoleText.map((line) => {
            return <Text key={line}>{line}</Text>;
          })
        : null}
    </TextAreaContainer>
  );
};

export default TextArea;
