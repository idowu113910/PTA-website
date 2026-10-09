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
import { getAuthToken, authErrorMessage } from "./utils/auth";
import parentImg1 from "../assets/divine.svg";
import parentImg2 from "../assets/Shayla.svg";
import parentImg3 from "../assets/Tamara.svg";

registerLocale("en-GB", enGB);

// Month / year options for the Date Of Birth calendar header
const DOB_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOB_YEARS = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i,
);

// Screens on this page that are restored after a browser refresh
const HOME_SCREEN_KEY = "teacherHomeScreen";
const RESTORABLE_SCREENS = [
  "home",
  "post-homework",
  "mark-attendance",
  "add-grade",
  "add-students",
];

// The student list is saved here (localStorage survives closing the browser)
// so it still shows even when the login token has expired.
// If you have a logout function, call localStorage.removeItem(STUDENTS_CACHE_KEY)
// there so the next person to log in on this device doesn't see this list.
const STUDENTS_CACHE_KEY = "teacherStudentsCache";

// When the teacher taps Save on the Mark Attendance screen, the students shown
// there are stored under this key. The Report page reads the same key to show
// them on its own Mark Attendance screen.
// If you have a logout function, call localStorage.removeItem(SAVED_ATTENDANCE_KEY)
// there as well.
const SAVED_ATTENDANCE_KEY = "teacherAttendanceStudents";

const loadCachedStudents = () => {
  try {
    const raw = localStorage.getItem(STUDENTS_CACHE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
};

const saveCachedStudents = (list) => {
  try {
    localStorage.setItem(STUDENTS_CACHE_KEY, JSON.stringify(list));
  } catch (_) {
    // storage unavailable or full — ignore
  }
};

// ── Students API ─────────────────────────────────────────────────────────
const API_ORIGIN = "https://pta-wdln.onrender.com";
const STUDENTS_API_URL = `${API_ORIGIN}/api/teachers/students`;

// Accepts the common response shapes: [...], { students: [...] }, { data: [...] }
const extractStudentList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.students)) return data.students;
  if (Array.isArray(data?.data?.students)) return data.data.students;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

