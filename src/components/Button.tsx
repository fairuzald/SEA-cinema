import React from "react";
interface ButtonProps {
  color: "trans-red"|"red"|"gray";
  children: JSX.Element | string;
  onClick?: () => void;
  size?:"medium"|"large"
}

const Button: React.FC<ButtonProps> = ({ color, children, onClick, size = "medium" }) => {
  const colorEffect = {
    "trans-red":
      "border border-red text-red bg-transparent hover:bg-red hover:text-white",
      "red":"bg-red hover:bg-red-hover text-white",
      "gray":"bg-gray hover:bg-neutral-200 text-white"
  };
  const sizeEffect = {
    "medium":
      "px-4 lg:px-5 py-1.5 lg:py-2 text-sm lg:text-base",
      "large":"px-5 lg:px-6 py-2 lg:py-3 text-base lg:text-lg"
  };
  return (
    <button
      onClick={onClick}
      className={`${colorEffect[color]} ${sizeEffect[size]} font-bold rounded-lg  transition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
