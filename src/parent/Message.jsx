import React, { useState, useEffect, useRef } from "react";
import BottomNavigation from "../components/BottomNavigate";
import srch from "../assets/search.svg";
import shit from "../assets/edithh.svg";
import phone from "../assets/phone.svg";
import video from "../assets/video.svg";
import arr from "../assets/arr back.svg";
import delivered from "../assets/delivered image.svg";
import typ from "../assets/type pareny.svg";
import send from "../assets/send parent.svg";
import { useTheme } from "../ThemeContext";

const initialMessages = [
  { id: 1, sender: "sent", text: "Hello", time: "10:55 AM", delivered: true },
  {
    id: 2,
    sender: "received",
    text: "Good Afternoon Miss Edith",
    time: "10:56 AM",
  },
  {
    id: 3,
    sender: "received",
    text: "Good Afternoon Miss Edith",
    time: "10:57 AM",
  },
  {
    id: 4,
    sender: "sent",
    text: "Good afternoon Mrs Chukwu nonso, just heads up that we'll be having a math quiz next week",
    time: "11:00 AM",
    delivered: true,
  },
];

const conversations = [
  {
    id: 1,
    name: "Edith Robinson",
    img: shit,
    preview: "Does your child need additional help in any subject?",
    time: "11:00AM",
    unread: true,
  },
];

