"use client";
import useFavorites from "@/app/hooks/useFavorites";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import HeartIcon from "./icons/HeartIcon";
import { format } from "date-fns";
import Link from "next/link";

const CardUpcomingCinema = ({
  data,
  currentUser,
  position,
}: {
  data: any;
  currentUser?: User | null;
  position: "right" | "left";
}) => {
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "dd MMM yyyy");
  };
  const { hasFavorited, toggleFavorite } = useFavorites({
    currentUser: currentUser,
    movieId: data.id,
  });
  return (
    <div
      className={`w-fit relative flex gap-6 md:gap-10 lg:gap-20 overflow-hidden `}
    >
      {/* Image */}
      {position === "left" && (
        <>
          <Image
            src={data.poster_url}
            alt={data.title}
            width={1920}
            height={1080}
            className={`object-center object-cover  w-[130px] md:w-[230px] md:h-[300px] lg:w-[274px] h-[220px] lg:h-[408px] transition duration-300 rounded-2xl`}
          />
          <button
            className="absolute top-4 lg:top-5 left-24 md:left-40 lg:left-56"
            onClick={toggleFavorite}
          >
            <HeartIcon
              style={`w-5 h-5 lg:w-6 lg:h-6 ${
                hasFavorited
                  ? "fill-rose-500 text-rose-500"
                  : "fill-neutral-500/70"
              } hover:fill-red-heart transition duration-300`}
            />
          </button>
        </>
      )}
      <div className="flex w-full flex-col justify-between py-2 lg:py-5">
        <div className="flex flex-col w-full gap-2.5 lg:gap-1.5 ">
          {/* Title */}
          <h3 className="font-bold text-red text-left text-lg md:text-xl lg:text-[28px]">
            {data.title}
          </h3>
          {/* Containter age and price */}
          <div className="flex">
            {/* Age */}
            <p className="font-semibold text-white text-sm md:text-lg  px-2 lg:text-2xl border-r border-white">
              {data.age_rating} +
            </p>
            {/* Price */}
            <p className="font-semibold text-white text-sm md:text-lg px-2 lg:text-2xl">
              Rp. {data.ticket_price.toLocaleString("id-Id")}
            </p>
          </div>
          {/* Description */}
          <h4 className=" font-medium text-white text-left text-xs md:text-sm lg:text-xl line-clamp-4 md:line-clamp-none ">
            {data.description}
          </h4>
          {/* Release Date */}
          <p className="font-semibold text-white text-xs text-left md:text-sm lg:text-xl">
            Release Date: {formattedDate(data.release_date)}
          </p>
        </div>
        <Link
          href={`/movies/${data.id}`}
          className="font-semibold text-red text-sm lg:text-xl"
        >
          Read More ...
        </Link>
      </div>
      {position === "right" && (
        <>
          <Image
            src={data.poster_url}
            alt={data.title}
            width={1920}
            height={1080}
            className={`object-center object-cover  w-[130px] md:w-[230px] md:h-[300px] lg:w-[274px] h-[220px] lg:h-[408px] transition duration-300 rounded-2xl`}
          />
          <button
            className="absolute top-4 right-3 lg:right-6"
            onClick={toggleFavorite}
          >
            <HeartIcon
              style={`w-5 h-5 lg:w-6 lg:h-6 ${
                hasFavorited
                  ? "fill-rose-500 text-rose-500"
                  : "fill-neutral-500/70"
              } hover:fill-red-heart transition duration-300`}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default CardUpcomingCinema;
