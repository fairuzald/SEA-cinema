"use client"

// React and component imports
import React, { useCallback } from "react";
import Button from "./Button";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// CardBalance component
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
  const router = useRouter();

  // Function to handle deletion of top-up history
  const onDeleteTopUp = useCallback(async () => {
    try {
      const response = await fetch(`/api/topup/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        toast.success(`Topup History Deleted`);
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [id, router]);

  // Function to handle deletion of withdrawal history
  const onDeleteWithdrawal = useCallback(async () => {
    try {
      const response = await fetch(`/api/withdrawal/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        toast.success(`Withdrawal History Deleted`);
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [id, router]);

  // Function to handle deletion of shared balance
  const onDeleteSharedBalance = useCallback(async () => {
    try {
      const response = await fetch(`/api/share-balance/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
        toast.success(`Shared Balance Deleted`);
      } else {
        throw new Error("Request failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }, [id, router]);

  return (
    <div className="flex border items-center justify-center md:items-start md:justify-start border-gray gap-8 lg:gap-10 2xl:gap-14 px-4 md:px-8 lg:px-10 2xl:px-24 py-4 lg:py-10">
      <div className="flex justify-between w-full gap-8 lg:flex-1 ">
        {/* Content container */}
        <div className="flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-1.5">
            {/* title */}
            <h3 className="text-white text-sm md:text-base lg:text-xl font-semibold capitalize">
              {title}
            </h3>
            {/* Date */}
            <h4 className="text-[#d9d9d9] font-medium text-xs lg:text-base">
              {title === "Share Balance"
                ? "To : "
                : title === "Received Balance"
                  ? "From : "
                  : "By : "}{" "}
              {userId}
            </h4>
            <h4 className="text-[#d9d9d9] font-medium text-xs lg:text-base">
              {dateTime && formattedDate(dateTime)}
            </h4>
          </div>
          {/* Status */}
          <h4 className="text-xs md:text-sm lg:text-lg font-semibold text-white flex gap-2 lg:gap-3 items-center">
            Status : <Button color="red">Success</Button>
          </h4>
        </div>
        {/* Price and detail button */}
        <div className="flex items-center justify-center flex-col gap-2">
          <h4
            className={`text-xs md:text-base lg:text-2xl font-bold ${title === "Received Balance" || title === "Top Up" ? "text-green-500" : "text-red"
              } `}
          >
            {title === "Received Balance" || title === "Top Up" ? "+" : "-"}Rp. {amount?.toLocaleString("id-ID")}
          </h4>
          <Button
            color="red"
            onClick={
              title === "Top Up"
                ? onDeleteTopUp
                : title === "Withdrawal"
                  ? onDeleteWithdrawal
                  : onDeleteSharedBalance
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardBalance;
