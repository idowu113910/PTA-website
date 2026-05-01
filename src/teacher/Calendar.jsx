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
  const [studentDOB, setStudentDOB] = useState(null);
  const [isDOBOpen, setIsDOBOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [isGenderOpen, setIsGenderOpen] = useState(false);
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

  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (showScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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

  const handleSelectEventType = (type) => {
    setSelectedEventType(type);
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
    }, 300);
  };

  const isEventFormValid =
    eventTitle.trim() !== "" &&
    studentDOB !== null &&
    selectedEventType !== "" &&
    eventLocation.trim() !== "";

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

  // ── Reusable Event Card ──────────────────────────────────────────
  const EventCard = ({ icon, title, date, time, location, rightImg }) => (
    <div className="flex w-full rounded-[10px] py-4 px-3 bg-[#F1F0F0] mt-4 items-center gap-3">
      <img src={icon} alt="" className="w-8 h-8 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-black font-normal text-[16px] truncate">{title}</p>
        <p className="font-normal text-[12px] text-black mt-0.5">
          {date} <span className="font-bold text-[16px]">·</span> {time}
        </p>
        <p className="font-medium text-[12px] text-black mt-1.5">{location}</p>
      </div>
      {rightImg && (
        <img
          src={rightImg}
          alt=""
          className="w-[72px] h-[72px] object-contain flex-shrink-0"
        />
      )}
    </div>
  );

  // ── Time Picker Dropdown ─────────────────────────────────────────
  const TimePicker = ({ label, time, setTime, pickerKey }) => (
    <div className="relative flex-1">
      <h2 className="font-medium text-[16px] text-[#303030]">{label}</h2>
      <div className="h-[55px] rounded-[8px] border border-black/10 py-2 px-3 flex items-center justify-between mt-2">
        <p className="font-normal text-[14px] text-[#303030]">
          {formatTime(time)}
        </p>
        <button
          onClick={() =>
            setOpenPicker(openPicker === pickerKey ? null : pickerKey)
          }
        >
          <img src={cl} alt="" className="w-5 h-[18px]" />
        </button>
      </div>
      {openPicker === pickerKey && (
        <div className="absolute top-[calc(100%+6px)] left-0 w-full min-w-[160px] bg-white rounded-[12px] border border-black/10 shadow-lg p-3 z-50">
          <div className="flex items-center gap-1 mb-2">
            <select
              value={time.hour}
              onChange={(e) =>
                setTime({ ...time, hour: Number(e.target.value) })
              }
              className="border border-black/15 rounded-md px-1 py-1 text-sm font-medium text-[#303030] w-12 text-center"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span className="font-semibold text-[#303030]">:</span>
            <select
              value={time.min}
              onChange={(e) =>
                setTime({ ...time, min: Number(e.target.value) })
              }
              className="border border-black/15 rounded-md px-1 py-1 text-sm font-medium text-[#303030] w-12 text-center"
            >
              {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                <option key={m} value={m}>
                  {String(m).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="flex rounded-md overflow-hidden border border-black/10 mb-3 w-full">
            {["AM", "PM"].map((p) => (
              <button
                key={p}
                onClick={() => setTime({ ...time, period: p })}
                className={`flex-1 py-1 text-xs font-semibold transition-colors ${
                  time.period === p
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpenPicker(null)}
            className="w-full bg-indigo-600 text-white text-sm font-semibold py-1.5 rounded-lg"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );

  // ── Show More / Upcoming Events ──────────────────────────────────
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
        <div className="px-5 mt-2">
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

  // ── Main Calendar View ───────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white">
      <h2 className="font-bold text-[20px] px-5 pt-5 pb-2">Calendar</h2>

      {/* Month Navigation */}
      <div className="flex items-center justify-between px-5 mb-2">
        <button onClick={prevMonth} className="p-1">
          <img src={bk} alt="previous" className="w-6 h-6" />
        </button>
        <p className="font-bold text-[18px]">
          {MONTH_NAMES[month].slice(0, 3)} {year}
        </p>
        <button onClick={nextMonth} className="p-1">
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
                      ? "bg-[#FF7B17] text-white rounded-full"
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
          icon={beah}
          title="Spelling Drill"
          date="July 01, 2025"
          time="9AM"
          location="School Hall"
          rightImg={drl}
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

      <div className="px-5 pb-32">
        <EventCard
          icon={ihs}
          title="Inter House Sport"
          date="July 01, 2025"
          time="12PM"
          location="School Hall"
          rightImg={kd}
        />
        <EventCard
          icon={pta}
          title="PTA Meetings"
          date="July 01, 2025"
          time="12PM"
          location="School Hall"
          rightImg={sch}
        />
        <EventCard
          icon={qz}
          title="Children's Day"
          date="July 01, 2025"
          time="12PM"
          location="School Hall"
          rightImg={qd}
        />
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-[84px] right-5 cursor-pointer z-10"
        onClick={() => setShowScreen(true)}
        aria-label="Add new event"
      >
        <img src={pl} alt="add" className="w-14 h-14" />
      </button>

      <BottomNavigation />

      {/* ── ADD NEW EVENT PANEL ─────────────────────────────────── */}
      {showScreen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={handleClose}
          />

          {/* Sheet */}
          <div
            className={`fixed inset-x-0 bottom-0 top-[4%] bg-white rounded-t-[20px] z-50 flex flex-col transition-transform duration-300 ${
              isClosing ? "translate-y-full" : "translate-y-0"
            }`}
          >
            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-2">
                <h1 className="text-2xl font-bold">Add New Event</h1>
                <button onClick={handleClose} className="p-1">
                  <img src={cnc} alt="close" className="w-8 h-8" />
                </button>
              </div>

              {/* Event Title */}
              <div className="px-5 mt-4">
                <h4 className="font-medium text-[16px] text-[#303030] mb-2">
                  Event Title
                </h4>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="enter event title"
                  className="w-full h-[55px] rounded-[8px] border border-[#0000001F] py-2 px-3 placeholder:text-[14px] font-normal outline-none"
                />
              </div>

              {/* Date */}
              <div className="px-5 mt-4">
                <h5 className="font-medium text-[16px] text-[#303030] mb-2">
                  Date
                </h5>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={
                      studentDOB ? studentDOB.toLocaleDateString("en-GB") : ""
                    }
                    placeholder="dd/mm/yy"
                    onClick={() => setIsDOBOpen(true)}
                    className="w-full h-[57px] rounded-[8px] border border-[#0000001F] font-normal text-[#303030] pl-3 pr-12 cursor-pointer outline-none"
                  />
                  <img
                    src={cal}
                    alt="calendar"
                    onClick={() => setIsDOBOpen(true)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer w-6 h-6"
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

              {/* Gender */}
              <div className="px-5 mt-4">
                <label className="block text-[16px] font-medium text-[#303030] mb-2">
                  Gender
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                    className="w-full h-[57px] px-3 border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedGender
                          ? "text-[14px] text-[#303030]"
                          : "text-[14px] text-gray-400"
                      }
                    >
                      {selectedGender || "Select a gender"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 w-5 h-5 ${isGenderOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isGenderOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md">
                      {genders.map((g) => (
                        <div
                          key={g}
                          onClick={() => handleSelectGender(g)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {g}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Start & End Time */}
              <div ref={pickerRef} className="px-5 mt-4 flex gap-4">
                <TimePicker
                  label="Start Time"
                  time={startTime}
                  setTime={setStartTime}
                  pickerKey="start"
                />
                <TimePicker
                  label="End Time"
                  time={endTime}
                  setTime={setEndTime}
                  pickerKey="end"
                />
              </div>

              {/* Location */}
              <div className="px-5 mt-4">
                <h4 className="font-medium text-[16px] text-[#303030] mb-2">
                  Location
                </h4>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="enter event location"
                  className="w-full h-[55px] rounded-[8px] border border-[#0000001F] py-2 px-3 placeholder:text-[14px] font-normal outline-none"
                />
              </div>

              {/* Event Type */}
              <div className="px-5 mt-4 pb-6">
                <label className="block text-[16px] font-medium text-[#303030] mb-2">
                  Event Types
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsEventTypeOpen(!isEventTypeOpen)}
                    className="w-full h-[57px] px-3 border border-[#0000001F] rounded-[8px] bg-white flex items-center justify-between"
                  >
                    <span
                      className={
                        selectedEventType
                          ? "text-[14px] text-[#303030]"
                          : "text-[14px] text-gray-400"
                      }
                    >
                      {selectedEventType || "Select an event type"}
                    </span>
                    <img
                      src={arr}
                      alt="dropdown"
                      className={`transition-transform duration-200 w-5 h-5 ${isEventTypeOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isEventTypeOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-[#E5E7EB] rounded-[8px] shadow-md max-h-[200px] overflow-y-auto">
                      {eventTypes.map((type) => (
                        <div
                          key={type}
                          onClick={() => handleSelectEventType(type)}
                          className="px-4 py-3 text-[14px] cursor-pointer hover:bg-[#EFF6FF]"
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button — pinned to bottom of sheet */}
            <div className="bg-white border-t border-[#E3E3E3] py-4 px-5">
              <button
                onClick={() => setShowEventCard(true)}
                disabled={!isEventFormValid}
                className={`w-full h-[50px] rounded-[10px] font-bold text-[18px] text-white transition-colors ${
                  isEventFormValid
                    ? "bg-[#FF7B17]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Save Event
              </button>
            </div>

            {/* Event Card Modal */}
            {showEventCard && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] px-5">
                <div className="bg-white rounded-[10px] w-full max-w-[370px] overflow-hidden shadow-2xl">
                  <div className="relative">
                    <img src={kids} alt="" className="w-full object-cover" />
                    <button
                      onClick={() => setShowEventCard(false)}
                      className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow"
                    >
                      <img src={cnc} alt="close" className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <h2 className="text-[20px] font-medium text-black">
                      {eventTitle}
                    </h2>
                    <div className="flex items-center gap-2 text-[18px] font-normal text-black">
                      <img src={ihs} alt="" className="w-6 h-6 flex-shrink-0" />
                      <span>{selectedEventType}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[14px] font-normal text-black">
                      <div className="flex items-center gap-1">
                        <img
                          src={cal}
                          alt=""
                          className="w-5 h-5 flex-shrink-0"
                        />
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
                        <img
                          src={re}
                          alt=""
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <span>
                          {formatTime(startTime)}–{formatTime(endTime)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[16px] text-black font-normal">
                      <img src={loc} alt="" className="w-5 h-5 flex-shrink-0" />
                      <span>{eventLocation}</span>
                    </div>
                    <button
                      onClick={() => setShowEventCard(false)}
                      className="w-full bg-[#FF7B17] text-white py-3 rounded-[10px] font-bold text-[18px] mt-2"
                    >
                      Reschedule Event
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Notifications;
