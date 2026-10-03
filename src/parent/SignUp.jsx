import React, { useState } from "react";
import ED from "../assets/ED role.svg";
import back from "../assets/back2.svg";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import fb from "../assets/facebook.svg";
import goo from "../assets/Google.svg";
import app from "../assets/Apple.svg";
// Adjust this path to wherever your hook file lives.
import { useSystemTheme } from "../components/UserTheme";

const REGISTER_ENDPOINT =
  "https://pta-wdln.onrender.com/api/auth/parent/register";

// Shared input styling: light by default, dark when the device is in dark mode.
// NOTE: text is 16px on purpose — iOS Safari zooms the page in when you focus
// an input whose font size is below 16px.
const INPUT_BASE =
  "w-full h-12.5 rounded-[10px] text-[16px] focus:outline-none " +
  "bg-[#F8F8F8] text-gray-900 placeholder:text-[#969696] " +
  "dark:bg-[#141414] dark:text-white dark:placeholder:text-[#7A7A7A]";
const INPUT_BORDER =
  "border border-[#C3C6C9] focus:border-gray-400 " +
  "dark:border-[#3A3A3A] dark:focus:border-[#6B6B6B]";
const LABEL =
  "block text-[14px] font-medium text-gray-800 dark:text-gray-100 mb-1.5";

