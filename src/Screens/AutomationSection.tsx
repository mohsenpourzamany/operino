import { useState, useEffect, useRef } from "react";

function WaveViz({ active }: { active: boolean }) {
  const W = 180,
    H = 32,
    pts = 50;
  const path = Array.from({ length: pts }, (_, i) => {
    const x = (i / (pts - 1)) * W;
    const amp = active ? 9 : 3;
    const y = H / 2 + Math.sin(i * 0.6) * amp * Math.sin(i * 0.25 + 1);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: "visible", flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="wg2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="url(#wg2)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DotArrow({
  color = "#7c5cfc",
  len = 72,
  id,
}: {
  color?: string;
  len?: number;
  id: string;
}) {
  return (
    <svg
      width={len + 16}
      height={18}
      viewBox={`0 0 ${len + 16} 18`}
      style={{ flexShrink: 0 }}
    >
      <defs>
        <marker
          id={`m-${id}`}
          markerWidth="7"
          markerHeight="7"
          refX="5"
          refY="3.5"
          orient="auto"
        >
          <path
            d="M0 1 L5 3.5 L0 6"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </marker>
      </defs>
      <path
        id={`p-${id}`}
        d={`M4 9 L${len + 4} 9`}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeDasharray="5 4"
        markerEnd={`url(#m-${id})`}
        opacity="0.65"
      />
      <circle
        r="3.5"
        fill={color}
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      >
        <animateMotion dur="1.6s" repeatCount="indefinite">
          <mpath href={`#p-${id}`} />
        </animateMotion>
      </circle>
    </svg>
  );
}

function ActionCard({
  label,
  desc,
  color,
  iconBg,
  icon,
  delay,
  visible,
}: {
  label: string;
  desc: string;
  color: string;
  iconBg: string;
  icon: React.ReactNode;
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
          ? "linear-gradient(145deg,#1c1648,#141035)"
          : "linear-gradient(145deg,#13112b,#0f0d24)",
        border: h ? `1px solid ${color}55` : `1px solid ${color}25`,
        borderRadius: 14,
        padding: "clamp(12px,1.8vw,16px) clamp(14px,2vw,18px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(22px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s cubic-bezier(.34,1.2,.64,1) ${delay}s, border-color 0.25s, background 0.25s, box-shadow 0.25s`,
        boxShadow: h
          ? `0 10px 28px ${color}25, 0 2px 8px rgba(0,0,0,0.4)`
          : "0 2px 12px rgba(0,0,0,0.35)",
        cursor: "default",
      }}
    >
      <p
        style={{
          margin: "0 0 10px",
          fontSize: 9,
          fontWeight: 800,
          color,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        ACTION
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: iconBg,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: h ? `0 0 16px ${color}55` : `0 0 8px ${color}30`,
            transition: "box-shadow 0.3s, transform 0.3s",
            transform: h ? "scale(1.08)" : "scale(1)",
          }}
        >
          {icon}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(12px,1.4vw,14px)",
            fontWeight: 700,
            color: "white",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          margin: "0 0 10px",
          fontSize: "clamp(10px,1.1vw,11.5px)",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px #22c55e",
          }}
        />
        <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 500 }}>
          Executed
        </span>
      </div>
    </div>
  );
}

