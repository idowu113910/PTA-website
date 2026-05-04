import React, { useEffect, useState } from "react";
import blue from "../assets/Blue.svg";
import yellow from "../assets/Yellow.svg";
import cn from "../assets/Connect.svg";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const [animate, setAnimate] = useState(false);
  const [showCenter, setShowCenter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setShowCenter(true);
    }, 5000);

    const navigationTimer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        {/* Center logo */}
        <img
          src={cn}
          alt="Connect Ed Logo"
          className={`absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10
            transition-opacity duration-500 delay-400
            ${showCenter ? "opacity-100" : "opacity-0"}
          `}
        />

        {/* Yellow circle — moves straight UP */}
        <img
          src={yellow}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    transition-all duration-1000 ease-out
    ${animate ? "!translate-x-[10%] !-translate-y-[175%]" : ""}
  `}
        />

        {/* Blue circle — moves further DOWN and off screen edge */}
        <img
          src={blue}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    transition-all duration-1000 ease-out
    ${animate ? "!-translate-x-[130%] !translate-y-[60%]" : ""}
  `}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
