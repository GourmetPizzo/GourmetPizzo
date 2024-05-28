"use client";
import React, { useState } from "react";
import BackButton from "../../components/backbutton/backbutton";
import { ButtonFontGradient, Center } from "@/app/Style";
import Titles from "../../components/titles/titles";
import LeagueInfo from "./leagueinfo";
import { useWidth } from "@/app/hooks/useWidth";
import buttonBgm from "../../components/buttonbgm/buttonbgm";

const Page = () => {
  const [League, setLeague] = useState("TotalRank");
  const Width = useWidth();
  const handleChange = (event: any) => {
    buttonBgm();
    const { innerText } = event.target;

    setLeague(innerText);
  };

  return (
    <div className={`w-full h-full ${Center} py-[10px] relative`}>
      <BackButton />

      {Width < 770 ? null : (
        <div className=" bg-[#9F9382]/55 rounded-[5px] p-[10px] flex flex-col gap-[10px] absolute left-[20px] top-[110px]">
          <div
            className=" bg-[#FFFFFF]/65 rounded-[3px] font-BMHANNA text-[14px] px-[9px] py-[4px] cursor-pointer"
            id="TotalRank"
            onClick={handleChange}
          >
            <div className={League === "TotalRank" ? ButtonFontGradient : ""}>
              TotalRank
            </div>
          </div>
          <div
            className=" bg-[#FFFFFF]/65 rounded-[3px] font-BMHANNA text-[14px] px-[9px] py-[4px]  cursor-pointer"
            id="PersonalRank"
            onClick={handleChange}
          >
            <div
              className={League === "PersonalRank" ? ButtonFontGradient : ""}
            >
              PersonalRank
            </div>
          </div>
          <div
            className=" bg-[#FFFFFF]/65 rounded-[3px] font-BMHANNA text-[14px] px-[9px] py-[4px]  cursor-pointer"
            id="CommunityRank"
            onClick={handleChange}
          >
            <div
              className={League === "CommunityRank" ? ButtonFontGradient : ""}
            >
              CommunityRank
            </div>
          </div>
        </div>
      )}

      <div
        className={` px-[25px] font-BMHANNA font-light flex gap-[13px] flex-col items-center max-w-[753px] w-full max-h-[633px] h-full scroll `}
      >
        <Titles text="LEAGUE INFORMATION" />
        <LeagueInfo League={League} />
      </div>
    </div>
  );
};

export default Page;
