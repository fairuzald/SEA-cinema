import React from "react";
interface ButtonProps {
  color: "trans-red";
  children: JSX.Element | string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ color, children, onClick }) => {
  const colorEffect = {
    "trans-red":
      "border border-red text-red fill-transparent hover:fill-red transition duration-300",
  };
  return (
    <button
      onClick={onClick}
      className={`${colorEffect[color]} px-3 py-2 font-montserrat-b rounded-xl`}
    >
      {children}
    </button>
  );
};

export default Button;
