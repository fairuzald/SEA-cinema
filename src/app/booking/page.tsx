import React from "react";
import { Transaction, User } from "@prisma/client";
import BookingClient from "./BookingClient";
import getBooking from "../actions/getBooking";
import getCurrentUser from "../actions/getCurrentuser";
export const dynamic = "force-dynamic";

const BookingPage = async () => {
  const currentUser = await getCurrentUser();
  const bookings = await getBooking(currentUser?.id as string);
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <BookingClient bookings={bookings as Transaction[]} />
    </main>
  );
};

export default BookingPage;
