import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back2.svg";
import ED from "../assets/ED role.svg";

const CODE_LENGTH = 6;
const RESEND_ENDPOINT = "https://pta-wdln.onrender.com/api/auth/resend-code";
const VERIFY_ENDPOINT = "https://pta-wdln.onrender.com/api/auth/verify-code";

const TeacherVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

    // Listen for real-time device theme changes
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  const email = location.state?.email || "";

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const inputRefs = useRef([]);

  const code = digits.join("");
  const isCodeComplete = code.length === CODE_LENGTH;

  // Focus the first input field on component load
  useEffect(() => {
    if (email && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [email]);

  // Redirect to teacher signup if no email was passed in navigation state
  useEffect(() => {
    if (!email) {
      navigate("/teacher/signup", { replace: true });
    }
  }, [email, navigate]);

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

  const handleDigitChange = (index, value) => {
    const clean = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (!pasted) return;
    e.preventDefault();

    const next = Array(CODE_LENGTH).fill("");
    pasted
      .slice(0, CODE_LENGTH)
      .split("")
      .forEach((char, i) => (next[i] = char));

    setDigits(next);
    const lastFilled = Math.min(pasted.length, CODE_LENGTH) - 1;
    inputRefs.current[lastFilled]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isCodeComplete || !email) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetchWithRetry(VERIFY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, role: "teacher" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Verification failed. Please try again.",
        );
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/teacher/login");
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment.",
        );
      } else {
        setErrorMsg(err.message || "An error occurred during verification.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResending || !email) return;

    setResendMsg("");
    setErrorMsg("");
    setIsResending(true);

    try {
      // The resend-code endpoint only accepts `email` — sending `role`
      // makes the API reject the request ("property role should not exist").
      const response = await fetchWithRetry(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Couldn't resend the code. Try again.");
      }

      setResendMsg("A new code has been sent to your email.");
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment.",
        );
      } else {
        setErrorMsg(
          err.message || "An error occurred while resending the code.",
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] px-6 py-6 w-full mx-auto flex flex-col justify-between transition-colors duration-200">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/teacher/signup")}
            className="absolute left-0 p-2 flex items-center justify-center cursor-pointer"
          >
            <img src={back} alt="Back" className="w-5 h-5 dark:invert" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900 dark:text-white">
            Verify Your Email
          </h1>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 mt-1 px-4">
            Enter the {CODE_LENGTH}-digit code we sent to{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {email}
            </span>
          </p>
        </div>

        {/* Code Input */}
        <form onSubmit={handleVerify}>
          <div
            className="flex items-center justify-center gap-2.5 mt-10"
            onPaste={handlePaste}
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-13 border border-[#C3C6C9] dark:border-[#3A3A3A] bg-[#F8F8F8] dark:bg-[#141414] rounded-[10px] text-center text-[18px]
                 font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#FF7B17] dark:focus:border-[#FF7B17] focus:bg-white dark:focus:bg-[#1A1A1A] transition-colors"
              />
            ))}
          </div>

          {/* Error / resend feedback */}
          {errorMsg && (
            <p className="text-[13px] text-red-500 dark:text-red-400 text-center mt-4">
              {errorMsg}
            </p>
          )}
          {resendMsg && !errorMsg && (
            <p className="text-[13px] text-[#1D9E75] dark:text-[#26D09B] text-center mt-4">
              {resendMsg}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={!isCodeComplete || isLoading}
              className={`w-full h-12.5 rounded-xl text-[16px] font-medium transition-colors ${
                isCodeComplete && !isLoading
                  ? "bg-[#FF7B17] text-white cursor-pointer hover:bg-[#e06910]"
                  : "bg-gray-200 text-gray-400 dark:bg-[#1F1F1F] dark:text-gray-600 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {/* Resend */}
        <div className="flex gap-2 items-center justify-center mt-8">
          <p className="font-normal text-[#001216] dark:text-gray-300 text-[14px]">
            Didn't receive a code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className={`font-medium text-[14px] cursor-pointer ${
              isResending
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-[#FF7B17]"
            }`}
          >
            {isResending ? "Sending..." : "Resend"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherVerifyEmail;
