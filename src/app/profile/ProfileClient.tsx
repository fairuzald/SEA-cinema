"use client";
import React, { useCallback, useEffect, useState } from "react";
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
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [balance, setBalance] = useState(BALANCES.TOPUP);
  const [topupNominals, setTopupNominals] = useState("");
  const [shareNominals, setShareNominals] = useState("");
  const [search, setSearch] = useState("");
  const prices = [
    50000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000,
  ];
  const [withDrawalNominals, setWithDrawalNominals] = useState("");
  const [age, setAge] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | undefined | null>(
    undefined
  );
  const handleSelect = (event: any) => {
    const selectedName = event.target.value;
    const newSelectedUser = allUsers?.find(
      (user) => user.name === selectedName
    );
    setSelectedUser(newSelectedUser as User);
    setSearch(selectedName);
  };
  const handlePriceSelection = (price: number) => {
    if (
      (balance === BALANCES.TOPUP && parseInt(topupNominals) === price) ||
      (balance === BALANCES.SHARE && parseInt(shareNominals) === price) ||
      (balance === BALANCES.WITHDRAWAL &&
        parseInt(withDrawalNominals) === price)
    ) {
      // Deselect jika harga sudah dipilih sebelumnya
      switch (balance) {
        case BALANCES.TOPUP:
          return setTopupNominals("");

        case BALANCES.SHARE:
          return setShareNominals("");

        case BALANCES.WITHDRAWAL:
          return setWithDrawalNominals("");

        default:
          return;
      }
    } else {
      switch (balance) {
        case BALANCES.TOPUP:
          return setTopupNominals(price.toString());

        case BALANCES.SHARE:
          return setShareNominals(price.toString());

        case BALANCES.WITHDRAWAL:
          return setWithDrawalNominals(price.toString());

        default:
          return;
      }
    }
  };
  const handleSubmit = useCallback(async () => {
    if (
      parseInt(
        balance === BALANCES.TOPUP ? topupNominals : shareNominals
      ) >= 0
    ) {
      try {
        const response = await fetch(
          `/api/${balance === BALANCES.TOPUP ? "topup" : "share-balance"}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Perlu menentukan tipe konten
            },
            body: JSON.stringify({
              amount: parseInt(
                balance === BALANCES.TOPUP ? topupNominals : shareNominals
              ),
              receiverId : selectedUser?.id
            }), // Perlu mengonversi ke string JSON
          }
        );

        if (response.ok) {
          router.refresh();
          toast.success(`Successfully Top`);
        } else {
          throw new Error("Request failed");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    } else {
      return toast("Give correct nominals");
    }
  }, [router, topupNominals, balance, withDrawalNominals]);

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

  // TOPUP CONTENT
  const context: {
    [key in BALANCES]: {
      title: string;
      amount: string;
      body: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    };
  } = {
    [BALANCES.TOPUP]: {
      title: "Select Topup Nominals",
      amount: topupNominals,
      body: (
        <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
          <p className="text-red">Or customize your own topup nominal </p>
          <TextInput
            type="text"
            text={topupNominals}
            setText={setTopupNominals}
            placeholder={"Withdrawal Nominals"}
            fullwidth
          />
        </div>
      ),
    },
    [BALANCES.SHARE]: {
      title: "Select Share Nominals",
      amount: shareNominals,
      body: (
        <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
          <p className="text-red">Or customize your own share nominal </p>
          <TextInput
            type="text"
            text={shareNominals}
            setText={setShareNominals}
            placeholder={"Share Nominals"}
            fullwidth
          />
          <div>
      <div className="relative">
        <select className="p-2" value={search} onChange={handleSelect}>
          <option value="">Select a user</option>
          {allUsers
            ?.filter(
              (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.username.includes(search) ||
                user.telephoneNumber?.includes(search)
            )
            .map((user, index) => (
              <option value={user.name} key={index}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        {selectedUser && (
          <p className="p-2">
            Selected user: {selectedUser.name}
          </p>
        )}
      </div>
    </div>
        </div>
      ),
    },
    [BALANCES.WITHDRAWAL]: {
      title: "Select WITHDRAWAL Nominals",
      amount: withDrawalNominals,
      body: (
        <div className="flex flex-col font-semibold text-base lg:text-lg gap-2">
          <p className="text-red">Or customize your own WITHDRAWAL nominal </p>
          <TextInput
            type="text"
            text={withDrawalNominals}
            setText={setWithDrawalNominals}
            placeholder={"WITHDRAWAL Nominals"}
            fullwidth
          />
        </div>
      ),
    },
  };

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
                <p onClick={() => setBalance(BALANCES.TOPUP)}>Top Up</p>
                <p onClick={() => setBalance(BALANCES.SHARE)}>Share Balance</p>
                <p onClick={() => setBalance(BALANCES.WITHDRAWAL)}>
                  Tarik Tunai
                </p>
              </div>
              {/* Edit content */}
              <div className="flex flex-col gap-4 py-5 lg:py-8">
                {/* Name */}
                <p className="text-red font-bold text-lg lg:text-xl">
                  Your Balance{" "}
                  <span className="text-white">Rp.{currentUser?.balance}</span>
                </p>
                <p className="text-red font-semibold text-base lg:text-lg">
                  {context[balance].title}
                </p>
                <div className="flex flex-wrap w-full items-center justify-center gap-5 lg:px-10  font-semibold text-white">
                  {prices.map((price, index) => {
                    return (
                      <div
                        key={index}
                        className={`border ${
                          parseInt(context[balance].amount) === price
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
                {context[balance].body}
              </div>
              <div className="w-[300px] mt-7">
                <Button color="red" size="large" onClick={handleSubmit}>
                  {balance === BALANCES.TOPUP ? "TopUp" : "Withdraw"}
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
