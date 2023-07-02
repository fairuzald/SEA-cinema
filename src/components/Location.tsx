import React from "react";
import Button from "./Button";

const Location = () => {
  return (
    <div className="flex flex-col gap-1 bg-[#3D3D3D] p-7">
      <p className="text-white font-montserrat-sb text-lg">XX7 MAll A</p>
      <p className="text-gray font-montserrat-m text-base">Jl. Raya ABC</p>
      <p className="text-gray font-montserrat-m text-base">Rp. 35000</p>
      <div className="flex gap-4 mt-2">
        <Button color="red">
          <span className="font-montserrat-sb">13.00</span>
        </Button>
        <Button color="gray">
          <span className="font-montserrat-sb">13.00</span>
        </Button>
        <Button color="gray">
          <span className="font-montserrat-sb">13.00</span>
        </Button>
      </div>
    </div>
  );
};

export default Location;
