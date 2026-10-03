import React, { useState, useEffect } from "react";
import shit from "../assets/img shit.svg";
import bo from "../assets/Bosun.svg";
import pl from "../assets/plus sign.svg";
import srch from "../assets/search.svg";
import BottomNavigation from "../components/BottomNavigation";

// ── Follows the device's light/dark mode and reacts live when it changes ──
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

const allConversations = [
  {
    id: 1,
    name: "Sharon Smitty",
    img: shit,
    message: "Does your child need additional help in any subject?",
    time: "11:00 AM",
    unread: true,
    type: "message",
  },
  {
    id: 2,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "1:00 PM",
    unread: false,
    type: "message",
  },
  {
    id: 3,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "Yesterday",
    unread: false,
    type: "message",
  },
  {
    id: 4,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "Mon",
    unread: false,
    type: "message",
  },
];

const Assignment = ({ setScreen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Theme comes straight from the device's light/dark setting — no context,
  // no provider, no manual toggle.
  const isDarkMode = useSystemDarkMode();

  // Keep html/body background, color-scheme, and the browser's theme-color
  // meta tag in sync with the device's light/dark mode, same as HomePage.jsx
  // and the Calendar page — this is what makes the Safari status-bar/
  // safe-area strip repaint immediately instead of lagging behind.
  useEffect(() => {
    const bg = isDarkMode ? "#000000" : "#FFFFFF";
    const root = document.documentElement;

    const prevRootBg = root.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevScheme = root.style.colorScheme;
    const originalMetas = Array.from(
      document.querySelectorAll('meta[name="theme-color"]'),
    ).map((m) => m.cloneNode(true));

    root.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
    root.style.colorScheme = isDarkMode ? "dark" : "light";

    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.remove());
    const meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    meta.setAttribute("content", bg);
    document.head.appendChild(meta);

    return () => {
      root.style.backgroundColor = prevRootBg;
      document.body.style.backgroundColor = prevBodyBg;
      root.style.colorScheme = prevScheme;
      document
        .querySelectorAll('meta[name="theme-color"]')
        .forEach((m) => m.remove());
      originalMetas.forEach((m) => document.head.appendChild(m));
    };
  }, [isDarkMode]);

  const unreadCount = allConversations.filter((c) => c.unread).length;

  const filtered = allConversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && c.unread) ||
      (activeFilter === "Calls" && c.type === "call");

    return matchesSearch && matchesFilter;
  });

  const filters = ["All", "Unread", "Calls"];

  return (
    <div
      className={`flex flex-col h-screen h-dvh relative w-full max-w-107.5 min-w-[320px] mx-auto 
        overflow-hidden ${isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <h2
          className={`text-[20px] font-bold ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Message
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isDarkMode
                ? "bg-[#1E1E1E] hover:bg-[#2A2A2A]"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <img
              src={srch}
              alt="search"
              className={`w-4 h-4 transition-all ${
                isDarkMode ? "brightness-0 invert opacity-80" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`mx-5 mb-3 h-[48px] border rounded-[7px] flex items-center gap-[11px] px-3 transition-colors ${
          isDarkMode
            ? "bg-[#1E1E1E] border-[#2A2A2A]"
            : "bg-[#FCFCFC] border-[#D9D9D9]"
        }`}
      >
        <img
          src={srch}
          alt="search"
          className={`w-4 h-4 flex-shrink-0 transition-all ${
            isDarkMode ? "brightness-0 invert opacity-70" : ""
          }`}
        />
        <input
          type="text"
          placeholder="Search Conversations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`outline-none text-[14px] font-normal bg-transparent flex-1 min-w-0 ${
            isDarkMode
              ? "text-white placeholder:text-gray-500"
              : "text-[#616161] placeholder:text-gray-400"
          }`}
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto scrollbar-hide">
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 h-[35px] px-[10px] rounded-[5px] text-[16px] font-normal flex items-center gap-1.5 transition-colors ${
                isActive
                  ? "bg-[#FF7B17] text-white"
                  : isDarkMode
                    ? "bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]"
                    : "bg-[#EFEFEF] text-black hover:bg-gray-200"
              }`}
            >
              {f}
              {f === "Unread" && unreadCount > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                    isActive
                      ? "bg-white text-[#FF7B17]"
                      : "bg-[#FF7B17] text-white"
                  }`}
                >
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        {filtered.length === 0 ? (
          <p
            className={`text-center text-[14px] mt-12 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            No conversations found
          </p>
        ) : (
          filtered.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-3 py-3.5 border-b last:border-b-0 cursor-pointer transition-colors ${
                isDarkMode
                  ? "border-[#1F1F1F] hover:bg-[#1E1E1E]/50"
                  : "border-gray-100 hover:bg-gray-50/50"
              }`}
            >
              {/* Avatar image */}
              <img
                src={conv.img}
                alt={conv.name}
                className="w-[46px] h-[46px] rounded-full object-cover flex-shrink-0"
              />

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p
                    className={`text-[16px] font-normal truncate ${
                      isDarkMode ? "text-white" : "text-[#1C1C1C]"
                    }`}
                  >
                    {conv.name}
                  </p>
                  <p
                    className={`text-[12px] flex-shrink-0 ${
                      conv.unread
                        ? "text-[#FF7B17]"
                        : isDarkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  >
                    {conv.time}
                  </p>
                </div>
                <p
                  className={`text-[12px] truncate font-medium ${
                    conv.unread
                      ? isDarkMode
                        ? "text-white"
                        : "text-black"
                      : isDarkMode
                        ? "text-gray-400"
                        : "text-[#616161]"
                  }`}
                >
                  {conv.message}
                </p>
              </div>

              {/* Unread dot */}
              {conv.unread && (
                <div className="w-2 h-2 rounded-full bg-[#FF7B17] flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        aria-label="New conversation"
        className="absolute bottom-[72px] right-5"
      >
        <img src={pl} alt="new" className="w-[51px] h-[51px]" />
      </button>

      <BottomNavigation />
    </div>
  );
};

export default Assignment;
