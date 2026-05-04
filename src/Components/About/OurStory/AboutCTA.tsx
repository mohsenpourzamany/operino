/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import OpiExit from "../../../assets/Photos/Opi-Exciting.png";
export default function AboutCTA() {
  const [visible, setVisible] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robotJoy, setRobotJoy] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);
  const bannerRef = useRef<HTMLDivElement>(null);
  const joyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Burst particles on robot click
  const handleRobotClick = () => {
    setRobotJoy(true);
    clearTimeout(joyTimer.current);
    joyTimer.current = setTimeout(() => setRobotJoy(false), 1000);

    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#818cf8"];
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      y: Math.random() * -60 - 10,
      color: colors[i % colors.length],
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 900);
  };

  const robX = (mousePos.x - 0.5) * 14;
  const robY = (mousePos.y - 0.5) * 8;

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "clamp(32px,5vw,56px) clamp(16px,4vw,40px)",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes robotFloat  { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-12px) rotate(1.5deg)} 70%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes robotJoy    { 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.12) rotate(-4deg)} 40%{transform:scale(1.08) rotate(3deg)} 60%{transform:scale(1.1) rotate(-2deg)} 80%{transform:scale(1.04) rotate(1deg)} 100%{transform:scale(1) rotate(0)} }
        @keyframes gradFlow    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes borderSpin  { to{--angle:360deg} }
        @keyframes shimmerSweep{ 0%{transform:translateX(-120%) skewX(-12deg)} 100%{transform:translateX(300%) skewX(-12deg)} }
        @keyframes particlePop { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0} }
        @keyframes glowPulse   { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.75;transform:scale(1.08)} }
        @keyframes arrowBounce { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
        @keyframes textGrad    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @property --angle { syntax:"<angle>"; initial-value:0deg; inherits:false; }
        .arrow-bounce { animation: arrowBounce 1s ease-in-out infinite; }
        * { box-sizing:border-box; }
      `}</style>

      {/* Card with animated gradient border */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          borderRadius: 22,
          padding: 2,
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.6),rgba(99,60,220,0.3),rgba(167,139,250,0.55),rgba(80,40,200,0.5))",
          backgroundSize: "300% 300%",
          animation: visible
            ? "gradFlow 5s ease infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          boxShadow: "0 16px 64px rgba(124,92,252,0.22)",
        }}
      >
        <div
          ref={bannerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
          style={{
            borderRadius: 20,
            background:
              "linear-gradient(135deg,#1a1040 0%,#110830 50%,#1a0f3a 100%)",
            padding: "clamp(24px,4vw,36px) clamp(20px,4vw,44px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px,3vw,32px)",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "25%",
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",
              animation: "shimmerSweep 5s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Grid dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle,rgba(124,92,252,0.1) 1px,transparent 1px)",
              backgroundSize: "26px 26px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Ambient orbs */}
          <div
            style={{
              position: "absolute",
              top: -50,
              left: -30,
              width: "clamp(150px,25vw,240px)",
              height: "clamp(150px,25vw,240px)",
              background:
                "radial-gradient(circle,rgba(124,92,252,0.2) 0%,transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
              transform: `translate(${robX * 0.25}px,${robY * 0.25}px)`,
              transition: "transform 0.12s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: "25%",
              width: "clamp(120px,18vw,180px)",
              height: "clamp(120px,18vw,180px)",
              background:
                "radial-gradient(circle,rgba(99,60,200,0.14) 0%,transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ── LEFT: Text ── */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: 180,
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.15s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h2
              style={{
                margin: "0 0 clamp(8px,1.5vw,12px)",
                fontSize: "clamp(18px,3.5vw,26px)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
              }}
            >
              The best is yet{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a78bfa,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "textGrad 3.5s ease infinite",
                }}
              >
                to come.
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(11px,1.6vw,13.5px)",
                color: "rgba(255,255,255,0.42)",
                lineHeight: 1.7,
              }}
            >
              We're building more than a platform.
              <br />
              We're building a movement.
            </p>
          </div>

          {/* ── CENTER: Buttons ── */}
          <div
            style={{
              display: "flex",
              gap: "clamp(8px,1.5vw,12px)",
              alignItems: "center",
              flexWrap: "wrap",
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.28s ease both" : "none",
              opacity: visible ? 1 : 0,
              flexShrink: 0,
            }}
          >
            {/* Primary */}
            <button
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: hoverPrimary
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(18px,2.5vw,26px)",
                fontSize: "clamp(12px,1.6vw,14px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverPrimary ? "scale(1.05)" : "scale(1)",
                boxShadow: hoverPrimary
                  ? "0 10px 30px rgba(124,92,252,0.65)"
                  : "0 6px 20px rgba(124,92,252,0.4)",
                whiteSpace: "nowrap",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {hoverPrimary && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                    animation: "shimmerSweep 0.8s ease",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                Start Building for Free
              </span>
              <span
                className={hoverPrimary ? "arrow-bounce" : ""}
                style={{ position: "relative", zIndex: 1 }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>

            {/* Secondary */}
            <button
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              style={{
                background: hoverSecondary
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                border: `1px solid ${hoverSecondary ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(18px,2.5vw,26px)",
                fontSize: "clamp(12px,1.6vw,14px)",
                fontWeight: 600,
                color: hoverSecondary ? "white" : "rgba(255,255,255,0.72)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverSecondary ? "scale(1.05)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              Book a Demo
            </button>
          </div>

          {/* ── RIGHT: Robot ── */}
          <div
            onClick={handleRobotClick}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "clamp(80px,14vw,160px)",
              cursor: "pointer",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.4s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* Particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  bottom: "60%",
                  left: "50%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: p.color,
                  // @ts-ignore
                  "--px": `${p.x}px`,
                  "--py": `${p.y}px`,
                  animation: "particlePop 0.8s ease-out forwards",
                  zIndex: 10,
                  boxShadow: `0 0 8px ${p.color}`,
                }}
              />
            ))}

            {/* Glow under robot */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "80%",
                height: 24,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
                filter: "blur(8px)",
                animation: "glowPulse 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* Robot */}
            <img
              src={OpiExit}
              alt="Operino Robot"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 20px rgba(124,92,252,0.5)) drop-shadow(0 8px 28px rgba(80,20,180,0.4))",
                animation: robotJoy
                  ? "robotJoy 1s ease-in-out"
                  : "robotFloat 5s ease-in-out infinite",
                transform: !robotJoy
                  ? `translateX(${robX}px) translateY(${robY}px)`
                  : undefined,
                transition: robotJoy ? "none" : "transform 0.14s ease",
                zIndex: 5,
              }}
            />

            {/* Thought bubble on joy */}
            {robotJoy && (
              <div
                style={{
                  position: "absolute",
                  top: "-8%",
                  left: "-30%",
                  background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                  borderRadius: 10,
                  padding: "5px 10px",
                  fontSize: "clamp(9px,1.2vw,11px)",
                  fontWeight: 700,
                  color: "white",
                  boxShadow: "0 4px 14px rgba(124,92,252,0.55)",
                  whiteSpace: "nowrap",
                  animation: "fadeSlideUp 0.3s ease both",
                }}
              >
                🚀 Let's go!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
