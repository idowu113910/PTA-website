import React, { useState } from "react";
import ED from "../assets/ED role.svg";
import back from "../assets/back2.svg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    schoolName: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      agreedToTerms
    );
  };

  const handleNext = () => {
    if (isFormValid()) {
      navigate("/teacher/home");
    }
  };

  return (
    // Explicit white background — this screen intentionally does NOT use ThemeContext/useTheme
    // and should never be affected by light/dark mode.
    <div className="min-h-screen bg-[#ffffff] px-6 py-6 max-w-107.5 mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 ">
          <button
            onClick={() => navigate("/role")}
            className="absolute left-0 p-2  flex items-center justify-center"
          >
            <img src={back} alt="Back" className="w-5 h-5 -mt-8" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain mt-5" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-[#001216]">
            Create Your Account
          </h1>
          <p className="text-[14px] text-[#001216] mt-1">
            We’re Excited To Have You!
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="mt-8">
            <label className="block text-[14px] font-medium text-[#303030] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] px-4 text-[12px] text-gray-900 
              placeholder:text-[#969696] focus:outline-none focus:border-gray-400 font-normal"
              placeholder="Enter your full name"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-[14px] font-medium text-[#303030] mb-1.5">
              Work Email
            </label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={(e) => {
                // Keep only A-Z, a-z, @, ., _, and -
                const lettersOnlyValue = e.target.value.replace(
                  /[^a-zA-Z@._-]/g,
                  "",
                );
                setFormData((prev) => ({
                  ...prev,
                  workEmail: lettersOnlyValue,
                }));
              }}
              className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] px-4 text-[12px] font-normal
               text-gray-900 placeholder:text-[#969696] focus:outline-none focus:border-gray-400"
              placeholder="Example@gmail.com"
            />
          </div>

          {/* Name of school */}
          <div>
            <label className="block text-[14px] font-medium text-[#303030] mb-1.5">
              Name of school
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={(e) => {
                // Strip out anything that is NOT a letter or space
                const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                handleInputChange({
                  ...e,
                  target: {
                    ...e.target,
                    name: "schoolName",
                    value: lettersOnly,
                  },
                });
              }}
              className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] px-4 text-[12px] text-gray-900 placeholder:text-[#969696] font-normal focus:outline-none focus:border-gray-400"
              placeholder="E.g. Afrotech Academy"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-[#303030] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] pl-4 pr-12 text-[12px] font-normal text-gray-900
                 placeholder:text-[#969696] focus:outline-none focus:border-gray-400"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] pl-4 pr-12 text-[12px] text-gray-900
                 placeholder:text-[#969696] font-normal focus:outline-none focus:border-gray-400"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className="flex items-center gap-2.5 mt-5 cursor-pointer"
          onClick={() => setAgreedToTerms(!agreedToTerms)}
        >
          <div
            className={`w-4.5 h-4.5 border border-gray-400 rounded flex items-center justify-center transition-colors ${
              agreedToTerms ? "bg-[#FF7B17] border-[#FF7B17]" : "bg-white"
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
          <span className="text-[13px] text-gray-800 font-normal">
            I agree with the Terms and Conditions
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 mb-4">
        <button
          onClick={handleNext}
          disabled={!isFormValid()}
          className={`w-full h-13 rounded-xl text-[16px] font-medium transition-colors ${
            isFormValid()
              ? "bg-[#FF7B17] text-white cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="flex items-center gap-4 w-full mt-6">
        <hr className="flex-1 border-t border-gray-300" />
        <span className="font-normal text-[14px] text-[#333333] whitespace-nowrap">
          Or Continue With
        </span>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

      <div className="flex items-center justify-center gap-10 w-full mt-8">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] "
        >
          <img src={fb} alt="" />
        </button>

        <button
          type="button"
          aria-label="Continue with Google"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={goo} alt="" />
        </button>

        <button
          type="button"
          aria-label="Continue with Apple"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={app} alt="" />
        </button>
      </div>

      <div
        onClick={() => {
          navigate("/teacher/login");
        }}
        className="flex gap-3 items-center justify-center mt-10"
      >
        <p className="flex justify-center text-center font-normal text-[#001216] text-[16px]">
          Already an exisiting user?
        </p>

        <p className="font-medium text-[16px] text-[#FF7B17]">Log In</p>
      </div>
    </div>
  );
};

export default SignUp;
