import React from "react";

const HomeButtons = ({ label }) => {
  return (
    <button className="text-white bg-dark border-2 border-grey2 rounded-full px-4 py-2 hover:bg-white hover:text-dark cursor-pointer transition-colors duration-200">
      {label}
    </button>
  );
};

export default HomeButtons;
