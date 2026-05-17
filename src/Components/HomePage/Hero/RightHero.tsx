import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  time: string;
  online?: boolean;
}

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatarUrl: "https://i.pravatar.cc/40?img=47",
    lastMessage: "Sounds good! What are ...",
    time: "2m",
    online: true,
  },
  {
    id: 2,
    name: "Ahmed Al-Rashid",
    avatarUrl: "https://i.pravatar.cc/40?img=12",
    lastMessage: "Can you tell me more...",
    time: "5m",
  },
  {
    id: 3,
    name: "Jessica Lee",
    avatarUrl: "https://i.pravatar.cc/40?img=20",
    lastMessage: "Do you have this in...",
    time: "10m",
  },
  {
    id: 4,
    name: "Maria Garcia",
    avatarUrl: "https://i.pravatar.cc/40?img=32",
    lastMessage: "Thanks for your help!",
    time: "15m",
  },
  {
    id: 5,
    name: "Daniel Kim",
    avatarUrl: "https://i.pravatar.cc/40?img=57",
    lastMessage: "I'd like to book a demo.",
    time: "20m",
  },
];

const messages: Message[] = [
  {
    id: 1,
    sender: "user",
    text: "Hi, I am interested in your services. Can you help me?",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "bot",
    text: "Hello Sarah! 👋\nAbsolutely, I'd be happy to help you. Could you tell me more about your business?",
    time: "10:31 AM",
  },
  { id: 3, sender: "user", text: "We run a travel agency.", time: "10:32 AM" },
];

type Tab = "All" | "Open" | "Unread" | "Closed";

