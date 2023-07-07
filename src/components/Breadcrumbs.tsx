"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ChevronIcon from "./icons/ChevronIcon";
import { usePathname } from "next/navigation";

const Breadcrumbs = ({ currentText = "" }: { currentText: string }) => {
  const pathname = usePathname();

  // Take title from pathname Url router with no empty string
  const [titlePages, setTitlePages] = useState(
    pathname.split("/").filter((title) => title !== "")
  );

  // DataUrl for href on Next Link
  const [dataUrls, setDataUrls] = useState<string[]>([]);

  // Taking data url and changing for first time rendering
  useEffect(() => {
    const newTitlePages = pathname.split("/").filter((title) => title !== "");
    setTitlePages(newTitlePages);

    const newDataUrls = newTitlePages.reduce(
      (array: string[], current: string, index: number) => {
        if (index === 0) {
          return ["/" + current];
        } else {
          const prev = array[index - 1];
          return [...array, `${prev}/${current}`];
        }
      },
      []
    );

    setDataUrls(newDataUrls);
  }, [pathname]);

  return (
    <>
      <nav className="hidden lg:flex items-center gap-4 font-gantari-md  capitalize font-montserrat-sb text-lg text-white">
        {/* Homepage */}
        <Link
          href="/"
          className="transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FFFFFF]"
        >
          Home
        </Link>
        <ChevronIcon style="fill-white -rotate-90" />
        {/* Mapping Other Page */}
        {dataUrls.map((item, index) => (
          <>
            {/* For current page */}
            {index === titlePages.length - 1 ? (
              <Link
                key={index}
                href={item}
                className="capitalize text-red transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FF0000]"
              >
                {currentText
                  ? currentText
                  : titlePages[index]?.replace("-", " ")}
              </Link>
            ) : (
              // Other not current page
              <>
                <Link
                  key={index}
                  href={item}
                  className="capitalize transition-all duration-300 ease-in-out hover:underline hover:drop-shadow-[0px_2px_4px_#FFFFFF]"
                >
                  {titlePages[index]?.replace("-", " ")}
                </Link>
                <ChevronIcon style="fill-white -rotate-90" />
              </>
            )}
          </>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
