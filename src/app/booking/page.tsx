import React from "react";
import { Transaction, User } from "@prisma/client";
import BookingClient from "./BookingClient";
import getBooking from "../actions/getBooking";
export const dynamic = "force-dynamic";

const BookingPage = async () => {
  const bookings = await getBooking();
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <BookingClient bookings={bookings as Transaction[]} />
    </main>
  );
};

export default BookingPage;
