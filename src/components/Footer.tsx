import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="text-center text-white text-xl flex gap-x-10 md:gap-x-20 2xl:gap-x-[400px] lg:px-24 2xl:px-40 px-10 justify-center items-center bg-soft-black font-semibold py-10 md:px-20">
      {/* Logo and Home BUtton */}
      <Link href="/">
        <div className="flex items-center justify-center flex-col">
          <Image
            src="/logo.png"
            alt="Logo Website"
            width={1920}
            height={1080}
            className="h-[90px] lg:h-[120px] w-[90px] md:w-[100px] lg:w-[120px]"
          />
          <p className="text-xl font-bold lg:text-2xl">SEA CINEMA</p>
        </div>
      </Link>
      <div className="flex flex-col justify-around gap-4 md:gap-8 lg:gap-10">
        {/* Text link to another page */}
        <div className="flex flex-wrap gap-x-5  md:gap-x-10 mx-auto md:text-base gap-y-3 lg:text-xl text-sm items-center justify-center">
          <Link
            href="/movies"
            className="w-fit h-fit hover:text-red duration-300 transition"
          >
            Movies
          </Link>
          <Link
            href="/booking"
            className="w-fit h-fit hover:text-red duration-300 transition"
          >
            Booking
          </Link>
          <Link
            href="/transactions?topup"
            className="w-fit h-fit hover:text-red duration-300 transition"
          >
            Transactions
          </Link>
          <Link
            href="/watchlist"
            className="w-fit h-fit hover:text-red duration-300 transition"
          >
            Watchlist
          </Link>
          <Link
            href="/profile?dashboard"
            className="w-fit h-fit hover:text-red duration-300 transition"
          >
            Profile
          </Link>
        </div>
        {/* Copyright text */}
        <p className="text-red text-xs md:text-sm lg:text-base">
          All rights reserved by Fairuz © 2023
        </p>
      </div>
    </div>
  );
};

export default Footer;
