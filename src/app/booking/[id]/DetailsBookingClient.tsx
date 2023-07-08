"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const DetailsBookingClient = ({
  booking,
  id,
}: {
  booking: any;
  id: string;
}) => {
  const router = useRouter();
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };
  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/booking/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/booking");
        router.refresh();
        return toast.success("Your booking was cancelled");
      } else {
        const errorMessage = await response.json();
        return toast.error(errorMessage.message);
      }
    } catch (err: any) {
      return toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full px-5 sm:px-20 lg:px-16 overflow-hidden my-20 2xl:px-28 lg:pt-[60px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Movies Info */}
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-8 lg:gap-14 2xl:gap-20 flex flex-col lg:flex-row justify-between items-center">
          <Image
            src={booking.movie.poster_url}
            width="1920"
            height="1080"
            alt={booking.movie.title}
            className="rounded-xl w-[200px] h-[350px] lg:w-[269px] lg:h-[393px] object-center object-cover "
          />
          {/* Text Movie Info */}
          <div className="flex flex-col gap-2.5">
            {/* Title */}
            <h2 className="text-red font-bold text-2xl lg:text-4xl">
              {booking.movie.title}
            </h2>
            {/* Description */}
            <p className="text-white font-medium text-sm lg:text-lg">
              {booking.movie.description}
            </p>
            {/* Age */}
            <p className="bg-white rounded-lg text-black text-sm lg:text-lg font-bold p-1.5 lg:px-2 text-center w-fit">
              {booking.movie.age_rating} +
            </p>
            {/* Mall */}
            <p className="text-white font-medium text-sm lg:text-lg">
              {booking.location.mall}
            </p>
            {/* Locatioun */}
            <p className="text-white font-medium text-sm lg:text-lg">
              {booking.location.address}
            </p>
            {/* Date */}
            <p className="text-white font-medium text-sm lg:text-lg">
              {formattedDate(booking.watchDate)} | {booking.watchTime}
            </p>
          </div>
        </div>
        {/* Bookers Info */}

        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-4 flex flex-col">
          <p className="text-red font-semibold text-2xl">
            Booking User Information
          </p>
          <div className="flex  gap-x-20 items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>Name </p>
              <p>Username</p>
              <p>Age</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>{booking.user.name}</p>
              <p>{booking.user.username}</p>
              <p>{booking.user.age}</p>
            </div>
          </div>
        </div>
        {/* Booking Info */}
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-4 flex flex-col">
          <p className="text-red font-semibold text-2xl">Booking Information</p>
          <div className="flex  gap-x-20 items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>Code Booking </p>
              <p>Booking Date</p>
              <p>{booking.seat.length} Ticket</p>
              <p>Each Seat</p>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>{booking.bookingNumber}</p>
              <p>{formattedDate(booking.createdAt)}</p>
              <p>
                {booking.seat.map((item: string, index: number) =>
                  index !== booking.seat.length-1 ? item + ", " : item
                )}
              </p>
              <p>
                Rp {booking.movie.ticket_price.toLocaleString("id-Id")}
                <span className="text-gray"> x {booking.seat.length}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-20 flex  items-center">
          {/* Placeholder data */}
          <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
            <p>Total Payment</p>
            <p>Status</p>
          </div>
          {/* Data Booking Info */}
          <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
            <p>Rp. {booking.totalPrice.toLocaleString("id-Id")}</p>
            <Button color="red">{booking.status as string}</Button>
          </div>
        </div>
      </div>
      <div className="w-full px-6 sm:px-10 mx-auto md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10  gap-5 flex flex-col items-center">
        {/* Cancel Order */}
        <p className="text-red font-semibold text-base lg:text-2xl">
          Do you want to cancel this order?
        </p>
        <Button color="red" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DetailsBookingClient;
