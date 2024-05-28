import { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      // cleanup
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return width;
};
