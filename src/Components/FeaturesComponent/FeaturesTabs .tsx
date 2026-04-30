import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Feature {
  id: string;
  title: string;
  description: string;
  tab: string;
  icon: React.ReactNode;
  iconBg: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const RobotIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect
      x="5"
      y="8"
      width="14"
      height="10"
      rx="3"
      stroke="#a78bfa"
      strokeWidth="1.8"
    />
    <path
      d="M9 12h.01M15 12h.01"
      stroke="#a78bfa"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M9 15s1 1 3 1 3-1 3-1"
      stroke="#a78bfa"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="8"
      x2="12"
      y2="5"
      stroke="#a78bfa"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="4" r="1.2" fill="#a78bfa" />
    <line
      x1="5"
      y1="12"
      x2="2"
      y2="12"
      stroke="#a78bfa"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="19"
      y1="12"
      x2="22"
      y2="12"
      stroke="#a78bfa"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const ChatIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <circle cx="9" cy="10" r="1" fill="#a78bfa" />
    <circle cx="12" cy="10" r="1" fill="#a78bfa" />
    <circle cx="15" cy="10" r="1" fill="#a78bfa" />
  </svg>
);
const BoltIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#a78bfa">
    <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
  </svg>
);
const PuzzleIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <path d="M19.4 13a2 2 0 000-2.8 2 2 0 00-2.8 0L15 11.8V9a2 2 0 00-2-2H9.2a2 2 0 01.4-2.8A2 2 0 007 4.6V7H4a2 2 0 00-2 2v4h2.6a2 2 0 010 4H2v4a2 2 0 002 2h4v-2.6a2 2 0 014 0V22h4a2 2 0 002-2v-3l1.4-1.4a2 2 0 000-2.8z" />
  </svg>
);
const BarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#a78bfa">
    <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.55" />
    <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.75" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);
const DatabaseIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const TeamIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

// ─── Feature data ─────────────────────────────────────────────────────────────
const features: Feature[] = [
  {
    id: "ai-builder",
    title: "AI Agent Builder",
    description:
      "Create smart AI agents without coding. Train, customize, and deploy in minutes.",
    tab: "Build",
    icon: <RobotIcon />,
    iconBg: "linear-gradient(135deg,#4c1d95,#6d28d9)",
  },
  {
    id: "multichannel",
    title: "Multi-Channel Conversations",
    description:
      "Connect with your customers across multiple channels — all from one inbox.",
    tab: "Automate",
    icon: <ChatIcon />,
    iconBg: "linear-gradient(135deg,#3730a3,#5b21b6)",
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description:
      "Automate repetitive tasks and complex workflows. Save time and reduce errors.",
    tab: "Automate",
    icon: <BoltIcon />,
    iconBg: "linear-gradient(135deg,#4338ca,#6d28d9)",
  },
  {
    id: "integrations",
    title: "100+ Integrations",
    description: "Seamlessly integrate with the tools you already use.",
    tab: "Integrate",
    icon: <PuzzleIcon />,
    iconBg: "linear-gradient(135deg,#5b21b6,#7c3aed)",
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Track performance, measure results, and make data-driven decisions.",
    tab: "Analyze",
    icon: <BarIcon />,
    iconBg: "linear-gradient(135deg,#3730a3,#4f46e5)",
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    description:
      "Upload your documents and data to give your AI agents the right knowledge.",
    tab: "Build",
    icon: <DatabaseIcon />,
    iconBg: "linear-gradient(135deg,#4c1d95,#6d28d9)",
  },
  {
    id: "team",
    title: "Team Collaboration",
    description:
      "Work together with your team. Share agents, set roles, and manage permissions.",
    tab: "Manage",
    icon: <TeamIcon />,
    iconBg: "linear-gradient(135deg,#3730a3,#5b21b6)",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Your data is protected with enterprise-grade security and compliance standards.",
    tab: "Manage",
    icon: <ShieldIcon />,
    iconBg: "linear-gradient(135deg,#4338ca,#6d28d9)",
  },
];

