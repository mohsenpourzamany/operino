import { useState, useEffect, useRef } from "react";

// ── Mini sparkline ────────────────────────────────────────────────────────────
function Sparkline({
  data,
  color,
  height = 48,
  fill = true,
}: {
  data: number[];
  color: string;
  height?: number;
  fill?: boolean;
}) {
  const W = 200,
    H = height;
  const min = Math.min(...data),
    max = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / (max - min || 1)) * (H - 4) - 2,
  }));
  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area =
    `M0,${H} ` +
    pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${W},${H} Z`;
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
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
      {fill && <path d={area} fill={`url(#sg-${color.replace("#", "")})`} />}
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Bar chart ─────────────────────────────────────────────────────────────────
function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data);
  const yLabels = [15000, 10000, 5000, 0];
  return (
    <div style={{ position: "relative", height: 100 }}>
      {/* y labels */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {yLabels.map((l) => (
          <span
            key={l}
            style={{ fontSize: 8.5, color: "rgba(255,255,255,0.25)" }}
          >
            {l === 0 ? "0" : `${l / 1000}K`}
          </span>
        ))}
      </div>
      <div
        style={{
          marginLeft: 24,
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          gap: 5,
        }}
      >
        {data.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${(v / max) * 76}px`,
                borderRadius: 3,
                background:
                  i === 3 || i === 4
                    ? "linear-gradient(180deg,#a78bfa,#7c5cfc)"
                    : "rgba(124,92,252,0.3)",
                transition: "height 0.6s cubic-bezier(.34,1.2,.64,1)",
              }}
            />
            <span style={{ fontSize: 7.5, color: "rgba(255,255,255,0.3)" }}>
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut chart ───────────────────────────────────────────────────────────────
function Donut({
  segments,
  label,
  value,
}: {
  segments: { pct: number; color: string }[];
  label: string;
  value: string;
}) {
  const R = 44,
    CX = 52,
    CY = 52,
    SW = 14,
    circ = 2 * Math.PI * R;
  const dashes = segments.map((seg) => (seg.pct / 100) * circ);
  const cumulativeOffsets = dashes.reduce((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + dashes[i - 1]);
    return acc;
  }, [] as number[]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg
          width={104}
          height={104}
          viewBox="0 0 104 104"
          style={{ transform: "rotate(-90deg)" }}
        >
          {segments.map((seg, i) => (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={seg.color}
              strokeWidth={SW}
              strokeDasharray={`${dashes[i]} ${circ - dashes[i]}`}
              strokeDashoffset={-cumulativeOffsets[i]}
            />
          ))}
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
          <span style={{ fontSize: 16, fontWeight: 800, color: "white" }}>
            {value}
          </span>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,0.38)" }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Stat row ──────────────────────────────────────────────────────────────────
function StatRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)" }}>
          {label}
        </span>
      </div>
      <span style={{ fontSize: 12.5, fontWeight: 700, color: "white" }}>
        {value}
      </span>
    </div>
  );
}

// ── Agent row ─────────────────────────────────────────────────────────────────
function AgentRow({
  icon,
  name,
  score,
  color,
}: {
  icon: string;
  name: string;
  score: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: `${color}22`,
            border: `1px solid ${color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          {icon}
        </div>
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.65)" }}>
          {name}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: score,
              background: color,
              borderRadius: 2,
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11.5,
            fontWeight: 700,
            color: "white",
            minWidth: 38,
            textAlign: "right",
          }}
        >
          {score}
        </span>
      </div>
    </div>
  );
}

// ── Channel row ───────────────────────────────────────────────────────────────
function ChannelRow({
  icon,
  name,
  pct,
  color,
}: {
  icon: React.ReactNode;
  name: string;
  pct: number;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "5px 0",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: "rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
        {name}
      </span>
      <div
        style={{
          width: 80,
          height: 4,
          borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
            transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "white",
          minWidth: 32,
          textAlign: "right",
        }}
      >
        {pct}%
      </span>
    </div>
  );
}

// ── Report row ────────────────────────────────────────────────────────────────
function ReportRow({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
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
        padding: "8px 10px",
        borderRadius: 9,
        background: h ? "rgba(124,92,252,0.1)" : "transparent",
        transition: "background 0.2s",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(124,92,252,0.15)",
          border: "1px solid rgba(124,92,252,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "white" }}>
          {title}
        </p>
        <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
          {sub}
        </p>
      </div>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </div>
  );
}

