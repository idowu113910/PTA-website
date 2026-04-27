import React, { useEffect, useRef, useState } from "react";
import edith from "../assets/edith.svg";
import back from "../assets/back2.svg";
import hm from "../assets/hmm.svg";
import att from "../assets/Attendance.svg";
import gd from "../assets/grade.svg";
import st from "../assets/student.svg";
import { FaRegBell } from "react-icons/fa6";
import PostHomeWork from "../components/PostHomeWork";
import back3 from "../assets/back3.svg";
import front from "../assets/front1.svg";
import pre from "../assets/Absent.svg";
import late from "../assets/late.svg";
import pres from "../assets/present.svg";
import dv from "../assets/divine.svg";
import abs from "../assets/Absent2.svg";
import latee from "../assets/Late2.svg";
import presC from "../assets/present1.svg";
import absC from "../assets/absent3.svg";
import lateC from "../assets/late3.svg";
import em from "../assets/Emma.svg";
import sh from "../assets/Shayla.svg";
import am from "../assets/Amaya.svg";
import br from "../assets/Bryan.svg";
import ta from "../assets/Tamara.svg";
import se from "../assets/sean.svg";
import arr from "../assets/arr drop down.svg";
import cal from "../assets/calendar3.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import ch from "../assets/choose.svg";
import hmm from "../assets/home.svg";
import rp from "../assets/report.svg";
import ms from "../assets/message.svg";
import ca from "../assets/calendar.svg";
import pr from "../assets/pro.svg";
import home from "../assets/home1.svg";
import rpp from "../assets/report2.svg";
import caa from "../assets/calendar3.svg";
import prr from "../assets/pro2.svg";
import mss from "../assets/message2.svg";
import BottomNavigation from "../components/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import parentImg1 from "../assets/divine.svg";
import parentImg2 from "../assets/Shayla.svg";
import parentImg3 from "../assets/Tamara.svg";

registerLocale("en-GB", enGB); // format DD/MM/YYYY

