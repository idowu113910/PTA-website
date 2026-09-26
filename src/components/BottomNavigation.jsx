import React from "react";
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
import { useTheme } from "../ThemeContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Single source of truth for theme — comes from ThemeContext (wraps the whole app in main.jsx)
  const { isDarkMode } = useTheme();

  // Detect role from current URL prefix ("/teacher/..." vs "/parent/...")
  const isTeacher = location.pathname.startsWith("/teacher");
  const rolePrefix = isTeacher ? "/teacher" : "/parent";

  const tabs = [
    { key: "home", label: "Home", icon: hmm, activeIcon: home },
    { key: "report", label: "Report", icon: rp, activeIcon: rpp },
    { key: "message", label: "Message", icon: ms, activeIcon: mss },
    { key: "calendar", label: "Calendar", icon: ca, activeIcon: caa },
    { key: "profile", label: "Profile", icon: pr, activeIcon: prr },
  ];

  return (
    <div
      // Solid background here (not transparent) so page content behind it never shows through,
      // in either light or dark mode.
      className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t z-50 transition-colors duration-200 ${
        isDarkMode
          ? "bg-[#121212] border-gray-800"
          : "bg-white border-[#C1C1C1]"
      }`}
    >
      <div className="flex items-center justify-around w-full py-3 px-2">
        {tabs.map(({ key, label, icon, activeIcon }) => {
          const targetPath = `${rolePrefix}/${key}`;
          const isActive = location.pathname === targetPath;

          return (
            <button
              key={key}
              onClick={() => navigate(targetPath)}
              className="flex flex-col items-center justify-center gap-1 flex-1 min-w-0 bg-transparent border-none outline-none cursor-pointer"
            >
              <img
                src={isActive ? activeIcon : icon}
                alt={label}
                className={`w-6 h-6 flex-shrink-0 ${
                  !isActive && isDarkMode ? "invert" : ""
                }`}
              />
              <p
                className={`text-[11px] font-normal leading-tight truncate ${
                  isDarkMode ? "text-white" : "text-black"
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
