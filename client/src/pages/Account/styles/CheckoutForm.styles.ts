import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { TerminalBox, TerminalButton } from "../../styles/styles";
import { mixinDefaultTheme } from "../../../theme/mixins";
import { TerminalWindow } from "../../Console/styles/MainWindows";

import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

export const DarkBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const CheckoutTerminalWindow = styled(TerminalWindow)`
  ${mixinDefaultTheme}
  width: 80vw;
  height: fit-content;
  padding: ${theme.spacing.large};

  display: flex;
  flex-direction: column;
`;

export const AccountInput = styled.input`
  ${mixinDefaultTheme}
  background-color: white;
  padding: 10px;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};
`;

export const AccountCardNumberElement = styled(CardNumberElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};
`;

export const AccountCVCNumber = styled(CardCvcElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};
`;

export const AccountCardExpiry = styled(CardExpiryElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};
`;