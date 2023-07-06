"use client";
import useSeatModal from "@/app/hooks/useSeatModal";
import { SafeMovie } from "@/app/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import DateSelection from "@/components/DateSelection";
import Location from "@/components/Location";
import Timer from "@/components/Timer";
import ArrowIcon from "@/components/icons/ArrowIcon";
import SeatModal from "@/components/modals/SeatModals";
import { Location as LocationType, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
export enum STEPS {
  DATE_SELECTION = 1,
  SEAT_SELECTION = 2,
  PAYMENT = 3,
}

const MovieClient = ({
  data: movie,
  locations,
  currentUser,
}: {
  data: SafeMovie;
  locations: LocationType[];
  currentUser: User | null;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<any>();
  const [step, setStep] = useState<STEPS>(STEPS.DATE_SELECTION); // Use STEPS.DATE_SELECTION instead of DATE_SELECTION
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Handle formatting date
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }
  const isFillAll =
    selectedSeats.length === 0 || !selectedDate || !selectedTime;
  const seatModal = useSeatModal();
  function onNext() {
    if (step === STEPS.PAYMENT) {
      if (isFillAll) {
        toast(
          "Please select seats, date, and time before proceeding to payment."
        );
        return;
      }
      seatModal.onClose();
      setStep(STEPS.DATE_SELECTION);
    } else {
      if (!selectedDate || !selectedTime) {
        toast(
          "Please select date and time before proceeding to seat selection."
        );
        return;
      }
      setStep(STEPS.SEAT_SELECTION);
      seatModal.onOpen();
    }
  }
  const router = useRouter();
  const onSubmit = useCallback(async () => {
    if (
      currentUser?.balance &&
      selectedSeats.length * movie.ticket_price < currentUser?.balance
    ) {
      try {
        const response = await fetch(`/api/booking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Jangan lupa mengirimkan data yang diperlukan dalam body permintaan
          body: JSON.stringify({
            movieTitle: movie.title,
            locationId: selectedTime.id,
            watchDate: selectedDate,
            watchTime: selectedTime.time,
            totalPrice: selectedSeats.length * movie.ticket_price,
            seats: selectedSeats,
          }),
        });

        if (response.ok) {
          router.refresh();
          toast.success(`Booking success`);
          setStep(STEPS.DATE_SELECTION);
          return router.push("/transactions");
        } else {
          throw new Error("Request failed");
          return setStep(STEPS.DATE_SELECTION);
        }
      } catch (err) {
        toast.error("Something went wrong");
        return setStep(STEPS.DATE_SELECTION);
      }
    } else {
      toast.error("Your balance is not enough, Top Up First");
      router.push("/profile?topup");
    }
  }, [
    router,
    movie,
    selectedDate,
    selectedSeats,
    selectedTime,
    currentUser?.balance,
  ]);
  return (
    <div className="w-full px-8 sm:px-20 lg:px-16 overflow-hidden my-20 2xl:px-28 lg:pt-[60px] flex flex-col gap-10">
      {step !== STEPS.PAYMENT ? (
        <>
          <Breadcrumbs currentText={movie.title} />
          <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-16 2xl:gap-24">
            {/* Left Side for Poster and Button*/}
            <div className="flex flex-col items-center gap-5 lg:gap-14">
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
                <Button color="red" onClick={onNext}>
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
                  price={movie.ticket_price}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  data={locations}
                ></Location>
              </div>
            </div>
            <div className="flex mx-auto lg:hidden flex-col items-center justify-center gap-6">
              <p className="flex lg:hidden text-white text-base lg:text-lg font-medium w-[calc(100%-100px)] text-center">
                Select schedule and location and then click below to order
              </p>
              <div className="w-[200px]">
                <Button color="red" size="large" onClick={onNext}>
                  Order Ticket Now
                </Button>
              </div>
            </div>
            <SeatModal
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              step={step}
              setStep={setStep}
              requirement={isFillAll}
              totalPrice={selectedSeats.length * movie.ticket_price}
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col gap-6 lg:gap-10">
            {/* Breadcrumbs */}
            <div className="flex gap-10 items-center">
              <button onClick={() => setStep(STEPS.DATE_SELECTION)}>
                <ArrowIcon style="lg:w-8 lg:h-8 w-6 h-6 font-bold fill-white" />
              </button>
              <p className="text-white text-lg lg:text-2xl font-bold ">Back</p>
            </div>
            <div className="w-full flex gap-10 2xl:px-20 flex-col justify-center rounded-2xl">
              {/* Movies Info */}
              <div className="w-full gap-10 lg:gap-20 xl:gap-24 2xl:gap-28 flex flex-col lg:flex-row">
                <Image
                  src={movie.poster_url}
                  width="1920"
                  height="1080"
                  alt="Asdasdasdasd"
                  className="rounded-xl lg:w-[359px] w-full mx-auto h-full sm:w-[270px] sm:h-[420px] lg:h-[473px] object-center object-cover "
                />
                {/* Text Movie Info */}
                <div className="flex flex-col gap-3  w-full lg:w-fit break-all">
                  {/* Title */}
                  <h2 className="text-red font-bold text-2xl lg:text-4xl">
                    {movie.title}
                  </h2>
                  {/* Description */}
                  <p className="text-white font-medium text-sm lg:text-lg">
                    {movie.description}
                  </p>
                  {/* Age */}
                  <p className="bg-white rounded-lg text-black text-sm lg:text-base text-center p-1.5 lg:p-2 font-bold w-fit">
                    {movie.age_rating} +
                  </p>
                  {/* Mall */}
                  <p className="text-white font-medium text-sm lg:text-lg">
                    {selectedTime.mall}
                  </p>
                  {/* Locatioun */}
                  <p className="text-white font-medium text-sm lg:text-lg">
                    {selectedTime.address}
                  </p>
                  {/* Date */}
                  {selectedDate && (
                    <p className="text-white font-medium text-sm lg:text-lg">
                      {format(selectedDate, "EEEE, d MMMM yyyy, HH:mm")}
                    </p>
                  )}
                </div>
              </div>
              {/* Order number */}
              <hr className="flex text-white w-full font-semibold px-5 text-sm text-center lg:text-left md:px-8 lg:text-xl lg:px-24 border-t-[2px]"></hr>
              {/* Booking Info */}
              <div className="w-full md:px-8 lg:text-xl lg:px-24 lg:py-10 gap-6 flex flex-col ">
                {/* Transaction Detail subtitle */}
                <p className="text-white font-semibold text-base lg:text-xl">
                  Transaction Details
                </p>
                <div className=" gap-x-20 flex ">
                  {/* Placeholder data */}
                  <div className="text-white font-medium  text-sm lg:text-xl flex flex-col gap-3">
                    <p>{selectedSeats.length} Ticket</p>
                    <p>Each Seat</p>
                  </div>
                  {/* Data Booking Info */}
                  <div className="text-white font-medium  text-sm lg:text-xl flex flex-col gap-3">
                    <p>{selectedSeats.map((item) => `${item},`)}</p>
                    <p>
                      Rp. {movie.ticket_price}
                      <span className="text-gray">
                        {" "}
                        x {selectedSeats.length}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {/* Payment timer */}
              <div className="flex text-white font-semibold items-center text-sm lg:text-xl md:px-8 lg:px-24 py-3 lg:py-8 border-y-[2px] gap-4 px-5 lg:gap-20">
                <p>Complete Payment in</p>
                <Timer />
              </div>
              {/* Warn */}
              <p className="text-red-hover font-medium text-sm lg:text-lg md:px-4 lg:px-24 lg:py-4">
                * Make sure all data is correct
              </p>
            </div>
          </div>
          {/* Footer */}
          <div className="w-full 2xl:w-[calc(100%-40px)] pb-32 mx-auto lg:px-10 flex flex-col gap-8 lg:gap-14 border-t-[2px] border-white">
            {/* Total Price */}
            <div className="flex justify-between pt-3 lg:pt-8 lg:px-10 2xl:px-20">
              <p className="text-gray font-medium text-sm lg:text-xl">
                Total Balance
              </p>
              <p className="text-white font-bold text-base lg:text-2xl">
                Rp. {currentUser?.balance || 0}
              </p>
            </div>
            <div className="flex justify-between lg:px-10 2xl:px-20">
              <p className="text-gray font-medium text-sm lg:text-xl">
                Total Payment
              </p>
              <p className="text-white font-bold text-base lg:text-2xl">
                Rp. {selectedSeats.length * movie.ticket_price}
              </p>
            </div>
            <div className="flex mx-auto">
              <Button color="red" size="large" onClick={onSubmit}>
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
