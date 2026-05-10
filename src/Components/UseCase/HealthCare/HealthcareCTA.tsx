import { useState, useEffect, useRef } from "react";
import opiheath from "../../../assets/Photos/OpiHeathCare-1.png";
export default function HealthcareCTA() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robPulse, setRobPulse] = useState(false);
  const [heartBeats, setHeartBeats] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [ecgActive, setEcgActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pulseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          // auto-trigger ECG on load
          setTimeout(() => setEcgActive(true), 900);
          setTimeout(() => setEcgActive(false), 3200);
        }
      },
      { threshold: 0.2 },
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
    setRobPulse(true);
    setEcgActive(true);
    clearTimeout(pulseTimer.current);
    pulseTimer.current = setTimeout(() => {
      setRobPulse(false);
      setEcgActive(false);
    }, 2000);
    // heart particles
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      y: Math.random() * -70 - 10,
    }));
    setHeartBeats(burst);
    setTimeout(() => setHeartBeats([]), 1000);
  };

  const robX = (mousePos.x - 0.5) * 10;
  const robY = (mousePos.y - 0.5) * 5;

  // ECG path data
  const ecgPath = `M0 20 L15 20 L22 8 L26 32 L30 4 L34 36 L38 20 L55 20 L62 8 L66 32 L70 4 L74 36 L78 20 L110 20`;

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(12px,3vw,28px) clamp(16px,4vw,40px)",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes robotFloat  { 0%,100%{transform:translateY(0) rotate(0)} 40%{transform:translateY(-10px) rotate(1.5deg)} 70%{transform:translateY(-5px) rotate(-1deg)} }
        @keyframes robotPulse  { 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.07) rotate(-3deg) translateY(-14px)} 40%{transform:scale(1.05) rotate(2.5deg) translateY(-10px)} 60%{transform:scale(1.06) rotate(-2deg) translateY(-7px)} 80%{transform:scale(1.02) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes glowBreath  { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0.65;transform:scale(1.07)} }
        @keyframes shimBtn     { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes heartPop    { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--hx),var(--hy)) scale(0.2);opacity:0} }
        @keyframes scanLine    { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
        @keyframes ecgDraw     { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
        @keyframes ecgFade     { 0%{opacity:0} 10%{opacity:1} 75%{opacity:1} 100%{opacity:0} }
        @keyframes plusFloat   { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-8px) rotate(5deg)} }
        @keyframes heartbeat   { 0%,100%{transform:scale(1)} 14%{transform:scale(1.25)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} 56%{transform:scale(1)} }
        @keyframes borderPulse { 0%,100%{opacity:0.55} 50%{opacity:0.9} }
        * { box-sizing:border-box; }
      `}</style>

      {/* gradient border */}
      <div
        style={{
          maxWidth: 1060,
          margin: "0 auto",
          borderRadius: 22,
          padding: "1.8px",
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.65),rgba(99,60,220,0.3),rgba(167,139,250,0.6),rgba(80,40,200,0.5))",
          backgroundSize: "300% 300%",
          animation: visible
            ? "gradFlow 5s ease infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          boxShadow: "0 14px 60px rgba(124,92,252,0.22)",
        }}
      >
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          style={{
            borderRadius: 20,
            background:
              "linear-gradient(140deg,#160f3a 0%,#0e0828 45%,#180e40 100%)",
            padding: "clamp(22px,3.5vw,36px) clamp(22px,3.5vw,44px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px,3vw,32px)",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* scan line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "16%",
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent)",
              animation: "scanLine 7s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* dot grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle,rgba(124,92,252,0.08) 1px,transparent 1px)",
              backgroundSize: "22px 22px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ambient */}
          <div
            style={{
              position: "absolute",
              top: -50,
              left: -40,
              width: "clamp(160px,28vw,280px)",
              height: "clamp(160px,28vw,280px)",
              background:
                "radial-gradient(circle,rgba(124,92,252,0.18) 0%,transparent 70%)",
              animation: "glowBreath 6s ease-in-out infinite",
              pointerEvents: "none",
              transform: `translate(${robX * 0.2}px,${robY * 0.2}px)`,
              transition: "transform 0.12s ease",
            }}
          />

          {/* ── LEFT TEXT ── */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: 180,
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.65s 0.12s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h2
              style={{
                margin: "0 0 clamp(8px,1.5vw,12px)",
                fontSize: "clamp(20px,3.2vw,30px)",
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
                color: "white",
              }}
            >
              Deliver better care with{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradFlow 3.5s ease infinite",
                }}
              >
                AI.
              </span>
            </h2>
            <p
              style={{
                margin: "0 0 clamp(16px,2.5vw,24px)",
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.72,
                maxWidth: 360,
              }}
            >
              Join healthcare teams using Operino to improve patient engagement
              and streamline operations.
            </p>
            <div
              style={{
                display: "flex",
                gap: "clamp(8px,1.4vw,12px)",
                flexWrap: "wrap",
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
                  borderRadius: 11,
                  padding: "clamp(10px,1.8vw,13px) clamp(18px,2.5vw,26px)",
                  fontSize: "clamp(12px,1.4vw,14px)",
                  fontWeight: 700,
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  transform: h1 ? "scale(1.05)" : "scale(1)",
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
                  width="13"
                  height="13"
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
                  background: h2 ? "rgba(255,255,255,0.07)" : "transparent",
                  border: `1px solid ${h2 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.2)"}`,
                  borderRadius: 11,
                  padding: "clamp(10px,1.8vw,13px) clamp(18px,2.5vw,26px)",
                  fontSize: "clamp(12px,1.4vw,14px)",
                  fontWeight: 600,
                  color: h2 ? "white" : "rgba(255,255,255,0.72)",
                  cursor: "pointer",
                  transition: "all 0.22s ease",
                  transform: h2 ? "scale(1.05)" : "scale(1)",
                  whiteSpace: "nowrap",
                }}
              >
                Book a Demo
              </button>
            </div>
          </div>

          {/* ── RIGHT: Robot + floating icons ── */}
          <div
            onClick={handleRobotClick}
            style={{
              position: "relative",
              width: "clamp(130px,18vw,210px)",
              flexShrink: 0,
              cursor: "pointer",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.65s 0.28s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* heart particles */}
            {heartBeats.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  bottom: "55%",
                  left: "50%",
                  zIndex: 10,
                  pointerEvents: "none",
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--hx": `${p.x}px`,
                  "--hy": `${p.y}px`,
                  animation: "heartPop 0.9s ease-out forwards",
                  fontSize: 14,
                  userSelect: "none",
                }}
              >
                ❤️
              </div>
            ))}

            {/* ECG card — top left */}
            <div
              style={{
                position: "absolute",
                top: "-4%",
                left: "-28%",
                background: "rgba(14,10,40,0.85)",
                border: "1px solid rgba(124,92,252,0.4)",
                borderRadius: 12,
                padding: "8px 12px",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
                zIndex: 5,
                animation: "plusFloat 3.5s ease-in-out infinite",
              }}
            >
              <svg
                width="110"
                height="40"
                viewBox="0 0 110 40"
                style={{ display: "block", overflow: "visible" }}
              >
                <path
                  d={ecgPath}
                  fill="none"
                  stroke="rgba(34,197,94,0.3)"
                  strokeWidth="1.5"
                />
                {ecgActive && (
                  <path
                    d={ecgPath}
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                    style={{
                      animation:
                        "ecgDraw 1.2s ease forwards, ecgFade 2s ease forwards",
                      filter: "drop-shadow(0 0 4px #22c55e)",
                    }}
                  />
                )}
              </svg>
            </div>

            {/* heart icon — top right */}
            <div
              style={{
                position: "absolute",
                top: "2%",
                right: "-20%",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(124,92,252,0.15)",
                border: "1px solid rgba(124,92,252,0.32)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                animation:
                  "heartbeat 2s ease-in-out infinite, plusFloat 4s ease-in-out 0.5s infinite",
                zIndex: 5,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(167,139,250,0.9)"
                strokeWidth="1.8"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>

            {/* plus cross icon — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: "20%",
                right: "-22%",
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(124,92,252,0.15)",
                border: "1px solid rgba(124,92,252,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "plusFloat 3.8s ease-in-out 1s infinite",
                zIndex: 5,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(167,139,250,0.8)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>

            {/* glow */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: 18,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
                filter: "blur(8px)",
                animation: "glowBreath 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* robot */}
            <img
              src={opiheath}
              alt="Operino Healthcare Robot"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 22px rgba(124,92,252,0.55)) drop-shadow(0 8px 30px rgba(80,20,180,0.4))",
                animation: robPulse
                  ? "robotPulse 0.85s cubic-bezier(.34,1.56,.64,1)"
                  : "robotFloat 4.5s ease-in-out infinite",
                transform: !robPulse
                  ? `translateX(${robX}px) translateY(${robY}px)`
                  : undefined,
                transition: robPulse ? "none" : "transform 0.12s ease",
                position: "relative",
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
