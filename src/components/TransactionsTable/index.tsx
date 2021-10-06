import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Container } from "./styles";

export function TransactionsTable() {
  const transactions = useContext(TransactionsContext);

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
