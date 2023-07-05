import React from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = () => {
  return (
    <div className="flex  items-center justify-center border border-gray rounded-xl py-1 lg:py-1.5">
      <p className="hidden px-16 text-white text-sm lg:text-base font-semibold items-center justify-center md:flex border-r border-gray">
        Age
      </p>
      <p className="px-16 hidden text-white text-sm lg:text-base font-semibold items-center justify-center md:flex border-r border-gray">
        Title
      </p>
      <div className="px-10 md:px-12 text-white text-sm lg:text-base font-semibold items-center justify-center flex md:gap-6 gap-4">
        <p className="hidden md:flex">Price</p>
        <p className="md:hidden flex">Search</p>
        <SearchIcon style="fill-white w-4 h-4 md:w-5 md:h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
