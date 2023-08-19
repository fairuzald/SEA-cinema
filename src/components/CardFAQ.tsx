"use client";
import React, { useState } from "react";
import PlusCircleIcon from "./icons/PlusCircleIcon";

const CardFAQ = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#545454] flex-col relative rounded-xl py-4 lg:py-7 w-full text-white font-semibold text-base px-14 lg:text-2xl flex items-center justify-between">
      <div
        className={`${
          open && "mb-4 lg:mb-7"
        } flex items-center justify-center w-full gap-40`}
      >
        {/* Title */}
        <button onClick={() => setOpen(!open)}>
          <h3>{title}</h3>
        </button>
        {/* Button PopUp Details */}
        <button
          onClick={() => setOpen(!open)}
          className={`${
            open ? "animate-spin-right" : "animate-spin-left"
          } absolute right-2 lg:right-20`}
        >
          <PlusCircleIcon
            style={`fill-white w- h-6 lg:w-8 lg:h-8 ${
              open ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
        {/* Details description */}
      </div>
      {open && (
        <div
          className={`${
            open ? "opacity-100 pt-4 lg:pt-7" : "opacity-0 translate-y-0 "
          } duration-2000 transition border-t border-t-soft-black w-full font-medium text-justify lg:px-40 break-all text-sm lg:text-xl`}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default CardFAQ;
