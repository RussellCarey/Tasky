import { theme } from "../../../theme/theme";
import styled from "styled-components";
import { SubHeading } from "../../styles/styles";
import { mixinDefaultTheme } from "../../../theme/mixins";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => props.theme.backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageWindow = styled.div`
  ${mixinDefaultTheme}
  width: 70vw;
  height: max-content;
  padding: ${theme.spacing.xlarge} ${theme.spacing.xlarge};
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: wrap;

  text-align: center;

  @media (max-width: 600px) {
    width: 85vw;
  }
`;

export const Title = styled(SubHeading)`
  margin-bottom: ${theme.spacing.large};
`;
