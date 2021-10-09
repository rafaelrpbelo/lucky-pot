import { useState, useEffect, createContext, ReactNode, ReactElement } from "react";

import { api } from "../services/api";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsSummary {
  withdraw: number;
  deposit: number;
  total: number;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsResponse {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  summary: TransactionsSummary;
}

interface TransactionResponse {
  transaction: Transaction;
}

interface TransactionServerData {
  data: TransactionResponse;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

const summarize = (items: Transaction[]) => {
  return items.reduce(
    (acc, item) => {
      if (item.type === "withdraw") {
        acc.withdraw += item.amount;
        acc.total -= item.amount;
      } else if (item.type === "deposit") {
        acc.deposit += item.amount;
        acc.total += item.amount;
      }

      return acc;
    },
    { withdraw: 0, deposit: 0, total: 0 }
  );
};

export function TransactionsProvider({ children }: TransactionsProviderProps): ReactElement {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionsSummary>({
    withdraw: 0,
    deposit: 0,
    total: 0,
  });

  useEffect(() => {
    const result = summarize(transactions);
    setSummary(result);
  }, [transactions]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post<TransactionInput, TransactionServerData>("/transactions", transactionInput);
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  useEffect(() => {
    api.get<TransactionsResponse>("transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, summary }}>
      {children}
    </TransactionsContext.Provider>
  );
}
