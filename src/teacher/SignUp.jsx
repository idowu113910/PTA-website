import React, { useState } from "react";
import ED from "../assets/ED role.svg";
import back from "../assets/back2.svg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";

const REGISTER_ENDPOINT =
  "https://pta-wdln.onrender.com/api/auth/teacher/register";

// The endpoint requires `subjectSpecialization`, but this screen has no
// input for it. A required field is likely to reject an empty string, so a
// non-empty default is sent instead. Change this value if you'd like a
// different placeholder, or replace it with a real input later.
const DEFAULT_SUBJECT_SPECIALIZATION = "General";

const SignUp = () => {
  const navigate = useNavigate();
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

  // Phone validation: allows digits, spaces, hyphens, parens, and a leading
  // plus (7 to 15 digits total) — same rule as the parent signup form
  const isValidPhone = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  // Restricts phone input to ONLY numbers and phone formatting characters (+, -, (), space)
  const handlePhoneChange = (e) => {
    let input = e.target.value;
    let cleaned = input.replace(/[^\d\s()+-]/g, "");

    // Ensure '+' can only appear at the very beginning
    if (cleaned.indexOf("+") > 0) {
      cleaned = cleaned.replace(/\+/g, "");
    }

    setFormData((prev) => ({ ...prev, phone: cleaned }));
  };

  // Characters an email address can legally contain: letters, numbers,
  // and . _ % + - @ (digits were previously being stripped out)
  const EMAIL_ALLOWED_CHARS = /[^a-zA-Z0-9@._%+-]/g;
  // Must be shaped like name@domain.tld
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = (value) => EMAIL_REGEX.test(value);

  const handleEmailChange = (e) => {
    // Strip anything that isn't a valid email character as the person types
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

  // Wraps fetch with a single retry after a short delay — a rejected fetch
  // (e.g. "Load failed") most often means a Render free-tier cold start
  // dropped the connection, and retrying once gives it a chance to finish
  // waking up. Does nothing for a genuine CORS block, which fails the same
  // way every time.
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
          // The endpoint's schema lists both `workEmail` and `email` as
          // required, holding the same address in its example payload —
          // sending both here so registration succeeds regardless of which
          // key the backend actually reads.
          workEmail: formData.workEmail,
          email: formData.workEmail,
          schoolName: formData.schoolName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          termsAccepted: agreedToTerms,
          phone: formData.phone,
          // Required by the endpoint but not part of this screen's design —
          // sent as a non-empty default so validation passes without adding
          // a field the form doesn't visually ask for.
          subjectSpecialization: DEFAULT_SUBJECT_SPECIALIZATION,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      localStorage.setItem("fullName", formData.fullName);
      localStorage.setItem("userEmail", formData.workEmail);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to teacher verification route, carrying the email forward
      navigate("/teacher/verify", { state: { email: formData.workEmail } });
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment.",
        );
      } else {
        setErrorMsg(err.message || "An error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Explicit white background — this screen intentionally does NOT use ThemeContext/useTheme
    // and should never be affected by light/dark mode.
    <div className="min-h-screen bg-[#ffffff] px-6 py-6 w-full mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 ">
          <button
            type="button"
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

        {/* Display Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-[10px] text-center">
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleNext} className="space-y-4">
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
              autoComplete="email"
              value={formData.workEmail}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)}
              className={`w-full h-12.5 bg-[#FAFAFA] border rounded-[10px] px-4 text-[12px] font-normal
               text-gray-900 placeholder:text-[#969696] focus:outline-none ${
                 showEmailError
                   ? "border-red-400 focus:border-red-400"
                   : "border-gray-200 focus:border-gray-400"
               }`}
              placeholder="Example@gmail.com"
            />
            {showEmailError && (
              <p className="text-[12px] text-red-500 mt-1">
                Enter a valid email address (e.g. name@gmail.com)
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[14px] font-medium text-[#303030] mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full h-12.5 bg-[#FAFAFA] border border-gray-200 rounded-[10px] px-4 text-[12px] font-normal
               text-gray-900 placeholder:text-[#969696] focus:outline-none focus:border-gray-400"
              placeholder="+1 234 567 8900"
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

          {/* Submit Button */}
          <div className="mt-8 mb-4">
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`w-full h-13 rounded-xl text-[16px] font-medium transition-colors flex items-center justify-center gap-2 ${
                isFormValid() && !isLoading
                  ? "bg-[#FF7B17] text-white cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
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
