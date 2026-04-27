import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import hmm from "../assets/home.svg";
import rp from "../assets/report.svg";
import ms from "../assets/message.svg";
import pr from "../assets/pro.svg";
import home from "../assets/home1.svg";
import rpp from "../assets/report2.svg";
import caa from "../assets/callender 2.svg";
import ca from "../assets/callender.svg";
import prr from "../assets/colored profile.svg";
import mss from "../assets/message2.svg";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("homee");

  // Update activeTab based on current route
  useEffect(() => {
    const path = location.pathname.substring(1) || "homee";
    setActiveTab(path);
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-[#C1C1C1] flex gap-[20px] w-full border-t-[1px] pt-[18px] pb-[18px] z-50 pl-10">
      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("homee");
          navigate("/homee");
        }}
      >
        <img
          src={activeTab === "homee" ? home : hmm}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "homee" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Home
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("reportt");
          navigate("/reportt");
        }}
      >
        <img
          src={activeTab === "reportt" ? rpp : rp}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "reportt" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Report
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("messagee");
          navigate("/messagee");
        }}
      >
        <img
          src={activeTab === "messagee" ? mss : ms}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "messagee" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Message
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("calendarr");
          navigate("/calendarr");
        }}
      >
        <img
          src={activeTab === "calendarr" ? caa : ca}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "calendarr" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Calendar
        </p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer gap-1"
        onClick={() => {
          setActiveTab("profilee");
          navigate("/profilee");
        }}
      >
        <img
          src={activeTab === "profilee" ? prr : pr}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <p
          className={`font-normal text-[14px] ${
            activeTab === "profilee" ? "text-[#FF7B17]" : "text-black"
          }`}
        >
          Profile
        </p>
      </div>
    </div>
  );
};

export default BottomNavigation;
