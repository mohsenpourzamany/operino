import { useState, useEffect } from "react";

interface Integration {
  name: string;
  bg: string;
  icon: React.ReactNode;
}

const integrations: Integration[] = [
  {
    name: "WhatsApp",
    bg: "#25d366",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87 1.01 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.65 0 5.14 1.03 7.01 2.9A9.89 9.89 0 0122 12c0 5.52-4.48 10-10 10zm5.5-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.1-.27-.17-.57-.32z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    bg: "linear-gradient(135deg,#f9174b,#f07133,#c12ef5)",
    icon: (
      <svg
        width="28"
        height="28"
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
  },
  {
    name: "Telegram",
    bg: "#229ED9",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    name: "Slack",
    bg: "#1a1a2e",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zM17.688 8.834a2.527 2.527 0 01-2.521 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.167 0a2.528 2.528 0 012.521 2.522v6.312zM15.167 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.167 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zM15.167 17.688a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.521h6.312A2.528 2.528 0 0124 15.167a2.528 2.528 0 01-2.521 2.521h-6.312z"
          fill="#E01E5A"
        />
        <path d="M5.042 15.165" fill="#36C5F0" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    bg: "#FF4A00",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.001 4.8c.66 0 1.199.539 1.199 1.2v5.4l4.243-4.243a1.2 1.2 0 111.697 1.697L14.897 13.2H20.4a1.2 1.2 0 010 2.4h-6.3l3.744 3.744a1.2 1.2 0 11-1.697 1.697L12 16.897l-4.147 4.144a1.2 1.2 0 11-1.697-1.697L9.9 15.6H3.6a1.2 1.2 0 010-2.4h5.503L4.86 8.857a1.2 1.2 0 111.697-1.697L10.8 11.4V6a1.2 1.2 0 011.201-1.2z" />
      </svg>
    ),
  },
  {
    name: "Google Sheets",
    bg: "#0f9d58",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
        <polyline
          points="14 2 14 8 20 8"
          fill="none"
          stroke="rgba(0,100,50,0.5)"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="13"
          x2="16"
          y2="13"
          stroke="rgba(0,100,50,0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="8"
          y1="17"
          x2="16"
          y2="17"
          stroke="rgba(0,100,50,0.6)"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="9"
          x2="8"
          y2="9"
          stroke="rgba(0,100,50,0.6)"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    bg: "#FF7A59",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M22.162 5.656a8.384 8.384 0 00-3.202-3.176 8.38 8.38 0 00-4.397-.84A8.384 8.384 0 0010.1 3.35 8.378 8.378 0 007.49 6.886a8.374 8.374 0 00-.546 4.46c.307 1.57 1.026 3.031 2.08 4.228a8.384 8.384 0 003.928 2.535v2.07a1.874 1.874 0 00-.55 1.326c0 1.036.84 1.875 1.875 1.875s1.875-.84 1.875-1.875a1.874 1.874 0 00-.55-1.325v-2.07a8.384 8.384 0 003.929-2.535 8.37 8.37 0 002.08-4.228 8.374 8.374 0 00-.549-4.46zm-6.52 8.49a4.19 4.19 0 01-2.365.724 4.19 4.19 0 01-2.364-.724 4.187 4.187 0 01-1.554-1.934 4.19 4.19 0 01-.18-2.467 4.189 4.189 0 011.054-1.978 4.187 4.187 0 011.9-1.167 4.19 4.19 0 012.47.072 4.188 4.188 0 012.69 2.69 4.19 4.19 0 01.072 2.47 4.187 4.187 0 01-1.723 2.314z" />
      </svg>
    ),
  },
  {
    name: "Webhooks",
    bg: "linear-gradient(135deg,#6d28d9,#4c1d95)",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

function IntegrationCard({
  item,
  index,
}: {
  item: Integration;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100 + index * 70);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        transform: visible
          ? hovered
            ? "translateY(-8px) scale(1.05)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.9)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.45s ease",
      }}
    >
      {/* Icon box */}
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          background:
            typeof item.bg === "string" && item.bg.startsWith("linear")
              ? item.bg
              : item.bg,
          backgroundColor:
            typeof item.bg === "string" && !item.bg.startsWith("linear")
              ? item.bg
              : undefined,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? `0 12px 32px rgba(0,0,0,0.5), 0 0 20px rgba(124,92,252,0.25)`
            : "0 6px 20px rgba(0,0,0,0.4)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.2)"
            : "1px solid rgba(255,255,255,0.08)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          position: "relative",
          overflow: "hidden",
          marginLeft: 10,
        }}
      >
        {/* shimmer on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%)",
              pointerEvents: "none",
            }}
          />
        )}
        {item.icon}
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
          transition: "color 0.25s ease",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

function MoreCard({ index }: { index: number }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100 + index * 70);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        transform: visible
          ? hovered
            ? "translateY(-8px) scale(1.05)"
            : "translateY(0) scale(1)"
          : "translateY(24px) scale(0.9)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.45s ease",
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          background: hovered
            ? "linear-gradient(135deg,rgba(124,92,252,0.25),rgba(99,60,200,0.15))"
            : "rgba(255,255,255,0.05)",
          border: hovered
            ? "1px solid rgba(124,92,252,0.5)"
            : "1px dashed rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered ? "0 12px 32px rgba(124,92,252,0.2)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: hovered ? "#a78bfa" : "rgba(255,255,255,0.6)",
            lineHeight: 1,
            transition: "color 0.25s",
          }}
        >
          + 100+
        </span>
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
          transition: "color 0.25s ease",
        }}
      >
        More
      </span>
    </div>
  );
}

export default function IntegrationsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "0 40px 30px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbitPulse { 0%,100%{opacity:0.04} 50%{opacity:0.09} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Ambient ring decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(124,92,252,0.07)",
          animation: "orbitPulse 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 820,
          height: 820,
          borderRadius: "50%",
          border: "1px solid rgba(124,92,252,0.04)",
          animation: "orbitPulse 7s ease-in-out infinite 1s",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <p
        style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 600,
          background: "linear-gradient(90deg,#7c5cfc,#a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.01em",
          animation: visible ? "fadeUp 0.6s ease both" : "none",
          opacity: visible ? 1 : 0,
          textAlign: "center",
        }}
      >
        Seamlessly integrate with the tools you already use
      </p>

      {/* Icons row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
          maxWidth: 860,
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {integrations.map((item, i) => (
          <IntegrationCard key={item.name} item={item} index={i} />
        ))}
        <MoreCard index={integrations.length} />
      </div>
    </div>
  );
}
