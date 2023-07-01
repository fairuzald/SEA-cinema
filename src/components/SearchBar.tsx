import React from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchBar = () => {
  return (
    <div className="flex  items-center justify-center border border-gray rounded-xl py-1.5">
      <p className="px-16 text-white font-montserrat-sb items-center justify-center flex border-r border-gray">
        Age
      </p>
      <p className="px-16 text-white font-montserrat-sb items-center justify-center flex border-r border-gray">
        Title
      </p>
      <div className="px-12 text-white font-montserrat-sb items-center justify-center flex gap-6">
        <p>Price</p>
        <SearchIcon style="fill-white w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;
