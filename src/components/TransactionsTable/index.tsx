import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get<TransactionsResponse>("transactions")
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount / 100)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {Intl
                    .DateTimeFormat("pt-br", { dateStyle: "short" })
                    .format(new Date(transaction.createdAt))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}
