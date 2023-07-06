"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Avatar from "./Avatar";
import HamburgerIcon from "./icons/HamburgerIcon";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";

const Navbar = () => {
  const { data: currentUser } = useSession();
  const [popUp, setPopUp] = useState(false);
  const LoginModal = useLoginModal();
  // const user = getCurrentUser()
  const { data: session } = useSession();

  return (
    <nav className="fixed z-20 inset-0 flex w-full h-[60px] lg:h-[100px] bg-soft-black">
      {/* container */}
      <div className="flex items-center justify-around px-2 lg:px-[20px] py-3 lg:py-8 w-full">
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
              <p className="text-white font-bold hidden lg:block text-xl 2xl:text-2xl">
                SEA Cinema
              </p>
            </Link>
          </li>
        
          <button
            className="flex relative 2xl:hidden"
            onClick={() => setPopUp((prev) => !prev)}
          >
            <HamburgerIcon style="w-7 h-7 md:w-10 fill-white" />
          </button>
          <div
            className={`flex-col ${
              popUp
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none"
            } transition duration-300 2xl:flex-row bg-black 2xl:pointer-events-auto 2xl:bg-transparent absolute top-16 pt-2.5 pb-5 px-5  md:px-10 2xl:p-0 2xl:scale-100 lg:px-16 2xl:opacity-100 rounded-xl text-center right-6 md:right-14 lg:top-24 2xl:static 2xl:flex items-center justify-center gap-7 text-sm xl:text-lg`}
          >
            <li className="py-2.5 md:py-3 lg:py-4">
              <Link href="/movies" className="text-white font-bold">
                Movies
              </Link>
           </li>
            <li className="py-2.5 md:py-3 lg:py-4">
              <Link href="/booking" className="text-white font-bold">
                Booking
              </Link>
            </li>
            <li className="py-2.5 md:py-3 lg:py-4">
              <Link href="/transactions?topup" className="text-white font-bold">
                Transaction
              </Link>
            </li>
            <li className="py-2.5 md:py-3 lg:py-4">
              <Link href="/watchlist" className="text-white font-bold">
                Watchlist
              </Link>
            </li>
            <li className="py-2.5 md:py-3 lg:py-4">
              <Link href="/profile?dashboard" className="text-white font-bold">
                Profile
              </Link>
            </li>
            <li className="py-1">
              <Button
                color={session ? "trans-red" : "red"}
                onClick={() => {
                  session ? signOut() : LoginModal.onOpen();
                }}
              >
                <div className="flex items-center gap-2">
                  <p>{session ? "Logout" : "Login"}</p>

                  {session && <Avatar currentUser={currentUser} />}
                </div>
              </Button>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
