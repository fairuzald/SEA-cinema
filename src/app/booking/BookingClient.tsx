"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import React from "react";
import { Transaction } from "@prisma/client";
import CardTransaction from "@/components/CardTransaction";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { isAfter, isBefore } from "date-fns";

const BookingClient = ({ bookings = [] }: { bookings?: Transaction[] }) => {
  const params = useSearchParams();
  const today = new Date();
  const upcomingBookings = bookings?.filter((data: any) =>
    isAfter(new Date(data.watchDate), today)
  );

  const pastBookings = bookings?.filter((data: any) =>
    isBefore(new Date(data.watchDate), today)
  );
  const renderBookings = (bookings: any[]) => {
    return bookings.length > 0 ? (
      <div className="flex flex-col gap-3">
        {bookings.map((data: any) => (
          <CardTransaction key={data.id} data={data} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col flex-auto text-white text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
        No Data Found
        <Link href="/booking">
          <Button color="trans-red" size="large">
            Clear Filterd
          </Button>
        </Link>
      </div>
    );
  };
  const renderUpcomingBookings = renderBookings(upcomingBookings);

  const renderPastBookings = renderBookings(pastBookings);

  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        <div className="flex border-b border-gray justify-center md:justify-start items-end gap-10 pt-4 md:px-10">
          <Link href="?active">
            <p
              className={`${
                params.has("active")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4  rounded-t-lg`}
            >
              Active
            </p>
          </Link>
          <Link href="?finish">
            <p
              className={`${
                params.has("finish")
                  ? "text-red border  border-red"
                  : "text-white"
              } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4  rounded-t-lg`}
            >
              Finish
            </p>
          </Link>
        </div>
        <div className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-10 pb-10">
          {params.has("active")
            ? renderUpcomingBookings
            : params.has("finish")
            ? renderPastBookings
            : renderBookings(bookings)}
        </div>
      </div>
    </div>
  );
};

export default BookingClient;