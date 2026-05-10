import { useState, useEffect, useRef } from "react";

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({
  data,
  color = "#7c5cfc",
  h = 34,
}: {
  data: number[];
  color?: string;
  h?: number;
  positive?: boolean;
}) {
  const W = 110,
    mn = Math.min(...data),
    mx = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: h - ((v - mn) / (mx - mn || 1)) * (h - 4) - 2,
  }));
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area =
    `M0,${h} ` +
    pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${W},${h} Z`;
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${h}`}
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
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
      <path d={area} fill={`url(#sg${color.replace("#", "")})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="2.8"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

// ── Engagement area chart ─────────────────────────────────────────────────────
function EngagementChart({ visible }: { visible: boolean }) {
  const [prog, setProg] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!visible) return;
    let start: number;
    const anim = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      setProg(p);
      if (p < 1) rafRef.current = requestAnimationFrame(anim);
    };
    rafRef.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  const W = 500,
    H = 160;
  const raw = [
    1800, 2400, 3800, 3000, 4400, 2800, 3600, 3200, 4800, 3800, 5200, 5800,
  ];
  const yLabels = ["0", "2K", "4K", "6K"];
  const labels = [
    "May 10",
    "May 11",
    "May 12",
    "May 13",
    "May 14",
    "May 15",
    "May 16",
  ];
  const mn = 0,
    mx = 6500;
  const pts = raw.map((v, i) => ({
    x: (i / (raw.length - 1)) * (W - 20) + 10,
    y: H - 10 - ((v - mn) / (mx - mn)) * (H - 20),
  }));
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area =
    `M10,${H - 10} ` +
    pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${W - 10},${H - 10} Z`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>
          Engagement Overview
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 7,
            padding: "3px 9px",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
            Daily
          </span>
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {[...yLabels].reverse().map((l) => (
            <span
              key={l}
              style={{ fontSize: 9, color: "rgba(255,255,255,0.22)" }}
            >
              {l}
            </span>
          ))}
        </div>
        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H + 8}`}
          preserveAspectRatio="none"
          style={{ overflow: "visible", paddingLeft: 28 }}
        >
          <defs>
            <linearGradient id="edGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.02" />
            </linearGradient>
            <clipPath id="edClip">
              <rect x="0" y="0" width={W * prog} height={H + 8} />
            </clipPath>
          </defs>
          {yLabels
            .map((_, i) => {
              const y = 10 + (i / (yLabels.length - 1)) * (H - 20);
              return (
                <line
                  key={i}
                  x1={10}
                  y1={y}
                  x2={W - 10}
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              );
            })
            .reverse()}
          <path d={area} fill="url(#edGrad)" clipPath="url(#edClip)" />
          <path
            d={line}
            fill="none"
            stroke="#7c5cfc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#edClip)"
          />
          {prog > 0.95 && (
            <circle
              cx={pts[pts.length - 1].x}
              cy={pts[pts.length - 1].y}
              r="5"
              fill="#7c5cfc"
              style={{ filter: "drop-shadow(0 0 6px #7c5cfc)" }}
            />
          )}
        </svg>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 28,
            marginTop: 4,
          }}
        >
          {labels.map((l) => (
            <span
              key={l}
              style={{ fontSize: 9, color: "rgba(255,255,255,0.22)" }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Donut ─────────────────────────────────────────────────────────────────────
function CommDonut() {
  const segs = [
    { label: "Email", pct: 45, color: "#7c5cfc" },
    { label: "In-App", pct: 30, color: "#818cf8" },
    { label: "SMS", pct: 15, color: "#a78bfa" },
    { label: "Other", pct: 10, color: "#c4b5fd" },
  ];
  const R = 44,
    CX = 52,
    CY = 52,
    SW = 14,
    circ = 2 * Math.PI * R;
  let off = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg
          width={104}
          height={104}
          viewBox="0 0 104 104"
          style={{ transform: "rotate(-90deg)" }}
        >
          {segs.map((s, i) => {
            const dash = (s.pct / 100) * circ;
            const el = (
              <circle
                key={i}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth={SW}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-off}
              />
            );
            off += dash;
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
          <span style={{ fontSize: 15, fontWeight: 800, color: "white" }}>
            8,129
          </span>
          <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.38)" }}>
            Total
          </span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {segs.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: s.color,
                }}
              />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </span>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: "white" }}>
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  change,
  positive,
  sparkData,
  delay,
  visible,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sparkData: number[];
  delay: number;
  visible: boolean;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h
          ? "linear-gradient(145deg,#14122e,#100e28)"
          : "linear-gradient(145deg,#111028,#0d0c22)",
        border: h
          ? "1px solid rgba(124,92,252,0.42)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        padding: "11px 13px",
        display: "flex",
        flexDirection: "column",
        gap: 7,
        transition: "all 0.25s ease",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        boxShadow: h ? "0 8px 22px rgba(124,92,252,0.15)" : "none",
        cursor: "default",
        opacity: visible ? 1 : 0,
        animation: visible
          ? `cardIn 0.45s cubic-bezier(.34,1.2,.64,1) ${delay}s both`
          : "none",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: 10,
          color: "rgba(255,255,255,0.38)",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 22,
              fontWeight: 800,
              color: "white",
              lineHeight: 1,
            }}
          >
            {value}
          </p>
          <span
            style={{
              fontSize: 11,
              color: positive ? "#22c55e" : "#ef4444",
              fontWeight: 600,
            }}
          >
            {positive ? "▲" : "▼"} {change}
          </span>
        </div>
        <div style={{ width: 76 }}>
          <Sparkline
            data={sparkData}
            color={positive ? "#7c5cfc" : "#ef4444"}
            h={32}
            positive={positive}
          />
        </div>
      </div>
    </div>
  );
}

// ── Activity row ──────────────────────────────────────────────────────────────
function ActivityRow({
  name,
  completed,
  saved,
  color,
  emoji,
  visible,
  delay,
}: {
  rank: number;
  name: string;
  completed: string;
  saved: string;
  color: string;
  emoji: string;
  visible: boolean;
  delay: number;
}) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 8px",
        borderRadius: 8,
        background: h ? "rgba(124,92,252,0.08)" : "transparent",
        transition: "background 0.2s",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        animation: visible ? `rowIn 0.4s ease ${delay}s both` : "none",
      }}
    >
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          background: `${color}22`,
          border: `1px solid ${color}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
      <span
        style={{
          flex: 1,
          fontSize: 12,
          color: "rgba(255,255,255,0.72)",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.5)",
          flexShrink: 0,
          minWidth: 42,
          textAlign: "right",
        }}
      >
        {completed}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color,
          flexShrink: 0,
          minWidth: 40,
          textAlign: "right",
        }}
      >
        {saved}
      </span>
    </div>
  );
}

