"use client";
import useSeatModal from "@/app/hooks/useSeatModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import Location from "@/components/Location";
import Image from "next/image";
import React from "react";

const MovieClient = ({ data: movie }: { data: any }) => {
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
            <Button color="red" onClick={seatModal.onOpen}>
              Order Ticket Now
            </Button>
          </div>
        </div>
        {/* Right Side for the content */}
        <div className="flex flex-col flex-1 gap-7">
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
          <div className="flex flex-col gap-2 w-full overflow-x-scroll">
            <h2 className="font-bold text-lg lg:text-xl text-red">Schedule</h2>
            <div className="flex gap-5">
              <Button color="red">
                <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
                  <p>06 July</p>
                  <p>KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
                  <p>06 July</p>
                  <p>KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
                  <p>06 July</p>
                  <p>KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
                  <p>06 July</p>
                  <p>KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col w-[55px] lg:w-[60px] xl:w-[65px] text-xs lg:text-sm items-center justify-center">
                  <p>06 July</p>
                  <p>KAMIS</p>
                </div>
              </Button>
            </div>
          </div>
          {/* Location */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="font-bold text-lg lg:text-xl text-red">Location</h2>
            <Location></Location>
            <Location></Location>
            <Location></Location>
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
      </div>
    </div>
  );
};

export default MovieClient;
