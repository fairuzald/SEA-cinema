import React from "react";
import TicketIcon from "./icons/TicketIcon";
import Button from "./Button";
import { format } from "date-fns";

const CardBalance = ({
  title,
  dateTime,
  id,
  userId,
  amount,
}: {
  title?: "Top Up" | "Withdrawal" | "Share Balance" | "Received Balance";
  dateTime?: Date;
  id?: string;
  userId: string;
  amount?: number;
}) => {
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy | HH.mm");
  };

  return (
    <div className="flex border items-center justify-center md:items-start md:justify-start border-gray gap-8 lg:gap-10 2xl:gap-14 px-4 md:px-8 lg:px-10 2xl:px-24 py-4 lg:py-10">
      <div className="flex justify-between w-full gap-8 lg:flex-1 ">
        {/* Content container */}
        <div className="flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-1.5">
            {/* title */}
            <p className="text-white text-sm md:text-base lg:text-xl font-semibold capitalize">
              {title}
            </p>
            {/* Location */}

            {/* Ticket Count   */}
            <div className="flex gap-2  items-center">
              <TicketIcon style="w-3 h-3 lg:w-5 lg:h-5 fill-red" />
              <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
                {id}
              </p>
            </div>

            {/* Date */}
            <p className="text-[#d9d9d9] font-medium text-xs lg:text-base">
              {title === "Share Balance"
                ? "To : "
                : title === "Received Balance"
                ? "From : "
                : "By : "}{" "}
              {userId}
            </p>
            <p className="text-[#d9d9d9] font-medium text-xs lg:text-base">
              {dateTime && formattedDate(dateTime)}
            </p>
          </div>
          {/* Status */}
          <p className="text-xs md:text-sm lg:text-lg font-semibold text-white flex gap-2 lg:gap-3 items-center">
            Status : <Button color="red">Success</Button>
          </p>
        </div>
        {/* Price and detail button */}
        <div className="flex items-center justify-center flex-col gap-2">
          <p
            className={`text-sm md:text-base lg:text-2xl font-bold ${
              title === "Received Balance" ? "text-green-500" : "text-red"
            } `}
          >
            {title === "Received Balance" ? "+" : "-"} {amount}
          </p>
          <Button color="red">Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default CardBalance;
