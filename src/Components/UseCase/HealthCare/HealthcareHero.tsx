/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import opihealth from "../../../assets/Photos/OpiHeathCare-1.png";
// ── Sparkline for patient satisfaction card ───────────────────────────────────
function MiniSparkline() {
  const data = [72, 76, 74, 80, 78, 84, 82, 88, 87, 91, 90, 95];
  const W = 110,
    H = 36;
  const mn = Math.min(...data),
    mx = Math.max(...data);
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - mn) / (mx - mn)) * (H - 4) - 2,
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
        <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#hcGrad)" />
      <path
        d={line}
        fill="none"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[pts.length - 1].x}
        cy={pts[pts.length - 1].y}
        r="3"
        fill="#22c55e"
        style={{ filter: "drop-shadow(0 0 4px #22c55e)" }}
      />
    </svg>
  );
}

const floatingIcons = [
  {
    top: "6%",
    left: "38%",
    dur: 3.4,
    delay: 0,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
        <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    top: "6%",
    right: "3%",
    dur: 3.8,
    delay: 0.7,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle
          cx="9"
          cy="11"
          r="1"
          fill="rgba(167,139,250,0.85)"
          stroke="none"
        />
        <circle
          cx="12"
          cy="11"
          r="1"
          fill="rgba(167,139,250,0.85)"
          stroke="none"
        />
        <circle
          cx="15"
          cy="11"
          r="1"
          fill="rgba(167,139,250,0.85)"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    top: "44%",
    right: "2%",
    dur: 4.0,
    delay: 1.3,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    bottom: "28%",
    left: "34%",
    dur: 3.6,
    delay: 1.8,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" strokeWidth="2" />
      </svg>
    ),
  },
];

