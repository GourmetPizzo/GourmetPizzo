import React from "react";
import BackButton from "../../components/backbutton/backbutton";
import { BoardBG_Gray, Center } from "@/app/Style";
import Titles from "../../components/titles/titles";

const Page = () => {
  return (
    <div className={`w-full h-full ${Center} md:px-[20px]`}>
      <BackButton />
      <div
        className={` px-[25px] font-BMHANNA font-light flex gap-[50px] flex-col items-center max-w-[650px] w-full max-h-[615px] h-full`}
      >
        <Titles text="FAQ" />
        <div className=" flex items-center h-[22px] text-[38px] text-white">
          About GOURMET
        </div>
        <div className=" leading-[40px] text-center text-white">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry`s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
};

export default Page;
