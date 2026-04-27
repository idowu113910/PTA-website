import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hmm from "../assets/home.svg";
import rp from "../assets/report.svg";
import ms from "../assets/message.svg";
import ca from "../assets/callender.svg";
import pr from "../assets/pro.svg";
import home from "../assets/home1.svg";
import rpp from "../assets/report2.svg";
import caa from "../assets/callender 2.svg";
import prr from "../assets/pro2.svg";
import mss from "../assets/message2.svg";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  // Update activeTab based on current route
  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveTab(path);
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-[#C1C1C1] flex gap-[20px] w-full border-t-[1px] pt-[18px] pb-[18px] z-50 pl-10">
      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("home");
          navigate("/home");
        }}
      >
        <img
          src={activeTab === "home" ? home : hmm}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "home" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Home
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("report");
          navigate("/report");
        }}
      >
        <img
          src={activeTab === "report" ? rpp : rp}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "report" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Report
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("message");
          navigate("/message");
        }}
      >
        <img
          src={activeTab === "message" ? mss : ms}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "message" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Message
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("calendar");
          navigate("/calendar");
        }}
      >
        <img
          src={activeTab === "calendar" ? caa : ca}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "calendar" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Calendar
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("profile");
          navigate("/profile");
        }}
      >
        <img
          src={activeTab === "profile" ? prr : pr}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "profile" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Profile
        </p>
      </div>
    </div>
  );
};

export default BottomNavigation;
