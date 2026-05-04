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
import arr from "../assets/arr down.svg";
import cnc from "../assets/cancel back btn.svg";
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

const Calendarr = () => {
  const [isSwitched1, setIsSwitched1] = useState(false);
  const [isSwitched2, setIsSwitched2] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Reminder form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskNote, setTaskNote] = useState("");
  const [repeatValue, setRepeatValue] = useState("");

  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

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

  // Lock body scroll when sheet is open
  useEffect(() => {
    document.body.style.overflow = showScreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showScreen]);

  // ── Reusable Event Card ────────────────────────────────────────
  const EventCard = ({ icon, title, date, time: t, location, rightImg }) => (
    <div className="flex w-full rounded-[10px] py-4 px-3 bg-[#F1F0F0] mt-4 items-center gap-3">
      <img src={icon} alt="" className="w-8 h-8 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-black font-normal text-[16px] truncate">{title}</p>
        <p className="font-normal text-[12px] text-black mt-0.5">
          {date} <span className="font-bold text-base">·</span> {t}
        </p>
        <p className="font-medium text-[12px] text-black mt-1.5">{location}</p>
      </div>
      {rightImg && (
        <img
          src={rightImg}
          alt=""
          className="w-[68px] h-[68px] object-contain flex-shrink-0"
        />
      )}
    </div>
  );

  // ── Show More Screen ────────────────────────────────────────────
  if (showMore) {
    return (
      <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-6">
        <div
          className="flex items-center gap-4 px-5 pt-5 pb-2 cursor-pointer"
          onClick={() => setShowMore(false)}
        >
          <img src={back} alt="back" className="w-6 h-6 flex-shrink-0" />
          <h2 className="text-[20px] font-medium">Upcoming Event</h2>
        </div>
        <div className="px-5">
          <EventCard
            icon={ihs}
            title="Inter House Sport"
            date="July 01, 2025"
            time="12PM"
            location="School Hall"
            rightImg={kd}
          />
          <EventCard
            icon={beah}
            title="Spelling Drill"
            date="July 01, 2025"
            time="12PM"
            location="School Hall"
            rightImg={drl}
          />
          <EventCard
            icon={pta}
            title="PTA Meetings"
            date="July 15, 2025"
            time="9AM"
            location="School Hall"
            rightImg={sch}
          />
          <EventCard
            icon={qz}
            title="Quiz and Debate"
            date="July 18, 2025"
            time="12PM"
            location="School Hall"
            rightImg={qd}
          />
          <EventCard
            icon={cult}
            title="Cultural Day"
            date="August 12, 2025"
            time="9AM"
            location="School Field"
            rightImg={day}
          />
        </div>
      </div>
    );
  }

  // ── Main Calendar View ──────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
      {/* Title */}
      <h2 className="font-bold text-[20px] px-5 pt-5 pb-2">Calendar</h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-5 mb-2">
        <button onClick={prevMonth} className="p-1" aria-label="Previous month">
          <img src={bk} alt="previous" className="w-6 h-6" />
        </button>
        <p className="font-bold text-[18px]">
          {MONTH_NAMES[month].slice(0, 3)} {year}
        </p>
        <button onClick={nextMonth} className="p-1" aria-label="Next month">
          <img src={ft} alt="next" className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="px-5">
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[13px] font-normal text-black py-1"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const isSelected = selected === day;
            const todayFlag = isToday(day);
            return (
              <button
                key={day}
                onClick={() => setSelected(day)}
                className={`aspect-square w-full text-[13px] font-bold flex items-center justify-center rounded-full transition-all duration-150 ${
                  isSelected
                    ? "text-yellow-400"
                    : todayFlag
                      ? "bg-[#FF7B17] text-white"
                      : "bg-transparent text-black"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Events */}
      <h2 className="text-[18px] font-bold text-black px-5 mt-4">
        Todays Events
      </h2>
      <div className="px-5">
        <EventCard
          icon={ihs}
          title="Inter House Sport"
          date="July 01, 2025"
          time="12PM"
          location="School Hall"
          rightImg={kd}
        />
      </div>

      {/* Upcoming Events */}
      <div className="flex items-center justify-between px-5 mt-5">
        <p className="text-[18px] font-bold text-black">Upcoming Events</p>
        <p
          onClick={() => setShowMore(true)}
          className="font-normal text-[#FF7B17] text-[14px] cursor-pointer"
        >
          View More
        </p>
      </div>
      <div className="px-5">
        <EventCard
          icon={beah}
          title="Spelling Drill"
          date="July 01, 2025"
          time="9AM"
          location="School Hall"
          rightImg={drl}
        />
        <EventCard
          icon={pta}
          title="PTA Meetings"
          date="July 15, 2025"
          time="9AM"
          location="School Hall"
          rightImg={sch}
        />
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-[84px] right-5 z-10"
        onClick={() => setShowScreen(true)}
        aria-label="Add reminder"
      >
        <img src={pl} alt="add" className="w-14 h-14" />
      </button>

      <BottomNavigation />

      {/* ── Backdrop ───────────────────────────────────────────── */}
      <div
        onClick={() => setShowScreen(false)}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-20 ${
          showScreen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Add Reminder Bottom Sheet ───────────────────────────── */}
      <div
        className={`fixed left-0 bottom-0 w-full max-w-[430px] bg-white rounded-t-[24px] shadow-xl z-30
    transition-transform duration-300 ease-in-out flex flex-col`}
        style={{
          height: "min(730px, 90vh)",
          left: "50%",
          transform: showScreen
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(100%)",
        }}
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between px-5 pt-8 pb-3 flex-shrink-0">
          <h1 className="text-2xl font-bold">Add Reminder</h1>
          <button onClick={() => setShowScreen(false)} aria-label="Close">
            <img src={cnc} alt="close" className="w-8 h-8" />
          </button>
        </div>

        {/* Sheet Body */}
        <div className="flex-1 overflow-hidden px-5">
          {/* Task Title */}
          <div className="mt-4">
            <h1 className="font-medium text-[16px] text-black mb-2">
              Task Title
            </h1>
            <input
              type="text"
              placeholder="Add title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full h-[55px] rounded-[10px] px-4 border border-[#D9D9D9] outline-none text-[14px]"
            />
          </div>

          {/* Note */}
          <div className="mt-4">
            <h1 className="font-medium text-[16px] text-black mb-2">
              Note (optional)
            </h1>
            <input
              type="text"
              placeholder="Add Note"
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full h-[55px] rounded-[10px] px-4 border border-[#D9D9D9] outline-none text-[14px]"
            />
          </div>

          {/* Reminder Date */}
          <h4 className="font-medium text-[16px] text-black mt-4 mb-2">
            Reminder Date
          </h4>
          <div className="w-full h-[65px] rounded-[6px] border border-[#D9D9D9] px-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={rem}
                alt=""
                className="w-[28px] h-[28px] flex-shrink-0"
              />
              <div>
                <p className="font-medium text-[14px] text-black leading-tight">
                  Date
                </p>
                <p className="font-normal text-[12px] text-black">
                  Monday, June 30, 2025
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsSwitched1(!isSwitched1)}
              aria-label="Toggle date reminder"
            >
              <img
                src={isSwitched1 ? swi2 : swi}
                alt="toggle"
                className="w-[44px] h-[24px]"
              />
            </button>
          </div>

          {/* Reminder Time */}
          <h4 className="font-medium text-[16px] text-black mt-4 mb-2">
            Reminder Time
          </h4>
          <div className="w-full h-[65px] rounded-[6px] border border-[#D9D9D9] px-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={time}
                alt=""
                className="w-[28px] h-[28px] flex-shrink-0"
              />
              <div>
                <p className="font-medium text-[14px] text-black leading-tight">
                  Time
                </p>
                <p className="font-normal text-[12px] text-black">11:00 AM</p>
              </div>
            </div>
            <button
              onClick={() => setIsSwitched2(!isSwitched2)}
              aria-label="Toggle time reminder"
            >
              <img
                src={isSwitched2 ? swi2 : swi}
                alt="toggle"
                className="w-[44px] h-[24px]"
              />
            </button>
          </div>

          {/* Repeat */}
          <div className="mt-4 mb-90">
            <h1 className="font-medium text-[16px] text-black mb-2">Repeat</h1>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Select repeat"
                value={repeatValue}
                onChange={(e) => setRepeatValue(e.target.value)}
                className="w-full h-[55px] rounded-[10px] px-4 pr-12 border border-[#D9D9D9] outline-none text-[14px]"
              />
              <img
                src={arrr}
                alt=""
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-[40px] flex-shrink-0" />
      </div>
    </div>
  );
};

export default Calendarr;
