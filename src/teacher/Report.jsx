import React, { useRef, useState, useEffect } from "react";
import BottomNavigation from "../components/BottomNavigation";
import arr from "../assets/arr down.svg";
import ma from "../assets/Attendance.svg";
import br from "../assets/Bryan.svg";
import brr from "../assets/behaviour.svg";
import gr from "../assets/Generate report.svg";
import st from "../assets/student.svg";
import pre from "../assets/Absent.svg";
import late from "../assets/late.svg";
import pres from "../assets/present.svg";
import back3 from "../assets/back3.svg";
import back from "../assets/back2.svg";
import front from "../assets/front1.svg";
import sh from "../assets/Shayla.svg";
import am from "../assets/Amaya.svg";
import ta from "../assets/Tamara.svg";
import se from "../assets/sean.svg";
import em from "../assets/Emma.svg";
import dv from "../assets/divine.svg";
import abs from "../assets/Absent2.svg";
import latee from "../assets/Late2.svg";
import presC from "../assets/present1.svg";
import absC from "../assets/absent3.svg";
import lateC from "../assets/late3.svg";
import add from "../assets/add student.svg";
import srch from "../assets/search.svg";
import cal from "../assets/calendar3.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import { useLocation, useNavigate } from "react-router-dom";
import ch from "../assets/choose.svg";
import on from "../assets/switch.svg";
import off from "../assets/off.svg";
import ana from "../assets/report rewww.svg";
import rr from "../assets/report review.svg";

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

