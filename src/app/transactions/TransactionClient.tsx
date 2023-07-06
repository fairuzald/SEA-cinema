"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import LocationIcon from "@/components/icons/LocationIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Image from "next/image";
import React, { useState } from "react";
import { Range } from "react-date-range";
import Calendar from "../../components/icons/Calendar";
import { ShareBalance, Topup, User, Withdrawal } from "@prisma/client";
import CardTransaction from "@/components/CardTransaction";
import CardBalance from "@/components/CardBalance";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const TransactionClient = ({
  currentUser,
  topUpBalances,
  withdrawalBalances,
  sharedBalances,
  receivedBalances,
}: {
  currentUser: User | null;
  topUpBalances: any;
  withdrawalBalances: any;
  sharedBalances: any;
  receivedBalances: any;
}) => {
  const [codeBooking, setCodeBooking] = useState("");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Toggle query active and inactive */}
        <div className="flex border-b border-gray justify-center md:justify-start items-end gap-10 pt-4 md:px-10">
          <p className="text-white font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-5 lg:py-4">
            Active
          </p>
          <p className="text-red font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4 border border-red rounded-t-lg">
            Finish
          </p>
        </div>
        <div className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-6 pb-10">
          {/* Filter  */}
          <div className="flex gap-6 lg:gap-10 w-full pb-4 justify-center md:justify-start">
            {/* Container tanggal booking */}
            <div className="flex-col flex gap-2">
              {/* Tanggal Booking */}
              <p className="text-white font-semibold text-sm lg:text-lg">
                Tanggal Booking
              </p>
              <button
                className="relative flex gap-4 justify-between bg-[#d9d9d9]  items-center rounded-lg py-2 px-3 w-[140px] lg:w-[200px] truncate"
                onClick={() => setIsCalendarOpen(true)}
              >
                <p>
                  {dateRange.startDate && formatDate(dateRange.startDate)}

                  {dateRange.startDate !== dateRange.endDate &&
                    dateRange.endDate &&
                    "-" + formatDate(dateRange.endDate)}
                </p>
              </button>
              {isCalendarOpen && (
                <div className="absolute top-[408px]">
                  <Calendar
                    setIsCalendarOpen={setIsCalendarOpen}
                    onChange={(value) => {
                      setDateRange(value.selection as Range);
                    }}
                    value={dateRange}
                  />
                </div>
              )}
            </div>
            {/* Container kode booking */}
            <div className="flex-col flex gap-2">
              {/* Kode Booking */}
              <p className="text-white font-medium text-sm lg:text-lg">
                Kode Booking
              </p>
              <TextInput
                type="text"
                text={codeBooking}
                setText={setCodeBooking}
                placeholder="Kode Booking"
              />
            </div>
          </div>
          {/* Mapping */}
          {/* Image */}

          <CardTransaction />
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
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
