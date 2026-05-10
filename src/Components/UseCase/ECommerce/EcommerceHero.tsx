import { useState, useEffect, useRef } from "react";
import opiEcommerc from "../../../assets/Photos/Opi-Ecommerc-1.png";
// ── Floating icon cards ───────────────────────────────────────────────────────
const floatingIcons = [
  {
    top: "10%",
    right: "38%",
    dur: 3.2,
    delay: 0,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
      >
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H5v10a2 2 0 002 2h10a2 2 0 002-2V10h1.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
  },
  {
    top: "6%",
    right: "4%",
    dur: 3.8,
    delay: 0.7,
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="2"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    top: "48%",
    right: "3%",
    dur: 4.0,
    delay: 1.2,
    icon: (
      <div style={{ display: "flex", gap: 2 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#fbbf24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    ),
  },
];

const benefits = [
  {
    label: "Increase Sales",
    sub: "with AI recommendations",
    color: "#7c5cfc",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
  },
  {
    label: "Improve Support",
    sub: "with AI automation",
    color: "#818cf8",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: "Reduce Costs",
    sub: "with intelligent workflows",
    color: "#a78bfa",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8M12 6v2m0 8v2" />
      </svg>
    ),
  },
];

export default function EcommerceHero() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robotJump, setRobotJump] = useState(false);
  const [cartParticles, setCartParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 },
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
    setRobotJump(true);
    setTimeout(() => setRobotJump(false), 700);
    const colors = ["#a78bfa", "#7c5cfc", "#c4b5fd", "#fbbf24", "#818cf8"];
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 - 40,
      y: Math.random() * -70 - 10,
      color: colors[i % colors.length],
    }));
    setCartParticles(burst);
    setTimeout(() => setCartParticles([]), 900);
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
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeRight  { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 40%{transform:translateY(-12px) rotate(1.5deg)} 70%{transform:translateY(-6px) rotate(-1deg)} }
        @keyframes robotJump  { 0%{transform:translateY(0) scale(1)} 25%{transform:translateY(-24px) scale(1.05) rotate(-3deg)} 50%{transform:translateY(-14px) scale(1.03) rotate(2deg)} 75%{transform:translateY(-6px) scale(1.01)} 100%{transform:translateY(0) scale(1)} }
        @keyframes glowBreathe{ 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0.7;transform:scale(1.08)} }
        @keyframes gradFlow   { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn    { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes particlePop{ 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--px),var(--py)) scale(0);opacity:0} }
        @keyframes iconFloat0 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes iconFloat1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(-4deg)} }
        @keyframes iconFloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes waveAnim   { 0%{d:path("M0 20 Q250 10 500 20 Q750 30 1000 20 L1000 40 L0 40 Z")} 50%{d:path("M0 20 Q250 30 500 20 Q750 10 1000 20 L1000 40 L0 40 Z")} 100%{d:path("M0 20 Q250 10 500 20 Q750 30 1000 20 L1000 40 L0 40 Z")} }
        @keyframes dotBlink   { 0%,100%{opacity:1} 50%{opacity:0.35} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "clamp(200px,38vw,420px)",
          height: "clamp(200px,38vw,420px)",
          background:
            "radial-gradient(circle,rgba(124,92,252,0.13) 0%,transparent 65%)",
          animation: "glowBreathe 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "10%",
          width: "clamp(160px,30vw,340px)",
          height: "clamp(160px,30vw,340px)",
          background:
            "radial-gradient(circle,rgba(99,60,220,0.1) 0%,transparent 65%)",
          animation: "glowBreathe 9s ease-in-out infinite 1.8s",
          pointerEvents: "none",
        }}
      />

      {/* Bottom wave decoration */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          pointerEvents: "none",
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0 20 Q250 10 500 20 Q750 30 1000 20 L1000 40 L0 40 Z"
            fill="rgba(124,92,252,0.06)"
          />
          <path
            d="M0 24 Q250 14 500 24 Q750 34 1000 24 L1000 40 L0 40 Z"
            fill="rgba(124,92,252,0.04)"
          />
        </svg>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "clamp(40px,6vw,72px) clamp(20px,4vw,48px)",
          display: "grid",
          gridTemplateColumns: "minmax(260px,1fr) auto",
          gap: "clamp(20px,4vw,48px)",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── LEFT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px,2vw,20px)",
          }}
        >
          {/* headline */}
          <div
            style={{
              animation: visible ? "fadeUp 0.65s 0.05s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(16px,2.2vw,22px)",
                fontWeight: 500,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              AI for
            </p>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(36px,6vw,62px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradFlow 4s ease infinite",
                }}
              >
                E-commerce
              </span>
            </h1>
          </div>

          {/* body */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.78,
              maxWidth: 440,
              animation: visible ? "fadeUp 0.65s 0.16s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            From product discovery to post-purchase support, Operino helps
            e-commerce businesses boost sales, improve customer experience, and
            automate operations with AI.
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
                borderRadius: 11,
                padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
                fontSize: "clamp(13px,1.5vw,14.5px)",
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
                padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
                fontSize: "clamp(13px,1.5vw,14.5px)",
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

          {/* benefit pills */}
          <div
            style={{
              display: "flex",
              gap: "clamp(12px,2vw,20px)",
              flexWrap: "wrap",
              animation: visible ? "fadeUp 0.65s 0.36s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            {benefits.map((b, i) => (
              <div
                key={b.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-12px)",
                  transition: `opacity 0.45s ease ${0.38 + i * 0.1}s, transform 0.45s ease ${0.38 + i * 0.1}s`,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: `${b.color}18`,
                    border: `1px solid ${b.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: b.color,
                    flexShrink: 0,
                  }}
                >
                  {b.icon}
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(11px,1.3vw,13px)",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {b.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(9px,1.1vw,10.5px)",
                      color: "rgba(255,255,255,0.36)",
                    }}
                  >
                    {b.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Robot ── */}
        <div
          onClick={handleRobotClick}
          style={{
            position: "relative",
            width: "clamp(220px,35vw,400px)",
            flexShrink: 0,
            cursor: "pointer",
            animation: visible ? "fadeRight 0.7s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* particles */}
          {cartParticles.map((p) => (
            <div
              key={p.id}
              style={{
                position: "absolute",
                bottom: "30%",
                left: "50%",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: p.color,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                "--px": `${p.x}px`,
                "--py": `${p.y}px`,
                animation: "particlePop 0.85s ease-out forwards",
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
                minWidth: 44,
                height: 44,
                borderRadius: 12,
                paddingInline: 8,
                background: "rgba(124,92,252,0.14)",
                border: "1px solid rgba(124,92,252,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "65%",
              height: 24,
              background:
                "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
              filter: "blur(10px)",
              animation: "glowBreathe 2.5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* robot image */}
          <img
            src={opiEcommerc}
            alt="Operino E-commerce Robot"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              filter:
                "drop-shadow(0 0 28px rgba(124,92,252,0.55)) drop-shadow(0 10px 38px rgba(80,20,180,0.4))",
              animation: robotJump
                ? "robotJump 0.7s cubic-bezier(.34,1.56,.64,1)"
                : "robotFloat 4.5s ease-in-out infinite",
              transform: !robotJump
                ? `translateX(${robX}px) translateY(${robY}px)`
                : undefined,
              transition: robotJump ? "none" : "transform 0.12s ease",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* Mobile stack */}
      <style>{`@media(max-width:640px){ .eco-grid{grid-template-columns:1fr!important} }`}</style>
    </div>
  );
}
