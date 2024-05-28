"use client";
import React from "react";
import { CardData } from "./page";
import Image from "next/image";
import { ButtonBrownBorder, ButtonFontGradient } from "@/app/Style";
import Token from "@/../public/Token.png";
import axios from "axios";
import { useCountStore } from "@/app/Store";
import buttonBgm from "../../components/buttonbgm/buttonbgm";

const Card = ({ data }: { data: CardData }) => {
  const { Address } = useCountStore();

  const handleItemBut = async () => {
    buttonBgm();
    const result = {
      User_Address: Address,
      name: "coin_" + data.name,
    };

    await axios.post("/api/item", result).then((res) => {
      console.log(res.data);
      if (res.data.status === 200) {
        alert("Buy Success!!!");
      } else if (res.data.status === 404) {
        alert("Buy Failed!!!");
      }
    });
  };

  return (
    <div className=" flex flex-col items-center justify-between w-full h-full max-w-[231px] max-h-[297px] bg-[#333333]/70 rounded-[30px]">
      <Image src={data.src} alt={data.name} className={data.style} />
      <div
        className={` mb-[17px] bg-ButtonImage bg-cover max-w-[161px] w-full h-[41px] flex items-center justify-center ${ButtonBrownBorder} rounded-[15px] font-BMHANNA text-[24px]`}
      >
        <div
          className={`${ButtonFontGradient} w-full flex items-center justify-center relative cursor-pointer pl-[30px]`}
          onClick={handleItemBut}
        >
          <Image
            src={Token}
            alt="TokenImage"
            className=" absolute my-auto left-0"
          />
          {data.price}
        </div>
      </div>
    </div>
  );
};

export default Card;
