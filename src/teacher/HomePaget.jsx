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
import BottomNavigation from "../components/BottomNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import parentImg1 from "../assets/divine.svg";
import parentImg2 from "../assets/Shayla.svg";
import parentImg3 from "../assets/Tamara.svg";

registerLocale("en-GB", enGB);

const HomePaget = () => {
  const [percentage, setPercentage] = useState(0);
  const [percentage89, setPercentage89] = useState(0);
  const [percentage22, setPercentage22] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  const [screen, setScreen] = useState("home");
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
  const [isDOBOpen, setIsDOBOpen] = useState(false);

  // Success states
  const [showStudentSuccess, setShowStudentSuccess] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dropdown states
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isGradeOpen, setIsGradeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { profileImage } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveTab(path);
  }, [location]);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const targetPercentage = 100;
  const targetPercentage89 = 89;
  const targetPercentage22 = 22;

  const [studentAttendance, setStudentAttendance] = useState({
    "06201": null,
    "06202": null,
    "06203": null,
    "06204": null,
    "06205": null,
  });

  const [counts, setCounts] = useState({ present: 0, absent: 0, late: 0 });

  const handleStatusClick = (studentId, status) => {
    const previousStatus = studentAttendance[studentId];

    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));

    setCounts((prev) => {
      const newCounts = { ...prev };
      if (previousStatus) {
        newCounts[previousStatus] = Math.max(0, newCounts[previousStatus] - 1);
      }
      newCounts[status] = newCounts[status] + 1;
      return newCounts;
    });
  };

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
    setSelectedGender(gender);
    setIsGenderOpen(false);
  };

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setIsTermOpen(false);
  };

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
    setStudentNameAdd("");
    setStudentDOB(null);
    setSelectedGender("");
    setStudentID("");
    setSelectedFile(null);
    setStudentClass("");
    setAcademicSession("");
    setSelectedTerm("");
  };

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
    setStudentName("");
    setSelectedSubject("");
    setSelectedAssessment("");
    setSelectedGrade("");
    setTotalMark("");
    setSelectedDate(null);
  };

  const handleToggle = () => setIsOn(!isOn);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setPercentage(
        Math.round(Math.min(currentStep * increment, targetPercentage)),
      );
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage89 / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setPercentage89(
        Math.round(Math.min(currentStep * increment, targetPercentage89)),
      );
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage22 / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setPercentage22(
        Math.round(Math.min(currentStep * increment, targetPercentage22)),
      );
      if (currentStep >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, []);

  const radius = 40;
  const strokeWidth = 12;
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
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Shared input class
  const inputClass =
    "w-full h-[52px] rounded-[8px] border border-[#0000001F] py-2 px-3 text-[14px] font-normal placeholder:text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#FF7B17]";

  // Shared dropdown button class
  const dropdownBtnClass =
    "w-full h-[52px] px-3 border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between text-[14px]";

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen bg-white">
      {/* ================= NOTIFICATIONS ================= */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto max-w-[430px] mx-auto">
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setShowNotifications(false)}>
                  <img src={back} alt="back" />
                </button>
                <h2 className="text-[20px] font-medium">Notifications</h2>
              </div>
              <div className="space-y-3">
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
        <div className="pb-24">
          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-6">
            <div className="flex gap-3 items-center">
              <img
                src={profileImage || edith}
                alt="profile"
                className="w-10 h-10 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="text-[13px]">Welcome,</p>
                <p className="text-[15px] font-semibold leading-tight">
                  {fullName}
                </p>
                {grade && room && (
                  <p className="text-[12px] text-gray-500">
                    Grade {grade}. Room {room}.
                  </p>
                )}
              </div>
            </div>
            <FaRegBell
              className="w-5 h-5 cursor-pointer flex-shrink-0"
              onClick={() => setShowNotifications(true)}
            />
          </div>

          <h4 className="text-[17px] font-medium px-5 mt-8">
            Catch Up on Today's Quick Stats
          </h4>

          {/* Three circles */}
          <div className="bg-[#FFF0E5E0] mt-4 rounded-[10px] mx-5 py-5 px-2">
            <div className="flex justify-around items-start">
              {[
                {
                  pct: percentage,
                  offset: strokeDashoffset,
                  label: "Attendance Today",
                },
                {
                  pct: percentage89,
                  offset: strokeDashoffset89,
                  label: "Submitted Assignment",
                },
                {
                  pct: percentage22,
                  offset: strokeDashoffset22,
                  label: "Parents Engagement",
                },
              ].map(({ pct, offset, label }, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className="relative"
                    style={{ width: radius * 2, height: radius * 2 }}
                  >
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
                          strokeDashoffset: offset,
                          transition: "stroke-dashoffset 0.035s linear",
                        }}
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-black">
                      {pct}%
                    </div>
                  </div>
                  <p className="mt-2 font-semibold text-black text-[11px] w-[72px] text-center leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h5 className="text-[17px] font-medium px-5 mt-6">
            Get on Today's Task
          </h5>

          {/* Task grid — 2 cols, full width */}
          <div className="grid grid-cols-2 gap-3 px-5 mt-4">
            <button
              onClick={() => setScreen("post-homework")}
              className="border border-[#3B82F6] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={hm} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Post Homework</p>
            </button>

            <button
              onClick={() => setScreen("mark-attendance")}
              className="border border-[#F97316] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={att} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Mark Attendance</p>
            </button>

            <button
              onClick={() => setScreen("add-grade")}
              className="border border-[#0F766E] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={gd} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Add Grade</p>
            </button>

            <button
              onClick={() => setScreen("add-students")}
              className="border border-[#3B82F6] rounded-[8px] p-3 text-left h-[90px]"
            >
              <img src={st} alt="" className="w-9" />
              <p className="font-bold text-[13px] mt-2">Add Students</p>
            </button>
          </div>

          {/* Recent Messages */}
          <p className="font-medium text-[17px] text-black px-5 mt-6 mb-3">
            Recent Messages
          </p>

          <div className="px-5 pb-6 flex flex-col gap-3">
            {[
              {
                name: "Sharon Smitty",
                message: "Bryan's diary wasn't found in his bag...",
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
                className="flex items-center gap-3 bg-[#F8F8F8] border border-[#0000001F] px-3 py-3 rounded-[6px]"
              >
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="w-[48px] h-[48px] rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[14px] text-[#1a1a1a] truncate">
                      {chat.name}
                    </p>
                    <p className="text-[11px] text-[#888] ml-2 flex-shrink-0">
                      {chat.time}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-[2px]">
                    <p className="text-[12px] text-[#666] truncate">
                      {chat.message}
                    </p>
                    <span className="ml-2 flex-shrink-0 bg-[#22C55E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
        <div className="pb-28">
          <div
            className="flex items-center gap-4 px-5 py-5 cursor-pointer"
            onClick={() => setScreen("home")}
          >
            <img src={back} alt="back" />
            <h2 className="text-[20px] font-medium">Attendance</h2>
          </div>

          {/* Class Attendance header */}
          <div className="px-5">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[15px] text-black">
                Class Attendance
              </p>
              <p className="font-medium text-[13px] text-black">Today</p>
            </div>
          </div>

          {/* Date navigator */}
          <div className="border border-[#E3E3E3] rounded-[6px] mx-5 mt-4 h-[45px] flex items-center justify-between px-3">
            <img
              src={back3}
              alt="previous day"
              onClick={handlePrevDay}
              className="cursor-pointer flex-shrink-0 w-5 h-5"
            />
            <p className="font-medium text-[13px] text-black text-center truncate mx-2">
              {formatDate(currentDate)}
            </p>
            <img
              src={front}
              alt="next day"
              onClick={handleNextDay}
              className="cursor-pointer flex-shrink-0 w-5 h-5"
            />
          </div>

          {/* Today's Summary */}
          <div className="border border-[#E3E3E3] rounded-[6px] mx-5 mt-4 p-3">
            <h2 className="font-medium text-[13px] text-black mb-2">
              Today's Summary
            </h2>
            <div className="flex justify-between gap-2">
              {/* Present */}
              <div className="flex-1 bg-[#F0FDF4] rounded-[4px] py-2 flex flex-col items-center">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mb-1">
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
                <p className="text-[14px] font-semibold text-black">
                  {counts.present}
                </p>
                <p className="text-[12px] font-medium text-black">Present</p>
              </div>

              {/* Absent */}
              <div className="flex-1 bg-[#FDF1F1] rounded-[4px] py-2 flex flex-col items-center">
                <img src={pre} alt="" className="w-6 h-6 mb-1" />
                <p className="text-[14px] font-semibold text-black">
                  {counts.absent}
                </p>
                <p className="text-[12px] font-medium text-black">Absent</p>
              </div>

              {/* Late */}
              <div className="flex-1 bg-[#FEFCE9] rounded-[4px] py-2 flex flex-col items-center">
                <img src={late} alt="" className="w-6 h-6 mb-1" />
                <p className="text-[14px] font-semibold text-black">
                  {counts.late}
                </p>
                <p className="text-[12px] font-medium text-black">Late</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#D9D9D9] mt-3 mb-2" />

            <div className="flex justify-between">
              <p className="font-medium text-black text-[14px]">
                Total Students
              </p>
              <p className="font-semibold text-black text-[14px]">
                {students.length}
              </p>
            </div>
          </div>

          <p className="font-medium text-[17px] text-black px-5 mt-4 mb-2">
            Student List
          </p>

          {/* Student rows */}
          <div className="px-5 flex flex-col gap-3">
            {studentss.map((student) => (
              <div
                key={student.id}
                className="border border-[#E3E3E3] rounded-[6px] px-3 py-2 flex items-center justify-between"
              >
                {/* Left: avatar + info */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-[14px] text-black truncate">
                      {student.name}
                    </p>
                    <p className="font-medium text-[12px] text-[#9C9C9C]">
                      ID: {student.id}
                    </p>
                  </div>
                </div>

                {/* Right: status icons */}
                <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                  <img
                    src={
                      studentAttendance[student.id] === "present" ? presC : pres
                    }
                    onClick={() => handleStatusClick(student.id, "present")}
                    className="cursor-pointer w-7 h-7"
                    alt="present"
                  />
                  <img
                    src={
                      studentAttendance[student.id] === "absent" ? absC : abs
                    }
                    onClick={() => handleStatusClick(student.id, "absent")}
                    className="cursor-pointer w-7 h-7"
                    alt="absent"
                  />
                  <img
                    src={
                      studentAttendance[student.id] === "late" ? lateC : latee
                    }
                    onClick={() => handleStatusClick(student.id, "late")}
                    className="cursor-pointer w-7 h-7"
                    alt="late"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fixed Save Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#E3E3E3] px-5 py-3 z-50">
            <button className="w-full bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white">
              Save
            </button>
          </div>
        </div>
      )}

      {/* ================= ADD GRADE SCREEN ================= */}
      {screen === "add-grade" && (
        <div className="relative min-h-screen bg-white">
          <div className="pb-28 overflow-y-auto">
            <div
              className="flex items-center gap-4 px-5 py-5 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img src={back} alt="back" />
              <h2 className="text-[20px] font-medium">Add Grade</h2>
            </div>

            <div className="px-5 flex flex-col gap-5">
              {/* Student Name */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="E.g. John Smith"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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
                    className={dropdownBtnClass}
                  >
                    <span
                      className={
                        selectedSubject ? "text-[#303030]" : "text-gray-400"
                      }
                    >
                      {selectedSubject || "Select subject"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${isSubjectOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSubjectOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {subjects.map((subject) => (
                        <div
                          key={subject}
                          onClick={() => handleSelect("subject", subject)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {subject}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Assessment */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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
                    className={dropdownBtnClass}
                  >
                    <span
                      className={
                        selectedAssessment ? "text-[#303030]" : "text-gray-400"
                      }
                    >
                      {selectedAssessment || "Select an assessment"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${isAssessmentOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isAssessmentOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {assessments.map((assessment) => (
                        <div
                          key={assessment}
                          onClick={() => handleSelect("assessment", assessment)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {assessment}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grade */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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
                    className={dropdownBtnClass}
                  >
                    <span
                      className={
                        selectedGrade ? "text-[#303030]" : "text-gray-400"
                      }
                    >
                      {selectedGrade || "Select grade"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${isGradeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isGradeOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {grades.map((g) => (
                        <div
                          key={g}
                          onClick={() => handleSelect("grade", g)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {g}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Total Mark */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Total Mark
                </label>
                <input
                  type="text"
                  placeholder="Input Maximum Score"
                  value={totalMark}
                  onChange={(e) => setTotalMark(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={
                      selectedDate
                        ? selectedDate.toLocaleDateString("en-GB")
                        : ""
                    }
                    placeholder="Select date"
                    onClick={() => setIsOpen(true)}
                    className={`${inputClass} cursor-pointer pr-10`}
                  />
                  <img
                    src={cal}
                    alt="calendar"
                    onClick={() => setIsOpen(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                  />
                  {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 px-4">
                      <div className="bg-white rounded-xl p-4 shadow-lg w-full max-w-[320px]">
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
          </div>

          {/* Fixed Save Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#E3E3E3] px-5 py-3 z-40">
            <button
              onClick={handleSaveGrade}
              disabled={!isFormValid}
              className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-all ${
                isFormValid
                  ? "bg-[#FF7B17] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Save Grade
            </button>
          </div>

          {/* Success Modal */}
          {showSuccess && (
            <div className="fixed inset-0 flex items-end justify-center z-50">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={handleCloseSuccess}
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
                    You have successfully added a new grade
                  </p>
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

      {/* ================= ADD STUDENTS SCREEN ================= */}
      {screen === "add-students" && (
        <div className="relative min-h-screen bg-white">
          <div className="pb-28 overflow-y-auto">
            <div
              className="flex items-center gap-4 px-5 py-5 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img src={back} alt="back" />
              <h2 className="text-[20px] font-medium">Add Student</h2>
            </div>

            <div className="px-5 flex flex-col gap-5">
              <h4 className="font-semibold text-[17px] text-black">
                Student Information
              </h4>

              {/* Student Name */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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

              {/* Date of Birth */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                  />
                  {isDOBOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 px-4">
                      <div className="bg-white rounded-xl p-4 shadow-lg w-full max-w-[320px]">
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

              {/* Gender */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Gender
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                    className={dropdownBtnClass}
                  >
                    <span
                      className={
                        selectedGender ? "text-[#303030]" : "text-gray-400"
                      }
                    >
                      {selectedGender || "Select a gender"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${isGenderOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isGenderOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {genders.map((gender) => (
                        <div
                          key={gender}
                          onClick={() => handleSelectGender(gender)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {gender}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
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
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Upload Photo
                </label>
                <div
                  className="flex items-center justify-between border border-[#0000001F] rounded-[8px] h-[52px] px-3 cursor-pointer"
                  onClick={handleFileClick}
                >
                  <span
                    className={`text-[14px] truncate flex-1 ${selectedFile ? "text-[#303030]" : "text-gray-400"}`}
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
                    className="w-[18px] h-[18px] flex-shrink-0 ml-2"
                  />
                </div>
              </div>

              <h4 className="font-semibold text-[17px] text-black pt-2">
                Class & Academic Info
              </h4>

              {/* Class + Academic Session side by side */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-[15px] font-medium text-[#303030] mb-2">
                    Class
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Grade 5"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full h-[52px] rounded-[8px] border border-[#0000001F] px-3 text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#FF7B17]"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[15px] font-medium text-[#303030] mb-2">
                    Academic Session
                  </label>
                  <input
                    type="text"
                    placeholder="E.g 2024/2025"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    className="w-full h-[52px] rounded-[8px] border border-[#0000001F] px-3 text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#FF7B17]"
                  />
                </div>
              </div>

              {/* Term */}
              <div>
                <label className="block text-[15px] font-medium text-[#303030] mb-2">
                  Term
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTermOpen(!isTermOpen)}
                    className={dropdownBtnClass}
                  >
                    <span
                      className={
                        selectedTerm ? "text-[#303030]" : "text-gray-400"
                      }
                    >
                      {selectedTerm || "Select Term"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${isTermOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isTermOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {terms.map((term) => (
                        <div
                          key={term}
                          onClick={() => handleSelectTerm(term)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {term}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Add Student Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-[#E3E3E3] px-5 py-3 z-40">
            <button
              onClick={handleSaveStudent}
              disabled={!isStudentFormValid}
              className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-all ${
                isStudentFormValid
                  ? "bg-[#FF7B17] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Add Student
            </button>
          </div>

          {/* Success Modal */}
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
