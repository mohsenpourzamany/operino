import { useState, useEffect, useRef } from "react";
import opihead from "../assets/Photos/Opi-Head-1.png";

// ─── Channel data with positions (% of container) ────────────────────────────
const channels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    status: "Connected",
    statusColor: "#22c55e",
    angle: 75, // degrees from center
    iconBg: "#25d366",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87 1.01 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.65 0 5.14 1.03 7.01 2.9A9.89 9.89 0 0122 12c0 5.52-4.48 10-10 10z" />
      </svg>
    ),
  },
  {
    id: "email",
    label: "Email",
    status: "Connected",
    statusColor: "#3b82f6",
    angle: 185,
    iconBg: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    id: "webchat",
    label: "Website Chat",
    status: "Connected",
    statusColor: "#a78bfa",
    angle: 355,
    iconBg: "linear-gradient(135deg,#7c5cfc,#5535e8)",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="white" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="white" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="white" stroke="none" />
      </svg>
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    status: "Connected",
    statusColor: "#f9174b",
    angle: 240,
    iconBg: "linear-gradient(135deg,#f9174b,#f07133,#c12ef5)",
    icon: (
      <svg
        width="26"
        height="26"
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
    id: "api",
    label: "API / Webhook",
    status: "Connected",
    statusColor: "#818cf8",
    angle: 10,
    iconBg: "linear-gradient(135deg,#4f46e5,#3730a3)",
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "more",
    label: "More Channels",
    status: "Connected",
    statusColor: "#a78bfa",
    angle: 290,
    iconBg: "linear-gradient(135deg,#1e1b4b,#312e81)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="12" r="2" fill="rgba(167,139,250,0.8)" />
        <circle cx="12" cy="12" r="2" fill="rgba(167,139,250,0.8)" />
        <circle cx="18" cy="12" r="2" fill="rgba(167,139,250,0.8)" />
      </svg>
    ),
  },
];

