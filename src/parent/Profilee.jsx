import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ed from "../assets/edithh.svg";
import tpi from "../assets/TPI.svg";
import ap from "../assets/app pre.svg";
import hs from "../assets/H & S.svg";
import back from "../assets/back2.svg";
import pn from "../assets/pencil.svg";
import sth from "../assets/switchh.svg";
import sthOn from "../assets/ON.svg";
import logout from "../assets/logout section.svg";
import { useUser } from "../teacher/UserContext";
import BottomNavigation from "../components/BottomNavigation";

// Right-pointing chevron icon
const Chevron = ({ className = "" }) => (
  <svg
    viewBox="0 0 8 13"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M1.2 1.2 6.6 6.5 1.2 11.8" />
  </svg>
);

// Linked Students icon
const LinkedStudentsIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <g transform="translate(-3.5 0) scale(0.9)">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </g>
    <g transform="translate(4 2.5) scale(0.9)">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </g>
  </svg>
);

const Profile = () => {
  const navigate = useNavigate();
  const {
    fullName,
    updateFullName,
    email,
    updateEmail,
    profileImage,
    updateProfileImage,
  } = useUser();

  // Automatic dark mode detection via system preferences
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // UI View states
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [showAppPreference, setShowAppPreference] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [hideBackdrop, setHideBackdrop] = useState(false);

  // Form temporary states
  const [tempFullName, setTempFullName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [tempImage, setTempImage] = useState(null);

  const [genderValue, setGenderValue] = useState("Female");
  const [tempGender, setTempGender] = useState("Female");
  const [isEditingGender, setIsEditingGender] = useState(false);

  const [classValue, setClassValue] = useState("Grade 6, Room 201");
  const [tempClass, setTempClass] = useState("Grade 6, Room 201");
  const [isEditingClass, setIsEditingClass] = useState(false);

  const [ageValue, setAgeValue] = useState("12");
  const [tempAge, setTempAge] = useState("12");
  const [isEditingAge, setIsEditingAge] = useState(false);

  // App preferences
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [switchAuto, setSwitchAuto] = useState(false);

  // Phone state
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [savedCode, setSavedCode] = useState("+234");
  const [savedNumber, setSavedNumber] = useState("703 543 2234");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneToast, setPhoneToast] = useState("");

  // Save states
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const codeRef = useRef(null);
  const saveTimerRef = useRef(null);
  const toastTimerRef = useRef(null);
  const closeModalTimerRef = useRef(null);

  // Reset temp state on prop change
  useEffect(() => {
    setTempFullName(fullName || "");
    setTempEmail(email || "");
  }, [fullName, email]);

  // Clean timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(saveTimerRef.current);
      clearTimeout(toastTimerRef.current);
      clearTimeout(closeModalTimerRef.current);
    };
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = useCallback(() => {
    setHideBackdrop(true);
    setIsClosingModal(true);
    closeModalTimerRef.current = setTimeout(() => {
      setIsClosingModal(false);
      setHideBackdrop(false);
      setShowLogoutModal(false);
    }, 400);
  }, []);

  const handleSaveChanges = () => {
    if (!hasChanges || isSaving) return;
    setIsSaving(true);

    saveTimerRef.current = setTimeout(() => {
      if (updateFullName) updateFullName(tempFullName);
      if (updateEmail) updateEmail(tempEmail);
      if (tempImage && updateProfileImage) {
        updateProfileImage(tempImage);
        setTempImage(null);
      }
      setHasChanges(false);
      setIsSaving(false);
      setShowSaveToast(true);

      toastTimerRef.current = setTimeout(() => {
        setShowSaveToast(false);
      }, 3000);
    }, 1000);
  };

  // Phone editing handlers
  const openPhoneEdit = () => {
    setAreaCode(savedCode);
    setPhoneNum(savedNumber);
    setPhoneError("");
    setPhoneToast("");
    setIsEditingPhone(true);
    setTimeout(() => codeRef.current?.focus(), 50);
  };

  const closePhoneEdit = () => {
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
    setHasChanges(true);
    setTimeout(() => setPhoneToast(""), 3000);
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === "Enter") handlePhoneSave();
    if (e.key === "Escape") closePhoneEdit();
  };

  // Helper UI Components
  const MenuRow = ({ icon, IconComponent, label, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full h-[58px] rounded-[10px] px-3 gap-4 mt-[22px] items-center text-left transition-colors duration-200 ${
        isDarkMode
          ? "border border-gray-800 active:bg-gray-900"
          : "border border-[#9F9D9D] bg-white active:bg-gray-50"
      }`}
    >
      {IconComponent ? (
        <IconComponent
          className={`w-6 h-6 flex-shrink-0 ${
            isDarkMode ? "text-white" : "text-[#1A1818]"
          }`}
        />
      ) : (
        <img
          src={icon}
          alt=""
          className={`w-6 h-6 flex-shrink-0 ${isDarkMode ? "invert" : ""}`}
        />
      )}
      <span
        className={`font-medium text-[18px] flex-1 truncate ${
          isDarkMode ? "text-white" : "text-[#1A1818]"
        }`}
      >
        {label}
      </span>
      <Chevron
        className={`w-2 h-[13px] flex-shrink-0 ${
          isDarkMode ? "text-white" : "text-[#1A1818]"
        }`}
      />
    </button>
  );

  const FieldRow = ({ value, onEdit }) => (
    <div
      className={`w-full h-[57px] rounded-[8px] py-2 px-3 mt-2 flex items-center justify-between ${
        isDarkMode ? "border border-gray-800" : "border border-black/10"
      }`}
    >
      <span
        className={`text-[16px] flex-1 truncate ${
          isDarkMode ? "text-white" : "text-[#303030]"
        }`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={onEdit}
        className="p-1 flex-shrink-0"
        aria-label="Edit field"
      >
        <img
          src={pn}
          alt=""
          className={`w-[18px] h-[18px] ${isDarkMode ? "invert" : ""}`}
        />
      </button>
    </div>
  );

  const SaveCancel = ({ onSave, onCancel }) => (
    <div className="flex gap-2 mt-1">
      <button
        type="button"
        onClick={onSave}
        className="flex-1 h-[42px] bg-[#E8620A] text-white rounded-[8px] text-[13px] font-medium active:opacity-90"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className={`flex-1 h-[42px] rounded-[8px] text-[13px] font-medium ${
          isDarkMode
            ? "border border-gray-800 text-white"
            : "border border-black/10 text-[#303030]"
        }`}
      >
        Cancel
      </button>
    </div>
  );

  // --- Sub-View: App Preference Screen ---
  if (showAppPreference) {
    return (
      <div
        className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto pb-24 transition-colors duration-200 ${
          isDarkMode ? "bg-[#000000] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center gap-4 px-5 pt-6 pb-4">
          <button
            type="button"
            onClick={() => setShowAppPreference(false)}
            aria-label="Back to main profile"
          >
            <img
              src={back}
              alt=""
              className={`w-6 h-6 ${isDarkMode ? "invert" : ""}`}
            />
          </button>
          <h2 className="text-[20px] font-medium">App Preference</h2>
        </div>

        <div className="px-5 flex flex-col gap-4">
          {[
            {
              label: "Notification",
              val: isSwitchOn,
              set: () => setIsSwitchOn((prev) => !prev),
            },
            {
              label: "Auto-Login",
              val: switchAuto,
              set: () => setSwitchAuto((prev) => !prev),
            },
          ].map(({ label, val, set }) => (
            <div
              key={label}
              className={`flex items-center justify-between w-full h-[61px] rounded-[10px] py-4 px-3 ${
                isDarkMode
                  ? "border border-gray-800 bg-[#121212]"
                  : "border border-gray-200 bg-white"
              }`}
            >
              <p className="font-medium text-[18px]">{label}</p>
              <button
                type="button"
                onClick={set}
                aria-label={`Toggle ${label}`}
              >
                <img
                  src={val ? sthOn : sth}
                  alt=""
                  className="w-[34px] h-[20px]"
                />
              </button>
            </div>
          ))}
        </div>

        <BottomNavigation />
      </div>
    );
  }

  // --- Sub-View: Edit Profile Screen ---
  if (showTeacherProfile) {
    return (
      <div
        className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto pb-32 transition-colors duration-200 ${
          isDarkMode ? "bg-[#000000] text-white" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center gap-4 px-5 pt-6 pb-2">
          <button
            type="button"
            onClick={() => setShowTeacherProfile(false)}
            aria-label="Back"
          >
            <img
              src={back}
              alt=""
              className={`w-6 h-6 ${isDarkMode ? "invert" : ""}`}
            />
          </button>
          <h2 className="text-[20px] font-medium">Edit Profile</h2>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center justify-center mt-4 relative w-fit mx-auto">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            src={tempImage || profileImage || ed}
            alt="User Avatar"
            className="w-[75px] h-[75px] object-cover rounded-full"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-md bg-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center"
            aria-label="Change photo"
          >
            <img
              src={pn}
              alt=""
              className={`w-4 h-4 ${isDarkMode ? "invert" : ""}`}
            />
          </button>
        </div>

        <p className="font-bold text-[18px] text-center mt-3 px-5 truncate">
          {fullName}
        </p>

        <div className="px-5 mt-4 flex flex-col gap-4">
          {/* Full Name Input */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              value={tempFullName}
              onChange={(e) => {
                setTempFullName(e.target.value);
                setHasChanges(true);
              }}
              className={`w-full h-[57px] rounded-[8px] px-3 outline-none text-[16px] ${
                isDarkMode
                  ? "border border-gray-800 bg-[#121212] text-white"
                  : "border border-black/10 text-[#303030]"
              }`}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setHasChanges(true);
              }}
              className={`w-full h-[57px] rounded-[8px] px-3 outline-none text-[16px] ${
                isDarkMode
                  ? "border border-gray-800 bg-[#121212] text-white"
                  : "border border-black/10 text-[#303030]"
              }`}
            />
          </div>

          {/* Mobile Number Input */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Mobile Number
            </label>
            {!isEditingPhone ? (
              <FieldRow
                value={`${savedCode} ${savedNumber}`}
                onEdit={openPhoneEdit}
              />
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-gray-400">Area code</span>
                    <input
                      ref={codeRef}
                      type="text"
                      value={areaCode}
                      onChange={handleAreaCodeChange}
                      onKeyDown={handlePhoneKeyDown}
                      maxLength={6}
                      placeholder="+234"
                      className={`w-[72px] h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-2 text-center text-[16px] outline-none ${
                        isDarkMode ? "bg-[#121212] text-white" : ""
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[11px] text-gray-400">Number</span>
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      onKeyDown={handlePhoneKeyDown}
                      maxLength={15}
                      placeholder="703 543 2234"
                      className={`w-full h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-3 text-[16px] outline-none ${
                        isDarkMode ? "bg-[#121212] text-white" : ""
                      }`}
                    />
                  </div>
                </div>
                {phoneError && (
                  <p className="text-[12px] text-red-500">{phoneError}</p>
                )}
                <SaveCancel
                  onSave={handlePhoneSave}
                  onCancel={closePhoneEdit}
                />
              </div>
            )}
            {phoneToast && (
              <p className="text-[12px] text-[#1D9E75] mt-1 text-center">
                {phoneToast}
              </p>
            )}
          </div>

          {/* Gender Select */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Gender
            </label>
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
                  onChange={(e) => setTempGender(e.target.value)}
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 text-[16px] ${
                    isDarkMode ? "bg-[#121212] text-white" : "bg-white"
                  }`}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
                <SaveCancel
                  onSave={() => {
                    setGenderValue(tempGender);
                    setIsEditingGender(false);
                    setHasChanges(true);
                  }}
                  onCancel={() => setIsEditingGender(false)}
                />
              </div>
            )}
          </div>

          {/* Class Field */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Class
            </label>
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
                  onChange={(e) => setTempClass(e.target.value)}
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 outline-none text-[16px] ${
                    isDarkMode ? "bg-[#121212] text-white" : ""
                  }`}
                />
                <SaveCancel
                  onSave={() => {
                    setClassValue(tempClass);
                    setIsEditingClass(false);
                    setHasChanges(true);
                  }}
                  onCancel={() => setIsEditingClass(false)}
                />
              </div>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label
              className={`block font-medium text-[16px] mb-1 ${
                isDarkMode ? "text-white" : "text-[#303030]"
              }`}
            >
              Age
            </label>
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
                  min="1"
                  max="100"
                  onChange={(e) => setTempAge(e.target.value)}
                  className={`w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 outline-none text-[16px] ${
                    isDarkMode ? "bg-[#121212] text-white" : ""
                  }`}
                />
                <SaveCancel
                  onSave={() => {
                    setAgeValue(tempAge);
                    setIsEditingAge(false);
                    setHasChanges(true);
                  }}
                  onCancel={() => setIsEditingAge(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Success Toast */}
        {showSaveToast && (
          <div
            role="status"
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-40px)] max-w-[390px] px-4 py-3 rounded-[10px] shadow-lg flex items-center gap-3 bg-[#22C55E] text-white text-[14px] font-medium animate-toast"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Your changes have been saved successfully</span>
          </div>
        )}

        {/* Sticky Footer Save Button */}
        <div
          className={`fixed bottom-0 left-0 right-0 border-t px-5 pb-6 pt-4 z-10 ${
            isDarkMode
              ? "bg-[#000000] border-gray-900"
              : "bg-white border-gray-200"
          }`}
        >
          <button
            type="button"
            disabled={!hasChanges || isSaving}
            onClick={handleSaveChanges}
            className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-colors flex items-center justify-center gap-2 ${
              hasChanges ? "bg-[#FF7B17]" : "bg-[#D3D3D3] cursor-not-allowed"
            } ${isSaving ? "opacity-80 cursor-wait" : ""}`}
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 0 1 8-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    );
  }

  // --- Main View: Profile Menu ---
  return (
    <div
      className={`min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto pb-24 transition-colors duration-200 ${
        isDarkMode ? "bg-[#000000] text-white" : "bg-white text-gray-900"
      }`}
    >
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translate(-50%, -16px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-toast      { animation: toast-in 0.3s ease-out; }
        .animate-slide-up   { animation: slide-up 0.4s cubic-bezier(0.32,0.72,0,1); }
        .animate-slide-down { animation: slide-down 0.4s cubic-bezier(0.32,0.72,0,1) forwards; }
      `}</style>

      <div className="px-5 pt-6">
        <h1
          className={`font-bold text-[20px] mb-5 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Profile
        </h1>

        {/* User Header */}
        <div className="flex items-center gap-4 mb-11">
          <img
            src={profileImage || ed}
            alt=""
            className="w-[62px] h-[62px] rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p
              className={`font-medium text-[18px] leading-tight truncate ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {fullName}
            </p>
            <p
              className={`font-normal text-[14px] mt-1 truncate ${
                isDarkMode ? "text-gray-300" : "text-[#424242]"
              }`}
            >
              {email}
            </p>
          </div>
        </div>

        {/* Options Menu */}
        <div className="-mt-[22px]">
          <MenuRow
            icon={tpi}
            label="Parent Profile Information"
            onClick={() => setShowTeacherProfile(true)}
          />
          <MenuRow
            IconComponent={LinkedStudentsIcon}
            label="Linked Students"
            onClick={() => {}}
          />
          <MenuRow
            icon={ap}
            label="App Preference"
            onClick={() => setShowAppPreference(true)}
          />
          <MenuRow icon={hs} label="Help and Support" onClick={() => {}} />
        </div>

        {/* Logout trigger */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-4 mt-10 pl-3 py-2 cursor-pointer w-full text-left"
        >
          <img src={logout} alt="" className="w-6 h-6 flex-shrink-0" />
          <span
            className={`font-medium text-[18px] ${
              isDarkMode ? "text-red-500" : "text-[#FF0000]"
            }`}
          >
            Log out
          </span>
        </button>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-end justify-center z-20">
          {!hideBackdrop && (
            <div
              className={`absolute inset-0 ${
                isDarkMode ? "bg-black/80" : "bg-black/40"
              }`}
              onClick={handleCloseModal}
            />
          )}
          <div
            className={`relative w-full max-w-[430px] rounded-t-[20px] px-6 pt-6 pb-8 shadow-2xl overflow-y-auto max-h-[90vh] mb-[65px] transition-colors duration-200 ${
              isDarkMode ? "bg-[#121212] text-white" : "bg-white text-gray-900"
            } ${isClosingModal ? "animate-slide-down" : "animate-slide-up"}`}
          >
            <div
              className={`w-10 h-1 rounded-full mx-auto mb-5 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
            <h2
              className={`text-[20px] font-bold text-center mb-4 border-b pb-4 ${
                isDarkMode
                  ? "text-red-400 border-gray-800"
                  : "text-[#E8341A] border-[#EEEEEE]"
              }`}
            >
              Logout
            </h2>
            <p
              className={`text-[16px] font-medium text-center mb-6 ${
                isDarkMode ? "text-white" : "text-[#616161]"
              }`}
            >
              Are you sure you want to logout?
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate("/role");
                }}
                className="w-full h-[52px] bg-[#FF7B17] rounded-[10px] text-white text-[16px] font-bold active:opacity-80 cursor-pointer"
              >
                Yes, Logout
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className={`w-full h-[52px] border rounded-[10px] text-[18px] font-medium active:opacity-80 cursor-pointer ${
                  isDarkMode
                    ? "border-red-900/40 text-red-400 bg-red-950/20"
                    : "border-[#FFDDDD] text-[#E8341A] bg-[#FFF8F8]"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Profile;
