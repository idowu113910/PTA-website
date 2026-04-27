import React, { useState } from "react";
import ED from "../assets/ED role.svg";
import back from "../assets/back2.svg";
import { useNavigate } from "react-router-dom";
import box from "../assets/box.svg";

const Introduction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    schoolName: "",
    phoneNumber: "",
    studentCount: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.workEmail.trim() !== "" &&
      formData.schoolName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.studentCount.trim() !== "" &&
      agreedToTerms
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      // Navigate to next page
      navigate("/homee");
    }
  };

  return (
    <div className="h-[812px]">
      <div className="flex flex-col items-center justify-center mt-16 relative">
        <img src={ED} alt="" />
        <h5 className="text-[20px] font-bold flex items-center justify-center leading-[100%] pt-6">
          Tell Us Who You Are
        </h5>
        <p className="font-normal text-[14px] pt-1">
          We're Excited To Have You!
        </p>
        <img
          onClick={() => {
            navigate("/role");
          }}
          src={back}
          alt=""
          className="relative bottom-[185px] right-[155px]"
        />
      </div>
      <div className="ml-8 mt-4">
        <h5 className="font-medium text-[14px] text-[#303030]">Full Name</h5>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="border-[1px] w-[335px] h-[48px] rounded-[8px] py-[8px] px-4 font-normal text-[12px] text-black mt-1.5 placeholder:text-[#969696]"
          placeholder="Enter Your Full Name"
        />
      </div>
      <div className="ml-8 mt-4">
        <h5 className="font-medium text-[14px] text-[#303030]">Email Address</h5>
        <input
          type="text"
          name="workEmail"
          value={formData.workEmail}
          onChange={handleInputChange}
          className="border-[1px] w-[335px] h-[48px] rounded-[8px] py-[8px] px-4 font-normal text-[12px] placeholder:text-[#969696] mt-1.5 text-black"
          placeholder="Example@gmail.com"
        />
      </div>
      <div className="ml-8 mt-4">
        <h5 className="font-medium text-[14px] text-[#303030]">
          Name Of School
        </h5>
        <input
          type="text"
          name="schoolName"
          value={formData.schoolName}
          onChange={handleInputChange}
          className="border-[1px] w-[335px] h-[48px] rounded-[8px] py-[8px] px-4 font-normal text-[12px] placeholder:text-[#969696] mt-1.5 text-black"
          placeholder="Enter name of school"
        />
      </div>
      <div className="ml-8 mt-4">
        <h5 className="font-medium text-[14px] text-[#303030]">Student Code</h5>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="border-[1px] w-[335px] h-[48px] rounded-[8px] py-[8px] px-4 font-normal text-[12px] placeholder:text-[#969696] mt-1.5 text-black"
          placeholder="Enter student code"
        />
      </div>
      <div className="ml-8 mt-4">
        <h5 className="font-medium text-[14px] text-[#303030]">
          Child's Grade
        </h5>
        <input
          type="text"
          name="studentCount"
          value={formData.studentCount}
          onChange={handleInputChange}
          className="border-[1px] w-[335px] h-[48px] rounded-[8px] py-[8px] px-4 font-normal text-[12px] placeholder:text-[#969696] mt-1.5 text-black"
          placeholder="Enter child's grade"
        />
      </div>
      <div
        className="flex gap-[8px] mt-6 ml-8 cursor-pointer"
        onClick={() => setAgreedToTerms(!agreedToTerms)}
      >
        <div
          className={`w-[15px] h-[15px] border-[1px] rounded-[2px] flex items-center justify-center ${
            agreedToTerms ? "bg-[#FF7B17]" : "bg-white"
          }`}
        >
          {agreedToTerms && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p className="font-normal text-[12px] text-[#001216] -mt-0.5">
          I agree with the Terms and Conditions
        </p>
      </div>
      <div className="flex items-center justify-center  mt-10 mb-20">
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`w-[335px] h-[50px] rounded-[10px] text-[18px] font-bold ${
            isFormValid()
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

export default Introduction;
