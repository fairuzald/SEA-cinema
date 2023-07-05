import React from "react";
import TransactionClient from "./TransactionClient";

const TransactionsPage = () => {
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <TransactionClient/>
    </main>
  );
};

export default TransactionsPage;
