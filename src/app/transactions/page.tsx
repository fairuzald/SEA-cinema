import React from "react";
import TransactionClient from "./TransactionClient";
import getCurrentUser from "../actions/getCurrentuser";
import { User } from "@prisma/client";
import getReceivedBalance from "../actions/getReceivedBalance";
import getSharedBalance from "../actions/getSharedBalance";
import getTopUp from "../actions/getTopup";
import getWithdrawal from "../actions/getWithdrawal";

const TransactionsPage = async () => {
  const currentUser = await getCurrentUser();
  const receivedBalances = await getReceivedBalance(currentUser?.id as string);
  const sharedBalances = await getSharedBalance(currentUser?.id as string);
  const topUpBalances = await getTopUp(currentUser?.id as string);
  const withdrawalBalances = await getWithdrawal(currentUser?.id as string);
  console.log(receivedBalances)
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <TransactionClient
        currentUser={currentUser as User}
        receivedBalances={receivedBalances}
        sharedBalances={sharedBalances}
        topUpBalances={topUpBalances}
        withdrawalBalances={withdrawalBalances}
      />
    </main>
  );
};

export default TransactionsPage;
