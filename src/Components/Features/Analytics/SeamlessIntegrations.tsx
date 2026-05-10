import { useState, useEffect, useRef } from "react";

const tools = [
  {
    name: "Google Sheets",
    color: "#0F9D58",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#0F9D58" />
        <rect x="5" y="6" width="14" height="12" rx="1" fill="white" />
        <line
          x1="5"
          y1="9.5"
          x2="19"
          y2="9.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="5"
          y1="12.5"
          x2="19"
          y2="12.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="5"
          y1="15.5"
          x2="19"
          y2="15.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="10"
          y1="6"
          x2="10"
          y2="18"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
      </svg>
    ),
  },
  {
    name: "Looker Studio",
    color: "#4285F4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#4285F4" />
        <circle cx="9" cy="12" r="4" fill="white" opacity="0.9" />
        <circle cx="15" cy="12" r="4" fill="#EA4335" opacity="0.85" />
        <circle cx="12" cy="12" r="2.5" fill="#FBBC04" />
      </svg>
    ),
  },
  {
    name: "Slack",
    color: "#E01E5A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z"
          fill="#E01E5A"
        />
        <path
          d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z"
          fill="#36C5F0"
        />
        <path
          d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.527 2.527 0 01-2.521 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.167 0a2.528 2.528 0 012.521 2.522v6.312z"
          fill="#2EB67D"
        />
        <path
          d="M15.167 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.167 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.521h6.312A2.528 2.528 0 0124 15.167a2.528 2.528 0 01-2.521 2.521h-6.312z"
          fill="#ECB22E"
        />
      </svg>
    ),
  },
  {
    name: "Zapier",
    color: "#FF4A00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF4A00" />
        <path
          d="M12 4l2.4 5.5L20 11l-4.5 4.5 1 6.5L12 19l-4.5 3-1-6.5L2 11l5.6-1.5z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF7A59" />
        <path
          d="M9 7v4.26A2.5 2.5 0 1014.5 14a2.5 2.5 0 00-2-2.45V7H9z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Airtable",
    color: "#2D7FF9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#2D7FF9" />
        <path d="M3 9l9-5 9 5v2l-9 5-9-5V9z" fill="white" opacity="0.9" />
        <rect x="14" y="12" width="7" height="8" rx="1" fill="#FCB400" />
        <rect
          x="3"
          y="12"
          width="7"
          height="8"
          rx="1"
          fill="white"
          opacity="0.7"
        />
      </svg>
    ),
  },
  {
    name: "BigQuery",
    color: "#4285F4",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#4285F4" />
        <circle
          cx="11"
          cy="11"
          r="5"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1="15"
          y1="15"
          x2="20"
          y2="20"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function ToolChip({
  tool,
  index,
  visible,
}: {
  tool: (typeof tools)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 16px",
        borderRadius: 10,
        background: hovered
          ? `linear-gradient(135deg,${tool.color}18,${tool.color}08)`
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? `1px solid ${tool.color}55`
          : "1px solid rgba(255,255,255,0.1)",
        cursor: "default",
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition:
          "background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s",
        transform: visible
          ? hovered
            ? "translateY(-4px) scale(1.04)"
            : "translateY(0) scale(1)"
          : "translateY(14px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.07}s` : "0s",
        boxShadow: hovered ? `0 8px 22px ${tool.color}30` : "none",
      }}
    >
      {/* icon */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          overflow: "hidden",
          flexShrink: 0,
          transform: hovered
            ? "scale(1.1) rotate(-5deg)"
            : "scale(1) rotate(0deg)",
          transition: "transform 0.25s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tool.icon}
      </div>

      {/* name */}
      <span
        style={{
          fontSize: "clamp(12px,1.3vw,13.5px)",
          fontWeight: 600,
          color: hovered ? "white" : "rgba(255,255,255,0.72)",
          transition: "color 0.22s",
        }}
      >
        {tool.name}
      </span>

      {/* hover underline */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          right: "10%",
          height: 2,
          borderRadius: 2,
          background: `linear-gradient(90deg,transparent,${tool.color},transparent)`,
          opacity: hovered ? 0.7 : 0,
          transition: "opacity 0.25s",
        }}
      />
    </div>
  );
}

function MoreChip({ visible }: { visible: boolean }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "9px 16px",
        borderRadius: 10,
        background: h ? "rgba(124,92,252,0.12)" : "rgba(255,255,255,0.04)",
        border: h
          ? "1px solid rgba(124,92,252,0.45)"
          : "1px dashed rgba(255,255,255,0.18)",
        cursor: "default",
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "all 0.25s",
        transform: visible
          ? h
            ? "translateY(-4px) scale(1.04)"
            : "translateY(0)"
          : "translateY(14px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${tools.length * 0.07}s` : "0s",
        boxShadow: h ? "0 8px 22px rgba(124,92,252,0.2)" : "none",
      }}
    >
      <span
        style={{
          fontSize: "clamp(12px,1.3vw,13.5px)",
          fontWeight: 700,
          color: h ? "#c4b5fd" : "rgba(255,255,255,0.55)",
          transition: "color 0.22s",
        }}
      >
        + 100+ more
      </span>
    </div>
  );
}

export default function SeamlessIntegrations() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(28px,4vw,48px) clamp(16px,4vw,40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(16px,2.5vw,24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP   { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60%",
          height: "200%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowP 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(16px,2.2vw,22px)",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.2px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        Seamlessly integrate with your favorite tools
      </h2>

      {/* Chips row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px,1.2vw,12px)",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tools.map((tool, i) => (
          <div key={tool.name} style={{ position: "relative" }}>
            <ToolChip tool={tool} index={i} visible={visible} />
          </div>
        ))}
        <MoreChip visible={visible} />
      </div>
    </div>
  );
}
