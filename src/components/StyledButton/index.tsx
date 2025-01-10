import React from "react";

import { IStyledButton } from "./StyledButton.types";

const StyledButton = ({
  title,
  color = "primary",
  onClick,
  disabled,
  className,
  type = "button",
}: IStyledButton) => {
  return (
    <button
      disabled={disabled}
      className={`${
        color === "primary" ? "bg-[#8a226f] hover:bg-[#60164d] text-white" : ""
      } 
       rounded-full px-6 py-2 text-sm transition-all duration-300 shadow-[0_12px_15px_rgba(170,42,136,0.24)] 
        disabled:bg-[#8a226f]/70 disabled:cursor-not-allowed active:scale-95 
      flex items-center justify-center w-full font-medium ${className}`}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
};
export default StyledButton;
