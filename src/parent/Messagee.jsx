import React, { useState } from "react";
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
  {
    id: 1,
    sender: "sent",
    text: "Hello",
    time: "10:55 AM",
    delivered: true,
  },
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
    text: "Good afternoon mrs Chukwu nonso, just heads up that we'll be having a math quiz nextweek",
    time: "11:00 AM",
    delivered: true,
  },
];

const Messagee = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], {
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

  /* ── CHAT SCREEN ── */
  if (activeChat) {
    return (
      <div className="flex flex-col h-screen bg-white">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#E0DCDC]">
          {/* Back arrow */}
          <button
            onClick={() => setActiveChat(null)}
            className="text-[#1C1C1C] text-[20px] cursor-pointer "
          >
            <img src={arr} alt="" className="w-[35px] h-[35px] mt-1" />
          </button>

          {/* Avatar */}
          <img
            src={shit}
            alt=""
            className="w-[30px] h-[30px] rounded-full object-cover"
          />

          {/* Name */}
          <p className="flex-1 font-normal text-[20px] text-[#1C1C1C]">
            {activeChat.name}
          </p>

          {/* Call icon */}
          <button className="bg-transparent border-none cursor-pointer text-[#1C1C1C] mx-1">
            <img src={phone} alt="" className="w-[24px] h-[24px]" />
          </button>

          {/* Video icon */}
          <button className="bg-transparent border-none cursor-pointer text-[#1C1C1C]">
            <img src={video} alt="" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-white">
          {/* Date divider */}
          <p className="text-center mx-auto text-[12px] text-[#424242] bg-[#EFEFEF] font-medium rounded-[10px] py-[3px] px-[5px] w-[89px] h-[25px]">
            June 15, 2025
          </p>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-[2px] ${
                msg.sender === "sent" ? "items-end" : "items-start"
              }`}
            >
              {msg.sender === "sent" ? (
                <div className="inline-block max-w-[80%] bg-[#F97316] text-white px-4 py-[10px] rounded-[18px] rounded-br-[4px] text-[16px] leading-relaxed relative">
                  {msg.text}
                  {msg.delivered && (
                    <span className="text-[11px] text-white opacity-80 ml-2 inline-block align-middle">
                      <img
                        src={delivered}
                        alt=""
                        className="w-[9.99px] h-[11px]"
                      />
                    </span>
                  )}
                </div>
              ) : (
                <div className="max-w-[75%] bg-[#F5F5F5] text-[#1C1C1C] font-normal px-4 py-[10px] rounded-[18px] rounded-bl-[4px] text-[16px] leading-relaxed">
                  {msg.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white  border-[#f0f0f0]">
          {/* Plus button */}
          <button className="w-[35px] h-[35px] rounded-full border-[1.5px] border-[#ccc] flex items-center justify-center bg-transparent cursor-pointer text-[#999] text-[20px] font-light flex-shrink-0">
            <img src={typ} alt="" />
          </button>

          {/* Input */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type message"
            className="flex-1 w-[225px] h-[35px] rounded-[6px] border-[1px] px-[10px] py-0 pb-[4px] border-[#E0DCDC] outline-none placeholder:text-[12px] font-medium text-[#A3A2A2] leading-[35px]"
          />

          {/* Send button */}
          <button
            onClick={handleSend}
            className="w-[35px] h-[35px] "
          >
            <img src={send} alt="" />
          </button>
        </div>
      </div>
    );
  }

  /* ── MESSAGE LIST SCREEN ── */
  return (
    <>
      <div className="p-6 h-[812px]">
        <h1 className="font-bold text-[20px] text-black mt-1">Message</h1>

        <div className="w-[333px] h-[48px] border-[1px] border-[#D9D9D9] rounded-[7px] bg-[#FCFCFC] mt-6">
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

        <div
          className="mt-8 flex w-[333px] cursor-pointer active:bg-gray-50 rounded-lg p-1"
          onClick={() =>
            setActiveChat({ name: "Edith Robinson", time: "11:00AM" })
          }
        >
          <img src={shit} alt="" className="w-[58px] h-[58px]" />
          <div className="flex flex-col ml-3 flex-1">
            <div className="flex font-normal text-[#1E1D1D] justify-between">
              <p className="font-normal text-[16px] text-[#1C1C1C]">
                Edith Robinson
              </p>
              <p className="font-normal text-[#1E1D1D] text-[16px]">11:00AM</p>
            </div>
            <p className="font-medium text-[12px] text-[#000000]">
              Does your child need additional help in any subject?
            </p>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Messagee;
