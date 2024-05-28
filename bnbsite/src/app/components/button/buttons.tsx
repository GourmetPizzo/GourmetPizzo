"use client";
import { ButtonStyle } from "@/app/Style";
import Link from "next/link";
import React, { useRef } from "react";
import Tro from "@/../public/Tro.png";
import Book from "@/../public/Book.png";
import Informaion from "@/../public/Informaion.png";
import Pizza from "@/../public/Pizza.png";
import FAQ from "@/../public/FAQ.png";
import Image from "next/image";
import { useCountStore } from "@/app/Store";
import buttonBgm from "@/app/load/components/buttonbgm/buttonbgm";

const Buttons = ({
  text,
  address,
  index,
}: {
  text: any;
  address: string;
  index: number;
}) => {
  const Ref = useRef<HTMLAnchorElement>(null);
  const { Balance } = useCountStore();

  const Images = [Pizza, "", Book, Informaion, Tro, FAQ];
  const Rotate = [
    "-rotate-[5deg] ml-[17px]",
    "-rotate-[5deg] -ml-[17px]",
    "rotate-0 ml-[17px]",
    "rotate-0 -mt-[10px] mb-[10px]",
    "rotate-[10deg] -ml-[17px]",
    "rotate-[5deg] ml-[17px]",
  ];
  const handleClick = () => {
    buttonBgm();
    if (Balance === 0 && index === 0) {
      return alert("Balance Check Plz...");
    }

    if (address.length !== 0) {
      return Ref.current?.click();
    }
    return alert("It's still under development.");
  };

  return (
    <div
      className={`${ButtonStyle} leading-[20px] ${Rotate[index]}`}
      onClick={handleClick}
    >
      <div className=" mx-[20px] text-[50px] ">
        {text !== "Mission" ? (
          <Image src={Images[index]} alt="ButoonsImageAssets" />
        ) : (
          "!"
        )}
      </div>
      {text}
      <Link href={address} ref={Ref} />
    </div>
  );
};

export default Buttons;
