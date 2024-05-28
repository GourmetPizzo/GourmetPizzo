import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1920px" },
      lg: { max: "1440px" },
      md: { max: "960px" },
      sm: { max: "576px" },
      xsm: { max: "360px" },
    },
    extend: {
      backgroundImage: {
        "Background-Image": "url('../../public/Background.png')",
        "GameBackground-Iamge": "url('../../public/GameBackground.png')",
        ButtonImage: "url('../../public/Wooden.png')",
      },
      fontSize: {
        xsmall: "18px",
        small: "26px",
        middle: "32px",
        Large: "64px",
        XLarge: "77px",
      },
      colors: {
        "01-gray": "#C0C0C0",
        "02-gray": "#615746",
        "01-green": "#DAFF3F",
        "01-brown": "#954F25",
        "01-gold": "#FFDC9F",
      },
      fontFamily: {
        BMHANNA: "BMHANNA",
        Pretendard: "Pretendard",
      },
    },
  },
  plugins: [],
};
export default config;
