import React from "react";
import Buttons from "../../../components/button/buttons";
import Image from "next/image";
import Gourmet from "@/../public/Gourmet.png";

const Page = () => {
  const ButtonsName = [
    "Making Pizza",
    "Mission",
    "Buy Cookware",
    "My information",
    "League information",
    "FAQ",
  ];
  const URL_Address = [
    "/load/gamestart/game",
    "/load/gamestart/mission",
    "/load/gamestart/store",
    "/load/gamestart/myinfo",
    "/load/gamestart/league",
    "/load/gamestart/question",
  ];
  return (
    <div
      className={` w-full h-full flex items-center justify-around xl:px-[20px] py-[20px]`}
    >
      <Image
        src={Gourmet}
        alt="GourmetImageAsset"
        className="max-w-[500px] w-full max-h-[240px] h-full md:hidden"
      ></Image>
      <div className=" flex flex-col md:items-center xl:max-w-[422px] max-w-[300px] w-full justify-center gap-[30px] h-full font-BMHANNA">
        {ButtonsName.map((item, idx) => {
          return (
            <Buttons
              text={item}
              key={idx}
              address={URL_Address[idx]}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
