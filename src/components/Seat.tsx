import React, { Dispatch, SetStateAction, useCallback, useState } from "react";

const Seat = ({
  selectedSeats,
  setSelectedSeats,
}: {
  selectedSeats: string[];
  setSelectedSeats: React.Dispatch<SetStateAction<string[]>>;
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

        seats.push(
          <button
            key={`${key}-${row}-${col}`}
            className={`text-center hover:bg-red-hover hover:text-white transition rounded-lg text-sm  font-montserrat-b p-2 ${
              selectedSeats.includes(seatNumber)
                ? "bg-red text-white"
                : "bg-[#D9D9D9] text-black "
            } disabled:bg-[#D9D9D9] disabled:text-white ${
              selectedSeats.length >= 6 &&
              !selectedSeats.includes(seatNumber) &&
              "cursor-not-allowed"
            }`}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </button>
        );
      }
    }

    return seats;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-20">
        {/* Right side */}
        <div className="w-[220px] grid grid-cols-4 gap-2 ">
          {renderSeats("left")}
        </div>
        {/* Left Side */}
        <div className="w-[220px] grid grid-cols-4 gap-2">
          {renderSeats("right")}
        </div>
      </div>

      <p className="text-white text-sm font-montserrat-m">
        {selectedSeats.length < 6
          ? "Maximum Seats per payout is 6"
          : "The maximum reserved seat limit has been reached"}
      </p>
    </div>
  );
};

export default Seat;
