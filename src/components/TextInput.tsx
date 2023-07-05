import React, { SetStateAction } from "react";

const TextInput = ({
  placeholder,
  type,
  disabled,
  text,
  setText,
  fullwidth
}: {
  placeholder?: string;
  type: string;
  disabled?: boolean;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
  fullwidth?: boolean;
}) => {
  return (
    <div className={`flex gap-4 ${fullwidth?"w-full bg-gray text-black ":"w-[140px] lg:w-[200px] bg-[#d9d9d9] text-[#3d3d3d]"} justify-between  items-center rounded-md py-2 px-3`}>
      <input
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        type={type}
        value={text}
        placeholder={placeholder}
        className="outline-none lg:px-2 border-none bg-transparent font-medium text-sm w-full lg:text-lg placeholder:text-neutral-800"
      />
    </div>
  );
};

export default TextInput;
