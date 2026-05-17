/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";

const conversations = [
  {
    name: "Sara Alizadeh",
    channel: "💚",
    channelName: "WhatsApp",
    msg: "Thank you! That was helpful.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    name: "Ali Rezaei",
    channel: "📷",
    channelName: "Instagram",
    msg: "Can you send the price list?",
    time: "5m",
    unread: 0,
    online: false,
  },
  {
    name: "Mohammad Karimi",
    channel: "💚",
    channelName: "WhatsApp",
    msg: "I need help with integration.",
    time: "10m",
    unread: 1,
    online: true,
  },
  {
    name: "Zahra Nemati",
    channel: "💚",
    channelName: "WhatsApp",
    msg: "Great support!",
    time: "15m",
    unread: 0,
    online: false,
  },
  {
    name: "Hamed Rajabi",
    channel: "✉️",
    channelName: "Email",
    msg: "Request for a demo",
    time: "20m",
    unread: 0,
    online: false,
  },
  {
    name: "Nima Pourakbari",
    channel: "📷",
    channelName: "Instagram",
    msg: "Do you ship to Canada? 🇨🇦",
    time: "1h",
    unread: 0,
    online: true,
  },
  {
    name: "Ehsan Mahmoodi",
    channel: "🌐",
    channelName: "Website",
    msg: "Where can I view my orders?",
    time: "2h",
    unread: 3,
    online: false,
  },
];

const messages = [
  {
    from: "user",
    text: "Hi, I have a question about your pricing plans.",
    time: "5:30 PM",
  },
  {
    from: "bot",
    text: "Hello Sara! 👋\nSure, I'd be happy to help you with our pricing plans. Which plan are you interested in?",
    time: "5:31 PM",
  },
  {
    from: "user",
    text: "I'm looking for the best option for a growing business.",
    time: "5:32 PM",
  },
  {
    from: "bot",
    text: "Great choice! 🚀\nFor growing businesses, our Pro Plan is perfect. It includes advanced features, priority support, and more integrations. Would you like me to send the details?",
    time: "5:33 PM",
  },
  { from: "user", text: "Yes please, send me the details.", time: "5:33 PM" },
];

