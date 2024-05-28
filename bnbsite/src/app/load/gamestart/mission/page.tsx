"use client";
import React, { useEffect, useState } from "react";
import BackButton from "../../components/backbutton/backbutton";
import Check from "@/../public/Check.png";
import NoCheck from "@/../public/NoCheck.png";
import Image from "next/image";
import { useCountStore } from "@/app/Store";
import {
  TotalAddress,
  ContractMissionABI,
  ContractTotalABI,
  MissionAddress,
  today,
} from "@/app/contractStore";
import Titles from "../../components/titles/titles";
import Web3 from "web3";

const Page = () => {
  //나중에 백엔드 처리로 바꾸면 될 듯
  const [Data, setData] = useState([
    {
      name: "CheckIn",
      title: "attendance check",
      check: false,
    },
    {
      name: "Twitter",
      title: "Follow us on Twitter",
      check: false,
    },
    {
      name: "Invite",
      title: "Invite friends",
      check: false,
    },
  ]);
  const { Address } = useCountStore();

  const handleContract = async (MissionNumber: number) => {
    const Type = Data[MissionNumber].name;
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const web3 = new Web3(window.ethereum);

      const contract = new web3.eth.Contract(ContractTotalABI, TotalAddress);
      try {
        await contract.methods
          .checkMission(MissionAddress, Type, today)
          .send({ from: Address })
          .then((res) => {
            return res;
          });
      } catch (error) {
        console.error("Error fetching mission data:", error);
      }
    } else {
      console.warn(
        "MetaMask is not installed or window.ethereum is not available"
      );
    }
  };

  const handleMission = (MissionNumber: number) => {
    if (MissionNumber === 1) {
      window.open("https://twitter.com/");
    } else if (MissionNumber === 2) {
      return;
    }
    Data[MissionNumber].check = true;
    const result = Data;
    setData([...result]);
    handleContract(MissionNumber);
  };

  const handleLink = () => {
    const url = `${window.location.origin}/${Address}`;
    window.navigator.clipboard.writeText(url);
    setTimeout(() => {
      Data[2].check = true;
      const result = Data;
      setData([...result]);
    }, 20000);
    alert("Copy Success!!! Invite friends!");
  };

  useEffect(() => {
    const handleSearchMission = async () => {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          ContractMissionABI,
          MissionAddress
        );
        try {
          // twitter, invite, check
          const result: object = await contract.methods
            .getMission(today)
            .call({ from: Address });
          const result_values = Object.values(result).slice(0, 3);
          const data = result_values.pop();
          result_values.unshift(data);

          setData((prev) => [
            {
              ...prev[0],
              check: result_values[0],
            },
            {
              ...prev[1],
              check: result_values[1],
            },
            {
              ...prev[2],
              check: result_values[2],
            },
          ]);
        } catch (error) {
          console.error("Error fetching mission data:", error);
        }
      } else {
        console.warn(
          "MetaMask is not installed or window.ethereum is not available"
        );
      }
    };

    handleSearchMission();
  }, [Address]);

  return (
    <div className=" flex lg:flex-col font-BMHANNA relative items-center justify-between h-full w-full">
      <BackButton />

      <Titles text="Mission" />
      {/* <div className="bg-gradient-mission max-w-[323px] text-white text-[45px]  w-full max-h-[340px] h-full flex items-center justify-center">
        Mission
      </div> */}
      <div className=" max-w-[794px] max-h-[340px] w-full h-full flex flex-col gap-[25px] items-center justify-center leftwithout-border1px ">
        {Data.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`w-full bg-ButtonImage bg-cover max-w-[744px] max-h-[80px] h-full flex items-center justify-between px-[25px] ${
                idx !== 2 ? "cursor-pointer" : ""
              }`}
              onClick={() => handleMission(idx)}
            >
              <div className=" flex gap-[10px] items-center">
                <div className="xl:text-[30px] sm:text-[20px]">
                  {item.title}
                </div>
                <div className=" xl:text-[18px] sm:text-[14px] text-[#848484] font-Pretendard">
                  {item.check ? 1 : 0} / 1
                </div>
              </div>
              <div className="flex xl:gap-[40px] sm:gap-[10px] items-center">
                {idx === 2 ? (
                  <div
                    className="xl:text-[18px] sm:text-[14px] text-[#848484] font-Pretendard cursor-pointer"
                    onClick={handleLink}
                  >
                    복사
                  </div>
                ) : null}
                <div>
                  <Image src={item.check ? Check : NoCheck} alt={item.title} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
