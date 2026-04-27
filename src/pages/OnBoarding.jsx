import React, { useState } from "react";
import boy from "../assets/BOY.jpg";
import family from "../assets/FAMILY.png";
import woman from "../assets/mama.jpg";
import pag from "../assets/Pagination.svg";
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
      setCurrentSlide(currentSlide + 1);
    } else {
      // Navigate to /role on the last slide
      navigate("/role");
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    navigate("/role");
  };

  return (
    <div className="h-[812px] w-screen overflow-x-hidden">
      <div
        className="bg-cover h-full w-full bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div>
          <div className="flex flex-col justify-center items-center pt-130 gap-y-[28px] relative">
            <div className="flex flex-col items-center text-center gap-y-[5px]">
              <h2 className="font-bold text-[20px] text-[white]">
                {slides[currentSlide].title}
              </h2>
              <p className="font-normal text-[16px] text-white px-8 text-center">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-[#FF7B17]" : "bg-[#EEEEEE]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-[335px] h-[50px] bg-[#FF7B17] text-white rounded-[10px] font-bold text-[18px]"
            >
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </button>

            {/* Back Button - Only show after first slide */}
            {currentSlide > 0 && (
              <button
                onClick={handleBack}
                className="text-[#FFFDFD] font-bold text-[18px] cursor-pointer"
              >
                Back
              </button>
            )}

            {currentSlide < 2 && (
              <p
                onClick={handleSkip}
                className="text-[#FFFDFD] font-medium text-[16px] absolute top-[56px] right-[36px] pb-1 border-b border-[#FFFDFD] cursor-pointer"
              >
                Skip
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
