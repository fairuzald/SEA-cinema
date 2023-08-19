"use client";
import React, { useState } from "react";
import ArrowCircle from "./icons/ArrowCircle";
import Image from "next/image";
import Link from "next/link";
import { addWeeks, format } from "date-fns";

const Carousel = ({ data }: { data: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState("left"); // To give animation for next button or prev button

  // Handle next button function
  const goToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSlideAnimation("left");

    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  // Handle prev button function
  const goToPrev = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSlideAnimation("right");

    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  // Mapping function based on index
  const getImageAtIndex = (index: number) => {
    const dataIndex = (currentIndex + index + data.length) % data.length;
    const item = data[dataIndex];
    return index === 0 ? (
      // Give linked for current index
      <Link href={`/movies/${item.id}`} key={item.id} className="relative">
        <Image
          width={1920}
          height={1080}
          key={item.id}
          alt={item.title}
          src={item.poster_url}
          className={`w-[200px] ${
            slideAnimation === "left"
              ? "animate-blink-slide-left"
              : "animate-blink-slide-right"
          } h-[300px] lg:h-[380px] xl:h-[450px] lg:w-[400px] xl:w-[450px] 2xl:w-[600px] rounded-lg object-center object-cover`}
        />
        <p
          className={`${
            slideAnimation === "left"
              ? "animate-blink-slide-left"
              : "animate-blink-slide-right"
          } text-red font-bold text-base absolute left-5 top-5 lg:text-2xl`}
        >
          {item.age_rating} +
        </p>
      </Link>
    ) : (
      <Image
        width={1920}
        height={1080}
        key={item.id}
        alt={item.title}
        src={item.poster_url}
        className="animate-blink w-[100px] h-[300px] lg:w-[200px] lg:h-[300px] 2xl:h-[400px] 2xl:w-[500px] blur-[2px] rounded-lg object-center object-cover"
      />
    );
  };

  // Get currentItem
  const getCurrentItem = () => {
    if (data.length === 0) {
      return null;
    }
    const itemIndex = (currentIndex + data.length) % data.length;
    return data[itemIndex];
  };
  const currentItem = getCurrentItem();
  return (
    <div className="flex w-full gap-10 lg:px-10 flex-col lg:gap-16 overflow-hidden">
      {/* Movies list image*/}
      <div className="gap-3 2xl:gap-16 md:gap-10 flex justify-center items-end relative overflow-hidden">
        <div className="mb-10 lg:mb-24 w-fit h-fit hidden md:flex">
          {getImageAtIndex(-2)}
        </div>
        <div className="mb-5 lg:mb-10 w-fit h-fit">{getImageAtIndex(-1)}</div>
        <div className="mb w-fit h-fit">{getImageAtIndex(0)}</div>
        <div className="mb-5 lg:mb-10 w-fit h-fit">{getImageAtIndex(1)}</div>
        <div className="mb-10 lg:mb-24 w-fit h-fit hidden md:flex">
          {getImageAtIndex(2)}
        </div>
        <button
          className="absolute top-1/2 left-10 lg:left-40 -translate-y-1/2"
          onClick={(e) => goToPrev(e)}
        >
          <ArrowCircle style="rotate-180 fill-red w-8 h-8 lg:w-10 lg:h-10" />
        </button>
        <button
          className="absolute top-1/2 right-10 lg:right-40 -translate-y-1/2"
          onClick={(e) => goToNext(e)}
        >
          <ArrowCircle style="fill-red w-8 h-8 lg:w-10 lg:h-10" />
        </button>
      </div>
      {/* Details movie of current index */}
      <div
        key={currentIndex}
        className={`${
          slideAnimation == "left"
            ? "animate-blink-slide-left"
            : "animate-blink-slide-right"
        } flex items-center justify-center gap-2 flex-col sm:px-20 px-5 lg:px-40 transition-all animation-blink-side-left`}
      >
        <h3 className="text-red font-semibold text-xl lg:text-2xl">
          {currentItem.title}
        </h3>
        <p className="text-white font-medium text-base lg:text-xl">
          on Bioskop Until{" "}
          {format(
            addWeeks(new Date(currentItem.release_date), 4),
            "EEEE, d MMM yyyy",
          )}
        </p>
        <h4 className="text-white font-medium text-base lg:text-xl">
          {currentItem.description}
        </h4>
      </div>
    </div>
  );
};

export default Carousel;
