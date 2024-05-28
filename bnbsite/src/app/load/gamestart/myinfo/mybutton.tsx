import { ButtonBrownBorder } from "@/app/Style";
import React from "react";

const Mybutton = ({
  text,
  data,
  name,
}: {
  text: string;
  data: string;
  name: string;
}) => {
  return (
    <>
      <div
        className={`text-[24px] px-[28px] py-[16px] bg-ButtonImage rounded-[10px] ${ButtonBrownBorder} bg-cover flex items-center justify-center h-[57px]`}
      >
        {text}
      </div>
      <div
        className={`h-[33px] mt-[25px] mb-[39px] text-center ${
          name === "Address" ? "text-[20px]" : "text-[33px]"
        }`}
      >
        {(text === "Personal Point" || text === "Total Point") &&
        data === "undefined"
          ? 0
          : data}
        {name === "Rank" ? "th" : ""}
      </div>
    </>
  );
};

export default Mybutton;
