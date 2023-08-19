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
import { Location as LocationType, Transaction, User } from "@prisma/client";
import {
  addWeeks,
  differenceInDays,
  format,
  getDate,
  getMonth,
} from "date-fns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

// Step handling on payment ticket booking
export enum STEPS {
  DATE_SELECTION = 1,
  SEAT_SELECTION = 2,
  PAYMENT = 3,
}

const MovieClient = ({
  data: movie,
  locations,
  currentUser,
  bookings,
}: {
  data: SafeMovie;
  locations: LocationType[];
  currentUser: User | null;
  bookings?: Transaction[];
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Use hook to handle seat modal
  const seatModal = useSeatModal();

  // State to handle required data to open modals
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<any>();
  const [step, setStep] = useState<STEPS>(STEPS.DATE_SELECTION);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Handle logic to mapping allowed date on ticket booking
  const today = new Date();
  const releaseDate = new Date(movie.release_date);

  // Calculate the length of the date range to possible watch the movie
  const endDate = addWeeks(releaseDate, 4); //Assume that movie only can watch 4 weeks after launched
  const lengthDate = differenceInDays(endDate, today);
  const isLaunch = today.getTime() > releaseDate.getTime();
  const isExpired = lengthDate < 0;

  // Handle requirements to open seat modals
  const checkDataEntry =
    selectedSeats.length === 0 || !selectedDate || !selectedTime;

  // Fetch the transactions for the selected location, date, and time if each component of selectedTime exists
  const filteredTransactions =
    selectedTime && selectedDate
      ? bookings?.filter(
          (transaction) =>
            transaction.locationId === selectedTime.id &&
            getDate(transaction.watchDate) === getDate(selectedDate) &&
            getMonth(transaction.watchDate) === getMonth(selectedDate) &&
            transaction.watchTime === selectedTime.time,
        )
      : [];

  // Extract the seats from the filtered transactions
  const disabledSeats = filteredTransactions?.flatMap(
    (transaction) => transaction.seat,
  );

  // Handle formatting date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();

    return `${day} ${month} ${year}`;
  };

  // Handle datatime mongodb type
  const formattingISODateAPI = (timeString: string, selectedDate: Date) => {
    const [hours, minutes] = timeString.split(":");
    selectedDate.setHours(Number(hours), Number(minutes), 0, 0);
    return selectedDate.toISOString();
  };

  // Handle what the next step button does based on the current step
  const onNext = useCallback(() => {
    // If now at the payment step
    if (step === STEPS.PAYMENT) {
      if (checkDataEntry) {
        return toast(
          "Please select seats, date, and time before proceeding to payment.",
        );
      }
      seatModal.onClose();
      setStep(STEPS.DATE_SELECTION);
    }
    // If now at the date selection step
    else {
      // Prevent date and time selection if underage
      if (currentUser?.age && currentUser?.age < movie.age_rating) {
        return toast.error(
          "You are underage to watch this film, Please choose another film that is age appropriate",
        );
      }
      // Prevent seat modal open if date and time not selected
      if (!selectedDate || !selectedTime) {
        return toast(
          "Please select date and time before proceeding to seat selection.",
        );
      }
      setStep(STEPS.SEAT_SELECTION);
      seatModal.onOpen();
    }
  }, [
    checkDataEntry,
    currentUser?.age,
    movie.age_rating,
    seatModal,
    selectedDate,
    selectedTime,
    step,
  ]);

  // Handle mechanism booking toicket with shooting api booking
  const onSubmit = useCallback(async () => {
    // If the balance user is enough
    if (
      currentUser?.balance &&
      selectedSeats.length * movie.ticket_price < currentUser?.balance
    ) {
      // If all require data has been entered
      if (selectedSeats && selectedTime && selectedDate) {
        // Shooting booking api
        try {
          const response = await fetch(`/api/booking`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movieId: movie.id,
              locationId: selectedTime.id,
              watchDate: formattingISODateAPI(selectedTime.time, selectedDate),
              watchTime: selectedTime.time,
              totalPrice: selectedSeats.length * movie.ticket_price,
              seats: selectedSeats,
            }),
          });
          // Error handling
          if (response.ok) {
            router.refresh();
            toast.success("Booking success");
            setStep(STEPS.DATE_SELECTION);
            return router.push("/booking?active");
          } else {
            setStep(STEPS.DATE_SELECTION);
            throw new Error("Request failed");
          }
        } catch (err) {
          toast.error("Something went wrong");
          return setStep(STEPS.DATE_SELECTION);
        }
      } else {
        toast.error("Fill your data first");
        return setStep(STEPS.DATE_SELECTION);
      }
    } else {
      toast.error("Your balance is not enough, Top Up First");
      router.push(`/profile?topup&previous=${pathname}`);
    }
  }, [
    router,
    movie,
    pathname,
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
          <section className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-16 2xl:gap-24">
            {/* Left Side for Poster and Button*/}
            <div className="flex flex-col items-center gap-5 lg:gap-14">
              <h1 className="font-bold flex lg:hidden text-3xl lg:text-4xl text-white">
                {movie.title}
              </h1>
              <Image
                src={movie.poster_url}
                alt={movie.title}
                width={1920}
                height={1080}
                className="object-center object-cover w-full h-full sm:w-[350px] lg:w-[400px] md:h-[550px] xl:w-[518px] xl:h-[632px] rounded-xl"
              />
              {isLaunch && !isExpired && currentUser && (
                <>
                  <p className="hidden lg:flex text-white text-base lg:text-lg font-medium w-[calc(100%-100px)] text-center">
                    Select schedule and location and then click below to order
                  </p>
                  <div className="hidden lg:flex">
                    <Button color="red" onClick={onNext}>
                      <h4>Order Ticket Now</h4>
                    </Button>
                  </div>
                </>
              )}
            </div>
            {/* Right Side for the content */}
            <div className="flex flex-col lg:w-[calc(100%-400px)] xl:w-[calc(100%-518px)] gap-7">
              {/* Title */}
              <h1 className="font-bold lg:flex hidden text-3xl lg:text-4xl text-white">
                {movie.title}
              </h1>
              {/* Container for releasedate, price and age */}
              <section className="flex gap-3">
                <div className="flex flex-col text-base lg:text-lg font-semibold text-red">
                  <h2>Release Date</h2>
                  <h2>Price</h2>
                  <h2>Age</h2>
                </div>
                <div className="flex flex-col text-base lg:text-lg font-semibold text-white">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="flex flex-col text-base lg:text-lg font-semibold text-white">
                  <p>{formatDate(movie.release_date)}</p>
                  <p>Rp. {movie.ticket_price.toLocaleString("id-ID")}</p>
                  <p>{movie.age_rating} +</p>
                </div>
              </section>
              {/* Description */}
              <section className="flex flex-col gap-2 w-full">
                <h2 className="font-bold text-lg lg:text-xl text-red">
                  Description
                </h2>
                <p className="w-full font-light text-sm lg:text-base text-white">
                  {movie.description}
                </p>
              </section>
              {currentUser ? (
                isLaunch ? (
                  isExpired ? (
                    <div className="flex flex-col flex-auto gap-2 w-full">
                      <h2 className="text-red text-2xl lg:text-3xl font-bold ">
                        Not Show Anymore
                      </h2>
                    </div>
                  ) : (
                    <>
                      <section className="flex flex-col gap-2 w-full">
                        <h2 className="font-bold text-lg lg:text-xl text-red">
                          Schedule
                        </h2>
                        <DateSelection
                          setSelectedDate={setSelectedDate}
                          selectedDate={selectedDate}
                          length={lengthDate}
                        />
                      </section>
                      {/* Location */}
                      <section className="flex flex-col gap-4 w-full">
                        <h2 className="font-bold text-lg lg:text-xl text-red">
                          Location
                        </h2>
                        <Location
                          price={movie.ticket_price}
                          selectedTime={selectedTime}
                          setSelectedTime={setSelectedTime}
                          data={locations}
                          selectedDate={selectedDate}
                        ></Location>
                      </section>
                    </>
                  )
                ) : (
                  <div className="flex flex-col flex-auto gap-2 w-full">
                    <h2 className="text-white text-2xl lg:text-3xl font-bold ">
                      Not Launching Yet
                    </h2>
                  </div>
                )
              ) : (
                ""
              )}
            </div>
            {isLaunch && !isExpired && currentUser && (
              <>
                <div className="flex mx-auto lg:hidden flex-col items-center justify-center gap-6">
                  <p className="flex lg:hidden text-white text-base lg:text-lg font-medium w-[calc(100%-100px)] text-center">
                    Select schedule and location and then click below to order
                  </p>
                  <div className="w-[200px]">
                    <Button color="red" size="large" onClick={onNext}>
                      <h4>Order Ticket Now</h4>
                    </Button>
                  </div>
                </div>
                {selectedDate && selectedTime && (
                  <SeatModal
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    step={step}
                    setStep={setStep}
                    requirement={checkDataEntry}
                    totalPrice={selectedSeats.length * movie.ticket_price}
                    disabledSeats={disabledSeats}
                    selectedDate={format(selectedDate, "d MMMM yyyy")}
                    selectedTime={selectedTime.time}
                    mall={selectedTime.mall}
                  />
                )}
              </>
            )}
          </section>
        </>
      ) : (
        <>
          <section className="w-full flex flex-col gap-6 lg:gap-10">
            {/* Breadcrumbs back button */}
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
                  <h3 className="text-white font-medium text-sm lg:text-lg">
                    {movie.description}
                  </h3>
                  {/* Age */}
                  <h3 className="bg-white rounded-lg text-black text-sm lg:text-base text-center p-1.5 lg:p-2 font-bold w-fit">
                    {movie.age_rating} +
                  </h3>
                  {/* Mall */}
                  <h3 className="text-white font-medium text-sm lg:text-lg">
                    {selectedTime.mall}
                  </h3>
                  {/* Locatioun */}
                  <h3 className="text-white font-medium text-sm lg:text-lg">
                    {selectedTime.address}
                  </h3>
                  {/* Date */}
                  {selectedDate && (
                    <h3 className="text-white font-medium text-sm lg:text-lg">
                      {format(selectedDate, "EEEE, d MMMM yyyy, HH:mm")}
                    </h3>
                  )}
                </div>
              </div>
              {/* Order number */}
              <hr className="flex text-white w-full font-semibold px-5 text-sm text-center lg:text-left md:px-8 lg:text-xl lg:px-24 border-t-[2px]"></hr>
              {/* Booking Info */}
              <div className="w-full md:px-8 lg:text-xl lg:px-24 lg:py-10 gap-6 flex flex-col ">
                {/* Transaction Detail subtitle */}
                <h3 className="text-white font-semibold text-base lg:text-xl">
                  Transaction Details
                </h3>
                <div className=" gap-x-20 flex ">
                  {/* Placeholder data */}
                  <div className="text-white font-medium  text-sm lg:text-xl flex flex-col gap-3">
                    <h4>{selectedSeats.length} Ticket</h4>
                    <h4>Each Seat</h4>
                  </div>
                  {/* Data Booking Info */}
                  <div className="text-white font-medium  text-sm lg:text-xl flex flex-col gap-3">
                    <p>
                      {selectedSeats.map((item, index) =>
                        index === selectedSeats.length - 1 ? item : item + ", ",
                      )}
                    </p>
                    <p>
                      Rp. {movie.ticket_price.toLocaleString("id-Id")}
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
            {/* Footer */}
            <div className="w-full 2xl:w-[calc(100%-40px)] pb-32 mx-auto lg:px-10 flex flex-col gap-8 lg:gap-14 border-t-[2px] border-white">
              {/* Total Price */}
              <div className="flex justify-between pt-3 lg:pt-8 lg:px-10 2xl:px-20">
                <h4 className="text-gray font-medium text-sm lg:text-xl">
                  Total Balance
                </h4>
                <p className="text-white font-bold text-base lg:text-2xl">
                  Rp. {currentUser?.balance.toLocaleString("id-Id") || 0}
                </p>
              </div>
              <div className="flex justify-between lg:px-10 2xl:px-20">
                <h4 className="text-gray font-medium text-sm lg:text-xl">
                  Total Payment
                </h4>
                <p className="text-white font-bold text-base lg:text-2xl">
                  Rp.{" "}
                  {(selectedSeats.length * movie.ticket_price).toLocaleString(
                    "id-Id",
                  )}
                </p>
              </div>
              <div className="flex mx-auto gap-7">
                {currentUser ? (
                  currentUser?.balance <
                  selectedSeats.length * movie.ticket_price ? (
                    <>
                      <Button
                        color="red"
                        size="large"
                        onClick={() => {
                          setStep(STEPS.DATE_SELECTION);
                          router.push(`/movies/${movie.id}`);
                        }}
                      >
                        Cancel Booking
                      </Button>
                      <Button color="red" size="large" onClick={onSubmit}>
                        Top Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="red"
                        size="large"
                        onClick={() => {
                          setStep(STEPS.DATE_SELECTION);
                          router.push(`/movies/${movie.id}`);
                        }}
                      >
                        Cancel Booking
                      </Button>
                      <Button color="red" size="large" onClick={onSubmit}>
                        BOOKING NOW
                      </Button>
                    </>
                  )
                ) : (
                  <p className="text-white font-bold text-2xl">Loading....</p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieClient;
