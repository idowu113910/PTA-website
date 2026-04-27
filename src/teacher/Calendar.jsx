import { useState, useRef, useEffect } from "react";
import bk from "../assets/back.svg";
import ft from "../assets/front.svg";
import beah from "../assets/BEAH.svg";
import drl from "../assets/Drill.svg";
import ihs from "../assets/IHS.svg";
import kd from "../assets/kiddd.svg";
import back from "../assets/back2.svg";
import pta from "../assets/PTA.svg";
import sch from "../assets/SCH.svg";
import qz from "../assets/quiz.svg";
import qd from "../assets/debate.svg";
import cult from "../assets/cult.svg";
import day from "../assets/day.svg";
import pl from "../assets/plus sign.svg";
import cal from "../assets/calendar3.svg";
import arr from "../assets/arr down.svg";
import cnc from "../assets/cancel back btn.svg";
import cl from "../assets/clock.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);
import kids from "../assets/kdd.jpg";
import re from "../assets/re-time.svg";
import loc from "../assets/loc.svg";
import BottomNavigation from "../components/BottomNavigation";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

const Notifications = () => {
  const [currentDate, setCurrentDate] = useState(new Date("2025-06-30"));
  const [selectedDate, setSelectedDate] = useState(null);
  const [studentDOB, setStudentDOB] = useState(null);
  const [isDOBOpen, setIsDOBOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [startTime, setStartTime] = useState({ hour: 9, min: 0, period: "AM" });
  const [endTime, setEndTime] = useState({ hour: 9, min: 0, period: "AM" });
  const [openPicker, setOpenPicker] = useState(null);
  const pickerRef = useRef(null);
  const [showEventCard, setShowEventCard] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showScreen, setShowScreen] = useState(false);

  useEffect(() => {
    if (showScreen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [showScreen]);

  const formatTime = (t) =>
    `${t.hour}:${String(t.min).padStart(2, "0")}${t.period}`;

  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpenPicker(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const eventTypes = ["Parent Meeting", "Cultural/Arts", "Academic"];
  const genders = ["Male", "Female", "Other"];

  const handleSelectEventType = (eventType) => {
    setSelectedEventType(eventType);
    setIsEventTypeOpen(false);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setIsGenderOpen(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowScreen(false);
    }, 1200);
  };

  const isEventFormValid =
    eventTitle.trim() !== "" &&
    studentDOB !== null &&
    selectedEventType !== "" &&
    eventLocation.trim() !== "";

  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selected, setSelected] = useState(null);

  const { year, month } = current;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => {
    setCurrent((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 },
    );
    setSelected(null);
  };

  const nextMonth = () => {
    setCurrent((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 },
    );
    setSelected(null);
  };

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  if (showMore) {
    return (
      <div
        className={`h-[812px] relative ${showScreen ? "overflow-hidden" : ""}`}
      >
        <div
          className="flex items-center gap-4 p-6 cursor-pointer"
          onClick={() => setShowMore(false)}
        >
          <img src={back} alt="back" />
          <h2 className="text-[20px] font-medium">Upcoming Event</h2>
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4 relative">
          <img src={ihs} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Inter House Sport
            </p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={kd} alt="" className="ml-12" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4 relative">
          <img src={beah} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Spelling Drill
            </p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={drl} alt="" className="ml-20" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4 relative">
          <img src={pta} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              PTA Meetings
            </p>
            <p className="font-normal text-[12px] text-black">
              July 15, 2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">9</span>AM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={sch} alt="" className="ml-20" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4 relative">
          <img src={qz} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Quiz and Debate
            </p>
            <p className="font-normal text-[12px] text-black">
              July 18 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={qd} alt="" className="ml-14" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4 relative">
          <img src={cult} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Cultural Day
            </p>
            <p className="font-normal text-[12px] text-black whitespace-nowrap">
              August 12, 2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">9</span>AM
            </p>
            <p className="font-medium text-[12px] text-black mt-2 whitespace-nowrap">
              School Field
            </p>
          </div>
          <img src={day} alt="" className="ml-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[812px] relative">
      <h2 className="font-bold text-[20px] p-6">Calendar</h2>

      {/* Month Navigation */}
      <div className="flex w-[328.27px] gap-[114px] ml-7 items-center">
        <img
          src={bk}
          alt="previous"
          onClick={prevMonth}
          className="cursor-pointer"
        />
        <p className="font-bold text-[18px]">
          {MONTH_NAMES[month].slice(0, 3)} {year}
        </p>
        <img
          src={ft}
          alt="next"
          onClick={nextMonth}
          className="cursor-pointer"
        />
      </div>

      {/* Calendar Grid */}
      <div className="ml-7 mt-4 w-[328.27px] p-3">
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[14px] font-normal text-[black] py-1 tracking-wide"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[2px]">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const selectedFlag = selected === day;
            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                className={`aspect-square w-full text-[14px] font-bold flex items-center justify-center border-none cursor-pointer transition-all duration-150 ${
                  selectedFlag
                    ? "text-yellow-400 font-bold"
                    : "bg-transparent text-black"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <h2 className="text-[18px] font-bold text-black ml-7 mt-1">
        Todays Events
      </h2>

      <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-5 relative">
        <img src={beah} alt="" className="w-[32px] h-[32px] my-auto" />
        <div className="ml-3">
          <p className="text-black font-normal text-[18px]">Spelling Drill</p>
          <p className="font-normal text-[12px] text-black">
            July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
            <span className="font-semibold text-[12px]">9</span>AM
          </p>
          <p className="font-medium text-[12px] text-black mt-2">School Hall</p>
        </div>
        <img src={drl} alt="" className="ml-21" />
      </div>

      <div className="flex w-[338px] justify-between ml-6.5 mt-6.5">
        <p className="text-[18px] font-bold text-black">Upcoming Events</p>
        <p
          onClick={() => setShowMore(true)}
          className="font-normal text-[#FF7B17] text-[14px] cursor-pointer"
        >
          View More
        </p>
      </div>

      <div className="relative overflow-y-auto pb-28">
        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-6">
          <img src={ihs} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Inter House Sport
            </p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={kd} alt="" className="ml-12" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4">
          <img src={pta} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              PTA Meetings
            </p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={sch} alt="" className="ml-20" />
        </div>

        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-4">
          <img src={qz} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px] whitespace-nowrap">
              Children's day
            </p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">12</span>PM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={qd} alt="" className="ml-20" />
        </div>

        <img
          src={pl}
          alt=""
          className="fixed bottom-[84px] right-7 cursor-pointer z-10"
          onClick={() => setShowScreen(true)}
        />
      </div>

      <BottomNavigation />

      {/* ADD NEW EVENT PANEL — overlays on top, calendar stays visible beneath */}
      {showScreen && (
        <div
          className={`fixed inset-x-0 bottom-0 top-[4%] bg-white rounded-t-[20px] shadow-2xl z-50 flex flex-col h-full ${isClosing ? "slide-down" : "slide-up"}`}
        >
          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto pb-6 min-h-0">
            <div className="flex relative">
              <h1 className="text-2xl font-bold mt-18 pl-7">Add New Event</h1>
              <button onClick={handleClose} className="">
                <img src={cnc} alt="" className="relative bottom-4 left-33" />
              </button>
            </div>

            <div className="flex flex-col ml-7 mt-7">
              <h4 className="font-medium text-[16px] text-[#303030] -ml-1">
                Event Title
              </h4>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="enter event title"
                className="w-[336px] h-[55px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1.5"
              />
            </div>

            <div className="p-6 -mt-2 ml-2">
              <h5 className="font-medium text-[16px] text-[#303030] -ml-1.5">
                Date
              </h5>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={
                    studentDOB
                      ? studentDOB.toLocaleDateString("en-GB")
                      : "dd/mm/yy"
                  }
                  placeholder="Select date"
                  onClick={() => setIsDOBOpen(true)}
                  className="w-[334px] h-[57px] rounded-[8px] border-[1px] border-[#0000001F] mt-2 font-normal text-[#303030] pl-3 cursor-pointer -ml-2"
                />
                <img
                  src={cal}
                  alt="calendar"
                  onClick={() => setIsDOBOpen(true)}
                  className="absolute left-[87%] bottom-[30%] cursor-pointer"
                />
                {isDOBOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-[60]">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <DatePicker
                        selected={studentDOB}
                        onChange={(date) => {
                          setStudentDOB(date);
                          setIsDOBOpen(false);
                        }}
                        inline
                        showPopperArrow={false}
                        locale="en-GB"
                      />
                      <button
                        onClick={() => setIsDOBOpen(false)}
                        className="mt-2 px-4 py-2 bg-[#3B82F6] text-white rounded-md w-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 -mt-8">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Gender
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGenderOpen(!isGenderOpen)}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                >
                  <span
                    className={`${selectedGender ? "text-[14px] text-[#303030] font-normal" : "text-[14px] text-gray-400"}`}
                  >
                    {selectedGender || "Select a gender"}
                  </span>
                  <img
                    src={arr}
                    alt="dropdown"
                    className={`transition-transform duration-200 ${isGenderOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isGenderOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                    {genders.map((gender) => (
                      <div
                        key={gender}
                        onClick={() => handleSelectGender(gender)}
                        className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                      >
                        {gender}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              ref={pickerRef}
              className="flex gap-[18px] h-[85px] w-[336px] mx-auto ml-5.5 -mt-2"
            >
              {/* START TIME */}
              <div className="relative">
                <h2 className="font-medium text-[16px] text-[#303030]">
                  Start Time
                </h2>
                <div className="w-[158px] h-[55px] rounded-[8px] border border-black/12 py-[8px] px-[12px] flex items-center justify-between mt-2">
                  <p className="font-normal text-[14px] text-[#303030]">
                    {formatTime(startTime)}
                  </p>
                  <button
                    onClick={() =>
                      setOpenPicker(openPicker === "start" ? null : "start")
                    }
                  >
                    <img src={cl} alt="" className="w-[19.22px] h-[18px]" />
                  </button>
                </div>
                {openPicker === "start" && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-[170px] bg-white rounded-[12px] border border-black/12 shadow-lg p-3 z-50">
                    <div className="flex items-center gap-1 mb-2">
                      <select
                        value={startTime.hour}
                        onChange={(e) =>
                          setStartTime({
                            ...startTime,
                            hour: Number(e.target.value),
                          })
                        }
                        className="border border-black/15 rounded-md px-2 py-1 text-sm font-medium text-[#303030] w-14 text-center"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ),
                        )}
                      </select>
                      <span className="font-semibold text-[#303030]">:</span>
                      <select
                        value={startTime.min}
                        onChange={(e) =>
                          setStartTime({
                            ...startTime,
                            min: Number(e.target.value),
                          })
                        }
                        className="border border-black/15 rounded-md px-2 py-1 text-sm font-medium text-[#303030] w-14 text-center"
                      >
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                          (m) => (
                            <option key={m} value={m}>
                              {String(m).padStart(2, "0")}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="flex rounded-md overflow-hidden border border-black/12 mb-3 w-full">
                      {["AM", "PM"].map((p) => (
                        <button
                          key={p}
                          onClick={() =>
                            setStartTime({ ...startTime, period: p })
                          }
                          className={`flex-1 py-1 text-xs font-semibold transition-colors ${startTime.period === p ? "bg-indigo-600 text-white" : "bg-gray-50 text-gray-500"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setOpenPicker(null)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded-lg"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* END TIME */}
              <div className="relative">
                <h2 className="font-medium text-[16px] text-[#303030]">
                  End Time
                </h2>
                <div className="w-[158px] h-[55px] rounded-[8px] border border-black/12 py-[8px] px-[12px] flex items-center justify-between mt-2">
                  <p className="font-normal text-[14px] text-[#303030]">
                    {formatTime(endTime)}
                  </p>
                  <button
                    onClick={() =>
                      setOpenPicker(openPicker === "end" ? null : "end")
                    }
                  >
                    <img src={cl} alt="" className="w-[19.22px] h-[18px]" />
                  </button>
                </div>
                {openPicker === "end" && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-[170px] bg-white rounded-[12px] border border-black/12 shadow-lg p-3 z-50">
                    <div className="flex items-center gap-1 mb-2">
                      <select
                        value={endTime.hour}
                        onChange={(e) =>
                          setEndTime({
                            ...endTime,
                            hour: Number(e.target.value),
                          })
                        }
                        className="border border-black/15 rounded-md px-2 py-1 text-sm font-medium text-[#303030] w-14 text-center"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (h) => (
                            <option key={h} value={h}>
                              {h}
                            </option>
                          ),
                        )}
                      </select>
                      <span className="font-semibold text-[#303030]">:</span>
                      <select
                        value={endTime.min}
                        onChange={(e) =>
                          setEndTime({
                            ...endTime,
                            min: Number(e.target.value),
                          })
                        }
                        className="border border-black/15 rounded-md px-2 py-1 text-sm font-medium text-[#303030] w-14 text-center"
                      >
                        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map(
                          (m) => (
                            <option key={m} value={m}>
                              {String(m).padStart(2, "0")}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                    <div className="flex rounded-md overflow-hidden border border-black/12 mb-3 w-full">
                      {["AM", "PM"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setEndTime({ ...endTime, period: p })}
                          className={`flex-1 py-1 text-xs font-semibold transition-colors ${endTime.period === p ? "bg-indigo-600 text-white" : "bg-gray-50 text-gray-500"}`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setOpenPicker(null)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-1.5 rounded-lg"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col ml-7 mt-4.5">
              <h4 className="font-medium text-[16px] text-[#303030] -ml-1">
                Location
              </h4>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="enter event location"
                className="w-[336px] h-[55px] rounded-[8px] border-[1px] py-[8px] px-[12px] placeholder:text-[14px] font-normal border-[#0000001F] mt-2 -ml-1.5"
              />
            </div>

            <div className="p-6 -mt-2">
              <label className="block text-[16px] font-medium text-[#303030] mb-2">
                Event Types
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                  className="w-[334px] h-[57px] px-[12px] border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                >
                  <span
                    className={`${selectedEventType ? "text-[14px] text-[#303030] font-normal" : "text-[14px] text-gray-400"}`}
                  >
                    {selectedEventType || "Select an event type"}
                  </span>
                  <img
                    src={arr}
                    alt="dropdown"
                    className={`transition-transform duration-200 ${isEventTypeOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isEventTypeOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md max-h-[200px] overflow-y-auto">
                    {eventTypes.map((eventType) => (
                      <div
                        key={eventType}
                        onClick={() => handleSelectEventType(eventType)}
                        className="px-4 py-3 text-[14px] font-normal cursor-pointer hover:bg-[#EFF6FF]"
                      >
                        {eventType}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SAVE BUTTON - no longer fixed, sits at bottom of flex column */}
          <div className="bg-white border-t border-[#E3E3E3] py-4">
            <div className="flex justify-center">
              <button
                onClick={() => setShowEventCard(true)}
                disabled={!isEventFormValid}
                className={`w-[335px] h-[50px] rounded-[10px] font-bold text-[18px] text-white ${isEventFormValid ? "bg-[#FF7B17] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
              >
                Save Event
              </button>
            </div>
          </div>

          {/* EVENT CARD MODAL */}
          {showEventCard && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
              <div className="bg-white rounded-tl-[10px] rounded-tr-[10px] w-[335px] overflow-hidden shadow-2xl">
                <div className="relative">
                  <img src={kids} alt="" />
                  <button
                    onClick={() => setShowEventCard(false)}
                    className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow"
                  >
                    <img src={cnc} alt="" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <h2 className="text-[20px] font-medium text-black">
                    {eventTitle}
                  </h2>
                  <div className="flex items-center gap-2 text-[18px] font-normal text-[black]">
                    <img src={ihs} alt="" className="w-[24px] h-[24px]" />
                    <span>{selectedEventType}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[16px] font-normal text-[black] whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <img src={cal} alt="" className="w-[24px] h-[24px]" />
                      <span>
                        {studentDOB
                          ? studentDOB.toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={re} alt="" className="w-[24px] h-[24px]" />
                      <span>
                        {formatTime(startTime)}–{formatTime(endTime)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[18px] text-[black] font-normal">
                    <img src={loc} alt="" className="w-[24px] h-[24px]" />
                    <span>{eventLocation}</span>
                  </div>
                  <button
                    onClick={() => setShowEventCard(false)}
                    className="w-full bg-[#FF7B17] hover:bg-orange-600 text-white py-3 rounded-[10px] font-bold text-[18px] mt-2 transition-colors"
                  >
                    Reschedule Event
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
