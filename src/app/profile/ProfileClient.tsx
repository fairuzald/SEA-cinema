"use client";

// React imports
import React, { SetStateAction, useCallback, useEffect, useState } from "react";

// Other component imports
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import Avatar from "@/components/Avatar";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TextInput from "@/components/TextInput";
import UserFilter from "@/components/UserFilter";

// Prisma and toast imports
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";

// Date and authentication imports
import { format } from "date-fns";
import { signOut, useSession } from "next-auth/react";


// ProfileClient component
const ProfileClient = ({
  currentUser,
  allUsers,
}: {
  currentUser: User | null;
  allUsers?: User[];
}) => {
  // React hooks
  const params = useSearchParams();
  const router = useRouter();

  // State edit profile variables
  const [name, setName] = useState(currentUser?.name as string);
  const [username, setUsername] = useState(currentUser?.username as string);
  const [telephoneNumber, setTelephoneNumber] = useState(
    currentUser?.telephoneNumber as string
  );
  // State handle nominals balance transaction
  const [topupNominals, setTopupNominals] = useState("");
  const [shareNominals, setShareNominals] = useState("");
  const prices = [
    50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000,
  ];
  const [withDrawalNominals, setWithDrawalNominals] = useState("");
  const [age, setAge] = useState(currentUser?.age.toString() as string);
  const [selectedUser, setSelectedUser] = useState<User | undefined | null>(
    undefined
  );

  // Function to format the date
  const formattedDate = (dateTime: Date) => {
    return format(new Date(dateTime), "EEEE, dd MMM yyyy");
  };

  // Handle more than maxAmount on Transactions
  useEffect(() => {
    const maxAmount = 500000;
    const numericNominal = (nominal: string) =>
      parseInt(nominal.replace(/\./g, ""), 10);
    if (numericNominal(withDrawalNominals) > maxAmount) {
      setWithDrawalNominals(maxAmount.toLocaleString("id-ID"));
    }
    if (numericNominal(shareNominals) > maxAmount)
      setShareNominals(maxAmount.toLocaleString("id-ID"));
  }, [topupNominals, shareNominals, withDrawalNominals]);

  // Function to handle price select
  const handlePriceSelect = (
    amount: string,
    setAmount: React.Dispatch<SetStateAction<string>>,
    price: number
  ) => {
    if (parseInt(amount.replace(/\./g, ""), 10) === price) {
      return setAmount("");
    } else {
      return setAmount(price.toLocaleString("id-ID"));
    }
  };

  // Get previous parameter from search params
  const previous = params.get("previous");

  // Function to update user data
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

  // Function to handle non-share form submissions
  const handleSubmitNonShare = useCallback(
    async (amount: string, postUrl: string) => {
      if (parseInt(amount.replace(/\./g, ""), 10) > 0) {
        try {
          const response = await fetch(`/api/${postUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: parseInt(amount.replace(/\./g, ""), 10),
            }),
          });

          if (response.ok) {
            router.refresh();
            toast.success(`Successfully ${postUrl}`);
          } else {
            const errorResponse = await response.json();
            toast.error(errorResponse.message);
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

  // Function to handle share form submission
  const handleSubmitShare = useCallback(async () => {
    if (parseInt(shareNominals.replace(/\./g, ""), 10) > 0) {
      try {
        const response = await fetch(`/api/share-balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: parseInt(shareNominals.replace(/\./g, ""), 10),
            receiverId: selectedUser?.id,
          }),
        });

        if (response.ok) {
          router.refresh();
          toast.success("Successfully Share your balance");
        } else {
          const errorResponse = await response.json();
          toast.error(errorResponse.message);
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      return toast("Give correct nominals");
    }
  }, [router, selectedUser?.id, shareNominals]);

  // Default redirect into dashboard
  useEffect(() => {
    if (!params || (!params.has("dashboard") && !params.has("topup") && !params.has("withdrawal") && !params.has("settings") && !params.has("share-balance"))) {
      router.replace("?dashboard");
    }
  }, [params, router]);

  return (
    <div className="w-full px-6 py-10 md:px-20 pt-[100px] lg:pt-[130px] flex flex-col gap-10">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      <div className="w-full flex flex-col md:flex-row gap-10 lg:gap-14 xl:gap-16 2xl:gap-20  sm:px-10 md:px-0">
        {/* Params settings and Links */}
        <div className="w-full flex px-10 md:w-fit md:px-0 md:justify-start md:items-start items-center justify-center">
          <div className="w-full md:w-[220px] lg:w-[400px]  border-gray rounded-lg flex flex-col bg-soft-black py-2 md:py2.5 lg:py-3 xl:py-4">
            <ul className="w-full flex-col px-10 gap-2 flex items-center justify-center text-center">
              {/* Dashboard link params */}
              <li
                className={`w-full px-4 ${params.has("dashboard") ? "text-red" : "text-white"} py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?dashboard">Dashboard</Link>
              </li>
              {/* Settings link params */}
              <li
                className={`w-full px-4 ${params.has("settings") ? "text-red" : "text-white"} py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?settings">Settings</Link>
              </li>
              {/* Topup link params */}
              <li
                className={`w-full px-4 ${params.has("topup") ? "text-red" : "text-white"} py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?topup">Topup</Link>
              </li>
              {/* Share Balance link params */}
              <li
                className={`w-full px-4 ${params.has("share-balance") ? "text-red" : "text-white"} py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?share-balance">Share Balance</Link>
              </li>
              {/* Withdrawal link params */}
              <li
                className={`w-full px-4 ${params.has("withdrawal") ? "text-red" : "text-white"} py-2 font-semibold text-base lg:text-lg`}
              >
                <Link href="?withdrawal">Withdrawal</Link>
              </li>
              {/* Signout action */}
              <li
                className={`w-full px-4 py-2 font-semibold text-base lg:text-lg`}
              >
                <Button color="trans-red" onClick={() => signOut()}>Sign Out</Button>

              </li>
            </ul>
          </div>
        </div>
        {params.has("dashboard") && (
          // User Information
          <section className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5">
            {/* User Hero */}
            <div className="relative flex h-40 md:h-[200px] lg:h-[250px] w-full bg-gray rounded-lg">
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
                  <h1 className="text-xl lg:text-2xl font-semibold text-white">
                    {currentUser?.name}
                  </h1>

                  {/* Display user's username */}
                  <h2 className="text-sm lg:text-base text-gray">
                    {currentUser?.username}
                  </h2>
                </div>

                {/* Display user's bio if available */}
                <h2 className="text-sm lg:text-base text-gray">
                  {currentUser?.telephoneNumber}
                </h2>

                {/* Date Joined */}
                <div className="flex items-center gap-2">
                  <CalendarIcon style="fill-gray w-3 h-3 lg:w-4 lg:h-4" />
                  {currentUser?.createdAt && (
                    <h2 className="text-sm lg:text-base text-gray">
                      Joined at {formattedDate(currentUser?.createdAt)}
                    </h2>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
        {params.has("settings") && (
          <section className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
            {/* Header */}
            <div className="text-white font-bold border-b text-lg text-center items-center justify-center lg:text-xl border-gray py-2">
              <h1>Edit Profile</h1>
            </div>
            {/* Edit content */}
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-white">Name</h2>
                <TextInput
                  type="text"
                  text={name}
                  setText={setName}
                  placeholder="Your Name"
                  fullwidth
                />
              </div>
              {/*Username */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-white">Username</h2>
                <TextInput
                  type="text"
                  text={username}
                  setText={setUsername}
                  placeholder="Username"
                  fullwidth
                />
              </div>
              {/* Age */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-white">Age </h2>
                <TextInput
                  type="text"
                  text={age}
                  setText={setAge}
                  placeholder="Your Age"
                  fullwidth
                />
              </div>
              {/* Telephone */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-white">Telephone </h2>
                <TextInput
                  type="text"
                  text={telephoneNumber}
                  setText={setTelephoneNumber}
                  placeholder="Telephone Number"
                  fullwidth
                />
              </div>
            </div>
            {/* Button confirm changes */}
            <div className="w-[300px] mt-7 mx-auto flex items-center justify-center">
              <Button color="red" onClick={updateUser}>
                Confirm Changes
              </Button>
            </div>
          </section>
        )}
        {params.has("topup") && (
          <section className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
            {/* Header */}
            <div className="text-white text-center items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
              <h1>Top up</h1>
            </div>
            {/* User balance information */}
            <div className="flex flex-col gap-4 py-5 lg:py-8">
              {/* Name */}
              <h2 className="text-red font-bold text-lg lg:text-xl">
                Your Balance{" "}
                <span className="text-white">
                  Rp. {currentUser?.balance?.toLocaleString("id-ID")}
                </span>
              </h2>
              {/* Select payment nominals topup */}
              <h2 className="text-red font-semibold text-base lg:text-lg">
                Select Top Up Nominals
              </h2>
              {/* Mapping prices selections */}
              <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                {prices.map((price, index) => {
                  return (
                    <div
                      key={index}
                      className={`border ${parseInt(topupNominals.replace(/\./g, ""), 10) ===
                        price
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
                      Rp. {price.toLocaleString("id-ID")}
                    </div>
                  );
                })}
              </div>
              {/* Customize nominals */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-red">
                  Or customize your own topup nominal{" "}
                </h2>
                <p className="text-white text-sm font-medium lg:text-base">
                  Input must be a number
                </p>
                <TextInput
                  type="text"
                  text={topupNominals}
                  setText={setTopupNominals}
                  placeholder={"Top Up Nominals"}
                  isDigit
                  fullwidth
                />
                <p className="text-red text-sm lg:text-base"></p>
              </div>
            </div>
            {/* Button to shoot api */}
            <div className="w-[300px] mt-7 mx-auto flex items-center justify-center">
              <Button
                color="red"
                size="large"
                onClick={() => handleSubmitNonShare(topupNominals, "topup")}
              >
                Top Up
              </Button>
            </div>
            {previous &&
              <div className="w-[300px] mt-7 mx-auto flex items-center justify-center">
                <Button
                  color="red"
                  size="large"
                  onClick={() => router.back()}
                >
                  Back to Movies
                </Button>
              </div>
            }

          </section>
        )}
        {params.has("share-balance") && (
          <section className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
            {/* Header */}
            <div className="text-white text-center items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
              <h1>Share Balance</h1>
            </div>
            {/* User Balance Information */}
            <div className="flex flex-col gap-4 py-5 lg:py-8">
              <h2 className="text-red font-bold text-lg lg:text-xl">
                Your Balance{" "}
                <span className="text-white">
                  Rp. {currentUser?.balance?.toLocaleString("id-ID")}
                </span>
              </h2>
              {/* User Filter friends */}
              <div className="relative flex flex-col py-7 items-center w-full justify-center">
                <UserFilter
                  value={selectedUser}
                  setValue={setSelectedUser}
                  options={allUsers}
                />
              </div>
              <h2 className="text-red font-semibold text-base lg:text-lg">
                Select Your Nominals to Share
              </h2>
              {/* Mapping prices to select */}
              <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                {prices.map((price, index) => {
                  return (
                    <div
                      key={index}
                      className={`border ${parseInt(shareNominals.replace(/\./g, ""), 10) ===
                        price
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
                      Rp. {price.toLocaleString("id-ID")}
                    </div>
                  );
                })}
              </div>
              {/* Customize own nominals */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-red">
                  Or customize your own share nominals{" "}
                </h2>
                <p className="text-white text-sm lg:text-base">
                  Maximal amount is
                  <span className="text-red"> Rp. 500.000</span>
                </p>
                <p className="text-white text-sm font-medium lg:text-base">
                  Input must be a number
                </p>
                <TextInput
                  type="text"
                  text={shareNominals}
                  setText={setShareNominals}
                  placeholder={"Share Nominals"}
                  fullwidth
                  isDigit
                />
              </div>
            </div>
            {/* Button shooting api */}
            <div className="w-[300px] mt-7 mx-auto flex items-center justify-center">
              <Button color="red" size="large" onClick={handleSubmitShare}>
                Share
              </Button>
            </div>
          </section>
        )}
        {params.has("withdrawal") && (
          <section className="flex flex-col gap-3 w-full md:flex-1 border border-gray rounded-lg p-5 md:px-7 lg:px-14 lg:py-10 xl:px-20">
            {/* Header */}
            <div className="text-white text-center items-center justify-center mb-1 flex font-bold border-b text-base w-full lg:text-xl border-gray py-2 gap-10">
              <h1>Withdrawal</h1>
            </div>
            {/* User Balance Information */}
            <div className="flex flex-col gap-4 py-5 lg:py-8">
              <h2 className="text-red font-bold text-lg lg:text-xl">
                Your Balance{" "}
                <span className="text-white">
                  Rp. {currentUser?.balance?.toLocaleString("id-ID")}
                </span>
              </h2>
              {/* Select payment nominals */}
              <h2 className="text-red font-semibold text-base lg:text-lg">
                Select Withdrawal Nominals
              </h2>
              {/* Mapping prices to select */}
              <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                {prices.map((price, index) => {
                  return (
                    <div
                      key={index}
                      className={`border ${parseInt(
                        withDrawalNominals.replace(/\./g, ""),
                        10
                      ) === price
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
                      Rp. {price.toLocaleString("id-ID")}
                    </div>
                  );
                })}
              </div>
              {/* Customize own nominals */}
              <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
                <h2 className="text-red">
                  Or customize your own Withdrawal nominal{" "}
                </h2>
                <p className="text-white font-medium text-sm lg:text-base">
                  Maximal amount is
                  <span className="text-red"> Rp. 500.000</span>
                </p>
                <p className="text-white text-sm font-medium lg:text-base">
                  Input must be a number
                </p>
                <TextInput
                  type="text"
                  text={withDrawalNominals}
                  setText={setWithDrawalNominals}
                  placeholder={"Withdrawal Nominals"}
                  fullwidth
                  isDigit
                />
              </div>
            </div>
            <div className="w-[300px] mt-7 mx-auto flex items-center justify-center">
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
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfileClient;
