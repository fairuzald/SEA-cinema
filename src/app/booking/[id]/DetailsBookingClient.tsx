"use client"

// Component and React imports
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

// DetailsBookingClient component
const DetailsBookingClient = ({
  booking,
  id,
}: {
  booking: any;
  id: string;
}) => {
  const router = useRouter();

  // Date handling
  const currentDate = new Date(); 
  const targetDate = new Date(booking.watchDate); 
  const [hours, minutes] = booking.watchTime.split(':').map(Number);
  // Sets the target time to the given time, but with the same date as the current date
  targetDate.setHours(hours);
  targetDate.setMinutes(minutes);
  targetDate.setSeconds(0);
  targetDate.setMilliseconds(0);
  const isExpired = targetDate.getTime() < currentDate.getTime()
  
  // Function to format the date
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };

  // Function to handle cancellation
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
      <Breadcrumbs currentText={booking.bookingNumber} />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Booking Info */}
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-8 lg:gap-14 2xl:gap-20 flex flex-col lg:flex-row items-center">
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
            <h1 className="text-red font-bold text-2xl lg:text-4xl">
              {booking.movie.title}
            </h1>
            {/* Description */}
            <h3 className="text-white font-medium text-sm lg:text-lg">
              {booking.movie.description}
            </h3>
            {/* Age */}
            <h3 className="bg-white rounded-lg text-black text-sm lg:text-lg font-bold p-1.5 lg:px-2 text-center w-fit">
              {booking.movie.age_rating} +
            </h3>
            {/* Mall */}
            <h3 className="text-white font-medium text-sm lg:text-lg">
              {booking.location.mall}
            </h3>
            {/* Location */}
            <h3 className="text-white font-medium text-sm lg:text-lg">
              {booking.location.address}
            </h3>
            {/* Date */}
            <h3 className="text-white font-medium text-sm lg:text-lg">
              {formattedDate(booking.watchDate)} | {booking.watchTime}
            </h3>
          </div>
        </section>

        {/* Bookers Info */}
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-4 flex flex-col">
          <h2 className="text-red font-semibold text-xl lg:text-2xl">
            Booking User Information
          </h2>
          <div className="flex  gap-x-20 items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <h3>Name </h3>
              <h3>Username</h3>
              <h3>Age</h3>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>{booking.user.name}</p>
              <p>{booking.user.username}</p>
              <p>{booking.user.age}</p>
            </div>
          </div>
        </section>

        {/* Booking Info */}
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 border-b border-gray gap-4 flex flex-col">
          <h2 className="text-red font-semibold text-xl lg:text-2xl">
            Booking Information
          </h2>
          <div className="flex  gap-x-20 items-center">
            {/* Placeholder data */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <h3>Code Booking </h3>
              <h3>Booking Date</h3>
              <h3>{booking.seat.length} Ticket</h3>
              <h3>Each Seat</h3>
            </div>
            {/* Data Booking Info */}
            <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2.5">
              <p>{booking.bookingNumber}</p>
              <p>{formattedDate(booking.createdAt)}</p>
              <p>
                {booking.seat.map((item: string, index: number) =>
                  index !== booking.seat.length - 1 ? item + ", " : item
                )}
              </p>
              <p>
                Rp {booking.movie.ticket_price.toLocaleString("id-Id")}
                <span className="text-gray"> x {booking.seat.length}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Payment Status */}
        <section className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10 gap-20 flex  items-center">
          {/* Placeholder data */}
          <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
            <h2>Total Payment</h2>
            <h2>Status</h2>
          </div>
          {/* Data Booking Info */}
          <div className="text-white font-medium text-sm lg:text-xl flex flex-col gap-2">
            <p>Rp. {booking.totalPrice.toLocaleString("id-Id")}</p>
            <Button color="red">{booking.status as string}</Button>
          </div>
        </section>
      </div>
      { }
      <div className="w-full px-6 sm:px-10 mx-auto md:px-14 lg:px-20 xl:px-24 py-7 lg:py-10  gap-5 flex flex-col items-center">
        {/* Cancel Order */}
        <p className="text-red font-semibold text-base lg:text-2xl">
          Do you want to {isExpired ? "delete the history order" : "cancel this order"} ?
        </p>
        <Button color="red" onClick={handleCancel}>
          {isExpired ? "Delete History" : "Cancel Order"}
        </Button>
      </div>
    </div>
  );
};

export default DetailsBookingClient;
