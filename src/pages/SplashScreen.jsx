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
    // start animation immediately on page load
    setAnimate(true);
    // reveal center AFTER animation finishes
    const timer = setTimeout(() => {
      setShowCenter(true);
    }, 1000); // match animation duration

    const navigationTimer = setTimeout(() => {
      navigate("/onboarding");
    }, 3000); // 3 seconds total time on splash screen

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen  bg-white">
      <div className="relative w-full h-full">
        {/* Center image (hidden initially) */}
        <img
          src={cn}
          alt="Connect Ed Logo"
          className={`absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10
          transition-opacity duration-500 delay-400
          ${showCenter ? "opacity-100" : "opacity-0"}
        `}
        />

        {/* Yellow circle — starts center, moves to TOP RIGHT */}
        <img
          src={yellow}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          transition-all duration-1000 ease-out
          ${animate ? "!translate-x-[10%] !-translate-y-[135%]" : ""}
        `}
        />

        {/* Blue circle — starts center, moves to BOTTOM LEFT */}
        <img
          src={blue}
          alt=""
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          transition-all duration-1000 ease-out
          ${animate ? "!-translate-x-[100%] !translate-y-[30%]" : ""}
        `}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
