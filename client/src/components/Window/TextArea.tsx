import { FunctionComponent, useEffect, useRef } from "react";
import { TextAreaContainer, Text } from "./styles/TextArea.styles";

import { IPropsTextArea } from "../types/types";

export const TextArea: FunctionComponent<IPropsTextArea> = ({ consoleText }) => {
  const textDivElement = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;

  useEffect(() => {
    scrollToBottom();
  }, [textDivElement, consoleText]);

  // On change to the text in the  console, scroll to the bottom automatically..
  const scrollToBottom = () => {
    if (textDivElement && textDivElement.current)
      textDivElement.current?.scrollTo({ behavior: "smooth", top: textDivElement.current.scrollHeight });
    console.log(textDivElement);
  };

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
