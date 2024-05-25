import React from "react";

const Input = (
  {
    children,
    type = "text",
    className = "",
    icon,
    rIcon,
    error,
    eyeClick,
    ...props
  },
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
        {children && (
          <span
            onClick={eyeClick}
            className="absolute cursor-pointer hover:text-black text-gray-500 top-1/2 right-[4px] translate-y-[-50%] text-[1.3rem] w-[25px] h-[25px]"
          >
            {children}
          </span>
        )}
      </div>
      {error && (
        <p className="small mt-[-8px] pl-2 mb-1 text-sm text-red-500 lowercase">
          {error.message}
        </p>
      )}
    </>
  );
};

export default React.forwardRef(Input);
