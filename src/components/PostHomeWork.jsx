import React, { useEffect, useRef, useState } from "react";
import back from "../assets/back2.svg";
import arr from "../assets/arr drop down.svg";
import cal from "../assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import on from "../assets/switch.svg";
import off from "../assets/off.svg";
import { useNavigate } from "react-router-dom";

registerLocale("en-GB", enGB);

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

const PostHomeWork = ({ onBack }) => {
  // Theme comes straight from the device's light/dark setting
  const isDarkMode = useSystemDarkMode();

  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isOn, setIsOn] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  // Keep html/body background, color-scheme and the browser top bar
  // (status bar) in sync with the device's light/dark mode.
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

  const handleToggle = () => setIsOn(!isOn);

  const grades = [
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
  ];

  const subjects = [
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Computer Science",
    "Agricultural Science",
  ];

  const handleSelect = (type, value) => {
    if (type === "grade") {
      setSelectedGrade(value);
      setIsGradeOpen(false);
    } else {
      setSelectedSubject(value);
      setIsSubjectOpen(false);
    }
  };

  // ── Shared theme classes ──
  // Inputs use a 16px font on purpose — iOS Safari zooms into any input
  // below 16px when it is focused.
  const noZoomStyle = { fontSize: "16px" };

  const labelClass = `text-[14px] sm:text-[16px] font-medium mb-1 block ${
    isDarkMode ? "text-white" : "text-[#303030]"
  }`;

  const fieldBase =
    "w-full h-[52px] sm:h-[57px] border rounded-lg px-3 focus:outline-none focus:border-[#FF7B17]";

  const inputClass = `${fieldBase} text-[16px] ${
    isDarkMode
      ? "border-gray-600 bg-transparent text-white placeholder:text-gray-400"
      : "border-[#0000001F] bg-white text-[#303030] placeholder:text-gray-400"
  }`;

  const dropdownBtnClass = `${fieldBase} flex items-center justify-between text-[14px] ${
    isDarkMode
      ? "border-gray-600 bg-transparent"
      : "border-[#0000001F] bg-white"
  }`;

  const dropdownPanelClass = `absolute z-20 mt-2 w-full border rounded-lg shadow-md ${
    isDarkMode ? "bg-[#1e1e1e] border-gray-700" : "bg-white border-[#E5E7EB]"
  }`;

  const dropdownItemClass = `px-4 py-3 text-[14px] cursor-pointer ${
    isDarkMode
      ? "text-white hover:bg-[#2a2a2a]"
      : "text-[#303030] hover:bg-blue-50"
  }`;

  const selectedTextClass = (value) =>
    value ? (isDarkMode ? "text-white" : "text-black") : "text-gray-400";

  return (
    <div
      className={`max-w-[430px] mx-auto w-full min-h-screen pb-28 transition-colors duration-200 ${
        isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 cursor-pointer"
        onClick={onBack}
      >
        <img src={back} alt="back" className={isDarkMode ? "invert" : ""} />
        <h2
          className={`text-[18px] sm:text-[20px] font-medium ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Post Homework
        </h2>
      </div>

      {/* Form */}
      <div className="px-4 flex flex-col gap-5">
        {/* Grade */}
        <div>
          <label className={labelClass}>Select Class</label>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsGradeOpen(!isGradeOpen);
                setIsSubjectOpen(false);
              }}
              className={dropdownBtnClass}
            >
              <span className={selectedTextClass(selectedGrade)}>
                {selectedGrade || "Select grade"}
              </span>

              <img
                src={arr}
                alt=""
                className={`w-4 h-4 transition-transform ${
                  isGradeOpen ? "rotate-180" : ""
                } ${isDarkMode ? "invert" : ""}`}
              />
            </button>

            {isGradeOpen && (
              <div className={dropdownPanelClass}>
                {grades.map((grade) => (
                  <div
                    key={grade}
                    onClick={() => handleSelect("grade", grade)}
                    className={dropdownItemClass}
                  >
                    {grade}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className={labelClass}>Subject</label>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsSubjectOpen(!isSubjectOpen);
                setIsGradeOpen(false);
              }}
              className={dropdownBtnClass}
            >
              <span className={selectedTextClass(selectedSubject)}>
                {selectedSubject || "Select subject"}
              </span>

              <img
                src={arr}
                alt=""
                className={`w-4 h-4 transition-transform ${
                  isSubjectOpen ? "rotate-180" : ""
                } ${isDarkMode ? "invert" : ""}`}
              />
            </button>

            {isSubjectOpen && (
              <div className={dropdownPanelClass}>
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    onClick={() => handleSelect("subject", subject)}
                    className={dropdownItemClass}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className={labelClass}>Homework Title</label>
          <input
            type="text"
            placeholder="E.g..., Practice Counting Numbers"
            style={noZoomStyle}
            className={inputClass}
          />
        </div>

        {/* Instructions */}
        <div>
          <label className={labelClass}>Instructions</label>
          <input
            type="text"
            placeholder="E.g., Count the apples..."
            style={noZoomStyle}
            className={inputClass}
          />
        </div>

        {/* Date — a button (not an input) so iOS never focus-zooms it */}
        <div>
          <label className={labelClass}>Due Date</label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              style={noZoomStyle}
              className={`${fieldBase} text-[16px] text-left cursor-pointer pr-10 ${
                isDarkMode
                  ? "border-gray-600 bg-transparent"
                  : "border-[#0000001F] bg-white"
              } ${selectedTextClass(selectedDate)}`}
            >
              {selectedDate
                ? selectedDate.toLocaleDateString("en-GB")
                : "Select date"}
            </button>

            <img
              src={cal}
              alt="calendar"
              onClick={() => setIsOpen(true)}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer ${
                isDarkMode ? "invert" : ""
              }`}
            />

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 px-4">
                <div
                  className={`rounded-xl p-4 ${
                    isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                  }`}
                >
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setIsOpen(false);
                    }}
                    inline
                    minDate={new Date("2026-01-01")}
                    maxDate={new Date("2026-12-31")}
                    locale="en-GB"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between mt-2">
          <p
            className={`text-[14px] sm:text-[16px] font-medium ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Notify Parents
          </p>

          <img
            src={isOn ? off : on}
            alt="toggle"
            onClick={handleToggle}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PostHomeWork;
