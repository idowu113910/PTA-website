import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back2.svg";
import ED from "../assets/ED role.svg";
import { Eye, EyeOff } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    workEmail: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return formData.workEmail.trim() !== "" && formData.password.trim() !== "";
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate("/homee");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 max-w-107.5 mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/role")}
            className="absolute left-0 p-2 flex items-center justify-center cursor-pointer"
          >
            <img src={back} alt="Back" className="w-5 h-5" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900">Welcome Back</h1>
          <p className="text-[14px] text-gray-600 mt-1">
            Let's Dive Into Your Account
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleNext} className="space-y-4">
          {/* Email Address */}
          <div className="mt-8">
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              className="w-full h-12 border-[#C3C6C9] border bg-[#F8F8F8] rounded-[10px] px-4 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
              placeholder="Example@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-800 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 border-[#C3C6C9] border bg-[#F8F8F8] rounded-[10px] pl-4 pr-12 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400"
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

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[12px] font-normal text-gray-900 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              onClick={() => {
                navigate("/home");
              }}
              type="submit"
              disabled={!isFormValid()}
              className={`w-full h-12.5 rounded-xl text-[16px] font-medium transition-colors ${
                isFormValid()
                  ? "bg-[#FF7B17] text-white cursor-pointer hover:bg-[#e06910]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Log In
            </button>
          </div>
        </form>

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
            navigate("/introduction");
          }}
          className="flex gap-3 items-center justify-center mt-10"
        >
          <p className="flex justify-center text-center font-normal text-[#001216] text-[16px]">
            Don’t have an account?
          </p>

          <p className="font-medium text-[16px] text-[#FF7B17]">Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
