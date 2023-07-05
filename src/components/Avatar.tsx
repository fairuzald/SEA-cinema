import Image from "next/image";
import Link from "next/link";
import React from "react";
const Avatar = ({
  currentUser,
  size ="small",
}: {
  currentUser?: any;
  size?: "small" | "medium" | "large" | "base";
}) => {
  const sizeStyle = {
    small: "w-6 h-6 lg:h-7 lg:w-7 ",
    base: "w-10 h-10 lg:h-12 lg:w-12",
    medium: "h-24 w-24 ",
    large: "w-20 h-240 lg:w-32 lg:h-32",
  };
  return (
    <div
      className={`${sizeStyle[size]} overflow-hidden rounded-full object-cover object-center`}
    >
      <Image
        src={currentUser ? currentUser.imageUrl : "/defaultpp.jpg"}
        alt={"Avatar Profile"}
        width={1920}
        height={1080}
        className="rounded-full aspect-square object-center object-cover w-full h-full overflow-hidden"
      />
    </div>
  );
};

export default Avatar;
