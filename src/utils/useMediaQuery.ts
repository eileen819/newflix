import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [isMobileS, setIsMobileS] = useState(false);
  const [isMobileM, setIsMobileM] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileS_query = "(max-width: 480px)";
    const mobileM_query = "(min-width: 481px) and (max-width: 768px)";
    const tabletQuery = "(min-width: 769px) and (max-width: 1024px)";
    const mobileS = window.matchMedia(mobileS_query);
    const mobileM = window.matchMedia(mobileM_query);
    const tablet = window.matchMedia(tabletQuery);

    const handleChange = () => {
      setIsMobileS(mobileS.matches);
      setIsMobileM(mobileM.matches);
      setIsTablet(tablet.matches);
    };

    handleChange();

    mobileS.addEventListener("change", handleChange);
    mobileM.addEventListener("change", handleChange);
    tablet.addEventListener("change", handleChange);

    return () => {
      mobileS.removeEventListener("change", handleChange);
      mobileM.removeEventListener("change", handleChange);
      tablet.removeEventListener("change", handleChange);
    };
  }, []);

  return { isMobileS, isMobileM, isTablet };
}
