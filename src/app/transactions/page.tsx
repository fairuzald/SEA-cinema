import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import CalendarIcon from "@/components/icons/CalendarIcon";
import LocationIcon from "@/components/icons/LocationIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TransactionsPage = () => {
  return (
    <main className="w-full min-h-screen flex bg-background">
      {/* Container */}
      <div className="w-full px-32 pt-[130px] flex flex-col gap-10">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        <div className="w-full flex flex-col justify-center rounded-2xl border-gray border">
          {/* Toggle query active and inactive */}
          <div className="flex border-b border-gray items-end gap-10 pt-4 px-10">
            <p className="text-white font-montserrat-b text-xl px-10 py-4">
              Active
            </p>
            <p className="text-red font-montserrat-b text-xl px-10 py-4 border border-red rounded-t-lg">
              Finish
            </p>
          </div>
          <div className="flex flex-col gap-4 px-20 pt-6 pb-10">
            {/* Filter  */}
            <div className="flex gap-10 pb-4">
              {/* Container tanggal booking */}
              <div className="flex-col flex gap-2">
                {/* Tanggal Booking */}
                <p className="text-white font-montserrat-sb text-lg">
                  Tanggal Booking
                </p>
                <div className="flex gap-4 justify-between bg-[#d9d9d9]  items-center rounded-lg p-2">
                  <p className="text-[#3d3d3d] font-montserrat-md text-lg">
                    HH/MM/TT
                  </p>
                  <CalendarIcon style="fill-[#3d3d3d] w-4 h-4" />{" "}
                </div>
              </div>
              {/* Container kode booking */}
              <div className="flex-col flex gap-2">
                {/* Kode Booking */}
                <p className="text-white font-montserrat-md text-lg">
                  Kode Booking
                </p>
                <div className="flex gap-4 justify-between bg-[#d9d9d9]  items-center rounded-lg p-2">
                  <p className="text-[#3d3d3d] font-montserrat-sb text-lg">
                    Placeholder
                  </p>
                </div>
              </div>
            </div>
            {/* Mapping */}
            <div className="flex border border-gray gap-14 px-24 py-10">
              {/* Image */}
              <Image
                src="https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
                width="1920"
                height="1080"
                alt="image"
                className="rounded-xl w-[146px] h-[220px] object-center object-cover "
              />
              {/* Text content */}
              <div className="flex justify-between flex-1 ">
                {/* Content container */}
                <div className="flex flex-col gap-1 justify-between">
                  <div className="flex flex-col gap-1">
                    {/* title */}
                    <p className="text-white text-xl font-montserrat-sb capitalize">
                      MENCURI RADEN SALEH
                    </p>
                    {/* Location */}
                    <div className="flex gap-2  items-center">
                      <LocationIcon style="w-5 h-5 fill-red" />
                      <p className="text-white font-medium text-lg">
                        XX7 Mall ABC
                      </p>
                    </div>
                    {/* Ticket Count   */}
                    <div className="flex gap-2  items-center">
                      <TicketIcon style="w-5 h-5 fill-red" />
                      <p className="text-white font-medium text-lg">
                        Ticket (6 People)
                      </p>
                    </div>
                    {/* Date */}
                    <p className="text-[#d9d9d9] font-medium text-base">
                      Kamis, 01 Sept 2023
                    </p>
                  </div>
                  {/* Status */}
                  <p className="text-lg font-semibold text-white flex gap-3 items-center">
                    Status : <Button color="red">Success</Button>
                  </p>
                </div>
                {/* Price and detail button */}
                <div className="flex items-center justify-center flex-col gap-2">
                  <p className="text-2xl font-bold text-red">Rp. 50000</p>
                  <Button color="red">Details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransactionsPage;
