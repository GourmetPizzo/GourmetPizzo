"use client";
import React, { useEffect } from "react";
import { useCountStore } from "../Store";
import { useRouter } from "next/navigation";

const Page = ({
  params,
}: {
  params: {
    User_Address: string;
  };
}) => {
  const User_Address = params.User_Address;
  const { InviteAddress, InviteAddressUpdate } = useCountStore();
  const router = useRouter();

  useEffect(() => {
    const Invite = () => {
      InviteAddressUpdate(User_Address);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    };
    Invite();
  }, [User_Address, InviteAddressUpdate, router]);
  return (
    <div className="w-full h-screen flex items-center justify-center text-[50px] font-BMHANNA text-white ">
      Welcome to {InviteAddress.slice(0, 5) + "..."} friend.
    </div>
  );
};

export default Page;
