/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import opisaas from "../../../assets/Photos/Opi-Hello.png";
export default function SaaS_CTA() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [waving, setWaving] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; char: string; color: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const waveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          // auto show bubble after a moment
          setTimeout(() => setBubbleVisible(true), 1200);
          setTimeout(() => setBubbleVisible(false), 3800);
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
    // wave
    setWaving(true);
    clearTimeout(waveTimer.current);
    waveTimer.current = setTimeout(() => setWaving(false), 900);
    // bubble
    setBubbleVisible(true);
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubbleVisible(false), 2500);
    // confetti
    const chars = ["🚀", "⭐", "💜", "✨", "⚡", "🎉"];
    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#818cf8", "#fbbf24"];
    setParticles(
      Array.from({ length: 10 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * -80 - 10,
        char: chars[i % chars.length],
        color: colors[i % colors.length],
      })),
    );
    setTimeout(() => setParticles([]), 1000);
  };

  const robX = (mousePos.x - 0.5) * 10;
  const robY = (mousePos.y - 0.5) * 5;

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(12px,3vw,28px) clamp(16px,4vw,40px)",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes robotFloat   { 0%,100%{transform:translateY(0) rotate(0)} 40%{transform:translateY(-10px) rotate(1.5deg)} 70%{transform:translateY(-5px) rotate(-1deg)} }
        @keyframes robotWave    { 0%{transform:translateY(0) rotate(0)} 15%{transform:translateY(-16px) rotate(-4deg) scale(1.06)} 35%{transform:translateY(-12px) rotate(3deg) scale(1.05)} 55%{transform:translateY(-10px) rotate(-2deg) scale(1.04)} 75%{transform:translateY(-4px) rotate(1deg) scale(1.01)} 100%{transform:translateY(0) rotate(0) scale(1)} }
        @keyframes bubbleIn     { from{opacity:0;transform:scale(0.6) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes bubbleOut    { from{opacity:1;transform:scale(1)} to{opacity:0;transform:scale(0.8) translateY(-6px)} }
        @keyframes glowBreath   { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0.65;transform:scale(1.07)} }
        @keyframes shimBtn      { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes confettiPop  { 0%{transform:translate(0,0) scale(1) rotate(0deg);opacity:1} 100%{transform:translate(var(--cx),var(--cy)) scale(0.3) rotate(180deg);opacity:0} }
        @keyframes scanLine     { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
        @keyframes chatIcon     { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15) rotate(5deg)} }
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
            "linear-gradient(120deg,rgba(124,92,252,0.65),rgba(99,60,220,0.35),rgba(167,139,250,0.6),rgba(80,40,200,0.5))",
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
            padding: "clamp(22px,3.5vw,36px) clamp(22px,3.5vw,42px)",
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
              animation: "scanLine 6s ease-in-out infinite",
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
                fontSize: "clamp(20px,3.2vw,32px)",
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "white" }}>Ready to scale your </span>
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
                SaaS
              </span>
              <span style={{ color: "white" }}>
                <br />
                business with AI?
              </span>
            </h2>

            <p
              style={{
                margin: "0 0 clamp(16px,2.5vw,24px)",
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.72,
                maxWidth: 380,
              }}
            >
              Join thousands of SaaS & Tech companies using Operino to delight
              users and grow faster.
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

          {/* ── RIGHT: Robot ── */}
          <div
            onClick={handleRobotClick}
            style={{
              position: "relative",
              width: "clamp(120px,16vw,200px)",
              flexShrink: 0,
              cursor: "pointer",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.65s 0.28s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* confetti */}
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  bottom: "60%",
                  left: "50%",
                  fontSize: 14,
                  pointerEvents: "none",
                  zIndex: 10,
                  userSelect: "none",
                  // @ts-ignore
                  "--cx": `${p.x}px`,
                  "--cy": `${p.y}px`,
                  animation: "confettiPop 0.85s ease-out forwards",
                }}
              >
                {p.char}
              </div>
            ))}

            {/* chat bubble */}
            <div
              style={{
                position: "absolute",
                top: "-6%",
                right: "-28%",
                background: "white",
                borderRadius: 12,
                padding: "7px 12px",
                fontSize: "clamp(10px,1.3vw,13px)",
                fontWeight: 700,
                color: "#1a0a3a",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                whiteSpace: "nowrap",
                zIndex: 6,
                // arrow
                pointerEvents: "none",
                opacity: bubbleVisible ? 1 : 0,
                animation: bubbleVisible
                  ? "bubbleIn 0.35s cubic-bezier(.34,1.56,.64,1) both"
                  : visible
                    ? "bubbleOut 0.3s ease forwards"
                    : "none",
              }}
            >
              Hello! 👋
              {/* tail */}
              <div
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 14,
                  width: 12,
                  height: 12,
                  background: "white",
                  transform: "rotate(45deg)",
                  borderRadius: 2,
                }}
              />
            </div>

            {/* floating chat icon */}
            <div
              style={{
                position: "absolute",
                top: "8%",
                right: "-22%",
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(124,92,252,0.15)",
                border: "1px solid rgba(124,92,252,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                animation: "chatIcon 3s ease-in-out infinite",
                zIndex: 4,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(167,139,250,0.85)"
                strokeWidth="1.9"
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
              src={opisaas}
              alt="Operino SaaS Robot"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 22px rgba(124,92,252,0.55)) drop-shadow(0 8px 30px rgba(80,20,180,0.4))",
                animation: waving
                  ? "robotWave 0.9s cubic-bezier(.34,1.56,.64,1)"
                  : "robotFloat 4.5s ease-in-out infinite",
                transform: !waving
                  ? `translateX(${robX}px) translateY(${robY}px)`
                  : undefined,
                transition: waving ? "none" : "transform 0.12s ease",
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
