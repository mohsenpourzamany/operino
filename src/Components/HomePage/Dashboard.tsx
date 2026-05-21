import { useState, useEffect } from "react";
import operino from "../../assets/operino-favicon.svg";
// ─── tiny sparkline ───────────────────────────────────────────────────────────
function Sparkline({ color, data }: { color: string; data: number[] }) {
  const W = 110,
    H = 36;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - ((v - min) / (max - min || 1)) * H;
      return `${x},${y}`;
    })
    .join(" ");
  const area =
    `M0,${H} ` +
    data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * W;
        const y = H - ((v - min) / (max - min || 1)) * H;
        return `L${x},${y}`;
      })
      .join(" ") +
    ` L${W},${H} Z`;
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`g${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g${color.replace("#", "")})`} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── donut chart ─────────────────────────────────────────────────────────────
function Donut() {
  const segments = [
    { pct: 41, color: "#818cf8", label: "New", count: "129 (41%)" },
    { pct: 31, color: "#3b82f6", label: "Contacted", count: "93 (31%)" },
    { pct: 21, color: "#06b6d4", label: "Qualified", count: "64 (21%)" },
    { pct: 7, color: "#6366f1", label: "Closed", count: "22 (7%)" },
  ];
  const R = 56,
    cx = 70,
    cy = 70,
    stroke = 18;
  const circ = 2 * Math.PI * R;
  let offset = 0;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 400);
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <div style={{ position: "relative" }}>
        <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
          {segments.map((seg, i) => {
            const dash = (seg.pct / 100) * circ;
            const gap = circ - dash;
            const el = (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={R}
                fill="none"
                stroke={seg.color}
                strokeWidth={stroke}
                strokeDasharray={visible ? `${dash} ${gap}` : `0 ${circ}`}
                strokeDashoffset={-offset}
                style={{
                  transition: `stroke-dasharray 1s cubic-bezier(.4,0,.2,1) ${i * 0.15}s`,
                }}
              />
            );
            offset += dash;
            return el;
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
            312
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
            Total Leads
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {segments.map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", alignItems: "center", gap: 7 }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: s.color,
                display: "block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                minWidth: 58,
              }}
            >
              {s.label}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                fontWeight: 500,
              }}
            >
              {s.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── area chart ──────────────────────────────────────────────────────────────
function AreaChart() {
  const data = [
    210, 260, 240, 310, 280, 370, 420, 390, 460, 510, 490, 560, 610, 590,
  ];
  const labels = [
    "May 12",
    "May 13",
    "May 14",
    "May 15",
    "May 16",
    "May 17",
    "May 18",
  ];
  const W = 460,
    H = 130;
  const min = 180,
    max = 640;
  const pts = data.map((v, i) => {
    const x = 10 + (i / (data.length - 1)) * (W - 20);
    const y = H - 10 - ((v - min) / (max - min)) * (H - 20);
    return { x, y };
  });
  const polyPts = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPts =
    `10,${H - 10} ` +
    pts.map((p) => `${p.x},${p.y}`).join(" ") +
    ` ${W - 10},${H - 10}`;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(animate);
    };
    setTimeout(() => requestAnimationFrame(animate), 300);
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
          1,248
        </span>
        <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 500 }}>
          ↑ 18.5%
        </span>
      </div>
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id="progressClip">
            <rect x="0" y="0" width={W * progress} height={H + 20} />
          </clipPath>
        </defs>
        {/* y grid lines */}
        {[180, 360, 500].map((v) => {
          const y = H - 10 - ((v - min) / (max - min)) * (H - 20);
          return (
            <line
              key={v}
              x1={0}
              y1={y}
              x2={W}
              y2={y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          );
        })}
        <polygon
          points={areaPts}
          fill="url(#areaGrad)"
          clipPath="url(#progressClip)"
        />
        <polyline
          points={polyPts}
          fill="none"
          stroke="#7c5cfc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#progressClip)"
        />
        {/* glow dot at last point */}
        {progress > 0.9 && (
          <circle
            cx={pts[pts.length - 1].x}
            cy={pts[pts.length - 1].y}
            r="5"
            fill="#7c5cfc"
            style={{ filter: "drop-shadow(0 0 6px #7c5cfc)" }}
          />
        )}
      </svg>
      {/* x labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        {labels.map((l) => (
          <span
            key={l}
            style={{ fontSize: 9.5, color: "rgba(255,255,255,0.25)" }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── stat card ───────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  iconColor: string;
  sparkData: number[];
  sparkColor: string;
  icon: React.ReactNode;
  delay: number;
}
function StatCard({
  label,
  value,
  change,
  positive,
  iconColor,
  sparkData,
  sparkColor,
  icon,
  delay,
}: StatCardProps) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), delay);
  }, [delay]);
  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(145deg,#13132a,#0f0f22)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        transform: show ? "translateY(0)" : "translateY(18px)",
        opacity: show ? 1 : 0,
        transition:
          "transform 0.55s cubic-bezier(.4,0,.2,1), opacity 0.55s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow bg */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          background: `${iconColor}22`,
          borderRadius: "50%",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            fontWeight: 500,
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: `${iconColor}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: iconColor,
          }}
        >
          {icon}
        </div>
      </div>
      <span
        style={{ fontSize: 26, fontWeight: 700, color: "white", lineHeight: 1 }}
      >
        {value}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              color: positive ? "#4ade80" : "#f87171",
              fontWeight: 600,
            }}
          >
            {change}
          </span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.28)",
              marginLeft: 4,
            }}
          >
            vs last week
          </span>
        </div>
        <Sparkline color={sparkColor} data={sparkData} />
      </div>
    </div>
  );
}

// ─── nav item ────────────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  active,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 12px",
        borderRadius: 10,
        cursor: "pointer",
        background: active
          ? "linear-gradient(90deg,rgba(124,92,252,0.25),rgba(124,92,252,0.08))"
          : "transparent",
        borderLeft: active ? "2px solid #7c5cfc" : "2px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <span
        style={{
          color: active ? "#a78bfa" : "rgba(255,255,255,0.35)",
          display: "flex",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: active ? 600 : 400,
          color: active ? "white" : "rgba(255,255,255,0.45)",
          flex: 1,
        }}
      >
        {label}
      </span>
      {badge && (
        <span
          style={{
            background: "#7c5cfc",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            borderRadius: 8,
            padding: "1px 6px",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const spark1 = [30, 35, 28, 40, 38, 45, 42, 50, 48, 55];
  const spark2 = [18, 22, 20, 28, 25, 32, 30, 38, 35, 42];
  const spark3 = [60, 65, 58, 70, 68, 75, 80, 78, 85, 90];
  const spark4 = [8, 9, 7, 10, 8, 9, 8, 10, 9, 8];

  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems = [
    {
      label: "Dashboard",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      label: "Conversations",
      badge: 12,
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: "Leads",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      label: "AI Agent",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      ),
    },
    {
      label: "Integrations",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="7" width="6" height="6" rx="1" />
          <rect x="16" y="7" width="6" height="6" rx="1" />
          <rect x="9" y="3" width="6" height="6" rx="1" />
          <path d="M5 13v2a2 2 0 002 2h10a2 2 0 002-2v-2M12 9v3" />
        </svg>
      ),
    },
    {
      label: "Analytics",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Settings",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
    },
  ];

  const channels = [
    {
      name: "Instagram",
      status: "Connected",
      color: "#f9174b",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
        </svg>
      ),
      bg: "linear-gradient(135deg,#f9174b,#f07133)",
    },
    {
      name: "WhatsApp",
      status: "Connected",
      color: "#25d366",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52z" />
        </svg>
      ),
      bg: "#25d366",
    },
    {
      name: "Website Chat",
      status: "Connected",
      color: "#7c5cfc",
      icon: (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      bg: "linear-gradient(135deg,#7c5cfc,#5535e8)",
    },
    {
      name: "Telegram",
      status: "Coming Soon",
      color: "#229ED9",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      bg: "#229ED9",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        background: "#080814",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        marginRight: "100px",
        marginLeft: "100px",
        borderRadius: 16,
        boxShadow: "0 0 40px rgba(255,255,255,0.1)",
        padding: "20px",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0)} 50%{box-shadow:0 0 16px 4px rgba(124,92,252,0.25)} }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Sidebar ── */}
      <div
        style={{
          width: 200,
          background: "linear-gradient(180deg,#0d0d20,#090916)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 10px",
          flexShrink: 0,
          animation: "fadeSlideUp 0.5s ease both",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "0 6px 24px",
          }}
        >
          <img
            src={operino}
            alt="Operino Logo"
            style={{ width: 32, height: 32, borderRadius: 6 }}
          />
          {/* <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 14px rgba(124,92,252,0.5)",
              animation: "pulse-glow 3s infinite",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2.5" />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
          </div> */}
          <span
            style={{
              fontFamily: "'Poppins' !important",
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            Operino
          </span>
        </div>

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <div key={item.label} onClick={() => setActiveNav(item.label)}>
              <NavItem {...item} active={activeNav === item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(8,8,20,0.8)",
            backdropFilter: "blur(12px)",
            animation: "fadeSlideUp 0.4s ease both",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.3px",
            }}
          >
            Dashboard
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9,
              padding: "7px 12px",
              cursor: "pointer",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
              May 12 – May 18, 2004
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Stat Cards Row */}
          <div style={{ display: "flex", gap: 14 }}>
            <StatCard
              label="Total Conversations"
              value="1,248"
              change="↑ 18.5%"
              positive={true}
              iconColor="#3b82f6"
              sparkData={spark1}
              sparkColor="#3b82f6"
              delay={100}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              }
            />
            <StatCard
              label="New Leads"
              value="312"
              change="↑ 24.7%"
              positive={true}
              iconColor="#6366f1"
              sparkData={spark2}
              sparkColor="#818cf8"
              delay={200}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
            <StatCard
              label="Resolved by AI"
              value="892"
              change="↑ 71.5%"
              positive={true}
              iconColor="#a78bfa"
              sparkData={spark3}
              sparkColor="#a78bfa"
              delay={300}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4" />
                </svg>
              }
            />
            <StatCard
              label="Human Handoff Rate"
              value="8.6%"
              change="↑ 2.1%"
              positive={false}
              iconColor="#7c5cfc"
              sparkData={spark4}
              sparkColor="#7c5cfc"
              delay={400}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />
          </div>

          {/* Bottom Row */}
          <div style={{ display: "flex", gap: 14, flex: 1 }}>
            {/* Conversations Chart */}
            <div
              style={{
                flex: 1.8,
                background: "linear-gradient(145deg,#13132a,#0f0f22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "18px 20px",
                animation: "fadeSlideUp 0.6s 0.3s ease both",
                opacity: 0,
                animationFillMode: "forwards",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  background: "rgba(124,92,252,0.06)",
                  borderRadius: "50%",
                  filter: "blur(30px)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Conversations
                </span>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <AreaChart />
            </div>

            {/* Leads Summary */}
            <div
              style={{
                flex: 1.2,
                background: "linear-gradient(145deg,#13132a,#0f0f22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "18px 20px",
                animation: "fadeSlideUp 0.6s 0.4s ease both",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  display: "block",
                  marginBottom: 16,
                }}
              >
                Leads Summary
              </span>
              <Donut />
            </div>

            {/* Channel Status */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(145deg,#13132a,#0f0f22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "18px 20px",
                animation: "fadeSlideUp 0.6s 0.5s ease both",
                opacity: 0,
                animationFillMode: "forwards",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                  display: "block",
                  marginBottom: 14,
                }}
              >
                Channel Status
              </span>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {channels.map((ch, i) => (
                  <div
                    key={ch.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "9px 11px",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      animation: `fadeSlideUp 0.5s ${0.5 + i * 0.1}s ease both`,
                      opacity: 0,
                      animationFillMode: "forwards",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 9 }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          background: ch.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {ch.icon}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.65)",
                          fontWeight: 500,
                        }}
                      >
                        {ch.name}
                      </span>
                    </div>
                    {ch.status === "Connected" ? (
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#4ade80",
                          background: "rgba(74,222,128,0.1)",
                          border: "1px solid rgba(74,222,128,0.25)",
                          borderRadius: 6,
                          padding: "3px 8px",
                        }}
                      >
                        Connected
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          fontStyle: "italic",
                        }}
                      >
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
