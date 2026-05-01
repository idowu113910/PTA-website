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

const tabs = [
  { key: "homee", label: "Home", icon: hmm, activeIcon: home },
  { key: "reportt", label: "Report", icon: rp, activeIcon: rpp },
  { key: "messagee", label: "Message", icon: ms, activeIcon: mss },
  { key: "calendarr", label: "Calendar", icon: ca, activeIcon: caa },
  { key: "profilee", label: "Profile", icon: pr, activeIcon: prr },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("homee");

  useEffect(() => {
    const path = location.pathname.substring(1) || "homee";
    setActiveTab(path);
  }, [location]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white border-t border-[#C1C1C1]">
      <div className="w-full max-w-[430px] min-w-[320px] flex justify-around items-center py-3 px-2">
        {tabs.map(({ key, label, icon, activeIcon }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                navigate(`/${key}`);
              }}
              className="flex flex-col items-center justify-center gap-1 flex-1 min-w-0"
            >
              <img
                src={isActive ? activeIcon : icon}
                alt={label}
                className="w-6 h-6"
              />
              <p
                className={`text-[12px] font-normal truncate ${
                  isActive ? "text-[#FF7B17]" : "text-black"
                }`}
              >
                {label}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
