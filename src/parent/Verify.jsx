import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import back from "../assets/back2.svg";
import ED from "../assets/ED role.svg";

const CODE_LENGTH = 6;
const RESEND_ENDPOINT = "https://pta-wdln.onrender.com/api/auth/resend-code";
const VERIFY_ENDPOINT = "https://pta-wdln.onrender.com/api/auth/verify-code";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Signup/login screens can pass the email forward via navigate("/verify", { state: { email } })
  const email = location.state?.email || "your email";

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const inputRefs = useRef([]);

  const code = digits.join("");
  const isCodeComplete = code.length === CODE_LENGTH;

  const handleDigitChange = (index, value) => {
    // Only allow a single numeric character per box
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
    if (!isCodeComplete) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch(VERIFY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
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

      navigate("/teacher/home");
    } catch (err) {
      setErrorMsg(err.message || "An error occurred during verification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendMsg("");
    setErrorMsg("");
    try {
      const response = await fetch(RESEND_ENDPOINT, {
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
      setErrorMsg(err.message || "An error occurred while resending the code.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 w-full mx-auto flex flex-col justify-between">
      <div>
        {/* Header Navigation */}
        <div className="relative flex items-center justify-center pt-2 mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-0 p-2 flex items-center justify-center cursor-pointer"
          >
            <img src={back} alt="Back" className="w-5 h-5" />
          </button>
          <img src={ED} alt="Logo" className="h-16 object-contain" />
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h1 className="text-[22px] font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-[14px] text-gray-600 mt-1 px-4">
            Enter the {CODE_LENGTH}-digit code we sent to{" "}
            <span className="font-medium text-gray-800">{email}</span>
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
                className="w-11 h-13 border border-[#C3C6C9] bg-[#F8F8F8] rounded-[10px] text-center text-[18px]
                 font-semibold text-gray-900 focus:outline-none focus:border-[#FF7B17] focus:bg-white transition-colors"
              />
            ))}
          </div>

          {/* Error / resend feedback */}
          {errorMsg && (
            <p className="text-[13px] text-red-500 text-center mt-4">
              {errorMsg}
            </p>
          )}
          {resendMsg && !errorMsg && (
            <p className="text-[13px] text-[#1D9E75] text-center mt-4">
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
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>

        {/* Resend */}
        <div className="flex gap-2 items-center justify-center mt-8">
          <p className="font-normal text-[#001216] text-[14px]">
            Didn't receive a code?
          </p>
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-[14px] text-[#FF7B17] cursor-pointer"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
