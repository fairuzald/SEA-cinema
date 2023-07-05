"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import ArrowIcon from "../icons/ArrowIcon";
import useSeatModal from "@/app/hooks/useSeatModal";
import Seat from "../Seat";
import Button from "../Button";

const SeatModal = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seatModal = useSeatModal();
  const header = (
    <div className="flex gap-7 items-center bg-soft-black px-5 lg:px-10 w-full py-2">
      <button onClick={seatModal.onClose}>
        <ArrowIcon style="fill-white w-5 h-5 lg:w-7 lg:h-7" />
      </button>
      <div className="flex flex-col">
        <p className="text-white font-bold text-base lg:text-xl">XX7 Mall A</p>
        <p className="text-white font-medium text-xs lg:text-base">06 Jul | 15.50</p>
      </div>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-4 items-center justify-center w-full pb-2 sm:px-5 lg:px-10 2xl:px-14">
      <h2 className="text-red text-lg lg:text-xl font-bold text-center">
        Choose Your Seats Now!!!
      </h2>
      <div className="flex gap-5 lg:gap-10 text-base items-center justify-center w-full">
        <div className="flex gap-1.5 lg:gap-2 items-center">
          <p className="text-center rounded-lg text-xs lg:text-sm font-bold px-1.5 py-1 lg:px-2.5 lg:py-2 bg-red text-white">
            A1
          </p>
          <p className="text-white text-xs lg:text-base  font-semibold text-center">
            Your Choice
          </p>
        </div>
        <div className="flex gap-1.5 lg:gap-2 items-center">
          <p className="text-center rounded-lg text-xs lg:text-sm font-bold px-1.5 py-1 lg:px-2.5 lg:py-2 bg-[#D9D9D9] text-black">
            A1
          </p>
          <p className="text-white font-semibold text-xs lg:text-base text-center">Available</p>
        </div>
        <div className="flex gap-1.5 lg:gap-2 items-center">
          <p className="text-center rounded-lg text-xs lg:text-sm font-bold px-1.5 py-1 lg:px-2.5 lg:py-2 bg-[#D9D9D9] text-white">
            A1
          </p>
          <p className="text-white text-xs lg:text-bas  font-semibold text-center">
            Not Available
          </p>
        </div>
      </div>

      <span className="bg-[#D9d9d9] h-2 lg:h-3 fill-[#d9d9d9] w-full"></span>
      <Seat selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />
      <div className="flex w-full rounded-lg overflow-hidden  border border-gray">
        <div className="flex flex-col border-r border-gray">
          <p className="bg-gray text-center text-sm lg:text-base  text-black font-medium px-7 lg:px-20">
            Total Price
          </p>
          <p className="text-center text-sm items-center m-auto lg:text-base  text-white font-bold py-6">
            Rp. 100.9000
          </p>
        </div>
        <div className="flex flex-col flex-1">
          <p className="bg-gray text-center text-black text-sm lg:text-base  font-medium">
            Selected Seats ({selectedSeats.length || 0})
          </p>
          <p className="text-center text-white font-bold px-4 flex-wrap py-6 flex items-center justify-center gap-2">
            {selectedSeats.map((seat: string, index: number) => {
              return (
                <p
                  key={index}
                  className="text-center rounded-lg text-xs lg:text-sm font-bold px-1.5 py-1 lg:px-2.5 lg:py-2 bg-red text-white"
                >
                  {seat}
                </p>
              );
            })}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <Button color="red">Go to payment</Button>
      </div>
    </div>
  );
  return <Modal header={header} isOpen={seatModal.isOpen} body={body} />;
};

export default SeatModal;
