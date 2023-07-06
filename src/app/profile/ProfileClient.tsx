"use client";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TextInput from "@/components/TextInput";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import UserFilter from "@/components/UserFilter";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
enum BALANCES {
  TOPUP = 1,
  SHARE = 2,
  WITHDRAWAL = 3,
}
const ProfileClient = ({
  currentUser,
  allUsers,
}: {
  currentUser?: User | null;
  allUsers?: User[];
}) => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState(currentUser?.name as string);
  const [username, setUsername] = useState(currentUser?.username as string);
  const [telephoneNumber, setTelephoneNumber] = useState(
    currentUser?.telephoneNumber as string
  );
  const [topupNominals, setTopupNominals] = useState("");
  const [shareNominals, setShareNominals] = useState("");
  const [search, setSearch] = useState("");
  const prices = [
    50000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000,
  ];
  const [withDrawalNominals, setWithDrawalNominals] = useState("");
  const [age, setAge] = useState(currentUser?.age.toString() as string);
  const [selectedUser, setSelectedUser] = useState<User | undefined | null>(
    undefined
  );

  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };
  const handlePriceSelect = (
    amount: string,
    setAmount: React.Dispatch<SetStateAction<string>>,
    price: number
  ) => {
    if (parseInt(amount) === price) {
      return setAmount("");
    } else {
      return setAmount(price.toString());
    }
  };
  const updateUser = useCallback(async () => {
    if (name && username && telephoneNumber && age) {
      try {
        const response = await fetch(`/api/user`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            telephone: telephoneNumber,
            age: parseInt(age),
          }),
        });

        if (response.ok) {
          router.refresh();
          toast.success(`Successfully Update Data User`);
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      toast("Your data is empty");
    }
  }, [router, name, username, telephoneNumber, age]);

  const handleSubmitNonShare = useCallback(
    async (amount: string, postUrl: string) => {
      if (parseInt(amount) >= 0) {
        try {
          const response = await fetch(`/api/${postUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: parseInt(amount),
            }),
          });

          if (response.ok) {
            router.refresh();
            toast.success(`Successfully ${postUrl}`);
          } else {
            throw new Error("Request failed");
          }
        } catch (err) {
          toast.error("Something went wrong");
        }
      } else {
        return toast("Give correct nominals");
      }
    },
    [router]
  );
  const handleSubmitShare = useCallback(async () => {
    if (parseInt(shareNominals) >= 0) {
      try {
        const response = await fetch(`/api/share-balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(shareNominals),
            receiverId: selectedUser?.id,
          }),
        });

        if (response.ok) {
          router.refresh();
          toast.success(`Successfully Share`);
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      return toast("Give correct nominals");
    }
  }, [router, selectedUser?.id, shareNominals]);

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
                className={`w-full px-4 ${
                  params.has("share-balance") ? "text-red" : "text-white"
                } py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?share-balance">Share Balance</Link>
              </li>
              <li
                className={`w-full px-4 ${
                  params.has("withdrawal") ? "text-red" : "text-white"
                } py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?withdrawal">Withdrawal</Link>
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
                      {currentUser?.name}
                    </h3>

                    {/* Display user's username */}
                    <p className="text-sm lg:text-base text-gray">
                      {currentUser?.username}
                    </p>
                  </div>

                  {/* Display user's bio if available */}
                  <p className="text-sm lg:text-base text-gray">
                    {currentUser?.telephoneNumber}
                  </p>

                  {/* Date Joined */}
                  <div className="flex items-center gap-2">
                    <CalendarIcon style="fill-gray w-3 h-3 lg:w-4 lg:h-4" />
                    {currentUser?.createdAt && (
                      <p className="text-sm lg:text-base text-gray">
                        Joined at {formattedDate(currentUser?.createdAt)}
                      </p>
                    )}
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
                <Button color="red" onClick={updateUser}>
                  Confirm Changes
                </Button>
              </div>
            </div>
          </>
        )}
        {params.has("topup") && (
          <>
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
              {/* Header */}
              <div className="text-white items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
                <p>Top up</p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4 py-5 lg:py-8">
                {/* Name */}
                <p className="text-red font-bold text-lg lg:text-xl">
                  Your Balance{" "}
                  <span className="text-white">Rp.{currentUser?.balance}</span>
                </p>

                <p className="text-red font-semibold text-base lg:text-lg">
                  Select Top Up Nominals
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
                        onClick={() =>
                          handlePriceSelect(
                            topupNominals,
                            setTopupNominals,
                            price
                          )
                        }
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
                    placeholder={"Withdrawal Nominals"}
                    fullwidth
                  />
                </div>
              </div>
              <div className="w-[300px] mt-7">
                <Button
                  color="red"
                  size="large"
                  onClick={() => handleSubmitNonShare(topupNominals, "topup")}
                >
                  Top Up
                </Button>
              </div>
            </div>
          </>
        )}
        {params.has("share-balance") && (
          <>
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
              {/* Header */}
              <div className="text-white items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
                <p>Share Balance</p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4 py-5 lg:py-8">
                {/* Name */}
                <p className="text-red font-bold text-lg lg:text-xl">
                  Your Balance{" "}
                  <span className="text-white">Rp.{currentUser?.balance}</span>
                </p>
                <div className="relative flex flex-col py-7 items-center w-full justify-center">
                  <UserFilter
                    value={selectedUser}
                    setValue={setSelectedUser}
                    options={allUsers}
                  />
                </div>
                <p className="text-red font-semibold text-base lg:text-lg">
                  Select Your Nominals to Share
                </p>
                <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                  {prices.map((price, index) => {
                    return (
                      <div
                        key={index}
                        className={`border ${
                          parseInt(shareNominals) === price
                            ? "bg-red border-red"
                            : "border-gray bg-transparent"
                        } rounded-xl p-5 lg:p-8 cursor-pointer`}
                        onClick={() =>
                          handlePriceSelect(
                            shareNominals,
                            setShareNominals,
                            price
                          )
                        }
                      >
                        Rp. {price}
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                  <p className="text-red">
                    Or customize your own share nominals{" "}
                  </p>
                  <TextInput
                    type="text"
                    text={shareNominals}
                    setText={setShareNominals}
                    placeholder={"Share Nominals"}
                    fullwidth
                  />
                </div>
              </div>
              <div className="w-[300px] mt-7">
                <Button color="red" size="large" onClick={handleSubmitShare}>
                  Share
                </Button>
              </div>
            </div>
          </>
        )}
        {params.has("withdrawal") && (
          <>
            <div className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
              {/* Header */}
              <div className="text-white items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
                <p>Withdrawal</p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4 py-5 lg:py-8">
                {/* Name */}
                <p className="text-red font-bold text-lg lg:text-xl">
                  Your Balance{" "}
                  <span className="text-white">Rp.{currentUser?.balance}</span>
                </p>

                <p className="text-red font-semibold text-base lg:text-lg">
                  Select Withdrawal Nominals
                </p>
                <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                  {prices.map((price, index) => {
                    return (
                      <div
                        key={index}
                        className={`border ${
                          parseInt(withDrawalNominals) === price
                            ? "bg-red border-red"
                            : "border-gray bg-transparent"
                        } rounded-xl p-5 lg:p-8 cursor-pointer`}
                        onClick={() =>
                          handlePriceSelect(
                            withDrawalNominals,
                            setWithDrawalNominals,
                            price
                          )
                        }
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
                    text={withDrawalNominals}
                    setText={setWithDrawalNominals}
                    placeholder={"Withdrawal Nominals"}
                    fullwidth
                  />
                </div>
              </div>
              <div className="w-[300px] mt-7">
                <Button
                  color="red"
                  size="large"
                  onClick={() =>
                    handleSubmitNonShare(withDrawalNominals, "withdrawal")
                  }
                >
                  Submit
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