const tabs = [
  "Overview",
  "AI Solutions",
  "Key Benefits",
  "Success Stories",
  "Integrations",
  "Pricing",
];
const tabIcons: Record<string, React.ReactNode> = {
  Overview: (
    <svg
      width="12"
      height="12"
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
  "AI Solutions": (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <path d="M9 11h.01M15 11h.01" />
      <line x1="12" y1="8" x2="12" y2="5" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  "Key Benefits": (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  "Success Stories": (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  Integrations: (
    <svg
      width="12"
      height="12"
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
  Pricing: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
};

export default function EducationDashboard() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.07 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const el = tabRefs.current[activeTab],
      bar = barRef.current;
    if (el && bar) {
      const er = el.getBoundingClientRect(),
        br = bar.getBoundingClientRect();
      setIndicator({ left: er.left - br.left, width: er.width });
    }
  }, [activeTab]);

  const s1 = [40, 50, 46, 60, 56, 68, 64, 76],
    s2 = [32, 40, 46, 44, 54, 52, 60, 66],
    s3 = [55, 50, 45, 52, 44, 50, 40, 46],
    s4 = [60, 65, 70, 68, 76, 72, 78, 84];

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(18px,3vw,28px) clamp(12px,3vw,28px)",
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(14px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes rowIn  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer{ 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        * { box-sizing:border-box; }
      `}</style>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px,1.8vw,16px)",
        }}
      >
        {/* TABS */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div
            ref={barRef}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 50,
              padding: "4px 5px",
              gap: 1,
              flexWrap: "wrap",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 4,
                left: indicator.left,
                width: indicator.width,
                height: "calc(100% - 8px)",
                borderRadius: 50,
                background: "linear-gradient(135deg,#7c5cfc,#6d28d9)",
                transition:
                  "left 0.3s cubic-bezier(.4,0,.2,1),width 0.3s cubic-bezier(.4,0,.2,1)",
                boxShadow: "0 3px 12px rgba(124,92,252,0.5)",
                zIndex: 0,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                  backgroundSize: "200px 100%",
                  animation: "shimmer 2.5s linear infinite",
                }}
              />
            </div>
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                onClick={() => setActiveTab(tab)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "7px clamp(8px,1.3vw,14px)",
                  borderRadius: 50,
                  fontSize: "clamp(10.5px,1.2vw,12.5px)",
                  fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? "white" : "rgba(255,255,255,0.42)",
                  transition: "color 0.22s",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.72)";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.42)";
                }}
              >
                {tabIcons[tab]}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.1s",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(14px,1.8vw,18px)",
              fontWeight: 700,
              color: "white",
            }}
          >
            Education Dashboard Overview
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>
              May 10 – May 16, 2025
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        {/* 3-COL GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "195px 1fr 215px",
            gap: "clamp(10px,1.5vw,14px)",
            alignItems: "start",
          }}
        >
          {/* COL 1 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(8px,1.2vw,10px)",
            }}
          >
            <StatCard
              label="Students Supported"
              value="12,842"
              change="18.2%"
              positive={true}
              sparkData={s1}
              delay={0.12}
              visible={visible}
            />
            <StatCard
              label="Assignments Graded"
              value="5,231"
              change="14.6%"
              positive={true}
              sparkData={s2}
              delay={0.2}
              visible={visible}
            />
            <StatCard
              label="Response Time (Avg.)"
              value="2.4 min"
              change="24.1%"
              positive={false}
              sparkData={s3}
              delay={0.28}
              visible={visible}
            />
            <StatCard
              label="Student Satisfaction"
              value="96.7%"
              change="8.7%"
              positive={true}
              sparkData={s4}
              delay={0.36}
              visible={visible}
            />
          </div>

          {/* COL 2 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.5vw,14px)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg,#111028,#0d0c22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "clamp(14px,2vw,18px)",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "cardIn 0.45s 0.2s cubic-bezier(.34,1.2,.64,1) both"
                  : "none",
              }}
            >
              <EngagementChart visible={visible} />
            </div>
            <div
              style={{
                background: "linear-gradient(145deg,#111028,#0d0c22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "clamp(14px,2vw,18px)",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "cardIn 0.45s 0.3s cubic-bezier(.34,1.2,.64,1) both"
                  : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "white",
                  }}
                >
                  Top Activities Automated
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: "0 16px",
                    fontSize: 10,
                    color: "rgba(255,255,255,0.3)",
                    alignItems: "center",
                  }}
                >
                  <span />
                  <span>Completed</span>
                  <span>Time Saved</span>
                </div>
              </div>
              {[
                {
                  rank: 1,
                  name: "Grading Assistance",
                  completed: "2,342",
                  saved: "38 hrs",
                  color: "#7c5cfc",
                  emoji: "📝",
                  delay: 0.32,
                },
                {
                  rank: 2,
                  name: "Student Inquiries",
                  completed: "1,842",
                  saved: "29 hrs",
                  color: "#818cf8",
                  emoji: "💬",
                  delay: 0.4,
                },
                {
                  rank: 3,
                  name: "Content Recommendations",
                  completed: "1,231",
                  saved: "19 hrs",
                  color: "#a78bfa",
                  emoji: "🎯",
                  delay: 0.48,
                },
                {
                  rank: 4,
                  name: "Attendance Follow-ups",
                  completed: "1,024",
                  saved: "16 hrs",
                  color: "#22c55e",
                  emoji: "📋",
                  delay: 0.56,
                },
                {
                  rank: 5,
                  name: "Parent Communications",
                  completed: "792",
                  saved: "13 hrs",
                  color: "#c4b5fd",
                  emoji: "👨‍👩‍👧",
                  delay: 0.64,
                },
              ].map((r) => (
                <ActivityRow key={r.rank} {...r} visible={visible} />
              ))}
            </div>
          </div>

          {/* COL 3 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.5vw,14px)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg,#111028,#0d0c22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "14px",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "cardIn 0.45s 0.25s cubic-bezier(.34,1.2,.64,1) both"
                  : "none",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                AI Insights
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {[
                  {
                    icon: "📈",
                    title: "High Engagement",
                    body: "Course engagement is 28% higher than last week.",
                  },
                  {
                    icon: "⚠️",
                    title: "At Risk Students",
                    body: "32 students need attention based on activity.",
                  },
                  {
                    icon: "📚",
                    title: "Content Effectiveness",
                    body: "AI suggests updating 12% of learning materials.",
                  },
                ].map((ins) => (
                  <div key={ins.title} style={{ display: "flex", gap: 9 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "rgba(124,92,252,0.15)",
                        border: "1px solid rgba(124,92,252,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        flexShrink: 0,
                      }}
                    >
                      {ins.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: "white",
                        }}
                      >
                        {ins.title}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 10,
                          color: "rgba(255,255,255,0.38)",
                          lineHeight: 1.5,
                        }}
                      >
                        {ins.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                style={{
                  marginTop: 12,
                  width: "100%",
                  background: "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                  border: "none",
                  borderRadius: 9,
                  padding: "9px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  boxShadow: "0 4px 14px rgba(124,92,252,0.4)",
                }}
              >
                View All Insights{" "}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <div
              style={{
                background: "linear-gradient(145deg,#111028,#0d0c22)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "14px",
                opacity: visible ? 1 : 0,
                animation: visible
                  ? "cardIn 0.45s 0.38s cubic-bezier(.34,1.2,.64,1) both"
                  : "none",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "white",
                }}
              >
                Communication Channels
              </h3>
              <CommDonut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
