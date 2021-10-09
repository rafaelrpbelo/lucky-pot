import { ReactElement } from "react";
import logo from "../../assets/logo.svg";

import { Container, Content } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps): ReactElement {
  return (
    <Container>
      <Content>
        <img src={logo} alt="dt money" />

        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
