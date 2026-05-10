import { useState, useEffect, useRef } from "react";

const tools = [
  {
    name: "Epic",
    color: "#E8003D",
    textStyle: true, // render as styled text
    label: "Epic",
    labelStyle: {
      fontFamily: "Georgia, serif",
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: 20,
      color: "#E8003D",
    },
  },
  {
    name: "athenahealth",
    color: "#4CAF50",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6 2 2 7 2 12s4 10 10 10c1.5 0 2.9-.3 4.2-.9"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 12c0-2.8-1.2-5.3-3-7"
          stroke="#4CAF50"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 12l3 3 5-5"
          stroke="#4CAF50"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Cerner",
    color: "#009CDE",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#009CDE" strokeWidth="2" />
        <path
          d="M8 12a4 4 0 014-4"
          stroke="#009CDE"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 16a4 4 0 004-4"
          stroke="#009CDE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Salesforce",
    color: "#00A1E0",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="12" fill="#00A1E0" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
          fontFamily="Arial"
        >
          SF
        </text>
      </svg>
    ),
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#FF7A59" />
        <path
          d="M9 7v4.26A2.5 2.5 0 1014.5 14a2.5 2.5 0 00-2-2.45V7H9z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Twilio",
    color: "#F22F46",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#F22F46" />
        <circle cx="9" cy="9" r="2" fill="white" />
        <circle cx="15" cy="9" r="2" fill="white" />
        <circle cx="9" cy="15" r="2" fill="white" />
        <circle cx="15" cy="15" r="2" fill="white" />
      </svg>
    ),
  },
  {
    name: "Mailchimp",
    color: "#FFE01B",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#FFE01B" />
        <path
          d="M12 6c-2 0-4 1.5-4 4 0 1 .4 2 1 2.7-.2.4-.2.8 0 1.2.3.6.9.8 1.5.8h3c.6 0 1.2-.2 1.5-.8.2-.4.2-.8 0-1.2.6-.7 1-1.7 1-2.7 0-2.5-2-4-4-4z"
          fill="#241C15"
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
  const [scanPos, setScanPos] = useState(0);
  const [scanning, setScanning] = useState(false);
  const scanTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  const handleEnter = () => {
    setHovered(true);
    setScanning(true);
    setScanPos(0);
    let pos = 0;
    scanTimer.current = setInterval(() => {
      pos += 6;
      setScanPos(pos);
      if (pos > 110) {
        clearInterval(scanTimer.current);
        setScanning(false);
        setScanPos(0);
      }
    }, 16);
  };

  const handleLeave = () => {
    setHovered(false);
    setScanning(false);
    clearInterval(scanTimer.current);
    setScanPos(0);
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "9px 15px",
        borderRadius: 10,
        background: hovered ? `${tool.color}12` : "rgba(255,255,255,0.05)",
        border: hovered
          ? `1px solid ${tool.color}50`
          : "1px solid rgba(255,255,255,0.1)",
        cursor: "default",
        flexShrink: 0,
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
        transition:
          "background 0.22s, border-color 0.22s, transform 0.25s, box-shadow 0.25s",
        transform: visible
          ? hovered
            ? "translateY(-5px) scale(1.05)"
            : "translateY(0) scale(1)"
          : "translateY(16px) scale(0.93)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.07}s` : "0s",
        boxShadow: hovered
          ? `0 10px 26px ${tool.color}28, 0 0 0 1px ${tool.color}20`
          : "none",
      }}
    >
      {/* scan line */}
      {scanning && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `${scanPos}%`,
            width: "18%",
            height: "100%",
            background: `linear-gradient(90deg,transparent,${tool.color}30,transparent)`,
            pointerEvents: "none",
            transition: "left 0.016s linear",
          }}
        />
      )}

      {/* vertical accent on left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 2,
          borderRadius: 2,
          background: `linear-gradient(180deg,transparent,${tool.color},transparent)`,
          opacity: hovered ? 0.8 : 0,
          transition: "opacity 0.22s",
        }}
      />

      {/* icon or text */}
      {tool.textStyle ? (
        <span
          style={{
            ...tool.labelStyle,
            transition: "all 0.2s",
            filter: hovered ? `drop-shadow(0 0 6px ${tool.color}80)` : "none",
          }}
        >
          {tool.label}
        </span>
      ) : (
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.25s",
            transform: hovered
              ? "scale(1.15) rotate(-5deg)"
              : "scale(1) rotate(0deg)",
          }}
        >
          {tool.icon}
        </div>
      )}

      {/* name (skip for Epic since it's text-only) */}
      {!tool.textStyle && (
        <span
          style={{
            fontSize: "clamp(12px,1.3vw,13.5px)",
            fontWeight: 600,
            color: hovered ? "white" : "rgba(255,255,255,0.72)",
            transition: "color 0.2s",
          }}
        >
          {tool.name}
        </span>
      )}
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
        padding: "9px 15px",
        borderRadius: 10,
        flexShrink: 0,
        background: h ? "rgba(124,92,252,0.12)" : "rgba(255,255,255,0.04)",
        border: h
          ? "1px solid rgba(124,92,252,0.45)"
          : "1px dashed rgba(255,255,255,0.2)",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: visible
          ? h
            ? "translateY(-5px) scale(1.05)"
            : "translateY(0)"
          : "translateY(16px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${tools.length * 0.07}s` : "0s",
        boxShadow: h ? "0 10px 24px rgba(124,92,252,0.22)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          fontSize: "clamp(12px,1.3vw,13.5px)",
          fontWeight: 700,
          background: h ? "linear-gradient(90deg,#a78bfa,#7c5cfc)" : "none",
          WebkitBackgroundClip: h ? "text" : "unset",
          WebkitTextFillColor: h ? "transparent" : "rgba(255,255,255,0.5)",
          transition: "all 0.22s",
        }}
      >
        + 50+ more
      </span>
    </div>
  );
}

export default function HealthcareIntegrations() {
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
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(24px,4vw,44px) clamp(16px,4vw,40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(14px,2.2vw,20px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes glowP { 0%,100%{opacity:0.2} 50%{opacity:0.42} }
        @keyframes fadeUp{ from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

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

      <h2
        style={{
          margin: 0,
          fontSize: "clamp(15px,2vw,20px)",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.15px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        Seamlessly integrates with your favorite tools
      </h2>

      <div
        style={{
          display: "flex",
          gap: "clamp(7px,1.1vw,10px)",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tools.map((t, i) => (
          <ToolChip key={t.name} tool={t} index={i} visible={visible} />
        ))}
        <MoreChip visible={visible} />
      </div>
    </div>
  );
}