// ── Dashboard card wrapper ────────────────────────────────────────────────────
function Card({
  title,
  accent,
  children,
  delay,
  visible,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
  delay: number;
  visible: boolean;
}) {
  const [h, setH] = useState(false);
  // highlight first two chars of title
  const highlighted = title.slice(0, 2);
  const rest = title.slice(2);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h
          ? "linear-gradient(145deg,#14122e,#100e28)"
          : "linear-gradient(145deg,#11102a,#0d0c22)",
        border: h
          ? `1px solid rgba(124,92,252,0.4)`
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "clamp(14px,2vw,20px)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition:
          "border-color 0.25s, background 0.25s, box-shadow 0.3s, transform 0.3s",
        boxShadow: h
          ? "0 12px 32px rgba(124,92,252,0.14)"
          : "0 2px 12px rgba(0,0,0,0.3)",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
        opacity: visible ? 1 : 0,
        animationFillMode: "both",
        animation: visible
          ? `cardIn 0.5s cubic-bezier(.34,1.2,.64,1) ${delay}s both`
          : "none",
      }}
    >
      <h3
        style={{
          margin: 0,
          fontSize: "clamp(13px,1.4vw,15px)",
          fontWeight: 700,
          lineHeight: 1.2,
        }}
      >
        <span style={{ color: accent }}>{highlighted}</span>
        <span style={{ color: "white" }}>{rest}</span>
      </h3>
      {children}
    </div>
  );
}

