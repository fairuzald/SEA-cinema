"use client"

// Component and React imports
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";

// Prisma import
import { Transaction } from "@prisma/client";

// Other component imports
import CardTransaction from "@/components/CardTransaction";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { isAfter, isBefore } from "date-fns";
import TextInput from "@/components/TextInput";
import CrossIcon from "@/components/icons/CrossIcon";

// BookingClient component
const BookingClient = ({ bookings = [] }: { bookings?: Transaction[] }) => {
  const params = useSearchParams();
  const today = new Date();

  // State variable code booking search
  const [codeBooking, setCodeBooking] = useState("");

  // Filter upcoming and past bookings
  const upcomingBookings = bookings?.filter((data: any) =>
    isAfter(new Date(data.watchDate), today)
  );
  const pastBookings = bookings?.filter((data: any) =>
    isBefore(new Date(data.watchDate), today)
  );

  // Function to render bookings
  const renderBookings = (bookings: any[]) => {
    return bookings.length > 0 ? (
      <div className="flex flex-col gap-4 md:gap-7 lg:gap-8">
        {bookings.map((data: any) => (
          <CardTransaction key={data.id} data={data} />
        ))}
      </div>
    ) : (
      <h1 className="flex flex-col flex-auto text-white text-2xl lg:text-3xl gap-10 font-bold items-center justify-center w-full text-center h-[400px]">
        No Data Found
        <Link href="/booking">
          <Button color="trans-red" size="large">
            Clear Filter
          </Button>
        </Link>
      </h1>
    );
  };

  // Render upcoming and past bookings
  const renderUpcomingBookings = renderBookings(upcomingBookings);
  const router = useRouter();
  const renderPastBookings = renderBookings(pastBookings);

  // Redirect if params don't contain necessary values
  useEffect(() => {
    if (params && !params.has("active") && !params.has("finish")) {
      router.replace("");
    }
  }, [params, router]);

  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] pb-20 lg:p-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Params settings */}
        <section className="flex border-b border-gray justify-center md:justify-start items-end gap-10 pt-4 md:px-10">
          {/* Active */}
          <Link href={params.has("active") ? "/booking" : "?active"}>
            <h2
              className={`${params.has("active")
                ? "text-red border border-red"
                : "text-white"
                } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4 rounded-t-lg`}
            >
              Active
            </h2>
          </Link>
          {/* Finish */}
          <Link href={params.has("finish") ? "/booking" : "?finish"}>
            <h2
              className={`${params.has("finish")
                ? "text-red border border-red"
                : "text-white"
                } font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4 rounded-t-lg`}
            >
              Finish
            </h2>
          </Link>
        </section>

        <section className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-10 pb-10">
          {/* Search code booking */}
          <div className="flex flex-col gap-3 mb-4">
            <h3 className="font-semibold text-lg lg:text-2xl text-red">Find Your Code Booking</h3>
            <div className="flex gap-4">
              <TextInput text={codeBooking} setText={setCodeBooking} type="text" placeholder="Code Booking" />
              <button onClick={() => { setCodeBooking("") }}><CrossIcon style="w-5 h-5 fill-white" /></button>
            </div>
          </div>
          {/* Render cards details */}
          {!codeBooking ? params.has("active")
            ? renderUpcomingBookings
            : params.has("finish")
              ? renderPastBookings
              : renderBookings(bookings) : renderBookings(bookings.filter(booking => booking.bookingNumber.includes(codeBooking)))}
        </section>
      </div>
    </div>
  );
};

export default BookingClient;
