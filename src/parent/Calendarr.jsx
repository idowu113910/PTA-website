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
import BottomNavigation from "../components/BottomNavigate";
import rem from "../assets/reminder.svg";
import swi from "../assets/switch.svg";
import swi2 from "../assets/swi2.svg";
import time from "../assets/time.svg";
import arrr from "../assets/arr dwn parent.svg";

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
  const [isSwitched1, setIsSwitched1] = useState(false);
  const [isSwitched2, setIsSwitched2] = useState(false);

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

  const [isEventTypeOpen, setIsEventTypeOpen] = useState(false);
  const eventTypes = ["Parent Meeting", "Cultural/Arts", "Academic"];

  const handleSelectEventType = (eventType) => {
    setSelectedEventType(eventType);
    setIsEventTypeOpen(false);
  };

  const genders = ["Male", "Female", "Other"];

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
    setIsGenderOpen(false);
  };

  const isEventFormValid =
    eventTitle.trim() !== "" &&
    studentDOB !== null &&
    selectedEventType !== "" &&
    eventLocation.trim() !== "";

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setCurrentDate(prevDay);
  };

  const handleSaveEvent = () => {
    if (!isEventFormValid) return;
    setShowEventCard(true);
    const eventData = {
      title: eventTitle,
      date: studentDOB,
      eventType: selectedEventType,
      location: eventLocation,
    };
    console.log("Event Data:", eventData);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const [showMore, setShowMore] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
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
      <div className="h-[812px]">
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
    <div className="h-[970px] pt-16">
      <h2 className="font-bold text-[20px] p-6 fixed top-0 left-0 w-full bg-white z-10 -mt-3">
        Calendar
      </h2>

      {/* Month Navigation */}
      <div className="flex w-[328.27px] gap-[114px] ml-7 items-center ">
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
            const todayFlag = isToday(day);
            const selectedFlag = selected === day;
            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                className={`
                  aspect-square w-full text-[14px] font-bold
                  flex items-center justify-center border-none cursor-pointer
                  transition-all duration-150
                  ${selectedFlag ? "text-yellow-400 font-bold" : "bg-transparent text-black"}
                `}
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
          <p className="font-medium text-[12px] text-black mt-2">School Hall</p>
        </div>
        <img src={kd} alt="" className="ml-12" />
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

      <div className="relative mt-4">
        <div className="flex ml-7 w-[338px] h-[115px] rounded-[10px] py-[16px] px-[10px] bg-[#F1F0F0FA] mt-5 relative">
          <img src={beah} alt="" className="w-[32px] h-[32px] my-auto" />
          <div className="ml-3">
            <p className="text-black font-normal text-[18px]">Spelling Drill</p>
            <p className="font-normal text-[12px] text-black">
              July 01 ,2025 <span className="font-bold text-[18px]">.</span>{" "}
              <span className="font-semibold text-[12px]">9</span>AM
            </p>
            <p className="font-medium text-[12px] text-black mt-2">
              School Hall
            </p>
          </div>
          <img src={drl} alt="" className="ml-21" />
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

        {/* pl image — absolutely positioned inside parent */}
        <img
          src={pl}
          alt=""
          className={`fixed absolute bottom-23.5 right-7 cursor-pointer z-10 ${showScreen ? "hidden" : "block"}`}
          onClick={() => setShowScreen(true)}
        />
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setShowScreen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-500 z-10
          ${showScreen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed left-0 bottom-0 w-full bg-white rounded-t-[24px] shadow-xl z-20
          transition-transform duration-500 ease-in-out
          ${showScreen ? "translate-y-0" : "translate-y-full"}`}
        style={{ height: "93vh" }}
      >
        <div className="flex items-center justify-between mt-7 px-7">
          <h1 className="text-2xl font-bold">Add Reminder</h1>
          <button onClick={() => setShowScreen(false)}>
            <img src={cnc} alt="" />
          </button>
        </div>

        {/* Style the inside yourself */}
        <div
          className="p-5 overflow-y-auto"
          style={{ height: "calc(95vh - 80px)" }}
        >
          <div className="mt-2">
            <h1 className="font-medium text-[16px] text-black">Task Title</h1>

            <input
              type="text"
              placeholder="Add title"
              className="w-[336px] h-[55px] rounded-[10px] p-[10px] gap-[10px] border-[#D9D9D9] border-[1px] mt-2.5"
            />
          </div>

          <div className="mt-3">
            <h1 className="font-medium text-[16px] text-black">
              Note(optional)
            </h1>

            <input
              type="text"
              placeholder="Add Note"
              className="w-[336px] h-[55px] rounded-[10px] p-[10px] gap-[10px] border-[#D9D9D9] border-[1px] mt-2"
            />
          </div>

          <h4 className="font-medium text-[16px] text-black mt-2.5">
            Reminder Date
          </h4>

          <div className="w-[336px] h-[65px] rounded-[6px] border-[1px] p-[10px] gap-[12px] border-[#D9D9D9] mt-2.5">
            <div className="flex">
              <img src={rem} alt="" className="w-[30px] h-[30px] mt-1.5" />

              <div className="flex flex-col ml-2">
                <p className="font-medium text-[16px] text-black">Date</p>
                <p className="font-normal text-[12px] text-black">
                  Monday, June 30, 2025
                </p>
              </div>

              <img
                src={isSwitched1 ? swi2 : swi}
                alt=""
                className="flex ml-29 cursor-pointer"
                onClick={() => setIsSwitched1(!isSwitched1)}
              />
            </div>
          </div>

          <h4 className="font-medium text-[16px] text-black mt-4">
            Reminder Time
          </h4>

          <div className="w-[336px] h-[65px] rounded-[6px] border-[1px] p-[10px] gap-[12px] border-[#D9D9D9] mt-2.5">
            <div className="flex">
              <img src={time} alt="" className="w-[30px] h-[30px] mt-1.5" />

              <div className="flex flex-col ml-2">
                <p className="font-medium text-[16px] text-black">Time</p>
                <p className="font-normal text-[12px] text-black">11:00 AM</p>
              </div>

              <img
                src={isSwitched2 ? swi2 : swi}
                alt=""
                className="flex ml-47 cursor-pointer"
                onClick={() => setIsSwitched2(!isSwitched2)}
              />
            </div>
          </div>

          <div className="mt-4 mb-16">
            <h1 className="font-medium text-[16px] text-black">Repeat</h1>

            <div className="flex">
              <input
                type="text"
                placeholder="Add title"
                className="w-[336px] h-[55px] rounded-[10px] p-[10px] gap-[10px] border-[#D9D9D9] border-[1px] mt-2"
              />

              <img src={arrr} alt="" className="-ml-8 mt-2.5" />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Notifications;
