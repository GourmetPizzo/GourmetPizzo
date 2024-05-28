import React from "react";
import BackButton from "../../components/backbutton/backbutton";
import { BoardBG_Gray, Center } from "@/app/Style";
import Titles from "../../components/titles/titles";
import Card from "./card";
import Select from "@/../public/Select.png";
import Remove from "@/../public/Remove.png";
import Boom from "@/../public/Boom.png";
import { StaticImageData } from "next/image";

export type CardData = {
  name: string;
  src: StaticImageData;
  price: number;
  style: string;
};

const Page = () => {
  const Cards = [
    { name: "select", src: Select, price: 1500, style: "mt-[38px]" },
    { name: "remove", src: Remove, price: 1500, style: "mt-[68px]" },
    { name: "boom", src: Boom, price: 1500, style: "mt-[52px]" },
  ];
  return (
    <div className={`w-full h-full ${Center} `}>
      <BackButton />
      <div
        className={`font-BMHANNA font-light flex flex-col items-center max-w-[818px] w-full xl:max-h-[615px] h-full scroll`}
      >
        <Titles text="STORE" />
        <div className=" flex sm:flex-col w-full h-full  items-center justify-center sm:justify-start gap-[26px]">
          {Cards.map((data, idx) => {
            return <Card data={data} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