const tabs = [
  "All Features",
  "Build",
  "Automate",
  "Integrate",
  "Analyze",
  "Manage",
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60 + index * 80);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "linear-gradient(145deg,#1a1240,#130e30)"
          : "linear-gradient(145deg,#13112b,#0e0c22)",
        border: hovered
          ? "1px solid rgba(124,92,252,0.5)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transform: mounted
          ? hovered
            ? "translateY(-5px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(22px)",
        opacity: mounted ? 1 : 0,
        transition:
          "transform 0.4s cubic-bezier(.4,0,.2,1), opacity 0.45s ease, border-color 0.25s, background 0.25s, box-shadow 0.3s",
        boxShadow: hovered
          ? "0 16px 40px rgba(124,92,252,0.22)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* glow on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 130,
            height: 130,
            background:
              "radial-gradient(circle,rgba(124,92,252,0.2) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon */}
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: feature.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? "0 6px 20px rgba(124,92,252,0.4)"
            : "0 4px 14px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.3s, transform 0.3s",
          transform: hovered
            ? "scale(1.08) rotate(-3deg)"
            : "scale(1) rotate(0deg)",
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          fontSize: 16,
          fontWeight: 700,
          color: "white",
          lineHeight: 1.3,
          letterSpacing: "-0.2px",
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.7,
          flex: 1,
        }}
      >
        {feature.description}
      </p>

      {/* Learn more */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: "#7c5cfc",
          fontSize: 13,
          fontWeight: 600,
          transition: "gap 0.2s",
          marginTop: 4,
        }}
      >
        <span>Learn more</span>
        <span
          style={{
            transition: "transform 0.2s",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7c5cfc"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState("All Features");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [titleVisible, setTitleVisible] = useState(false);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridKey, setGridKey] = useState(0);

  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 80);
  }, []);

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    const container = containerRef.current;
    if (el && container) {
      const eR = el.getBoundingClientRect();
      const cR = container.getBoundingClientRect();
      setIndicatorStyle({ left: eR.left - cR.left, width: eR.width });
    }
  }, [activeTab]);

  const filtered =
    activeTab === "All Features"
      ? features
      : features.filter((f) => f.tab === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setGridKey((k) => k + 1);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#09091a",
        padding: "70px 40px 80px",
        fontFamily: "'Inter',sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
        @keyframes gridFadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 800,
          color: "white",
          letterSpacing: "-0.4px",
          textAlign: "center",
          animation: titleVisible ? "fadeUp 0.65s ease both" : "none",
          opacity: titleVisible ? 1 : 0,
        }}
      >
        Powerful features built for modern businesses
      </h2>

      {/* Tab bar */}
      <div
        style={{
          animation: titleVisible ? "fadeUp 0.65s 0.12s ease both" : "none",
          opacity: titleVisible ? 1 : 0,
        }}
      >
        <div
          ref={containerRef}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 50,
            padding: "5px 6px",
            gap: 2,
          }}
        >
          {/* Sliding pill */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              height: "calc(100% - 10px)",
              background: "linear-gradient(135deg,#7c5cfc,#6d28d9)",
              borderRadius: 50,
              transition:
                "left 0.35s cubic-bezier(.4,0,.2,1), width 0.35s cubic-bezier(.4,0,.2,1)",
              boxShadow: "0 4px 18px rgba(124,92,252,0.5)",
              zIndex: 0,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)",
                backgroundSize: "300px 100%",
                animation: "shimmer 2.5s ease-in-out infinite",
              }}
            />
          </div>

          {tabs.map((tab, i) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                onClick={() => handleTabChange(tab)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "9px 20px",
                  borderRadius: 50,
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "white" : "rgba(255,255,255,0.42)",
                  transition: "color 0.25s",
                  whiteSpace: "nowrap",
                  animation: titleVisible
                    ? `fadeUp 0.5s ${0.15 + i * 0.05}s ease both`
                    : "none",
                  opacity: titleVisible ? 1 : 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.75)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.42)";
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Features Grid */}
      <div
        key={gridKey}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          maxWidth: 1060,
          width: "100%",
          animation: "gridFadeIn 0.4s ease both",
        }}
      >
        {filtered.map((feature, i) => (
          <FeatureCard key={feature.id} feature={feature} index={i} />
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 0",
              color: "rgba(255,255,255,0.25)",
              fontSize: 14,
            }}
          >
            No features in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
