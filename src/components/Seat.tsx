import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

const Seat = ({
  selectedSeats=[],
  setSelectedSeats,
  disabledSeats,
}: {
  selectedSeats: string[];
  disabledSeats?: string[];
  setSelectedSeats: Dispatch<SetStateAction<string[]>>;
}) => {
  const handleSeatClick = useCallback(
    (seatNumber: string) => {
      if (selectedSeats.includes(seatNumber)) {
        // Deselect the seat if it's already selected
        setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      } else if (selectedSeats.length < 6) {
        // Select the seat if it's not already selected and the maximum limit is not reached
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    },
    [selectedSeats, setSelectedSeats]
  );

  const renderSeats = (key: "left" | "right") => {
    const seats = [];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 4; col++) {
        const seatNumber =
          alphabet.charAt(row) + (key === "left" ? col + 1 : col + 5);

        const isSeatSelected = selectedSeats.includes(seatNumber);
        const isSeatDisabled = disabledSeats && disabledSeats.includes(seatNumber);

        seats.push(
          <button
            key={`${key}-${row}-${col}`}
            className={`text-center hover:bg-red-hover hover:text-white transition rounded-lg text-xs lg:text-sm font-montserrat-b p-1 lg:p-2  ${
              isSeatDisabled
                ? "bg-[#D9D9D9] cursor-not-allowed text-white"
                : isSeatSelected
                ? "bg-red text-white"
                : "bg-[#D9D9D9] text-black"
            } ${
              selectedSeats.length >= 6 &&
              !isSeatSelected &&
              "cursor-not-allowed"
            }`}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={isSeatDisabled}
          >
            {seatNumber}
          </button>
        );
      }
    }

    return seats;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-6 w-full items-center justify-center">
        {/* Right side */}
        <div className="grid grid-cols-4 gap-2">{renderSeats("left")}</div>
        {/* Left Side */}
        <div className="grid grid-cols-4 gap-2">{renderSeats("right")}</div>
      </div>

      <p className="text-white text-xs lg:text-sm font-montserrat-m">
        {selectedSeats.length < 6
          ? "Maximum Seats per payout is 6"
          : "The maximum reserved seat limit has been reached"}
      </p>
    </div>
  );
};

export default Seat;
