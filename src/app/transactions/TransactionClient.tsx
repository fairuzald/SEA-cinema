"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import React, { useState } from "react";
import { User } from "@prisma/client";
import CardBalance from "@/components/CardBalance";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TransactionClient = ({
  topUpBalances,
  withdrawalBalances,
  sharedBalances,
  receivedBalances,
}: {
  topUpBalances: any;
  withdrawalBalances: any;
  sharedBalances: any;
  receivedBalances: any;
}) => {
  
  const params = useSearchParams();
  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Toggle query active and inactive */}
        <div className="flex border-b border-gray justify-center md:justify-start items-end gap-10 pt-4 md:px-10">
          <Link href="?topup">
            <p
              className={`${
                params.has("topup")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4  rounded-t-lg`}
            >
              Topup
            </p>
          </Link>
          <Link href="?share-balance">
            <p
              className={`${
                params.has("share-balance")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4  rounded-t-lg`}
            >
              Share Balance
            </p>
          </Link>
          <Link href="?withdrawal">
            <p
              className={`${
                params.has("withdrawal")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4  rounded-t-lg`}
            >
              Withdrawal
            </p>
          </Link>
        </div>
        <div className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-10 pb-10">
          {/* Filter  */}

          {params.has("topup") && (
            <div className="flex flex-col gap-3">
              {topUpBalances?.map((data: any) => (
                <CardBalance
                  title="Top Up"
                  userId={data.userName}
                  key={data.id as string}
                  amount={data.amount}
                  id={data.id}
                  dateTime={data.createdAt}
                />
              ))}
            </div>
          )}
          {params.has("withdrawal") && (
            <div className="flex flex-col gap-3">
              {withdrawalBalances?.map((data: any) => (
                <CardBalance
                  title="Withdrawal"
                  userId={data.userName}
                  key={data.id as string}
                  amount={data.amount}
                  id={data.id}
                  dateTime={data.createdAt}
                />
              ))}
            </div>
          )}
          {params.has("share-balance") && (
            <>
              <div className="flex flex-col gap-3">
                {receivedBalances?.map((data: any) => (
                  <CardBalance
                    title="Received Balance"
                    userId={data.senderName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {sharedBalances?.map((data: any) => (
                  <CardBalance
                    title="Share Balance"
                    userId={data.receiverName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