const SignUp = () => {
  const navigate = useNavigate();

  // Follows the device's light/dark setting and keeps the <html> "dark"
  // class in sync.
  useSystemTheme();

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    schoolName: "",
    studentCode: "",
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

  const isValidStudentCode = (value) => /^STU-\d{5}$/.test(value);

  // Characters an email address can legally contain
  const EMAIL_ALLOWED_CHARS = /[^a-zA-Z0-9@._%+-]/g;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isValidEmail = (value) => EMAIL_REGEX.test(value);

  // Phone validation: allows digits, spaces, hyphens, parens, and leading plus (7 to 15 digits total)
  const isValidPhone = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  const handleEmailChange = (e) => {
    // Strip invalid characters as user types
    const cleaned = e.target.value.replace(EMAIL_ALLOWED_CHARS, "");
    setFormData((prev) => ({ ...prev, workEmail: cleaned }));
  };

  // Restricts phone input to ONLY numbers and phone formatting characters (+, -, (), space)
  const handlePhoneChange = (e) => {
    let input = e.target.value;

    // Remove any character that is NOT a digit, space, plus, hyphen, or parenthesis
    let cleaned = input.replace(/[^\d\s()+-]/g, "");

    // Ensure '+' can only appear at the very beginning
    if (cleaned.indexOf("+") > 0) {
      cleaned = cleaned.replace(/\+/g, "");
    }

    setFormData((prev) => ({ ...prev, phone: cleaned }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStudentCodeChange = (e) => {
    const digitsOnly = e.target.value
      .toUpperCase()
      .replace(/^STU-?/, "")
      .replace(/[^0-9]/g, "")
      .slice(0, 5);

    const formatted = digitsOnly.length > 0 ? `STU-${digitsOnly}` : "";
    setFormData((prev) => ({ ...prev, studentCode: formatted }));
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      isValidEmail(formData.workEmail) &&
      formData.schoolName.trim() !== "" &&
      isValidStudentCode(formData.studentCode) &&
      isValidPhone(formData.phone) && // Validates phone number strictly
      formData.password.trim() !== "" &&
      formData.confirmPassword.trim() !== "" &&
      formData.password === formData.confirmPassword &&
      agreedToTerms === true
    );
  };

  // Wraps fetch with a single retry after a short delay. A `fetch()` that
  // rejects outright (TypeError, e.g. "Load failed"/"Failed to fetch") means
  // the request never reached the server — most commonly a CORS block or,
  // on a free Render instance, the backend still waking up from a cold
  // start. Retrying once after a pause gives a cold start a chance to
  // finish waking before we give up. It does nothing for a genuine CORS
  // misconfiguration — that always fails the same way and needs a backend fix.
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
          role: "parent",
          fullName: formData.fullName,
          email: formData.workEmail,
          schoolName: formData.schoolName,
          studentCode: formData.studentCode,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          termsAccepted: agreedToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again.",
        );
      }

      // Save user onboarding details locally
      localStorage.setItem("fullName", formData.fullName);
      localStorage.setItem("userEmail", formData.workEmail);
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to parent verification route, carrying the email forward
      // so Verify.jsx knows who the code belongs to
      navigate("/parent/verify", { state: { email: formData.workEmail } });
    } catch (err) {
      // A TypeError here (as opposed to the Error thrown above from a real
      // API response) means the request never completed — most likely a
      // CORS block on the backend, or the server being briefly unreachable.
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

  const emailInvalid =
    emailTouched && formData.workEmail && !isValidEmail(formData.workEmail);

  return (
    <div className="min-h-screen min-h-dvh bg-white dark:bg-[#000000] px-6 py-6 w-full mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate("/role")}
            className="absolute left-0 p-2 flex items-center justify-center"
          >
            {/* dark:invert flips a dark arrow to white on a black page */}
            <img src={back} alt="Back" className="w-5 h-5 dark:invert" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 dark:text-white">
            Create Your Account
          </h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1">
            We’re Excited To Have You!
          </p>
        </div>

        {/* Display Error Message */}
        {errorMsg && (
          <div
            role="alert"
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-[10px] text-center
             dark:bg-red-950/50 dark:border-red-900 dark:text-red-300"
          >
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleNext} className="space-y-4">
          {/* Full Name */}
          <div>
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
            <label className={LABEL}>Email Address</label>
            <input
              type="email"
              name="workEmail"
              autoComplete="email"
              value={formData.workEmail}
              onChange={handleEmailChange}
              onBlur={() => setEmailTouched(true)}
              className={`${INPUT_BASE} border px-4 ${
                emailInvalid
                  ? "border-red-400 dark:border-red-500"
                  : "border-[#C3C6C9] dark:border-[#3A3A3A]"
              }`}
              placeholder="Example@gmail.com"
            />
            {emailInvalid && (
              <p className="text-[12px] text-red-500 dark:text-red-400 mt-1">
                Enter a valid email address
              </p>
            )}
          </div>

          {/* Strictly Filtered Phone Number Field */}
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

          {/* School Name */}
          <div>
            <label className={LABEL}>Name of school</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleInputChange}
              className={`${INPUT_BASE} ${INPUT_BORDER} px-4`}
              placeholder="E.g afrotech"
            />
          </div>

          {/* Student Code */}
          <div>
            <label className={LABEL}>Student Code</label>
            <input
              type="text"
              name="studentCode"
              value={formData.studentCode}
              onChange={handleStudentCodeChange}
              className={`${INPUT_BASE} ${INPUT_BORDER} px-4`}
              placeholder="STU-98432"
              maxLength={9}
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
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Accessible Checkbox */}
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
          <div className="mt-6">
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

      {/* Social buttons keep a light tile in dark mode so the brand icons
          (e.g. the black Apple logo) stay visible. */}
      <div className="flex items-center justify-center gap-10 w-full mt-8">
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE]"
        >
          <img src={fb} alt="Facebook" />
        </button>

        <button
          type="button"
          aria-label="Continue with Google"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 dark:border-transparent shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={goo} alt="Google" />
        </button>

        <button
          type="button"
          aria-label="Continue with Apple"
          className="w-12 h-12 rounded-[9.89px] flex items-center justify-center bg-[#EEEEEE] border border-gray-200 dark:border-transparent shadow-sm hover:shadow-md transition-shadow"
        >
          <img src={app} alt="Apple" />
        </button>
      </div>

      <div className="flex gap-2 items-center justify-center mt-10">
        <span className="font-normal text-[#001216] dark:text-gray-200 text-[16px]">
          Already an existing user?
        </span>
        <button
          type="button"
          onClick={() => navigate("/parent/login")}
          className="font-medium text-[16px] text-[#FF7B17] hover:underline focus:outline-none"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
