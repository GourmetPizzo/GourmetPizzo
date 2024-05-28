"use client";
import { ButtonBrownBorder, ButtonFontGradient, Center } from "@/app/Style";
import { useWidth } from "@/app/hooks/useWidth";
import { useRouter } from "next/navigation";
import React from "react";
import buttonBgm from "../buttonbgm/buttonbgm";

const BackButton = () => {
  const router = useRouter();
  const width = useWidth();
  // bg-gradient-to-r from-[#EAB863] to-[#F7ED8A]
  return (
    <div
      className={` absolute left-[20px] top-[30px] max-w-[102px] md:max-w-[50px] bg-ButtonImage bg-cover cursor-pointer w-full h-[40px] font-BMHANNA text-black text-[24px] ${Center} ${ButtonBrownBorder} rounded-[20px]`}
      onClick={() => {
        buttonBgm();
        router.back();
      }}
    >
      <div className={`${ButtonFontGradient}`}>
        {width < 1000 ? "<" : "Go Back"}
      </div>
    </div>
  );
};

export default BackButton;
