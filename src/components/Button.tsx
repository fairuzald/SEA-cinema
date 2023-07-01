import React from "react";
interface ButtonProps {
  color: "trans-red"|"red";
  children: JSX.Element | string;
  onClick?: () => void;
  size?:"medium"|"large"
}

const Button: React.FC<ButtonProps> = ({ color, children, onClick, size = "medium" }) => {
  const colorEffect = {
    "trans-red":
      "border border-red text-red bg-transparent hover:bg-red hover:text-white",
      "red":"bg-red hover:bg-red-hover text-white"
  };
  const sizeEffect = {
    "medium":
      "px-3 py-2 text-base",
      "large":"px-6 py-3 text-lg"
  };
  return (
    <button
      onClick={onClick}
      className={`${colorEffect[color]} ${sizeEffect[size]}  font-montserrat-b rounded-xl  transition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
