"use client";
import React, { SetStateAction, useEffect } from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";

const Location = ({
  data,
  selectedTime,
  setSelectedTime,
  price,
  selectedDate,
}: {
  data?: any;
  selectedTime: any;
  setSelectedTime: React.Dispatch<SetStateAction<any>>;
  price: number;
  selectedDate: Date | undefined;
}) => {
  // Function to handle time selection
  const handleTimeSelect = (
    id: number,
    price: number,
    mall: string,
    address: string,
    time: string,
  ) => {
    if (!selectedDate) {
      return toast("Select the date first");
    }
    if (selectedTime && selectedTime.time === time) {
      // Deselect if the selected time is the same as the previously selected time
      setSelectedTime(null);
    } else {
      setSelectedTime({ id, price, mall, address, time });
    }
  };

  // Reset selected time when selected date changes
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // Function to check if a time has passed
  const isTimePassed = (timeString: string, date: Date) => {
    const currentTime = new Date();
    const [hour, minute] = timeString.split(":");
    const timeToCheck = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      Number(hour),
      Number(minute),
    );
    return timeToCheck < currentTime;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((location: any, index: number) => (
        <div
          key={index}
          className="bg-[#3D3D3D] flex flex-col gap-1 px-6 py-5 lg:p-7"
        >
          <h3 className="text-white font-semibold text-base lg:text-lg">
            {location.mall}
          </h3>
          <h4 className="text-gray font-medium text-sm lg:text-base">
            {location.address}
          </h4>
          <h4 className="text-gray font-medium text-sm lg:text-base">
            Rp. {price.toLocaleString("id-Id")}
          </h4>
          <div className="flex gap-4 mt-2">
            {location.times.map((time: string) => (
              <Button
                key={location.id}
                disabled={selectedDate && isTimePassed(time, selectedDate)}
                color={
                  selectedTime &&
                  selectedTime.mall === location.mall &&
                  selectedTime.time === time
                    ? "red"
                    : "gray"
                }
                onClick={() =>
                  handleTimeSelect(
                    location.id,
                    price,
                    location.mall,
                    location.address,
                    time,
                  )
                }
              >
                <span className="font-semibold text-sm lg:text-base">
                  {time}
                </span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Location;
