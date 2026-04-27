import React, { useEffect, useState } from "react";
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
  const mainScreens = ["home", "report", "message", "calendar", "profile"];
  const [screen, setScreen] = useState("home"); // home | post-homework | mark-attendance | add-grade
  const [activeTab, setActiveTab] = useState("home");
  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);

  const terms = ["Term 1 ", "Term 2", "Term 3"];
  const { fullName, grade, room, teacherName } = useUser();

  // Term & Academic Year States
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedTermYear, setSelectedTermYear] = useState(
    "Term 3 2024/2025 Academic Year",
  );
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [academicSession, setAcademicSession] = useState("");
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setIsTermOpen(false);
  };

  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveTab(path);
  }, [location]);

  const attendanceData = [
    {
      icon: crr,
      date: "Friday, June 29",
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "1 Hour late",
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
      status: "Present",
      time: "8:30AM - 3:15 PM",
      duration: "Full day",
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

  return (
    <>
      {screen === "home" && (
        <div className="p-6 h-[1080px]">
          <div className="flex justify-between">
            <p className="font-bold text-[16px] text-black">
              Welcome back, {fullName || "Your Name"} <br />
              <span className="text-[14px] font-normal">
                Here's how your child is doing today
              </span>
              .
            </p>

            <FaRegBell className="mt-5" />
          </div>

          <div className="w-[336px] h-[280px] rounded-[9px] py-[12px] px-[13px] gap-[7px] bg-[#FF7B17] mt-8">
            <div className="flex justify-between mt-1">
              <img src={div} alt="" />
              <img src={grad} alt="" />
            </div>
            <div className="mt-1">
              <p className="text-white font-black text-[26px]">
                {fullName || "Your Name"}
              </p>
              <p className="font-normal text-[14px] text-white mt-1">
                {grade && room && teacherName
                  ? `Grade ${grade}. Room ${room}. ${teacherName}`
                  : "Grade. Room. Teacher"}
              </p>
            </div>

            <div className="flex gap-[113px]">
              <div className="mt-4">
                <p className="font-normal text-[14px] text-white">
                  Current Position
                </p>
                <p className="text-white font-medium text-[16px]">1/10</p>
                <p className="font-normal text-[14px] text-white">Behavior</p>
                <p className="text-[16px] font-medium text-white">Excellent</p>
              </div>

              <div className="mt-4.5">
                <p className="text-[14px] font-normal text-white">Attendance</p>
                <p className="font-medium text-[16px] text-white">98%</p>
                <p className="text-[14px] font-normal text-white">Homework</p>
                <p className="font-medium text-[16px] text-white">3 Due</p>
              </div>
            </div>
          </div>

          <h5 className="text-[20px] text-black font-medium mt-6">
            Quick Access
          </h5>

          <div className="grid grid-cols-2 gap-4 px-6 mt-5 w-[336px] -ml-5.5">
            <button
              onClick={() => setScreen("grade")}
              className="border border-[#F97316] rounded-[8.54px] p-3 text-left w-[159px] h-[95px]"
            >
              <img src={gd} alt="" className="w-[30px] h-[30px]" />
              <p className="font-bold text-[13px] mt-0.5">Grades</p>
              <p className="font-normal text-[12px] text-black mt-0.5">
                View Current Grades
              </p>
            </button>

            <button
              onClick={() => setScreen("attendance")}
              className="border rounded-[8.54px] border-[#0F766E] p-3 text-left w-[159px] h-[95px] ml-6.5"
            >
              <img src={att} alt="" className="w-[30px] h-[30px]" />
              <p className="font-bold text-[13px] mt-0.5">Attendance</p>
              <p className="font-normal text-[12px] text-black mt-0.5">
                98% this month
              </p>
            </button>

            <button className="border rounded-[8.54px] border-[#3B82F6] p-3 text-left w-[159px] h-[95px]">
              <img src={hm} alt="" className="w-[30px] h-[30px]" />
              <div className="flex flex-col mt-1.5">
                <p className="font-bold text-[13px] -mt-1">Behavior</p>
                <p className="font-medium text-[12px] text-[#279D4F] mt-0.5">
                  Outstanding
                </p>
              </div>
            </button>

            <button className="border border-[#A855F7] rounded-[8.54px] p-3 text-left w-[159px] h-[95px] ml-6.5">
              <img src={st} alt="" className="w-[30px] h-[30px]" />
              <p className="font-bold text-[13px] mt-1">Events</p>
              <p className="font-normal text-[12px] text-black">6 Upcoming</p>
            </button>
          </div>

          {/* Upcoming Homework */}
          <h5 className="text-[20px] text-black font-medium mt-6 -ml-0">
            Upcoming Homework
          </h5>

          <div className="flex flex-col gap-3 mt-4 -ml-6">
            {[
              {
                subject: "Math",
                title: "Algebra Quiz",
                due: "Due: Fri, June 27th",
              },
              {
                subject: "English",
                title: "Vocabulary",
                due: "Due: Fri, June 27th",
              },
              {
                subject: "Verbal",
                title: "Renaming Quiz",
                due: "Due: Fri, June 27th",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#F8F8F8] border-[1px] border-[#0000001F] rounded-[10px] px-4 py-2 shadow-[0_1px_4px_0_rgba(0,0,0,0.08)] w-[336px] ml-6 mb-1"
              >
                {/* Bookmark icon + text */}
                <div className="flex items-center gap-3">
                  <CgBookmark className="text-[#444] w-[18px] h-[18px] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] text-[#555] font-normal">
                      {item.subject}
                    </p>
                    <p className="text-[15px] font-bold text-[#1a1a1a]">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Due date */}
                <p className="text-[13px] font-medium text-[#E53935] flex-shrink-0">
                  {item.due}
                </p>
              </div>
            ))}
          </div>

          {mainScreens.includes(screen) && <BottomNavigation />}
        </div>
      )}

      {screen === "grade" && (
        <div className="p-6">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" />
            <h2 className="text-[20px] font-medium"> Grade Perfomance </h2>
          </div>

          {subjectData.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedSubject(item)}
              className="border-[1px] rounded-[9px] border-[#D9D9D9] py-[10px] px-[9px] w-[335px] h-[75px] mt-8 cursor-pointer"
            >
              <h2 className="font-medium text-[14px] text-black">
                {item.subject}
              </h2>
              <img src={gr} alt="" className="mt-2" />
              <p className="flex justify-end font-bold text-black text-[14px]">
                {item.grade}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedSubject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 ">
          <div className="bg-white w-[335px] rounded-[16px] p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedSubject(null)}
              className="absolute top-4 right-4 w-[28px] h-[28px] rounded-full border border-gray-300 flex items-center justify-center text-red-500 font-bold text-[14px]"
            >
              <img src={canc} alt="" />
            </button>

            {/* Title */}
            <h2 className="font-bold text-[20px] text-black mb-6 mt-8">
              {selectedSubject.fullName}
            </h2>

            {/* Scores */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-[16px] font-medium text-black">Test=</p>
                <p className="font-black text-[16px] text-black">
                  {selectedSubject.test}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[16px] font-medium text-black">
                  Final Exam=
                </p>
                <p className="font-black text-[16px] text-black">
                  {selectedSubject.finalExam}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[16px] font-medium text-black">Total=</p>
                <p className="font-black text-[16px] text-black">
                  {selectedSubject.total}
                </p>
              </div>
            </div>

            {/* Grade */}
            <p className="text-right font-medium text-[18px] text-[#22C55E] mt-4">
              {selectedSubject.grade} ({selectedSubject.percent})
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mt-5 mb-4" />

            {/* Grade System */}
            <h3 className="font-bold text-[16px] text-black mb-2">
              Grade System
            </h3>
            <p className="text-[14px] text-[#535151] leading-5">
              (A+)= 90-100, (A)= 85-89, (B+)= 80-85, (B)= 70-79, (C+)= 60-69,
              (C-)= 50-59, (D)= 1-49
            </p>
          </div>
        </div>
      )}

      {screen === "attendance" && (
        <div className="p-6">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" />
            <h2 className="text-[20px] font-medium">Attendance</h2>
          </div>

          <div className="relative">
            <div className="w-[336px] h-[42px] rounded-[9px] p-[10px] bg-[#F3F4F6] mt-8 -ml-1">
              <div className="flex gap-[47px]">
                <p className="font-medium text-[14px] text-black">
                  {selectedTermYear}
                </p>
                <img
                  src={arr}
                  alt=""
                  className={`ml-9 cursor-pointer transition-transform duration-200 ${
                    isTermDropdownOpen ? "rotate-180" : ""
                  }`}
                  onClick={() => setIsTermDropdownOpen(!isTermDropdownOpen)}
                />
              </div>
            </div>

            {isTermDropdownOpen && (
              <div className="absolute z-10 mt-2 w-[336px] bg-white border border-[#E5E7EB] rounded-[8px] shadow-md -ml-1">
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

          <div className="flex w-[336px] gap-[21px] mt-6">
            <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#F0FDF4] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#10B981]">43</p>
              <p className="font-semibold text-[16px] text-[#10B981]">
                Present
              </p>
            </div>

            <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#FEF2F2] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#DC2626]">0</p>
              <p className="font-semibold text-[16px] text-[#DC2626]">Absent</p>
            </div>

            <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#FEFCE8] flex flex-col items-center text-center">
              <p className="font-normal text-[14px] text-[#E7C905]">3</p>
              <p className="font-semibold text-[16px] text-[#E7C905]">Late</p>
            </div>
          </div>

          <div className="flex gap-[117px] justify-between w-[335.73px] mt-6">
            <p className="font-bold text-[16px] text-black">Attendance Log</p>

            <div className="flex gap-[12px] mt-1.5">
              <p className="font-medium text-[12px] text-black">June 2025 </p>
              <img src={ar} alt="" className="w-[7.05px] h-[12.73px] mt-0.5" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            {attendanceData.map((item, index) => (
              <div
                key={index}
                className="flex w-[335.73px] h-[53px] rounded-[9px] border-[1px] border-[#D9D9D9] py-[5px] px-[10px] gap-[13px] mt-5"
              >
                <img
                  src={item.icon}
                  alt=""
                  className="w-[30px] h-[30px] mt-1.5 shrink-0"
                />

                <div className="flex flex-col justify-center min-w-[110px]">
                  <p className="font-medium text-[12px] text-black whitespace-nowrap">
                    {item.date}
                  </p>
                  <p className="font-medium text-[12px] text-black mt-1">
                    {item.status}
                  </p>
                </div>

                <div className="flex flex-col justify-center ml-auto text-right">
                  <p className="font-medium text-[12px] text-black whitespace-nowrap">
                    {item.time}
                  </p>
                  <p className="font-medium text-[12px] text-black mt-1">
                    {item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