export default function AutomationSection() {
  const [visible, setVisible] = useState(false);
  const [simPlaying, setSimPlaying] = useState(false);
  const [simDone, setSimDone] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
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

  const runSim = () => {
    if (simPlaying) return;
    setSimPlaying(true);
    setSimDone(false);
    setTimeout(() => {
      setSimPlaying(false);
      setSimDone(true);
    }, 3000);
  };

  const bottomFeatures = [
    {
      color: "#7c5cfc",
      label: "No-code builder",
      sub: "Build powerful workflows visually, in minutes",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" strokeWidth="2" />
        </svg>
      ),
    },
    {
      color: "#818cf8",
      label: "Real-time execution",
      sub: "Workflows run instantly and reliably",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
        </svg>
      ),
    },
    {
      color: "#a78bfa",
      label: "Conditional logic",
      sub: "Smart conditions and branching made simple",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v3M6 15v-3M6 12h4a2 2 0 002-2V8" />
          <circle cx="18" cy="6" r="3" />
        </svg>
      ),
    },
    {
      color: "#f59e0b",
      label: "API integrations",
      sub: "Connect with your favorite tools and platforms",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background:
          "linear-gradient(160deg,#070714 0%,#0b0920 60%,#080716 100%)",
        fontFamily: "'Inter',sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes coreGlow  { 0%,100%{box-shadow:0 0 28px rgba(124,92,252,0.5),0 0 52px rgba(124,92,252,0.2)} 50%{box-shadow:0 0 48px rgba(124,92,252,0.85),0 0 80px rgba(124,92,252,0.4)} }
        @keyframes dotBlink  { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes glowP     { 0%,100%{opacity:0.28} 50%{opacity:0.55} }
        @keyframes shimBtn   { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes checkPop  { from{transform:scale(0) rotate(-20deg);opacity:0} to{transform:scale(1) rotate(0);opacity:1} }
        @keyframes spinR     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ringS     { from{stroke-dashoffset:0} to{stroke-dashoffset:-80} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "55%",
          height: "75%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.09) 0%,transparent 65%)",
          animation: "glowP 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding:
            "clamp(52px,7vw,88px) clamp(20px,4vw,52px) clamp(28px,4vw,44px)",
          display: "grid",
          gridTemplateColumns: "minmax(280px,380px) 1fr",
          gap: "clamp(24px,4vw,52px)",
          alignItems: "start",
        }}
      >
        {/* ── LEFT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px,2.2vw,24px)",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(124,92,252,0.1)",
              border: "1px solid rgba(124,92,252,0.3)",
              borderRadius: 20,
              padding: "5px 14px",
              width: "fit-content",
              animation: visible ? "fadeUp 0.5s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#a78bfa">
              <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
            </svg>
            <span
              style={{
                fontSize: "clamp(9px,1vw,11px)",
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
          <div
            style={{
              animation: visible ? "fadeUp 0.6s 0.08s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(38px,5.5vw,64px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ color: "white" }}>Auto</span>
              <span
                style={{
                  background: "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                mation
              </span>
            </h1>
            <p
              style={{
                margin: "clamp(8px,1.5vw,14px) 0 0",
                fontSize: "clamp(16px,2vw,21px)",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 500,
                lineHeight: 1.35,
              }}
            >
              Automate your workflows —<br />
              end to end
            </p>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "clamp(12.5px,1.4vw,14.5px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.78,
              animation: visible ? "fadeUp 0.6s 0.18s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            Design intelligent workflows that trigger, decide, and act
            automatically across your business.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              animation: visible ? "fadeUp 0.6s 0.26s ease both" : "none",
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
                padding: "12px 24px",
                fontSize: "clamp(12.5px,1.4vw,14px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: h1 ? "scale(1.04)" : "scale(1)",
                boxShadow: h1
                  ? "0 10px 28px rgba(124,92,252,0.62)"
                  : "0 5px 18px rgba(124,92,252,0.38)",
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
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)",
                    animation: "shimBtn 0.65s ease",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                Start Automating
              </span>
              <svg
                style={{
                  position: "relative",
                  zIndex: 1,
                  transform: h1 ? "translateX(3px)" : "none",
                  transition: "transform 0.2s",
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
                padding: "12px 24px",
                fontSize: "clamp(12.5px,1.4vw,14px)",
                fontWeight: 600,
                color: h2 ? "white" : "rgba(255,255,255,0.7)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: h2 ? "scale(1.04)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              View Workflows
            </button>
          </div>

          {/* Simulation bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "clamp(12px,1.8vw,16px)",
              animation: visible ? "fadeUp 0.6s 0.34s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: "clamp(12px,1.4vw,14px)",
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Run Simulation
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(10px,1.1vw,11.5px)",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                See your automation in action
              </p>
            </div>
            <button
              onClick={runSim}
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: simPlaying ? "not-allowed" : "pointer",
                flexShrink: 0,
                boxShadow: "0 0 16px rgba(124,92,252,0.5)",
                transition: "all 0.25s",
                opacity: simPlaying ? 0.7 : 1,
              }}
            >
              {simPlaying ? (
                <div
                  style={{
                    width: 15,
                    height: 15,
                    border: "2.5px solid rgba(255,255,255,0.3)",
                    borderTop: "2.5px solid white",
                    borderRadius: "50%",
                    animation: "spinR 0.7s linear infinite",
                  }}
                />
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
            <WaveViz active={simPlaying} />
          </div>
        </div>

        {/* ── RIGHT: Workflow Diagram ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px,2vw,18px)",
            animation: visible ? "fadeRight 0.7s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Row: Trigger + Arrow + AI + Arrow + Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              gap: "clamp(8px,1.5vw,14px)",
            }}
          >
            {/* TRIGGER */}
            <div
              style={{
                background: "linear-gradient(145deg,#131128,#0f0d24)",
                border: "1px solid rgba(124,92,252,0.3)",
                borderRadius: 16,
                padding: "clamp(14px,2vw,20px)",
                width: "clamp(155px,15vw,190px)",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#a78bfa",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                TRIGGER
              </p>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 13,
                  background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  boxShadow: "0 0 18px rgba(124,92,252,0.5)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
                </svg>
              </div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "clamp(13px,1.4vw,15px)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.3,
                }}
              >
                New customer message
              </p>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "clamp(10px,1.1vw,12px)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                Someone sends a message on your website
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 7px #22c55e",
                    animation: "dotBlink 2s ease-in-out infinite",
                  }}
                />
                <span
                  style={{ fontSize: 11, color: "#22c55e", fontWeight: 500 }}
                >
                  Live
                </span>
              </div>
            </div>

            {/* Arrow trigger→AI */}
            <div
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <DotArrow id="t-ai" len={48} />
            </div>

            {/* AI DECISION */}
            <div
              style={{
                background: "linear-gradient(145deg,#1a1040,#120b30)",
                border: "1px solid rgba(124,92,252,0.55)",
                borderRadius: 18,
                padding: "clamp(16px,2.2vw,22px)",
                width: "clamp(170px,17vw,210px)",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 0 32px rgba(124,92,252,0.2)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 140,
                  height: 90,
                  background:
                    "radial-gradient(ellipse,rgba(124,92,252,0.32) 0%,transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 9,
                  fontWeight: 800,
                  color: "#a78bfa",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  position: "relative",
                }}
              >
                AI DECISION
              </p>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4c1d95,#2e1065)",
                  border: "2px solid rgba(167,139,250,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  animation: "coreGlow 2.5s ease-in-out infinite",
                  position: "relative",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: -4,
                    left: -4,
                    animation: "ringS 12s linear infinite",
                    transformOrigin: "44px 44px",
                  }}
                  width="88"
                  height="88"
                  viewBox="0 0 88 88"
                >
                  <circle
                    cx="44"
                    cy="44"
                    r="40"
                    fill="none"
                    stroke="rgba(167,139,250,0.25)"
                    strokeWidth="1.2"
                    strokeDasharray="3 5"
                  />
                </svg>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="7"
                    width="16"
                    height="12"
                    rx="3"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 11h.01M16 11h.01"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 13.5s1.2 1.2 4 1.2 4-1.2 4-1.2"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="7"
                    x2="12"
                    y2="4"
                    stroke="rgba(196,181,253,0.9)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="3" r="1.5" fill="rgba(196,181,253,0.9)" />
                </svg>
              </div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: "clamp(13px,1.4vw,15px)",
                  fontWeight: 700,
                  color: "white",
                  position: "relative",
                }}
              >
                AI decides next action
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(9.5px,1.1vw,11.5px)",
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.6,
                  position: "relative",
                }}
              >
                Analyzing intent, context and data to choose the best action
              </p>
            </div>

            {/* Arrow AI→actions */}
            <div
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
              <DotArrow id="ai-act" len={40} />
            </div>

            {/* ACTION CARDS — stack vertically, flex auto */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(8px,1.2vw,12px)",
                flex: 1,
                minWidth: 0,
              }}
            >
              {[
                {
                  label: "Send Reply",
                  desc: "Send an automated reply to the customer",
                  color: "#3b82f6",
                  iconBg: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
                  delay: 0.35,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <line
                        x1="22"
                        y1="2"
                        x2="11"
                        y2="13"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <polygon
                        points="22 2 15 22 11 13 2 9 22 2"
                        fill="white"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Assign to Agent",
                  desc: "Assign the conversation to the right team member",
                  color: "#818cf8",
                  iconBg: "linear-gradient(135deg,#5b21b6,#4c1d95)",
                  delay: 0.48,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  ),
                },
                {
                  label: "Save to CRM",
                  desc: "Store customer data and conversation in your CRM",
                  color: "#f59e0b",
                  iconBg: "linear-gradient(135deg,#d97706,#92400e)",
                  delay: 0.61,
                  icon: (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                    </svg>
                  ),
                },
              ].map((a) => (
                <ActionCard key={a.label} {...a} visible={visible} />
              ))}
            </div>
          </div>

          {/* Workflow completed */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingLeft: "clamp(155px,15vw,190px)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.9s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: 12,
                padding: "9px 16px",
                animation: simDone
                  ? "checkPop 0.5s cubic-bezier(.34,1.56,.64,1) both"
                  : "none",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: "clamp(11px,1.3vw,13px)",
                  color: "rgba(255,255,255,0.72)",
                  fontWeight: 500,
                }}
              >
                Workflow completed in{" "}
                <span style={{ color: "#fbbf24", fontWeight: 700 }}>1.42s</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM FEATURES ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "clamp(22px,3.5vw,36px) clamp(20px,4vw,52px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "clamp(10px,1.8vw,18px)",
          }}
        >
          {bottomFeatures.map((f, i) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                padding: "clamp(14px,1.8vw,18px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${0.42 + i * 0.08}s, transform 0.5s cubic-bezier(.34,1.2,.64,1) ${0.42 + i * 0.08}s, background 0.2s, border-color 0.2s, transform 0.2s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = `rgba(124,92,252,0.08)`;
                el.style.borderColor = `${f.color}35`;
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: f.color,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 4px",
                    fontSize: "clamp(12px,1.4vw,14px)",
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {f.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(10px,1.1vw,12px)",
                    color: "rgba(255,255,255,0.38)",
                    lineHeight: 1.55,
                  }}
                >
                  {f.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
