import { useTransactions } from "../../hooks/useTransactions";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "./styles";

interface SummaryTotal {
  withdraw: number;
  deposit: number;
  total: number;
}

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc: SummaryTotal, item) => {
    if (item.type === "withdraw") {
      acc.withdraw += item.amount;
      acc.total -= item.amount;
    }
    else if (item.type === "deposit") {
      acc.deposit += item.amount;
      acc.total += item.amount;
    }

    return acc;
  }, {withdraw: 0, deposit: 0, total: 0});

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(summary.deposit / 100)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(summary.withdraw / 100)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(summary.total / 100)}
        </strong>
      </div>
    </Container>
  )
};
