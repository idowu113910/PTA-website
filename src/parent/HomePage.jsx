import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import div from "../assets/parent divine.svg";
import grad from "../assets/grad.svg";
import hm from "../assets/hmm.svg";
import att from "../assets/parent att.svg";
import gd from "../assets/parent grade.svg";
import st from "../assets/parent event.svg";
import BottomNavigation from "../components/BottomNavigate";
import back from "../assets/back2.svg";
import arr from "../assets/arr down.svg";
import ar from "../assets/arr parent down.svg";
import crr from "../assets/correct parent.svg";
import lt from "../assets/late parent.svg";
import gr from "../assets/green parent.svg";
import canc from "../assets/canc parent.svg";
import { CgBookmark } from "react-icons/cg";
import { useUser } from "../teacher/UserContext";

const HomePage = () => {
  const [screen, setScreen] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTermYear, setSelectedTermYear] = useState(
    "Term 3 2024/2025 Academic Year",
  );
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);

  const { fullName, grade, room, teacherName } = useUser();

  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
  ];

  const attendanceData = [
    {
      icon: crr,
      date: "Friday, June 29",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
    },
    {
      icon: lt,
      date: "Thursday, June 28",
      status: "Late",
      time: "8:30AM - 3:15 PM",
      duration: "1 Hour late",
    },
    {
      icon: crr,
      date: "Wednesday, June 27",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
    },
    {
      icon: crr,
      date: "Tuesday, June 13",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
    },
    {
      icon: crr,
      date: "Monday, June 12",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
    },
    {
      icon: crr,
      date: "Friday, June 9",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
    },
    {
      icon: lt,
      date: "Thursday, June 8",
      status: "Late",
      time: "8:30AM - 3:15 PM",
      duration: "1 Hour late",
    },
  ];

  const subjectData = [
    {
      subject: "Math",
      fullName: "Mathematics",
      grade: "A+",
      test: "30/30",
      finalExam: "69/70",
      total: "99/100",
      percent: "99%",
    },
    {
      subject: "English",
      fullName: "English Language",
      grade: "A",
      test: "28/30",
      finalExam: "60/70",
      total: "88/100",
      percent: "88%",
    },
    {
      subject: "Art",
      fullName: "Fine Art",
      grade: "B+",
      test: "25/30",
      finalExam: "57/70",
      total: "82/100",
      percent: "82%",
    },
    {
      subject: "Basic Science",
      fullName: "Basic Science",
      grade: "A-",
      test: "27/30",
      finalExam: "59/70",
      total: "86/100",
      percent: "86%",
    },
    {
      subject: "Quantitative Reasoning",
      fullName: "Quantitative Reasoning",
      grade: "B",
      test: "22/30",
      finalExam: "52/70",
      total: "74/100",
      percent: "74%",
    },
    {
      subject: "Social Studies",
      fullName: "Social Studies",
      grade: "A+",
      test: "30/30",
      finalExam: "68/70",
      total: "98/100",
      percent: "98%",
    },
    {
      subject: "Religious Studies",
      fullName: "Religious Studies",
      grade: "B+",
      test: "24/30",
      finalExam: "58/70",
      total: "82/100",
      percent: "82%",
    },
    {
      subject: "Physical and Health Education",
      fullName: "Physical and Health Education",
      grade: "A",
      test: "26/30",
      finalExam: "62/70",
      total: "88/100",
      percent: "88%",
    },
  ];

  const quickAccess = [
    {
      label: "Grades",
      sub: "View Current Grades",
      icon: gd,
      border: "border-[#F97316]",
      screen: "grade",
    },
    {
      label: "Attendance",
      sub: "98% this month",
      icon: att,
      border: "border-[#0F766E]",
      screen: "attendance",
    },
    {
      label: "Behavior",
      sub: "Outstanding",
      icon: hm,
      border: "border-[#3B82F6]",
      subColor: "text-[#279D4F]",
      screen: null,
    },
    {
      label: "Events",
      sub: "6 Upcoming",
      icon: st,
      border: "border-[#A855F7]",
      screen: null,
    },
  ];

  const homeworkItems = [
    { subject: "Math", title: "Algebra Quiz", due: "Due: Fri, June 27th" },
    { subject: "English", title: "Vocabulary", due: "Due: Fri, June 27th" },
    { subject: "Verbal", title: "Renaming Quiz", due: "Due: Fri, June 27th" },
  ];

  // ── HOME ──────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white flex flex-col pb-24">
        <div className="px-5 pt-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-bold text-[16px] text-black">
                Welcome back, {fullName || "Your Name"}
              </p>
              <p className="text-[14px] font-normal text-black mt-0.5">
                Here's how your child is doing today.
              </p>
            </div>
            <FaRegBell className="mt-1 text-[22px] flex-shrink-0" />
          </div>

          {/* Student Card */}
          <div className="w-full rounded-[9px] py-4 px-4 bg-[#FF7B17]">
            <div className="flex justify-between items-start">
              <img src={div} alt="" className="w-10 h-10" />
              <img src={grad} alt="" className="w-10 h-10" />
            </div>
            <p className="text-white font-black text-[24px] mt-2">
              {fullName || "Your Name"}
            </p>
            <p className="font-normal text-[13px] text-white mt-1">
              {grade && room && teacherName
                ? `Grade ${grade}. Room ${room}. ${teacherName}`
                : "Grade. Room. Teacher"}
            </p>
            <div className="flex justify-between mt-4">
              <div className="flex flex-col gap-1">
                <p className="font-normal text-[13px] text-white">
                  Current Position
                </p>
                <p className="text-white font-medium text-[15px]">1/10</p>
                <p className="font-normal text-[13px] text-white mt-1">
                  Behavior
                </p>
                <p className="text-[15px] font-medium text-white">Excellent</p>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <p className="text-[13px] font-normal text-white">Attendance</p>
                <p className="font-medium text-[15px] text-white">98%</p>
                <p className="text-[13px] font-normal text-white mt-1">
                  Homework
                </p>
                <p className="font-medium text-[15px] text-white">3 Due</p>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <h5 className="text-[18px] text-black font-medium mt-6 mb-4">
            Quick Access
          </h5>
          <div className="grid grid-cols-2 gap-3">
            {quickAccess.map((item, i) => (
              <button
                key={i}
                onClick={() => item.screen && setScreen(item.screen)}
                className={`border ${item.border} rounded-[8px] p-3 text-left h-[95px] w-full`}
              >
                <img src={item.icon} alt="" className="w-[28px] h-[28px]" />
                <p className="font-bold text-[13px] mt-1">{item.label}</p>
                <p
                  className={`font-normal text-[12px] mt-0.5 ${item.subColor || "text-black"}`}
                >
                  {item.sub}
                </p>
              </button>
            ))}
          </div>

          {/* Upcoming Homework */}
          <h5 className="text-[18px] text-black font-medium mt-6 mb-3">
            Upcoming Homework
          </h5>
          <div className="flex flex-col gap-3">
            {homeworkItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-[#F8F8F8] border border-[#0000001F] rounded-[10px] px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CgBookmark className="text-[#444] w-[18px] h-[18px] flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13px] text-[#555] font-normal truncate">
                      {item.subject}
                    </p>
                    <p className="text-[15px] font-bold text-[#1a1a1a] truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
                <p className="text-[12px] font-medium text-[#E53935] flex-shrink-0 ml-2">
                  {item.due}
                </p>
              </div>
            ))}
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // ── GRADE ─────────────────────────────────────────────────────────
  if (screen === "grade") {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
        <div className="px-5 pt-6">
          <div
            className="flex items-center gap-3 cursor-pointer mb-4"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" className="w-6 h-6 flex-shrink-0" />
            <h2 className="text-[20px] font-medium">Grade Performance</h2>
          </div>

          <div className="flex flex-col gap-4">
            {subjectData.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedSubject(item)}
                className="border border-[#D9D9D9] rounded-[9px] py-3 px-4 w-full cursor-pointer"
              >
                <h2 className="font-medium text-[14px] text-black">
                  {item.subject}
                </h2>
                <img src={gr} alt="" className="mt-2 w-full" />
                <p className="flex justify-end font-bold text-black text-[14px] mt-1">
                  {item.grade}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Detail Modal */}
        {selectedSubject && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5">
            <div className="bg-white w-full max-w-[370px] rounded-[16px] p-6 relative">
              <button
                onClick={() => setSelectedSubject(null)}
                className="absolute top-4 right-4 w-[28px] h-[28px] rounded-full border border-gray-300 flex items-center justify-center"
              >
                <img src={canc} alt="close" className="w-4 h-4" />
              </button>
              <h2 className="font-bold text-[20px] text-black mb-5 mt-6">
                {selectedSubject.fullName}
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Test", value: selectedSubject.test },
                  { label: "Final Exam", value: selectedSubject.finalExam },
                  { label: "Total", value: selectedSubject.total },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <p className="text-[16px] font-medium text-black">
                      {label} =
                    </p>
                    <p className="font-black text-[16px] text-black">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-right font-medium text-[18px] text-[#22C55E] mt-4">
                {selectedSubject.grade} ({selectedSubject.percent})
              </p>
              <div className="border-t border-gray-200 mt-5 mb-4" />
              <h3 className="font-bold text-[16px] text-black mb-2">
                Grade System
              </h3>
              <p className="text-[13px] text-[#535151] leading-5">
                (A+)= 90-100, (A)= 85-89, (B+)= 80-85, (B)= 70-79, (C+)= 60-69,
                (C-)= 50-59, (D)= 1-49
              </p>
            </div>
          </div>
        )}

        <BottomNavigation />
      </div>
    );
  }

  // ── ATTENDANCE ────────────────────────────────────────────────────
  if (screen === "attendance") {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
        <div className="px-5 pt-6">
          <div
            className="flex items-center gap-3 cursor-pointer mb-6"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" className="w-6 h-6 flex-shrink-0" />
            <h2 className="text-[20px] font-medium">Attendance</h2>
          </div>

          {/* Term Dropdown */}
          <div className="relative mb-5">
            <div
              className="w-full h-[42px] rounded-[9px] px-4 bg-[#F3F4F6] flex items-center justify-between cursor-pointer"
              onClick={() => setIsTermDropdownOpen(!isTermDropdownOpen)}
            >
              <p className="font-medium text-[13px] text-black truncate flex-1 pr-2">
                {selectedTermYear}
              </p>
              <img
                src={arr}
                alt=""
                className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                  isTermDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isTermDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                {termYears.map((term) => (
                  <div
                    key={term}
                    onClick={() => {
                      setSelectedTermYear(term);
                      setIsTermDropdownOpen(false);
                    }}
                    className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                  >
                    {term}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats Row — equal thirds */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-[9px] py-3 px-2 bg-[#F0FDF4] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#10B981]">43</p>
              <p className="font-semibold text-[14px] text-[#10B981]">
                Present
              </p>
            </div>
            <div className="rounded-[9px] py-3 px-2 bg-[#FEF2F2] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#DC2626]">0</p>
              <p className="font-semibold text-[14px] text-[#DC2626]">Absent</p>
            </div>
            <div className="rounded-[9px] py-3 px-2 bg-[#FEFCE8] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#E7C905]">3</p>
              <p className="font-semibold text-[14px] text-[#E7C905]">Late</p>
            </div>
          </div>

          {/* Attendance Log Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-[16px] text-black">Attendance Log</p>
            <div className="flex items-center gap-2">
              <p className="font-medium text-[12px] text-black">June 2025</p>
              <img src={ar} alt="" className="w-[7px] h-[13px]" />
            </div>
          </div>

          {/* Attendance Log Items */}
          <div className="flex flex-col gap-3">
            {attendanceData.map((item, index) => (
              <div
                key={index}
                className="flex w-full rounded-[9px] border border-[#D9D9D9] py-2 px-3 gap-3 items-center"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-[30px] h-[30px] flex-shrink-0"
                />
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <p className="font-medium text-[12px] text-black truncate">
                    {item.date}
                  </p>
                  <p className="font-medium text-[12px] text-black mt-0.5">
                    {item.status}
                  </p>
                </div>
                <div className="flex flex-col justify-center text-right flex-shrink-0">
                  <p className="font-medium text-[12px] text-black whitespace-nowrap">
                    {item.time}
                  </p>
                  <p className="font-medium text-[12px] text-black mt-0.5">
                    {item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return null;
};

export default HomePage;
