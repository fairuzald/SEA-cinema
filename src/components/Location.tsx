import React, { SetStateAction } from "react";
import Button from "./Button";

const Location = ({
  data ,
  selectedTime,
  setSelectedTime,
}: {
  data?: any;
  selectedTime: any;
  setSelectedTime: React.Dispatch<SetStateAction<any>>;
}) => {
  const handleTimeSelect = (price: number, mall: string, address: string, time: string) => {
    if (selectedTime && selectedTime.time === time) {
      // Deselect jika waktu yang dipilih sama dengan waktu yang sudah dipilih sebelumnya
      setSelectedTime(null);
    } else {
      setSelectedTime({ price, mall, address, time });
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
            Rp. {location.price}
          </p>
          <div className="flex gap-4 mt-2">
            {location.times.map((time: any, index: number) => (
              <Button
                key={index}
                color={
                  selectedTime && selectedTime.time === time ? "red" : "gray"
                }
                onClick={() =>
                  handleTimeSelect(
                    location.price,
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
