import React from "react";
import LocationIcon from "./icons/LocationIcon";
import TicketIcon from "./icons/TicketIcon";
import Button from "./Button";
import Image from "next/image";
import { Transaction } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";

const CardTransaction = ({ data }: { data: any }) => {
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };
  return (
    <div className="flex border items-center justify-center md:items-start md:justify-start border-gray gap-8 lg:gap-10 2xl:gap-14 px-4 md:px-8 lg:px-10 2xl:px-24 py-4 lg:py-10">
      <Image
        src={data.movie.poster_url}
        width="1920"
        height="1080"
        alt={data.movie.title}
        className="hidden md:flex rounded-xl w-[146px] h-[220px] object-center object-cover "
      />
      <div className="flex justify-between w-full gap-8 lg:flex-1 ">
        {/* Content container */}
        <div className="flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-1.5">
            {/* title */}
            <p className="text-white text-sm md:text-base lg:text-xl font-semibold capitalize">
              {data.movie.title}
            </p>
           
            {/* Location */}
            <div className="flex gap-2  items-center">
              <LocationIcon style="w-3 h-3 lg:w-5 lg:h-5 fill-red" />
              <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
                {data.location.mall}
              </p>
            </div>
            {/* Ticket Count   */}
            <div className="flex gap-2  items-center">
              
              <TicketIcon style="w-3 h-3 lg:w-5 lg:h-5 fill-red" />
              <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
                Ticket (
                {data.seat.length >= 2
                  ? data.seat.length + " people"
                  : data.seat.length + " person"}
                )
              </p>
            </div>
            <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
               Code Booking:  {data.bookingNumber}</p>
            {/* Date */}
            <p className="text-[#d9d9d9] font-medium text-xs lg:text-base">
              {formattedDate(data.watchDate) + " | " + data.watchTime}
            </p>
          </div>
          {/* Status */}
          <p className="text-xs md:text-sm capitalize lg:text-lg font-semibold text-white flex gap-2 lg:gap-3 items-center">
            Status : <Button color="red">{data.status}</Button>
          </p>
        </div>
        {/* Price and detail button */}
        <div className="flex items-center justify-center flex-col gap-2">
          <p className="text-sm md:text-base lg:text-2xl font-bold text-red">
            Rp. {data.totalPrice.toLocaleString("id-Id")}
          </p>

          <Link href={`/booking/${data.id}`}>
          <Button color="red">Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardTransaction;
