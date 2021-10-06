import { useState, useEffect } from "react";

import { GlobalStyle } from "./styles/global";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/Modals/NewTransactionModal";

import { api } from "./services/api";

import { TransactionsContext } from "./contexts/TransactionsContext";

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

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  useEffect(() => {
    api
      .get<TransactionsResponse>("transactions")
      .then(response => setTransactions(response.data.transactions));
  }, []);


  return (
    <TransactionsContext.Provider value={transactions}>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionsContext.Provider>
  );
}