// Turns whatever image value the backend returns (full URL, relative path with
// or without a leading slash, or an object with a url) into a usable src
const resolveImageUrl = (raw) => {
  const value =
    raw && typeof raw === "object"
      ? raw.url || raw.secure_url || raw.path || ""
      : raw;
  if (!value || typeof value !== "string") return "/default-avatar.png";
  if (/^(https?:)?\/\//i.test(value) || /^(data|blob):/i.test(value)) {
    return value;
  }
  return `${API_ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
};

// Converts whatever the backend returns into the shape the UI uses
const normalizeStudent = (s) => {
  // The backend sends the photo as `avatarUrl` (null when no photo is stored)
  const rawImage =
    s.avatarUrl || s.photo || s.image || s.profileImage || s.avatar || "";
  const image = resolveImageUrl(rawImage);

  return {
    id: String(
      s.studentCode ||
        s.studentId ||
        s.studentID ||
        s.student_id ||
        s._id ||
        s.id,
    ),
    name:
      s.fullName ||
      s.name ||
      [s.firstName, s.lastName].filter(Boolean).join(" ") ||
      "Unnamed Student",
    image,
    class: s.class || s.className || s.grade || "",
  };
};

// What the backend asks for when adding a student (from its validation
// errors): firstName, lastName, studentCode (3+ characters) and dateOfBirth
// (ISO 8601). The other form fields are sent as optional extras; if the
// backend rejects one of them (e.g. "should not exist" or "must be one of
// the following values"), it is dropped automatically (see
// handleSaveStudent), so the request still goes through.
const REQUIRED_STUDENT_KEYS = [
  "firstName",
  "lastName",
  "studentCode",
  "dateOfBirth",
];

// Field names the backend might use for the uploaded photo. They are tried in
// order if the server answers "Unexpected field".
const PHOTO_FIELD_NAMES = ["photo", "image", "profileImage", "avatar"];

const splitFullName = (fullName) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || "";
  return {
    firstName,
    // If only one name was typed, reuse it so the required lastName is filled
    lastName: parts.slice(1).join(" ") || firstName,
  };
};

// Local calendar date as YYYY-MM-DD (avoids the off-by-one-day shift that
// toISOString() can cause in some timezones)
const toIsoDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const buildStudentPayload = ({
  name,
  dob,
  gender,
  id,
  studentClass,
  session,
  term,
}) => {
  const { firstName, lastName } = splitFullName(name);
  const payload = {
    firstName,
    lastName,
    studentCode: id,
    dateOfBirth: toIsoDate(dob),
  };
  // optional extras — only sent when filled in
  if (gender) payload.gender = gender;
  if (studentClass) payload.class = studentClass;
  if (session) payload.academicSession = session;
  if (term) payload.term = term;
  return payload;
};

// Builds the multipart body used when a photo is attached: every text field
// plus the image file under the given field name
const buildStudentFormData = (payload, file, photoField) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append(photoField, file, file.name);
  return formData;
};

// Reads the validation messages out of a backend error body
const getErrorMessages = (errBody) => {
  const raw = errBody?.message ?? errBody?.error;
  return (Array.isArray(raw) ? raw : [raw]).filter(
    (m) => typeof m === "string",
  );
};

// Finds which payload fields the backend complained about and that we are
// allowed to drop: anything it says "should not exist", plus any optional
// field whose value it rejected (message starts with the field name).
const findRejectedKeys = (messages, payload) => {
  const rejected = new Set();
  messages.forEach((m) => {
    const notExist = /^property (\S+) should not exist/.exec(m)?.[1];
    if (notExist && notExist in payload) rejected.add(notExist);

    Object.keys(payload).forEach((key) => {
      if (REQUIRED_STUDENT_KEYS.includes(key)) return;
      if (m.startsWith(`${key} `) || m.includes(`property ${key} `)) {
        rejected.add(key);
      }
    });
  });
  return Array.from(rejected);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

    // Make sure state is correct on mount
    setIsSystemDark(mediaQuery.matches);

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

const HomePage = () => {
  // Theme comes straight from the device's light/dark setting
  const isDarkMode = useSystemDarkMode();

  const [percentage, setPercentage] = useState(0);
  const [percentage89, setPercentage89] = useState(0);
  const [percentage22, setPercentage22] = useState(0);
  const [isSavingAttendance, setIsSavingAttendance] = useState(false);
  const [saveAttendanceError, setSaveAttendanceError] = useState("");
  const [showAttendanceSuccess, setShowAttendanceSuccess] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  // Remember which screen the teacher is on so a browser refresh keeps them
  // there (still inside the Home page).
  const [screen, setScreen] = useState(() => {
    try {
      const saved = sessionStorage.getItem(HOME_SCREEN_KEY);
      return RESTORABLE_SCREENS.includes(saved) ? saved : "home";
    } catch (_) {
      return "home";
    }
  });
  const mainScreens = ["home", "report", "message", "calendar", "profile"];
  const [isOn, setIsOn] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  // Starts from the saved list so students show instantly, even offline or
  // with an expired login
  const [students, setStudents] = useState(() => loadCachedStudents());
  const [isLoadingStudents, setIsLoadingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState("");
  const [isSavingStudent, setIsSavingStudent] = useState(false);
  const [saveStudentError, setSaveStudentError] = useState("");
  const { fullName, grade, room, token: contextToken } = useUser();

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

  // Keep html/body background, color-scheme and the browser top bar
  // (status bar) in sync with the device's light/dark mode. The Mark
  // Attendance screen is always black (#000000).
  useEffect(() => {
    const useBlack = isDarkMode || screen === "mark-attendance";
    const bg = useBlack ? "#000000" : "#FFFFFF";
    const root = document.documentElement;

    const prevRootBg = root.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    const prevScheme = root.style.colorScheme;
    const originalMetas = Array.from(
      document.querySelectorAll('meta[name="theme-color"]'),
    ).map((m) => m.cloneNode(true));

    root.style.backgroundColor = bg;
    document.body.style.backgroundColor = bg;
    root.style.colorScheme = useBlack ? "dark" : "light";

    // Replace any existing theme-color tags so iOS/Android re-read the color
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
  }, [isDarkMode, screen]);

  // Save the current screen so a refresh returns to it. The saved value is
  // cleared when the teacher navigates away from this page (unmount), so
  // coming back later starts on the normal home view.
  useEffect(() => {
    try {
      sessionStorage.setItem(HOME_SCREEN_KEY, screen);
    } catch (_) {
      // storage unavailable — ignore
    }
  }, [screen]);

  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem(HOME_SCREEN_KEY);
      } catch (_) {
        // ignore
      }
    };
  }, []);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Load the teacher's students from the backend. A successful load replaces
  // the saved list. If the load fails (expired login, no network, server
  // asleep) the saved list stays on screen instead of being wiped.
  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    setStudentsError("");
    try {
      const accessToken = getAuthToken(contextToken);
      if (!accessToken) throw new Error(authErrorMessage(contextToken));

      const res = await fetch(STUDENTS_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      if (!res.ok) {
        throw new Error(
          res.status === 401
            ? authErrorMessage(contextToken)
            : "Could not load students.",
        );
      }
      const data = await res.json();
      const list = extractStudentList(data).map(normalizeStudent);
      setStudents(list);
      saveCachedStudents(list);
    } catch (err) {
      // Only show an error when there is no saved list to fall back on
      if (loadCachedStudents().length === 0) {
        setStudentsError(err.message || "Could not load students.");
      }
    } finally {
      setIsLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
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

  const [studentAttendance, setStudentAttendance] = useState({});

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

  // Save button on the Mark Attendance screen: stores the students shown there
  // so the Report page's Mark Attendance screen can display them too.
  const handleSaveAttendance = async () => {
    if (isSavingAttendance || students.length === 0) return;
    setIsSavingAttendance(true);
    setSaveAttendanceError("");

    try {
      // Currently saved on this device only. When you have an attendance
      // endpoint, replace this line with the fetch() call and send
      // studentAttendance + currentDate.
      localStorage.setItem(SAVED_ATTENDANCE_KEY, JSON.stringify(students));

      // Short pause so the loading state is visible
      await wait(600);

      setShowAttendanceSuccess(true);
    } catch (_) {
      setSaveAttendanceError("Could not save attendance. Please try again.");
    } finally {
      setIsSavingAttendance(false);
    }
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

  // Only what the backend actually requires: name, date of birth, student ID.
  // Gender, photo, class, session and term are optional.
  const isStudentFormValid =
    studentNameAdd.trim() !== "" &&
    studentDOB !== null &&
    studentID.trim() !== "";

  // Sends the new student to the backend, then refreshes the list so the
  // student shows up on the Mark Attendance screen.
  const handleSaveStudent = async () => {
    if (isSavingStudent) return;
    setIsSavingStudent(true);
    setSaveStudentError("");

    try {
      const accessToken = getAuthToken(contextToken);
      if (!accessToken) throw new Error(authErrorMessage(contextToken));

      const payload = buildStudentPayload({
        name: studentNameAdd,
        dob: studentDOB,
        gender: selectedGender,
        id: studentID.trim(),
        studentClass: studentClass.trim(),
        session: academicSession.trim(),
        term: selectedTerm,
      });

      // With a photo the request is multipart/form-data (file attached);
      // without one it is plain JSON. If the backend rejects an optional field
      // (it "should not exist" or its value is not accepted), drop it and try
      // again. If it says "Unexpected field" for the photo, the next possible
      // photo field name is tried. Network failures (e.g. the server waking
      // up) are retried too.
      let res;
      let networkRetries = 0;
      let photoFieldIndex = 0;
      for (let attempt = 0; attempt < 10; attempt++) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        };
        let body;
        if (selectedFile) {
          // Do NOT set Content-Type here: the browser adds the multipart
          // boundary itself.
          body = buildStudentFormData(
            payload,
            selectedFile,
            PHOTO_FIELD_NAMES[photoFieldIndex],
          );
        } else {
          headers["Content-Type"] = "application/json";
          body = JSON.stringify(payload);
        }

        try {
          res = await fetch(STUDENTS_API_URL, {
            method: "POST",
            headers,
            body,
          });
        } catch (_) {
          if (networkRetries < 2) {
            networkRetries++;
            await wait(3000);
            continue;
          }
          throw new Error(
            "Could not reach the server. Please check your connection and try again.",
          );
        }

        if (res.ok || res.status !== 400) break;

        let errBody = {};
        try {
          errBody = await res.clone().json();
        } catch (_) {
          break;
        }
        const messages = getErrorMessages(errBody);

        // The server did not expect the photo under this field name
        if (selectedFile && messages.some((m) => /unexpected field/i.test(m))) {
          if (photoFieldIndex < PHOTO_FIELD_NAMES.length - 1) {
            photoFieldIndex++;
            continue;
          }
          throw new Error(
            "The server did not accept the photo upload. Please check the photo field name expected by the backend.",
          );
        }

        const rejected = findRejectedKeys(messages, payload);
        if (rejected.length === 0) break;

        console.warn("Backend does not accept these fields:", rejected);
        rejected.forEach((key) => delete payload[key]);
      }

      if (!res.ok) {
        let message = "Could not add student. Please try again.";
        if (res.status === 401) {
          message = authErrorMessage(contextToken);
        } else {
          try {
            const errBody = await res.json();
            const raw = errBody?.message || errBody?.error || message;
            message = Array.isArray(raw) ? raw.join(", ") : raw;
          } catch (_) {
            // keep the default message
          }
        }
        throw new Error(message);
      }

      await fetchStudents();

      setShowStudentSuccess(true);
      setStudentNameAdd("");
      setStudentID("");
      setSelectedFile(null);
      setStudentClass("");
      setAcademicSession("");
      setSelectedGender("");
      setStudentDOB(null);
    } catch (err) {
      setSaveStudentError(
        err.message || "Could not add student. Please try again.",
      );
    } finally {
      setIsSavingStudent(false);
    }
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

  // Shared input class — base (light-mode) styling; dark-mode overrides applied inline via isDarkMode.
  // NOTE: font size is 16px on purpose — iOS Safari zooms into any input below 16px on focus.
  const inputClass =
    "w-full h-[52px] rounded-[8px] border py-2 px-3 text-[16px] font-normal focus:outline-none";

  const inputClassLight =
    "border-[#0000001F] bg-white text-[#303030] placeholder:text-[16px] placeholder:text-gray-400 focus:border-[#FF7B17]";

  const inputClassDark =
    "border-gray-600 bg-transparent text-white placeholder:text-[16px] placeholder:text-gray-400 focus:border-[#FF7B17]";

  // Shared dropdown button class
  const dropdownBtnClassLight =
    "w-full h-[52px] px-3 border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between text-[14px]";

  const dropdownBtnClassDark =
    "w-full h-[52px] px-3 border border-gray-600 rounded-[8px] bg-transparent flex items-center justify-between text-[14px]";

  // Shared dropdown list panel + item classes
  const dropdownPanelLight =
    "absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md";
  const dropdownPanelDark =
    "absolute z-10 mt-1 w-full bg-[#1e1e1e] border border-gray-700 rounded-[8px] shadow-md";
  const dropdownItemLight =
    "px-4 py-3 text-[14px] text-[#303030] cursor-pointer hover:bg-[#EFF6FF]";
  const dropdownItemDark =
    "px-4 py-3 text-[14px] text-white cursor-pointer hover:bg-[#2a2a2a]";

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-screen">
      {/* ================= NOTIFICATIONS ================= */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowNotifications(false)}
          />
          <div
            className={`fixed inset-0 z-50 overflow-y-auto max-w-[430px] mx-auto transition-colors duration-200 ${
              isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"
            }`}
          >
            <div className="p-5">
              <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setShowNotifications(false)}>
                  <img
                    src={back}
                    alt="back"
                    className={isDarkMode ? "invert" : ""}
                  />
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
                    className={`rounded-[6px] p-3 ${
                      isDarkMode
                        ? "border border-gray-600 bg-transparent"
                        : "border border-[#D9D9D9] bg-white"
                    }`}
                  >
                    <p
                      className={`text-[14px] font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {title}
                    </p>
                    <p
                      className={`text-[12px] ${
                        isDarkMode ? "text-gray-400" : "text-[#656363]"
                      }`}
                    >
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= HOME SCREEN ================= */}
      {screen === "home" && (
        <div
          className={`pb-24 transition-colors duration-200 ${
            isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-6">
            <div className="flex gap-3 items-center">
              <img
                src={profileImage || edith}
                alt="profile"
                className="w-10 h-10 flex-shrink-0 rounded-full object-cover"
              />
              <div>
                <p
                  className={`text-[13px] ${isDarkMode ? "text-gray-300" : ""}`}
                >
                  Welcome,
                </p>
                <p
                  className={`text-[15px] font-semibold leading-tight ${
                    isDarkMode ? "text-white" : ""
                  }`}
                >
                  {fullName}
                </p>
                {grade && room && (
                  <p
                    className={`text-[12px] ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Grade {grade}. Room {room}.
                  </p>
                )}
              </div>
            </div>
            <FaRegBell
              className={`w-5 h-5 cursor-pointer flex-shrink-0 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              onClick={() => setShowNotifications(true)}
            />
          </div>

          <h4
            className={`text-[17px] font-medium px-5 mt-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Catch Up on Today's Quick Stats
          </h4>

          {/* Three circles — outlined dark card in dark mode, matching the reference screenshot */}
          <div
            className={`mt-4 rounded-[10px] mx-5 py-5 px-2 ${
              isDarkMode
                ? "border border-gray-600 bg-transparent"
                : "bg-[#FFF0E5E0]"
            }`}
          >
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
                    <div
                      className={`absolute inset-0 flex items-center justify-center text-[13px] font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {pct}%
                    </div>
                  </div>
                  <p
                    className={`mt-2 font-semibold text-[11px] w-[72px] text-center leading-tight ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h5
            className={`text-[17px] font-medium px-5 mt-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Get on Today's Task
          </h5>

          {/* Task grid — outlined cards, transparent in dark mode so the dark page bg shows through */}
          <div className="grid grid-cols-2 gap-3 px-5 mt-4">
            <button
              onClick={() => setScreen("post-homework")}
              className={`border rounded-[8px] p-3 text-left h-[90px] ${
                isDarkMode
                  ? "border-[#3B82F6] bg-transparent"
                  : "border-[#3B82F6] bg-white"
              }`}
            >
              <img src={hm} alt="" className="w-9" />
              <p
                className={`font-bold text-[13px] mt-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Post Homework
              </p>
            </button>

            <button
              onClick={() => setScreen("mark-attendance")}
              className={`border rounded-[8px] p-3 text-left h-[90px] ${
                isDarkMode
                  ? "border-[#F97316] bg-transparent"
                  : "border-[#F97316] bg-white"
              }`}
            >
              <img src={att} alt="" className="w-9" />
              <p
                className={`font-bold text-[13px] mt-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Mark Attendance
              </p>
            </button>

            <button
              onClick={() => setScreen("add-grade")}
              className={`border rounded-[8px] p-3 text-left h-[90px] ${
                isDarkMode
                  ? "border-[#0F766E] bg-transparent"
                  : "border-[#0F766E] bg-white"
              }`}
            >
              <img src={gd} alt="" className="w-9" />
              <p
                className={`font-bold text-[13px] mt-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Add Grade
              </p>
            </button>

            <button
              onClick={() => setScreen("add-students")}
              className={`border rounded-[8px] p-3 text-left h-[90px] ${
                isDarkMode
                  ? "border-[#3B82F6] bg-transparent"
                  : "border-[#3B82F6] bg-white"
              }`}
            >
              <img src={st} alt="" className="w-9" />
              <p
                className={`font-bold text-[13px] mt-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Add Students
              </p>
            </button>
          </div>

          {/* Recent Messages */}
          <p
            className={`font-medium text-[17px] px-5 mt-6 mb-3 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
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
                className={`flex items-center gap-3 px-3 py-3 rounded-[6px] ${
                  isDarkMode
                    ? "border border-gray-600 bg-transparent"
                    : "bg-[#F8F8F8] border border-[#0000001F]"
                }`}
              >
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="w-[48px] h-[48px] rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p
                      className={`font-semibold text-[14px] truncate ${
                        isDarkMode ? "text-white" : "text-[#1a1a1a]"
                      }`}
                    >
                      {chat.name}
                    </p>
                    <p
                      className={`text-[11px] ml-2 flex-shrink-0 ${
                        isDarkMode ? "text-gray-400" : "text-[#888]"
                      }`}
                    >
                      {chat.time}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-[2px]">
                    <p
                      className={`text-[12px] truncate ${
                        isDarkMode ? "text-gray-300" : "text-[#666]"
                      }`}
                    >
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
      {/* Always black (#000000): isDarkMode is forced to true inside this
          screen only, so it ignores the device's light/dark setting. */}
      {screen === "mark-attendance" &&
        (() => {
          const isDarkMode = true;
          return (
            <div
              className={`min-h-screen pb-28 transition-colors duration-200 ${
                isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"
              }`}
            >
              <div
                className="flex items-center gap-4 px-5 py-5 cursor-pointer"
                onClick={() => setScreen("home")}
              >
                <img
                  src={back}
                  alt="back"
                  className={isDarkMode ? "invert" : ""}
                />
                <h2
                  className={`text-[20px] font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Attendance
                </h2>
              </div>

              {/* Class Attendance header */}
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
                    className={`font-medium text-[13px] ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Today
                  </p>
                </div>
              </div>

              {/* Date navigator — outlined, transparent in dark mode */}
              <div
                className={`rounded-[6px] mx-5 mt-4 h-[45px] flex items-center justify-between px-3 ${
                  isDarkMode
                    ? "border border-gray-600 bg-transparent"
                    : "border border-[#E3E3E3] bg-white"
                }`}
              >
                <img
                  src={back3}
                  alt="previous day"
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
                  alt="next day"
                  onClick={handleNextDay}
                  className={`cursor-pointer flex-shrink-0 w-5 h-5 ${
                    isDarkMode ? "invert" : ""
                  }`}
                />
              </div>

              {/* Today's Summary — outlined, transparent in dark mode */}
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
                  {/* Present */}
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

                  {/* Absent */}
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

                  {/* Late */}
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

              {/* Loading / error / empty states for the student list */}
              {isLoadingStudents && students.length === 0 && (
                <p
                  className={`px-5 text-[13px] ${
                    isDarkMode ? "text-gray-400" : "text-[#9C9C9C]"
                  }`}
                >
                  Loading students...
                </p>
              )}
              {studentsError && (
                <p className="px-5 text-[13px] text-red-500">{studentsError}</p>
              )}
              {!isLoadingStudents &&
                !studentsError &&
                students.length === 0 && (
                  <p
                    className={`px-5 text-[13px] ${
                      isDarkMode ? "text-gray-400" : "text-[#9C9C9C]"
                    }`}
                  >
                    No students yet. Add a student to see them here.
                  </p>
                )}

              {/* Student rows — outlined, transparent in dark mode */}
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
                    {/* Left: avatar + info */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <img
                        src={student.image}
                        alt={student.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/default-avatar.png";
                        }}
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
                        <p
                          className={`font-medium text-[12px] ${
                            isDarkMode ? "text-gray-400" : "text-[#9C9C9C]"
                          }`}
                        >
                          ID: {student.id}
                        </p>
                      </div>
                    </div>

                    {/* Right: status icons */}
                    <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                      <img
                        src={
                          studentAttendance[student.id] === "present"
                            ? presC
                            : pres
                        }
                        onClick={() => handleStatusClick(student.id, "present")}
                        className="cursor-pointer w-7 h-7"
                        alt="present"
                      />
                      <img
                        src={
                          studentAttendance[student.id] === "absent"
                            ? absC
                            : abs
                        }
                        onClick={() => handleStatusClick(student.id, "absent")}
                        className="cursor-pointer w-7 h-7"
                        alt="absent"
                      />
                      <img
                        src={
                          studentAttendance[student.id] === "late"
                            ? lateC
                            : latee
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
              <div
                className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-50 transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-[#000000] border-gray-800"
                    : "bg-white border-[#E3E3E3]"
                }`}
              >
                {saveAttendanceError && (
                  <p className="text-red-500 text-[13px] mb-2">
                    {saveAttendanceError}
                  </p>
                )}
                <button
                  onClick={handleSaveAttendance}
                  disabled={isSavingAttendance || students.length === 0}
                  className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white flex items-center justify-center gap-2 transition-all ${
                    isSavingAttendance || students.length === 0
                      ? "bg-[#FF7B17]/60 cursor-not-allowed"
                      : "bg-[#FF7B17] cursor-pointer"
                  }`}
                >
                  {isSavingAttendance && (
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-90"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {isSavingAttendance ? "Saving..." : "Save"}
                </button>
              </div>

              {/* Success sheet */}
              {showAttendanceSuccess && (
                <div className="fixed inset-0 flex items-end justify-center z-[60]">
                  <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setShowAttendanceSuccess(false)}
                  />
                  <div className="relative rounded-t-[20px] w-full max-w-[430px] p-6 shadow-2xl bg-[#1e1e1e] attendance-sheet-up">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-green-900/40">
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
                      <h3 className="text-[20px] font-bold mb-2 text-white">
                        Successful!
                      </h3>
                      <p className="text-[14px] text-center mb-6 text-gray-400">
                        Attendance has been saved
                      </p>
                      <button
                        onClick={() => setShowAttendanceSuccess(false)}
                        className="w-full bg-[#FF7B17] h-[50px] rounded-[10px] font-bold text-[18px] text-white"
                      >
                        Okay
                      </button>
                    </div>
                  </div>
                  <style>{`
      @keyframes attendanceSheetUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .attendance-sheet-up { animation: attendanceSheetUp 0.3s ease-out; }
    `}</style>
                </div>
              )}
            </div>
          );
        })()}

      {/* ================= ADD GRADE SCREEN ================= */}
      {screen === "add-grade" && (
        <div
          className={`relative min-h-screen transition-colors duration-200 ${
            isDarkMode ? "bg-[#000000] text-white" : "bg-white text-[#303030]"
          }`}
        >
          <div className="pb-28 overflow-y-auto">
            <div
              className="flex items-center gap-4 px-5 py-5 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img
                src={back}
                alt="back"
                className={isDarkMode ? "invert" : ""}
              />
              <h2
                className={`text-[20px] font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Add Grade
              </h2>
            </div>

            <div className="px-5 flex flex-col gap-5">
              {/* Student Name */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="E.g. John Smith"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  style={{ fontSize: "16px" }}
                  className={`${inputClass} ${isDarkMode ? inputClassDark : inputClassLight}`}
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
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
                    className={
                      isDarkMode ? dropdownBtnClassDark : dropdownBtnClassLight
                    }
                  >
                    <span
                      className={
                        selectedSubject
                          ? isDarkMode
                            ? "text-white"
                            : "text-[#303030]"
                          : "text-gray-400"
                      }
                    >
                      {selectedSubject || "Select subject"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isSubjectOpen ? "rotate-180" : ""
                      } ${isDarkMode ? "invert" : ""}`}
                    />
                  </button>
                  {isSubjectOpen && (
                    <div
                      className={
                        isDarkMode ? dropdownPanelDark : dropdownPanelLight
                      }
                    >
                      {subjects.map((subject) => (
                        <div
                          key={subject}
                          onClick={() => handleSelect("subject", subject)}
                          className={
                            isDarkMode ? dropdownItemDark : dropdownItemLight
                          }
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
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
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
                    className={
                      isDarkMode ? dropdownBtnClassDark : dropdownBtnClassLight
                    }
                  >
                    <span
                      className={
                        selectedAssessment
                          ? isDarkMode
                            ? "text-white"
                            : "text-[#303030]"
                          : "text-gray-400"
                      }
                    >
                      {selectedAssessment || "Select an assessment"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isAssessmentOpen ? "rotate-180" : ""
                      } ${isDarkMode ? "invert" : ""}`}
                    />
                  </button>
                  {isAssessmentOpen && (
                    <div
                      className={
                        isDarkMode ? dropdownPanelDark : dropdownPanelLight
                      }
                    >
                      {assessments.map((assessment) => (
                        <div
                          key={assessment}
                          onClick={() => handleSelect("assessment", assessment)}
                          className={
                            isDarkMode ? dropdownItemDark : dropdownItemLight
                          }
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
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
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
                    className={
                      isDarkMode ? dropdownBtnClassDark : dropdownBtnClassLight
                    }
                  >
                    <span
                      className={
                        selectedGrade
                          ? isDarkMode
                            ? "text-white"
                            : "text-[#303030]"
                          : "text-gray-400"
                      }
                    >
                      {selectedGrade || "Select grade"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isGradeOpen ? "rotate-180" : ""
                      } ${isDarkMode ? "invert" : ""}`}
                    />
                  </button>
                  {isGradeOpen && (
                    <div
                      className={
                        isDarkMode ? dropdownPanelDark : dropdownPanelLight
                      }
                    >
                      {grades.map((g) => (
                        <div
                          key={g}
                          onClick={() => handleSelect("grade", g)}
                          className={
                            isDarkMode ? dropdownItemDark : dropdownItemLight
                          }
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
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Total Mark
                </label>
                <input
                  type="text"
                  placeholder="Input Maximum Score"
                  value={totalMark}
                  onChange={(e) => setTotalMark(e.target.value)}
                  style={{ fontSize: "16px" }}
                  className={`${inputClass} ${isDarkMode ? inputClassDark : inputClassLight}`}
                />
              </div>

              {/* Date — a button (not an input) so iOS never focus-zooms it */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Date
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    style={{ fontSize: "16px" }}
                    className={`w-full h-[52px] rounded-[8px] border px-3 pr-10 text-left focus:outline-none focus:border-[#FF7B17] ${
                      isDarkMode
                        ? "border-gray-600 bg-transparent"
                        : "border-[#0000001F] bg-white"
                    } ${
                      selectedDate
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }`}
                  >
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-GB")
                      : "Select date"}
                  </button>
                  <img
                    src={cal}
                    alt="calendar"
                    onClick={() => setIsOpen(true)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 ${
                      isDarkMode ? "invert" : ""
                    }`}
                  />
                  {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 px-4">
                      <div
                        className={`rounded-xl p-4 shadow-lg w-full max-w-[320px] ${
                          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                        }`}
                      >
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
          <div
            className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-40 transition-colors duration-200 ${
              isDarkMode
                ? "bg-[#000000] border-[#2A2A2A]"
                : "bg-white border-[#E3E3E3]"
            }`}
          >
            <button
              onClick={handleSaveGrade}
              disabled={!isFormValid}
              className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] transition-all ${
                isFormValid
                  ? "bg-[#FF7B17] hover:bg-[#E06A10] text-white cursor-pointer shadow-md"
                  : isDarkMode
                    ? "bg-[#2A2A2A] text-gray-500 cursor-not-allowed border border-[#333333]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
              <div
                className={`relative rounded-t-[20px] w-full max-w-[430px] p-6 shadow-2xl animate-slide-up ${
                  isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isDarkMode ? "bg-green-900/40" : "bg-green-100"
                    }`}
                  >
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
                  <h3
                    className={`text-[20px] font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-[#303030]"
                    }`}
                  >
                    Successful!
                  </h3>
                  <p
                    className={`text-[14px] text-center mb-6 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
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
        <div
          className={`relative min-h-screen transition-colors duration-200 ${
            isDarkMode ? "bg-[#000000] text-white" : "bg-white text-black"
          }`}
        >
          <div className="pb-72 overflow-y-auto">
            <div
              className="flex items-center gap-4 px-5 py-5 cursor-pointer"
              onClick={() => setScreen("home")}
            >
              <img
                src={back}
                alt="back"
                className={isDarkMode ? "invert" : ""}
              />
              <h2
                className={`text-[20px] font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Add Student
              </h2>
            </div>

            <div className="px-5 flex flex-col gap-5">
              <h4
                className={`font-semibold text-[17px] ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Student Information
              </h4>

              {/* Student Name */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Student Name
                </label>
                <input
                  type="text"
                  placeholder="E.g. John Smith"
                  value={studentNameAdd}
                  onChange={(e) => setStudentNameAdd(e.target.value)}
                  style={{ fontSize: "16px" }}
                  className={`${inputClass} ${isDarkMode ? inputClassDark : inputClassLight}`}
                />
              </div>

              {/* Date of Birth — a button (not an input) so iOS never focus-zooms it */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Date Of Birth
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDOBOpen(true)}
                    style={{ fontSize: "16px" }}
                    className={`w-full h-[52px] rounded-[8px] border px-3 pr-10 text-left focus:outline-none focus:border-[#FF7B17] ${
                      isDarkMode
                        ? "border-gray-600 bg-transparent"
                        : "border-[#0000001F] bg-white"
                    } ${
                      studentDOB
                        ? isDarkMode
                          ? "text-white"
                          : "text-[#303030]"
                        : "text-gray-400"
                    }`}
                  >
                    {studentDOB
                      ? studentDOB.toLocaleDateString("en-GB")
                      : "Select date"}
                  </button>
                  <img
                    src={cal}
                    alt="calendar"
                    onClick={() => setIsDOBOpen(true)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5 ${
                      isDarkMode ? "invert" : ""
                    }`}
                  />
                  {isDOBOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 px-4">
                      <div
                        className={`rounded-xl p-4 shadow-lg w-full max-w-[320px] ${
                          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                        }`}
                      >
                        <div
                          className={`dob-picker ${isDarkMode ? "dob-dark" : ""}`}
                        >
                          <style>{`
                            .dob-picker .react-datepicker {
                              width: 100%;
                              border: none;
                              background: transparent;
                              font-family: inherit;
                            }
                            .dob-picker .react-datepicker__month-container {
                              float: none;
                              width: 100%;
                            }
                            .dob-picker .react-datepicker__header {
                              background: transparent;
                              border-bottom: none;
                              padding: 0;
                            }
                            .dob-picker .react-datepicker__month {
                              margin: 0;
                            }
                            .dob-picker .react-datepicker__day-names,
                            .dob-picker .react-datepicker__week {
                              display: flex;
                              justify-content: space-around;
                            }
                            .dob-picker .react-datepicker__day-name,
                            .dob-picker .react-datepicker__day {
                              width: 2rem;
                              line-height: 2rem;
                              margin: 0.1rem;
                              border-radius: 9999px;
                              font-size: 13px;
                              color: #303030;
                            }
                            .dob-picker .react-datepicker__day-name {
                              color: #9c9c9c;
                              font-weight: 500;
                            }
                            .dob-picker .react-datepicker__day:hover {
                              background: #fff0e5;
                            }
                            .dob-picker .react-datepicker__day--keyboard-selected {
                              background: transparent;
                              color: inherit;
                            }
                            .dob-picker .react-datepicker__day--selected,
                            .dob-picker .react-datepicker__day--selected:hover {
                              background: #ff7b17;
                              color: #ffffff;
                              font-weight: 600;
                            }
                            .dob-picker .react-datepicker__day--today {
                              font-weight: 700;
                              box-shadow: inset 0 0 0 1px #ff7b17;
                            }
                            .dob-picker .react-datepicker__day--disabled,
                            .dob-picker .react-datepicker__day--disabled:hover {
                              color: #c4c4c4;
                              background: transparent;
                              cursor: not-allowed;
                            }
                            .dob-picker .react-datepicker__day--outside-month {
                              visibility: hidden;
                            }
                            .dob-header {
                              display: flex;
                              gap: 8px;
                              margin-bottom: 10px;
                            }
                            .dob-header select {
                              flex: 1;
                              min-width: 0;
                              height: 40px;
                              padding: 0 8px;
                              border-radius: 8px;
                              border: 1px solid #0000001f;
                              background: #ffffff;
                              color: #303030;
                              font-size: 16px;
                              font-weight: 500;
                              outline: none;
                            }
                            .dob-header select:focus {
                              border-color: #ff7b17;
                            }
                            .dob-dark .react-datepicker__day-name {
                              color: #9ca3af;
                            }
                            .dob-dark .react-datepicker__day {
                              color: #ffffff;
                            }
                            .dob-dark .react-datepicker__day:hover {
                              background: #2a2a2a;
                            }
                            .dob-dark .react-datepicker__day--selected,
                            .dob-dark .react-datepicker__day--selected:hover {
                              background: #ff7b17;
                              color: #ffffff;
                            }
                            .dob-dark .react-datepicker__day--disabled,
                            .dob-dark .react-datepicker__day--disabled:hover {
                              color: #4b5563;
                              background: transparent;
                            }
                            .dob-dark .dob-header select {
                              background: #2a2a2a;
                              border-color: #4b5563;
                              color: #ffffff;
                            }
                          `}</style>
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
                            renderCustomHeader={({
                              date,
                              changeYear,
                              changeMonth,
                            }) => (
                              <div className="dob-header">
                                <select
                                  value={date.getMonth()}
                                  onChange={(e) =>
                                    changeMonth(Number(e.target.value))
                                  }
                                >
                                  {DOB_MONTHS.map((month, index) => (
                                    <option
                                      key={month}
                                      value={index}
                                      disabled={
                                        date.getFullYear() ===
                                          new Date().getFullYear() &&
                                        index > new Date().getMonth()
                                      }
                                    >
                                      {month}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  value={date.getFullYear()}
                                  onChange={(e) =>
                                    changeYear(Number(e.target.value))
                                  }
                                >
                                  {DOB_YEARS.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                          />
                        </div>
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
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Gender
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                    className={
                      isDarkMode ? dropdownBtnClassDark : dropdownBtnClassLight
                    }
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
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isGenderOpen ? "rotate-180" : ""
                      } ${isDarkMode ? "invert" : ""}`}
                    />
                  </button>
                  {isGenderOpen && (
                    <div
                      className={
                        isDarkMode ? dropdownPanelDark : dropdownPanelLight
                      }
                    >
                      {genders.map((gender) => (
                        <div
                          key={gender}
                          onClick={() => handleSelectGender(gender)}
                          className={
                            isDarkMode ? dropdownItemDark : dropdownItemLight
                          }
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
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Student ID
                </label>
                <input
                  type="text"
                  placeholder="E.g. Stu/020/25h"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  style={{ fontSize: "16px" }}
                  className={`${inputClass} ${isDarkMode ? inputClassDark : inputClassLight}`}
                />
              </div>

              {/* Upload Photo */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Upload Photo
                </label>
                <div
                  className={`flex items-center justify-between rounded-[8px] h-[52px] px-3 cursor-pointer ${
                    isDarkMode
                      ? "border border-gray-600 bg-transparent"
                      : "border border-[#0000001F] bg-white"
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
                    className={`w-[18px] h-[18px] flex-shrink-0 ml-2 ${
                      isDarkMode ? "invert" : ""
                    }`}
                  />
                </div>
              </div>

              <h4
                className={`font-semibold text-[17px] pt-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Class & Academic Info
              </h4>

              {/* Class + Academic Session side by side */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <label
                    className={`block text-[15px] font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-[#303030]"
                    }`}
                  >
                    Class
                  </label>
                  <input
                    type="text"
                    placeholder="e.g Grade 5"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    style={{ fontSize: "16px" }}
                    className={`w-full h-[52px] rounded-[8px] border px-3 text-[16px] focus:outline-none focus:border-[#FF7B17] ${
                      isDarkMode
                        ? "border-gray-600 bg-transparent text-white placeholder:text-gray-400"
                        : "border-[#0000001F] placeholder:text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <label
                    className={`block text-[15px] font-medium mb-2 ${
                      isDarkMode ? "text-white" : "text-[#303030]"
                    }`}
                  >
                    Academic Session
                  </label>
                  <input
                    type="text"
                    placeholder="E.g 2024/2025"
                    value={academicSession}
                    onChange={(e) => setAcademicSession(e.target.value)}
                    style={{ fontSize: "16px" }}
                    className={`w-full h-[52px] rounded-[8px] border px-3 text-[16px] focus:outline-none focus:border-[#FF7B17] ${
                      isDarkMode
                        ? "border-gray-600 bg-transparent text-white placeholder:text-gray-400"
                        : "border-[#0000001F] placeholder:text-gray-400"
                    }`}
                  />
                </div>
              </div>

              {/* Term */}
              <div>
                <label
                  className={`block text-[15px] font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-[#303030]"
                  }`}
                >
                  Term
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsTermOpen(!isTermOpen)}
                    className={
                      isDarkMode ? dropdownBtnClassDark : dropdownBtnClassLight
                    }
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
                      alt="dropdown"
                      className={`transition-transform duration-200 ${
                        isTermOpen ? "rotate-180" : ""
                      } ${isDarkMode ? "invert" : ""}`}
                    />
                  </button>
                  {isTermOpen && (
                    <div
                      className={
                        isDarkMode ? dropdownPanelDark : dropdownPanelLight
                      }
                    >
                      {terms.map((term) => (
                        <div
                          key={term}
                          onClick={() => handleSelectTerm(term)}
                          className={
                            isDarkMode ? dropdownItemDark : dropdownItemLight
                          }
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
          <div
            className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto border-t px-5 py-3 z-40 transition-colors duration-200 ${
              isDarkMode
                ? "bg-[#000000] border-gray-800"
                : "bg-white border-[#E3E3E3]"
            }`}
          >
            {saveStudentError && (
              <p className="text-red-500 text-[13px] mb-2">
                {saveStudentError}
              </p>
            )}
            <button
              onClick={handleSaveStudent}
              disabled={!isStudentFormValid || isSavingStudent}
              className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-all ${
                isStudentFormValid && !isSavingStudent
                  ? "bg-[#FF7B17] cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isSavingStudent ? "Adding..." : "Add Student"}
            </button>
          </div>

          {/* Success Modal */}
          {showStudentSuccess && (
            <div className="fixed inset-0 flex items-end justify-center z-50">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={handleCloseStudentSuccess}
              />
              <div
                className={`relative rounded-t-[20px] w-full max-w-[430px] p-6 shadow-2xl animate-slide-up ${
                  isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                      isDarkMode ? "bg-green-900/40" : "bg-green-100"
                    }`}
                  >
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
                  <h3
                    className={`text-[20px] font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-[#303030]"
                    }`}
                  >
                    Successful!
                  </h3>
                  <p
                    className={`text-[14px] text-center mb-6 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
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

export default HomePage;
