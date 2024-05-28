"use client";
import useDetect from "@/app/hooks/useDetect";
import Image from "next/image";
import React, { useRef } from "react";
import Chapter1 from "@/../public/Chapter1.jpg";
import Chapter2 from "@/../public/Chapter2.jpg";
import Chapter3 from "@/../public/Chapter3.jpg";
const MainStory = () => {
  const Ref1 = useRef<HTMLDivElement>(null);
  const Ref2 = useRef<HTMLDivElement>(null);
  const Ref3 = useRef<HTMLDivElement>(null);

  const Check = useDetect(Ref1, Ref2, Ref3);

  return (
    <div className=" flex flex-col w-full bg-[#181818]/70 rounded-[20px] gap-[50px] p-[50px] ">
      <h1 className=" text-[55px] font-bold text-white mx-auto">STORY</h1>
      <div className=" flex md:flex-col gap-[50px] items-center" ref={Ref1}>
        <Image
          src={Chapter1}
          alt="Chapter1Image"
          className={` bg-gray-500 xl:max-w-[500px] w-full h-[500px] rounded-[20px] ${
            Check.observe1 ? " animate-left " : " opacity-0"
          }`}
        />
        <div
          className={` flex flex-col text-white gap-[30px] ${
            Check.observe1 ? " animate-right " : " opacity-0"
          }`}
        >
          <div className=" text-[38px] font-bold">Chapter 1: Prologue</div>
          <div className=" leading-[30px] text-[20px]">
            In 2024, in the small Italian village of Bellafiesta, legendary food
            connoisseur Mr. Gome, known as the god of gastronomy, embarks on a
            quest to find the ultimate pizza.
          </div>
        </div>
      </div>
      <div className=" flex md:flex-col gap-[50px] items-center" ref={Ref2}>
        <div
          className={` flex flex-col text-white gap-[30px] md:hidden ${
            Check.observe2 ? " animate-left " : " opacity-0"
          }`}
        >
          <div className=" text-[38px] font-bold">
            Chapter 2: The Legend of the Pizza Token and Journey
          </div>
          <div className=" leading-[30px] text-[20px]">
            Mr. Gome creates the Pizzo Token, a reward of legendary value,
            promising it to the best pizza chef. He travels across Italy,
            sampling unique pizzas in Florence, Rome, and Sicily, while secretly
            collecting and analyzing recipes to create the perfect pizza and
            revolutionize pizza-making.
          </div>
        </div>
        <Image
          src={Chapter2}
          alt="Chapter1Image"
          className={` bg-gray-500 xl:max-w-[500px] w-full h-[500px] rounded-[20px]${
            Check.observe2 ? " animate-right " : " opacity-0"
          }`}
        />
        <div
          className={` flex flex-col text-white gap-[30px] md:block hidden ${
            Check.observe2 ? " animate-left " : " opacity-0"
          }`}
        >
          <div className=" text-[38px] font-bold">
            Chapter 2: The Legend of the Pizza Token and Journey
          </div>
          <div className=" leading-[30px] text-[20px]">
            Mr. Gome creates the Pizzo Token, a reward of legendary value,
            promising it to the best pizza chef. He travels across Italy,
            sampling unique pizzas in Florence, Rome, and Sicily, while secretly
            collecting and analyzing recipes to create the perfect pizza and
            revolutionize pizza-making.
          </div>
        </div>
      </div>
      <div className=" flex md:flex-col gap-[50px] items-center" ref={Ref3}>
        <Image
          src={Chapter3}
          alt="Chapter1Image"
          className={` bg-gray-500 xl:max-w-[500px] w-full h-[500px] rounded-[20px]${
            Check.observe3 ? " animate-left " : " opacity-0"
          }`}
        />
        <div
          className={` flex flex-col text-white gap-[30px] ${
            Check.observe3 ? " animate-right " : "opacity-0"
          }`}
        >
          <div className=" text-[38px] font-bold">
            Chapter 3: The Truth and New Era
          </div>
          <div className=" leading-[30px] text-[20px]">
            In a quiet village, Mr. Gome finds a pizza infused with his culinary
            inspiration and gives the Pizzo Token to the chef, who inherits his
            knowledge and skills. Mr. Gome fades away, but his legacy continues
            through the Pizzo Token, inspiring new generations of pizza chefs
            and becoming a cherished legend among gourmets.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStory;
