"use client";
import { useCountStore } from "@/app/Store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Address } = useCountStore();
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleIsNotLogin = () => {
      ref.current?.click();
    };

    if (!Address) {
      handleIsNotLogin();
    }
  }, [Address]);

  return (
    <>
      <Link href="/" ref={ref} className="hidden" />
      {children}
    </>
  );
}
