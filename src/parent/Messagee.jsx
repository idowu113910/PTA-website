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

const Messagee = () => {
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
      <div className="flex flex-col h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E0DCDC] flex-shrink-0">
          <button
            onClick={() => setActiveChat(null)}
            className="cursor-pointer flex-shrink-0"
            aria-label="Go back"
          >
            <img src={arr} alt="" className="w-[32px] h-[32px]" />
          </button>

          <img
            src={activeChat.img}
            alt=""
            className="w-[34px] h-[34px] rounded-full object-cover flex-shrink-0"
          />

          <p className="flex-1 min-w-0 font-normal text-[18px] text-[#1C1C1C] truncate">
            {activeChat.name}
          </p>

          <button aria-label="Voice call" className="flex-shrink-0 p-1">
            <img src={phone} alt="" className="w-[22px] h-[22px]" />
          </button>
          <button aria-label="Video call" className="flex-shrink-0 p-1">
            <img src={video} alt="" className="w-[22px] h-[22px]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-white">
          {/* Date divider */}
          <p className="text-center text-[12px] text-[#424242] bg-[#EFEFEF] font-medium rounded-[10px] py-[3px] px-3 mx-auto">
            June 15, 2025
          </p>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-[2px] ${msg.sender === "sent" ? "items-end" : "items-start"}`}
            >
              {msg.sender === "sent" ? (
                <div className="inline-flex items-end gap-1 max-w-[80%] bg-[#F97316] text-white px-4 py-[10px] rounded-[18px] rounded-br-[4px] text-[15px] leading-relaxed">
                  <span>{msg.text}</span>
                  {msg.delivered && (
                    <img
                      src={delivered}
                      alt="delivered"
                      className="w-[10px] h-[11px] flex-shrink-0 mb-0.5"
                    />
                  )}
                </div>
              ) : (
                <div className="max-w-[75%] bg-[#F5F5F5] text-[#1C1C1C] px-4 py-[10px] rounded-[18px] rounded-bl-[4px] text-[15px] leading-relaxed">
                  {msg.text}
                </div>
              )}
              <p className="text-[11px] text-[#9E9E9E] px-1">{msg.time}</p>
            </div>
          ))}
          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-t border-[#F0F0F0] flex-shrink-0">
          <button
            aria-label="Attach"
            className="w-[35px] h-[35px] rounded-full border border-[#ccc] flex items-center justify-center flex-shrink-0"
          >
            <img src={typ} alt="" className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type message"
            className="flex-1 min-w-0 h-[38px] rounded-[6px] border border-[#E0DCDC] px-3 outline-none text-[14px] font-medium text-[#1C1C1C] placeholder:text-[#A3A2A2] placeholder:text-[12px]"
          />

          <button
            onClick={handleSend}
            aria-label="Send"
            className="w-[35px] h-[35px] flex-shrink-0 flex items-center justify-center"
          >
            <img src={send} alt="" className="w-[35px] h-[35px]" />
          </button>
        </div>
      </div>
    );
  }

  /* ── MESSAGE LIST SCREEN ──────────────────────────────────────── */
  return (
    <div className="min-h-screen w-full max-w-[430px] min-w-[320px] mx-auto bg-white pb-24">
      <div className="px-5 pt-6">
        {/* Title */}
        <h1 className="font-bold text-[20px] text-black mb-5">Message</h1>

        {/* Search Bar */}
        <div className="w-full h-[48px] border border-[#D9D9D9] rounded-[7px] bg-[#FCFCFC] flex items-center gap-3 px-3 mb-4">
          <img src={srch} alt="" className="w-4 h-4 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search Conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none font-normal text-[14px] text-[#616161] bg-transparent flex-1 min-w-0"
          />
        </div>

        {/* Filter Tabs — full width, equal columns */}
        <div className="flex gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 h-[35px] rounded-[5px] text-[14px] font-normal ${
                activeFilter === f
                  ? "bg-[#FF7B17] text-white"
                  : "bg-[#EFEFEF] text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        {filteredConversations.length === 0 ? (
          <p className="text-center text-[14px] text-gray-400 mt-16">
            No conversations found
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className="flex items-center gap-3 cursor-pointer active:bg-gray-50 rounded-lg py-3 px-1"
                onClick={() => setActiveChat(conv)}
              >
                {/* Avatar */}
                <img
                  src={conv.img}
                  alt={conv.name}
                  className="w-[52px] h-[52px] rounded-full object-cover flex-shrink-0"
                />

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-normal text-[16px] text-[#1C1C1C] truncate">
                      {conv.name}
                    </p>
                    <p
                      className={`text-[12px] flex-shrink-0 ${conv.unread ? "text-[#FF7B17]" : "text-[#9E9E9E]"}`}
                    >
                      {conv.time}
                    </p>
                  </div>
                  <p className="font-medium text-[12px] text-[#000000] mt-0.5 truncate">
                    {conv.preview}
                  </p>
                </div>

                {/* Unread dot */}
                {conv.unread && (
                  <div className="w-2 h-2 rounded-full bg-[#FF7B17] flex-shrink-0" />
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

export default Messagee;
