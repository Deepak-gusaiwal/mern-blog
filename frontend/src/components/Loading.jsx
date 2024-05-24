import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div
      className={`p-2 flex justify-center items-center h-screen w-screen fixed top-0 left-0 z-[999] bg-black bg-opacity-80 ${className}`}
    >
      <h1 className="text-7xl text-white">Loading</h1>
    </div>
  );
};

export default Loading;
