import React, { useState } from "react";

interface Props {
  pageTitle?: string;
}

const DashboardTopbar: React.FC<Props> = () => {
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <>
      <style>{`
        .topbar-btn { transition: background 0.2s ease, transform 0.2s ease; }
        .topbar-btn:hover { background: rgba(124,92,252,0.12); transform: scale(1.05); }
        @keyframes bellShake { 0%,100%{transform:rotate(0);}20%{transform:rotate(-8deg);}40%{transform:rotate(8deg);}60%{transform:rotate(-5deg);}80%{transform:rotate(5deg);} }
        .bell-shake:hover { animation: bellShake 0.5s ease; }
        .notif-dot { animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.5;} }
      `}</style>

      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/8 bg-[#08060f] px-5">
        {/* Left: greeting or title */}
        <div />

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button className="topbar-btn flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white">
            <span>👥</span> Invite members
          </button>

          {/* Notification */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen((o) => !o)}
              className="bell-shake topbar-btn relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white"
            >
              🔔
              <div className="notif-dot absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#7c5cfc]" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-70 overflow-hidden rounded-2xl border border-white/10 bg-[#0f0d1f] shadow-2xl z-50">
                <div className="border-b border-white/8 px-4 py-2.5 flex items-center justify-between">
                  <p className="text-[13px] font-bold text-white">
                    Notifications
                  </p>
                  <button className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd]">
                    Mark all read
                  </button>
                </div>
                {[
                  {
                    icon: "🤖",
                    text: "Support Agent answered a question",
                    time: "2m ago",
                  },
                  {
                    icon: "💚",
                    text: "New lead captured from WhatsApp",
                    time: "5m ago",
                  },
                  {
                    icon: "⚡",
                    text: "Automation triggered: Welcome workflow",
                    time: "7m ago",
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5"
                  >
                    <span className="text-base shrink-0">{n.icon}</span>
                    <div className="flex-1">
                      <p className="text-[12px] text-gray-300 leading-snug">
                        {n.text}
                      </p>
                      <p className="mt-0.5 text-[10px] text-gray-600">
                        {n.time}
                      </p>
                    </div>
                    <div className="h-2 w-2 shrink-0 mt-1 rounded-full bg-[#7c5cfc]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardTopbar;
