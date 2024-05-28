"use client";
import React, { useEffect, useRef } from "react";
import { useCountStore } from "../Store";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/../public/WalletPageIcon.png";
import { ButtonBrownBorder, ButtonFontGradient, Center } from "../Style";
import Web3 from "web3";
import { metaTestMetaData } from "../type";
import axios from "axios";

const Page = () => {
  const { Address, AddressUpdate, BalanceUpdate } = useCountStore();
  const click = useRef<HTMLAnchorElement>(null);
  const handleConnect = async (web3: any) => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the connected accounts
      const accounts = await web3.eth.getAccounts();
      const data = {
        User_Address: accounts[0],
      };

      const balance = (await web3.eth.getBalance(accounts[0])) + "";
      BalanceUpdate(+balance.slice(0, 5));

      const Access_Token: string = await axios
        .post("/api/userlogin", data)
        .then((res) => {
          return res.headers.access_token;
        });

      localStorage.setItem("Access_Token", Access_Token);

      axios.defaults.headers.common["Authorization"] = `${Access_Token}`;

      AddressUpdate(accounts[0]);
    } catch (error) {
      alert("install metamask extension!!");
    }
  };

  const handleWalletAddAndSwitch = async (
    metaTestMetaData: metaTestMetaData,
    metaTestChainId: string
  ) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [metaTestMetaData],
      });

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: metaTestChainId }],
      });
    } catch (error) {
      alert("install metamask extension!!");
    }
  };

  const handleClick = async () => {
    try {
      if (
        typeof window !== "undefined" &&
        typeof window.ethereum !== "undefined"
      ) {
        const web3 = new Web3(window.ethereum);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        const metaTestChainId = "0x15eb";
        const metaTestMetaData = {
          chainId: "0x15eb",
          chainName: "opBNB Testnet",
          rpcUrls: ["https://opbnb-testnet-rpc.bnbchain.org"],
          nativeCurrency: {
            name: "tBNB",
            decimals: 18,
            symbol: "tBNB",
          },
        };

        if (chainId !== metaTestChainId) {
          // return 값이 null일 경우 해당 요청은 성공적으로 보내진 것이다.
          handleWalletAddAndSwitch(metaTestMetaData, metaTestChainId);
          handleConnect(web3);
        } else {
          handleConnect(web3);
        }
      }
    } catch (error) {
      alert("install metamask extension!!");
    }
  };

  useEffect(() => {
    const handleLink = () => {
      click.current?.click();
    };

    if (Address) {
      handleLink();
    }
  }, [Address]);

  return (
    <div className=" w-full h-full flex flex-col justify-center items-center">
      <Image
        src={Icon}
        alt="WalletIconImage"
        className=" mb-[56px] md:w-[150px] md:h-[150px]"
      />
      <div
        onClick={handleClick}
        className={`xl:text-[50px] md:text-[40px] sm:text-[30px] bg-ButtonImage bg-cover xl:max-w-[600px] md:max-w-[300px] max-w-[250px] w-full xl:h-[100px] md:h-[80px] sm:h-[60px] font-semibold rounded-[10px] cursor-pointer ${ButtonBrownBorder} ${Center}`}
      >
        <div className={` font-BMHANNA ${ButtonFontGradient}`}>
          WALLET LOGIN
        </div>
      </div>
      <Link href="/load/gamestart" ref={click} className="hidden" />
    </div>
  );
};

export default Page;
