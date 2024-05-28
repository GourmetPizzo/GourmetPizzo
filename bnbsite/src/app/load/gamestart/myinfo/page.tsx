"use client";
import React, { useEffect } from "react";
import BackButton from "../../components/backbutton/backbutton";
import { ButtonBrownBorder, ButtonFontGradient, Center } from "@/app/Style";
import Titles from "../../components/titles/titles";
import LeagueInfo from "./leagueinfo";
import { useRouter } from "next/navigation";
import { useWidth } from "@/app/hooks/useWidth";
import buttonBgm from "../../components/buttonbgm/buttonbgm";
import { useCountStore } from "@/app/Store";
import axios from "axios";

const Page = () => {
  const { MyDataUpdate, Address } = useCountStore();
  const router = useRouter();
  const width = useWidth();

  useEffect(() => {
    const handleMyData = async () => {
      await axios
        .post("/api/mydata", {
          User_Address: Address,
        })
        .then((res) => {
          MyDataUpdate(res.data.Data);
        });
    };

    if (Address) {
      handleMyData();
    }
  }, [MyDataUpdate, Address]);
  return (
    <div className={`w-full h-full ${Center}`}>
      <BackButton />
      {width < 700 ? null : (
        <div
          className={` absolute left-[20px] top-[100px] max-w-[100px] bg-ButtonImage bg-cover cursor-pointer w-full h-[40px] font-BMHANNA text-black text-[24px] ${Center} ${ButtonBrownBorder} rounded-[20px]`}
          onClick={() => {
            buttonBgm();
            router.push("/load/gamestart/myinfo/nft");
          }}
        >
          <div className={`${ButtonFontGradient}`}>My NFT</div>
        </div>
      )}
      <div
        className={` px-[25px] font-BMHANNA font-light flex gap-[13px] flex-col items-center max-w-[650px] w-full max-h-[615px] h-full scroll`}
      >
        <Titles text="My INFORMATION" />
        <LeagueInfo />
      </div>
    </div>
  );
};

export default Page;
