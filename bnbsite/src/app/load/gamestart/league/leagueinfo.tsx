"use client";
import { useCountStore } from "@/app/Store";
import { useWidth } from "@/app/hooks/useWidth";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LeagueInfo = ({ League }: { League: string }) => {
  const Names = ["Ranking", "Wallet Address", "Score"];
  const { MyData, Address } = useCountStore();
  const [Data, setData] = useState({
    PersonalRank: [],
    TotalRank: [],
  });
  const DataSet = League === "TotalRank" ? Data.TotalRank : Data.PersonalRank;
  const width = useWidth();

  useEffect(() => {
    const handleUsers = async () => {
      axios
        .get("/api/gameplay")
        .then((res) => {
          if (res.data.Data) {
            // Check if Data is an array
            setData({
              PersonalRank: res.data.Data.PersonalRank,
              TotalRank: res.data.Data.TotalRank,
            });
          } else {
            console.error("API response Data is not an array:", res.data.Data);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch data:", error);
        });
    };

    handleUsers();
  }, []);

  return (
    <div className=" bg-[#777777] bg-opacity-55 max-w-[502px] h-[513px] w-full rounded-[5px] flex flex-col items-center justify-center px-[25px]">
      <div className=" flex justify-around w-full">
        {Names?.map((name, idx) => {
          return (
            <div
              key={idx}
              className={`text-[14px] h-[14px] ${
                idx === 1
                  ? " grow"
                  : `grow-0 ${
                      idx === 0
                        ? "mr-[71px] sm:mr-[20px] ml-[20px]"
                        : "mr-[50px] sm:mr-[0px] sm:text-center sm:max-w-[100px] sm:w-full"
                    }`
              }`}
            >
              {width < 1000 && idx == 1 ? name.slice(0, 6) : name}
            </div>
          );
        })}
      </div>
      <div className=" flex flex-col gap-[10px] w-full text-[14px] mt-[20px]">
        {DataSet.length === 0 ? (
          <div className=" m-auto text-[55px]">...Loading</div>
        ) : (
          DataSet?.map((data: any, idx) => {
            return (
              <div
                className=" w-full flex justify-around bg-opacity-45 bg-white h-[30px] items-center"
                key={idx}
              >
                <div className=" grow-0 max-w-[50px] w-full text-center">
                  {idx + 1}
                </div>
                <div className=" grow max-w-[155px] ml-[40px]">
                  {width < 1000
                    ? data["User_Address"].slice(0, 5) + "..."
                    : data["User_Address"].slice(0, 13) + "..."}
                </div>
                <div className=" grow-0 max-w-[100px] w-full text-center">
                  {League === "TotalRank" ? data["total_point"] : data["point"]}
                </div>
              </div>
            );
          })
        )}
        <div className=" font-BMHANNA text-white text-center">My Ranking</div>
        <div className=" w-full flex justify-around bg-opacity-45 bg-white h-[30px] items-center">
          <div className=" grow-0 max-w-[50px] w-full text-center">
            {League === "TotalRank"
              ? MyData?.total_rank
              : MyData?.personal_rank}
          </div>
          <div className=" grow max-w-[155px] ml-[40px]">
            {width < 1000
              ? Address?.slice(0, 5) + "..."
              : Address?.slice(0, 13) + "..."}
          </div>
          <div className=" grow-0 max-w-[100px] w-full text-center">
            {League === "TotalRank" ? MyData?.total_point : MyData?.point}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueInfo;
