import React from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = () => {
  return (
    <div className="flex  items-center justify-center border border-gray rounded-xl py-1 lg:py-1.5">
      <p className="hidden px-16 text-white font-montserrat-sb items-center justify-center lg:flex border-r border-gray">
        Age
      </p>
      <p className="px-16 hidden text-white font-montserrat-sb items-center justify-center lg:flex border-r border-gray">
        Title
      </p>
      <div className="px-8 lg:px-12 text-white text-sm lg:text-base font-semibold items-center justify-center flex lg:gap-6 gap-4">
        <p className="hidden lg:flex">Price</p>
        <p className="lg:hidden flex">Search</p>
        <SearchIcon style="fill-white w-4 h-4 lg:w-5 lg:h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
