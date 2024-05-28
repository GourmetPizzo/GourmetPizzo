import React from "react";
import MainButton from "../button/mainbutton";

const MainContents = () => {
  return (
    <div className=" flex w-full text-white max-w-[1440px] justify-between">
      <div className=" flex flex-col w-full items-center justify-center">
        <div className="  mb-[30px] relative ">
          <div className=" w-[238px] h-[66px] flex items-center justify-center rounded-[35px] shadow-blur bg-[#4c4c4c] top-0 absolute"></div>
          <div className=" w-[238px] h-[66px] flex items-center justify-center text-[#78FDFA] xl:top-0 md:top-[10px] xl:text-[30px] md:text-[26px] sm:text-[20px]">
            CHALLENGE
          </div>
        </div>

        <div className=" font-bold xl:text-[66px] md:text-[44px] sm:text-[26px] text-center">
          Join the Quest for the Ultimate
          <br /> Pizza with GourmetPizzo!
        </div>
        <div className=" font-light max-w-[700px] leading-[45px] text-center mb-[50px] xl:text-[20px] md:text-[18px] sm:text-[16px] sm:px-[10px] lg:leading-[30px]">
          In 2024, legendary food connoisseur Mr. Gome, the god of gastronomy,
          embarks on a journey across Italy to discover the ultimate pizza and
          create the legendary Pizzo Token. Travel through Florence, Rome, and
          Sicily, uncover secret recipes, and compete to earn the coveted Pizzo
          Token.
        </div>
        <div className=" w-full flex justify-center items-center">
          <MainButton text="Get Started" />
        </div>
      </div>
    </div>
  );
};

export default MainContents;
