import Web3, { ContractAbi } from "web3";

import totalABI from "@/app/contracts/total.json";
import missionABI from "@/app/contracts/mission.json";

const TodayDate = new Date();

export const today = TodayDate.toISOString()
  .split("T")[0]
  .split("-")
  .join("")
  .slice(2);

export const TotalAddress = process.env.NEXT_PUBLIC_COTRACT_TOTAL;

export const MissionAddress = process.env.NEXT_PUBLIC_COTRACT_MISSION;

export const UserAddress = process.env.NEXT_PUBLIC_COTRACT_USER;

export const ContractTotalABI: ContractAbi = totalABI.abi;

export const ContractMissionABI: ContractAbi = missionABI.abi;
