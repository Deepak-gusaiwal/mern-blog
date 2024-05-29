import React from "react";

const Section = ({ className = "", children }) => {
  return (
    <div className={`min-h-[calc(100vh-var(--headerHeight))] ${className}`}>
      {children}
    </div>
  );
};

export default Section;