const Report = () => {
  // Theme comes straight from the device's light/dark setting — no context,
  // no provider, no manual toggle.
  const isDarkMode = useSystemDarkMode();

  // Keep html/body background, color-scheme, and the browser's theme-color
  // meta tag in sync with the device's light/dark mode, same as the other
  // teacher screens — this is what makes the Safari status-bar/safe-area
  // strip repaint immediately instead of lagging behind.
  useEffect(() => {
    const bg = isDarkMode ? "#121212" : "#FFFFFF";
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

  const [screen, setScreen] = useState("report");
  const mainScreens = ["report"];
  const navigate = useNavigate();
  const location = useLocation();

  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentDOB, setStudentDOB] = useState(null);
  const [isDOBOpen, setIsDOBOpen] = useState(false);

  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedTermYear, setSelectedTermYear] = useState(
    "Term 3 2024/2025 Academic Year",
  );
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [academicSession, setAcademicSession] = useState("");

  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
  ];
  const terms = ["Term 1", "Term 2", "Term 3"];

  const [students, setStudents] = useState([
    { id: "06201", name: "Divine Ekubor", image: dv },
    { id: "06202", name: "Emma Wilson", image: em },
    { id: "06203", name: "Shayla Jason", image: sh },
    { id: "06204", name: "Bryan Williams", image: br },
    { id: "06205", name: "Amaya Isah", image: am },
    { id: "06206", name: "Tamara Wilson", image: ta },
    { id: "06207", name: "Sean King", image: se },
  ]);

  const [studentAttendance, setStudentAttendance] = useState({
    "06201": null,
    "06202": null,
    "06203": null,
    "06204": null,
    "06205": null,
  });
  const [counts, setCounts] = useState({ present: 0, absent: 0, late: 0 });

  const [studentName, setStudentName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentNameAdd, setStudentNameAdd] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showStudentSuccess, setShowStudentSuccess] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [comments, setComments] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef(null);
  const genders = ["Male", "Female", "Other"];

  const [progressBars, setProgressBars] = useState({
    teamwork: 0,
    communication: 0,
    respect: 0,
    responsibility: 0,
  });
  const [activeDrag, setActiveDrag] = useState(null);

  const skills = [
    { id: "teamwork", label: "Team Work" },
    { id: "communication", label: "Communication" },
    { id: "respect", label: "Respect" },
    { id: "responsibility", label: "Responsibility" },
  ];

  const reportTypes = [
    "Progress Report",
    "Term Report Card",
    "Annual Report",
    "Attendance Report",
    "Behavior/Conduct Report",
    "Assessment Report",
    "Skills-Based Report",
    "Subject-Specific Report",
  ];
  const [selectedReportType, setSelectedReportType] = useState("");
  const [isReportTypeOpen, setIsReportTypeOpen] = useState(false);

  React.useEffect(() => {
    const handleGlobalMouseUp = () => setActiveDrag(null);
    if (activeDrag) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [activeDrag]);

  const handleToggle = () => setIsOn(!isOn);

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setIsGenderOpen(false);
  };
  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setIsTermOpen(false);
  };
  const handleSelectReportType = (rt) => {
    setSelectedReportType(rt);
    setIsReportTypeOpen(false);
  };
  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  const handleMouseDown = (skillId) => setActiveDrag(skillId);
  const handleMouseUp = () => setActiveDrag(null);
  const handleMouseMove = (e, skillId) => {
    if (activeDrag !== skillId) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(
      Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
      100,
    );
    setProgressBars((prev) => ({ ...prev, [skillId]: Math.round(pct) }));
  };
  const handleSliderClick = (e, skillId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(
      Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
      100,
    );
    setProgressBars((prev) => ({ ...prev, [skillId]: Math.round(pct) }));
  };

  const handleStatusClick = (studentId, status) => {
    const prev = studentAttendance[studentId];
    setStudentAttendance((p) => ({ ...p, [studentId]: status }));
    setCounts((p) => {
      const n = { ...p };
      if (prev) n[prev] = Math.max(0, n[prev] - 1);
      n[status] = n[status] + 1;
      return n;
    });
  };

  const handleRemoveStudent = (id) =>
    setStudents((prev) => prev.filter((s) => s.id !== id));

  const generateInitials = (name) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };
  const generateAvatar = (name) => {
    const colors = [
      "%234A90E2",
      "%23E91E63",
      "%239C27B0",
      "%23FF9800",
      "%234CAF50",
      "%23F44336",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const initials = generateInitials(name);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Ccircle cx='25' cy='25' r='25' fill='${color}'/%3E%3Ctext x='25' y='32' font-size='20' fill='white' text-anchor='middle' font-family='Arial'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  const handleSaveStudent = () => {
    const newStudent = {
      id: studentID,
      name: studentNameAdd,
      image: selectedFile
        ? URL.createObjectURL(selectedFile)
        : generateAvatar(studentNameAdd),
    };
    setStudents([...students, newStudent]);
    setStudentNameAdd("");
    setStudentDOB(null);
    setSelectedGender("");
    setStudentID("");
    setSelectedFile(null);
    setStudentClass("");
    setAcademicSession("");
    setSelectedTerm("");
    setShowStudentSuccess(true);
  };

  const handleCloseStudentSuccess = () => {
    setShowStudentSuccess(false);
    setShowAddStudent(false);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };
  const handlePrevDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const isStudentFormValid =
    studentNameAdd.trim() !== "" &&
    studentDOB !== null &&
    selectedGender !== "" &&
    studentID.trim() !== "" &&
    studentClass.trim() !== "" &&
    academicSession.trim() !== "" &&
    selectedTerm !== "";

  const isBehaviourFormValid =
    studentNameAdd.trim() !== "" &&
    selectedGender !== "" &&
    selectedTerm !== "";

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  // Shared classes
  const inputClass =
    "w-full h-[52px] rounded-[8px] border py-2 px-3 text-[14px] font-normal focus:outline-none";

  const dropdownBtnClass = `w-full h-[52px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
    isDarkMode
      ? "bg-[#1E1E1E] border-[#2A2A2A] text-white"
      : "bg-[#FCFCFC] border-[#0000001F] text-[#303030]"
  }`;
  const fixedBtnWrapper =
    "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#E3E3E3] px-5 py-3 z-50";

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-screen min-h-dvh ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-[#FFFFFF] text-[#303030]"
      }`}
    >
      {/* ================= REPORT HOME ================= */}
      {screen === "report" && (
        <div
          className={`pb-24 px-5 pt-6 min-h-screen min-h-dvh ${
            isDarkMode
              ? "bg-[#121212] text-white"
              : "bg-[#FFFFFF] text-[#303030]"
          }`}
        >
          <h1 className="font-bold text-[20px]">Report</h1>

          {/* Term year dropdown */}
          <div className="relative mt-6">
            <button
              type="button"
              onClick={() => setIsTermDropdownOpen(!isTermDropdownOpen)}
              className={`w-full h-[42px] rounded-[9px] px-3 flex items-center justify-between transition-colors ${
                isDarkMode
                  ? "bg-[#1E1E1E] border border-[#2A2A2A]"
                  : "bg-[#F3F4F6] border border-transparent"
              }`}
            >
              <p
                className={`font-medium text-[13px] truncate flex-1 text-left ${
                  selectedTermYear
                    ? isDarkMode
                      ? "text-white"
                      : "text-black"
                    : "text-gray-400"
                }`}
              >
                {selectedTermYear}
              </p>
              <img
                src={arr}
                alt=""
                className={`ml-2 flex-shrink-0 transition-transform duration-200 ${
                  isTermDropdownOpen ? "rotate-180" : ""
                } ${isDarkMode ? "brightness-200" : ""}`}
              />
            </button>

            {isTermDropdownOpen && (
              <div
                className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                  isDarkMode
                    ? "bg-[#121212] border-[#2A2A2A] text-white"
                    : "bg-white border-[#E5E7EB] text-gray-900"
                }`}
              >
                {termYears.map((term) => (
                  <div
                    key={term}
                    onClick={() => {
                      setSelectedTermYear(term);
                      setIsTermDropdownOpen(false);
                    }}
                    className={`px-4 py-3 text-[13px] cursor-pointer ${
                      isDarkMode ? "hover:bg-[#1E1E1E]" : "hover:bg-[#EFF6FF]"
                    }`}
                  >
                    {term}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Task grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button
              onClick={() => setScreen("my-students")}
              className="border border-[#0F766E] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={st} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">My Students</p>
            </button>

            <button
              onClick={() => setScreen("mark-attendance")}
              className="border border-[#F97316] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={ma} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Mark Attendance</p>
            </button>

            <button
              onClick={() => setScreen("behaviour")}
              className="border border-[#0F766E] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={brr} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Behaviour</p>
            </button>

            <button
              onClick={() => setScreen("generate-report")}
              className="border border-[#3B82F6] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={gr} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Generate Report</p>
            </button>
          </div>
        </div>
      )}

      {/* ================= MARK ATTENDANCE ================= */}
      {screen === "mark-attendance" && (
        <div
          className={`pb-28  ${
            isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
          }`}
        >
          <div
            className="flex items-center gap-4 px-5 py-5 cursor-pointer"
            onClick={() => setScreen("report")}
          >
            <img src={back} alt="back" className={isDarkMode ? "invert" : ""} />
            <h2 className="text-[20px] font-medium">Attendance</h2>
          </div>

          <div className="px-5">
            <div className="flex justify-between items-center">
              <p
                className={`font-semibold text-[15px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Class Attendance
              </p>
              <p
                className={`font-semibold text-[15px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Today
              </p>
            </div>
          </div>

          {/* Date navigator */}
          <div
            className={`rounded-[6px] mx-5 mt-4 h-[45px] flex items-center justify-between px-3 ${
              isDarkMode
                ? "border border-gray-600 bg-transparent"
                : "border border-[#E3E3E3] bg-white"
            }`}
          >
            <img
              src={back3}
              alt="prev"
              onClick={handlePrevDay}
              className={`cursor-pointer flex-shrink-0 w-5 h-5 ${
                isDarkMode ? "invert" : ""
              }`}
            />
            <p
              className={`font-medium text-[13px] text-center truncate mx-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {formatDate(currentDate)}
            </p>
            <img
              src={front}
              alt="next"
              onClick={handleNextDay}
              className={`cursor-pointer flex-shrink-0 w-5 h-5 ${
                isDarkMode ? "invert" : ""
              }`}
            />
          </div>

          {/* Summary card */}
          <div
            className={`rounded-[6px] mx-5 mt-4 p-3 ${
              isDarkMode
                ? "border border-gray-600 bg-transparent"
                : "border border-[#E3E3E3] bg-white"
            }`}
          >
            <h2
              className={`font-medium text-[13px] mb-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Today's Summary
            </h2>
            <div className="flex justify-between gap-2">
              <div
                className={`flex-1 rounded-[4px] py-2 flex flex-col items-center ${
                  isDarkMode
                    ? "border border-gray-700 bg-transparent"
                    : "bg-[#F0FDF4]"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                    isDarkMode ? "bg-green-900/40" : "bg-green-100"
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p
                  className={`text-[14px] font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {counts.present}
                </p>
                <p
                  className={`text-[12px] font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Present
                </p>
              </div>
              <div
                className={`flex-1 rounded-[4px] py-2 flex flex-col items-center ${
                  isDarkMode
                    ? "border border-gray-700 bg-transparent"
                    : "bg-[#FDF1F1]"
                }`}
              >
                <img src={pre} alt="" className="w-6 h-6 mb-1" />
                <p
                  className={`text-[14px] font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {counts.absent}
                </p>
                <p
                  className={`text-[12px] font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Absent
                </p>
              </div>
              <div
                className={`flex-1 rounded-[4px] py-2 flex flex-col items-center ${
                  isDarkMode
                    ? "border border-gray-700 bg-transparent"
                    : "bg-[#FEFCE9]"
                }`}
              >
                <img src={late} alt="" className="w-6 h-6 mb-1" />
                <p
                  className={`text-[14px] font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {counts.late}
                </p>
                <p
                  className={`text-[12px] font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Late
                </p>
              </div>
            </div>
            <div
              className={`w-full h-[1px] mt-3 mb-2 ${
                isDarkMode ? "bg-gray-700" : "bg-[#D9D9D9]"
              }`}
            />
            <div className="flex justify-between">
              <p
                className={`font-medium text-[14px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Total Students
              </p>
              <p
                className={`font-semibold text-[14px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {students.length}
              </p>
            </div>
          </div>

          <p
            className={`font-medium text-[17px] px-5 mt-4 mb-2 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Student List
          </p>

          <div className="px-5 flex flex-col gap-3">
            {students.map((student) => (
              <div
                key={student.id}
                className={`rounded-[6px] px-3 py-2 flex items-center justify-between ${
                  isDarkMode
                    ? "border border-gray-600 bg-transparent"
                    : "border border-[#E3E3E3] bg-white"
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p
                      className={`font-semibold text-[14px] truncate ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {student.name}
                    </p>
                    <p className="font-medium text-[12px] text-[#9C9C9C]">
                      ID: {student.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <img
                    src={
                      studentAttendance[student.id] === "present" ? presC : pres
                    }
                    alt="present"
                    onClick={() => handleStatusClick(student.id, "present")}
                    className="cursor-pointer w-7 h-7"
                  />
                  <img
                    src={
                      studentAttendance[student.id] === "absent" ? absC : abs
                    }
                    alt="absent"
                    onClick={() => handleStatusClick(student.id, "absent")}
                    className="cursor-pointer w-7 h-7"
                  />
                  <img
                    src={
                      studentAttendance[student.id] === "late" ? lateC : latee
                    }
                    alt="late"
                    onClick={() => handleStatusClick(student.id, "late")}
                    className="cursor-pointer w-7 h-7"
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-50 transition-colors duration-200 ${
              isDarkMode
                ? "bg-[#121212] border-gray-800"
                : "bg-white border-[#E3E3E3]"
            }`}
          >
            <button className="w-full bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white">
              Save
            </button>
          </div>
        </div>
      )}

      {/* ================= MY STUDENTS ================= */}
      {screen === "my-students" && (
        <div className="pb-24">
          {!showAddStudent ? (
            <>
              {/* Header */}
              <div
                className="flex items-center gap-4 px-5 py-5 cursor-pointer"
                onClick={() => setScreen("report")}
              >
                <img
                  src={back}
                  alt="back"
                  className={isDarkMode ? "invert" : ""}
                />
                <h2 className="text-[20px] font-medium flex-1">My Students</h2>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddStudent(true);
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src={add}
                    alt="add student"
                    className={isDarkMode ? "invert" : ""}
                  />
                </div>
              </div>

              {/* Search */}
              <div
                className={`mx-5 mt-2 border rounded-[7px] h-[48px] flex items-center gap-3 px-3 ${
                  isDarkMode
                    ? "bg-[#1E1E1E] border-[#2A2A2A]"
                    : "bg-[#FCFCFC] border-[#D9D9D9]"
                }`}
              >
                <img
                  src={srch}
                  alt=""
                  className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? "brightness-200" : ""}`}
                />
                <input
                  type="text"
                  placeholder="Search Students"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`outline-none text-[14px] bg-transparent flex-1 ${
                    isDarkMode
                      ? "text-white placeholder-gray-400"
                      : "text-[#616161] placeholder-gray-400"
                  }`}
                />
              </div>

              {/* Student list */}
              <div className="px-5 mt-4 flex flex-col gap-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="border border-[#E3E3E3] rounded-[6px] px-3 py-2 flex items-center gap-2"
                  >
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[14px] truncate">
                        {student.name}
                      </p>
                      <p
                        className={`font-medium text-[12px] ${
                          isDarkMode ? "text-gray-400" : "text-[#9C9C9C]"
                        }`}
                      >
                        ID: {student.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="h-[32px] px-3 rounded-[5px] text-white font-normal text-[13px] bg-[#FF7B17]">
                        View
                      </button>
                      <button
                        className={`text-[13px] transition-colors ${
                          isDarkMode
                            ? "text-gray-400 hover:text-red-400"
                            : "text-gray-500 hover:text-red-600"
                        }`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Add Student form */
            <div
              className={`pb-28 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#303030]"}`}
            >
              <div className="flex items-center gap-4 px-5 py-5">
                <img
                  src={back}
                  alt="back"
                  onClick={() => setShowAddStudent(false)}
                  className={isDarkMode ? "invert cursor-pointer" : ""}
                />
                <h2 className="text-[20px] font-medium">Add Student</h2>
              </div>

              <div className="px-5 flex flex-col gap-5">
                <h4 className="font-semibold text-[17px]">
                  Student Information
                </h4>

                <div>
                  <label className="block text-[15px] font-medium mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. John Smith"
                    value={studentNameAdd}
                    onChange={(e) => setStudentNameAdd(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* DOB */}
                <div>
                  <label
                    className={`block text-[15px] font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-[#303030]"
                    }`}
                  >
                    Date Of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={
                        studentDOB ? studentDOB.toLocaleDateString("en-GB") : ""
                      }
                      placeholder="Select date"
                      onClick={() => setIsDOBOpen(true)}
                      className={`${inputClass} cursor-pointer pr-10`}
                    />
                    <img
                      src={cal}
                      alt="calendar"
                      onClick={() => setIsDOBOpen(true)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer transition-all ${
                        isDarkMode ? "brightness-0 invert opacity-80" : ""
                      }`}
                    />
                    {isDOBOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
                        <div
                          className={`rounded-xl p-4 shadow-lg w-full max-w-[320px] transition-colors ${
                            isDarkMode
                              ? "bg-[#1E1E1E] text-white"
                              : "bg-white text-gray-900"
                          }`}
                        >
                          <DatePicker
                            selected={studentDOB}
                            onChange={(d) => {
                              setStudentDOB(d);
                              setIsDOBOpen(false);
                            }}
                            inline
                            showPopperArrow={false}
                            maxDate={new Date()}
                            locale="en-GB"
                          />
                          <button
                            type="button"
                            onClick={() => setIsDOBOpen(false)}
                            className="mt-2 px-4 py-2 bg-[#FF7B17] hover:bg-[#E06A10] text-white font-medium rounded-md w-full transition-colors"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label
                    className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsGenderOpen(!isGenderOpen)}
                      className={`w-full h-[48px] px-3 border rounded-[7px] flex items-center justify-between transition-colors ${
                        isDarkMode
                          ? "bg-[#1E1E1E] border-[#2A2A2A] text-white"
                          : "bg-[#FCFCFC] border-[#D9D9D9] text-[#303030]"
                      }`}
                    >
                      <span
                        className={
                          selectedGender
                            ? isDarkMode
                              ? "text-white"
                              : "text-[#303030]"
                            : isDarkMode
                              ? "text-gray-400"
                              : "text-gray-400"
                        }
                      >
                        {selectedGender || "Select a gender"}
                      </span>
                      <img
                        src={arr}
                        alt=""
                        className={`w-4 h-4 transition-transform duration-200 ${isGenderOpen ? "rotate-180" : ""} ${isDarkMode ? "brightness-200" : ""}`}
                      />
                    </button>

                    {isGenderOpen && (
                      <div
                        className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                          isDarkMode
                            ? "bg-[#121212] border-[#2A2A2A] text-white"
                            : "bg-white border-[#E5E7EB] text-gray-900"
                        }`}
                      >
                        {genders.map((g) => (
                          <div
                            key={g}
                            onClick={() => handleSelectGender(g)}
                            className={`px-4 py-3 text-[14px] cursor-pointer ${
                              isDarkMode
                                ? "hover:bg-[#1E1E1E]"
                                : "hover:bg-[#EFF6FF]"
                            }`}
                          >
                            {g}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Student ID */}
                <div>
                  <label className="block text-[15px] font-medium mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Stu/020/25h"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Upload Photo */}
                <div>
                  <label
                    className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Upload Photo
                  </label>
                  <div
                    className={`flex items-center justify-between border rounded-[8px] h-[52px] px-3 cursor-pointer transition-colors ${
                      isDarkMode
                        ? "bg-[#1E1E1E] border-[#2A2A2A]"
                        : "bg-[#FCFCFC] border-[#0000001F]"
                    }`}
                    onClick={handleFileClick}
                  >
                    <span
                      className={`text-[14px] truncate flex-1 ${
                        selectedFile
                          ? isDarkMode
                            ? "text-white"
                            : "text-[#303030]"
                          : "text-gray-400"
                      }`}
                    >
                      {selectedFile ? selectedFile.name : "Choose File"}
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <img
                      src={ch}
                      alt=""
                      className={`w-[18px] h-[18px] flex-shrink-0 ml-2 ${isDarkMode ? "brightness-200" : ""}`}
                    />
                  </div>
                </div>

                <h4 className="font-semibold text-[17px] pt-1">
                  Class & Academic Info
                </h4>

                {/* Class + Session */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      Class
                    </label>
                    <input
                      type="text"
                      placeholder="e.g Grade 5"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className={`w-full h-[52px] rounded-[8px] border px-3 text-[14px] placeholder:text-gray-400 focus:outline-none transition-colors ${
                        isDarkMode
                          ? "bg-[#1E1E1E] border-[#2A2A2A] text-white"
                          : "bg-[#FCFCFC] border-[#0000001F] text-[#303030]"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    >
                      Academic Session
                    </label>
                    <input
                      type="text"
                      placeholder="E.g 2024/2025"
                      value={academicSession}
                      onChange={(e) => setAcademicSession(e.target.value)}
                      className={`w-full h-[52px] rounded-[8px] border px-3 text-[14px] placeholder:text-gray-400 focus:outline-none transition-colors ${
                        isDarkMode
                          ? "bg-[#1E1E1E] border-[#2A2A2A] text-white"
                          : "bg-[#FCFCFC] border-[#0000001F] text-[#303030]"
                      }`}
                    />
                  </div>
                </div>

                {/* Term */}
                <div>
                  <label
                    className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Term
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTermOpen(!isTermOpen)}
                      className={`w-full h-[52px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
                        isDarkMode
                          ? "bg-[#1E1E1E] border-[#2A2A2A]"
                          : "bg-[#FCFCFC] border-[#0000001F]"
                      }`}
                    >
                      <span
                        className={
                          selectedTerm
                            ? isDarkMode
                              ? "text-white"
                              : "text-[#303030]"
                            : "text-gray-400"
                        }
                      >
                        {selectedTerm || "Select Term"}
                      </span>
                      <img
                        src={arr}
                        alt=""
                        className={`transition-transform duration-200 ${isTermOpen ? "rotate-180" : ""} ${isDarkMode ? "brightness-200" : ""}`}
                      />
                    </button>

                    {isTermOpen && (
                      <div
                        className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                          isDarkMode
                            ? "bg-[#121212] border-[#2A2A2A] text-white"
                            : "bg-white border-[#E5E7EB] text-gray-900"
                        }`}
                      >
                        {terms.map((t) => (
                          <div
                            key={t}
                            onClick={() => handleSelectTerm(t)}
                            className={`px-4 py-3 text-[14px] cursor-pointer ${
                              isDarkMode
                                ? "hover:bg-[#1E1E1E]"
                                : "hover:bg-[#EFF6FF]"
                            }`}
                          >
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-40 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-[#121212] border-[#2A2A2A]"
                    : "bg-white border-[#E3E3E3]"
                }`}
              >
                <button
                  onClick={handleSaveStudent}
                  disabled={!isStudentFormValid}
                  className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] transition-all ${
                    isStudentFormValid
                      ? "bg-[#FF7B17] hover:bg-[#E06A10] text-white cursor-pointer shadow-md"
                      : isDarkMode
                        ? "bg-[#2A2A2A] text-gray-500 cursor-not-allowed border border-[#333333]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Add Student
                </button>
              </div>

              {showStudentSuccess && (
                <div className="fixed inset-0 flex items-end justify-center z-50">
                  <div
                    className="absolute inset-0 bg-black/30"
                    onClick={handleCloseStudentSuccess}
                  />
                  <div className="relative bg-white rounded-t-[20px] w-full max-w-[430px] p-6 shadow-2xl animate-slide-up">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-[20px] font-bold text-[#303030] mb-2">
                        Successful!
                      </h3>
                      <p className="text-[14px] text-gray-600 text-center mb-6">
                        You have successfully added a new student
                      </p>
                      <button
                        onClick={handleCloseStudentSuccess}
                        className="w-full bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white"
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= BEHAVIOUR ================= */}
      {screen === "behaviour" && (
        <div
          className={`pb-28 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"}`}
          onMouseUp={handleMouseUp}
        >
          <div
            className="flex items-center gap-4 px-5 py-5 cursor-pointer"
            onClick={() => setScreen("report")}
          >
            <img src={back} alt="back" className={isDarkMode ? "invert" : ""} />
            <h2
              className={`text-[20px] font-medium ${isDarkMode ? "bg-[#121212] text-white" : "bg-white  text-[#000000]"}`}
            >
              Add Behaviour
            </h2>
          </div>

          <div className="px-5 flex flex-col gap-5">
            {/* Student Name */}
            <div>
              <label
                className={`block text-[15px] font-medium ] mb-2 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#303030]"}`}
              >
                Student Name
              </label>
              <input
                type="text"
                placeholder="E.g. John Smith"
                value={studentNameAdd}
                onChange={(e) => setStudentNameAdd(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Gender */}
            <div>
              <label
                className={`block text-[15px] font-medium ] mb-2 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#303030]"}`}
              >
                Gender
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGenderOpen(!isGenderOpen)}
                  className={`w-full h-[48px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
                    isDarkMode
                      ? "bg-[#1E1E1E] border-[#2A2A2A]"
                      : "bg-[#FCFCFC] border-[#D9D9D9]"
                  }`}
                >
                  <span
                    className={
                      selectedGender
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }
                  >
                    {selectedGender || "Select a gender"}
                  </span>
                  <img
                    src={arr}
                    alt=""
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isGenderOpen ? "rotate-180" : ""
                    } ${isDarkMode ? "brightness-200" : ""}`}
                  />
                </button>

                {isGenderOpen && (
                  <div
                    className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                      isDarkMode
                        ? "bg-[#121212] border-[#2A2A2A] text-white"
                        : "bg-white border-[#E5E7EB] text-gray-900"
                    }`}
                  >
                    {genders.map((g) => (
                      <div
                        key={g}
                        onClick={() => handleSelectGender(g)}
                        className={`px-4 py-3 text-[14px] cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#1E1E1E]"
                            : "hover:bg-[#EFF6FF]"
                        }`}
                      >
                        {g}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Academic Term */}
            <div>
              <label
                className={`block text-[15px] font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-[#303030]"
                }`}
              >
                Academic Term
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsTermOpen(!isTermOpen)}
                  className={`w-full h-[48px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
                    isDarkMode
                      ? "bg-[#1E1E1E] border-[#2A2A2A]"
                      : "bg-[#FCFCFC] border-[#D9D9D9]"
                  }`}
                >
                  <span
                    className={
                      selectedTerm
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }
                  >
                    {selectedTerm || "Select an Academic Term"}
                  </span>
                  <img
                    src={arr}
                    alt=""
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isTermOpen ? "rotate-180" : ""
                    } ${isDarkMode ? "brightness-200" : ""}`}
                  />
                </button>

                {isTermOpen && (
                  <div
                    className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                      isDarkMode
                        ? "bg-[#121212] border-[#2A2A2A] text-white"
                        : "bg-white border-[#E5E7EB] text-gray-900"
                    }`}
                  >
                    {terms.map((t) => (
                      <div
                        key={t}
                        onClick={() => handleSelectTerm(t)}
                        className={`px-4 py-3 text-[14px] cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#1E1E1E]"
                            : "hover:bg-[#EFF6FF]"
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {/* Social Skills */}
            <div>
              <h2
                className={`font-medium text-[15px] text-black mb-3 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#000000]"}`}
              >
                Social Skills Assessment
              </h2>
              <div className="flex flex-col gap-5">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <p
                        className={`font-normal text-[14px] ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#000000]"}`}
                      >
                        {skill.label}
                      </p>
                      <span className="text-[13px] font-semibold">
                        {progressBars[skill.id]}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
                      onMouseDown={() => handleMouseDown(skill.id)}
                      onMouseMove={(e) => handleMouseMove(e, skill.id)}
                      onClick={(e) => handleSliderClick(e, skill.id)}
                    >
                      <div
                        className="h-full bg-[#22C55E] rounded-full"
                        style={{ width: `${progressBars[skill.id]}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#22C55E] border-2 border-white rounded-full shadow-lg"
                        style={{
                          left: `calc(${progressBars[skill.id]}% - 8px)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <label
                className={`block text-[15px] font-medium text-[#303030] mb-2 ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-[#303030]"}`}
              >
                Add Comments
              </label>
              <input
                type="text"
                placeholder="Enter Comments...."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Notify Parents */}
            <div className="flex justify-between items-center pb-2">
              <h6
                className={`font-medium text-[15px] ${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"}`}
              >
                Notify Parents
              </h6>
              <img
                src={isOn ? off : on}
                alt="toggle"
                onClick={handleToggle}
                className="w-10 h-10 cursor-pointer"
              />
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-black border-t border-[#1F1F1F] px-5 py-3 z-40">
            <button
              onClick={() => {}}
              disabled={!isBehaviourFormValid}
              className={`w-full h-[50px] rounded-[12px] font-semibold text-[16px] transition-all ${
                isBehaviourFormValid
                  ? "bg-[#FF7B17] hover:bg-[#E06A10] text-white cursor-pointer shadow-md"
                  : isDarkMode
                    ? "bg-[#262626] text-[#737373] cursor-not-allowed"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* ================= GENERATE REPORT ================= */}
      {screen === "generate-report" && (
        <div className="pb-28">
          <div
            className="flex items-center gap-4 px-5 py-5 cursor-pointer"
            onClick={() => setScreen("report")}
          >
            <img src={back} alt="back" className={isDarkMode ? "invert" : ""} />
            <h2 className="text-[20px] font-medium">Generate Report</h2>
          </div>

          <div className="px-5 flex flex-col gap-5">
            {/* Student Name */}
            <div>
              <label
                className={`block text-[15px] font-medium mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
              >
                Student Name
              </label>
              <input
                type="text"
                placeholder="E.g. John Smith"
                value={studentNameAdd}
                onChange={(e) => setStudentNameAdd(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Academic Term */}
            <div>
              <label
                className={`block text-[15px] font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-[#303030]"
                }`}
              >
                Academic Term
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsTermOpen(!isTermOpen);
                    setIsReportTypeOpen(false);
                  }}
                  className={`w-full h-[48px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
                    isDarkMode
                      ? "bg-[#1E1E1E] border-[#2A2A2A]"
                      : "bg-[#FCFCFC] border-[#D9D9D9]"
                  }`}
                >
                  <span
                    className={
                      selectedTerm
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }
                  >
                    {selectedTerm || "Select an Academic Term"}
                  </span>
                  <img
                    src={arr}
                    alt=""
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isTermOpen ? "rotate-180" : ""
                    } ${isDarkMode ? "brightness-200" : ""}`}
                  />
                </button>

                {isTermOpen && (
                  <div
                    className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md ${
                      isDarkMode
                        ? "bg-[#121212] border-[#2A2A2A] text-white"
                        : "bg-white border-[#E5E7EB] text-gray-900"
                    }`}
                  >
                    {terms.map((t) => (
                      <div
                        key={t}
                        onClick={() => handleSelectTerm(t)}
                        className={`px-4 py-3 text-[14px] cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#1E1E1E]"
                            : "hover:bg-[#EFF6FF]"
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label
                className={`block text-[15px] font-medium mb-2 ${
                  isDarkMode ? "text-white" : "text-[#303030]"
                }`}
              >
                Report Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsReportTypeOpen(!isReportTypeOpen);
                    setIsTermOpen(false);
                  }}
                  className={`w-full h-[48px] px-3 border rounded-[8px] flex items-center justify-between transition-colors ${
                    isDarkMode
                      ? "bg-[#1E1E1E] border-[#2A2A2A]"
                      : "bg-[#FCFCFC] border-[#D9D9D9]"
                  }`}
                >
                  <span
                    className={
                      selectedReportType
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }
                  >
                    {selectedReportType || "Select a report type"}
                  </span>
                  <img
                    src={arr}
                    alt=""
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isReportTypeOpen ? "rotate-180" : ""
                    } ${isDarkMode ? "brightness-200" : ""}`}
                  />
                </button>

                {isReportTypeOpen && (
                  <div
                    className={`absolute z-10 mt-1 w-full border rounded-[8px] shadow-md max-h-[220px] overflow-y-auto ${
                      isDarkMode
                        ? "bg-[#121212] border-[#2A2A2A] text-white"
                        : "bg-white border-[#E5E7EB] text-gray-900"
                    }`}
                  >
                    {reportTypes.map((rt) => (
                      <div
                        key={rt}
                        onClick={() => handleSelectReportType(rt)}
                        className={`px-4 py-3 text-[14px] cursor-pointer ${
                          isDarkMode
                            ? "hover:bg-[#1E1E1E]"
                            : "hover:bg-[#EFF6FF]"
                        }`}
                      >
                        {rt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Preview card */}
            <div
              className={`border border-dashed rounded-[8px] h-[160px] flex flex-col items-center justify-center mt-2 transition-colors ${
                isDarkMode
                  ? "bg-[#1E1E1E] border-[#2A2A2A]"
                  : "bg-[#FCFCFC] border-black"
              }`}
            >
              <img
                src={ana}
                alt=""
                className={`mb-2 transition-all ${isDarkMode ? "brightness-200" : ""}`}
              />
              <div className="flex items-center gap-1 mb-1">
                <img
                  src={rr}
                  alt=""
                  className={`w-6 h-6 transition-all ${isDarkMode ? "brightness-200" : ""}`}
                />
                <p
                  className={`font-semibold text-[15px] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  View Report Review
                </p>
              </div>
              <p
                className={`text-[12px] text-center px-6 leading-tight ${
                  isDarkMode ? "text-[#737373]" : "text-[#9E9E9E]"
                }`}
              >
                Preview the generated attendance summary report for Shayla
                Jason.
              </p>
            </div>
          </div>

          <div
            className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-40 transition-colors duration-200 ${
              isDarkMode
                ? "bg-black border-[#1F1F1F]"
                : "bg-white border-[#E3E3E3]"
            }`}
          >
            <button
              disabled={!isBehaviourFormValid}
              className={`w-full h-[50px] rounded-[12px] font-semibold text-[16px] transition-all ${
                isBehaviourFormValid
                  ? "bg-[#FF7B17] hover:bg-[#E06A10] text-white cursor-pointer shadow-md"
                  : isDarkMode
                    ? "bg-[#262626] text-[#737373] cursor-not-allowed"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {mainScreens.includes(screen) && <BottomNavigation />}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Report;
