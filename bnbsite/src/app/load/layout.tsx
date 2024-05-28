import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gourmet Pizzo",
  description: "Game Ready Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex flex-col h-screen md:h-screen sm:px-[10px] xsm:px-[0px]`}
      id="Back"
    >
      <Header />
      <div className=" w-full max-w-[1080px] max-h-[640px] m-auto border-[3px] rounded-[60px] border-white border-solid flex flex-col overflow-hidden">
        {/* <GameHeader /> */}
        <div
          className={`bg-GameBackground-Iamge w-full xl:h-[640px] h-[500px] relative overflow-scroll overflow-x-hidden overflow-y-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
