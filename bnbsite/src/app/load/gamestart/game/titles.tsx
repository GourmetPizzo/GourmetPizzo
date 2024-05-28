import { ButtonFontGradient } from "@/app/Style";
import React from "react";

const Titles = ({ text }: { text: string }) => {
  return (
    <div
      className={` font-BMHANNA bg-white/65 w-[91px] h-[40px] flex justify-center items-center rounded-[10px]`}
    >
      <span className={`${ButtonFontGradient}`}>{text}</span>
    </div>
  );
};

export default Titles;
