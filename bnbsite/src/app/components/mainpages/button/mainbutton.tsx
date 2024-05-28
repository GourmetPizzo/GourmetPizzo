"use client";
import { ButtonStyle } from "@/app/Style";
import Link from "next/link";
import React, { useRef } from "react";

const MainButton = ({ text }: { text: string }) => {
  const click = useRef<HTMLAnchorElement>(null);
  const handleClick = () => {
    // if (text === "Try demo") {
    click.current?.click();
    // }
  };

  return (
    <div
      onClick={handleClick}
      className={` w-full rounded-[20px] cursor-pointer bg-white text-black hover:bg-[#333] hover:text-white max-w-[300px] md:max-w-[200px] xl:h-[86px] md:h-[60px] flex items-center justify-center font-BMHANNA xl:text-[35px] md:text-[20px]`}
    >
      {text}
      <Link href="/load" ref={click} className="hidden" />
    </div>
  );
};

export default MainButton;
