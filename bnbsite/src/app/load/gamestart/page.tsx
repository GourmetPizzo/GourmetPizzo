"use client";
import { ButtonFontGradient, Center } from "@/app/Style";
import Link from "next/link";
import React, { useEffect } from "react";
import buttonBgm from "../components/buttonbgm/buttonbgm";
import { useCountStore } from "@/app/Store";
import axios from "axios";

const Page = () => {
  const { MyDataUpdate, Address, MyData } = useCountStore();
  console.log(MyData);
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
    <div className=" w-full h-full flex flex-col items-center justify-center xl:gap-[150px] md:gap-[50px]">
      <div className=" flex items-center justify-center cursor-default font-BMHANNA xl:text-[155px] md:text-[80px] sm:text-[40px] max-h-[160px] h-full text-02-gray font-outline-3 ">
        GOURMET
      </div>
      <Link
        href={"/load/gamestart/mainpage"}
        className={` bg-ButtonImage bg-cover rounded-[10px] border-solid border-01-brown/55 border-[2px] xl:max-w-[315px] max-w-[250px] xl:max-h-[82px] max-h-[60px] w-full h-full xl:text-[33px] md:text-[28px] sm:text-[22px] font-BMHANNA ${Center} cursor-pointer `}
      >
        <div
          className={`${ButtonFontGradient}`}
          onClick={() => {
            buttonBgm();
          }}
        >
          GAME START
        </div>
      </Link>
    </div>
  );
};

export default Page;
