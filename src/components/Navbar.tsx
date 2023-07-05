"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Avatar from "./Avatar";
import HamburgerIcon from "./icons/HamburgerIcon";

const Navbar = () => {
  const [popUp, setPopUp] = useState(false);
  return (
    <nav className="fixed z-20 inset-0 flex w-full h-[60px] lg:h-[100px] bg-soft-black">
      {/* container */}
      <div className="flex items-center justify-around px-2 lg:px-[50px] py-3 lg:py-8 w-full">
        <ul className="flex items-center justify-around gap-1 lg:gap-8 w-full">
          {/* Logo */}
          <li>
            <Link href="/" className="flex  items-center justify-between gap-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={1920}
                height={1080}
                className="h-[40px] lg:h-[69px] w-[40px] lg:w-[61px] "
              />
              <p className="text-white font-montserrat-b hidden lg:block text-2xl">
                SEA Cinema
              </p>
            </Link>
          </li>
          {/* SearchBar */}
          <li className="flex">
            <SearchBar />
          </li>
          <button
            className="flex relative lg:hidden"
            onClick={() => setPopUp((prev) => !prev)}
          >
            <HamburgerIcon style="w-7 h-7 fill-white" />
          </button>
          <div
            className={`flex-col ${
              popUp
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none"
            } transition duration-300 lg:flex-row bg-black lg:pointer-events-auto lg:bg-transparent absolute top-16 pt-2.5 pb-5 px-5 lg:p-0 lg:scale-100  lg:opacity-100 rounded-xl text-center right-6 lg:static lg:flex items-center justify-center gap-7 text-sm lg:text-base`}
          >
            <li className="py-2.5">
              <Link href="/movies" className="text-white font-montserrat-b">
                Movies
              </Link>
            </li>
            <li className="py-2.5">
              <Link
                href="/transactions"
                className="text-white font-montserrat-b"
              >
                Transaction
              </Link>
            </li>
            <li className="py-2.5">
              <Link href="/watchlist" className="text-white font-montserrat-b">
                Watchlist
              </Link>
            </li>
            <Button color="trans-red">
              <div className="flex items-center gap-2">
                <p>Sign Out</p>
                <Avatar />
              </div>
            </Button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
