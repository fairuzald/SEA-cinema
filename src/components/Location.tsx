import React from "react";
import Button from "./Button";

const Location = () => {
  return (
    <div className="flex flex-col gap-1 bg-[#3D3D3D] px-6 py-5 lg:p-7">
      <p className="text-white font-semibold text-base lg:text-lg">XX7 MAll A</p>
      <p className="text-gray font-medium text-sm lg:text-base">Jl. Raya ABC</p>
      <p className="text-gray font-medium text-sm lg:text-base">Rp. 35000</p>
      <div className="flex gap-4 mt-2">
        <Button color="red">
          <span className="font-semibold text-sm lg:text-base">13.00</span>
        </Button>
        <Button color="gray">
          <span className="font-semibold text-sm lg:text-base">13.00</span>
        </Button>
        <Button color="gray">
          <span className="font-semibold text-sm lg:text-base">13.00</span>
        </Button>
      </div>
    </div>
  );
};

export default Location;
