"use client";

// Component and React imports
import Breadcrumbs from "@/components/Breadcrumbs";
import React, { useEffect, useState } from "react";

// Other component imports
import CardBalance from "@/components/CardBalance";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";

// TransactionClient component
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
  // React hooks
  const router = useRouter();
  const params = useSearchParams();

  // Redirect if params don't contain necessary values
  useEffect(() => {
    if (
      !params ||
      (!params.has("topup") &&
        !params.has("withdrawal") &&
        !params.has("received-balance") &&
        !params.has("share-balance"))
    ) {
      router.replace("?topup");
    }
  }, [params, router]);

  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] pb-20 lg:p-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Toggle query filters*/}
        <section className="flex border-b border-gray justify-center md:justify-start items-end md:gap-5 lg:gap-10 pt-4 md:px-10">
          {/* Topup */}
          <Link href="?topup">
            <h2
              className={`${
                params.has("topup")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-extrabold lg:font-bold text-[12px] md:text-[17px] lg:text-xl md:px-10 py-3 px-4 lg:py-4  rounded-t-lg`}
            >
              Topup
            </h2>
          </Link>
          {/* Received Balance */}
          <Link href="?received-balance">
            <h2
              className={`${
                params.has("received-balance")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-extrabold lg:font-bold text-[12px] md:text-[17px] lg:text-xl md:px-10 py-3 px-4 lg:py-4  rounded-t-lg`}
            >
              Received Balance
            </h2>
          </Link>
          {/* Share Balance */}
          <Link href="?share-balance">
            <h2
              className={`${
                params.has("share-balance")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-extrabold lg:font-bold text-[12px] md:text-[17px] lg:text-xl md:px-10 py-3 px-4 lg:py-4  rounded-t-lg`}
            >
              Share Balance
            </h2>
          </Link>
          {/* Withdrawal */}
          <Link href="?withdrawal">
            <h2
              className={`${
                params.has("withdrawal")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-extrabold lg:font-bold text-[12px] md:text-[17px] lg:text-xl md:px-10 py-3 px-4 lg:py-4  rounded-t-lg`}
            >
              Withdrawal
            </h2>
          </Link>
        </section>
        <div className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-10 pb-10">
          {/* Filter Topup Content */}
          {params.has("topup") && (
            <section className="flex flex-col gap-3">
              {topUpBalances.length ? (
                topUpBalances?.map((data: any) => (
                  <CardBalance
                    title="Top Up"
                    userId={data.userName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))
              ) : (
                <h1 className="flex flex-col flex-auto text-white text-2xl lg:text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
                  No Data Found
                </h1>
              )}
            </section>
          )}
          {/* Filter Withdrawal Content */}
          {params.has("withdrawal") && (
            <section className="flex flex-col gap-3">
              {withdrawalBalances.length > 0 ? (
                withdrawalBalances?.map((data: any) => (
                  <CardBalance
                    title="Withdrawal"
                    userId={data.userName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))
              ) : (
                <h1 className="flex flex-col flex-auto text-white text-2xl lg:text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
                  No Data Found
                </h1>
              )}
            </section>
          )}
          {/* Filter Received Balance Content */}
          {params.has("received-balance") && (
            <section className="flex flex-col gap-3">
              {receivedBalances.length > 0 ? (
                receivedBalances?.map((data: any) => (
                  <CardBalance
                    title="Received Balance"
                    userId={data.senderName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))
              ) : (
                <h1 className="flex flex-col flex-auto text-white text-2xl lg:text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
                  No Data Found
                </h1>
              )}
            </section>
          )}
          {/* Filter Share Balance Content */}
          {params.has("share-balance") && (
            <section className="flex flex-col gap-3">
              {sharedBalances.length > 0 ? (
                sharedBalances?.map((data: any) => (
                  <CardBalance
                    title="Share Balance"
                    userId={data.receiverName}
                    key={data.id as string}
                    amount={data.amount}
                    id={data.id}
                    dateTime={data.createdAt}
                  />
                ))
              ) : (
                <h1 className="flex flex-col flex-auto text-white text-2xl lg:text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
                  No Data Found
                </h1>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
