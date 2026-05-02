import React, { useState } from "react";
import boy from "../assets/BOY.jpg";
import family from "../assets/FAMILY.png";
import woman from "../assets/mama.jpg";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

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
        "Easily track assignments, attendance, and grades to support your child’s success.",
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
    <div className="min-h-screen w-full overflow-x-hidden">
      <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col justify-between px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        {/* TOP (Skip) */}
        <div className="flex justify-end">
          {currentSlide < slides.length - 1 && (
            <p
              onClick={handleSkip}
              className="text-white text-sm border-b border-white cursor-pointer"
            >
              Skip
            </p>
          )}
        </div>

        {/* CENTER CONTENT (MOVED DOWN) */}
        <div className="flex flex-col items-center text-center gap-4 px-14 mt-[64vh] sm:mt-[28vh]">
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
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-[#FF7B17]" : "bg-[#EEEEEE]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleNext}
            className="w-full max-w-md bg-[#FF7B17] text-white rounded-lg py-3 font-bold text-base"
          >
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </button>

          {currentSlide > 0 && (
            <button
              onClick={handleBack}
              className="text-white font-semibold text-base"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
