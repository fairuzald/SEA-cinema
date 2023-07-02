"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import HeartIcon from "./icons/HeartIcon";
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
    medium: "w-[274px] h-[408px]",
  };
  return (
    <Link href={`/movies/${data.id}`}>
      <button
        className={`${sizeEffect[size]} relative overflow-hidden rounded-2xl`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={data.poster_url}
          alt={data.title}
          width={1920}
          height={1080}
          className={`object-center object-cover ${isHovered&&"scale-110"} transition duration-300`}
        />
        {isFavorited && (
          <button className="absolute top-5 right-5">
            <HeartIcon style="w-6 h-6 fill-gray hover:fill-red-heart transition duration-300" />
          </button>
        )}
        {/* When  link hovered will be appear */}
        <div
          className={`flex w-full px-7 pb-3 flex-col gap-1.5 h-[250px] bg-black items-center justify-center absolute  z-10 ${
            isHovered ? "-translate-y-full" : "translate-y-full"
          } transition-transform duration-300`}
        >
          <p className="font-montserrat-b text-red text-xl">{data.title}</p>
          <div className="flex">
            <p className="font-montserrat-sb text-white text-base px-3 border-r border-white">
              {data.age_rating} +
            </p>
            <p className="font-montserrat-sb text-white text-base px-3">
              Rp. {data.ticket_price}
            </p>
          </div>
          <p className="font-montserrat-l font-light text-white text-sm line-clamp-4">
            {data.description}
          </p>
          <p className="font-montserrat-sb text-white text-sm">
            Release Date: {data.release_date}
          </p>
        </div>
      </button>
    </Link>
  );
};

export default Cards;
