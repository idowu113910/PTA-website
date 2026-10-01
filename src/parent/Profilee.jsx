import React, { useRef, useState, useEffect } from "react";
import ed from "../assets/edithh.svg";
import btn from "../assets/Right btn.svg";
import tpi from "../assets/TPI.svg";
import hs from "../assets/H & S.svg";
import back from "../assets/back2.svg";
import pn from "../assets/pencil.svg";
import sth from "../assets/switchh.svg";
import sthOn from "../assets/ON.svg";
import { useUser } from "../teacher/UserContext";
import lkd from "../assets/linkedstd.svg";
import bk from "../assets/back parent.svg";
import add from "../assets/add student.svg";
import div from "../assets/deku.svg";
import cir from "../assets/round.svg";
import cnc from "../assets/cancel back btn.svg";
import { useNavigate } from "react-router-dom";
import BottomNavigate from "../components/BottomNavigation";
import logout from "../assets/logout section.svg";

const Grade = () => {
  // ── User Context ─────────────────────────────────────────────────
  const {
    fullName,
    email,
    updateFullName,
    updateEmail,
    profileImage,
    updateProfileImage,
  } = useUser();

  // ── Device / System Native Theme State ───────────────────────────
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check saved preference first; fall back to device system setting
    const savedTheme = localStorage.getItem("app_theme_mode");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Listen to device light/dark mode preference changes automatically
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleDeviceThemeChange = (e) => {
      if (!localStorage.getItem("app_theme_mode")) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleDeviceThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleDeviceThemeChange);
  }, []);

  // Sync Tailwind root 'dark' class on <html> or <body>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle manual light/dark toggle switch click
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("app_theme_mode", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const codeRef = useRef(null);

  // ── Screen States ────────────────────────────────────────────────
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [linkedStudent, setLinkedStudents] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showScreen, setShowScreen] = useState(false);

  // ── Edit Profile Temp States ────────────────────────────────────
  const [tempFullName, setTempFullName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTempFullName(fullName || "");
    setTempEmail(email || "");
  }, [fullName, email]);

  // ── Inline Edit States ──────────────────────────────────────────
  const [genderValue, setGenderValue] = useState("Female");
  const [tempGender, setTempGender] = useState("Female");
  const [isEditingGender, setIsEditingGender] = useState(false);

  const [classValue, setClassValue] = useState("Grade 6, Room 201");
  const [tempClass, setTempClass] = useState("Grade 6, Room 201");
  const [isEditingClass, setIsEditingClass] = useState(false);

  const [ageValue, setAgeValue] = useState("12");
  const [tempAge, setTempAge] = useState("12");
  const [isEditingAge, setIsEditingAge] = useState(false);

  // ── Mobile Phone States ─────────────────────────────────────────
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [savedCode, setSavedCode] = useState("+234");
  const [savedNumber, setSavedNumber] = useState("703 543 2234");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneToast, setPhoneToast] = useState("");

  // Lock scrolling when modal or bottom sheet is active
  useEffect(() => {
    document.body.style.overflow =
      showScreen || showLogoutModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showScreen, showLogoutModal]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditPhone = () => {
    setAreaCode(savedCode);
    setPhoneNum(savedNumber);
    setPhoneError("");
    setPhoneToast("");
    setIsEditingPhone(true);
    setTimeout(() => codeRef.current?.focus(), 50);
  };

  const closeEditPhone = () => {
    setIsEditingPhone(false);
    setPhoneError("");
  };

  const handleAreaCodeChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith("+")) val = "+" + val.replace(/\+/g, "");
    setAreaCode(val);
  };

  const validatePhone = () => {
    if (!areaCode.startsWith("+") || areaCode.length < 2) {
      setPhoneError("Area code must start with + (e.g. +234)");
      return false;
    }
    if (phoneNum.replace(/\s/g, "").length < 6) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handlePhoneSave = () => {
    if (!validatePhone()) return;
    setSavedCode(areaCode.trim());
    setSavedNumber(phoneNum.trim());
    setIsEditingPhone(false);
    setPhoneToast("Number saved successfully");
    setTimeout(() => setPhoneToast(""), 3000);
  };

  // Reusable Component Helpers
  const MenuRow = ({ icon, label, onClick }) => (
    <div
      onClick={onClick}
      className={`flex w-full h-[57px] rounded-[10px] py-4 px-3 gap-4 mt-5 items-center cursor-pointer transition-colors duration-200 ${
        isDarkMode
          ? "border border-gray-800 bg-[#1e1e1e] hover:bg-[#252525]"
          : "border border-[#9F9D9D] bg-white hover:bg-gray-50"
      }`}
    >
      <img
        src={icon}
        alt=""
        className={`w-6 h-6 flex-shrink-0 ${isDarkMode ? "invert brightness-200" : ""}`}
      />
      <p
        className={`font-medium text-[18px] flex-1 truncate ${isDarkMode ? "text-white" : "text-[#1A1818]"}`}
      >
        {label}
      </p>
      <img
        src={btn}
        alt=""
        className={`w-[12px] h-[8px] flex-shrink-0 ${isDarkMode ? "invert brightness-200" : ""}`}
      />
    </div>
  );

  const FieldRow = ({ value, onEdit }) => (
    <div
      className={`w-full h-[57px] rounded-[8px] py-2 px-3 flex items-center justify-between ${
        isDarkMode
          ? "border border-gray-700 bg-[#1c1c1c]"
          : "border border-black/10 bg-white"
      }`}
    >
      <span
        className={`text-[14px] truncate flex-1 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
      >
        {value}
      </span>
      <button onClick={onEdit} className="p-1 flex-shrink-0">
        <img
          src={pn}
          alt="edit"
          className={`w-[18px] h-[18px] ${isDarkMode ? "invert brightness-200" : ""}`}
        />
      </button>
    </div>
  );

  const SaveCancelRow = ({ onSave, onCancel }) => (
    <div className="flex gap-2 mt-1">
      <button
        onClick={onSave}
        className="flex-1 h-[42px] bg-[#E8620A] hover:bg-[#d45607] text-white rounded-[8px] text-[13px] font-medium transition-colors"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className={`flex-1 h-[42px] rounded-[8px] text-[13px] font-medium transition-colors ${
          isDarkMode
            ? "border border-gray-700 text-gray-200 bg-[#1c1c1c] hover:bg-[#282828]"
            : "border border-black/10 text-[#303030] hover:bg-gray-100"
        }`}
      >
        Cancel
      </button>
    </div>
  );

  // ────────────────────────────────────────────────────────────────
  // SCREEN: Linked Students
  // ────────────────────────────────────────────────────────────────
  if (linkedStudent) {
    return (
      <div
        className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto flex flex-col pb-6 transition-colors duration-200 ${
          isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
        }`}
      >
        <div className="px-5 pt-6 flex-1">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setLinkedStudents(false)}>
              <img
                src={bk}
                alt="back"
                className={`w-6 h-6 ${isDarkMode ? "invert brightness-200" : ""}`}
              />
            </button>
            <p
              className={`font-medium text-[20px] flex-1 ml-3 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Linked Profile
            </p>
            <button onClick={() => setShowScreen(true)}>
              <img
                src={add}
                alt="add"
                className={`w-6 h-6 ${isDarkMode ? "invert brightness-200" : ""}`}
              />
            </button>
          </div>

          {["Divine Ekubor", "Immaculate Ekubor"].map((name) => (
            <div
              key={name}
              className={`w-full rounded-[8px] py-3 px-3 mt-4 flex items-center justify-between ${
                isDarkMode
                  ? "border border-gray-800 bg-[#1c1c1c]"
                  : "border border-[#D9D9D9] bg-[#FBFBFB]"
              }`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={div}
                  alt=""
                  className="w-[55px] h-[55px] flex-shrink-0"
                />
                <div className="min-w-0">
                  <p
                    className={`font-bold text-[16px] truncate ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    {name}
                  </p>
                  <p
                    className={`font-normal text-[14px] truncate ${isDarkMode ? "text-gray-400" : "text-black"}`}
                  >
                    Grade 6. Room 201. Mr Robinson
                  </p>
                </div>
              </div>
              <img
                src={cir}
                alt=""
                className={`w-[28px] h-[28px] flex-shrink-0 ml-3 ${isDarkMode ? "invert brightness-200" : ""}`}
              />
            </div>
          ))}
        </div>

        <div
          className={`px-5 pb-6 pt-4 ${isDarkMode ? "border-t border-gray-800" : "border-t border-[#EAEAEA]"}`}
        >
          <button className="h-[50px] w-full bg-[#FF7B17] hover:bg-[#e0680d] text-white text-[18px] font-bold rounded-[10px] transition-colors">
            Save changes
          </button>
        </div>

        {/* Add Child Backdrop */}
        <div
          onClick={() => setShowScreen(false)}
          className={`fixed inset-0 bg-black/50 transition-opacity z-20 ${
            showScreen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* Add Child Bottom Sheet */}
        <div
          className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto rounded-t-[20px] shadow-xl z-30 transition-transform duration-300 ${
            showScreen ? "translate-y-0" : "translate-y-full"
          } ${isDarkMode ? "bg-[#1c1c1c] text-white" : "bg-white text-black"}`}
          style={{ maxHeight: "90vh" }}
        >
          <div className="flex items-center justify-between px-5 pt-6 pb-3">
            <h1 className="text-[20px] font-medium">Add a New Child</h1>
            <button onClick={() => setShowScreen(false)}>
              <img
                src={cnc}
                alt="close"
                className={`w-8 h-8 ${isDarkMode ? "invert brightness-200" : ""}`}
              />
            </button>
          </div>
          <div className="px-5 pb-8 overflow-y-auto flex flex-col gap-4">
            {["Full Name", "Class", "Student Code"].map((label) => (
              <div key={label}>
                <h1
                  className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
                >
                  {label}
                </h1>
                <input
                  type="text"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`w-full h-[48px] rounded-[10px] px-3 outline-none placeholder:text-[14px] ${
                    isDarkMode
                      ? "border border-gray-700 bg-[#2b2b2b] text-white placeholder:text-gray-500"
                      : "border border-[#0000001F] bg-[#F8F8F8] text-[#303030]"
                  }`}
                />
              </div>
            ))}
            <button className="h-[50px] w-full bg-[#FF7B17] hover:bg-[#e0680d] text-white text-[18px] font-bold rounded-[10px] mt-2 transition-colors">
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────
  // SCREEN: Edit Teacher Profile
  // ────────────────────────────────────────────────────────────────
  if (showTeacherProfile) {
    return (
      <div
        className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto pb-32 transition-colors duration-200 ${
          isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
        }`}
      >
        <div className="flex items-center gap-4 px-5 pt-6 pb-2">
          <button onClick={() => setShowTeacherProfile(false)}>
            <img
              src={back}
              alt="back"
              className={`w-6 h-6 ${isDarkMode ? "invert brightness-200" : ""}`}
            />
          </button>
          <h2 className="text-[20px] font-medium">Edit Profile</h2>
        </div>

        {/* Profile Image & Camera Edit */}
        <div className="flex items-center justify-center mt-4 relative w-fit mx-auto">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            src={profileImage || ed}
            alt="profile"
            className="w-[75px] h-[75px] object-cover rounded-full border border-gray-500"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className={`absolute bottom-0 right-0 w-[22px] h-[22px] rounded-md flex items-center justify-center ${
              isDarkMode
                ? "bg-[#262626] border border-gray-700"
                : "bg-[#D9D9D9] border border-[#D9D9D9]"
            }`}
          >
            <img
              src={pn}
              alt="edit"
              className={`w-4 h-4 ${isDarkMode ? "invert brightness-200" : ""}`}
            />
          </button>
        </div>

        <p
          className={`font-bold text-[18px] text-center mt-3 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {fullName}
        </p>

        <div className="px-5 flex flex-col gap-4 mt-4">
          {/* Full Name */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Full Name
            </h2>
            <input
              type="text"
              value={tempFullName}
              onChange={(e) => {
                setTempFullName(e.target.value);
                setHasChanges(true);
              }}
              className={`w-full h-[57px] rounded-[8px] py-2 px-3 outline-none text-[14px] ${
                isDarkMode
                  ? "border border-gray-700 bg-[#1c1c1c] text-white focus:border-orange-500"
                  : "border border-black/10 text-[#303030] focus:border-orange-500"
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Email
            </h2>
            <input
              type="text"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setHasChanges(true);
              }}
              className={`w-full h-[57px] rounded-[8px] py-2 px-3 outline-none text-[14px] ${
                isDarkMode
                  ? "border border-gray-700 bg-[#1c1c1c] text-white focus:border-orange-500"
                  : "border border-black/10 text-[#303030] focus:border-orange-500"
              }`}
            />
          </div>

          {/* Phone Field */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Mobile Number
            </h2>
            {!isEditingPhone ? (
              <FieldRow
                value={`${savedCode} ${savedNumber}`}
                onEdit={openEditPhone}
              />
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] text-gray-400">
                      Area code
                    </label>
                    <input
                      ref={codeRef}
                      type="text"
                      value={areaCode}
                      onChange={handleAreaCodeChange}
                      maxLength={6}
                      placeholder="+234"
                      className={`w-[72px] h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-3 text-center text-[14px] outline-none ${
                        isDarkMode
                          ? "bg-[#1c1c1c] text-white"
                          : "bg-white text-black"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[11px] text-gray-400">Number</label>
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      maxLength={15}
                      placeholder="703 543 2234"
                      className={`w-full h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-3 text-[14px] outline-none ${
                        isDarkMode
                          ? "bg-[#1c1c1c] text-white"
                          : "bg-white text-black"
                      }`}
                    />
                  </div>
                </div>
                {phoneError && (
                  <p className="text-[12px] text-red-500">{phoneError}</p>
                )}
                <SaveCancelRow
                  onSave={handlePhoneSave}
                  onCancel={closeEditPhone}
                />
              </div>
            )}
            {phoneToast && (
              <p className="text-[12px] text-[#1D9E75] mt-1 text-center">
                {phoneToast}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Gender
            </h2>
            <FieldRow
              value={genderValue}
              onEdit={() => {
                setTempGender(genderValue);
                setIsEditingGender(true);
              }}
            />
            {isEditingGender && (
              <div className="flex flex-col gap-2 mt-2">
                <select
                  value={tempGender}
                  onChange={(e) => {
                    setTempGender(e.target.value);
                    setHasChanges(true);
                  }}
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 text-[14px] ${
                    isDarkMode
                      ? "bg-[#1c1c1c] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
                <SaveCancelRow
                  onSave={() => {
                    setGenderValue(tempGender);
                    setIsEditingGender(false);
                  }}
                  onCancel={() => setIsEditingGender(false)}
                />
              </div>
            )}
          </div>

          {/* Class */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Class
            </h2>
            <FieldRow
              value={classValue}
              onEdit={() => {
                setTempClass(classValue);
                setIsEditingClass(true);
              }}
            />
            {isEditingClass && (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="text"
                  value={tempClass}
                  onChange={(e) => {
                    setTempClass(e.target.value);
                    setHasChanges(true);
                  }}
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 text-[14px] outline-none ${
                    isDarkMode
                      ? "bg-[#1c1c1c] text-white"
                      : "bg-white text-black"
                  }`}
                />
                <SaveCancelRow
                  onSave={() => {
                    setClassValue(tempClass);
                    setIsEditingClass(false);
                  }}
                  onCancel={() => setIsEditingClass(false)}
                />
              </div>
            )}
          </div>

          {/* Age */}
          <div>
            <h2
              className={`font-medium text-[16px] mb-2 ${isDarkMode ? "text-white" : "text-[#303030]"}`}
            >
              Age
            </h2>
            <FieldRow
              value={ageValue}
              onEdit={() => {
                setTempAge(ageValue);
                setIsEditingAge(true);
              }}
            />
            {isEditingAge && (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="number"
                  value={tempAge}
                  onChange={(e) => {
                    setTempAge(e.target.value);
                    setHasChanges(true);
                  }}
                  min="1"
                  max="100"
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 text-[14px] outline-none ${
                    isDarkMode
                      ? "bg-[#1c1c1c] text-white"
                      : "bg-white text-black"
                  }`}
                />
                <SaveCancelRow
                  onSave={() => {
                    setAgeValue(tempAge);
                    setIsEditingAge(false);
                  }}
                  onCancel={() => setIsEditingAge(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Floating Bottom Button */}
        <div
          className={`fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-5 pb-6 pt-4 z-10 ${
            isDarkMode
              ? "bg-[#121212] border-t border-gray-800"
              : "bg-white border-t border-gray-200"
          }`}
        >
          <button
            disabled={!hasChanges}
            onClick={() => {
              if (!hasChanges) return;
              updateFullName(tempFullName);
              updateEmail(tempEmail);
              setHasChanges(false);
            }}
            className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-colors ${
              hasChanges
                ? "bg-[#FF7B17] hover:bg-[#e0680d]"
                : isDarkMode
                  ? "bg-gray-700 cursor-not-allowed text-gray-400"
                  : "bg-[#D3D3D3] cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────
  // SCREEN: Main Profile Overview
  // ────────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto pb-24 transition-colors duration-200 ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
    >
      <div className="px-5 pt-6">
        <h1
          className={`font-bold text-[20px] mb-6 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          Profile
        </h1>

        {/* User Card */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={profileImage || ed}
            alt="Profile Avatar"
            className="w-[55px] h-[55px] rounded-full object-cover flex-shrink-0 border border-gray-400"
          />
          <div className="min-w-0">
            <p
              className={`font-medium text-[18px] truncate ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {fullName || "User Profile"}
            </p>
            <p
              className={`text-[14px] truncate ${isDarkMode ? "text-gray-400" : "text-[#757575]"}`}
            >
              {email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Profile Options */}
        <MenuRow
          icon={tpi}
          label="Teacher's Profile Info"
          onClick={() => setShowTeacherProfile(true)}
        />
        <MenuRow
          icon={lkd}
          label="Linked Profile"
          onClick={() => setLinkedStudents(true)}
        />

        {/* Direct Light / Dark System & Device Switch */}
        <div
          className={`flex w-full h-[57px] rounded-[10px] py-4 px-3 gap-4 mt-5 items-center justify-between transition-colors duration-200 ${
            isDarkMode
              ? "border border-gray-800 bg-[#1e1e1e]"
              : "border border-[#9F9D9D] bg-white"
          }`}
        >
          <p
            className={`font-medium text-[18px] ${isDarkMode ? "text-white" : "text-[#1A1818]"}`}
          >
            Dark Mode
          </p>
          <button onClick={toggleTheme} className="p-1">
            <img
              src={isDarkMode ? sthOn : sth}
              alt="toggle dark mode"
              className="w-[34px] h-[20px]"
            />
          </button>
        </div>

        <MenuRow
          icon={hs}
          label="Help & Support"
          onClick={() => navigate("/help")}
        />

        {/* Logout Menu Action */}
        <div
          onClick={() => setShowLogoutModal(true)}
          className={`flex w-full h-[57px] rounded-[10px] py-4 px-3 gap-4 mt-5 items-center cursor-pointer transition-colors duration-200 ${
            isDarkMode
              ? "border border-red-900/50 bg-red-950/20"
              : "border border-red-200 bg-red-50/30"
          }`}
        >
          <img src={logout} alt="logout" className="w-6 h-6 flex-shrink-0" />
          <p className="font-medium text-[18px] flex-1 truncate text-red-500">
            Log out
          </p>
        </div>
      </div>

      {/* Logout Confirmation Backdrop / Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
          <div
            className={`w-full max-w-[430px] rounded-t-[20px] sm:rounded-[20px] p-6 shadow-2xl transition-all ${
              isDarkMode ? "bg-[#1c1c1c] text-white" : "bg-white text-black"
            }`}
          >
            <h3 className="text-[20px] font-bold mb-2">Logout</h3>
            <p
              className={`text-[14px] mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`flex-1 h-[48px] rounded-[10px] font-medium text-[16px] transition-colors ${
                  isDarkMode
                    ? "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate("/login");
                }}
                className="flex-1 h-[48px] rounded-[10px] bg-red-600 hover:bg-red-700 text-white font-medium text-[16px] transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Bar */}
      <BottomNavigate />
    </div>
  );
};

export default Grade;
