import React, { useState } from "react";
import shit from "../assets/img shit.svg";
import bo from "../assets/Bosun.svg";
import pl from "../assets/plus sign.svg";
import srch from "../assets/search.svg";
import BottomNavigation from "../components/BottomNavigation";

const allConversations = [
  {
    id: 1,
    name: "Sharon Smitty",
    img: shit,
    message: "Does your child need additional help in any subject?",
    time: "11:00 AM",
    unread: true,
    type: "message",
  },
  {
    id: 2,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "1:00 PM",
    unread: false,
    type: "message",
  },
  {
    id: 3,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "Yesterday",
    unread: false,
    type: "message",
  },
  {
    id: 4,
    name: "Bosun Adekoya",
    img: bo,
    message: "How does your child feel about school and learning at home?",
    time: "Mon",
    unread: false,
    type: "message",
  },
];

const Assignment = ({ setScreen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const unreadCount = allConversations.filter((c) => c.unread).length;

  const filtered = allConversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Unread" && c.unread) ||
      (activeFilter === "Calls" && c.type === "call");

    return matchesSearch && matchesFilter;
  });

  const filters = ["All", "Unread", "Calls"];

  return (
    <div className="flex flex-col h-screen max-h-[800px] relative bg-white w-full max-w-[430px] min-w-[320px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <h2 className="text-[20px] font-bold text-black">Message</h2>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <img src={srch} alt="search" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-5 mb-3 h-[48px] border border-[#D9D9D9] rounded-[7px] bg-[#FCFCFC] flex items-center gap-[11px] px-3">
        <img src={srch} alt="search" className="w-4 h-4 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search Conversations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="outline-none text-[14px] font-normal text-[#616161] bg-transparent flex-1 min-w-0"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 h-[35px] px-[10px] rounded-[5px] text-[16px] font-normal flex items-center gap-1.5 ${
              activeFilter === f
                ? "bg-[#FF7B17] text-white"
                : "bg-[#EFEFEF] text-black"
            }`}
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                  activeFilter === "Unread"
                    ? "bg-white text-[#FF7B17]"
                    : "bg-[#FF7B17] text-white"
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        {filtered.length === 0 ? (
          <p className="text-center text-[14px] text-gray-400 mt-12">
            No conversations found
          </p>
        ) : (
          filtered.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-b-0 cursor-pointer"
            >
              {/* Avatar image */}
              <img
                src={conv.img}
                alt={conv.name}
                className="w-[46px] h-[46px] rounded-full object-cover flex-shrink-0"
              />

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-[16px] font-normal text-[#1C1C1C] truncate">
                    {conv.name}
                  </p>
                  <p
                    className={`text-[12px] flex-shrink-0 ${
                      conv.unread ? "text-[#FF7B17]" : "text-gray-400"
                    }`}
                  >
                    {conv.time}
                  </p>
                </div>
                <p
                  className={`text-[12px] truncate ${
                    conv.unread
                      ? "font-medium text-black"
                      : "font-medium text-[#000000]"
                  }`}
                >
                  {conv.message}
                </p>
              </div>

              {/* Unread dot */}
              {conv.unread && (
                <div className="w-2 h-2 rounded-full bg-[#FF7B17] flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>

      {/* FAB */}
      <button
        aria-label="New conversation"
        className="absolute bottom-[72px] right-5"
      >
        <img src={pl} alt="new" className="w-[51px] h-[51px]" />
      </button>

      <BottomNavigation />
    </div>
  );
};

export default Assignment;
