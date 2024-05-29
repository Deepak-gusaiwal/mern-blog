import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div
      className={`p-2 flex justify-center items-center h-screen w-screen fixed top-0 left-0 z-[999] bg-black bg-opacity-80 ${className}`}
    >
      <span className="relative flex h-28 w-28">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="relative inline-flex justify-center items-center font-bold text-white rounded-full h-28 w-28 bg-purple-500">Loading</span>
      </span>
    </div>
  );
};

export default Loading;
