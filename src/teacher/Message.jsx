import React from "react";
import back from "../assets/back2.svg";
import add from "../assets/add student.svg";
import srch from "../assets/search.svg";
import shit from "../assets/img shit.svg";
import bo from "../assets/Bosun.svg";
import pl from "../assets/plus sign.svg";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";

const Assignment = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-[800px] relative">
      <div className="flex flex-col py-1">
        <div
          className="flex items-center gap-4 p-6 cursor-pointer"
          onClick={() => setScreen("report")}
        >
          <h2 className="text-[20px] font-bold">Message</h2>

          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the back navigation
              setShowAddStudent(true);
            }}
            className="flex ml-32 cursor-pointer"
          ></div>
        </div>

        <div className="w-[333px] h-[48px] border-[1px] border-[#D9D9D9] rounded-[7px] bg-[#FCFCFC] ml-6 -mt-2">
          <div className="flex gap-[11px] p-2 mt-1">
            <img src={srch} alt="" />
            <input
              type="text"
              placeholder="Search Conversations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none font-normal text-[14px] text-[#616161] bg-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-[30px] mx-auto ml-6 mt-6">
        <p className="w-[91px] h-[35px] rounded-[5px] bg-[#FF7B17] py-[5px] px-[10px] text-[16px] font-normal text-white text-center">
          All
        </p>

        <p className="w-[91px] h-[35px] rounded-[5px] bg-[#EFEFEF] py-[5px] px-[10px] text-[16px] font-normal text-[#000000] text-center">
          Unread 5
        </p>

        <p className="w-[91px] h-[35px] rounded-[5px] bg-[#EFEFEF] py-[5px] px-[10px] text-[16px] font-normal text-[#000000] text-center">
          Calls
        </p>
      </div>

      <div>
        <div className="ml-6 mt-8 flex w-[333px]">
          <img src={shit} alt="" />

          <div className="flex flex-col ml-3">
            <div className="flex font-normal text-[#1E1D1D] justify-between">
              <p className="font-normal text-[16px] text-[#1C1C1C]">
                Sharon Smitty
              </p>

              <p>11:00AM</p>
            </div>
            <p className="font-medium text-[12px] text-[#000000]">
              Does your child need additional help in any subject?
            </p>
          </div>
        </div>

        <div className="ml-6 mt-8 flex w-[333px]">
          <img src={bo} alt="" />

          <div className="flex flex-col ml-3">
            <div className="flex font-normal text-[#1E1D1D] justify-between">
              <p className="font-normal text-[16px] text-[#1C1C1C]">
                Bosun Adekoya
              </p>

              <p>1:00PM</p>
            </div>
            <p className="font-medium text-[12px] text-[#000000]">
              How does your child feel about school and learning at home?
            </p>
          </div>
        </div>

        <div className="ml-6 mt-8 flex w-[333px]">
          <img src={bo} alt="" />

          <div className="flex flex-col ml-3">
            <div className="flex font-normal text-[#1E1D1D] justify-between">
              <p className="font-normal text-[16px] text-[#1C1C1C]">
                Bosun Adekoya
              </p>

              <p>1:00PM</p>
            </div>
            <p className="font-medium text-[12px] text-[#000000]">
              How does your child feel about school and learning at home?
            </p>
          </div>
        </div>

        <div className="ml-6 mt-8 flex w-[333px]">
          <img src={bo} alt="" />

          <div className="flex flex-col ml-3">
            <div className="flex font-normal text-[#1E1D1D] justify-between">
              <p className="font-normal text-[16px] text-[#1C1C1C]">
                Bosun Adekoya
              </p>

              <p>1:00PM</p>
            </div>
            <p className="font-medium text-[12px] text-[#000000]">
              How does your child feel about school and learning at home?
            </p>
          </div>
        </div>
      </div>
      <img src={pl} alt="" className="relative top-23 left-78" />

      <BottomNavigation />
    </div>
  );
};

export default Assignment;
