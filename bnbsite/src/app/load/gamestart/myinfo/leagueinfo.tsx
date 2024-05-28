"use client";
import { useCountStore } from "@/app/Store";
import React from "react";
import Mybutton from "./mybutton";
import { useWidth } from "@/app/hooks/useWidth";

const LeagueInfo = () => {
  const { MyData, Address } = useCountStore();
  const width = useWidth();

  return (
    <div className=" bg-opacity-55 max-w-[502px] h-[513px] w-full rounded-[5px] flex flex-col items-center px-[25px] sm:px-[0px] font-BMHANNA sm:max-w-[225px] sm:w-full sm:gap-[30px]">
      <div className="mt-[30px]">
        <Mybutton
          text="Wallet Address"
          data={width < 700 ? Address.slice(0, 9) + "..." : Address}
          name="Address"
        />
      </div>
      <div className="flex sm:flex-col gap-[50px] sm:gap-[30px]">
        <div>
          <Mybutton
            text="Total Point"
            data={`${MyData?.total_point}`}
            name="Total Point"
          />
        </div>
        <div>
          <Mybutton
            text="Personal Point"
            data={`${MyData?.point}`}
            name="Personal Point"
          />
        </div>
      </div>
      <div className="flex sm:flex-col gap-[50px] sm:gap-[30px]">
        <div>
          <Mybutton
            text="Total Rank"
            data={`${MyData?.total_rank}`}
            name="Rank"
          />
        </div>
        <div>
          <Mybutton
            text="Personal Rank"
            data={`${MyData?.personal_rank}`}
            name="Rank"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-col">
        <Mybutton
          text="Community Rank"
          data={`${MyData?.personal_rank}`}
          name="Rank"
        />
      </div>
    </div>
  );
};

export default LeagueInfo;
