import { FunctionComponent, useEffect, useRef, useContext } from "react";
import { TextAreaContainer, Text } from "./styles/TextArea.styles";
import { IPropsTextArea } from "./types/types";
import ThemeContext from "../../context/theme/themeContext";

export const TextArea: FunctionComponent<IPropsTextArea> = ({ consoleText }) => {
  const textDivElement = useRef(null) as React.MutableRefObject<HTMLDivElement | null>;
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;

  useEffect(() => {
    scrollToBottom();
  }, [textDivElement, consoleText]);

  // On change to the text in the  console, scroll to the bottom automatically.....
  const scrollToBottom = () => {
    if (textDivElement && textDivElement.current)
      textDivElement.current?.scrollTo({ behavior: "smooth", top: textDivElement.current.scrollHeight });
  };

  return (
    <TextAreaContainer ref={textDivElement} theme={theme}>
      {consoleText.length && consoleText.length > 0
        ? consoleText.map((line) => {
            return <Text key={line}>{line}</Text>;
          })
        : null}
    </TextAreaContainer>
  );
};

export default TextArea;
