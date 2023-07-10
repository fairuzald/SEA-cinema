import React from "react";
import { Transaction, User } from "@prisma/client";
import BookingClient from "./BookingClient";
import getBooking from "../actions/getBooking";
import getCurrentUser from "../actions/getCurrentuser";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";

// Generate metadata title
export const metadata = {
  title: "Booking Page"
}

const BookingPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return notFound();
  }
  const bookings = await getBooking(currentUser?.id as string);
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <BookingClient bookings={bookings as Transaction[]} />
    </main>
  );
};

export default BookingPage;
