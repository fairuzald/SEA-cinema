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
    <div className="w-full p-20 pt-[130px] flex flex-col gap-10 ">
      <Breadcrumbs currentText={movie.title} />
      <div className="w-full px-10 flex gap-20">
        {/* Left Side for Poster and Button*/}
        <div className="flex flex-col items-center gap-10">
          <Image
            src={movie.poster_url}
            alt={movie.title}
            width={1920}
            height={1080}
            className="object-center object-cover w-[518px] h-[632px] rounded-xl"
          />
          <p className="text-white text-lg font-medium w-[calc(100%-100px)] text-center">Select schedule and location and then click below to order</p>
          <Button color="red" onClick={seatModal.onOpen}>
            Order Ticket Now
          </Button>
        </div>
        {/* Right Side for the content */}
        <div className="flex flex-col flex-1 gap-7">
          {/* Title */}
          <h2 className="font-montserrat-b text-4xl text-white">
            {movie.title}
          </h2>
          {/* Container for releasedate, price and age */}
          <div className="flex gap-3">
            <div className="flex flex-col text-lg font-montserrat-sb text-red">
              <p>Release Date</p>
              <p>Price</p>
              <p>Age</p>
            </div>
            <div className="flex flex-col text-lg font-montserrat-sb text-white">
              <p>:</p>
              <p>:</p>
              <p>:</p>
            </div>
            <div className="flex flex-col text-lg font-montserrat-sb text-white">
              <p>{formatDate(movie.release_date)}</p>
              <p>{movie.ticket_price}</p>
              <p>{movie.age_rating}</p>
            </div>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="font-montserrat-sb text-xl text-red">Description</h2>
            <p className="w-full font-montserrat-l text-white">
              {movie.description}
            </p>
          </div>
          {/* Schedule */}
          <div className="flex flex-col gap-2 w-full">
            <h2 className="font-montserrat-sb text-xl text-red">Schedule</h2>
            <div className="flex gap-5">
              <Button color="red">
                <div className="flex flex-col  items-center justify-center">
                  <p className="font-montserrat-sb text-sm">06 July</p>
                  <p className="font-montserrat-sb">KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col  items-center justify-center">
                  <p className="font-montserrat-sb text-sm">06 July</p>
                  <p className="font-montserrat-sb">KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col  items-center justify-center">
                  <p className="font-montserrat-sb text-sm">06 July</p>
                  <p className="font-montserrat-sb">KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col  items-center justify-center">
                  <p className="font-montserrat-sb text-sm">06 July</p>
                  <p className="font-montserrat-sb">KAMIS</p>
                </div>
              </Button>
              <Button color="gray">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-montserrat-sb text-sm">06 July</p>
                  <p className="font-montserrat-sb">KAMIS</p>
                </div>
              </Button>
            </div>
          </div>
          {/* Location */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="font-montserrat-sb text-xl text-red">Location</h2>
            <Location></Location>
            <Location></Location>
            <Location></Location>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieClient;
