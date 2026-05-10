/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";
import opisaas from "../../../assets/Photos/Opi-Analitics-1.png";
// ── Floating icon cards around the robot ─────────────────────────────────────
const floatingIcons = [
  {
    top: "5%",
    left: "50%",
    delay: 0,
    dur: 3.4,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <circle
          cx="9"
          cy="7"
          r="1.5"
          fill="rgba(167,139,250,0.4)"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    top: "5%",
    right: "2%",
    delay: 0.7,
    dur: 4.0,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    top: "42%",
    left: "38%",
    delay: 1.2,
    dur: 3.7,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.85)"
        strokeWidth="1.8"
      >
        <path d="M17.5 19H9a7 7 0 116.71-9h1.79a4.5 4.5 0 110 9z" />
      </svg>
    ),
  },
  {
    top: "40%",
    right: "2%",
    delay: 1.8,
    dur: 3.2,
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
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

const benefits = [
  {
    label: "Improve User Experience",
    sub: "AI-powered support available 24/7 across all channels.",
    color: "#7c5cfc",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Increase Retention",
    sub: "Proactive insights help you reduce churn and keep users.",
    color: "#818cf8",
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
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "Scale Efficiently",
    sub: "Automate workflows and support without increasing your headcount.",
    color: "#a78bfa",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
      </svg>
    ),
  },
];

// ── Orbit ring + traveling dots SVG ─────────────────────────────────────────
function OrbitEffect({ size }: { size: number }) {
  const C = size / 2;
  const R1 = size * 0.44;
  const R2 = size * 0.36;
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 1,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      <ellipse
        cx={C}
        cy={C * 1.15}
        rx={R1}
        ry={R1 * 0.28}
        fill="none"
        stroke="rgba(124,92,252,0.25)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <ellipse
        cx={C}
        cy={C * 1.15}
        rx={R2}
        ry={R2 * 0.22}
        fill="none"
        stroke="rgba(124,92,252,0.12)"
        strokeWidth="1"
        strokeDasharray="3 7"
      />
      {/* ground glow */}
      <ellipse
        cx={C}
        cy={C * 1.15}
        rx={R1 * 0.6}
        ry={R1 * 0.1}
        fill="rgba(124,92,252,0.18)"
        style={{ filter: "blur(8px)" }}
      />
    </svg>
  );
}

export default function SaaSHero() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robotBounce, setRobotBounce] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const bounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [sceneSize, setSceneSize] = useState(440);
  const sceneRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const update = () => {
      if (sceneRef.current) setSceneSize(sceneRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleRobotClick = () => {
    setRobotBounce(true);
    clearTimeout(bounceTimer.current);
    bounceTimer.current = setTimeout(() => setRobotBounce(false), 800);
    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#818cf8"];
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      y: Math.random() * -70 - 10,
      color: colors[i % colors.length],
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 900);
  };

  const robX = (mousePos.x - 0.5) * 12;
  const robY = (mousePos.y - 0.5) * 7;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(40px,6vw,72px) clamp(20px,4vw,52px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight  { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-12px) rotate(1.5deg)} 70%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes robotBounce{ 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.08) rotate(-4deg) translateY(-18px)} 40%{transform:scale(1.05) rotate(3deg) translateY(-12px)} 60%{transform:scale(1.06) rotate(-2deg) translateY(-8px)} 80%{transform:scale(1.02) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes glowBreath { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0.65;transform:scale(1.07)} }
        @keyframes gradShift  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn    { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes particlePop{ 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0} }
        @keyframes iconFloat0 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes iconFloat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px) rotate(-4deg)} }
        @keyframes iconFloat2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
        @keyframes iconFloat3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px) rotate(-3deg)} }
        @keyframes starTwinkle{ 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.55;transform:scale(1.4)} }
        @keyframes tagPop     { from{opacity:0;transform:translateX(-12px) scale(0.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* stars */}
      {Array.from({ length: 22 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? 2 : 1.5,
            height: i % 3 === 0 ? 2 : 1.5,
            borderRadius: "50%",
            background: "white",
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
            animation: `starTwinkle ${2.5 + (i % 4) * 0.6}s ease-in-out ${(i * 0.3) % 3}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          right: "20%",
          width: "clamp(220px,42vw,560px)",
          height: "clamp(220px,42vw,560px)",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.1) 0%,transparent 65%)",
          animation: "glowBreath 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(260px,1fr) clamp(320px,46vw,560px)",
          gap: "clamp(20px,4vw,48px)",
          alignItems: "center",
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
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#a78bfa",
                boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                animation: "glowBreath 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "clamp(9px,1.1vw,11px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              SaaS & Tech
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
                fontSize: "clamp(34px,5.5vw,58px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ color: "white", display: "block" }}>
                AI that scales with
              </span>
              <span style={{ display: "block" }}>
                <span style={{ color: "white" }}>your </span>
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
                  SaaS business.
                </span>
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
              maxWidth: 440,
              animation: visible ? "fadeUp 0.65s 0.18s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            From user onboarding to customer support and churn prevention,
            Operino helps SaaS & Tech companies automate, analyze, and grow
            faster.
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
                padding: "clamp(12px,2vw,15px) clamp(20px,2.8vw,30px)",
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
                padding: "clamp(12px,2vw,15px) clamp(20px,2.8vw,30px)",
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

          {/* benefits */}
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
          ref={sceneRef}
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "90%",
            animation: visible ? "fadeRight 0.7s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {/* orbit rings */}
            <OrbitEffect size={sceneSize} />

            {/* floating icon cards */}
            {floatingIcons.map((fi, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: fi.top,
                  left: fi.left,
                  right: (fi as any).right,
                  width: 52,
                  height: 52,
                  borderRadius: 14,
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

            {/* robot container */}
            <div
              onClick={handleRobotClick}
              style={{
                position: "absolute",
                top: "8%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(200px,50%,280px)",
                zIndex: 3,
                cursor: "pointer",
              }}
            >
              {/* particles */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    left: "50%",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: p.color,
                    // @ts-ignore
                    "--px": `${p.x}px`,
                    "--py": `${p.y}px`,
                    animation: "particlePop 0.85s ease-out forwards",
                    boxShadow: `0 0 8px ${p.color}`,
                    zIndex: 10,
                  }}
                />
              ))}

              {/* glow under */}
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60%",
                  height: 22,
                  background:
                    "radial-gradient(ellipse,rgba(124,92,252,0.6) 0%,transparent 70%)",
                  filter: "blur(10px)",
                  animation: "glowBreath 2.5s ease-in-out infinite",
                  pointerEvents: "none",
                }}
              />

              {/* robot */}
              <img
                src={opisaas}
                alt="Operino SaaS Robot"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter:
                    "drop-shadow(0 0 28px rgba(124,92,252,0.55)) drop-shadow(0 10px 40px rgba(80,20,180,0.4))",
                  animation: robotBounce
                    ? "robotBounce 0.8s cubic-bezier(.34,1.56,.64,1)"
                    : "robotFloat 4.5s ease-in-out infinite",
                  transform: !robotBounce
                    ? `translateX(${robX}px) translateY(${robY}px)`
                    : undefined,
                  transition: robotBounce ? "none" : "transform 0.12s ease",
                  position: "relative",
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* mobile stack */}
      <style>{`@media(max-width:720px){.saas-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
