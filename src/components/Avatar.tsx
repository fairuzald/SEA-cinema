import Image from "next/image";
import Link from "next/link";
import React from "react";
const Avatar = ({ currentUser }: { currentUser?: any }) => {
  return (
    <Link href="/">
      <Image
        src={currentUser? currentUser.imageUrl : "/defaultpp.jpg"}
        alt={"Avatar Profile"}
        width={25}
        height={25}
        className="rounded-full aspect-square object-center object-cover overflow-hidden"
      />
    </Link>
  );
};

export default Avatar;
