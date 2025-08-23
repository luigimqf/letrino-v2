import { useState, useEffect } from "react";

export const useMediaQuery = () => {
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isDesktop: true,
  });

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;

      setDeviceType({
        isMobile,
        isDesktop: !isMobile,
      });
    };

    checkDeviceType();

    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  return deviceType;
};
