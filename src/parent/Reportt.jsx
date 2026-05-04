import React, { useState } from "react";
import aca from "../assets/academic report.svg";
import beh from "../assets/behviour.svg";
import aca2 from "../assets/aca 2 parent.svg";
import beh2 from "../assets/behaviour 2 parent.svg";
import arr from "../assets/arr down.svg";
import circ from "../assets/circle parent.svg";
import gr from "../assets/green parent.svg";
import BottomNavigation from "../components/BottomNavigate";
import tm from "../assets/tm parent.svg";
import cm from "../assets/cm parent.svg";
import rsp from "../assets/rsp parent.svg";
import rsb from "../assets/rsb parent.svg";
import dv from "../assets/divine parent.svg";
import cnc from "../assets/Grade cnc.svg"

const Reportt = () => {
  const [activeTab, setActiveTab] = useState("academic");
  const [selectedTermYear, setSelectedTermYear] = useState(
    "Term 3 2024/2025 Academic Year",
  );
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
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
  ];

  const behaviorData = [
    { label: "Teamwork", score: "92%", img: tm },
    { label: "Communication", score: "88%", img: cm },
    { label: "Respect", score: "100%", img: rsp },
    { label: "Responsibility", score: "95%", img: rsb },
  ];

  return (
    <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
      <div className="px-5 pt-6">
        {/* Page Title */}
        <h1 className="font-bold text-[20px] text-black mb-5">Report</h1>

        {/* Tab Switcher */}
        <div className="flex w-full border border-[#D9D9D9] rounded-[9px] py-[7px] px-[8px] gap-2 h-[62px] items-center">
          {/* Academic Tab */}
          <button
            onClick={() => setActiveTab("academic")}
            className={`flex-1 flex items-center justify-center gap-2 h-[46px] rounded-[7px] cursor-pointer transition-all ${
              activeTab === "academic" ? "bg-[#F3F4F6]" : ""
            }`}
          >
            <img
              src={activeTab === "academic" ? aca2 : aca}
              alt=""
              className="w-[18px] h-[18px] flex-shrink-0"
            />
            <p
              className={`font-medium text-[16px] ${activeTab === "academic" ? "text-[#F97316]" : "text-black"}`}
            >
              Academic
            </p>
          </button>

          {/* Behavior Tab */}
          <button
            onClick={() => setActiveTab("behavior")}
            className={`flex-1 flex items-center justify-center gap-2 h-[46px] rounded-[7px] cursor-pointer transition-all ${
              activeTab === "behavior" ? "bg-[#F3F4F6]" : ""
            }`}
          >
            <img
              src={activeTab === "behavior" ? beh2 : beh}
              alt=""
              className="w-[18px] h-[18px] flex-shrink-0"
            />
            <p
              className={`font-medium text-[16px] ${activeTab === "behavior" ? "text-[#F97316]" : "text-black"}`}
            >
              Behavior
            </p>
          </button>
        </div>

        {/* Term Dropdown */}
        <div className="relative mt-5">
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

        {/* ── ACADEMIC TAB ─────────────────────────────────────── */}
        {activeTab === "academic" && (
          <div className="mt-5">
            {/* Attendance Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="font-medium text-[18px] text-black">Attendance</p>
              <p className="font-normal text-[14px] text-[#FF7B17] cursor-pointer">
                View More
              </p>
            </div>

            {/* Attendance Card */}
            <div className="w-full rounded-[9px] py-4 px-3 bg-[#F3F4F6]">
              <img src={circ} alt="" className="mx-auto block max-w-full" />
              {/* Stats Row — equal thirds */}
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="rounded-[9px] py-3 px-2 bg-[#F0FDF4] flex flex-col items-center text-center">
                  <p className="font-normal text-[14px] text-[#10B981]">43</p>
                  <p className="font-semibold text-[14px] text-[#10B981]">
                    Present
                  </p>
                </div>
                <div className="rounded-[9px] py-3 px-2 bg-[#FEF2F2] flex flex-col items-center text-center">
                  <p className="font-normal text-[14px] text-[#DC2626]">0</p>
                  <p className="font-semibold text-[14px] text-[#DC2626]">
                    Absent
                  </p>
                </div>
                <div className="rounded-[9px] py-3 px-2 bg-[#FEFCE8] flex flex-col items-center text-center">
                  <p className="font-normal text-[14px] text-[#E7C905]">3</p>
                  <p className="font-semibold text-[14px] text-[#E7C905]">
                    Late
                  </p>
                </div>
              </div>
            </div>

            {/* Grade Performance Header */}
            <div className="flex items-center justify-between mt-6 mb-4">
              <p className="font-medium text-[18px] text-black">
                Grade Performance
              </p>
              <p className="font-normal text-[14px] text-[#FF7B17] cursor-pointer">
                View More
              </p>
            </div>

            {/* Subject Cards */}
            <div className="flex flex-col gap-3">
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
        )}

        {/* ── BEHAVIOR TAB ─────────────────────────────────────── */}
        {activeTab === "behavior" && (
          <div className="mt-5">
            <h2 className="font-medium text-[18px] text-black mb-4">
              Social Skills Assessment
            </h2>

            {/* Behavior Cards */}
            <div className="flex flex-col gap-3">
              {behaviorData.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#D9D9D9] rounded-[9px] w-full py-3 px-4"
                >
                  <p className="font-bold text-[14px] text-black mb-1">
                    {item.label}
                  </p>
                  <img src={item.img} alt="" className="w-full mt-0.5" />
                  <p className="text-[14px] font-bold text-black text-right mt-1">
                    {item.score}
                  </p>
                </div>
              ))}
            </div>

            {/* Behavioral Remarks */}
            <div className="mt-6">
              <h2 className="text-[16px] font-medium text-black mb-3">
                Behavioral Remarks
              </h2>
              <div className="flex items-start gap-3">
                <img
                  src={dv}
                  alt=""
                  className="w-[37px] h-[37px] rounded-full flex-shrink-0 mt-1"
                />
                <div className="flex flex-col min-w-0">
                  <p className="text-[16px] font-bold text-black">
                    Mr. Reynold.
                  </p>
                  <p className="text-[13px] font-normal text-black mt-0.5 leading-5">
                    Divine is always attentive in class and is a bright kid
                  </p>
                  <p className="text-[13px] font-normal text-black mt-1">
                    June 18th
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5">
          <div className="bg-white w-full max-w-[370px] rounded-[16px] p-6 relative">
            <button
              onClick={() => setSelectedSubject(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 font-bold text-sm"
            >
              <img src={cnc} alt="" />
            </button>
            <h2 className="font-bold text-[20px] text-black mb-5 mt-4">
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
};

export default Reportt;
