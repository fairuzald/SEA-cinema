"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import HeartIcon from "./icons/HeartIcon";
import { useRouter } from "next/navigation";
interface CardsProps {
  size: "medium" | "large";
  isFavorited?: boolean;
  isAge?: boolean;
  data: any;
}
const Cards: React.FC<CardsProps> = ({ size, isFavorited, isAge, data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const sizeEffect = {
    large: "w-[358px] h-[480px]",
    medium: "w-[130px] lg:w-[274px] h-[220px] lg:h-[408px]",
  };
  return (
    <Link href={`/movies/${data.id}`} replace>
      <div
        className={`w-fit relative flex lg:block  gap-6 lg:gap-0 lg:items-start lg:justify-start overflow-hidden `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <Image
          src={data.poster_url}
          alt={data.title}
          width={1920}
          height={1080}
          className={`object-center object-cover ${
            isHovered && "scale-110"
          } ${sizeEffect[size]} transition duration-300 rounded-2xl`}
        />
        {/* Watchlist button */}
        {isFavorited && (
          <button className="absolute top-4 lg:top-5 left-24 lg:left-56">
            <HeartIcon style="w-5 h-5 lg:w-6 lg:h-6 fill-gray hover:fill-red-heart transition duration-300" />
          </button>
        )}
        {/* When  link hovered will be appear */}
        <div
          className={`flex w-full lg:px-7 pb-3 flex-col gap-2.5 lg:gap-1.5 h-[250px] lg:bg-black lg:items-center lg:justify-center lg:absolute  lg:z-10 ${
            isHovered ? "lg:-translate-y-full" : "lg:translate-y-full"
          } transition-transform duration-300`}
        >
          {/* Title */}
          <p className="font-montserrat-b text-red lg:text-center  text-lg lg:text-xl">{data.title}</p>
          {/* Containter age and price */}
          <div className="flex mr-auto">
            {/* Age */}
            <p className="font-semibold text-white text-sm lg:text-base px-3 border-r border-white">
              {data.age_rating} +
            </p>
            {/* Price */}
            <p className="font-semibold text-white text-sm lg:text-base px-3">
              Rp. {data.ticket_price}
            </p>
          </div>
          {/* Description */}
          <p className="font-montserrat-l font-medium text-white text-xs lg:text-sm line-clamp-4">
            {data.description}
          </p>
          {/* Release Date */}
          <p className="font-semibold text-white text-xs lg:text-sm">
            Release Date: {data.release_date}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
