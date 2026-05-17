import React, { useEffect, useRef, useState } from "react";
import Opihello from "../../assets/Photos/Opi-Hello.png";
const Sparkline: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const w = 80,
    h = 28;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`,
    )
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient
          id={`sg${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#sg${color.replace("#", "")})`}
        points={`0,${h} ${pts} ${w},${h}`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts}
      />
    </svg>
  );
};

const DonutChart: React.FC = () => {
  const segs = [
    { label: "Website", pct: 48, color: "#7c5cfc" },
    { label: "WhatsApp", pct: 28, color: "#22c55e" },
    { label: "Instagram", pct: 15, color: "#ec4899" },
    { label: "Email", pct: 7, color: "#3b82f6" },
    { label: "Others", pct: 2, color: "#6b7280" },
  ];
  const r = 40,
    cx = 50,
    cy = 50,
    stroke = 16;
  const circ = 2 * Math.PI * r;
  let cum = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <svg viewBox="0 0 100 100" className="h-22.5 w-22.5 -rotate-90">
          {segs.map((s) => {
            const dash = (s.pct / 100) * circ;
            const offset = circ - (cum / 100) * circ;
            cum += s.pct;
            return (
              <circle
                key={s.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[13px] font-bold text-white">2,453</span>
          <span className="text-[9px] text-gray-500">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {segs.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full shrink-0"
              style={{ background: s.color }}
            />
            <span className="text-[11px] text-gray-400">{s.label}</span>
            <span className="ml-auto pl-2 text-[11px] font-bold text-white">
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AreaChart: React.FC = () => {
  const data = [
    800, 1200, 900, 1600, 1400, 2000, 1800, 2453, 2100, 1900, 2300, 2453,
  ];
  const labels = [
    "May 11",
    "May 12",
    "May 13",
    "May 14",
    "May 15",
    "May 16",
    "May 17",
  ];
  const w = 100,
    h = 100,
    min = 0,
    max = 3000;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / (max - min)) * h,
  }));
  const linePts = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPts = `0,${h} ${linePts} ${w},${h}`;
  return (
    <div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-25 w-full"
      >
        <defs>
          <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
          </linearGradient>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[25, 50, 75].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        <polygon fill="url(#areaG)" points={areaPts} />
        <polyline
          fill="none"
          stroke="#7c5cfc"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={linePts}
          filter="url(#glow2)"
        />
        <circle cx={pts[7].x} cy={pts[7].y} r="1.8" fill="#a78bfa" />
      </svg>
      <div className="mt-1 flex justify-between text-[9px] text-gray-600">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
};

const agents = [
  {
    name: "Support Agent",
    role: "Support",
    status: "Online",
    conv: "1,245",
    pct: "+12.5%",
    sat: 96,
    color: "#7c5cfc",
    emoji: "🤖",
  },
  {
    name: "Sales Agent",
    role: "Sales",
    status: "Online",
    conv: "532",
    pct: "+8.3%",
    sat: 94,
    color: "#3b82f6",
    emoji: "🤖",
  },
  {
    name: "Instagram Agent",
    role: "Social Media",
    status: "Online",
    conv: "584",
    pct: "+15.7%",
    sat: 89,
    color: "#ec4899",
    emoji: "🤖",
  },
  {
    name: "WhatsApp Agent",
    role: "Support",
    status: "Online",
    conv: "292",
    pct: "+10.2%",
    sat: 94,
    color: "#22c55e",
    emoji: "🤖",
  },
];

const liveActivity = [
  {
    icon: "🤖",
    text: "Support Agent answered a question",
    sub: "How can I integrate Operino?",
    time: "2m ago",
  },
  {
    icon: "💚",
    text: "New lead captured",
    sub: "From WhatsApp Channel",
    time: "5m ago",
  },
  {
    icon: "⚡",
    text: "Automation triggered",
    sub: "Welcome new lead workflow",
    time: "7m ago",
  },
  {
    icon: "📷",
    text: "Instagram Agent replied to DM",
    sub: "Thanks for your interest!",
    time: "10m ago",
  },
  {
    icon: "🔗",
    text: "WhatsApp channel connected",
    sub: "Business number +98 912 345 6789",
    time: "15m ago",
  },
];

const quickActions = [
  { icon: "🤖", label: "Create AI Employee" },
  { icon: "🔗", label: "Connect Channel" },
  { icon: "📚", label: "Import Knowledge" },
  { icon: "⚡", label: "Create Workflow" },
  { icon: "📊", label: "View Analytics" },
];

const DashboardHome: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  const stats = [
    {
      label: "Active AI Employees",
      val: "12",
      delta: "+2 from yesterday",
      color: "#7c5cfc",
      data: [4, 6, 5, 8, 7, 10, 9, 12],
      sparkColor: "#7c5cfc",
    },
    {
      label: "Conversations Today",
      val: "2,453",
      delta: "+18.6% from yesterday",
      color: "#22c55e",
      data: [800, 1200, 900, 1600, 1400, 2000, 1800, 2453],
      sparkColor: "#22c55e",
    },
    {
      label: "Automation Success Rate",
      val: "98.7%",
      delta: "+2.1% from yesterday",
      color: "#a78bfa",
      data: [90, 92, 94, 91, 96, 95, 97, 98.7],
      sparkColor: "#a78bfa",
    },
    {
      label: "Leads Captured",
      val: "356",
      delta: "+23.4% from yesterday",
      color: "#f97316",
      data: [120, 180, 150, 220, 200, 280, 300, 356],
      sparkColor: "#f97316",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .dh-fade{animation:fadeUp 0.5s ease forwards;}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.25s ease,border-color 0.25s ease,box-shadow 0.25s ease;}
        .stat-card:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.35);box-shadow:0 8px 28px rgba(124,92,252,0.15);}
        .agent-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.25s ease,border-color 0.25s ease,background 0.25s ease;cursor:pointer;}
        .agent-card:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.4);background:rgba(124,92,252,0.08)!important;}
        .qa-btn{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease,background 0.22s ease;cursor:pointer;}
        .qa-btn:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.45);background:rgba(124,92,252,0.12)!important;}
        .live-row{transition:background 0.18s ease;}
        .live-row:hover{background:rgba(255,255,255,0.04);}
        .ask-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease;}
        .ask-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.45);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .ask-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .ask-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes typingDot{0%,80%,100%{transform:scale(0.6);opacity:0.4;}40%{transform:scale(1);opacity:1;}}
        .typing-dot{animation:typingDot 1.4s ease-in-out infinite;}
        .typing-dot:nth-child(2){animation-delay:0.2s;}
        .typing-dot:nth-child(3){animation-delay:0.4s;}
        @keyframes robotBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
        .robot-bounce{animation:robotBounce 3s ease-in-out infinite;}
      `}</style>

      <div
        ref={ref}
        className="flex h-full flex-col overflow-y-auto bg-transparent px-6 py-5"
      >
        {/* Header */}
        <div
          className={`mb-5 flex items-start justify-between ${visible ? "dh-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div className="flex-1">
            <h1 className="font-['Syne'] text-[clamp(20px,2.5vw,28px)] font-bold text-white">
              Good evening, Mohsen 👋
            </h1>
            <p className="mt-0.5 text-[13px] text-gray-500">
              Your AI workforce is performing great today.
            </p>
          </div>
          <img
            src={Opihello}
            alt="Opi"
            className="robot-bounce w-[clamp(70px,8vw,100px)] drop-shadow-[0_8px_20px_rgba(124,92,252,0.4)]"
          />
        </div>

        {/* Stat cards */}
        <div
          className={`mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4 ${visible ? "dh-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          {stats.map((s, i) => (
            <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-4">
              <p className="text-[11px] text-gray-500">{s.label}</p>
              <p className="mt-1 text-[clamp(18px,2.5vw,26px)] font-bold text-white leading-none">
                {s.val}
              </p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-[10px] font-semibold text-emerald-400">
                  {s.delta}
                </span>
                <Sparkline data={s.data} color={s.sparkColor} />
              </div>
            </div>
          ))}
        </div>

        {/* AI Employees */}
        <div
          className={`mb-5 ${visible ? "dh-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-white">AI Employees</h2>
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {agents.map((a, i) => (
              <div key={i} className="agent-card rounded-2xl bg-[#0d0b1f] p-3">
                <div className="mb-2 flex items-center gap-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-xl"
                    style={{
                      background: `${a.color}22`,
                      border: `1px solid ${a.color}44`,
                    }}
                  >
                    {a.emoji}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white leading-none">
                      {a.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[9px] text-emerald-400">
                        {a.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1.5">{a.role}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-400">
                    Conv: <span className="font-bold text-white">{a.conv}</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    {a.pct}
                  </span>
                </div>
                <div className="mt-1.5">
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="text-gray-500">Satisfaction</span>
                    <span className="text-white font-semibold">{a.sat}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${a.sat}%`,
                        background: `linear-gradient(90deg,${a.color},${a.color}99)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Create new */}
            <div className="agent-card flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#0d0b1f] p-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-[#7c5cfc]/40 text-xl text-[#7c5cfc]">
                +
              </div>
              <span className="text-[11px] font-semibold text-[#a78bfa]">
                Create new
                <br />
                AI Employee
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: Chart + Donut + Live Activity */}
        <div
          className={`grid grid-cols-1 gap-4 lg:grid-cols-3 ${visible ? "dh-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          {/* Chart */}
          <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-white">
                Conversations Overview
              </h3>
              <button className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-400">
                This week ▾
              </button>
            </div>
            <AreaChart />
          </div>

          {/* Donut */}
          <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-white">Top Channels</h3>
            </div>
            <DonutChart />
            {/* Quick Actions */}
            <div className="mt-3 border-t border-white/8 pt-3">
              <p className="mb-2 text-[11px] font-bold text-gray-400">
                Quick Actions
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {quickActions.slice(0, 3).map((q, i) => (
                  <div
                    key={i}
                    className="qa-btn flex flex-col items-center gap-1 rounded-xl bg-white/4 p-2 text-center"
                  >
                    <span className="text-base">{q.icon}</span>
                    <span className="text-[9px] text-gray-400 leading-tight">
                      {q.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Activity */}
          <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-white">
                Live Activity
              </h3>
              <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">
                View all
              </button>
            </div>
            <div className="flex flex-col gap-0">
              {liveActivity.map((a, i) => (
                <div
                  key={i}
                  className="live-row flex items-start gap-2.5 rounded-xl px-2 py-2"
                >
                  <span className="shrink-0 text-base mt-0.5">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white leading-snug">
                      {a.text}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {a.sub}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] text-gray-600 mt-0.5">
                    {a.time}
                  </span>
                  <div className="shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7c5cfc]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Opi Chat Helper */}
        {showChat && (
          <div className="dh-fade fixed bottom-6 right-6 z-50 w-65 overflow-hidden rounded-2xl border border-[#7c5cfc]/40 bg-[#0d0b1f] shadow-2xl shadow-[#7c5cfc]/20">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <p className="text-[12px] font-bold text-white">
                  Need help, Mohsen?
                </p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-600 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] text-gray-400">
                I'm Opi, your AI assistant.
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`typing-dot h-1.5 w-1.5 rounded-full bg-[#7c5cfc]`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            <div className="border-t border-white/8 px-3 py-2.5">
              <button className="ask-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cfc] py-2 text-[12px] font-semibold text-white">
                🚀 Ask Opi anything
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardHome;
