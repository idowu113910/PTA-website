import React, { useRef, useState } from "react";
import back from "../assets/back2.svg";
import arr from "../assets/arr drop down.svg";
import cal from "../assets/calendar.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import on from "../assets/switch.svg";
import off from "../assets/off.svg";
import HomePaget from "../teacher/HomePaget";
import { useNavigate } from "react-router-dom";

registerLocale("en-GB", enGB); // format DD/MM/YYYY

const PostHomeWork = ({ onBack }) => {
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPostHomework, setShowPostHomework] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isOn, setIsOn] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const dateRef = useRef(null);

  const navigate = useNavigate();

  const handleBack = () => {
    // Always go to home page without reloading
    navigate("/home", { replace: true });
  };

  const handleCalendarClick = () => {
    // Open the hidden date input
    dateRef.current.showPicker?.(); // Modern browsers
  };

  const handleToggle = () => {
    setIsOn(!isOn);
  };

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

  // Generic handler
  const handleSelect = (type, value) => {
    if (type === "grade") {
      setSelectedGrade(value);
      setIsGradeOpen(false);
    } else if (type === "subject") {
      setSelectedSubject(value);
      setIsSubjectOpen(false);
    }
  };

  return (
    <div className="h-[780px]">
      <div
        className="flex items-center gap-4 p-6 cursor-pointer"
        onClick={onBack}
      >
        <img src={back} alt="back" />
        <h2 className="text-[20px] font-medium">Post HomeWork</h2>
      </div>

      {/* Grade Dropdown */}
      <div className="p-6">
        <label className="block text-[16px] font-medium text-[#303030] mb-2">
          Select Class
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsGradeOpen(!isGradeOpen);
              setIsSubjectOpen(false); // Close other dropdown
            }}
            className="w-[336px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
          >
            <span
              className={`${
                selectedGrade
                  ? "text-[14px] text-[#303030] font-normal"
                  : "text-[14px] text-gray-400"
              }`}
            >
              {selectedGrade || "Select grade"}
            </span>
            <img
              src={arr}
              alt="dropdown"
              className={`transition-transform duration-200 ${
                isGradeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isGradeOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
              {grades.map((grade) => (
                <div
                  key={grade}
                  onClick={() => handleSelect("grade", grade)}
                  className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                >
                  {grade}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Subject Dropdown */}
      <div className="p-6 -mt-8">
        <label className="block text-[16px] font-medium text-[#303030] mb-2">
          Subject
        </label>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsSubjectOpen(!isSubjectOpen);
              setIsGradeOpen(false); // Close other dropdown
            }}
            className="w-[336px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
          >
            <span
              className={`${
                selectedSubject
                  ? "text-[14px] text-[#303030] font-normal"
                  : "text-[14px] text-gray-400"
              }`}
            >
              {selectedSubject || "Select subject"}
            </span>
            <img
              src={arr}
              alt="dropdown"
              className={`transition-transform duration-200 ${
                isSubjectOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSubjectOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  onClick={() => handleSelect("subject", subject)}
                  className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                >
                  {subject}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-6 -mt-8 ml-1">
        <h5 className="font-medium text-[16px] text-[#303030]">
          Homework Title
        </h5>

        <input
          type="text"
          placeholder="E.g..., Practice Counting Numbers"
          className="w-[336px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 -ml-0.5"
        />
      </div>
      <div className="p-6 -mt-8 ml-2">
        <h5 className="font-medium text-[16px] text-[#303030]">Instructions</h5>

        <input
          type="text"
          placeholder="E.g., Count the apples in the pic..."
          className="w-[336px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 -ml-1"
        />
      </div>

      <div className="p-6 -mt-8 ml-2">
        <h5 className="font-medium text-[16px] text-[#303030]">Due Date</h5>

        <div className="relative">
          {/* Visible input */}
          <input
            type="text"
            readOnly
            value={
              selectedDate
                ? selectedDate.toLocaleDateString("en-GB")
                : "Select date"
            }
            placeholder="Select date"
            onClick={() => setIsOpen(true)}
            className="w-[336px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 cursor-pointer -ml-1"
          />

          {/* Calendar icon */}
          <img
            src={cal}
            alt="calendar"
            onClick={() => setIsOpen(true)}
            className="absolute left-[90%] bottom-[30%] cursor-pointer"
          />

          {/* React DatePicker */}
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setIsOpen(false);
                  }}
                  inline
                  showPopperArrow={false}
                  minDate={new Date("2026-01-01")}
                  maxDate={new Date("2026-12-31")}
                  locale="en-GB"
                />
                {/* Optional close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-2 px-4 py-2 bg-[#3B82F6] text-white rounded-md w-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-[336px] flex justify-between ml-7 mb-80">
        <h6 className="font-medium text-[16px] text-black">Notify Parents</h6>
        <img
          src={isOn ? off : on}
          alt="switch"
          onClick={handleToggle}
          className="w-12 h-12 cursor-pointer transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default PostHomeWork;
