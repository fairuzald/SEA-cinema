"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TextInput from "@/components/TextInput";
import { User } from "@prisma/client";

const ProfileClient = ({ currentUser }: { currentUser?: User | null }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [topupNominals, setTopupNominals] = useState("");
  const [age, setAge] = useState("");
  const prices = [
    50000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000,
  ];
  const handlePriceSelection = (price: number) => {
    if (parseInt(topupNominals) === price) {
      // Deselect jika harga sudah dipilih sebelumnya
      setTopupNominals("");
    } else {
      setTopupNominals(price.toString());
    }
  };

  // useEffect(() => {
  //   if (
  //     pathname === "/profile" &&
  //     (!params.has("dashboard") ||
  //       !params.has("settings") ||
  //       !params.has("topup"))
  //   ) {
  //     router.push("/profile?dashboard");
  //   }

  // }, [pathname,params]);
  return (
    <div className="w-full px-6 py-10 md:px-20 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      <div className="w-full flex flex-col md:flex-row gap-10 lg:gap-14 xl:gap-16 2xl:gap-20  sm:px-10 md:px-0">
        {/* params settings */}
        <div className="w-full flex px-10 md:w-fit md:px-0 md:justify-start md:items-start items-center justify-center">
          <div className="w-full md:w-[220px] lg:w-[400px]  border-gray rounded-lg flex flex-col bg-soft-black py-2 md:py2.5 lg:py-3 xl:py-4">
            <ul className="w-full flex-col px-10 gap-2 flex items-center justify-center text-center">
              <li
                className={`w-full px-4 ${
                  params.has("dashboard") ? "text-red" : "text-white"
                } py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?dashboard">Dashboard</Link>
              </li>
              <li
                className={`w-full px-4 ${
                  params.has("settings") ? "text-red" : "text-white"
                } py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?settings">Settings</Link>
              </li>
              <li
                className={`w-full px-4 ${
                  params.has("topup") ? "text-red" : "text-white"
                } py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?topup">Topup</Link>
              </li>
              <li
                className={`w-full px-4 py-2 font-semibold text-base lg:text-lg`}
              >
                <Button color="red">Sign Out</Button>
              </li>
            </ul>
          </div>
        </div>
        {params.has("dashboard") && (
          <>
            {/* User Info */}
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5">
              {/* User Hero */}
              <div className="relative flex h-40 md:h-[200px] lg:h-[250px] w-full bg-gray rounded-lg">
                {/* Display the user's cover image */}
                {/* <Image
          src={user.coverImage}
          alt={"Cover Image"}
          width="1920"
          height="1080"
          className="0bject-center h-full w-full overflow-hidden object-cover"
        /> */}
                {/* Display the user's avatar */}
                <div className="absolute -bottom-11 lg:-bottom-16 left-4">
                  <Avatar size="large" currentUser={currentUser} />
                </div>
              </div>
              {/* User Bio */}
              <div className="flex text-white w-full flex-col px-1  lg:px-6 pt-4 justify-between lg:pt-7">
                {/* Description */}
                <div className="flex flex-col gap-1 pt-6 md:pt-8 lg:pt-12 lg:gap-2">
                  {/* Identity */}
                  <div>
                    {/* Display user's name */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      daslkdjkladjad
                    </h3>

                    {/* Display user's username */}
                    <p className="text-sm lg:text-base text-gray">
                      dasdklhjasjkdha
                    </p>
                  </div>

                  {/* Display user's bio if available */}
                  <p className="text-sm lg:text-base text-gray">
                    asdiklpakdal;sdkl;aks;d kj kj kllk
                  </p>

                  {/* Date Joined */}
                  <div className="flex items-center gap-2">
                    <CalendarIcon style="fill-gray w-3 h-3 lg:w-4 lg:h-4" />
                    <p className="text-sm lg:text-base text-gray">
                      Joined jh jg higkhjghjgjhiy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {params.has("settings") && (
          <>
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
              {/* Header */}
              <div className="text-white font-bold border-b text-lg lg:text-xl border-gray py-2">
                <p>Edit Profile</p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-white">Name</p>
                  <TextInput
                    type="text"
                    text={name}
                    setText={setName}
                    placeholder="Your Name"
                    fullwidth
                  />
                </div>
                {/* Address */}
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-white">Username</p>
                  <TextInput
                    type="text"
                    text={username}
                    setText={setUsername}
                    placeholder="Username"
                    fullwidth
                  />
                </div>
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-white">Age </p>
                  <TextInput
                    type="text"
                    text={age}
                    setText={setAge}
                    placeholder="Your Age"
                    fullwidth
                  />
                </div>
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-white">Telephone </p>
                  <TextInput
                    type="text"
                    text={telephoneNumber}
                    setText={setTelephoneNumber}
                    placeholder="Telephone Number"
                    fullwidth
                  />
                </div>
              </div>
              <div className="w-[300px] mt-7">
                <Button color="red">Confirm Changes</Button>
              </div>
            </div>
          </>
        )}
        {params.has("topup") && (
          <>
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
              {/* Header */}
              <div className="text-white items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
                <p>Top Up</p>
                <p>Share Balance</p>
                <p>Tarik Tunai</p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4 py-5 lg:py-8">
                {/* Name */}
                <p className="text-red font-bold text-lg lg:text-xl">
                  Your Balance <span className="text-white"> : Rp. 50.000</span>
                </p>
                <p className="text-red font-semibold text-base lg:text-lg">
                  Select Topup Nominal
                </p>
                <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                  {prices.map((price, index) => {
                    return (
                      <div
                        key={index}
                        className={`border ${
                          parseInt(topupNominals) === price
                            ? "bg-red border-red"
                            : "border-gray bg-transparent"
                        } rounded-xl p-5 lg:p-8 cursor-pointer`}
                        onClick={() => handlePriceSelection(price)}
                      >
                        Rp. {price}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-red">
                    Or customize your own topup nominal{" "}
                  </p>
                  <TextInput
                    type="text"
                    text={topupNominals}
                    setText={setTopupNominals}
                    placeholder="TopUp Nominals"
                    fullwidth
                  />
                </div>
              </div>
              <div className="w-[300px] mt-7">
                <Button color="red" size="large">
                  Topup
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
