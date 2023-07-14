"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Avatar from "./Avatar";
import HamburgerIcon from "./icons/HamburgerIcon";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: currentUser } = useSession();
  const [popUp, setPopUp] = useState(false);
  const LoginModal = useLoginModal();
  const { data: session } = useSession();
  const pathname = usePathname();
  const blackBgRef = useRef<HTMLDivElement>(null);
  // Close Navbar when user clicks except Navbar content
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If Userclick is in the black background stuff
      if (
        blackBgRef.current &&
        blackBgRef.current.contains(event.target as Node)
      ) {
        setPopUp(false)
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [blackBgRef, setPopUp]);
  return (
    <>
      <nav className="fixed z-20 inset-0 flex w-full h-[60px] lg:h-[100px] bg-soft-black">
        <h1 className="hidden">Navbar</h1>
        {/* container */}
        <div className="flex items-center justify-around px-2 lg:px-[20px] py-3 lg:py-8 w-full">
          <ul className="flex items-center justify-between px-8 md:px-14 lg:px-16 xl:px-20 2xl:px-20 gap-1 lg:gap-8 w-full">
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
            {/* Hamburger Button for mobile */}
            <button
              className="flex relative xl:hidden"
              onClick={() => setPopUp((prev) => !prev)}
            >
              <HamburgerIcon style="w-7 h-7 md:w-10 fill-white" />
            </button>
            <div
              className={`flex-col ${popUp
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0 pointer-events-none"
                } transition duration-300 xl:flex-row bg-black xl:pointer-events-auto xl:bg-transparent absolute top-16 pt-2.5 pb-5 px-10 md:px-14 xl:p-0 xl:scale-100 lg:px-16 xl:opacity-100 rounded-xl text-center right-6 md:right-14 lg:top-24 xl:static xl:flex items-center justify-center gap-7 text-sm xl:text-lg`}
            >
              {/* Movies */}
              <li className="py-2.5 md:py-3 lg:py-4">
                <Link
                  href="/movies"
                  className={`${pathname.split("/").includes("movies")
                    ? "text-red"
                    : "text-white"
                    } hover:text-red transition duration-300 font-bold`}
                >
                  Movies
                </Link>
              </li>
              {/* Booking */}
              <li className="py-2.5 md:py-3 lg:py-4">
                <Link
                  href="/booking"
                  className={`${pathname.split("/").includes("booking")
                    ? "text-red"
                    : "text-white"
                    } hover:text-red transition duration-300 font-bold`}
                >
                  Booking
                </Link>
              </li>
              {/* Topup */}
              <li className="py-2.5 md:py-3 lg:py-4">
                <Link
                  href="/transactions?topup"
                  className={`${pathname.split("/").includes("transactions")
                    ? "text-red"
                    : "text-white"
                    } hover:text-red transition duration-300 font-bold`}
                >
                  Transaction
                </Link>
              </li>
              {/* Watchlist */}
              <li className="py-2.5 md:py-3 lg:py-4">
                <Link
                  href="/watchlist"
                  className={`${pathname === "/watchlist" ? "text-red" : "text-white"
                    } hover:text-red transition duration-300 font-bold`}
                >
                  Watchlist
                </Link>
              </li>
              {/* Profile */}
              <li className="py-2.5 md:py-3 lg:py-4">
                <Link
                  href="/profile?dashboard"
                  className={`${pathname === "/profile" ? "text-red" : "text-white"
                    } hover:text-red transition duration-300 font-bold`}
                >
                  Profile
                </Link>
              </li>
              {/* Button login or logout */}
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

      </nav>{popUp && (
        <div
          ref={blackBgRef}
          className="fixed left-0 top-0 z-[19] h-screen w-full bg-[#111111] opacity-50 transition duration-300"
        />
      )}</>
  );
};

export default Navbar;
