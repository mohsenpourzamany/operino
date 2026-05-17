import React, { useEffect, useRef, useState } from "react";

const Sparkline: React.FC<{ data: number[]; color: string }> = ({
  data,
  color,
}) => {
  const w = 80,
    h = 24,
    min = Math.min(...data),
    max = Math.max(...data);
  const pts = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`,
    )
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
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

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({
  on,
  onChange,
}) => (
  <button
    onClick={onChange}
    className={`relative h-6 w-11 rounded-full transition-all duration-300 ${on ? "bg-[#7c5cfc]" : "bg-white/15"}`}
  >
    <div
      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on ? "left-5" : "left-0.5"}`}
    />
  </button>
);

const agents = [
  {
    name: "Support Agent",
    desc: "Handles customer support 24/7",
    role: "Support",
    channels: ["💚", "🌐", "📷"],
    conv: 1245,
    convDelta: "+12.5%",
    sat: 96,
    status: true,
    online: true,
    lastActive: "2 min ago",
    color: "#7c5cfc",
  },
  {
    name: "Sales Agent",
    desc: "Qualifies leads and books meetings",
    role: "Sales",
    channels: ["✉️", "💚", "📅"],
    conv: 532,
    convDelta: "+8.3%",
    sat: 94,
    status: true,
    online: true,
    lastActive: "1 min ago",
    color: "#3b82f6",
  },
  {
    name: "Instagram Agent",
    desc: "Engages with followers and DMs",
    role: "Social Media",
    channels: ["📷", "💬"],
    conv: 384,
    convDelta: "+15.7%",
    sat: 89,
    status: true,
    online: true,
    lastActive: "3 min ago",
    color: "#ec4899",
  },
  {
    name: "WhatsApp Agent",
    desc: "Provides support via WhatsApp",
    role: "Support",
    channels: ["💚"],
    conv: 292,
    convDelta: "+10.2%",
    sat: 94,
    status: true,
    online: true,
    lastActive: "Just now",
    color: "#22c55e",
  },
  {
    name: "Email Agent",
    desc: "Manages incoming emails",
    role: "Support",
    channels: ["✉️"],
    conv: 120,
    convDelta: "-4.1%",
    sat: 91,
    status: false,
    online: false,
    lastActive: "2 hours ago",
    color: "#f97316",
  },
  {
    name: "Booking Agent",
    desc: "Handles booking and scheduling",
    role: "Operations",
    channels: ["📅"],
    conv: 98,
    convDelta: "-2.3%",
    sat: 90,
    status: false,
    online: false,
    lastActive: "5 hours ago",
    color: "#a78bfa",
  },
];

const statCards = [
  {
    label: "Total AI Employees",
    val: "12",
    delta: "+2 from last month",
    icon: "🤖",
    color: "#7c5cfc",
    data: [6, 7, 8, 8, 9, 10, 11, 12],
  },
  {
    label: "Active Employees",
    val: "9",
    delta: "75% of total",
    icon: "⚡",
    color: "#22c55e",
    data: [5, 6, 6, 7, 7, 8, 8, 9],
  },
  {
    label: "Conversations (Today)",
    val: "2,453",
    delta: "+18.6% from yesterday",
    icon: "💬",
    color: "#3b82f6",
    data: [800, 1200, 900, 1600, 1400, 2000, 1800, 2453],
  },
  {
    label: "Avg. Satisfaction",
    val: "94%",
    delta: "+4.3% from yesterday",
    icon: "⭐",
    color: "#f97316",
    data: [88, 89, 90, 91, 91, 92, 93, 94],
  },
];

