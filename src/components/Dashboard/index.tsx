import { ReactElement } from "react";

import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container } from "./styles";

export function Dashboard(): ReactElement {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
}
