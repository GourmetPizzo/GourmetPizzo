import React from "react";
import MainButton from "../button/mainbutton";
import Image from "next/image";
import GameImage from "@/../public/MainGame.png";

const GameIntroductionRight = () => {
  return (
    <div className=" flex md:flex-col w-full text-white max-w-[1440px] justify-between lg:px-[10px] lg:items-center">
      <div className=" flex flex-col max-w-[761px] gap-[30px] justify-center lg:items-center lg:mb-[100px]">
        <div className=" font-bold xl:text-[66px] lg:text-[44px] sm:text-[26px] lg:text-center">
          Do you have what it takes to become the next pizza legend?
        </div>
        <div className=" font-light max-w-[674px] leading-[45px] xl:text-[20px] md:text-[18px] sm:text-[16px] sm:px-[10px] lg:leading-[30px]">
          Try GourmetPizzo now and start your delicious adventure!
        </div>
        <div className=" lg:w-full lg:flex lg:justify-center">
          <MainButton text="Try demo" />
        </div>
      </div>
      <Image
        src={GameImage}
        alt="GameImageAsset"
        className=" xl:h-[524px] md:h-[300px]"
      />
    </div>
  );
};

export default GameIntroductionRight;
