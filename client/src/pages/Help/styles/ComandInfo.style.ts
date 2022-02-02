import styled from "styled-components";
import { Main } from "../../styles/styles";
import { mixinDefaultTheme } from "../../../theme/mixins";
import { TerminalBox } from "../../styles/styles";
import { theme } from "../../../theme/theme";

export const CommandInfoDiv = styled.div`
  width: 100%;
  height: max-content;
  padding: ${theme.spacing.large};

  display: grid;
  grid-template-columns: 2fr 2fr;

  @media (max-width: 800px) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

export const CommandBox = styled(TerminalBox)`
  width: 80%;
  padding: ${theme.spacing.medium}
  box-shadow: 10px 10px 0 ${(props) => props.theme.shadowColor};

    @media (max-width: 800px) {
    justify-self: center;
  }
`;
