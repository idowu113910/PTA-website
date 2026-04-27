import React, { useRef, useState } from "react";
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
import ana from "../assets/analytics.svg";
import rr from "../assets/report review.svg";

registerLocale("en-GB", enGB); // format DD/MM/YYYY

const Report = () => {
  // Navigation & Screen States
  const [screen, setScreen] = useState("report");
  const mainScreens = ["report"];
  const navigate = useNavigate();
  const location = useLocation();

  // Date & Calendar States
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentDOB, setStudentDOB] = useState(null);
  const [isDOBOpen, setIsDOBOpen] = useState(false);

  // Term & Academic Year States
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedTermYear, setSelectedTermYear] = useState(
    "Term 3 2024/2025 Academic Year"
  );
  const [isTermDropdownOpen, setIsTermDropdownOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [academicSession, setAcademicSession] = useState("");
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const termYears = [
    "Term 1 2024/2025 Academic Year",
    "Term 2 2024/2025 Academic Year",
    "Term 3 2024/2025 Academic Year",
  ];

  const terms = ["Term 1 ", "Term 2", "Term 3"];

  // Student Data Arrays
  const [students, setStudents] = useState([
    { id: "06201", name: "Divine Ekubor", image: dv },
    { id: "06202", name: "Emma Wilson", image: em },
    { id: "06203", name: "Shayla Jason", image: sh },
    { id: "06204", name: "Bryan Williams", image: br },
    { id: "06205", name: "Amaya Isah", image: am },
    { id: "06206", name: "Tamara Wilson", image: ta },
    { id: "06207", name: "Sean King", image: se },
  ]);

  const mystudent = [
    { id: "06201", name: "Divine Ekubor", image: dv, marginLeft: "-ml-5.5" },
    { id: "06202", name: "Emma Wilson", image: em, marginLeft: "-ml-6" },
    { id: "06203", name: "Shayla Jason", image: sh, marginLeft: "-ml-7.5" },
    { id: "06204", name: "Bryan Williams", image: br, marginLeft: "-ml-5" },
    { id: "06205", name: "Amaya Isah", image: am, marginLeft: "-ml-10.5" },
    { id: "06206", name: "Tamara Wilson", image: ta, marginLeft: "-ml-5.5" },
    { id: "06207", name: "Sean Kong", image: se, marginLeft: "-ml-11.5" },
  ];

  // Attendance States
  const [studentAttendance, setStudentAttendance] = useState({
    "06201": null,
    "06202": null,
    "06203": null,
    "06204": null,
    "06205": null,
  });
  const [counts, setCounts] = useState({ present: 0, absent: 0, late: 0 });

  // Grade/Assessment Form States
  const [studentName, setStudentName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Add Student Form States
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [studentNameAdd, setStudentNameAdd] = useState("");
  const [studentID, setStudentID] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showStudentSuccess, setShowStudentSuccess] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [comments, setComments] = useState(" ");
  const [activeSkill, setActiveSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fileInputRef = useRef(null);

  const genders = ["Male", "Female", "Other"];

  // Handler functions
  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setIsGenderOpen(false);
  };

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
    setIsTermOpen(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Form validation
  const isStudentFormValid =
    studentNameAdd.trim() !== "" &&
    studentDOB !== null &&
    selectedGender !== "" &&
    studentID.trim() !== "" &&
    studentClass.trim() !== "" &&
    academicSession.trim() !== "" &&
    selectedTerm !== "";

  // Generate avatar helper functions
  const generateInitials = (name) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
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
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = generateInitials(name);

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Ccircle cx='25' cy='25' r='25' fill='${randomColor}'/%3E%3Ctext x='25' y='32' font-size='20' fill='white' text-anchor='middle' font-family='Arial'%3E${initials}%3C/text%3E%3C/svg%3E`;
  };

  // Dropdown States
  const [isOpen, setIsOpen] = useState(false);

  const isBehaviourFormValid =
    studentNameAdd.trim() && selectedGender && selectedTerm;

  // Form Validation - Grade Form
  const isFormValid =
    studentName.trim() !== "" &&
    selectedSubject !== "" &&
    selectedAssessment !== "" &&
    selectedGrade !== "" &&
    totalMark.trim() !== "" &&
    selectedDate !== null;

  // Handler Functions
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

  const handleRemoveStudent = (id) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== id)
    );
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

    // Reset form
    setStudentNameAdd("");
    setStudentDOB(null);
    setSelectedGender("");
    setStudentID("");
    setSelectedFile(null);
    setStudentClass("");
    setAcademicSession("");
    setSelectedTerm("");

    // Show success
    setShowStudentSuccess(true);
  };

  const handleCloseStudentSuccess = () => {
    setShowStudentSuccess(false);
    setShowAddStudent(false);
  };

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

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Add this state at the top of your component
  const [progressBars, setProgressBars] = useState({
    teamwork: 0,
    communication: 0,
    respect: 0,
    responsibility: 0,
  });

  const [activeDrag, setActiveDrag] = useState(null);

  // Update the handler functions to work with specific progress bars

  // Add this at the top level of your component (outside the return)
  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      setActiveDrag(null);
    };

    if (activeDrag) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
      return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }
  }, [activeDrag]);

  // Skills array
  const skills = [
    { id: "teamwork", label: "Team Work" },
    { id: "communication", label: "Communication" },
    { id: "respect", label: "Respect" },
    { id: "responsibility", label: "Responsibility" },
  ];

  // Handler functions
  const handleMouseDown = (skillId) => {
    setActiveDrag(skillId);
  };

  const handleMouseUp = () => {
    setActiveDrag(null);
  };

  const handleMouseMove = (e, skillId) => {
    if (activeDrag === skillId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
      setProgressBars((prev) => ({
        ...prev,
        [skillId]: Math.round(percentage),
      }));
    }
  };

  const handleClick = (e, skillId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
    setProgressBars((prev) => ({
      ...prev,
      [skillId]: Math.round(percentage),
    }));
  };

  const handleSaveBehaviour = () => {
    if (!isFormValid) return;

    const behaviourData = {
      studentName: studentNameAdd,
      gender: selectedGender,
      term: selectedTerm,
      socialSkills: progressBars,
      comments: comments,
      notifyParents: isOn,
    };

    console.log("Behaviour Data:", behaviourData);

    // Add your save logic here (e.g., API call, state update, etc.)
    // Example: saveBehaviourToDatabase(behaviourData);

    // Optionally reset form or navigate back
    // setScreen("report");
  };

  // Add this to your state declarations at the top of your component
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

  // Add this handler function
  const handleSelectReportType = (reportType) => {
    setSelectedReportType(reportType);
    setIsReportTypeOpen(false);
  };

  // Filter logic
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  return (
    <>
      {screen === "report" && (
        <div className="p-6 h-[812px]">
          <h1 className="font-bold text-[20px] text-black">Report</h1>

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

          <div className="grid grid-cols-2 gap-[18px] px-6 mt-7 -ml-6.5 w-[336px]">
            <button
              onClick={() => setScreen("my-students")}
              className="border border-[#0F766E] rounded-[8.54px] p-3 text-left w-[159px] h-[95px]"
            >
              <img src={st} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">My Students</p>
            </button>

            <button
              onClick={() => setScreen("mark-attendance")}
              className="border border-[#F97316] rounded-[8.54px] p-3 text-left w-[159px] h-[95px] ml-5.5"
            >
              <img src={ma} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Mark Attendance</p>
            </button>

            <button
              onClick={() => setScreen("behaviour")}
              className="border border-[#0F766E] rounded-[8.54px] p-3 text-left w-[159px] h-[95px]"
            >
              <img src={brr} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Behaviour</p>
            </button>

            <button
              onClick={() => setScreen("generate-report")}
              className="border border-[#3B82F6] rounded-[8.54px] p-3 text-left w-[159px] h-[95px] ml-5.5"
            >
              <img src={gr} alt="" className="w-[39px]" />
              <p className="font-bold text-[13px] mt-2">Generate Report</p>
            </button>
          </div>
        </div>
      )}

      {screen === "mark-attendance" && (
        <div className="h-[1200px]">
          <div
            className="flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => setScreen("report")}
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

          <div>
            {/* Student list */}
            <div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="w-[334px] h-[68px] rounded-[6px] border-[1px] py-[9px] px-[10px] gap-[10px] border-[#E3E3E3] ml-8 mt-3"
                >
                  <div className="flex">
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
                        studentAttendance[student.id] === "present"
                          ? presC
                          : pres
                      }
                      alt="present"
                      onClick={() => handleStatusClick(student.id, "present")}
                      className="cursor-pointer transition-all"
                    />
                    <img
                      src={
                        studentAttendance[student.id] === "absent" ? absC : abs
                      }
                      alt="absent"
                      onClick={() => handleStatusClick(student.id, "absent")}
                      className="cursor-pointer transition-all"
                    />
                    <img
                      src={
                        studentAttendance[student.id] === "late" ? lateC : latee
                      }
                      alt="late"
                      onClick={() => handleStatusClick(student.id, "late")}
                      className="cursor-pointer transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-50">
            <div className="flex justify-center -mt-2">
              <button className="w-[335px] bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "my-students" && (
        <div className="h-[850px]">
          {!showAddStudent ? (
            // Current Student List Screen
            <>
              <div
                className="flex items-center gap-4 p-6 cursor-pointer"
                onClick={() => setScreen("report")}
              >
                <img src={back} alt="back" />
                <h2 className="text-[20px] font-medium">My Students</h2>

                <div
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the back navigation
                    setShowAddStudent(true);
                  }}
                  className="flex ml-32 cursor-pointer"
                >
                  <img src={add} alt="" className="" />
                </div>
              </div>

              <div className="w-[333px] h-[48px] border-[1px] border-[#D9D9D9] rounded-[7px] bg-[#FCFCFC] ml-7.5 mt-4">
                <div className="flex gap-[11px] p-2 mt-1">
                  <img src={srch} alt="" />
                  <input
                    type="text"
                    placeholder="Search Students"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="outline-none font-normal text-[14px] text-[#616161] bg-transparent"
                  />
                </div>
              </div>

              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="w-[334px] h-[68px] border-[1px] rounded-[6px] border-[#E3E3E3] py-[9px] px-[10px] gap-[10px] ml-7.5 mt-6"
                >
                  <div className="flex justify-between items-center">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
                    />

                    <div className="flex flex-col text-[15px] font-semibold text-[#000000] flex-1 ml-2.5">
                      <h5>{student.name}</h5>
                      <p className="font-semibold text-[14px] text-[#9C9C9C]">
                        ID: {student.id}
                      </p>
                    </div>

                    <div className="flex justify-end w-[124px] h-[32px] gap-[4px] flex-shrink-0">
                      <button className="w-[54px] h-[32px] rounded-[5px] py-[5px] px-[10px] text-white font-normal text-[14px] bg-[#FF7B17]">
                        View
                      </button>

                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-[14px] font-normal text-[#FF0000] ml-1.5"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Add Student Screen
            <div>
              <div className="flex items-center gap-4 p-6">
                <img
                  src={back}
                  alt="back"
                  onClick={() => setShowAddStudent(false)}
                  className="cursor-pointer"
                />
                <h2 className="text-[20px] font-medium">Add Student</h2>
              </div>

              <div className=" mt-6">
                <div className="">
                  <div className="h-[1120px]  pb-24">
                    <div className="gap-y-[24px]">
                      <h4 className="font-semibold text-[18px] text-black leading-[22%] ml-7 -mt-2">
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
                          <h2 className="font-medium text-black text-[16px]">
                            Class
                          </h2>
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
              </div>
            </div>
          )}
        </div>
      )}

      {screen === "behaviour" && (
        <div className="h-[980px]" onMouseUp={handleMouseUp}>
          <div>
            <div className="flex items-center gap-4 p-6">
              <img
                src={back}
                alt="back"
                onClick={() => setScreen("report")}
                className="cursor-pointer"
              />
              <h2 className="text-[20px] font-medium">Add Behaviour</h2>
            </div>
          </div>

          <div className="flex flex-col ml-7 mt-2">
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

          <div className="p-6 -mt-1">
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

          <div className="p-6 -mt-7">
            <label className="block text-[16px] font-medium text-[#303030] mb-2">
              Academic Term
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
                  {selectedTerm || "Select an Academic Term"}
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

          <div className=" ml-6 -mt-1.5">
            <h1 className="font-medium text-[16px] text-black">
              Social Skills Assessment
            </h1>

            {skills.map((skill, index) => (
              <div key={skill.id}>
                <div className={index === 0 ? "mt-5" : "mt-7"}>
                  <p className="font-normal text-[14px] text-black">
                    {skill.label}
                  </p>

                  <div className="w-[336px] h-[6px] rounded-[15px] mt-2">
                    <div
                      className="w-full h-2 bg-gray-200 rounded-full cursor-pointer relative"
                      onMouseDown={() => handleMouseDown(skill.id)}
                      onMouseMove={(e) => handleMouseMove(e, skill.id)}
                      onClick={(e) => handleClick(e, skill.id)}
                    >
                      <div
                        className="h-full bg-[#22C55E] rounded-full transition-all"
                        style={{ width: `${progressBars[skill.id]}%` }}
                      />

                      {/* Draggable handle */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#22C55E] border-2 border-[#22C55E] rounded-full shadow-lg"
                        style={{
                          left: `calc(${progressBars[skill.id]}% - 8px)`,
                        }}
                      />
                    </div>

                    <div className="flex justify-end mt-2">
                      <span className="text-sm font-semibold">
                        {progressBars[skill.id]}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 -ml-1">
              <h2 className="font-normal text-black text-[16px]">
                Add Comments
              </h2>
              <input
                type="text"
                placeholder="Enter Comments...."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-[336px] h-[57px] border-[1px] border-[#E5E7EB] rounded-[6px] px-[12px] mt-3"
              />
            </div>
          </div>

          <div className="w-[336px] flex justify-between ml-6 mb-80 mt-4">
            <h6 className="font-medium text-[16px] text-black mt-2">
              Notify Parents
            </h6>
            <img
              src={isOn ? off : on}
              alt="switch"
              onClick={handleToggle}
              className="w-12 h-12 cursor-pointer transition-all duration-300"
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-50">
            <div className="flex justify-center -mt-2">
              <button
                onClick={handleSaveBehaviour}
                disabled={!isBehaviourFormValid}
                className={`w-[335px] h-[50px] rounded-[10px] font-bold text-[18px] text-white ${
                  isBehaviourFormValid
                    ? "bg-[#FF7B17] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === "generate-report" && (
        <div className="h-[790px]">
          <div className="flex items-center gap-4 p-6">
            <img
              src={back}
              alt="back"
              onClick={() => setScreen("report")}
              className="cursor-pointer"
            />
            <h2 className="text-[20px] font-medium">Generate Report</h2>
          </div>
          <div className="flex flex-col ml-7 mt-2">
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
          <div className="p-6 -mt-1">
            <label className="block text-[16px] font-medium text-[#303030] mb-2">
              Academic Term
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsTermOpen(!isTermOpen);
                  setIsReportTypeOpen(false);
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
                  {selectedTerm || "Select an Academic Term"}
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

          <div className="relative">
            <div className="ml-7">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Report Type
              </label>

              <button
                type="button"
                onClick={() => {
                  setIsReportTypeOpen(!isReportTypeOpen);
                  setIsTermOpen(false);
                }}
                className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between -ml-0.5"
              >
                <span
                  className={`${
                    selectedReportType
                      ? "text-[14px] text-[#303030] font-normal"
                      : "text-[14px] text-gray-400"
                  }`}
                >
                  {selectedReportType || "Select a report type"}
                </span>
                <img
                  src={arr}
                  alt="dropdown"
                  className={`transition-transform duration-200 ${
                    isReportTypeOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isReportTypeOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md max-h-[300px] overflow-y-auto">
                  {reportTypes.map((reportType) => (
                    <div
                      key={reportType}
                      onClick={() => handleSelectReportType(reportType)}
                      className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                    >
                      {reportType}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="border border-dashed border-[#000000] rounded-[8px] w-[334px] h-[185px] flex flex-col items-center justify-center ml-7 mt-12">
            <img src={ana} alt="" />

            <div className="flex">
              <div>
                <div className="flex items-center justify-center">
                  <img src={rr} alt="" className="w-[27px] h-[27px]" />
                  <p className="font-semibold text-[16px] text-black mt-0.5">
                    View Report Review
                  </p>
                </div>

                <p className="text-[12px] font-normal text-[#9E9E9E] flex items-center text-center px-6 w-[284px] mt-2.5">
                  Preview the generated attendance summary report for Shayla
                  Jason.
                </p>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E3E3E3] py-4 z-50">
            <div className="flex justify-center -mt-2">
              <button
                onClick={handleSaveBehaviour}
                disabled={!isBehaviourFormValid}
                className={`w-[335px] h-[50px] rounded-[10px] font-bold text-[18px] text-white ${
                  isBehaviourFormValid
                    ? "bg-[#FF7B17] cursor-pointer"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {mainScreens.includes(screen) && <BottomNavigation />}
    </>
  );
};

export default Report;
