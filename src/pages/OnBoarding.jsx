import React, { useState, useEffect } from "react";
import boy from "../assets/BOY.jpg";
import family from "../assets/FAMILY.png";
import woman from "../assets/mama.jpg";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Fix for Safari (iOS/macOS) viewport height quirks.
  // Safari resizes its chrome (address bar/toolbar) on scroll, which makes
  // 100vh unreliable. We compute the real visible height in JS and store it
  // as a CSS custom property, then use that as the primary source of truth,
  // with 100dvh as a fallback for browsers that support it natively.
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  const slides = [
    {
      image: boy,
      title: "Stay in the Loop",
      description:
        "Get realtime updates from teachers about your child's progress all in one place.",
    },
    {
      image: family,
      title: "Monitor child's Growth",
      description:
        "Easily track assignments, attendance, and grades to support your child's success.",
    },
    {
      image: woman,
      title: "Teaching takes a Team",
      description:
        "Work hand-in-hand with parents to support every child's learning journey.",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      navigate("/role");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    navigate("/role");
  };

  return (
    <div
      className="w-full overflow-hidden select-none"
      style={{
        // Fallback chain: JS-computed height (most reliable on Safari) ->
        // 100dvh (modern browsers) -> 100vh (last resort)
        height: "calc(var(--vh, 1vh) * 100)",
        minHeight: "100dvh",
      }}
    >
      <div
        className="safe-top safe-bottom relative w-full h-full bg-cover bg-center bg-no-repeat flex flex-col justify-between px-4 pt-6 pb-8"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        {/* TOP (Skip) */}
        <div className="flex justify-end pt-2">
          {currentSlide < slides.length - 1 && (
            <p
              onClick={handleSkip}
              className="text-white text-sm border-b border-white cursor-pointer"
            >
              Skip
            </p>
          )}
        </div>

        {/* CENTER CONTENT */}
        <div className="flex flex-col items-center text-center gap-4 px-6 sm:px-14 mt-auto mb-6">
          <h2 className="font-bold text-lg text-white">
            {slides[currentSlide].title}
          </h2>

          <p className="text-sm text-white max-w-sm">
            {slides[currentSlide].description}
          </p>

          {/* Pagination */}
          <div className="flex gap-2 mt-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#FF7B17] w-5" : "bg-[#EEEEEE]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col items-center gap-3 w-full shrink-0">
          <button
            onClick={handleNext}
            className="w-full max-w-md bg-[#FF7B17] text-white rounded-lg py-3 font-bold text-base shadow-md 
            active:scale-95 transition-transform cursor-pointer"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </button>

          {currentSlide > 0 ? (
            <button
              onClick={handleBack}
              className="text-white font-semibold text-base py-1 cursor-pointer"
            >
              Back
            </button>
          ) : (
            /* Spacer to prevent layout shift when back button isn't visible */
            <div className="h-8" />
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
