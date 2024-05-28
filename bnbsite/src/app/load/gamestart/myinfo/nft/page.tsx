"use client";
import React from "react";
import BackButton from "@/app/load/components/backbutton/backbutton";
import { Center } from "@/app/Style";
import Titles from "@/app/load/components/titles/titles";
import Image from "next/image";
import NFT from "@/../public/Nft.png";
import { useCountStore } from "@/app/Store";
import buttonBgm from "@/app/load/components/buttonbgm/buttonbgm";

const Page = () => {
  const { NFTName, NFTUpdate, NFTDelete } = useCountStore();

  const handleUpdate = () => {
    buttonBgm();
    if (NFTName === "") {
      return NFTUpdate("Nft");
    }

    return NFTDelete();
  };

  return (
    <div className={`w-full h-full ${Center}`}>
      <BackButton />
      <div
        className={` px-[25px] font-BMHANNA font-light flex gap-[100px] flex-col items-center max-w-[650px] w-full max-h-[615px] h-full scroll `}
      >
        <Titles text="My NFT" />
        <div
          className={` max-w-[200px] max-h-[300px]  flex items-center justify-center rounded-[20px] cursor-pointer ${
            NFTName !== "" ? " bg-green-400/80" : "bg-white/80"
          }`}
          onClick={handleUpdate}
        >
          <Image src={NFT} alt="NFTImage" className=" max-h-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default Page;
