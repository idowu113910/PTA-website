import React, { useState, useEffect } from "react";
import ED from "../assets/ED role.svg";
import back from "../assets/back2.svg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";

const REGISTER_ENDPOINT =
  "https://pta-wdln.onrender.com/api/auth/teacher/register";

const DEFAULT_SUBJECT_SPECIALIZATION = "General";

// Shared input styling: adapts automatically via Tailwind dark: modifier
const INPUT_BASE =
  "w-full h-12.5 rounded-[10px] text-[12px] font-normal focus:outline-none " +
  "bg-[#FAFAFA] text-gray-900 placeholder:text-[#969696] " +
  "dark:bg-[#141414] dark:text-white dark:placeholder:text-[#7A7A7A]";
const INPUT_BORDER =
  "border border-gray-200 focus:border-gray-400 " +
  "dark:border-[#3A3A3A] dark:focus:border-[#6B6B6B]";
const LABEL =
  "block text-[14px] font-medium text-[#303030] dark:text-gray-100 mb-1.5";

const SignUp = () => {
  const navigate = useNavigate();

  // Dynamic system theme listener
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Initial check on mount
    handleThemeChange(mediaQuery);

    // Listen for real-time device settings changes
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    schoolName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidPhone = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const handlePhoneChange = (e) => {
    let input = e.target.value;
    let cleaned = input.replace(/[^\d\s()+-]/g, "");

    if (cleaned.indexOf("+") > 0) {
      cleaned = cleaned.replace(/\+/g, "");
    }

    setFormData((prev) => ({ ...prev, phone: cleaned }));
  };

  const EMAIL_ALLOWED_CHARS = /[^a-zA-Z0-9@._%+-]/g;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = (value) => EMAIL_REGEX.test(value);

  const handleEmailChange = (e) => {
    const cleaned = e.target.value.replace(EMAIL_ALLOWED_CHARS, "");
    setFormData((prev) => ({ ...prev, workEmail: cleaned }));
  };

  const showEmailError =
    emailTouched &&
    formData.workEmail !== "" &&
    !isValidEmail(formData.workEmail);

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      isValidEmail(formData.workEmail) &&
      formData.schoolName.trim() !== "" &&
      isValidPhone(formData.phone) &&
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      agreedToTerms
    );
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
      const response = await fetchWithRetry(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "teacher",
          fullName: formData.fullName,
          workEmail: formData.workEmail,
          email: formData.workEmail,
          schoolName: formData.schoolName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          termsAccepted: agreedToTerms,
          phone: formData.phone,
          subjectSpecialization: DEFAULT_SUBJECT_SPECIALIZATION,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      localStorage.setItem("fullName", formData.fullName);
      localStorage.setItem("userEmail", formData.workEmail);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/teacher/verify", { state: { email: formData.workEmail } });
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment."
        );
      } else {
        setErrorMsg(err.message || "An error occurred during registration.");
      }
    } font-normal {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] px-6 py-6 w-full mx-auto flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate("/role")}
            className="absolute left-0 p-2 flex items-center justify-center"
          >
            <img src={back} alt="Back" className="w-5 h-5 -mt-8 dark:invert" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain mt-5" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-[#001216] dark:text-white">
            Create Your Account
          </h1>
          <p className="text-[14px] text-[#001216] dark:text-gray-400 mt-1">
            We’re Excited To Have You!
          </p>
        </div>

        {/* Display Error Message */}
        {errorMsg && (
          <div
            role="alert"
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-[10px] text-center dark:bg-red-950/50 dark:border-red-900 dark:text-red-300"
          >
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleNext} className="space-y-4">
          {/* Full Name */}
          <div className="mt-8">
            <label className={LABEL}>Full Name</label>
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`${INPUT_BASE} ${INPUT_BORDER} px-4`}
              placeholder="Enter your full name"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className={LABEL}>Work Email</label>
            <input
              type="email"
              name="workEmail"
              autoComplete="email"
              value={formData.workEmail}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)}
              className={`${INPUT_BASE} border px-4 ${
                showEmailError
                  ? "border-red-400 focus:border-red-400 dark:border-red-500"
                  : "border-gray-200 focus:border-gray-400 dark:border-[#3A3A3A] dark:focus:border-[#6B6B6B]"
              }`}
              placeholder="Example@gmail.com"
            />
            {showEmailError && (
              <p className="text-[12px] text-red-500 dark:text-red-400 mt-1">
                Enter a valid email address (e.g. name@gmail.com)
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className={LABEL}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`${INPUT_BASE} ${INPUT_BORDER} px-4`}
              placeholder="+1 234 567 8900"
            />
          </div>

          {/* Name of school */}
          <div>
            <label className={LABEL}>Name of school</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={(e) => {
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
              className={`${INPUT_BASE} ${INPUT_BORDER} px-4`}
              placeholder="E.g. Afrotech Academy"
            />
          </div>

          {/* Password */}
          <div>
            <label className={LABEL}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                className={`${INPUT_BASE} ${INPUT_BORDER} pl-4 pr-12`}
                placeholder="Enter your Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={LABEL}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${INPUT_BASE} ${INPUT_BORDER} pl-4 pr-12`}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2.5 mt-5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="sr-only peer"
            />
            <div
              className={`w-4.5 h-4.5 border rounded flex items-center justify-center transition-colors
               peer-focus-visible:ring-2 peer-focus-visible:ring-[#FF7B17] peer-focus-visible:ring-offset-2
               peer-focus-visible:ring-offset-white dark:peer-focus-visible:ring-offset-black ${
                 agreedToTerms
                   ? "bg-[#FF7B17] border-[#FF7B17]"
                   : "bg-white border-gray-400 dark:bg-transparent dark:border-gray-500"
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
            <span className="text-[13px] text-gray-800 dark:text-gray-200 font-normal">
              I agree with the Terms and Conditions
            </span>
          </label>

          {/* Submit Button */}
          <div className="mt-8 mb-4">
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full h-13 rounded-xl text-[16px] font-medium transition-colors flex items-center justify-center gap-2 ${
                isFormValid() && !isLoading
                  ? "bg-[#FF7B17] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-[#1F1F1F] dark:text-gray-600"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-4 w-full mt-6">
        <hr className="flex-1 border-t border-gray-300 dark:border-[#2E2E2E]" />
        <span className="font-normal text-[14px] text-[#333333] dark:text-gray-300 whitespace-nowrap">
          Or Continue With
        </span>
        <hr className="flex-1 border-t border-gray-300 dark:border-[#2E2E2E]" />
      </div>

      {/* Social Buttons */}
      <div className="flex items-center justify-center gap-10 w-full mt-8">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE]"
        >
          <img src={fb} alt="" />
        </button>

        <button
          type="button"
          aria-label="Continue with Google"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 dark:border-transparent shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={goo} alt="" />
        </button>

        <button
          type="button"
          aria-label="Continue with Apple"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 dark:border-transparent shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={app} alt="" />
        </button>
      </div>

      <div
        onClick={() => {
          navigate("/teacher/login");
        }}
        className="flex gap-3 items-center justify-center mt-10 cursor-pointer"
      >
        <p className="flex justify-center text-center font-normal text-[#001216] dark:text-gray-200 text-[16px]">
          Already an existing user?
        </p>

        <p className="font-medium text-[16px] text-[#FF7B17]">Log In</p>
      </div>
    </div>
  );
};

export default SignUp;