import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import role from "../assets/ED role.svg";
import tea from "../assets/teacher.svg";
import pare from "../assets/rolee.jpg";

const RoleSelect = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

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
      if (alreadyOnboarded) {
        navigate("/parent/home");
      } else {
        navigate("/parent/signup");
      }
    } else if (selectedRole === "teacher") {
      if (alreadyOnboarded) {
        navigate("/teacher/home");
      } else {
        navigate("/teacher/signup");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white w-full pt-12 pb-12">
      <div className="flex flex-col items-center justify-center">
        <img src={role} alt="ED role" />
        <div className="flex flex-col items-center justify-center mt-10">
          <h4 className="font-bold text-[20px] text-black">Choose a Role</h4>
          <p className="text-[14px] font-normal text-black">
            What do you want to register as?
          </p>
        </div>
      </div>

      <div
        onClick={() => setSelectedRole("teacher")}
        className={`border rounded-[10px] w-83.75 h-36 mt-14 bg-white mx-auto relative cursor-pointer ${
          selectedRole === "teacher"
            ? "border-[3px] border-[#FF7B17]"
            : "border border-[#D2DBD6]"
        }`}
      >
        <div className="flex justify-between">
          <p className="mt-14 pl-4 font-medium text-[18px] text-[#111214]">
            Teacher
          </p>
          <img src={tea} alt="Teacher" />
        </div>
      </div>

      <div
        onClick={() => setSelectedRole("parent")}
        className={`relative w-83.75 h-36 mt-8 mx-auto rounded-[10px] bg-white overflow-hidden cursor-pointer shadow-[0_2px_2px_0_#0000001A] ${
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
          alt="Parent"
          className="absolute bottom-0 right-0 w-35.5 h-35.5 object-contain"
        />
      </div>

      <div className="flex items-center justify-center mt-16">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedRole}
          className={`w-83.75 h-12.5 rounded-[10px] text-[18px] font-bold ${
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