const benefits = [
  {
    label: "Improve Patient Care",
    sub: "Deliver timely, personalized support to every patient.",
    color: "#7c5cfc",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Reduce Admin Work",
    sub: "Automate documentation, scheduling, and follow-ups.",
    color: "#818cf8",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="13" y2="15" />
      </svg>
    ),
  },
  {
    label: "Ensure Compliance",
    sub: "Built with security and privacy in mind.",
    color: "#a78bfa",
    icon: (
      <svg
        width="18"
        height="18"
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
];

export default function HealthcareHero() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robBounce, setRobBounce] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; icon: string }[]
  >([]);
  const [cardVisible, setCardVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bounceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setCardVisible(true), 800);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  const handleRobotClick = () => {
    setRobBounce(true);
    clearTimeout(bounceTimer.current);
    bounceTimer.current = setTimeout(() => setRobBounce(false), 800);
    const icons = ["💊", "❤️", "🩺", "✨", "🌟", "💜"];
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 90 - 45,
        y: Math.random() * -80 - 10,
        icon: icons[i % icons.length],
      })),
    );
    setTimeout(() => setParticles([]), 1000);
  };

  const robX = (mousePos.x - 0.5) * 11;
  const robY = (mousePos.y - 0.5) * 6;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(40px,6vw,72px) clamp(20px,4vw,52px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight  { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-12px) rotate(1.5deg)} 70%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes robotBounce{ 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.08) rotate(-4deg) translateY(-18px)} 40%{transform:scale(1.05) rotate(3deg) translateY(-12px)} 65%{transform:scale(1.06) rotate(-2deg) translateY(-8px)} 85%{transform:scale(1.02) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes glowBreath { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0.65;transform:scale(1.07)} }
        @keyframes gradShift  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn    { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes confettiPop{ 0%{transform:translate(0,0) scale(1) rotate(0);opacity:1} 100%{transform:translate(var(--cx),var(--cy)) scale(0.3) rotate(200deg);opacity:0} }
        @keyframes iconFloat0 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes iconFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px) rotate(-4deg)} }
        @keyframes iconFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px) rotate(2deg)} }
        @keyframes iconFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px) rotate(-2deg)} }
        @keyframes starTwinkle{ 0%,100%{opacity:0.12;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.4)} }
        @keyframes tagPop     { from{opacity:0;transform:translateX(-12px) scale(0.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes cardSlideIn{ from{opacity:0;transform:translateX(20px) scale(0.94)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes ringPulse  { 0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.55;transform:translate(-50%,-50%) scale(1.04)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? 2 : 1.5,
            height: i % 3 === 0 ? 2 : 1.5,
            borderRadius: "50%",
            background: "white",
            left: `${(i * 41 + 13) % 100}%`,
            top: `${(i * 57 + 9) % 100}%`,
            animation: `starTwinkle ${2.4 + (i % 4) * 0.5}s ease-in-out ${(i * 0.28) % 3}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "15%",
          width: "clamp(220px,45vw,580px)",
          height: "clamp(220px,45vw,580px)",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.1) 0%,transparent 65%)",
          animation: "glowBreath 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(260px,1fr) clamp(320px,46vw,580px)",
          gap: "clamp(20px,4vw,48px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px,2.2vw,22px)",
          }}
        >
          {/* tag */}
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
              animation: visible ? "tagPop 0.5s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
            <span
              style={{
                fontSize: "clamp(9px,1.1vw,11px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Healthcare
            </span>
          </div>

          {/* headline */}
          <div
            style={{
              animation: visible ? "fadeUp 0.65s 0.1s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px,5vw,52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ color: "white", display: "block" }}>
                AI that cares for
              </span>
              <span style={{ color: "white", display: "block" }}>
                patients and scales
              </span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradShift 3.5s ease infinite",
                }}
              >
                healthcare.
              </span>
            </h1>
          </div>

          {/* body */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.78,
              maxWidth: 420,
              animation: visible ? "fadeUp 0.65s 0.18s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            Operino helps healthcare teams automate admin tasks, improve patient
            engagement, and deliver better outcomes with AI.
          </p>

          {/* buttons */}
          <div
            style={{
              display: "flex",
              gap: "clamp(10px,1.8vw,14px)",
              flexWrap: "wrap",
              animation: visible ? "fadeUp 0.65s 0.26s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <button
              onMouseEnter={() => setH1(true)}
              onMouseLeave={() => setH1(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: h1
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 12,
                padding: "clamp(12px,2vw,15px) clamp(22px,3vw,32px)",
                fontSize: "clamp(13px,1.5vw,15px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.22s",
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
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                    animation: "shimBtn 0.6s ease",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                Start for Free
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
                background: h2 ? "rgba(255,255,255,0.08)" : "transparent",
                border: `1px solid ${h2 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: 12,
                padding: "clamp(12px,2vw,15px) clamp(22px,3vw,32px)",
                fontSize: "clamp(13px,1.5vw,15px)",
                fontWeight: 600,
                color: h2 ? "white" : "rgba(255,255,255,0.72)",
                cursor: "pointer",
                transition: "all 0.22s",
                transform: h2 ? "scale(1.04)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              Book a Demo
            </button>
          </div>

          {/* benefit pills */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
              gap: "clamp(12px,2vw,20px)",
              animation: visible ? "fadeUp 0.65s 0.36s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {benefits.map((b, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div
                  key={b.label}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.45s ease ${0.38 + i * 0.1}s, transform 0.45s ease ${0.38 + i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: hov ? `${b.color}22` : `${b.color}14`,
                      border: hov
                        ? `1px solid ${b.color}50`
                        : `1px solid ${b.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: b.color,
                      transition: "all 0.25s",
                      transform: hov ? "scale(1.1) rotate(-6deg)" : "scale(1)",
                      boxShadow: hov ? `0 0 14px ${b.color}40` : "none",
                    }}
                  >
                    {b.icon}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(12px,1.4vw,14px)",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {b.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(10px,1.2vw,12px)",
                      color: "rgba(255,255,255,0.38)",
                      lineHeight: 1.55,
                    }}
                  >
                    {b.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Robot scene ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "85%",
            animation: visible ? "fadeRight 0.7s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {/* orbit rings */}
            {[0.88, 0.72].map((r, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "50%",
                  width: `${r * 100}%`,
                  height: `${r * 32}%`,
                  borderRadius: "50%",
                  border: "1px solid rgba(124,92,252,0.15)",
                  animation: `ringPulse ${5 + i * 1.5}s ease-in-out infinite ${i * 0.8}s`,
                  transform: "translate(-50%,-50%)",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* floating icons */}
            {floatingIcons.map((fi, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: fi.top,
                  left: (fi as any).left,
                  right: (fi as any).right,
                  bottom: (fi as any).bottom,
                  width: 50,
                  height: 50,
                  borderRadius: 13,
                  background: "rgba(124,92,252,0.15)",
                  border: "1px solid rgba(124,92,252,0.32)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
                  animation: `iconFloat${i} ${fi.dur}s ease-in-out ${fi.delay}s infinite`,
                  zIndex: 4,
                }}
              >
                {fi.icon}
              </div>
            ))}

            {/* Patient Satisfaction card */}
            <div
              style={{
                position: "absolute",
                bottom: "14%",
                right: "0%",
                width: "clamp(140px,22%,180px)",
                background: "linear-gradient(145deg,#14112e,#0f0d26)",
                border: "1px solid rgba(124,92,252,0.4)",
                borderRadius: 14,
                padding: "12px 14px",
                zIndex: 5,
                boxShadow: "0 8px 28px rgba(0,0,0,0.5)",
                opacity: cardVisible ? 1 : 0,
                animation: cardVisible
                  ? "cardSlideIn 0.5s cubic-bezier(.34,1.2,.64,1) both"
                  : "none",
              }}
            >
              <p
                style={{
                  margin: "0 0 4px",
                  fontSize: 9.5,
                  color: "rgba(255,255,255,0.4)",
                  fontWeight: 500,
                }}
              >
                Patient Satisfaction
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: "white" }}>
                  96.7%
                </span>
                <span
                  style={{ fontSize: 10.5, color: "#22c55e", fontWeight: 600 }}
                >
                  ▲ 8.2%
                </span>
              </div>
              <MiniSparkline />
            </div>

            {/* glow under robot */}
            <div
              style={{
                position: "absolute",
                bottom: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "55%",
                height: 22,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.58) 0%,transparent 70%)",
                filter: "blur(10px)",
                animation: "glowBreath 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* robot */}
            <div
              onClick={handleRobotClick}
              style={{
                position: "absolute",
                top: "4%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(200px,52%,290px)",
                zIndex: 3,
                cursor: "pointer",
              }}
            >
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    bottom: "55%",
                    left: "50%",
                    fontSize: 15,
                    pointerEvents: "none",
                    zIndex: 10,
                    userSelect: "none",
                    // @ts-ignore
                    "--cx": `${p.x}px`,
                    "--cy": `${p.y}px`,
                    animation: "confettiPop 0.85s ease-out forwards",
                  }}
                >
                  {p.icon}
                </div>
              ))}
              <img
                src={opihealth}
                alt="Operino Healthcare Robot"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter:
                    "drop-shadow(0 0 28px rgba(124,92,252,0.55)) drop-shadow(0 10px 40px rgba(80,20,180,0.4))",
                  animation: robBounce
                    ? "robotBounce 0.8s cubic-bezier(.34,1.56,.64,1)"
                    : "robotFloat 4.5s ease-in-out infinite",
                  transform: !robBounce
                    ? `translateX(${robX}px) translateY(${robY}px)`
                    : undefined,
                  transition: robBounce ? "none" : "transform 0.12s ease",
                  position: "relative",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:720px){}`}</style>
    </div>
  );
}