export default function ChatUI() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedConv, setSelectedConv] = useState<Conversation>(
    conversations[0],
  );

  return (
    <div
      className="
    flex flex-col lg:flex-row
    items-center justify-center
    h-auto lg:h-[60vh]
    px-4 sm:px-6 lg:px-10
    max-w-7xl
    text-white
    overflow-hidden
  "
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "transparent",
      }}
    >
      <style>{`
        @keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      {/* Left Sidebar */}
      <div
        style={{
          width: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "18px 0",
          gap: 18,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "#080813",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 14px rgba(124,92,252,0.55)",
            cursor: "pointer",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              fill="white"
            />
          </svg>
        </div>
        {[
          <svg
            key="h"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.8"
          >
            <path d="M3 12L12 3l9 9" />
            <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
          </svg>,
          <svg
            key="g"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>,
          <svg
            key="u"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.8"
          >
            <circle cx="9" cy="7" r="4" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" />
          </svg>,
        ].map((icon, i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              borderRadius: 8,
            }}
          >
            {icon}
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.8"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Conversations Panel */}
      <div
        style={{
          width: 255,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          background: "transparent",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "16px 13px 10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 11,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                Conversations
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2.2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              padding: "7px 10px",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "rgba(255,255,255,0.38)",
                fontSize: 11.5,
                width: "100%",
              }}
              placeholder="Search conversations..."
            />
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            padding: "0 13px 8px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {(["All", "Open", "Unread", "Closed"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "3px 7px",
                fontSize: 11.5,
                color: activeTab === tab ? "white" : "rgba(255,255,255,0.32)",
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom:
                  activeTab === tab
                    ? "2px solid #7c5cfc"
                    : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 13px",
                cursor: "pointer",
                background:
                  selectedConv.id === conv.id
                    ? "rgba(124,92,252,0.1)"
                    : "transparent",
                borderLeft: `2px solid ${selectedConv.id === conv.id ? "#7c5cfc" : "transparent"}`,
                transition: "background 0.15s",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={conv.avatarUrl}
                  alt={conv.name}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {conv.online && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 9,
                      height: 9,
                      background: "#22c55e",
                      borderRadius: "50%",
                      border: "2px solid #0c0c1b",
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.88)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conv.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.28)",
                      marginLeft: 5,
                      flexShrink: 0,
                    }}
                  >
                    {conv.time}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.32)",
                    margin: "2px 0 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#0d0d1f",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "35%",
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(80,50,180,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#0c0c1b",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ position: "relative" }}>
              <img
                src={selectedConv.avatarUrl}
                alt={selectedConv.name}
                style={{
                  width: 33,
                  height: 33,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {selectedConv.online && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 9,
                    height: 9,
                    background: "#22c55e",
                    borderRadius: "50%",
                    border: "2px solid #0c0c1b",
                  }}
                />
              )}
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                {selectedConv.name}
              </p>
              {selectedConv.online && (
                <p style={{ margin: 0, fontSize: 10.5, color: "#22c55e" }}>
                  Online
                </p>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="2"
              >
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            position: "relative",
            zIndex: 1,
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: 8,
              }}
            >
              {msg.sender === "bot" && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 12px rgba(124,92,252,0.6)",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="7"
                      stroke="white"
                      strokeWidth="2.5"
                    />
                    <circle cx="12" cy="12" r="3" fill="white" />
                  </svg>
                </div>
              )}
              <div style={{ maxWidth: 270 }}>
                <div
                  style={{
                    padding: "10px 13px",
                    borderRadius:
                      msg.sender === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    fontSize: 12.5,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg,#6e48e8,#5535e8)"
                        : "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.92)",
                    boxShadow:
                      msg.sender === "user"
                        ? "0 4px 18px rgba(94,60,240,0.4)"
                        : "0 0 0 1px rgba(124,92,252,0.12)",
                  }}
                >
                  {msg.text}
                </div>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.26)",
                    textAlign: msg.sender === "user" ? "right" : "left",
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {/* Typing */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 0 12px rgba(124,92,252,0.6)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 10,
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                Operino AI is typing...
              </p>
              <div
                style={{
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "16px 16px 16px 4px",
                  padding: "10px 14px",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                  width: 58,
                  boxShadow: "0 0 0 1px rgba(124,92,252,0.12)",
                }}
              >
                {[0, 0.18, 0.36].map((d, i) => (
                  <span
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.45)",
                      display: "block",
                      animation: `bounce 1.2s ${d}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div
          style={{
            padding: "11px 18px 15px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0c0c1b",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 11,
              padding: "9px 11px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <input
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "rgba(255,255,255,0.45)",
                fontSize: 12.5,
              }}
              placeholder="Type a message..."
            />
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </button>
              <button
                style={{
                  width: 29,
                  height: 29,
                  background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px rgba(124,92,252,0.4)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: 68,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          background: "#08081a",
          position: "relative",
        }}
      >
        {/* Dashed vertical line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "22%",
            bottom: "22%",
            width: 1,
            transform: "translateX(-50%)",
            background:
              "repeating-linear-gradient(to bottom, rgba(124,92,252,0.5) 0, rgba(124,92,252,0.5) 4px, transparent 4px, transparent 9px)",
          }}
        />

        {/* Dots on line */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: `${32 + i * 18}%`,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "rgba(124,92,252,0.7)",
              transform: "translate(-50%,-50%)",
              boxShadow: "0 0 6px rgba(124,92,252,0.8)",
              zIndex: 1,
            }}
          />
        ))}

        {/* Instagram */}
        <div style={{ marginBottom: 26, zIndex: 2 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 15,
              background: "linear-gradient(145deg,#f9174b,#f07133)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 5px 22px rgba(249,23,75,0.5)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
            </svg>
          </div>
        </div>

        {/* WhatsApp */}
        <div style={{ marginBottom: 26, zIndex: 2 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 15,
              background: "#25d366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 5px 22px rgba(37,211,102,0.45)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87 1.01 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.65 0 5.14 1.03 7.01 2.9A9.89 9.89 0 0122 12c0 5.52-4.48 10-10 10zm5.5-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.1-.27-.17-.57-.32z" />
            </svg>
          </div>
        </div>

        {/* Chat */}
        <div style={{ zIndex: 2 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 15,
              background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 5px 22px rgba(124,92,252,0.55)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
