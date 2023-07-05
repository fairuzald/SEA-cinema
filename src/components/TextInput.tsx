import React, { SetStateAction } from "react";

const TextInput = ({
  placeholder,
  type,
  disabled,
  text,
  setText,
}: {
  placeholder?: string;
  type: string;
  disabled?: boolean;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-4 w-[140px] lg:w-[200px] justify-between bg-[#d9d9d9] items-center rounded-lg py-2 px-3">
      <input
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
        type={type}
        value={text}
        placeholder={placeholder}
        className="text-[#3d3d3d] outline-none border-none bg-transparent font-medium text-sm w-full lg:text-lg"
      />
    </div>
  );
};

export default TextInput;
