import { useState, useEffect, useRef } from "react";
import opianalytics from "../../../assets/Photos/Opi-Analitics-1.png";
export default function AnalyticsCTA() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);
  const bannerRef = useRef<HTMLDivElement>(null);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // chart bar particles on hover
  const spawnParticles = () => {
    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#818cf8"];
    const burst = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * -60 - 10,
      color: colors[i % colors.length],
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 900);
  };

  const robX = (mousePos.x - 0.5) * 10;
  const robY = (mousePos.y - 0.5) * 6;

  // Floating icon positions
  const floatingIcons = [
    {
      top: "8%",
      right: "28%",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.5" />
          <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.75" />
          <rect x="17" y="3" width="4" height="18" rx="1" />
        </svg>
      ),
      delay: 0,
      dur: 3.2,
    },
    {
      top: "6%",
      right: "5%",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
      delay: 0.6,
      dur: 3.8,
    },
  ];

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(12px,3vw,32px) clamp(16px,4vw,40px)",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes robotFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowBreathe  { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.75;transform:scale(1.06)} }
        @keyframes gradFlow     { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes borderSpin   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn      { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes particlePop  { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0} }
        @keyframes iconFloat0   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes iconFloat1   { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(-4deg)} }
        @keyframes scanLine     { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* gradient border wrapper */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          borderRadius: 22,
          padding: "1.8px",
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.6),rgba(99,60,220,0.35),rgba(167,139,250,0.55),rgba(80,40,200,0.5))",
          backgroundSize: "300% 300%",
          animation: visible
            ? "gradFlow 5s ease infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          boxShadow: "0 12px 60px rgba(124,92,252,0.22)",
        }}
      >
        <div
          ref={bannerRef}
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
              width: "18%",
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
                "radial-gradient(circle,rgba(124,92,252,0.09) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
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
              width: "clamp(160px,28vw,280px)",
              height: "clamp(160px,28vw,280px)",
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
              bottom: -40,
              right: "25%",
              width: "clamp(120px,22vw,220px)",
              height: "clamp(120px,22vw,220px)",
              background:
                "radial-gradient(circle,rgba(99,60,200,0.12) 0%,transparent 70%)",
              animation: "glowBreathe 8s ease-in-out infinite 1.5s",
              pointerEvents: "none",
            }}
          />

          {/* ── LEFT: Text ── */}
          <div
            style={{
              flex: "1 1 240px",
              minWidth: 200,
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.15s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* label */}
            <p
              style={{
                margin: "0 0 clamp(8px,1.5vw,12px)",
                fontSize: "clamp(10px,1.2vw,12px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.06em",
              }}
            >
              Analytics that drive results
            </p>

            {/* headline */}
            <h2
              style={{
                margin: "0 0 clamp(10px,1.8vw,16px)",
                fontSize: "clamp(20px,3.2vw,34px)",
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "white", display: "block" }}>
                Measure what matters.
              </span>
              <span style={{ display: "block" }}>
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
                  Improve
                </span>
                <span style={{ color: "white" }}> what counts.</span>
              </span>
            </h2>

            {/* body */}
            <p
              style={{
                margin: "0 0 clamp(16px,2.5vw,24px)",
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 360,
              }}
            >
              Join thousands of businesses using Operino analytics to make
              smarter decisions and grow faster.
            </p>

            {/* buttons */}
            <div
              style={{
                display: "flex",
                gap: "clamp(8px,1.5vw,12px)",
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
                  padding: "clamp(10px,1.8vw,13px) clamp(16px,2.5vw,24px)",
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
                  Start Analyzing for Free
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
                  border: `1px solid ${h2 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.18)"}`,
                  borderRadius: 11,
                  padding: "clamp(10px,1.8vw,13px) clamp(16px,2.5vw,24px)",
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

          {/* ── RIGHT: Robot + floating icons ── */}
          <div
            onClick={spawnParticles}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "clamp(140px,22vw,260px)",
              zIndex: 2,
              cursor: "pointer",
              animation: visible ? "fadeSlideUp 0.7s 0.3s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  bottom: "55%",
                  left: "50%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: p.color,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  "--px": `${p.x}px`,
                  "--py": `${p.y}px`,
                  animation: "particlePop 0.8s ease-out forwards",
                  boxShadow: `0 0 8px ${p.color}`,
                  zIndex: 10,
                }}
              />
            ))}

            {/* floating icon cards */}
            {floatingIcons.map((fi, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: fi.top,
                  right: fi.right,
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "rgba(124,92,252,0.14)",
                  border: "1px solid rgba(124,92,252,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a78bfa",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  animation: `iconFloat${i} ${fi.dur}s ease-in-out ${fi.delay}s infinite`,
                  zIndex: 3,
                }}
              >
                {fi.icon}
              </div>
            ))}

            {/* glow under robot */}
            <div
              style={{
                position: "absolute",
                bottom: "-5%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                height: 22,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
                filter: "blur(8px)",
                animation: "glowBreathe 2.5s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* robot */}
            <img
              src={opianalytics}
              alt="Operino Analytics Robot"
              style={{
                width: "50%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 24px rgba(124,92,252,0.5)) drop-shadow(0 8px 32px rgba(80,20,180,0.4))",
                animation: "robotFloat 4.5s ease-in-out infinite",
                transform: `translateX(${robX}px) translateY(${robY}px)`,
                transition: "transform 0.12s ease",
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
