import Image from "next/image";
import React from "react";
import Select from "react-select";

const UserFilter = ({
  options,
  value,
  setValue,
}: {
  value: any;
  setValue: any;
  options: any;
}) => {
  return (
    <div className="w-full z-10 absolute -top-[10px]">
      <Select
        placeholder="Find your friends"
        isClearable
        options={options}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
        flex flex-row items-center gap-3 text-black"
          >
            <Image
              src="/defaultpp.jpg"
              width="20"
              height="20"
              className="w-5 h-5 rounded-full object-cover object-center"
              alt="PP"
            ></Image>
            <div>
              {option.name},
              <span className="text-neutral-500 ml-1">{option.username}</span>
              <span className="text-neutral-500 ml-1">{option.telephoneNumber}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "w-full p-2 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#ff0000",
            primary25: "#ffe4e6",
          },
        })}
      ></Select>
    </div>
  );
};

export default UserFilter;
