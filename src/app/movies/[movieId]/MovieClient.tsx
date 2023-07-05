"use client";
import useSeatModal from "@/app/hooks/useSeatModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import DateSelection from "@/components/DateSelection";
import Location from "@/components/Location";
import Timer from "@/components/Timer";
import SeatModal from "@/components/modals/SeatModals";
import Image from "next/image";
import React, { useState } from "react";
enum STEPS {
  DATE_SELECTION = 1,
  SEAT_SELECTION = 2,
  PAYMENT = 3,
}

const MovieClient = ({ data: movie }: { data: any }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<any>();
  const [step, setStep] = useState<STEPS>(STEPS.DATE_SELECTION); // Use STEPS.DATE_SELECTION instead of DATE_SELECTION
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const data = [
    {
      mall: "XX7 Mall A",
      address: "Jl. Raya ABC",
      price: 35000,
      times: ["13.00", "14.00", "15.00"],
    },
    {
      mall: "XX7 Mall B",
      address: "Jl. Raya DEF",
      price: 45000,
      times: ["16.00", "17.00", "18.00"],
    },
    {
      mall: "XX7 Mall C",
      address: "Jl. Raya GHI",
      price: 55000,
      times: ["19.00", "20.00", "21.00"],
    },
  ];
  // Handle formatting date
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }
  const seatModal = useSeatModal();
  return (
    <div className="w-full px-8 sm:px-20 lg:px-16 py-10 xl:py-20 2xl:px-28 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      <Breadcrumbs currentText={movie.title} />
      {step !== STEPS.PAYMENT ? (
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-16 2xl:gap-24">
          {/* Left Side for Poster and Button*/}
          <div className="flex flex-col items-center gap-14">
            <h2 className="font-bold flex lg:hidden text-3xl lg:text-4xl text-white">
              {movie.title}
            </h2>
            <Image
              src={movie.poster_url}
              alt={movie.title}
              width={1920}
              height={1080}
              className="object-center object-cover w-full h-full sm:w-[350px] lg:w-[400px] md:h-[550px] xl:w-[518px] xl:h-[632px] rounded-xl"
            />
            <p className="hidden lg:flex text-white text-base lg:text-lg font-medium w-[calc(100%-100px)] text-center">
              Select schedule and location and then click below to order
            </p>
            <div className="hidden lg:flex">
              <Button
                color="red"
                onClick={() => {
                  seatModal.onOpen();
                }}
              >
                Order Ticket Now
              </Button>
            </div>
          </div>
          {/* Right Side for the content */}
          <div className="flex flex-col lg:w-[calc(100%-400px)] xl:w-[calc(100%-518px)] gap-7">
            {/* Title */}
            <h2 className="font-bold lg:flex hidden text-3xl lg:text-4xl text-white">
              {movie.title}
            </h2>
            {/* Container for releasedate, price and age */}
            <div className="flex gap-3">
              <div className="flex flex-col text-base lg:text-lg font-semibold text-red">
                <p>Release Date</p>
                <p>Price</p>
                <p>Age</p>
              </div>
              <div className="flex flex-col text-base lg:text-lg font-semibold text-white">
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div className="flex flex-col text-base lg:text-lg font-semibold text-white">
                <p>{formatDate(movie.release_date)}</p>
                <p>{movie.ticket_price}</p>
                <p>{movie.age_rating}</p>
              </div>
            </div>
            {/* Description */}
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold text-lg lg:text-xl text-red">
                Description
              </h2>
              <p className="w-full font-light text-sm lg:text-base text-white">
                {movie.description}
              </p>
            </div>
            {/* Schedule */}
            <div className="flex flex-col gap-2 w-full">
              <h2 className="font-bold text-lg lg:text-xl text-red">
                Schedule
              </h2>
              <DateSelection
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </div>
            {/* Location */}
            <div className="flex flex-col gap-4 w-full">
              <h2 className="font-bold text-lg lg:text-xl text-red">
                Location
              </h2>
              <div></div>
              <Location
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                data={data}
              ></Location>
            </div>
          </div>
          <div className="flex mx-auto lg:hidden flex-col items-center justify-center gap-6">
            <p className="flex lg:hidden text-white text-base lg:text-lg font-medium w-[calc(100%-100px)] text-center">
              Select schedule and location and then click below to order
            </p>
            <div className="w-[200px]">
              <Button color="red" size="large" onClick={seatModal.onOpen}>
                Order Ticket Now
              </Button>
            </div>
          </div>
          <SeatModal
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </div>
      ) : (
        <>
          <div className="w-full px-40 pt-[130px] flex flex-col gap-10">
            {/* Breadcrumbs */}
            <div className="w-full flex flex-col justify-center rounded-2xl ">
              {/* Movies Info */}
              <div className="w-full px-24 py-10  gap-40 flex flex-1">
                <Image
                  src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
                  width="1920"
                  height="1080"
                  alt="image"
                  className="rounded-xl w-[359px] h-[473px] object-center object-cover "
                />
                {/* Text Movie Info */}
                <div className="flex flex-col gap-2">
                  {/* Title */}
                  <h2 className="text-red font-bold text-4xl">
                    The Super MArio Bros
                  </h2>
                  {/* Description */}
                  <p className="text-white font-medium text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem, voluptas blanditiis ducimus aspernatur dolore quas!
                  </p>
                  {/* Age */}
                  <p className="bg-white rounded-lg text-black text-center p-2 font-bold w-fit">
                    23 +
                  </p>
                  {/* Mall */}
                  <p className="text-white font-medium text-lg">XX7 Mall ABC</p>
                  {/* Locatioun */}
                  <p className="text-white font-medium text-lg">Jl. Raya ABC</p>
                  {/* Date */}
                  <p className="text-white font-medium text-lg">
                    Sabtu, 7 Juli 2023, 15.50
                  </p>
                </div>
              </div>
              {/* Order number */}
              <p className="flex text-white font-semibold text-xl px-24 py-8 border-y-[2px]">
                Order Number: 190283018309
              </p>
              {/* Booking Info */}
              <div className="w-full px-24 py-14 gap-6 flex flex-col ">
                {/* Transaction Detail subtitle */}
                <p className="text-white font-semibold text-xl">
                  Transaction Details
                </p>
                <div className=" gap-x-20 flex ">
                  {/* Placeholder data */}
                  <div className="text-white font-medium text-xl flex flex-col gap-3">
                    <p>3 Ticket</p>
                    <p>Each Seat</p>
                  </div>
                  {/* Data Booking Info */}
                  <div className="text-white font-medium text-xl flex flex-col gap-3">
                    <p>A1, A2, A3</p>
                    <p>
                      Rp 50.000<span className="text-gray"> x 3</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Payment timer */}
              <div className="flex text-white font-semibold text-xl px-24 py-8 border-y-[2px] gap-20">
                <p>Complete Payment in</p>
                <Timer />
              </div>
              {/* Warn */}
              <p className="text-red-hover font-medium text-lg py-10 px-24">
                * Make sure all data is correct
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="w-[calc(100%-40px)] pb-32 mx-auto px-10 flex flex-col gap-14 border-t-[2px] border-white">
            {/* Total Price */}
            <div className="flex justify-between py-8 px-36">
              <p className="text-gray font-medium text-xl">Total Payment</p>
              <p className="text-white font-bold text-2xl">Total Payment</p>
            </div>
            <div className="flex mx-auto">
              <Button color="red" size="large">
                BOOKING NOW
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieClient;