const tabs = [
  "Overview",
  "Conversations",
  "Agents",
  "Workflows",
  "Users",
  "Custom Reports",
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [tabIndicator, setTabIndicator] = useState({ left: 0, width: 0 });
  const [visible, setVisible] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabBarRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = tabRefs.current[activeTab],
      bar = tabBarRef.current;
    if (el && bar) {
      const er = el.getBoundingClientRect(),
        br = bar.getBoundingClientRect();
      setTabIndicator({ left: er.left - br.left, width: er.width });
    }
  }, [activeTab]);

  const barData = [8200, 9500, 7800, 12100, 11200, 13400, 10800];
  const barLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sparkData1 = [20, 28, 22, 35, 30, 42, 38, 50, 44, 55, 60, 72];
  const sparkData2 = [30, 25, 35, 40, 32, 48, 42, 55, 50, 62, 68, 80];

  return (
    <div
      ref={ref}
      style={{
        width: "60%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(40px,6vw,72px) clamp(16px,4vw,40px)",
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardIn  { from{opacity:0;transform:translateY(18px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        @keyframes glowP   { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Ambient */}
      <div
        style={{
          position: "fixed",
          top: "20%",
          right: "10%",
          width: "40%",
          height: "60%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowP 8s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          margin: "0 0 clamp(20px,3vw,32px)",
          fontSize: "clamp(18px,2.8vw,28px)",
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.3px",
          animation: visible ? "fadeUp 0.6s ease both" : "none",
          opacity: visible ? 1 : 0,
        }}
      >
        Everything you need to understand your performance
      </h2>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "clamp(20px,3vw,32px)",
          animation: visible ? "fadeUp 0.6s 0.1s ease both" : "none",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          ref={tabBarRef}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 50,
            padding: "5px 6px",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* sliding pill */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: tabIndicator.left,
              width: tabIndicator.width,
              height: "calc(100% - 10px)",
              borderRadius: 50,
              background: "linear-gradient(135deg,#7c5cfc,#6d28d9)",
              transition:
                "left 0.32s cubic-bezier(.4,0,.2,1),width 0.32s cubic-bezier(.4,0,.2,1)",
              boxShadow: "0 4px 14px rgba(124,92,252,0.5)",
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
                padding: "8px clamp(10px,1.5vw,18px)",
                borderRadius: 50,
                fontSize: "clamp(11px,1.3vw,13px)",
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? "white" : "rgba(255,255,255,0.4)",
                transition: "color 0.22s",
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
                    "rgba(255,255,255,0.4)";
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4x2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "clamp(10px,1.6vw,16px)",
        }}
      >
        {/* 1. Performance Overview */}
        <Card
          title="Performance Overview"
          accent="#a78bfa"
          delay={0.12}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Get a high-level view of all your key metrics in one place.
          </p>
          <BarChart data={barData} labels={barLabels} />
        </Card>

        {/* 2. Conversation Analytics */}
        <Card
          title="Conversation Analytics"
          accent="#818cf8"
          delay={0.2}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Dive deep into conversations to analyze trends, intent, and
            outcomes.
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <StatRow
              label="Total Conversations"
              value="12,842"
              color="#7c5cfc"
            />
            <StatRow label="Resolved by AI" value="9,298" color="#22c55e" />
            <StatRow label="Human Handled" value="3,544" color="#f59e0b" />
            <StatRow label="Abandoned" value="1,104" color="#ef4444" />
          </div>
        </Card>

        {/* 3. Agent Performance */}
        <Card
          title="Agent Performance"
          accent="#7c5cfc"
          delay={0.28}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Compare your AI agents and see how each one is performing.
          </p>
          <div>
            <AgentRow
              icon="💼"
              name="Sales Agent"
              score="98.1%"
              color="#7c5cfc"
            />
            <AgentRow
              icon="🛟"
              name="Support Agent"
              score="95.4%"
              color="#818cf8"
            />
            <AgentRow icon="👥" name="HR Agent" score="93.7%" color="#a78bfa" />
            <AgentRow
              icon="💳"
              name="Billing Agent"
              score="91.2%"
              color="#c4b5fd"
            />
          </div>
        </Card>

        {/* 4. Workflow Analytics */}
        <Card
          title="Workflow Analytics"
          accent="#6366f1"
          delay={0.36}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Track workflow runs, success rates, and automation efficiency.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Donut
              value="8,642"
              label="Total Runs"
              segments={[
                { pct: 76, color: "#7c5cfc" },
                { pct: 12, color: "#ef4444" },
                { pct: 10, color: "#f59e0b" },
              ]}
            />
            <div style={{ flex: 1 }}>
              {[
                { label: "Successful", pct: "76%", color: "#7c5cfc" },
                { label: "Failed", pct: "12%", color: "#ef4444" },
                { label: "In Progress", pct: "10%", color: "#f59e0b" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: s.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: "white" }}
                  >
                    {s.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 5. User Insights */}
        <Card
          title="User Insights"
          accent="#34d399"
          delay={0.44}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Understand your users' behavior and engagement.
          </p>
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 10.5,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Active Users
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 800, color: "white" }}>
                10,298
              </span>
              <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}>
                ▲ 16.3%
              </span>
            </div>
            <Sparkline data={sparkData1} color="#34d399" />
          </div>
        </Card>

        {/* 6. Channel Performance */}
        <Card
          title="Channel Performance"
          accent="#f59e0b"
          delay={0.52}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            See which channels drive the most conversations and results.
          </p>
          <div>
            <ChannelRow
              color="#25d366"
              pct={45}
              name="WhatsApp"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              }
            />
            <ChannelRow
              color="#f9174b"
              pct={25}
              name="Instagram"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f9174b"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              }
            />
            <ChannelRow
              color="#7c5cfc"
              pct={20}
              name="Website Chat"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              }
            />
            <ChannelRow
              color="#229ED9"
              pct={10}
              name="Telegram"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#229ED9">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              }
            />
          </div>
        </Card>

        {/* 7. Response Time */}
        <Card
          title="Response Time Analysis"
          accent="#60a5fa"
          delay={0.6}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Monitor response times and ensure your agents are always fast.
          </p>
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 10.5,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Average Response Time
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: "white" }}>
                1.6s
              </span>
              <span style={{ fontSize: 12, color: "#22c55e", fontWeight: 600 }}>
                ▲ 18.4%
              </span>
            </div>
            <Sparkline data={sparkData2} color="#60a5fa" />
          </div>
        </Card>

        {/* 8. Custom Reports */}
        <Card
          title="Custom Reports"
          accent="#c4b5fd"
          delay={0.68}
          visible={visible}
        >
          <p
            style={{
              margin: 0,
              fontSize: 11.5,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.55,
            }}
          >
            Create custom reports and schedule them to your inbox.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ReportRow
              title="Daily Report"
              sub="Every day at 9:00 AM"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.8"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              }
            />
            <ReportRow
              title="Weekly Report"
              sub="Every Monday at 9:00 AM"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
            />
            <ReportRow
              title="Monthly Report"
              sub="1st of every month at 9:00 AM"
              icon={
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7c5cfc"
                  strokeWidth="1.8"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