const features = [
  {
    label: "Unified Inbox",
    sub: "All conversations in one place",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Real-time Sync",
    sub: "Instant updates across channels",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
      </svg>
    ),
  },
  {
    label: "Smart Routing",
    sub: "AI routes to the best agent",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M16 3h5v5" />
        <path d="M8 3H3v5" />
        <path d="M21 3l-7 7-4-4-7 7" />
      </svg>
    ),
  },
  {
    label: "API Ready",
    sub: "Build custom integrations",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

// ─── Animated dot on line ─────────────────────────────────────────────────────
function TravelingDot({
  x1,
  y1,
  x2,
  y2,
  delay,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
  color: string;
}) {
  return (
    <circle
      r="4"
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    >
      <animateMotion
        dur="2.4s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="linear"
      >
        <mpath>
          <path d={`M${x1} ${y1} L${x2} ${y2}`} />
        </mpath>
      </animateMotion>
    </circle>
  );
}

// ─── Network diagram ──────────────────────────────────────────────────────────
function NetworkDiagram({ visible }: { visible: boolean }) {
  const SIZE = 480;
  const CX = SIZE / 2,
    CY = SIZE / 2;
  const RADIUS = 172;
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!visible) return;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTime((ts - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  // Rotating outer ring dots
  const ringDots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * 2 * Math.PI + time * 0.4;
    return {
      x: CX + Math.cos(a) * (RADIUS + 28),
      y: CY + Math.sin(a) * (RADIUS + 28),
    };
  });

  return (
    <div
      style={{
        position: "relative",
        width: SIZE,
        height: SIZE,
        flexShrink: 0,
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: "absolute", inset: 0, overflow: "visible" }}
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#7c5cfc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer rings */}
        {[RADIUS + 30, RADIUS + 55].map((r, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="rgba(124,92,252,0.1)"
            strokeWidth="1"
            strokeDasharray={i === 0 ? "none" : "4 6"}
          />
        ))}

        {/* Core glow */}
        <circle cx={CX} cy={CY} r={72} fill="url(#coreGlow)" opacity="0.7" />
        <circle
          cx={CX}
          cy={CY}
          r={68}
          fill="none"
          stroke="#9333ea"
          strokeWidth="2"
          filter="url(#glow)"
          opacity="0.9"
        />
        <circle cx={CX} cy={CY} r={60} fill="rgba(60,20,120,0.6)" />
        <circle
          cx={CX}
          cy={CY}
          r={68}
          fill="none"
          stroke="rgba(180,130,255,0.3)"
          strokeWidth="1"
          strokeDasharray="3 4"
          style={{
            animation: "rotateDash 12s linear infinite",
            transformOrigin: `${CX}px ${CY}px`,
          }}
        />

        {/* Rotating ring dots */}
        {ringDots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={i % 3 === 0 ? 3.5 : 2}
            fill={i % 3 === 0 ? "#a78bfa" : "#7c5cfc"}
            opacity={0.7 + Math.sin(time * 2 + i) * 0.3}
            filter="url(#glow)"
          />
        ))}

        {/* Lines from center to channels */}
        {channels.map((ch, i) => {
          const rad = (ch.angle * Math.PI) / 180;
          const ex = CX + Math.cos(rad) * RADIUS;
          const ey = CY + Math.sin(rad) * RADIUS;
          const isActive = activeChannel === ch.id;
          return (
            <g key={ch.id}>
              <line
                x1={CX}
                y1={CY}
                x2={ex}
                y2={ey}
                stroke={isActive ? "#a78bfa" : "rgba(124,92,252,0.25)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="5 4"
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
              {/* Traveling dots on each line */}
              <TravelingDot
                x1={CX}
                y1={CY}
                x2={ex}
                y2={ey}
                delay={i * 0.4}
                color="#a78bfa"
              />
              {/* Node dot at midpoint */}
              <circle
                cx={CX + Math.cos(rad) * RADIUS * 0.5}
                cy={CY + Math.sin(rad) * RADIUS * 0.5}
                r="4"
                fill="#7c5cfc"
                opacity="0.8"
                style={{ filter: "drop-shadow(0 0 4px #7c5cfc)" }}
              />
            </g>
          );
        })}
      </svg>

      {/* AI Core center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4c1d95,#2e1065)",
            border: "2px solid rgba(167,139,250,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow:
              "0 0 32px rgba(124,92,252,0.6), 0 0 60px rgba(124,92,252,0.3)",
            animation: "coreGlowPulse 2.5s ease-in-out infinite",
            margin: "0 auto",
          }}
        >
          <img src={opihead} alt="opihead" />
          {/* <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="8"
              width="14"
              height="10"
              rx="3"
              stroke="rgba(196,181,253,0.9)"
              strokeWidth="1.5"
            />
            <path
              d="M9 12h.01M15 12h.01"
              stroke="rgba(196,181,253,0.9)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M9 14.5s1 1 3 1 3-1 3-1"
              stroke="rgba(196,181,253,0.9)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="5"
              stroke="rgba(196,181,253,0.9)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="4.2" r="1.4" fill="rgba(196,181,253,0.9)" />
          </svg> */}
        </div>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: 13,
            fontWeight: 700,
            color: "white",
          }}
        >
          AI Core
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 10.5,
            color: "rgba(167,139,250,0.6)",
          }}
        >
          Operino Engine
        </p>
      </div>

      {/* Channel cards around the circle */}
      {channels.map((ch) => {
        const rad = (ch.angle * Math.PI) / 180;
        const cardR = RADIUS + 80;
        const cx = CX + Math.cos(rad) * cardR;
        const cy = CY + Math.sin(rad) * cardR;
        const isActive = activeChannel === ch.id;

        return (
          <div
            key={ch.id}
            onMouseEnter={() => setActiveChannel(ch.id)}
            onMouseLeave={() => setActiveChannel(null)}
            style={{
              position: "absolute",
              left: cx - 52,
              top: cy - 44,
              width: 104,
              background: isActive
                ? "linear-gradient(145deg,#1c1648,#141035)"
                : "linear-gradient(145deg,#13112b,#0f0d24)",
              border: isActive
                ? "1px solid rgba(124,92,252,0.55)"
                : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              cursor: "default",
              zIndex: 5,
              transition: "all 0.25s ease",
              boxShadow: isActive
                ? "0 8px 28px rgba(124,92,252,0.3)"
                : "0 4px 16px rgba(0,0,0,0.4)",
              transform: isActive
                ? visible
                  ? "scale(1.06)"
                  : "scale(0.9)"
                : visible
                  ? "scale(1)"
                  : "scale(0.8)",
              opacity: visible ? 1 : 0,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: ch.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isActive
                  ? `0 0 16px ${ch.statusColor}60`
                  : "0 4px 12px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.3s",
                flexShrink: 0,
              }}
            >
              {ch.icon}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 11.5,
                fontWeight: 600,
                color: "white",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {ch.label}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: ch.statusColor,
                  boxShadow: `0 0 6px ${ch.statusColor}`,
                }}
              />
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.45)" }}>
                {ch.status}
              </span>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes rotateDash { from{stroke-dashoffset:0} to{stroke-dashoffset:-100} }
        @keyframes coreGlowPulse { 0%,100%{box-shadow:0 0 32px rgba(124,92,252,0.5),0 0 60px rgba(124,92,252,0.25)} 50%{box-shadow:0 0 48px rgba(124,92,252,0.8),0 0 80px rgba(124,92,252,0.4)} }
      `}</style>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MultiChannelSection() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "linear-gradient(160deg,#07071a,#0c0a22 50%,#080816)",
        padding: "clamp(56px,8vw,96px) clamp(16px,5vw,48px)",
        fontFamily: "'Inter',sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes glowPulse{ 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        @keyframes shimmerBtn{ 0%{transform:translateX(-100%) skewX(-12deg)} 100%{transform:translateX(300%) skewX(-12deg)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "20%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.1) 0%,transparent 65%)",
          animation: "glowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px,5vw,60px)",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px,2.5vw,28px)",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(124,92,252,0.1)",
              border: "1px solid rgba(124,92,252,0.28)",
              borderRadius: 20,
              padding: "5px 14px",
              width: "fit-content",
              animation: visible ? "fadeUp 0.55s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#a78bfa",
                boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "clamp(9px,1.2vw,11px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Features
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(32px,5.5vw,58px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              animation: visible ? "fadeUp 0.6s 0.1s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <span style={{ color: "white" }}>Multi-</span>
            <span
              style={{
                background: "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Channel
            </span>
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(15px,2.2vw,20px)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.45,
              fontWeight: 500,
              animation: visible ? "fadeUp 0.6s 0.18s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            Connect with your users everywhere
            <br />— from one place
          </p>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(12px,1.5vw,14.5px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              maxWidth: 440,
              animation: visible ? "fadeUp 0.6s 0.26s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            Manage conversations across all your favorite channels from a
            single, unified platform. Powered by AI agents that deliver
            consistent, real-time experiences.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: "clamp(10px,1.8vw,14px)",
              flexWrap: "wrap",
              animation: visible ? "fadeUp 0.6s 0.34s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <button
              onMouseEnter={() => setH1(true)}
              onMouseLeave={() => setH1(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: h1
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(18px,2.5vw,26px)",
                fontSize: "clamp(12px,1.5vw,14px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: h1 ? "scale(1.05)" : "scale(1)",
                boxShadow: h1
                  ? "0 10px 30px rgba(124,92,252,0.65)"
                  : "0 6px 20px rgba(124,92,252,0.4)",
                whiteSpace: "nowrap",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {h1 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                    animation: "shimmerBtn 0.7s ease",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                Start Building
              </span>
              <svg
                style={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform 0.2s",
                  transform: h1 ? "translateX(3px)" : "none",
                }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <button
              onMouseEnter={() => setH2(true)}
              onMouseLeave={() => setH2(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: h2 ? "rgba(255,255,255,0.07)" : "transparent",
                border: `1px solid ${h2 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(18px,2.5vw,26px)",
                fontSize: "clamp(12px,1.5vw,14px)",
                fontWeight: 600,
                color: h2 ? "white" : "rgba(255,255,255,0.7)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: h2 ? "scale(1.05)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              See Integrations
            </button>
          </div>

          {/* Feature pills */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(8px,1.5vw,12px)",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "clamp(14px,2vw,20px)",
              animation: visible ? "fadeUp 0.6s 0.44s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {features.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "clamp(8px,1.2vw,12px)",
                  borderRadius: 10,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(124,92,252,0.08)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "transparent")
                }
              >
                <div style={{ color: "#a78bfa" }}>{f.icon}</div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(11px,1.3vw,13px)",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {f.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(9.5px,1.1vw,11px)",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.4,
                  }}
                >
                  {f.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Network */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: visible ? "fadeLeft 0.7s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <NetworkDiagram visible={visible} />
        </div>
      </div>

      {/* Mobile stack */}
      <style>{`@media(max-width:768px){.mc-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
