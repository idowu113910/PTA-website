import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../assets/back2.svg";
import ED from "../assets/ED role.svg";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";
import { saveTokenFromResponse } from "./utils/auth";

const LOGIN_ENDPOINT = "https://pta-wdln.onrender.com/api/auth/teacher/login";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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

  const fetchWithRetry = async (url, options, retries = 1, delayMs = 4000) => {
    try {
      return await fetch(url, options);
    } catch (err) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return fetchWithRetry(url, options, retries - 1, delayMs);
      }
      throw err;
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetchWithRetry(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.workEmail,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      if (data.fullName) {
        localStorage.setItem("fullName", data.fullName);
      }
      localStorage.setItem("userEmail", formData.workEmail);

      // Saves the access token (accessToken / access_token / token) so the
      // teacher pages can send it in the Authorization header.
      saveTokenFromResponse(data);

      navigate("/teacher/home");
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment.",
        );
      } else {
        setErrorMsg(err.message || "An error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] px-6 py-6 w-full mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/role")}
            className="absolute left-0 p-2 flex items-center justify-center cursor-pointer rounded-full hover:bg-neutral-900 transition-colors"
          >
            <img src={back} alt="Back" className="w-5 h-5 invert" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-white">Welcome Back</h1>
          <p className="text-[14px] text-gray-400 mt-1">
            Let's Dive Into Your Account
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleNext} className="space-y-4">
          {/* Email Address */}
          <div className="mt-8">
            <label className="block text-[14px] font-medium text-gray-200 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              className="w-full h-12 border border-gray-800 bg-[#000000] rounded-[10px] px-4 text-[16px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
              placeholder="Example@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-medium text-gray-200 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 border border-gray-800 bg-[#000000] rounded-[10px] pl-4 pr-12 text-[16px] text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 transition-colors"
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
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
              className="text-[12px] font-normal text-gray-300 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-[13px] text-red-400 text-center">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full h-12.5 rounded-xl text-[16px] font-medium transition-colors flex items-center justify-center gap-2 ${
                isFormValid() && !isLoading
                  ? "bg-[#FF7B17] text-white cursor-pointer hover:bg-[#e06910]"
                  : "bg-neutral-900 text-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full mt-6">
          <hr className="flex-1 border-t border-gray-800" />
          <span className="font-normal text-[14px] text-gray-400 whitespace-nowrap">
            Or Continue With
          </span>
          <hr className="flex-1 border-t border-gray-800" />
        </div>

        {/* Social Buttons */}
        <div className="flex items-center justify-center gap-10 w-full mt-8">
          <button
            type="button"
            aria-label="Continue with Facebook"
            className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#000000] border border-gray-800 hover:bg-neutral-900 transition-all"
          >
            <img src={fb} alt="Facebook" />
          </button>

          <button
            type="button"
            aria-label="Continue with Google"
            className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#000000] border border-gray-800 shadow-sm hover:bg-neutral-900 transition-all"
          >
            <img src={goo} alt="Google" />
          </button>

          <button
            type="button"
            aria-label="Continue with Apple"
            className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#000000] border border-gray-800 shadow-sm hover:bg-neutral-900 transition-all"
          >
            <img src={app} alt="Apple" className="invert" />
          </button>
        </div>

        {/* Sign Up Navigation Link */}
        <div
          onClick={() => navigate("/teacher/signup")}
          className="flex gap-3 items-center justify-center mt-10 cursor-pointer"
        >
          <p className="flex justify-center text-center font-normal text-gray-300 text-[16px]">
            Don’t have an account?
          </p>
          <p className="font-medium text-[16px] text-[#FF7B17]">Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
