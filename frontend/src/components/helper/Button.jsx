import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, className = "", children }) => {
    const buttonClass = "py-2 px-4 flex rounded-full capitalize shadow-md duration-300 border-2 border-zinc-100";
  return (
    to ? (
      <Link to={to} className={`${buttonClass} ${className}`}>
        {children}
      </Link>
    ):
    <button className={`${buttonClass} ${className}`}>
        {children}
    </button>
  );
};

export default Button;
