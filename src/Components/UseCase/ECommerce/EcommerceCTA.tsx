import { useState, useEffect, useRef } from "react";
import Operieco from "../../../assets/Photos/Opi-Ecommerc-1.png";
export default function EcommerceCTA() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robotWave, setRobotWave] = useState(false);
  const [cartParticles, setCartParticles] = useState<
    { id: number; x: number; y: number; color: string; emoji: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const waveTimer = useRef<number | undefined>(undefined);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleRobotClick = () => {
    setRobotWave(true);
    clearTimeout(waveTimer.current);
    waveTimer.current = setTimeout(() => setRobotWave(false), 900);

    const emojis = ["🛍️", "💜", "⭐", "✨", "🛒", "💫"];
    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#fbbf24", "#818cf8"];
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -80 - 10,
      color: colors[i % colors.length],
      emoji: emojis[i % emojis.length],
    }));
    setCartParticles(burst);
    setTimeout(() => setCartParticles([]), 1000);
  };

  const robX = (mousePos.x - 0.5) * 10;
  const robY = (mousePos.y - 0.5) * 6;

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(12px,3vw,28px) clamp(16px,4vw,40px)",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes robotFloat   { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-10px) rotate(1.5deg)} 70%{transform:translateY(-5px) rotate(-1deg)} }
        @keyframes robotWave    { 0%{transform:scale(1) rotate(0)} 20%{transform:scale(1.1) rotate(-5deg) translateY(-14px)} 40%{transform:scale(1.07) rotate(4deg) translateY(-10px)} 60%{transform:scale(1.09) rotate(-3deg) translateY(-12px)} 80%{transform:scale(1.03) rotate(1deg) translateY(-4px)} 100%{transform:scale(1) rotate(0)} }
        @keyframes glowBreathe  { 0%,100%{opacity:0.38;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.07)} }
        @keyframes shimBtn      { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes emojiPop     { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--ex),var(--ey)) scale(0.3);opacity:0} }
        @keyframes scanLine     { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
        @keyframes chatBubble   { from{opacity:0;transform:scale(0.7) translateY(4px)} to{opacity:1;transform:scale(1) translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* gradient border */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          borderRadius: 22,
          padding: "1.8px",
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.6),rgba(99,60,220,0.3),rgba(167,139,250,0.55),rgba(80,40,200,0.5))",
          backgroundSize: "300% 300%",
          animation: visible
            ? "gradFlow 5s ease infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          boxShadow: "0 12px 56px rgba(124,92,252,0.2)",
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
            padding: "clamp(22px,3.5vw,36px) clamp(20px,3.5vw,40px)",
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

          {/* grid dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle,rgba(124,92,252,0.09) 1px,transparent 1px)",
              backgroundSize: "22px 22px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ambient orbs */}
          <div
            style={{
              position: "absolute",
              top: -50,
              left: -30,
              width: "clamp(140px,25vw,260px)",
              height: "clamp(140px,25vw,260px)",
              background:
                "radial-gradient(circle,rgba(124,92,252,0.18) 0%,transparent 70%)",
              animation: "glowBreathe 6s ease-in-out infinite",
              pointerEvents: "none",
              transform: `translate(${robX * 0.2}px,${robY * 0.2}px)`,
              transition: "transform 0.12s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -30,
              right: "22%",
              width: "clamp(100px,18vw,200px)",
              height: "clamp(100px,18vw,200px)",
              background:
                "radial-gradient(circle,rgba(99,60,200,0.12) 0%,transparent 70%)",
              animation: "glowBreathe 8s ease-in-out infinite 2s",
              pointerEvents: "none",
            }}
          />

          {/* ── LEFT: Text ── */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: 180,
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.12s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h2
              style={{
                margin: "0 0 clamp(8px,1.5vw,12px)",
                fontSize: "clamp(18px,3vw,28px)",
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
                color: "white",
              }}
            >
              Ready to grow your
              <br />
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
                e-commerce
              </span>
              <span style={{ color: "white" }}> business with AI?</span>
            </h2>
            <p
              style={{
                margin: "0 0 clamp(14px,2.5vw,22px)",
                fontSize: "clamp(11.5px,1.4vw,13.5px)",
                color: "rgba(255,255,255,0.44)",
                lineHeight: 1.72,
                maxWidth: 340,
              }}
            >
              Join thousands of e-commerce brands using Operino to increase
              sales and delight customers.
            </p>

            {/* buttons */}
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
                  color: h2 ? "white" : "rgba(255,255,255,0.7)",
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
              width: "clamp(130px,18vw,220px)",
              flexShrink: 0,
              cursor: "pointer",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.28s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* emoji particles */}
            {cartParticles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  bottom: "50%",
                  left: "50%",
                  fontSize: 16,
                  pointerEvents: "none",
                  zIndex: 10,
                  userSelect: "none",
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--ex": `${p.x}px`,
                  "--ey": `${p.y}px`,
                  animation: "emojiPop 0.9s ease-out forwards",
                }}
              >
                {p.emoji}
              </div>
            ))}

            {/* chat bubble */}
            {robotWave && (
              <div
                style={{
                  position: "absolute",
                  top: "-4%",
                  left: "-20%",
                  background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                  borderRadius: 10,
                  padding: "5px 10px",
                  fontSize: "clamp(9px,1.2vw,11px)",
                  fontWeight: 700,
                  color: "white",
                  boxShadow: "0 4px 14px rgba(124,92,252,0.55)",
                  whiteSpace: "nowrap",
                  zIndex: 5,
                  animation:
                    "chatBubble 0.3s cubic-bezier(.34,1.56,.64,1) both",
                }}
              >
                🛒 Shop smarter!
              </div>
            )}

            {/* glow */}
            <div
              style={{
                position: "absolute",
                bottom: -6,
                left: "50%",
                transform: "translateX(-50%)",
                width: "65%",
                height: 18,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
                filter: "blur(8px)",
                animation: "glowBreathe 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* robot */}
            <img
              src={Operieco}
              alt="Operino E-commerce Robot"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 22px rgba(124,92,252,0.55)) drop-shadow(0 8px 32px rgba(80,20,180,0.4))",
                animation: robotWave
                  ? "robotWave 0.9s cubic-bezier(.34,1.56,.64,1)"
                  : "robotFloat 4.5s ease-in-out infinite",
                transform: !robotWave
                  ? `translateX(${robX}px) translateY(${robY}px)`
                  : undefined,
                transition: robotWave ? "none" : "transform 0.12s ease",
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
