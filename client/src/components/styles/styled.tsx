import styled from "styled-components";

export const MainWindow = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.theme.backgroundColor};
`;

export const TerminalWindow = styled.div`
  width: 85vw;
  height: 80vh;
  position: relative;

  background-color: ${(props) => props.theme.terminalColor};
  border: 5px solid ${(props) => props.theme.borderColor};
  border-radius: 20px;
  box-shadow: 30px 30px 0px ${(props) => props.theme.shadowColor};

  display: flex;
  flex-direction: column;

  overflow: wrap;
`;
