import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import Button from "./Button";
import Avatar from "./Avatar";

const Navbar = () => {
  return (
    <nav className="fixed z-20 inset-0 flex w-full h-[100px] bg-soft-black">
      {/* container */}
      <div className="flex items-center justify-around px-[50px] py-8 w-full">
        <ul className="flex items-center justify-around gap-8 w-full">
          {/* Logo */}
          <li>
            <Link href="/" className="flex  items-center justify-between gap-4">
              <Image
                src="/logo.png"
                alt="Logo"
                width={1920}
                height={1080}
                className="h-[69px] w-[61px] "
              />
              <p className="text-white font-montserrat-b text-2xl">
                SEA Cinema
              </p>
            </Link>
          </li>
          {/* SearchBar */}
          <li>
            <SearchBar />
          </li>
          <div className="flex items-center justify-center gap-7">
            <li>
              <Link href="/" className="text-white font-montserrat-b">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/" className="text-white font-montserrat-b">
                Transaction
              </Link>
            </li>
            <li>
              <Link href="/" className="text-white font-montserrat-b">
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
