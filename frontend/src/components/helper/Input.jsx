import React from "react";

const Input = (
  { type = "text", className = "", icon, error, ...props },
  ref
) => {
  return (
    <>
      <div className="inputBox relative isolate">
        <span className="absolute text-gray-500 top-1/2 left-[4px] translate-y-[-50%]  w-[25px] h-[25px]">
          {icon && icon}
        </span>
        <input
          ref={ref}
          type={type}
          {...props}
          className={`p-2 rounded pl-[30px] ${className} ${
            error && "bg-red-50 border-2 border-red-100"
          }`}
        />
      </div>
      {error && <p className="small mt-[-8px] pl-2 mb-1 text-sm text-red-500 lowercase">{error.message}</p>}
    </>
  );
};

export default React.forwardRef(Input);