const DashboardAIEmployees: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All Employees");
  const [search, setSearch] = useState("");
  const [toggles, setToggles] = useState(agents.map((a) => a.status));
  const [, setHovered] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  const tabs = [
    "All Employees",
    `Active (${agents.filter((a) => a.online).length})`,
    `Inactive (${agents.filter((a) => !a.online).length})`,
  ];

  const filtered = agents.filter((a) => {
    const tabMatch =
      activeTab.startsWith("All") ||
      (activeTab.startsWith("Active") && a.online) ||
      (activeTab.startsWith("Inactive") && !a.online);
    const searchMatch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .ae-fade{animation:fadeUp 0.5s ease forwards;}
        .ae-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .ae-row:hover{background:rgba(124,92,252,0.06);}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.25s ease,border-color 0.25s ease,box-shadow 0.25s ease;}
        .stat-card:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.35);box-shadow:0 8px 24px rgba(124,92,252,0.15);}
        .ae-tab{transition:color 0.2s ease,background 0.2s ease;}
        .ae-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        .ae-btn{transition:transform 0.2s ease,background 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .ae-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .ae-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .ae-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes onlinePulse{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);}50%{box-shadow:0 0 0 4px rgba(34,197,94,0);}}
        .online-dot{animation:onlinePulse 2s ease-in-out infinite;}
      `}</style>

      <div ref={ref} className="flex flex-col gap-5 px-6 py-5">
        {/* Header */}
        <div
          className={`flex flex-wrap items-start justify-between gap-3 ${visible ? "ae-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div>
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">
              AI Employees
            </h1>
            <p className="mt-0.5 text-[13px] text-gray-500">
              Manage and monitor your AI workforce.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 transition-all hover:border-white/25 hover:text-white">
              ⬇️ Import Employees
            </button>
            <button className="ae-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">
              + Create AI Employee
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div
          className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${visible ? "ae-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          {statCards.map((s, i) => (
            <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-gray-500">{s.label}</p>
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
                  style={{ background: `${s.color}20` }}
                >
                  {s.icon}
                </div>
              </div>
              <p className="mt-2 text-[clamp(18px,2.5vw,26px)] font-bold text-white leading-none">
                {s.val}
              </p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-[10px] text-gray-500">{s.delta}</span>
                <Sparkline data={s.data} color={s.color} />
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div
          className={`rounded-2xl border border-white/8 bg-[#0d0b1f] ${visible ? "ae-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Table header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3">
            <div className="flex gap-1 rounded-xl bg-white/5 p-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`ae-tab rounded-lg px-3 py-1.5 text-[12px] font-semibold ${activeTab === t ? "bg-[#7c5cfc] text-white" : "text-gray-400 hover:text-white"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search AI employees..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="ae-search rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-4 text-[12px] text-gray-200 placeholder-gray-600 transition-all w-50"
                />
              </div>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-400 hover:text-white transition-colors">
                🔽 Filter
              </button>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-400 hover:text-white transition-colors">
                Sort ▾
              </button>
            </div>
          </div>

          {/* Column headers */}
          <div
            className="grid items-center gap-2 border-b border-white/8 px-5 py-2.5 text-[11px] font-semibold text-gray-600"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 60px" }}
          >
            <span>Employee</span>
            <span>Role</span>
            <span>Channels</span>
            <span>Conversations</span>
            <span>Satisfaction</span>
            <span>Status</span>
            <span>Last Active</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {filtered.map((a, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="ae-row grid items-center gap-2 px-5 py-3"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 60px",
              }}
            >
              {/* Employee */}
              <div className="flex items-center gap-3">
                <div
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{
                    background: `${a.color}22`,
                    border: `1px solid ${a.color}44`,
                  }}
                >
                  🤖
                  {a.online && (
                    <div className="online-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0d0b1f] bg-emerald-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-semibold text-white">
                      {a.name}
                    </p>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${a.online ? "bg-emerald-500/15 text-emerald-400" : "bg-gray-500/15 text-gray-500"}`}
                    >
                      {a.online ? "Online" : "Offline"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{a.desc}</p>
                </div>
              </div>

              {/* Role */}
              <span className="text-[12px] text-gray-400">{a.role}</span>

              {/* Channels */}
              <div className="flex gap-1">
                {a.channels.map((c, ci) => (
                  <span
                    key={ci}
                    className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Conversations */}
              <div>
                <span className="text-[13px] font-semibold text-white">
                  {a.conv.toLocaleString()}
                </span>
                <span
                  className={`ml-1.5 text-[10px] font-semibold ${a.convDelta.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}
                >
                  {a.convDelta}
                </span>
              </div>

              {/* Satisfaction */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-white font-semibold">{a.sat}%</span>
                </div>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${a.sat}%` }}
                  />
                </div>
              </div>

              {/* Toggle */}
              <Toggle
                on={toggles[i]}
                onChange={() =>
                  setToggles((t) => {
                    const n = [...t];
                    n[i] = !n[i];
                    return n;
                  })
                }
              />

              {/* Last active */}
              <div className="flex items-center gap-1.5">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${a.online ? "bg-emerald-400" : "bg-gray-600"}`}
                />
                <span className="text-[11px] text-gray-500">
                  {a.lastActive}
                </span>
              </div>

              {/* Actions */}
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:border-[#7c5cfc]/50 hover:text-white transition-all">
                ⋮
              </button>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
            <span className="text-[12px] text-gray-500">
              Showing 1 to {filtered.length} of {agents.length} employees
            </span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                ‹
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cfc] text-[12px] font-bold text-white">
                1
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[12px] text-gray-400 hover:text-white transition-colors">
                2
              </button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAIEmployees;
