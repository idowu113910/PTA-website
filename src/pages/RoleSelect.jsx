import React, { useState } from "react";
import role from "../assets/ED role.svg";
import tea from "../assets/teacher.svg";
import pare from "../assets/rolee.jpg";

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleNext = () => {
    if (!selectedRole) return;

    // Check if this device already has saved onboarding data
    const savedName = localStorage.getItem("fullName");
    const savedEmail = localStorage.getItem("userEmail");
    const alreadyOnboarded =
      savedName &&
      savedName.trim() !== "" &&
      savedEmail &&
      savedEmail.trim() !== "";

    if (selectedRole === "parent") {
      // If already onboarded, skip straight to parent home
      if (alreadyOnboarded) {
        window.location.href = "/homee";
      } else {
        window.location.href = "/intro";
      }
    } else if (selectedRole === "teacher") {
      // If already onboarded, skip straight to teacher home
      if (alreadyOnboarded) {
        window.location.href = "/home";
      } else {
        window.location.href = "/introduction";
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-18">
        <img src={role} alt="" />
        <div className="flex flex-col items-center justify-center mt-10">
          <h4 className="font-bold text-[20px] text-black">Choose a Role</h4>
          <p className="text-[14px] font-normal text-black">
            What do you want to register as?
          </p>
        </div>
      </div>

      <div
        onClick={() => setSelectedRole("teacher")}
        className={`border rounded-[10px] w-[335px] h-[144px] mt-14 bg-white mx-auto relative cursor-pointer ${
          selectedRole === "teacher"
            ? "border-[3px] border-[#FF7B17]"
            : "border-[1px] border-[#D2DBD6]"
        }`}
      >
        <div className="flex justify-between">
          <p className="mt-14 pl-4 font-medium text-[18px] text-[#111214]">
            Teacher
          </p>
          <img src={tea} alt="" />
        </div>
      </div>

      <div
        onClick={() => setSelectedRole("parent")}
        className={`relative w-[335px] h-[144px] mt-8 mx-auto rounded-[10px] bg-white overflow-hidden cursor-pointer shadow-[0_2px_2px_0_#0000001A] ${
          selectedRole === "parent"
            ? "border-[3px] border-[#FF7B17]"
            : "border border-[#D2DBD6]"
        }`}
      >
        <p className="mt-14 pl-4 font-medium text-[18px] text-[#111214]">
          Parent
        </p>
        <img
          src={pare}
          alt=""
          className="absolute bottom-0 right-0 w-[142px] h-[142px] object-contain"
        />
      </div>

      <div className="flex items-center justify-center mt-30">
        <button
          onClick={handleNext}
          disabled={!selectedRole}
          className={`w-[335px] h-[50px] rounded-[10px] text-[18px] font-bold ${
            selectedRole
              ? "bg-[#FF7B17] text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
