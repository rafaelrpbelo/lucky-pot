import { useContext } from "react";

import { TransactionsContext, TransactionsContextData } from "../contexts/TransactionContext";

export function useTransactions(): TransactionsContextData {
  return useContext(TransactionsContext);
}