const Message = () => {
  // Single source of truth for theme — comes from ThemeContext (wraps the whole app in main.jsx)
  const { isDarkMode } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "sent",
        text: inputText.trim(),
        time,
        delivered: true,
      },
    ]);
    setInputText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const filters = ["All", "Unread", "Calls"];

  const filteredConversations = conversations.filter((c) => {
    const matchQ =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchF =
      activeFilter === "All" ||
      (activeFilter === "Unread" && c.unread) ||
      (activeFilter === "Calls" && c.type === "call");
    return matchQ && matchF;
  });

  /* ── CHAT SCREEN ──────────────────────────────────────────────── */
  if (activeChat) {
    return (
      <div
        className={`flex flex-col h-screen w-full max-w-107.5 min-w-[320px] mx-auto transition-colors duration-200 dark:bg-[#121212] dark:text-white ${
          isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center gap-3 px-4 py-3 border-b shrink-0 transition-colors duration-200 ${
            isDarkMode
              ? "bg-[#121212] border-gray-800"
              : "bg-white border-[#E0DCDC]"
          }`}
        >
          <button
            onClick={() => setActiveChat(null)}
            className="cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <img
              src={arr}
              alt=""
              className={`w-[32px] h-8 ${isDarkMode ? "invert" : ""}`}
            />
          </button>

          <img
            src={activeChat.img}
            alt=""
            className="w-8.5 h-8.5 rounded-full object-cover shrink-0"
          />

          <p
            className={`flex-1 min-w-0 font-normal text-[18px] truncate ${
              isDarkMode ? "text-white" : "text-[#1C1C1C]"
            }`}
          >
            {activeChat.name}
          </p>

          <button aria-label="Voice call" className="shrink-0 p-1">
            <img
              src={phone}
              alt=""
              className={`w-5.5 h-5.5 ${isDarkMode ? "invert" : ""}`}
            />
          </button>
          <button aria-label="Video call" className="shrink-0 p-1">
            <img
              src={video}
              alt=""
              className={`w-5.5 h-5.5 ${isDarkMode ? "invert" : ""}`}
            />
          </button>
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 transition-colors duration-200 ${
            isDarkMode ? "bg-[#121212]" : "bg-white"
          }`}
        >
          {/* Date divider */}
          <p
            className={`text-center text-[12px] font-medium rounded-[10px] py-[3px] px-3 mx-auto ${
              isDarkMode
                ? "bg-[#1c1c1c] text-white"
                : "bg-[#EFEFEF] text-[#424242]"
            }`}
          >
            June 15, 2025
          </p>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-[2px] ${msg.sender === "sent" ? "items-end" : "items-start"}`}
            >
              {msg.sender === "sent" ? (
                <div className="inline-flex items-end gap-1 max-w-[80%] bg-[#F97316] text-white px-4 py-2.5 rounded-[18px] rounded-br-sm text-[15px] leading-relaxed">
                  <span>{msg.text}</span>
                  {msg.delivered && (
                    <img
                      src={delivered}
                      alt="delivered"
                      className="w-2.5 h-2.75 shrink-0 mb-0.5"
                    />
                  )}
                </div>
              ) : (
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-[18px] rounded-bl-sm text-[15px] leading-relaxed dark:bg-[#1c1c1c] dark:text-white ${
                    isDarkMode
                      ? "bg-[#1c1c1c] text-white"
                      : "bg-[#F5F5F5] text-[#1C1C1C]"
                  }`}
                >
                  {msg.text}
                </div>
              )}
              <p
                className={`text-[11px] px-1 ${
                  isDarkMode ? "text-gray-400" : "text-[#9E9E9E]"
                }`}
              >
                {msg.time}
              </p>
            </div>
          ))}
          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div
          className={`flex items-center gap-2 px-4 py-3 border-t shrink-0 transition-colors duration-200 ${
            isDarkMode
              ? "bg-[#121212] border-gray-800"
              : "bg-white border-[#F0F0F0]"
          }`}
        >
          <button
            aria-label="Attach"
            className={`w-8.75 h-8.75 rounded-full border flex items-center justify-center shrink-0 ${
              isDarkMode ? "border-gray-700" : "border-[#ccc]"
            }`}
          >
            <img
              src={typ}
              alt=""
              className={`w-5 h-5 ${isDarkMode ? "invert" : ""}`}
            />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type message"
            className={`flex-1 min-w-0 h-9.5 rounded-md border px-3 outline-none text-[14px] font-medium placeholder:text-[12px] ${
              isDarkMode
                ? "border-gray-700 bg-[#1c1c1c] text-white placeholder:text-gray-500"
                : "border-[#E0DCDC] text-[#1C1C1C] placeholder:text-[#A3A2A2]"
            }`}
          />

          <button
            onClick={handleSend}
            aria-label="Send"
            className="w-8.75 h-8.75 shrink-0 flex items-center justify-center"
          >
            <img src={send} alt="" className="w-8.75 h-8.75" />
          </button>
        </div>
      </div>
    );
  }

  /* ── MESSAGE LIST SCREEN ──────────────────────────────────────── */
  return (
    <div
      className={`min-h-screen w-full max-w-107.5 min-w-[320px] mx-auto pb-24 transition-colors duration-200 dark:bg-[#121212] dark:text-white ${
        isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
    >
      <div className="px-5 pt-6">
        {/* Title */}
        <h1
          className={`font-bold text-[20px] mb-5 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Message
        </h1>

        {/* Search Bar */}
        <div
          className={`w-full h-12 rounded-[7px] flex items-center gap-3 px-3 mb-4 ${
            isDarkMode
              ? "border border-gray-700 bg-[#1c1c1c]"
              : "border border-[#D9D9D9] bg-[#FCFCFC]"
          }`}
        >
          <img
            src={srch}
            alt=""
            className={`w-4 h-4 shrink-0 ${isDarkMode ? "invert" : ""}`}
          />
          <input
            type="text"
            placeholder="Search Conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`outline-none font-normal text-[14px] bg-transparent flex-1 min-w-0 ${
              isDarkMode
                ? "text-white placeholder:text-gray-500"
                : "text-[#616161]"
            }`}
          />
        </div>

        {/* Filter Tabs — full width, equal columns */}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 h-8.75 rounded-[5px] text-[14px] font-normal ${
                activeFilter === f
                  ? "bg-[#FF7B17] text-white"
                  : isDarkMode
                    ? "bg-[#1c1c1c] text-white"
                    : "bg-[#EFEFEF] text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        {filteredConversations.length === 0 ? (
          <p
            className={`text-center text-[14px] mt-16 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            No conversations found
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`flex items-center gap-3 cursor-pointer rounded-lg py-3 px-1 ${
                  isDarkMode ? "active:bg-[#1c1c1c]" : "active:bg-gray-50"
                }`}
                onClick={() => setActiveChat(conv)}
              >
                {/* Avatar */}
                <img
                  src={conv.img}
                  alt={conv.name}
                  className="w-13 h-13 rounded-full object-cover shrink-0"
                />

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`font-normal text-[16px] truncate ${
                        isDarkMode ? "text-white" : "text-[#1C1C1C]"
                      }`}
                    >
                      {conv.name}
                    </p>
                    <p
                      className={`text-[12px] shrink-0 ${
                        conv.unread
                          ? "text-[#FF7B17]"
                          : isDarkMode
                            ? "text-gray-500"
                            : "text-[#9E9E9E]"
                      }`}
                    >
                      {conv.time}
                    </p>
                  </div>
                  <p
                    className={`font-medium text-[12px] mt-0.5 truncate ${
                      isDarkMode ? "text-gray-300" : "text-[#000000]"
                    }`}
                  >
                    {conv.preview}
                  </p>
                </div>

                {/* Unread dot */}
                {conv.unread && (
                  <div className="w-2 h-2 rounded-full bg-[#FF7B17] shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Message;
