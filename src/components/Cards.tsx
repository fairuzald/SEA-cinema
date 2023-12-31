"use client";
import Image from "next/image";
import React, { useState } from "react";
import HeartIcon from "./icons/HeartIcon";
import { useRouter } from "next/navigation";
import useFavorites from "@/app/hooks/useFavorites";
import { User } from "@prisma/client";
import { format } from "date-fns";
interface CardsProps {
  size: "medium" | "large";
  isFavorited?: boolean;
  isAge?: boolean;
  data: any;
  currentUser?: User | null;
}
const Cards: React.FC<CardsProps> = ({
  size,
  isFavorited,
  isAge,
  data,
  currentUser,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  // Fetch information favorited and function to shooting api make favorite
  const { hasFavorited, toggleFavorite } = useFavorites({
    currentUser: currentUser,
    movieId: data.id,
  });
  // Handle hover animation
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // Formatting date data
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "dd MMM yyyy");
  };
  const sizeEffect = {
    large: "w-[358px] h-[480px]",
    medium:
      "w-[130px] md:w-[230px] md:h-[300px] lg:w-[274px] h-[220px] lg:h-[408px]",
  };
  return (
    <button onClick={() => router.push(`/movies/${data.id}`)}>
      <div
        className={`w-fit relative flex lg:block gap-6 md:gap-10 lg:gap-0 lg:items-start lg:justify-start overflow-hidden `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <Image
          src={data.poster_url}
          alt={data.title}
          width={1920}
          height={1080}
          className={`object-center object-cover ${isHovered && "scale-110"} ${
            sizeEffect[size]
          } transition duration-300 rounded-2xl`}
        />
        {/* Watchlist button */}
        {isFavorited && (
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
        )}
        {/* When  link hovered will be appear */}
        <div
          className={`flex w-full lg:px-7 pb-3 flex-col gap-2.5 lg:gap-1.5 h-[250px] lg:h-[280px] lg:bg-black lg:items-center lg:justify-center lg:absolute  lg:z-10 ${
            isHovered ? "lg:-translate-y-full" : "lg:translate-y-full"
          } transition-transform duration-300`}
        >
          {/* Title */}
          <h2 className="font-bold text-red text-left lg:text-center  text-lg lg:text-xl">
            {data.title}
          </h2>
          {/* Containter age and price */}
          <div className="flex lg:mx-auto mr-auto">
            {/* Age */}
            <h3 className="font-semibold text-white text-sm lg:text-base pr-3 lg:px-3 border-r border-white">
              {data.age_rating} +
            </h3>
            {/* Price */}
            <h3 className="font-semibold text-white text-sm lg:text-base px-3">
              Rp. {data.ticket_price.toLocaleString("id-Id")}
            </h3>
          </div>
          {/* Description */}
          <h3 className=" font-medium text-white text-left lg:text-justify lg:break-all lg:mx-2 text-xs lg:text-sm line-clamp-4 md:line-clamp-none lg:line-clamp-4">
            {data.description}
          </h3>
          {/* Release Date */}
          <h3 className="font-semibold text-white text-xs text-left lg:text-center lg:text-sm">
            Release Date: {formattedDate(data.release_date)}
          </h3>
        </div>
      </div>
    </button>
  );
};

export default Cards;
