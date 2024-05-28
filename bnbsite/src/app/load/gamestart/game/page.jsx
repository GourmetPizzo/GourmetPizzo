"use client";
import React, { useEffect, useState } from "react";
import GameComponent from "./game";
import SoundOn from "@/../public/SoundOn.png";
import SoundOff from "@/../public/SoundOff.png";
import Image from "next/image";
import Titles from "./titles";
import Select from "@/../public/SelectItem.png";
import Remove from "@/../public/RemoveItem.png";
import Boom from "@/../public/BoomItem.png";
import Pizzo from "@/../public/FeverGauge.png";
import { FRUITS_BASE } from "./fruits";

const Page = () => {
  const [GameInfo, setGameInfo] = useState({
    point: 0,
    combo: 0,
    fever: 0,
    feverTime: false,
  });
  const [Event, setEvent] = useState();
  const [backgroundAudio, setBackGroundAudio] = useState({
    bgm: typeof Audio !== "undefined" && new Audio("/sounds/game.mp3"),
    SoundOnOff: true,
  });
  const [Bar, setBar] = useState();
  const handleSound = () => {
    setBackGroundAudio((prev) => ({
      ...prev,
      SoundOnOff: !prev.SoundOnOff,
    }));
  };

  const Coins = [
    { width: 15, height: 15 },
    { width: 20, height: 20 },
    { width: 30, height: 30 },
    { width: 35, height: 35 },
    { width: 40, height: 40 },
    { width: 45, height: 45 },
    { width: 50, height: 50 },
    { width: 55, height: 55 },
    { width: 60, height: 60 },
    { width: 65, height: 65 },
    { width: 70, height: 70 },
  ];

  useEffect(() => {
    const ClearEvent = () => {
      clearInterval(Event);
      setGameInfo((prev) => ({
        ...prev,
        fever: 0,
        feverTime: false,
      }));
    };
    const handleFeverBar = () => {
      setBar(Math.floor((GameInfo.fever / 30) * 100));
    };
    const handleFeverTime = () => {
      setEvent(
        setInterval(() => {
          setGameInfo((prev) => ({
            ...prev,
            fever: prev.fever - 1,
          }));
        }, 1000)
      );
    };
    if (GameInfo.feverTime && GameInfo.fever === 30) {
      handleFeverTime();
    } else if (GameInfo.feverTime && GameInfo.fever === 0) {
      ClearEvent();
    }
    handleFeverBar();
  }, [GameInfo.fever, GameInfo.feverTime]);

  useEffect(() => {
    const SoundDefault = () => {
      backgroundAudio.bgm.play();
      backgroundAudio.bgm.loop = true;
      backgroundAudio.bgm.volume = 0.2;
      if (!backgroundAudio.SoundOnOff) {
        backgroundAudio.bgm.pause();
      }
    };
    SoundDefault();

    // 컴포넌트가 언마운트될 때 실행될 클린업 함수
    return () => {
      backgroundAudio.bgm.pause();
      backgroundAudio.bgm.currentTime = 0; // 재생 위치를 0으로 리셋
    };
  }, [backgroundAudio.bgm, backgroundAudio.SoundOnOff]);

  return (
    <div className=" w-full h-full py-[20px] flex justify-center gap-[10px]">
      <div className="flex flex-col items-center max-w-[150px] gap-[15px] w-full h-full">
        <Titles text="INGREDIENT" />
        <div className=" bg-white/65 w-full rounded-[10px] h-full flex flex-col justify-center">
          {FRUITS_BASE.map((items, idx) => {
            return (
              <Image
                src={`/${items.name}.png`}
                alt={items.name}
                key={idx}
                width={Coins[idx].width}
                height={Coins[idx].height}
                className=" mx-auto"
              />
            );
          })}
        </div>
      </div>
      <div className=" flex flex-col gap-[39px]">
        <div className="flex flex-col items-center gap-[25px]">
          <Titles text="SCORE" />
          <div className=" text-[28px] font-BMHANNA text-white">
            {GameInfo.point}
          </div>
        </div>
        <div className="flex flex-col items-center gap-[12px] h-full">
          <Titles text="FEVER" />
          <div className=" bg-white/65 max-w-[93px] w-full h-full rounded-[10px] py-[15px] flex flex-col items-center">
            <Image src={Pizzo} alt="PizzoImage" className="mx-auto z-20" />
            <div className=" bg-white rounded-b-[25px] h-[calc(100%-63px)] max-w-[25px] w-full mx-auto relative">
              <div
                className={` bg-gradient-to-t from-[#F7EA88] to-[#EBBA65] max-w-[25px] w-full absolute bottom-[15px] rounded-b-[25px] transition-all duration-500`}
                style={{ height: `${Bar}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <GameComponent GameInfo={GameInfo} setGameInfo={setGameInfo} />
      <div className=" flex flex-col items-center">
        <Titles text="SOUND" />
        <div className=" mt-[36px] mb-[164px]" onClick={handleSound}>
          <Image
            src={backgroundAudio.SoundOnOff ? SoundOn : SoundOff}
            alt="SoundIamgeAssets"
            className=" cursor-pointer"
          />
        </div>
        <Titles text="ITEMS" />
        <Image
          src={Select}
          alt="ItemOneImage"
          className=" mt-[15px] mb-[25px] cursor-pointer"
          onClick={() => {
            alert("Working on it!!!");
          }}
        />
        <Image
          src={Remove}
          alt="ItemOneImage"
          className="mb-[25px] cursor-pointer"
          onClick={() => {
            alert("Working on it!!!");
          }}
        />
        <Image
          src={Boom}
          alt="ItemOneImage"
          className=" cursor-pointer"
          onClick={() => {
            alert("Working on it!!!");
          }}
        />
      </div>
    </div>
  );
};

export default Page;
