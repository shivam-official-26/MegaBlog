import React from "react";
import LoadingIMG from "../assets/Loading.svg";

const Loading = () => {
  return (
    <div className="h-[100vh] w-full relative z-0 overflow-y-hidden">
      <img src={LoadingIMG} alt="Loading..." />
      <div className="absolute z-1 right-[50%] top-[70%] translate-x-[50%] translate-y-[50%]  text-white font-bold text-2xl">
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        Processing…
      </div>
    </div>
  );
};

export default Loading;