const HomePaget = () => {
  const [percentage, setPercentage] = useState(0);
  const [percentage89, setPercentage89] = useState(0);
  const [percentage22, setPercentage22] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  const [screen, setScreen] = useState("home"); // home | post-homework | mark-attendance | add-grade
  const mainScreens = ["home", "report", "message", "calendar", "profile"];
  const [isOn, setIsOn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [students, setStudents] = useState([]);
  const { fullName, grade, room } = useUser();

  const dateRef = useRef(null);

  // Add Grade form states
  const [studentName, setStudentName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  // Add Student form states
  const [studentNameAdd, setStudentNameAdd] = useState("");
  const [studentDOB, setStudentDOB] = useState(null);
  const [studentID, setStudentID] = useState("");

  const [studentClass, setStudentClass] = useState("");
  const [academicSession, setAcademicSession] = useState("");

  // Add Student dropdown states

  const [isDOBOpen, setIsDOBOpen] = useState(false);

  // File input ref

  // Success notification for Add Student
  const [showStudentSuccess, setShowStudentSuccess] = useState(false);

  // Data arrays

  // Dropdown states
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Update activeTab based on current route
  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveTab(path);
  }, [location]);

  const handleFileClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  // Success notification state
  const [showSuccess, setShowSuccess] = useState(false);

  const targetPercentage = 100;
  const targetPercentage89 = 89;
  const targetPercentage22 = 22;

  // Track attendance status for each student by their ID
  const [studentAttendance, setStudentAttendance] = useState({
    "06201": null,
    "06202": null,
    "06203": null,
    "06204": null,
    "06205": null,
  });

  const [counts, setCounts] = useState({ present: 0, absent: 0, late: 0 });

  const handleStatusClick = (studentId, status) => {
    // Get the previous status of this student
    const previousStatus = studentAttendance[studentId];

    // Update the student's attendance status
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    // Update counts
    setCounts((prev) => {
      const newCounts = { ...prev };

      // Decrease count for previous status if it exists
      if (previousStatus) {
        newCounts[previousStatus] = Math.max(0, newCounts[previousStatus] - 1);
      }

      // Increase count for new status
      newCounts[status] = newCounts[status] + 1;

      return newCounts;
    });
  };

  // Data arrays
  const subjects = [
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Computer Science",
    "Agricultural Science",
  ];

  const assessments = [
    "Quiz",
    "Test",
    "Assignment",
    "Presentation",
    "Project",
    "Practical Exams",
  ];

  const grades = ["A+", "B+", "C+", "D+", "E+", "F-"];

  const studentss = [
    { id: "06201", name: "Divine Ekubor", image: dv },
    { id: "06202", name: "Emma Wilson", image: em },
    { id: "06203", name: "Shayla Jason", image: sh },
    { id: "06204", name: "Bryan Williams", image: br },
    { id: "06205", name: "Amaya Isah", image: am },
    { id: "06206", name: "Tamara Wilson", image: ta },
    { id: "06207", name: "Sean King", image: se },
  ];

  const genders = ["Male", "Female"];

  const terms = ["Term 1", "Term 2", "Term 3"];

  const handleSelect = (type, value) => {
    if (type === "grade") {
      setSelectedGrade(value);
      setIsGradeOpen(false);
    } else if (type === "subject") {
      setSelectedSubject(value);
      setIsSubjectOpen(false);
    } else if (type === "assessment") {
      setSelectedAssessment(value);
      setIsAssessmentOpen(false);
    }
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender); // ✅ Save the selected gender
    setIsGenderOpen(false); // ✅ Close the dropdown
  };

  const handleSelectTerm = (term) => {
    setSelectedTerm(term); // ✅ Save the selected gender
    setIsTermOpen(false); // ✅ Close the dropdown
  };

  // Check if all Add Student fields are filled
  const isStudentFormValid =
    studentNameAdd.trim() !== "" &&
    studentDOB !== null &&
    selectedGender !== "" &&
    studentID.trim() !== "" &&
    selectedFile !== null &&
    studentClass.trim() !== "" &&
    academicSession.trim() !== "" &&
    selectedTerm !== "";

  const handleSaveStudent = () => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];

    const newStudent = {
      id: studentID,
      name: studentNameAdd,
      image: selectedFile
        ? URL.createObjectURL(selectedFile)
        : "/default-avatar.png",
      class: studentClass,
      session: academicSession,
      gender: selectedGender,
      dob: studentDOB,
    };

    const updatedStudents = [...storedStudents, newStudent];

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setShowStudentSuccess(true);

    // Optional: reset form
    setStudentNameAdd("");
    setStudentID("");
    setSelectedFile(null);
    setStudentClass("");
    setAcademicSession("");
    setSelectedGender("");
    setStudentDOB(null);
  };

  const handleCloseStudentSuccess = () => {
    setShowStudentSuccess(false);
    // Reset Add Student form
    setStudentNameAdd("");
    setStudentDOB(null);
    setSelectedGender("");
    setStudentID("");
    setSelectedFile(null);
    setStudentClass("");
    setAcademicSession("");
    setSelectedTerm("");
  };

  // Check if all fields are filled
  const isFormValid =
    studentName.trim() !== "" &&
    selectedSubject !== "" &&
    selectedAssessment !== "" &&
    selectedGrade !== "" &&
    totalMark.trim() !== "" &&
    selectedDate !== null;

  const handleSaveGrade = () => {
    if (isFormValid) {
      setShowSuccess(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    // Reset form
    setStudentName("");
    setSelectedSubject("");
    setSelectedAssessment("");
    setSelectedGrade("");
    setTotalMark("");
    setSelectedDate(null);
  };

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    // Start animation after component mounts
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = targetPercentage / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newPercentage = Math.min(currentStep * increment, targetPercentage);
      setPercentage(Math.round(newPercentage));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animation for 89% circle
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage89 / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newPercentage = Math.min(
        currentStep * increment,
        targetPercentage89,
      );
      setPercentage89(Math.round(newPercentage));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animation for 22% circle
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage22 / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newPercentage = Math.min(
        currentStep * increment,
        targetPercentage22,
      );
      setPercentage22(Math.round(newPercentage));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  // Calculate circle properties
  const radius = 48;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const strokeDashoffset89 =
    circumference - (percentage89 / 100) * circumference;
  const strokeDashoffset22 =
    circumference - (percentage22 / 100) * circumference;

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {/* ================= NOTIFICATIONS (GLOBAL) ================= */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowNotifications(false)}
          />

          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setShowNotifications(false)}>
                  <img src={back} alt="back" />
                </button>
                <h2 className="text-[20px] font-medium">Notifications</h2>
              </div>

              <div className="space-y-4">
                {[
                  ["Unread Messages", "2 unread messages from Parents"],
                  ["Upcoming Events", "Spelling Drill - July 15th"],
                  ["Behaviour Updates", "Alex had a great day in class"],
                  [
                    "Pending Approvals",
                    "3 parents need to approve science fair permissions",
                  ],
                ].map(([title, desc], i) => (
                  <div
                    key={i}
                    className="border border-[#D9D9D9] rounded-[6px] p-3"
                  >
                    <p className="text-[14px] font-medium">{title}</p>
                    <p className="text-[12px] text-[#656363]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= HOME SCREEN ================= */}
      {screen === "home" && (
        <div className="h-[1050px]">
          <div className="flex justify-between items-center px-6 mt-6">
            <div className="flex gap-4">
              <img src={edith} alt="" />
              <div>
                <p className="text-[14px]">Welcome,</p>
                <p className="text-[16px] font-semibold">{fullName}</p>
                <p className="text-[14px]">
                  {grade && room
                    ? `Grade ${grade}. Room ${room}. ${fullName}`
                    : ""}
                </p>
              </div>
            </div>

            <FaRegBell
              className="w-[18px] h-[21px] cursor-pointer"
              onClick={() => setShowNotifications(true)}
            />
          </div>

          <h4 className="text-[18px] font-medium ml-6 mt-10">
            Catch Up on Today's Quick Stats
          </h4>

          {/* Three circles in a row */}
          <div className="w-[339px] bg-[#FFF0E5E0] mt-6 rounded-[10px] ml-6 py-6 px-4">
            <div className="flex justify-between items-start">
              {/* 100% Circle */}
              <div className="flex flex-col items-center relative">
                <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="transform -rotate-90"
                >
                  <circle
                    stroke="#FF7B17"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="#22C55E"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{
                      strokeDashoffset: strokeDashoffset,
                      transition: "stroke-dashoffset 0.035s linear",
                    }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                </svg>
                <div className="absolute top-[48px] left-[48px] -translate-x-1/2 -translate-y-1/2 text-[15px] font-semibold text-black">
                  {percentage}%
                </div>
                <p className="mt-2 font-semibold text-black text-[12px] w-[73px] text-center">
                  Attendance Today
                </p>
              </div>

              {/* 89% Circle */}
              <div className="flex flex-col items-center relative">
                <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="transform -rotate-90"
                >
                  <circle
                    stroke="#FF7B17"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="#22C55E"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{
                      strokeDashoffset: strokeDashoffset89,
                      transition: "stroke-dashoffset 0.035s linear",
                    }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                </svg>
                <div className="absolute top-[48px] left-[48px] -translate-x-1/2 -translate-y-1/2 text-[15px] font-semibold text-black">
                  {percentage89}%
                </div>
                <p className="mt-2 font-semibold text-black text-[12px] w-[73px] text-center">
                  Submitted Assignment
                </p>
              </div>

              {/* 22% Circle */}
              <div className="flex flex-col items-center relative">
                <svg
                  height={radius * 2}
                  width={radius * 2}
                  className="transform -rotate-90"
                >
                  <circle
                    stroke="#FF7B17"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="#22C55E"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{
                      strokeDashoffset: strokeDashoffset22,
                      transition: "stroke-dashoffset 0.035s linear",
                    }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                </svg>
                <div className="absolute top-[48px] left-[48px] -translate-x-1/2 -translate-y-1/2 text-[15px] font-semibold text-black">
                  {percentage22}%
                </div>
                <p className="mt-2 font-semibold text-black text-[12px] w-[73px] text-center">
                  Parents Engagement
                </p>
              </div>
            </div>
          </div>

          <h5 className="text-[18px] font-medium ml-6 mt-6">
            Get on Today's Task
          </h5>

          <div className="grid grid-cols-2 gap-4 px-6 mt-5 w-[339px]">
            <button
              onClick={() => setScreen("post-homework")}
              className="border border-[#3B82F6] rounded-[8.54px] p-3 text-left w-[159px] h-[95px]"
            >
              <img src={hm} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Post Homework</p>
            </button>

            <button
              onClick={() => setScreen("mark-attendance")}
              className="border border-[#F97316] rounded-[8.54px] p-3 text-left  w-[159px] h-[95px] ml-6.5"
            >
              <img src={att} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Mark Attendance</p>
            </button>

            <button
              onClick={() => setScreen("add-grade")}
              className="border border-[#0F766E] rounded-[8.54px] p-3 text-left  w-[159px] h-[95px]"
            >
              <img src={gd} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Add Grade</p>
            </button>

            <button
              onClick={() => setScreen("add-students")}
              className="border border-[#3B82F6] rounded-[8.54px] p-3 text-left  w-[159px] h-[95px] ml-6.5"
            >
              <img src={st} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Add Students</p>
            </button>
          </div>

          <div className="p-6 ml-1">
            <p className="font-medium text-[18px] text-black">
              Recent Messages
            </p>
          </div>

          <div className="px-6 pb-6 flex flex-col gap-3">
            {[
              {
                name: "Sharon Smitty",
                message: "Bryan's diary wasn't found in his diary...",
                time: "11:10",
                unread: 4,
                img: parentImg1,
              },
              {
                name: "Amaya's Mum",
                message: "Good evening, Ms.Edith. I added some...",
                time: "Yesterday",
                unread: 2,
                img: parentImg2,
              },
              {
                name: "Shayla's Mum",
                message: "Good evening, Ms.Edith. I added some...",
                time: "Yesterday",
                unread: 1,
                img: parentImg3,
              },
            ].map((chat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#F8F8F8] border-[1px] border-[#0000001F] px-4 py-3 "
              >
                {/* Avatar */}
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="w-[52px] h-[52px] rounded-full object-cover flex-shrink-0"
                />

                {/* Name + Message */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[15px] text-[#1a1a1a] truncate">
                      {chat.name}
                    </p>
                    <p className="text-[12px] text-[#888] ml-2 flex-shrink-0">
                      {chat.time}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-[2px]">
                    <p className="text-[13px] text-[#666] truncate">
                      {chat.message}
                    </p>
                    <span className="ml-2 flex-shrink-0 bg-[#22C55E] text-white text-[11px] font-bold w-[22px] h-[22px] rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= POST HOMEWORK SCREEN ================= */}
      {screen === "post-homework" && (
        <PostHomeWork onBack={() => setScreen("home")} />
      )}

      {/* ================= MARK ATTENDANCE SCREEN ================= */}
      {screen === "mark-attendance" && (
        <div className="h-[1100px]">
          <div
            className="flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" />
            <h2 className="text-[20px] font-medium">Attendance</h2>
          </div>

          <div className="px-6 mt-1.5 ml-1">
            <div className="flex justify-between w-[337px]">
              <p className="font-semibold text-[16px] text-black">
                Class Attendance
              </p>
              <p className="font-medium text-[14px] text-black">Today</p>
            </div>
          </div>

          <div className="border border-[1px] w-[334px] h-[45px] rounded-[6px] border-[#E3E3E3] ml-7 mt-6">
            <div className="flex items-center justify-between px-3 h-full">
              <img
                src={back3}
                alt="previous day"
                onClick={handlePrevDay}
                className="cursor-pointer flex-shrink-0"
              />
              <p className="font-medium text-[16px] text-[#000000] whitespace-nowrap mx-4">
                {formatDate(currentDate)}
              </p>
              <img
                src={front}
                alt="next day"
                onClick={handleNextDay}
                className="cursor-pointer flex-shrink-0"
              />
            </div>
          </div>

          <div className="w-[337px] h-[179px] rounded-[6px] border-[1px] border-[#E3E3E3] ml-7 mt-6 p-3">
            <div className="flex flex-col">
              <h2 className="font-medium text-[13px] text-[#000000]">
                Today's Summary
              </h2>
              <div className="flex justify-around -ml-1">
                {/* Present Box */}
                <div className="w-[93px] h-[83px] bg-[#F0FDF4] mt-1.5">
                  <div className="flex flex-col items-center justify-center mt-2">
                    <div className="w-[25px] h-[25px] bg-green-100 rounded-full flex items-center justify-center ">
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
                    <div className="flex flex-col">
                      <p className="text-[#000000] font-medium text-[15px] flex mx-auto">
                        {counts.present}
                      </p>
                      <p className="text-[13px] font-medium text-[#000000] -mt-1.5">
                        Present
                      </p>
                    </div>
                  </div>
                </div>

                {/* Absent Box */}
                <div className="w-[93px] h-[83px] bg-[#FDF1F1] mt-1.5">
                  <div className="flex flex-col items-center justify-center mt-2">
                    <img src={pre} alt="" className="w-[25px] h-[25px]" />
                    <div className="flex flex-col">
                      <p className="text-[#000000] font-medium text-[15px] flex mx-auto">
                        {counts.absent}
                      </p>
                      <p className="text-[13px] font-medium text-[#000000] -mt-1.5">
                        Absent
                      </p>
                    </div>
                  </div>
                </div>

                {/* Late Box */}
                <div className="w-[93px] h-[83px] bg-[#FEFCE9] mt-1.5">
                  <div className="flex flex-col items-center justify-center mt-2">
                    <img src={late} alt="" className="w-[25px] h-[25px]" />
                    <div className="flex flex-col">
                      <p className="text-[#000000] font-medium text-[15px] flex mx-auto">
                        {counts.late}
                      </p>
                      <p className="text-[13px] font-medium text-[#000000] -mt-1.5">
                        Late
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal line */}
              <div className="w-[332px] h-[1px] bg-[#D9D9D9] mt-4 -ml-3"></div>
            </div>

            <div className="flex justify-between ml-2.5 mt-2 mr-2.5">
              <p className="font-medium text-black text-[15px]">
                Total Students
              </p>
              <p className="font-semibold text-black text-[15px]">
                {students.length}
              </p>
            </div>
          </div>

          <p className="font-medium text-[18px] text-black ml-5 mt-3 p-3">
            Student List
          </p>

          {studentss.map((student) => (
            <div
              key={student.id}
              className="w-[334px] h-[68px] rounded-[6px] border-[1px] py-[9px] px-[10px] gap-[10px] border-[#E3E3E3] ml-8 mt-3"
            >
              <div className="flex items-center">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
                />

                <div className="flex flex-col ml-2.5">
                  <h6 className="font-semibold text-[15px] text-black">
                    {student.name}
                  </h6>
                  <p className="font-semibold text-[14px] text-[#9C9C9C]">
                    ID: {student.id}
                  </p>
                </div>
              </div>

              <div className="flex justify-end -mt-9 gap-[20px]">
                <img
                  src={
                    studentAttendance[student.id] === "present" ? presC : pres
                  }
                  onClick={() => handleStatusClick(student.id, "present")}
                  className="cursor-pointer"
                />
                <img
                  src={studentAttendance[student.id] === "absent" ? absC : abs}
                  onClick={() => handleStatusClick(student.id, "absent")}
                  className="cursor-pointer"
                />
                <img
                  src={studentAttendance[student.id] === "late" ? lateC : latee}
                  onClick={() => handleStatusClick(student.id, "late")}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-50">
            <div className="flex justify-center -mt-2">
              <button className="w-[335px] bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= ADD GRADE SCREEN ================= */}
      {screen === "add-grade" && (
        <div className="relative h-screen bg-white">
          <div className="h-[812px] overflow-y-auto pb-24">
            <div
              className="flex items-center gap-4 p-6 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img src={back} alt="back" />
              <h2 className="text-[20px] font-medium">Add Grade</h2>
            </div>

            <div className="flex flex-col ml-7 mt-4">
              <h4 className="font-medium text-[16px] text-[#303030]">
                Student Name
              </h4>

              <input
                type="text"
                placeholder="E.g.......John Smith"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-[334px] h-[57px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1.5"
              />
            </div>

            <div className="p-6 -mt-1.5">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Subject
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubjectOpen(!isSubjectOpen);
                    setIsGradeOpen(false);
                    setIsAssessmentOpen(false);
                  }}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
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

            <div className="p-6 -mt-7.5">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Assessment
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsAssessmentOpen(!isAssessmentOpen);
                    setIsGradeOpen(false);
                    setIsSubjectOpen(false);
                  }}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                >
                  <span
                    className={`${
                      selectedAssessment
                        ? "text-[14px] text-[#303030] font-normal"
                        : "text-[14px] text-gray-400"
                    }`}
                  >
                    {selectedAssessment || "Select  an assessment"}
                  </span>
                  <img
                    src={arr}
                    alt="dropdown"
                    className={`transition-transform duration-200 ${
                      isAssessmentOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isAssessmentOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                    {assessments.map((assessment) => (
                      <div
                        key={assessment}
                        onClick={() => handleSelect("assessment", assessment)}
                        className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                      >
                        {assessment}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 -mt-7.5">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Grade
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsGradeOpen(!isGradeOpen);
                    setIsSubjectOpen(false);
                    setIsAssessmentOpen(false);
                  }}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
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

            <div className="flex flex-col ml-7 -mt-1">
              <h4 className="font-medium text-[16px] text-[#303030]">
                Total Mark
              </h4>

              <input
                type="text"
                placeholder="Input Maximum Score"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
                className="w-[334px] h-[57px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1"
              />
            </div>

            <div className="p-6 -mt-2 ml-2">
              <h5 className="font-medium text-[16px] text-[#303030]">Date</h5>

              <div className="relative">
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
                  className="w-[334px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 cursor-pointer -ml-2"
                />

                <img
                  src={cal}
                  alt="calendar"
                  onClick={() => setIsOpen(true)}
                  className="absolute left-[87%] bottom-[30%] cursor-pointer"
                />

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
          </div>

          {/* Fixed Save Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-40">
            <div className="flex justify-center -mt-2">
              <button
                onClick={handleSaveGrade}
                disabled={!isFormValid}
                className={`w-[335px] h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-all ${
                  isFormValid
                    ? "bg-[#FF7B17] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save Grade
              </button>
            </div>
          </div>

          {/* Success Notification */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-end justify-center z-50">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black/30"
                onClick={handleCloseSuccess}
              ></div>

              {/* Notification sliding from bottom */}
              <div className="relative bg-white rounded-t-[20px] w-full max-w-[500px] p-6 shadow-2xl animate-slide-up">
                <div className="flex flex-col items-center">
                  {/* Success Icon */}
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

                  {/* Success Message */}
                  <h3 className="text-[20px] font-bold text-[#303030] mb-2">
                    Successful!
                  </h3>
                  <p className="text-[14px] text-gray-600 text-center mb-6">
                    You have successfully added a new grade
                  </p>

                  {/* Okay Button */}
                  <button
                    onClick={handleCloseSuccess}
                    className="w-full bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          )}

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
      )}

      {screen === "add-students" && (
        <div className="relative h-screen bg-white">
          <div className="h-[1120px] overflow-y-auto pb-24">
            <div
              className="flex items-center gap-4 p-6 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img src={back} alt="back" />
              <h2 className="text-[20px] font-medium">Add Student</h2>
            </div>

            <div className="gap-y-[24px]">
              <h4 className="font-semibold text-[18px] text-black leading-[22%] ml-7 mt-3">
                Student Information
              </h4>

              <div className="flex flex-col ml-7 mt-8">
                <h4 className="font-medium text-[16px] text-[#303030]">
                  Student Name
                </h4>

                <input
                  type="text"
                  placeholder="E.g.......John Smith"
                  value={studentNameAdd}
                  onChange={(e) => setStudentNameAdd(e.target.value)}
                  className="w-[336px] h-[57px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1.5"
                />
              </div>

              <div className="p-6 -mt-2 ml-2">
                <h5 className="font-medium text-[16px] text-[#303030] -ml-1.5">
                  Date Of Birth
                </h5>

                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={
                      studentDOB
                        ? studentDOB.toLocaleDateString("en-GB")
                        : "Select date"
                    }
                    placeholder="Select date"
                    onClick={() => setIsDOBOpen(true)}
                    className="w-[334px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 cursor-pointer -ml-2"
                  />

                  <img
                    src={cal}
                    alt="calendar"
                    onClick={() => setIsDOBOpen(true)}
                    className="absolute left-[87%] bottom-[30%] cursor-pointer"
                  />

                  {isDOBOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <DatePicker
                          selected={studentDOB}
                          onChange={(date) => {
                            setStudentDOB(date);
                            setIsDOBOpen(false);
                          }}
                          inline
                          showPopperArrow={false}
                          maxDate={new Date()}
                          locale="en-GB"
                        />
                        <button
                          onClick={() => setIsDOBOpen(false)}
                          className="mt-2 px-4 py-2 bg-[#3B82F6] text-white rounded-md w-full"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 -mt-8">
                <label className="block text-[16px] font-medium text-[#303030] mb-2">
                  Gender
                </label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsGenderOpen(!isGenderOpen);
                    }}
                    className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                  >
                    <span
                      className={`${
                        selectedGender
                          ? "text-[14px] text-[#303030] font-normal"
                          : "text-[14px] text-gray-400"
                      }`}
                    >
                      {selectedGender || "Select a gender"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isGenderOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGenderOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {genders.map((gender) => (
                        <div
                          key={gender}
                          onClick={() => handleSelectGender(gender)}
                          className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col ml-7 -mt-2">
                <h4 className="font-medium text-[16px] text-[#303030]">
                  Student ID
                </h4>

                <input
                  type="text"
                  placeholder="E.G,..... Stu/020/25h"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  className="w-[334px] h-[57px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1"
                />
              </div>

              <div className="ml-5.5 mt-4">
                <h5 className="font-medium text-black text-[16px] ml-1">
                  Upload Photo
                </h5>

                <div className="flex border-[1px] border-[#0000001F] w-[334px] h-[57px] rounded-[8px] py-[8px] px-[12px] justify-between mt-2">
                  <input
                    type="text"
                    placeholder="Choose File"
                    value={selectedFile ? selectedFile.name : ""}
                    readOnly
                    className="placeholder:text-[#303030] font-normal text-[14px] flex-1 outline-none cursor-pointer"
                    onClick={handleFileClick}
                  />

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
                    className="w-[18px] h-[18px] mt-3 cursor-pointer"
                    onClick={handleFileClick}
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-[18px] text-black p-6">
                Class & Academic Info
              </h4>

              <div className="flex w-[336px] gap-3 ml-6">
                <div>
                  <h2 className="font-medium text-black text-[16px]">Class</h2>
                  <input
                    type="text"
                    placeholder="e.g Grade 5"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="border-[1px] rounded-[8px] w-[160px] placeholder:text-[14px] font-normal text-[#303030] 
              border-[#0000001F] h-[57px] px-[12px] py-[8px] mt-1.5 -ml-0.5"
                  />
                </div>

                <div>
                  <h2 className="font-medium text-black text-[16px]">
                    Academic Session
                  </h2>
                  <input
                    type="text"
                    placeholder="E.g 2024/2025"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    className="border-[1px] rounded-[8px] w-[160px] px-[12px] py-[8px] placeholder:text-[14px] font-normal text-[#303030] border-[#0000001F] h-[57px] mt-1.5"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 -mt-2">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Term
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsTermOpen(!isTermOpen);
                  }}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between -ml-0.5"
                >
                  <span
                    className={`${
                      selectedTerm
                        ? "text-[14px] text-[#303030] font-normal"
                        : "text-[14px] text-gray-400"
                    }`}
                  >
                    {selectedTerm || "Select Term"}
                  </span>
                  <img
                    src={arr}
                    alt="dropdown"
                    className={`transition-transform duration-200 ${
                      isTermOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isTermOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                    {terms.map((term) => (
                      <div
                        key={term}
                        onClick={() => handleSelectTerm(term)}
                        className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                      >
                        {term}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Add Student Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-40">
            <div className="flex justify-center -mt-2">
              <button
                onClick={handleSaveStudent}
                disabled={!isStudentFormValid}
                className={`w-[335px] h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-all ${
                  isStudentFormValid
                    ? "bg-[#FF7B17] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Add Student
              </button>
            </div>
          </div>

          {/* Success Notification for Add Student */}
          {showStudentSuccess && (
            <div className="fixed inset-0 flex items-end justify-center z-50">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={handleCloseStudentSuccess}
              ></div>

              <div className="relative bg-white rounded-t-[20px] w-full max-w-[500px] p-6 shadow-2xl animate-slide-up">
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
      )}

      {mainScreens.includes(screen) && <BottomNavigation />}
    </div>
  );
};

export default HomePaget;
