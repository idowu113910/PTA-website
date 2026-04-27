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

const Reportt = () => {
  const [activeTab, setActiveTab] = useState("academic");

  const terms = ["Term 1 ", "Term 2", "Term 3"];
  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
  ];

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
    { label: "Communication", score: "88%", img: cm }, // replace img with correct asset
    { label: "Respect", score: "100%", img: rsp }, // replace img with correct asset
    { label: "Responsibility", score: "95%", img: rsb }, // replace img with correct asset
  ];

  return (
    <>
      <div className="h-[1070px]">
        <div>
          <div className="p-6">
            <h1 className="font-bold text-[20px] text-black">Report</h1>

            <div className="flex w-[336px] border-[1px] rounded-[9px] border-[#D9D9D9] py-[7px] px-[10px] gap-[14px] h-[66px] justify-around mt-6">
              {/* Academic Tab */}
              <div
                onClick={() => setActiveTab("academic")}
                className={`flex gap-[8px] my-auto px-[12px] py-[8px] w-[151px] h-[52px] -mt-0.5 rounded-[7px] cursor-pointer transition-all
          ${activeTab === "academic" ? "bg-[#F3F4F6]" : ""}`}
              >
                <div className="mt-1 flex gap-[8px]">
                  <img
                    src={activeTab === "academic" ? aca2 : aca}
                    alt=""
                    className="w-[18px] h-[18px] mt-1 ml-1"
                  />
                  <p
                    className={`font-medium text-[18px] ${activeTab === "academic" ? "text-[#F97316]" : "text-black"}`}
                  >
                    Academic
                  </p>
                </div>
              </div>

              {/* Behavior Tab */}
              <div
                onClick={() => setActiveTab("behavior")}
                className={`flex gap-[8px] my-auto px-[12px] py-[8px] w-[151px] h-[52px] -mt-0.5 rounded-[7px] cursor-pointer transition-all
          ${activeTab === "behavior" ? "bg-[#F3F4F6]" : ""}`}
              >
                <img
                  src={activeTab === "behavior" ? beh2 : beh}
                  alt=""
                  className="w-[18px] h-[18px] mt-2"
                />
                <p
                  className={`font-medium text-[18px] mt-1 ${activeTab === "behavior" ? "text-[#F97316]" : "text-black"}`}
                >
                  Behavior
                </p>
              </div>
            </div>

            <div className="relative ml-1.5 -mt-1.5">
              <div className="w-[336px] h-[42px] rounded-[9px] p-[10px] bg-[#F3F4F6] mt-8 -ml-1">
                <div className="flex gap-[47px]">
                  <p className="font-medium text-[14px] text-black">
                    {selectedTermYear}
                  </p>
                  <img
                    src={arr}
                    alt=""
                    className={`ml-9 cursor-pointer transition-transform duration-200 ${isTermDropdownOpen ? "rotate-180" : ""}`}
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

            {activeTab === "academic" && (
              <div>
                <div className="flex w-[335px] justify-between mt-5">
                  <p className="font-medium text-[18px] text-black">
                    Attendance
                  </p>
                  <p className="font-normal text-[14px] text-[#FF7B17] mt-1">
                    View More
                  </p>
                </div>

                <div className="w-[335px] h-[362px] rounded-[9px] py-[14px] px-[9px] bg-[#F3F4F6] mt-5">
                  <img
                    src={circ}
                    alt=""
                    className="flex items-center justify-center mx-auto"
                  />
                  <div className="flex w-[317px] gap-[13px] mt-3">
                    <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#F0FDF4] flex flex-col items-center text-center">
                      <p className="font-normal text-[14px] text-[#10B981]">
                        43
                      </p>
                      <p className="font-semibold text-[16px] text-[#10B981]">
                        Present
                      </p>
                    </div>
                    <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#FEF2F2] flex flex-col items-center text-center">
                      <p className="font-normal text-[14px] text-[#DC2626]">
                        0
                      </p>
                      <p className="font-semibold text-[16px] text-[#DC2626]">
                        Absent
                      </p>
                    </div>
                    <div className="w-[97px] h-[75px] rounded-[9px] py-[14px] px-[13px] bg-[#FEFCE8] flex flex-col items-center text-center">
                      <p className="font-normal text-[14px] text-[#E7C905]">
                        3
                      </p>
                      <p className="font-semibold text-[16px] text-[#E7C905]">
                        Late
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-[335px] justify-between mt-5 mb-6">
                  <p className="font-medium text-[18px] text-black">
                    Grade Performance
                  </p>
                  <p className="font-normal text-[14px] text-[#FF7B17] mt-1">
                    View More
                  </p>
                </div>

                {subjectData.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSubject(item)}
                    className="border-[1px] rounded-[9px] border-[#D9D9D9] py-[10px] px-[9px] w-[335px] h-[75px] mt-3 cursor-pointer"
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

            {activeTab === "behavior" && (
              <div>
                {/* behavior content */}

                <h2 className="font-medium text-[18px] text-black mt-4 ml-1">
                  Social Skills Assessment
                </h2>

                {behaviorData.map((item, index) => (
                  <div
                    key={index}
                    className="border-[1px] rounded-[9px] w-[335px] h-[75px] py-[10px] px-[9px] border-[#D9D9D9] mt-4"
                  >
                    <div>
                      <p className="font-bold text-[14px] text-black">
                        {item.label}
                      </p>
                      <img src={item.img} alt="" className="mt-0.5" />
                    </div>
                    <p className="text-[14px] font-bold text-black justify-end flex">
                      {item.score}
                    </p>
                  </div>
                ))}

                <div>
                  <h2 className="mt-6 text-[16.68px] font-medium">
                    Behavioral Remarks
                  </h2>

                  <div className="flex">
                    <img src={dv} alt="" className="w-[37.07px] h-[37.07px] mt-3.5" />

                    <div className="flex flex-col ml-2 mt-3">
                      <p className="text-[16.68px] font-bold text-black">
                        Mr. Reynold.
                      </p>
                      <p className="text-[12.97px] font-normal text-black ">
                        Divine is always attentive in class <br /> and is a
                        bright kid{" "}
                      </p>

                      <p className="text-[12.97px] font-normal text-black">June 18th</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Bottom Navigation nested directly in this page */}
      <BottomNavigation />
    </>
  );
};

export default Reportt;
