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
import { useNavigate } from "react-router-dom";

registerLocale("en-GB", enGB);

const PostHomeWork = ({ onBack }) => {
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isOn, setIsOn] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

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

  return (
    <div className="max-w-[430px] mx-auto w-full min-h-screen pb-28">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4 cursor-pointer"
        onClick={onBack}
      >
        <img src={back} alt="back" className="w-5 h-5" />
        <h2 className="text-[18px] sm:text-[20px] font-medium">
          Post Homework
        </h2>
      </div>

      {/* Form */}
      <div className="px-4 flex flex-col gap-5">
        {/* Grade */}
        <div>
          <label className="text-[14px] sm:text-[16px] font-medium mb-1 block">
            Select Class
          </label>

          <div className="relative">
            <button
              onClick={() => {
                setIsGradeOpen(!isGradeOpen);
                setIsSubjectOpen(false);
              }}
              className="w-full h-[52px] sm:h-[57px] px-3 border rounded-lg flex items-center justify-between"
            >
              <span
                className={`text-[14px] ${selectedGrade ? "text-black" : "text-gray-400"}`}
              >
                {selectedGrade || "Select grade"}
              </span>

              <img
                src={arr}
                className={`w-4 h-4 transition-transform ${isGradeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isGradeOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-md">
                {grades.map((grade) => (
                  <div
                    key={grade}
                    onClick={() => handleSelect("grade", grade)}
                    className="px-4 py-3 text-[14px] cursor-pointer hover:bg-blue-50"
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
          <label className="text-[14px] sm:text-[16px] font-medium mb-1 block">
            Subject
          </label>

          <div className="relative">
            <button
              onClick={() => {
                setIsSubjectOpen(!isSubjectOpen);
                setIsGradeOpen(false);
              }}
              className="w-full h-[52px] sm:h-[57px] px-3 border rounded-lg flex items-center justify-between"
            >
              <span
                className={`text-[14px] ${selectedSubject ? "text-black" : "text-gray-400"}`}
              >
                {selectedSubject || "Select subject"}
              </span>

              <img
                src={arr}
                className={`w-4 h-4 transition-transform ${isSubjectOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isSubjectOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-md">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    onClick={() => handleSelect("subject", subject)}
                    className="px-4 py-3 text-[14px] cursor-pointer hover:bg-blue-50"
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
          <label className="text-[14px] sm:text-[16px] font-medium mb-1 block">
            Homework Title
          </label>
          <input
            type="text"
            placeholder="E.g..., Practice Counting Numbers"
            className="w-full h-[52px] sm:h-[57px] border rounded-lg px-3 text-[14px]"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="text-[14px] sm:text-[16px] font-medium mb-1 block">
            Instructions
          </label>
          <input
            type="text"
            placeholder="E.g., Count the apples..."
            className="w-full h-[52px] sm:h-[57px] border rounded-lg px-3 text-[14px]"
          />
        </div>

        {/* Date */}
        <div>
          <label className="text-[14px] sm:text-[16px] font-medium mb-1 block">
            Due Date
          </label>

          <div className="relative">
            <input
              readOnly
              value={
                selectedDate
                  ? selectedDate.toLocaleDateString("en-GB")
                  : "Select date"
              }
              onClick={() => setIsOpen(true)}
              className="w-full h-[52px] sm:h-[57px] border rounded-lg px-3 text-[14px] cursor-pointer"
            />

            <img
              src={cal}
              onClick={() => setIsOpen(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
            />

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <div className="bg-white rounded-xl p-4">
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
          <p className="text-[14px] sm:text-[16px] font-medium">
            Notify Parents
          </p>

          <img
            src={isOn ? off : on}
            onClick={handleToggle}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default PostHomeWork;
