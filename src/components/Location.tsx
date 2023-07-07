"use client";
import React, { SetStateAction } from "react";
import Button from "./Button";

const Location = ({
  data,
  selectedTime,
  setSelectedTime,
  price,
}: {
  data?: any;
  selectedTime: any;
  setSelectedTime: React.Dispatch<SetStateAction<any>>;
  price: number;
}) => {
  const handleTimeSelect = (
    id: number,
    price: number,
    mall: string,
    address: string,
    time: string
  ) => {
    if (selectedTime && selectedTime.time === time) {
      // Deselect jika waktu yang dipilih sama dengan waktu yang sudah dipilih sebelumnya
      setSelectedTime(null);
    } else {
      setSelectedTime({ id, price, mall, address, time });
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      {data.map((location: any, index: number) => (
        <div
          key={index}
          className="bg-[#3D3D3D] flex flex-col gap-1  px-6 py-5 lg:p-7"
        >
          <p className="text-white font-semibold text-base lg:text-lg">
            {location.mall}
          </p>
          <p className="text-gray font-medium text-sm lg:text-base">
            {location.address}
          </p>
          <p className="text-gray font-medium text-sm lg:text-base">
            Rp. {price}
          </p>
          <div className="flex gap-4 mt-2">
            {location.times.map((time: any) => (
              <Button
                key={location.id}
                color={
                  selectedTime &&
                  selectedTime.mall === location.mall && // Ubah data.mall menjadi location.mall
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
                    time
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
