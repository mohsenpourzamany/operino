import React, { useEffect, useRef, useState } from "react";

// ── Sparkline ──────────────────────────────────────────────────────────────
const Sparkline: React.FC<{ data: number[]; color?: string }> = ({
  data,
  color = "#7c5cfc",
}) => {
  const w = 80,
    h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient
          id={`sg-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
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

// ── Area chart ─────────────────────────────────────────────────────────────
const AreaChart: React.FC = () => {
  const data = [
    1800, 2200, 1900, 2800, 2400, 3200, 4100, 3700, 4600, 5200, 4800, 5800,
    6000,
  ];
  const labels = [
    "May 10",
    "May 11",
    "May 12",
    "May 13",
    "May 14",
    "May 15",
    "May 16",
  ];
  const w = 100,
    h = 100;
  const min = 0,
    max = 6500;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return { x, y };
  });
  const linePts = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPts = `0,${h} ` + linePts + ` ${w},${h}`;

  return (
    <div className="relative w-full">
      {/* Y labels */}
      <div className="flex">
        <div
          className="flex w-10 flex-col justify-between pr-2 text-right text-[10px] text-gray-600"
          style={{ height: 140 }}
        >
          {["6K", "4K", "2K", "0"].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
        <div className="flex-1">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-35 w-full"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Grid lines */}
            {[0, 33, 66, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            ))}
            <polygon fill="url(#areaGrad)" points={areaPts} />
            <polyline
              fill="none"
              stroke="#7c5cfc"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={linePts}
              filter="url(#glow)"
            />
            {/* Last dot */}
            <circle
              cx={pts[pts.length - 1].x}
              cy={pts[pts.length - 1].y}
              r="1.5"
              fill="#a78bfa"
            />
          </svg>
        </div>
      </div>
      {/* X labels */}
      <div className="ml-10 flex justify-between text-[10px] text-gray-600 mt-1">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// ── Donut ──────────────────────────────────────────────────────────────────
const DonutChart: React.FC = () => {
  const segments = [
    { label: "Content", pct: 40, color: "#7c5cfc" },
    { label: "SEO", pct: 25, color: "#a78bfa" },
    { label: "Analytics", pct: 20, color: "#4f3db0" },
    { label: "Reports", pct: 15, color: "#2d1f6e" },
  ];
  const r = 38,
    cx = 50,
    cy = 50,
    stroke = 14;
  let cumulative = 0;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <svg viewBox="0 0 100 100" className="h-25 w-25 -rotate-90">
          {segments.map((seg) => {
            const dash = (seg.pct / 100) * circumference;
            const gap = circumference - dash;
            const offset = circumference - (cumulative / 100) * circumference;
            cumulative += seg.pct;
            return (
              <circle
                key={seg.label}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[13px] font-bold text-white">1,243</span>
          <span className="text-[9px] text-gray-500">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-[11px] text-gray-400">{s.label}</span>
            <span className="ml-auto text-[11px] font-semibold text-white pl-2">
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main ───────────────────────────────────────────────────────────────────
const AgencyDashboard: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    "Overview",
    "AI Solutions",
    "Key Benefits",
    "Success Stories",
    "Integrations",
    "Pricing",
  ];

  const statCards = [
    {
      label: "Total Clients",
      value: "28",
      pct: "+21.4%",
      data: [10, 14, 12, 18, 16, 22, 20, 28],
    },
    {
      label: "Active Projects",
      value: "48",
      pct: "+18.7%",
      data: [22, 28, 25, 35, 30, 40, 38, 48],
    },
    {
      label: "Tasks Automated",
      value: "1,243",
      pct: "+32.6%",
      data: [400, 600, 550, 800, 750, 1000, 950, 1243],
    },
    {
      label: "Hours Saved",
      value: "156 hrs",
      pct: "+27.3%",
      data: [40, 65, 58, 90, 80, 120, 110, 156],
    },
    {
      label: "Client Satisfaction",
      value: "96.8%",
      pct: "+8.6%",
      data: [80, 84, 83, 88, 87, 92, 94, 97],
    },
  ];

  const clients = [
    { name: "TechFlow", projects: 8, pct: 24.5 },
    { name: "Nova Solutions", projects: 6, pct: 18.2 },
    { name: "Bright Marketing", projects: 5, pct: 16.7 },
    { name: "Creative Hub", projects: 4, pct: 14.3 },
    { name: "Digital Boost", projects: 3, pct: 12.8 },
  ];

  const insights = [
    {
      icon: "🎯",
      title: "Campaign Performance",
      desc: "3 campaigns are underperforming. AI suggests optimizations.",
    },
    {
      icon: "💡",
      title: "Content Opportunities",
      desc: "12 content ideas identified for your clients.",
    },
    {
      icon: "⚡",
      title: "Time Savings",
      desc: "You saved 156 hours this week with AI automation.",
    },
  ];

  return (
    <div className="w-full flex justify-center py-8 px-4">
      <div className="w-full max-w-225">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .dash-wrap { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; }

        @keyframes countUp {
          from { opacity:0; transform:scale(0.85); }
          to   { opacity:1; transform:scale(1); }
        }
        .count-up { animation: countUp 0.5s ease forwards; }

        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(124,92,252,0.2);
          background: rgba(124,92,252,0.1) !important;
        }
        .tab-btn {
          transition: color 0.2s ease, border-color 0.2s ease;
          white-space: nowrap;
        }
        .client-row {
          transition: background 0.2s ease;
        }
        .client-row:hover { background: rgba(124,92,252,0.08); }

        .progress-bar-fill {
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #7c5cfc, #a78bfa);
          transition: width 1s ease;
        }
      `}</style>

        <div ref={sectionRef} className="dash-wrap w-full bg-transparent">
          {/* ── Tab nav ── */}
          <div
            className={`mb-4 border-b border-white/10 ${visible ? "fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            <div className="flex gap-0 overflow-x-auto scrollbar-none">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`tab-btn flex items-center gap-2 border-b-2 px-4 py-3 text-[13px] font-medium ${
                    activeTab === t
                      ? "border-[#7c5cfc] text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {t === "Overview" && (
                    <span className="h-4 w-4 rounded-full bg-[#7c5cfc]/30 text-[10px] flex items-center justify-center">
                      ●
                    </span>
                  )}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ── Header ── */}
          <div
            className={`mb-5 flex flex-wrap items-center justify-between gap-3 ${visible ? "fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <h2 className="text-[clamp(16px,2vw,20px)] font-bold text-white">
              Agencies Dashboard Overview
            </h2>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[13px] text-gray-400">
              <span>📅</span>
              <span>May 10 – May 16, 2025</span>
            </div>
          </div>

          {/* ── 3-col layout ── */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_240px]">
            {/* COL 1 — Stat cards */}
            <div className="flex flex-col gap-3">
              {statCards.map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-card rounded-2xl border border-white/8 bg-white/5 p-4 ${visible ? "fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.15 + i * 0.08}s` }}
                >
                  <p className="text-[11px] text-gray-500">{s.label}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <span
                      className={`text-[clamp(18px,2.5vw,26px)] font-bold text-white ${visible ? "count-up" : ""}`}
                      style={{ animationDelay: `${0.3 + i * 0.08}s` }}
                    >
                      {s.value}
                    </span>
                    <Sparkline data={s.data} />
                  </div>
                  <span className="mt-1 inline-block text-[11px] font-semibold text-emerald-400">
                    ↑ {s.pct}
                  </span>
                </div>
              ))}
            </div>

            {/* COL 2 — Chart + Clients */}
            <div className="flex flex-col gap-4">
              {/* Chart card */}
              <div
                className={`rounded-2xl border border-white/8 bg-white/5 p-5 ${visible ? "fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-white">
                    Performance Overview
                  </h3>
                  <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-gray-400">
                    Weekly <span className="ml-1">▾</span>
                  </div>
                </div>
                <AreaChart />
              </div>

              {/* Top Clients */}
              <div
                className={`rounded-2xl border border-white/8 bg-white/5 p-5 ${visible ? "fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.3s" }}
              >
                <h3 className="mb-3 text-[14px] font-semibold text-white">
                  Top Clients
                </h3>
                <div className="mb-2 grid grid-cols-[20px_1fr_60px_1fr_80px] gap-2 text-[11px] text-gray-600">
                  <span></span>
                  <span>Client</span>
                  <span>Projects</span>
                  <span>Performance</span>
                  <span className="text-right">%</span>
                </div>
                {clients.map((c, i) => (
                  <div
                    key={c.name}
                    className="client-row grid grid-cols-[20px_1fr_60px_1fr_80px] items-center gap-2 rounded-xl px-2 py-2 text-[12px]"
                  >
                    <span className="text-gray-600">{i + 1}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/20 text-[11px] font-bold text-[#a78bfa]">
                        {c.name[0]}
                      </div>
                      <span className="truncate font-medium text-white">
                        {c.name}
                      </span>
                    </div>
                    <span className="text-gray-400">{c.projects}</span>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: visible ? `${(c.pct / 30) * 100}%` : "0%",
                        }}
                      />
                    </div>
                    <span className="text-right font-semibold text-emerald-400">
                      ↑ {c.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* COL 3 — AI Insights + Donut */}
            <div className="flex flex-col gap-4">
              {/* AI Insights */}
              <div
                className={`rounded-2xl border border-white/8 bg-white/5 p-5 ${visible ? "fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.25s" }}
              >
                <h3 className="mb-4 text-[14px] font-semibold text-white">
                  AI Insights
                </h3>
                <div className="flex flex-col gap-4">
                  {insights.map((ins, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-base">
                        {ins.icon}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-white">
                          {ins.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
                          {ins.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 w-full rounded-xl bg-[#7c5cfc] py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-[#6b4ce0] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-900/40">
                  View All Insights →
                </button>
              </div>

              {/* Donut */}
              <div
                className={`rounded-2xl border border-white/8 bg-white/5 p-5 ${visible ? "fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.35s" }}
              >
                <h3 className="mb-4 text-[14px] font-semibold text-white">
                  Tasks by Category
                </h3>
                <DonutChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboard;
