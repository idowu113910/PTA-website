import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back2.svg";
import ED from "../assets/ED role.svg";
import { saveTokenFromResponse } from "../utils/auth";

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

  // Guards the auto-send effect below against firing twice — React 18's
  // StrictMode intentionally double-invokes effects in development, which
  // would otherwise fire two separate "send code" requests on one mount.
  const hasAutoSentRef = useRef(false);

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

  // Reads the JSON body without crashing if the server sends an empty or
  // non-JSON response.
  const readJson = async (response) => {
    try {
      return await response.json();
    } catch (_) {
      return {};
    }
  };

  // The API may return `message` as a string or an array of strings
  const messageFrom = (data, fallback) => {
    if (Array.isArray(data?.message)) return data.message.join(", ");
    return data?.message || fallback;
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
      // No `role` here — the resend-code endpoint is confirmed to reject
      // unrecognized properties ("property role should not exist"), and
      // verify-code uses the same strict validation, so sending `role`
      // here would silently fail every verification attempt.
      const response = await fetchWithRetry(VERIFY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          messageFrom(data, "Verification failed. Please try again."),
        );
      }

      // Saves the access token (accessToken / access_token / token) so
      // authenticated requests can send it later.
      saveTokenFromResponse(data);

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

  // `silent` only hides the progress/success messages. A failure is always
  // shown (with the server's own message) — hiding it made it impossible to
  // tell why a teacher's code never arrived.
  const sendCode = async ({ silent = false } = {}) => {
    if (!email) return;
    if (!silent) {
      setResendMsg("");
      setErrorMsg("");
      setIsResending(true);
    }

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

      const data = await readJson(response);

      if (!response.ok) {
        console.error("resend-code failed:", response.status, data);
        throw new Error(
          messageFrom(
            data,
            `Couldn't send the code (error ${response.status}). Try again.`,
          ),
        );
      }

      if (!silent) {
        setResendMsg(
          messageFrom(data, "A new code has been sent to your email."),
        );
      }
    } catch (err) {
      if (err instanceof TypeError) {
        setErrorMsg(
          "Couldn't reach the server. Please check your connection and try again in a moment.",
        );
      } else {
        setErrorMsg(err.message || "An error occurred while sending the code.");
      }
    } finally {
      if (!silent) {
        setIsResending(false);
      }
    }
  };

  // Actively trigger sending a code the moment this screen loads with a
  // valid email, instead of relying solely on the registration endpoint
  // having already dispatched one. Runs once per email.
  useEffect(() => {
    if (!email || hasAutoSentRef.current) return;
    hasAutoSentRef.current = true;
    sendCode({ silent: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const handleResend = () => {
    if (isResending || !email) return;
    sendCode({ silent: false });
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
