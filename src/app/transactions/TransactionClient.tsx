"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Image from "next/image";
import React, { useState } from "react";
import { Range } from "react-date-range";
import Calendar from "./Calendar";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const TransactionClient = () => {
  const [codeBooking, setCodeBooking] = useState("");
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };
  console.log(dateRange);
  return (
    <div className="w-full px-4 md:px-20 lg:px-24 xl:px-28 2xl:px-32 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
        {/* Toggle query active and inactive */}
        <div className="flex border-b border-gray justify-center md:justify-start items-end gap-10 pt-4 md:px-10">
          <p className="text-white font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-5 lg:py-4">
            Active
          </p>
          <p className="text-red font-bold text-[15px] md:text-[17px] lg:text-xl md:px-10 py-3 px-9 lg:py-4 border border-red rounded-t-lg">
            Finish
          </p>
        </div>
        <div className="flex flex-col w-full gap-2 lg:gap-4 px-5 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-6 pb-10">
          {/* Filter  */}
          <div className="flex gap-6 lg:gap-10 w-full pb-4 justify-center md:justify-start">
            {/* Container tanggal booking */}
            <div className="flex-col flex gap-2">
              {/* Tanggal Booking */}
              <p className="text-white font-semibold text-sm lg:text-lg">
                Tanggal Booking
              </p>
              <button
                className="relative flex gap-4 justify-between bg-[#d9d9d9]  items-center rounded-lg py-2 px-3 w-[140px] lg:w-[200px] truncate"
                onClick={() => setIsCalendarOpen(true)}
              >
                <p>
                  {dateRange.startDate && formatDate(dateRange.startDate)}

                  {dateRange.startDate !== dateRange.endDate &&
                    dateRange.endDate &&
                    "-" + formatDate(dateRange.endDate)}
                </p>
              </button>
              {isCalendarOpen && (
                <div className="absolute top-[408px]">
                  <Calendar
                    setIsCalendarOpen={setIsCalendarOpen}
                    onChange={(value) => {
                      setDateRange(value.selection as Range);
                    }}
                    value={dateRange}
                  />
                </div>
              )}
            </div>
            {/* Container kode booking */}
            <div className="flex-col flex gap-2">
              {/* Kode Booking */}
              <p className="text-white font-medium text-sm lg:text-lg">
                Kode Booking
              </p>
              <TextInput
                type="text"
                text={codeBooking}
                setText={setCodeBooking}
                placeholder="Kode Booking"
              />
            </div>
          </div>
          {/* Mapping */}
          <div className="flex border items-center justify-center md:items-start md:justify-start border-gray gap-8 lg:gap-10 2xl:gap-14 px-4 md:px-8 lg:px-10 2xl:px-24 py-4 lg:py-10">
            {/* Image */}
            <Image
              src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
              width="1920"
              height="1080"
              alt="image"
              className="hidden md:flex rounded-xl w-[146px] h-[220px] object-center object-cover "
            />
            {/* Text content */}
            <div className="flex justify-between w-full gap-8 lg:flex-1 ">
              {/* Content container */}
              <div className="flex flex-col gap-1 justify-between">
                <div className="flex flex-col gap-1.5">
                  {/* title */}
                  <p className="text-white text-sm md:text-base lg:text-xl font-semibold capitalize">
                    MENCURI RADEN SALEH
                  </p>
                  {/* Location */}
                  <div className="flex gap-2  items-center">
                    <LocationIcon style="w-3 h-3 lg:w-5 lg:h-5 fill-red" />
                    <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
                      XX7 Mall ABC
                    </p>
                  </div>
                  {/* Ticket Count   */}
                  <div className="flex gap-2  items-center">
                    <TicketIcon style="w-3 h-3 lg:w-5 lg:h-5 fill-red" />
                    <p className="text-white font-medium text-xs md:text-sm lg:text-lg">
                      Ticket (6 People)
                    </p>
                  </div>
                  {/* Date */}
                  <p className="text-[#d9d9d9] font-medium text-xs lg:text-base">
                    Kamis, 01 Sept 2023
                  </p>
                </div>
                {/* Status */}
                <p className="text-xs md:text-sm lg:text-lg font-semibold text-white flex gap-2 lg:gap-3 items-center">
                  Status : <Button color="red">Success</Button>
                </p>
              </div>
              {/* Price and detail button */}
              <div className="flex items-center justify-center flex-col gap-2">
                <p className="text-sm md:text-base lg:text-2xl font-bold text-red">
                  Rp. 50000
                </p>
                <Button color="red">Details</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionClient;