const DashboardConversations: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const [activeTab, setActiveTab] = useState("All");
  const [message, setMessage] = useState("");
  const [isTyping] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [selected]);

  const conv = conversations[selected];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .cv-fade{animation:fadeUp 0.5s ease forwards;}
        .conv-row{transition:background 0.2s ease,border-color 0.2s ease;cursor:pointer;border-left:3px solid transparent;}
        .conv-row:hover{background:rgba(124,92,252,0.07);}
        .conv-row.active{background:rgba(124,92,252,0.12);border-left-color:#7c5cfc;}
        @keyframes typingDot{0%,80%,100%{transform:scale(0.6);opacity:0.4;}40%{transform:scale(1);opacity:1;}}
        .t-dot{animation:typingDot 1.4s ease-in-out infinite;}
        .t-dot:nth-child(2){animation-delay:0.2s;}
        .t-dot:nth-child(3){animation-delay:0.4s;}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .msg-in{animation:msgIn 0.3s ease forwards;}
        .send-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .send-btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(124,92,252,0.5);}
        .chat-scroll::-webkit-scrollbar{width:3px;}
        .chat-scroll::-webkit-scrollbar-thumb{background:rgba(124,92,252,0.2);border-radius:4px;}
        @keyframes onlinePulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);}50%{box-shadow:0 0 0 4px rgba(34,197,94,0);}}
        .online-pulse{animation:onlinePulse 2s ease-in-out infinite;}
      `}</style>

      <div
        ref={ref}
        className={`flex h-full overflow-hidden ${visible ? "cv-fade" : "opacity-0"}`}
      >
        {/* ── Col 1: Conversation list ── */}
        <div className="flex w-65 shrink-0 flex-col border-r border-white/8 bg-[#08060f]">
          {/* Header */}
          <div className="border-b border-white/8 px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-white">
                Conversations
              </h2>
            </div>
            <div className="mt-2 flex gap-1 rounded-xl bg-white/5 p-1">
              {[`All ${conversations.length}`, "Unassigned", "Mentions"].map(
                (t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t.split(" ")[0])}
                    className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition-all ${activeTab === t.split(" ")[0] ? "bg-[#7c5cfc] text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    {t}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className={`conv-row px-4 py-3 ${selected === i ? "active" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-[13px] font-bold text-white">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    {c.online && (
                      <div className="online-pulse absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#08060f] bg-emerald-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-white truncate">
                        {c.name}
                      </span>
                      <span className="shrink-0 ml-1 text-[10px] text-gray-600">
                        {c.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[11px] text-gray-500 truncate">
                        {c.msg}
                      </span>
                      {c.unread > 0 && (
                        <span className="ml-1 shrink-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7c5cfc] px-1 text-[9px] font-bold text-white">
                          {c.unread}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px]">{c.channel}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="cursor-pointer px-4 py-3 text-center text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
              Load more conversations ↓
            </div>
          </div>
        </div>

        {/* ── Col 2: Chat ── */}
        <div className="flex flex-1 flex-col bg-[#0a0818]">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-[12px] font-bold text-white">
                  {conv.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0a0818] bg-emerald-400" />
                )}
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">{conv.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{conv.channel}</span>
                  <span className="text-[11px] text-[#a78bfa]">
                    {conv.channelName}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    • Assigned to Support Agent ▾
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                ☆
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                🕐
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                ⋮
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatRef}
            className="chat-scroll flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4"
          >
            <div className="text-center text-[11px] text-gray-600">
              May 17, 2024
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`msg-in flex items-end gap-2 ${m.from === "user" ? "justify-end" : ""}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {m.from === "bot" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-base">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[65%] rounded-2xl px-4 py-2.5 ${m.from === "bot" ? "rounded-bl-sm bg-[#7c5cfc]/20" : "rounded-br-sm bg-[#1a1535]"}`}
                >
                  <p className="whitespace-pre-line text-[13px] leading-relaxed text-white">
                    {m.text}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <span className="text-[10px] text-gray-500">{m.time}</span>
                    {m.from === "user" && (
                      <span className="text-[10px] text-[#a78bfa]">✓✓</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-base">
                  🤖
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-[#7c5cfc]/15 px-4 py-3">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <span>Opi is typing</span>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="t-dot h-1.5 w-1.5 rounded-full bg-[#a78bfa]"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/8 px-4 py-3">
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-300 transition-colors text-lg">
                📎
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setMessage("")}
                className="flex-1 bg-transparent text-[13px] text-gray-200 placeholder-gray-600 outline-none"
              />
              <button className="text-gray-500 hover:text-gray-300 text-lg transition-colors">
                😊
              </button>
              <button className="text-gray-500 hover:text-gray-300 text-lg transition-colors">
                ⚡
              </button>
              <button
                onClick={() => setMessage("")}
                className="send-btn flex items-center gap-1.5 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white"
              >
                🚀 Send
              </button>
            </div>
          </div>
        </div>

        {/* ── Col 3: Details ── */}
        <div className="w-60 shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-4">
          {/* Tabs */}
          <div className="mb-4 flex gap-0 border-b border-white/8">
            {["Details", "Customer", "Notes", "Activity"].map((t, i) => (
              <button
                key={t}
                className={`pb-2 pr-3 text-[11px] font-semibold transition-colors ${i === 0 ? "border-b-2 border-[#7c5cfc] text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Conversation Info */}
          <div className="mb-4">
            <p className="mb-2 text-[12px] font-bold text-white">
              Conversation Info
            </p>
            {[
              {
                label: "Channel",
                val: (
                  <>
                    <span className="mr-1">{conv.channel}</span>
                    {conv.channelName}
                  </>
                ),
              },
              {
                label: "Status",
                val: (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    Open
                  </span>
                ),
              },
              { label: "Assigned to", val: "Support Agent" },
              { label: "Language", val: "English" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span className="text-[11px] text-gray-500">{r.label}</span>
                <span className="text-[11px] font-medium text-white">
                  {r.val}
                </span>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              {["Pricing", "Interested"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#7c5cfc]/40 bg-[#7c5cfc]/10 px-2 py-0.5 text-[10px] font-semibold text-[#a78bfa]"
                >
                  {tag}
                </span>
              ))}
              <button className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 text-gray-500 hover:text-white text-sm transition-colors">
                +
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-4">
            <p className="mb-2 text-[12px] font-bold text-white">
              Customer Info
            </p>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-[13px] font-bold text-white">
                SA
              </div>
              <div>
                <p className="text-[12px] font-semibold text-white">
                  {conv.name}
                </p>
                <p className="text-[10px] text-gray-500">+98 912 345 6789</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-500">
              sara.alizadeh@example.com
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">Tehran, Iran</p>
            <button className="mt-2 rounded-lg bg-[#7c5cfc]/20 px-3 py-1.5 text-[11px] font-semibold text-[#a78bfa] hover:bg-[#7c5cfc]/35 transition-all w-full">
              View profile
            </button>
          </div>

          {/* Summary */}
          <div>
            <p className="mb-2 text-[12px] font-bold text-white">
              Conversation Summary
            </p>
            {[
              { label: "First message", val: "May 17, 2024, 5:30 PM" },
              { label: "Last message", val: "May 17, 2024, 5:33 PM" },
              { label: "Total messages", val: "6" },
              { label: "Resolution time", val: "—" },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 border-b border-white/5"
              >
                <span className="text-[10px] text-gray-500">{r.label}</span>
                <span className="text-[10px] font-medium text-white text-right">
                  {r.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardConversations;
