"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoDark from "../../../../public/logo-dark.png";
import logoWhite from "../../../../public/logo-white.png";

export const Logo = ({ width = 50, height = 50 }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();
    const observer = new MutationObserver(checkDark);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  return <Image src={isDark ? logoWhite : logoDark} alt="logo" width={width} height={height} />;
};
