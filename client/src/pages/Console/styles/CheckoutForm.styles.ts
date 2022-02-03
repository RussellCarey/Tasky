import styled from "styled-components";
import { theme } from "../../../theme/theme";
import { TerminalButton } from "../../styles/styles";
import { TerminalBox } from "../../styles/styles";
import { mixinDefaultTheme } from "../../../theme/mixins";
import { TerminalWindow } from "../../Console/styles/MainWindows";
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";

export const MainWindow = styled(TerminalBox)`
  width: 70%;
  max-width: 100%;
  height: 100%;
  margin-top: ${theme.spacing.large};

  padding: 0 ${theme.spacing.side};

  display: flex;
  flex-direction: column;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const CheckoutMainWindow = styled(TerminalWindow)`
  ${mixinDefaultTheme}
  position: relative;
  background-color: ${(props) => props.theme.backgroundColor};

  padding: 50px ${theme.spacing.side};

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  @media (max-width: 600px) {
    padding: 40px ${theme.spacing.small};
  }
`;

export const AccountTerminalWindow = styled(TerminalBox)`
  text-align: left;

  &:hover {
    transform: rotate(0deg);
  }
`;

export const AccountButton = styled(TerminalButton)`
  width: fit-content;
  margin-bottom: ${theme.spacing.xxlarge};
`;

export const AccountCrossButton = styled.p`
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: ${theme.font.sizes.large};

  &:hover {
    cursor: pointer;
    transform: scale(108%);
  }
`;

export const DarkBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  padding: ${theme.spacing.xxxlage} 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
`;

export const CheckoutTerminalWindow = styled(TerminalWindow)`
  ${mixinDefaultTheme}
  width: 90vw;
  height: 90vh;
  padding: ${theme.spacing.xxlarge};

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
`;

export const AccountTerminalButtom = styled(TerminalButton)`
  text-align: center;
  margin: 0;
  width: 700px;
`;

export const AccountInput = styled.input`
  ${mixinDefaultTheme}
  background-color: white;
  padding: 10px;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};

  margin-bottom: ${theme.spacing.large};
  width: 90%;
`;

export const AccountCardNumberElement = styled(CardNumberElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};

  margin-bottom: ${theme.spacing.large};
  width: 90%;
`;

export const AccountCVCNumber = styled(CardCvcElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};

  margin-bottom: ${theme.spacing.large};
  width: 90%;
`;

export const AccountCardExpiry = styled(CardExpiryElement)`
  ${mixinDefaultTheme}
  padding: 10px;
  background-color: white;
  box-shadow: 15px 15px 0 ${(props) => props.theme.shadowColor};

  margin-bottom: ${theme.spacing.large};
  width: 90%;
`;

export const AccountBuyButton = styled(AccountButton)`
  margin: 0;
  margin-top: ${theme.spacing.xxlarge};
  text-align: center;
  width: 90%;
`;
