import React, { useRef, useState } from "react";
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
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [showAppPreference, setShowAppPreference] = useState(false);
  const [profileImage, setProfileImage] = useState(ed);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [genderValue, setGenderValue] = useState("Female");
  const [tempGender, setTempGender] = useState(genderValue);
  const [isEditingClass, setIsEditingClass] = useState(false);
  const [classValue, setClassValue] = useState("Grade 6, Room 201");
  const [tempClass, setTempClass] = useState(classValue);
  const [isEditingAge, setIsEditingAge] = useState(false);
  const [ageValue, setAgeValue] = useState("12");
  const [tempAge, setTempAge] = useState(ageValue);
  const { fullName, updateFullName, email, updateEmail } = useUser();
  const [tempFullName, setTempFullName] = useState(fullName);
  const [tempEmail, setTempEmail] = useState(email);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [SwitchOn, setSwitchOn] = useState(false);
  const [Switch, setSwitch] = useState(false);
  const [isParentMode, setIsParentMode] = useState(false);

  const navigate = useNavigate();

  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [savedCode, setSavedCode] = useState("+234");
  const [savedNumber, setSavedNumber] = useState("703 543 2234");
  const [areaCode, setAreaCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneToast, setPhoneToast] = useState("");
  const codeRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  function openEdit() {
    setAreaCode(savedCode);
    setPhoneNum(savedNumber);
    setPhoneError("");
    setPhoneToast("");
    setIsEditingPhone(true);
    setTimeout(() => codeRef.current && codeRef.current.focus(), 50);
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

  function handleSave() {
    if (!validate()) return;
    setSavedCode(areaCode.trim());
    setSavedNumber(phoneNum.trim());
    setIsEditingPhone(false);
    setPhoneToast("Number saved successfully");
    setTimeout(() => setPhoneToast(""), 3000);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") closeEdit();
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowLogoutModal(false);
    }, 500);
  };

  const dismissSheet = () => {
    const sheet = document.getElementById("logout-sheet");
    sheet.classList.remove("animate-slide-up");
    sheet.classList.add("animate-slide-down");
    sheet.addEventListener("animationend", () => setShowLogoutModal(false), {
      once: true,
    });
  };

  if (showAppPreference) {
    return (
      <div>
        <div onClick={() => setShowAppPreference(false)}>
          <div>
            <div className="flex items-center gap-4 p-6">
              <img src={back} alt="back" className="cursor-pointer" />
              <h2 className="text-[20px] font-medium">App Preference</h2>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex gap-[17px] justify-between w-[345px] h-[61px] rounded-[10px] border-[1px] py-[16px] px-[12px] border-[#9F9D9D]">
            <p className="font-medium text-[18px] text-[#1A1818]">
              Notification
            </p>
            <img
              src={isSwitchOn ? sthOn : sth}
              alt="toggle switch"
              onClick={() => setIsSwitchOn(!isSwitchOn)}
              className="w-[34px] h-[20px] mt-1 cursor-pointer"
            />
          </div>

          <div className="flex gap-[17px] justify-between w-[345px] h-[61px] rounded-[10px] border-[1px] py-[16px] px-[12px] border-[#9F9D9D] mt-5">
            <p className="font-medium text-[18px] text-[#1A1818]">
              Theme Appearance
            </p>
            <img
              src={SwitchOn ? sthOn : sth}
              alt="toggle switch"
              onClick={() => setSwitchOn(!SwitchOn)}
              className="w-[34px] h-[20px] mt-1 cursor-pointer"
            />
          </div>

          <div className="flex gap-[17px] justify-between w-[345px] h-[61px] rounded-[10px] border-[1px] py-[16px] px-[12px] border-[#9F9D9D] mt-5">
            <p className="font-medium text-[18px] text-[#1A1818]">Auto-Login</p>
            <img
              src={Switch ? sthOn : sth}
              alt="toggle switch"
              onClick={() => setSwitch(!Switch)}
              className="w-[34px] h-[20px] mt-1 cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  if (showTeacherProfile) {
    return (
      <div className="h-[1100px] pb-32">
        <div onClick={() => setShowTeacherProfile(false)}>
          <div>
            <div className="flex items-center gap-4 p-6">
              <img src={back} alt="back" className="cursor-pointer" />
              <h2 className="text-[20px] font-medium">Edit Profile</h2>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-1.5 relative">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <img
            src={profileImage}
            alt="profile"
            className="w-[75px] h-[75px] object-cover rounded-full"
          />
          <img
            src={pn}
            alt="edit"
            onClick={() => fileInputRef.current.click()}
            className="w-[22px] h-[22px] border-[1px] rounded-md border-[#D9D9D9] bg-[#D9D9D9] relative top-6.5 right-3.5 cursor-pointer"
          />
        </div>

        <p className="font-bold text-black text-[18.13px] flex items-center justify-center mt-4">
          {fullName}
        </p>

        <div className="flex flex-col ml-8 mt-3">
          <h2 className="font-medium text-[16px] text-[#303030]">Full Name</h2>
          <input
            type="text"
            value={tempFullName}
            onChange={(e) => {
              setTempFullName(e.target.value);
              setHasChanges(true);
            }}
            className="w-[342px] h-[57px] border-[1px] rounded-[8px] border-[#F8F8F8] py-[8px] px-[12px] border-black/12 mt-2 placeholder:text-[14px] font-normal text-[#303030] outline-none"
          />
        </div>

        <div className="flex flex-col ml-8 mt-3">
          <h2 className="font-medium text-[16px] text-[#303030]">Email</h2>
          <input
            type="text"
            value={tempEmail}
            onChange={(e) => {
              setTempEmail(e.target.value);
              setHasChanges(true);
            }}
            placeholder={email}
            className="w-[342px] h-[57px] border-[1px] rounded-[8px] border-[#F8F8F8] py-[8px] px-[12px] border-black/12 mt-2 outline-none"
          />
        </div>

        <div className="flex flex-col ml-8 mt-4 relative">
          <h2 className="font-medium text-[16px] text-[#303030]">
            Mobile Number
          </h2>

          {!isEditingPhone ? (
            <div className="w-[342px] h-[57px] border-[1px] rounded-[8px] border-[#F8F8F8] py-[8px] px-[12px] border-black/12 mt-2 flex items-center justify-between">
              <span className="text-[15px] text-[#303030]">
                {savedCode} {savedNumber}
              </span>
              <button
                onClick={openEdit}
                className="flex items-center justify-center p-1 rounded hover:bg-gray-100"
                title="Edit number"
              >
                <img src={pn} alt="edit" className="w-[18px] h-[18px]" />
              </button>
            </div>
          ) : (
            <div className="w-[342px] mt-2 flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-gray-400">Area code</label>
                  <input
                    ref={codeRef}
                    type="text"
                    value={areaCode}
                    onChange={handleAreaCodeChange}
                    onKeyDown={handleKeyDown}
                    maxLength={6}
                    placeholder="+234"
                    className="w-[72px] h-[57px] border-[1.5px] rounded-[8px] border-[#378ADD] py-[8px] px-[12px] text-center text-[14px] text-[#303030] outline-none focus:border-[#185FA5]"
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
                    className="w-full h-[57px] border-[1.5px] rounded-[8px] border-[#378ADD] py-[8px] px-[12px] text-[14px] text-[#303030] outline-none focus:border-[#185FA5]"
                  />
                </div>
              </div>

              {phoneError && (
                <p className="text-[12px] text-red-500 mt-[-4px]">
                  {phoneError}
                </p>
              )}

              <div className="flex gap-2 mt-1">
                <button
                  onClick={handleSave}
                  className="flex-1 h-[44px] bg-[#E84A1E] text-white text-[13px] font-medium rounded-[8px] hover:bg-[#C43A15] active:scale-[0.98] transition-all"
                >
                  Save changes
                </button>
                <button
                  onClick={closeEdit}
                  className="flex-1 h-[44px] bg-[#f0f0f0] text-[#555] text-[13px] border border-[#ddd] rounded-[8px] hover:bg-[#e5e5e5] active:scale-[0.98] transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {phoneToast && (
            <p className="text-[12px] text-[#1D9E75] mt-2 text-center">
              {phoneToast}
            </p>
          )}
        </div>

        <div className="flex flex-col ml-8 relative mt-3.5">
          <h2 className="font-medium text-[16px] text-[#303030]">Gender</h2>
          <div
            className={`w-[342px] h-[57px] border-[1px] rounded-[8px] py-[8px] px-[12px] mt-2 flex items-center justify-between outline-none
      ${isEditingGender ? "border-blue-400" : "border-black/12"}`}
          >
            <span className="text-[14px] text-[#303030]">{genderValue}</span>
            <img
              src={pn}
              alt=""
              className="w-[18px] h-[18px] cursor-pointer"
              onClick={() => {
                setTempGender(genderValue);
                setIsEditingGender(true);
              }}
            />
          </div>

          {isEditingGender && (
            <div className="w-[342px] mt-2 flex flex-col gap-2">
              <select
                value={tempGender}
                onChange={(e) => {
                  setTempGender(e.target.value);
                  setHasChanges(true);
                }}
                className="w-full h-[57px] border-[1.5px] rounded-[8px] border-blue-400 py-[8px] px-[12px] text-[14px] text-[#303030] bg-white"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Prefer not to say</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setGenderValue(tempGender);
                    setIsEditingGender(false);
                  }}
                  className="flex-1 h-[42px] bg-[#E8620A] text-white rounded-[8px] text-[13px] font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingGender(false)}
                  className="flex-1 h-[42px] border border-black/12 rounded-[8px] text-[13px] text-[#303030]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col ml-8 mt-4.5 relative">
          <h2 className="font-medium text-[16px] text-[#303030]">Class</h2>
          <div
            className={`w-[342px] h-[57px] border-[1px] rounded-[8px] py-[8px] px-[12px] mt-2 flex items-center justify-between
      ${isEditingClass ? "border-blue-400" : "border-black/12"}`}
          >
            <span className="text-[14px] text-[#303030]">{classValue}</span>
            <img
              src={pn}
              alt=""
              className="w-[18px] h-[18px] cursor-pointer"
              onClick={() => {
                setTempClass(classValue);
                setIsEditingClass(true);
              }}
            />
          </div>

          {isEditingClass && (
            <div className="w-[342px] mt-2 flex flex-col gap-2">
              <input
                type="text"
                value={tempClass}
                onChange={(e) => {
                  setTempClass(e.target.value);
                  setHasChanges(true);
                }}
                className="w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] py-[8px] px-[12px] outline-none text-[14px] text-[#303030]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setClassValue(tempClass);
                    setIsEditingClass(false);
                  }}
                  className="flex-1 h-[42px] bg-[#E8620A] text-white rounded-[8px] text-[13px] font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingClass(false)}
                  className="flex-1 h-[42px] border border-black/12 rounded-[8px] text-[13px] text-[#303030]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col ml-8 mt-4 relative">
          <h2 className="font-medium text-[16px] text-[#303030]">Age</h2>
          <div
            className={`w-[342px] h-[57px] border-[1px] rounded-[8px] py-[8px] px-[12px] mt-2 flex items-center justify-between
      ${isEditingAge ? "border-blue-400" : "border-black/12"}`}
          >
            <span className="text-[14px] text-[#303030]">{ageValue}</span>
            <img
              src={pn}
              alt=""
              className="w-[18px] h-[18px] cursor-pointer"
              onClick={() => {
                setTempAge(ageValue);
                setIsEditingAge(true);
              }}
            />
          </div>

          {isEditingAge && (
            <div className="w-[342px] mt-2 flex flex-col gap-2">
              <input
                type="number"
                value={tempAge}
                onChange={(e) => {
                  setTempAge(e.target.value);
                  setHasChanges(true);
                }}
                min="1"
                max="100"
                className="w-full h-[57px] border-[1.5px] border-blue-400 rounded-[8px] py-[8px] px-[12px] outline-none text-[14px] text-[#303030]"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setAgeValue(tempAge);
                    setIsEditingAge(false);
                  }}
                  className="flex-1 h-[42px] bg-[#E8620A] text-white rounded-[8px] text-[13px] font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingAge(false)}
                  className="flex-1 h-[42px] border border-black/12 rounded-[8px] text-[13px] text-[#303030]"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 border-t border-gray-200 bg-white">
          <div
            className={`flex items-center justify-center w-[335px] h-[50px] rounded-[10px] py-[12px] mx-auto transition-all
      ${hasChanges ? "bg-[#FF7B17] cursor-pointer" : "bg-[#D3D3D3] cursor-not-allowed"}`}
            onClick={() => {
              if (!hasChanges) return;
              updateFullName(tempFullName);
              updateEmail(tempEmail);
              setHasChanges(false);
            }}
          >
            <button
              disabled={!hasChanges}
              className="font-bold text-[18px] text-white disabled:cursor-not-allowed"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main Profile View ──────────────────────────────────────────────────────
  return (
    <div className="p-6 h-[812px]">
      <h1 className="font-bold text-[20px] text-black">Profile</h1>

      <div className="flex mt-10 gap-4">
        <img src={ed} alt="" />
        <div className="flex flex-col">
          <p className="font-medium text-[18px]">{fullName}</p>
          <p className="mt-1 font-normal text-[14px] text-[#424242]">{email}</p>
        </div>
      </div>

      <div>
        <div
          onClick={() => setShowTeacherProfile(true)}
          className="flex w-[334px] h-[57px] border-[1px] rounded-[10px] py-[16px] px-[12px] gap-[19px] border-[#9F9D9D] mt-10"
        >
          <img src={tpi} alt="" className="w-[24px] h-[24px] ml-1" />
          <p className="font-medium text-[18px] text-[#1A1818] -mt-0.5">
            Teacher Profile Information
          </p>
          <img src={btn} alt="" className="w-[12px] h-[8px] mt-2 ml-1" />
        </div>

        <div
          onClick={() => setShowAppPreference(true)}
          className="flex w-[334px] h-[57px] border-[1px] rounded-[10px] py-[16px] px-[12px] gap-[19px] border-[#9F9D9D] mt-6"
        >
          <img src={ap} alt="" className="w-[24px] h-[24px] ml-1" />
          <p className="font-medium text-[18px] text-[#1A1818] -mt-0.5 whitespace-nowrap">
            App Preference
          </p>
          <img src={btn} alt="" className="w-[12px] h-[8px] mt-2 ml-25" />
        </div>

        <div className="flex w-[334px] h-[57px] border-[1px] rounded-[10px] py-[16px] px-[12px] gap-[19px] border-[#9F9D9D] mt-6">
          <img src={hs} alt="" className="w-[24px] h-[24px] ml-1" />
          <p className="font-medium text-[18px] text-[#1A1818] -mt-0.5 whitespace-nowrap">
            Help and Support
          </p>
          <img src={btn} alt="" className="w-[12px] h-[8px] mt-2 ml-20" />
        </div>

        <div className="flex w-[334px] h-[57px] border-[1px] rounded-[10px] py-[16px] px-[12px] gap-[19px] border-[#9F9D9D] mt-6">
          <img src={iaf} alt="" className="w-[24px] h-[24px] ml-1" />
          <p className="font-medium text-[18px] text-[#1A1818] -mt-0.5 whitespace-nowrap">
            Invite a Friend
          </p>
          <img src={btn} alt="" className="w-[12px] h-[8px] mt-2 ml-27" />
        </div>

        <div
          onClick={() => setShowLogoutModal(true)}
          className="flex w-[334px] h-[57px] rounded-[10px] py-[16px] px-[12px] gap-[13px] mt-6 items-center cursor-pointer"
        >
          <img src={logout} alt="" />
          <p className="font-medium text-[18px] text-[#FF0000] -mt-1 whitespace-nowrap">
            Log out
          </p>
        </div>
      </div>

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-end justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={dismissSheet}
          />
          <div
            id="logout-sheet"
            className="relative bg-white w-full rounded-t-[20px] px-6 pt-8 pb-10 shadow-2xl animate-slide-up"
            style={{ height: "400px" }}
          >
            <h2 className="text-[20px] font-bold text-[#E8341A] text-center mb-6 border-b border-[#EEEEEE] pb-5">
              Logout
            </h2>
            <p className="text-[16px] font-medium text-[#616161] text-center mb-8">
              Are you sure you want to logout?
            </p>
            <button
              onClick={() => {
                setShowLogoutModal(false);
                navigate("/role");
              }}
              className="w-full h-[50px] bg-[#FF7B17] rounded-[10px] text-white text-[16px] font-bold mb-4 py-[12px] px-[125px]"
            >
              Yes, Logout
            </button>
            <button
              onClick={dismissSheet}
              className="w-full h-[50px] border-[1px] border-[#FFDDDD] rounded-[10px] text-[#E8341A] text-[18px] font-medium bg-[#FFF8F8]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .animate-slide-down {
          animation: slide-down 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        }
      `}</style>

      <BottomNavigation />
    </div>
  );
};

export default Grade;
