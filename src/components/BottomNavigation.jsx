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

// Follows the device's light/dark mode and reacts live when it changes
function useSystemDarkMode() {
  const [isSystemDark, setIsSystemDark] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsSystemDark(e.matches);

    // Make sure state is correct on mount
    setIsSystemDark(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isSystemDark;
}

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Detect role from current URL prefix ("/teacher/..." vs "/parent/...")
  const isTeacher = location.pathname.startsWith("/teacher");
  const rolePrefix = isTeacher ? "/teacher" : "/parent";

  // Both roles follow the device's light/dark setting
  const isDarkMode = useSystemDarkMode();

  const tabs = [
    { key: "home", label: "Home", icon: hmm, activeIcon: home },
    { key: "report", label: "Report", icon: rp, activeIcon: rpp },
    { key: "message", label: "Message", icon: ms, activeIcon: mss },
    { key: "calendar", label: "Calendar", icon: ca, activeIcon: caa },
    { key: "profile", label: "Profile", icon: pr, activeIcon: prr },
  ];

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t z-50 transition-colors duration-200 ${
        isDarkMode
          ? isTeacher
            ? "bg-[#000000] border-gray-800"
            : "bg-[#000000] border-[#2E2E2E]"
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
