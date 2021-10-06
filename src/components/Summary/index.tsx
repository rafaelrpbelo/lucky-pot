import { useState, useEffect, useContext } from "react";

import { TransactionsContext } from "../../contexts/TransactionsContext";

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
  const transactions = useContext(TransactionsContext);

  const [total, setTotal] = useState<SummaryTotal>({withdraw: 0, deposit: 0, total: 0});

  const updateTotals = () => {
    setTotal(
      transactions.reduce((acc: SummaryTotal, item) => {
        if (item.type === "withdraw") {
          acc.withdraw += item.amount;
        }
        else if (item.type === "deposit") {
          acc.deposit += item.amount;
        }

        acc.total += item.amount;

        return acc;
      }, {withdraw: 0, deposit: 0, total: 0})
    )
  }

  useEffect(updateTotals, [transactions])

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(total.deposit / 100)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(total.withdraw / 100)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>
          {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(total.total / 100)}
        </strong>
      </div>
    </Container>
  )
};
