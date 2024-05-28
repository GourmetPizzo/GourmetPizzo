import { TitleStyle } from "@/app/Style";
import React from "react";

const Titles = ({ text }: { text: string }) => {
  return <div className={`${TitleStyle} sm:mt-[70px]`}>{text}</div>;
};

export default Titles;
