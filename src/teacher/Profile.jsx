import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ed from "../assets/edithh.svg";
import btn from "../assets/Right btn.svg";
import tpi from "../assets/TPI.svg";
import ap from "../assets/app pre.svg";
import hs from "../assets/H & S.svg";
import iaf from "../assets/invite.svg";
import back from "../assets/back2.svg";
import pn from "../assets/pencil.svg";
import sth from "../assets/switchh.svg";
import sthOn from "../assets/ON.svg";
import { useUser } from "./UserContext";
import BottomNavigation from "../components/BottomNavigation";
import logout from "../assets/logout section.svg";

const Grade = () => {
  const {
    fullName,
    updateFullName,
    email,
    updateEmail,
    profileImage,
    updateProfileImage,
  } = useUser();

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const codeRef = useRef(null);

  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [showAppPreference, setShowAppPreference] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hideBackdrop, setHideBackdrop] = useState(false);

  const [tempFullName, setTempFullName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setTempFullName(fullName || "");
    setTempEmail(email || "");
  }, [fullName, email]);

  const [genderValue, setGenderValue] = useState("Female");
  const [tempGender, setTempGender] = useState("Female");
  const [isEditingGender, setIsEditingGender] = useState(false);

  const [classValue, setClassValue] = useState("Grade 6, Room 201");
  const [tempClass, setTempClass] = useState("Grade 6, Room 201");
  const [isEditingClass, setIsEditingClass] = useState(false);

  const [ageValue, setAgeValue] = useState("12");
  const [tempAge, setTempAge] = useState("12");
  const [isEditingAge, setIsEditingAge] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [SwitchOn, setSwitchOn] = useState(false);
  const [SwitchAuto, setSwitchAuto] = useState(false);

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [savedCode, setSavedCode] = useState("+234");
  const [savedNumber, setSavedNumber] = useState("703 543 2234");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneToast, setPhoneToast] = useState("");

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

  const handleClose = () => {
    setHideBackdrop(true);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setHideBackdrop(false);
      setShowLogoutModal(false);
    }, 1400);
  };

  function openEdit() {
    setAreaCode(savedCode);
    setPhoneNum(savedNumber);
    setPhoneError("");
    setPhoneToast("");
    setIsEditingPhone(true);
    setTimeout(() => codeRef.current?.focus(), 50);
  }
  function closeEdit() {
    setIsEditingPhone(false);
    setPhoneError("");
  }
  function handleAreaCodeChange(e) {
    let val = e.target.value;
    if (!val.startsWith("+")) val = "+" + val.replace(/\+/g, "");
    setAreaCode(val);
  }
  function validate() {
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
  }
  function handlePhoneSave() {
    if (!validate()) return;
    setSavedCode(areaCode.trim());
    setSavedNumber(phoneNum.trim());
    setIsEditingPhone(false);
    setPhoneToast("Number saved successfully");
    setTimeout(() => setPhoneToast(""), 3000);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") handlePhoneSave();
    if (e.key === "Escape") closeEdit();
  }

  const MenuRow = ({ icon, label, onClick }) => (
    <div
      onClick={onClick}
      className="flex w-full h-[57px] border border-[#9F9D9D] rounded-[10px] py-4 px-3 gap-4 mt-5 items-center cursor-pointer active:bg-gray-50"
    >
      <img src={icon} alt="" className="w-6 h-6 flex-shrink-0" />
      <p className="font-medium text-[18px] text-[#1A1818] flex-1 truncate">
        {label}
      </p>
      <img src={btn} alt="" className="w-[12px] h-[8px] flex-shrink-0" />
    </div>
  );

  const FieldRow = ({ value, onEdit }) => (
    <div className="w-full h-[57px] border border-black/10 rounded-[8px] py-2 px-3 mt-2 flex items-center justify-between">
      <span className="text-[14px] text-[#303030] flex-1 truncate">
        {value}
      </span>
      <button onClick={onEdit} className="p-1 flex-shrink-0">
        <img src={pn} alt="edit" className="w-[18px] h-[18px]" />
      </button>
    </div>
  );

  const SaveCancel = ({ onSave, onCancel }) => (
    <div className="flex gap-2 mt-1">
      <button
        onClick={onSave}
        className="flex-1 h-[42px] bg-[#E8620A] text-white rounded-[8px] text-[13px] font-medium"
      >
        Save
      </button>
      <button
        onClick={onCancel}
        className="flex-1 h-[42px] border border-black/10 rounded-[8px] text-[13px] text-[#303030]"
      >
        Cancel
      </button>
    </div>
  );

  // ── App Preference Screen ────────────────────────────────────────
  if (showAppPreference) {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
        <div className="flex items-center gap-4 px-5 pt-6 pb-4">
          <button onClick={() => setShowAppPreference(false)}>
            <img src={back} alt="back" className="w-6 h-6" />
          </button>
          <h2 className="text-[20px] font-medium">App Preference</h2>
        </div>
        <div className="px-5 flex flex-col gap-4">
          {[
            { label: "Notification", val: isSwitchOn, set: setIsSwitchOn },
            { label: "Theme Appearance", val: SwitchOn, set: setSwitchOn },
            { label: "Auto-Login", val: SwitchAuto, set: setSwitchAuto },
          ].map(({ label, val, set }) => (
            <div
              key={label}
              className="flex items-center justify-between w-full h-[61px] rounded-[10px] border border-[#9F9D9D] py-4 px-3"
            >
              <p className="font-medium text-[18px] text-[#1A1818]">{label}</p>
              <button onClick={() => set(!val)}>
                <img
                  src={val ? sthOn : sth}
                  alt="toggle"
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

  // ── Edit Profile Screen ──────────────────────────────────────────
  if (showTeacherProfile) {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-32">
        <div className="flex items-center gap-4 px-5 pt-6 pb-2">
          <button onClick={() => setShowTeacherProfile(false)}>
            <img src={back} alt="back" className="w-6 h-6" />
          </button>
          <h2 className="text-[20px] font-medium">Edit Profile</h2>
        </div>

        {/* Avatar */}
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
            className="w-[75px] h-[75px] object-cover rounded-full"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-md bg-[#D9D9D9] border border-[#D9D9D9] flex items-center justify-center"
          >
            <img src={pn} alt="edit" className="w-4 h-4" />
          </button>
        </div>

        <p className="font-bold text-[18px] text-black text-center mt-3 px-5 truncate">
          {fullName}
        </p>

        <div className="px-5 mt-4 flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">
              Full Name
            </h2>
            <input
              type="text"
              value={tempFullName}
              onChange={(e) => {
                setTempFullName(e.target.value);
                setHasChanges(true);
              }}
              className="w-full h-[57px] border border-black/10 rounded-[8px] px-3 outline-none text-[14px] text-[#303030]"
            />
          </div>

          {/* Email */}
          <div>
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">
              Email
            </h2>
            <input
              type="text"
              value={tempEmail}
              onChange={(e) => {
                setTempEmail(e.target.value);
                setHasChanges(true);
              }}
              className="w-full h-[57px] border border-black/10 rounded-[8px] px-3 outline-none text-[14px] text-[#303030]"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">
              Mobile Number
            </h2>
            {!isEditingPhone ? (
              <FieldRow
                value={`${savedCode} ${savedNumber}`}
                onEdit={openEdit}
              />
            ) : (
              <div className="flex flex-col gap-2 mt-2">
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
                      onKeyDown={handleKeyDown}
                      maxLength={6}
                      placeholder="+234"
                      className="w-[72px] h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-2 text-center text-[14px] outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-[11px] text-gray-400">Number</label>
                    <input
                      type="text"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      onKeyDown={handleKeyDown}
                      maxLength={15}
                      placeholder="703 543 2234"
                      className="w-full h-[57px] border-[1.5px] border-[#378ADD] rounded-[8px] px-3 text-[14px] outline-none"
                    />
                  </div>
                </div>
                {phoneError && (
                  <p className="text-[12px] text-red-500">{phoneError}</p>
                )}
                <SaveCancel onSave={handlePhoneSave} onCancel={closeEdit} />
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
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">
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
                  className="w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 text-[14px] bg-white"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
                <SaveCancel
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
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">
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
                  className="w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 outline-none text-[14px]"
                />
                <SaveCancel
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
            <h2 className="font-medium text-[16px] text-[#303030] mb-1">Age</h2>
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
                  onChange={(e) => {
                    setTempAge(e.target.value);
                    setHasChanges(true);
                  }}
                  className="w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] px-3 outline-none text-[14px]"
                />
                <SaveCancel
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

        {/* Save Changes */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 pb-6 pt-4 z-10">
          <button
            disabled={!hasChanges}
            onClick={() => {
              if (!hasChanges) return;
              updateFullName(tempFullName);
              updateEmail(tempEmail);
              setHasChanges(false);
            }}
            className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-colors ${
              hasChanges ? "bg-[#FF7B17]" : "bg-[#D3D3D3] cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>

    
      </div>
    );
  }

  // ── Main Profile Screen ──────────────────────────────────────────
  return (
    <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
      <div className="px-5 pt-6">
        <h1 className="font-bold text-[20px] text-black mb-6">Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={profileImage || ed}
            alt=""
            className="w-[55px] h-[55px] rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="font-medium text-[18px] truncate">{fullName}</p>
            <p className="font-normal text-[14px] text-[#424242] truncate">
              {email}
            </p>
          </div>
        </div>

        <MenuRow
          icon={tpi}
          label="Teacher Profile Information"
          onClick={() => setShowTeacherProfile(true)}
        />
        <MenuRow
          icon={ap}
          label="App Preference"
          onClick={() => setShowAppPreference(true)}
        />
        <MenuRow icon={hs} label="Help and Support" onClick={() => {}} />
        <MenuRow icon={iaf} label="Invite a Friend" onClick={() => {}} />

        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-4 mt-5 py-2 cursor-pointer"
        >
          <img src={logout} alt="" className="w-6 h-6 flex-shrink-0" />
          <p className="font-medium text-[18px] text-[#FF0000]">Log out</p>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-end justify-center z-20">
          {!hideBackdrop && (
            <div
              className="absolute inset-0 bg-black/40"
              onClick={handleClose}
            />
          )}
          <div
            className={`relative bg-white w-full max-w-[430px] rounded-t-[20px] px-6 pt-6 pb-8 shadow-2xl overflow-y-auto max-h-[90vh] mb-[65px] ${
              isClosing ? "animate-slide-down" : "animate-slide-up"
            }`}
          >
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h2 className="text-[20px] font-bold text-[#E8341A] text-center mb-4 border-b border-[#EEEEEE] pb-4">
              Logout
            </h2>
            <p className="text-[16px] font-medium text-[#616161] text-center mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate("/role");
                }}
                className="w-full h-[52px] bg-[#FF7B17] rounded-[10px] text-white text-[16px] font-bold active:opacity-80"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleClose}
                className="w-full h-[52px] border border-[#FFDDDD] rounded-[10px] text-[#E8341A] text-[18px] font-medium bg-[#FFF8F8] active:opacity-80"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(0); }
          to   { transform: translateY(100%); }
        }
        .animate-slide-up   { animation: slide-up   0.8s cubic-bezier(0.32,0.72,0,1); }
        .animate-slide-down { animation: slide-down 1.4s cubic-bezier(0.32,0.72,0,1) forwards; }
      `}</style>

      <BottomNavigation />
    </div>
  );
};

export default Grade;
