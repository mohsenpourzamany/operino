import { useState, useEffect, useRef } from "react";

export default function IntegrationsHero() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [shieldHover, setShieldHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "80%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        padding: "clamp(80px,6vw,112px) clamp(50px,5vw,102px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn   { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes glowPulse { 0%,100%{opacity:0.28} 50%{opacity:0.55} }
        @keyframes lockBounce{ 0%,100%{transform:translateY(0) rotate(0deg)} 30%{transform:translateY(-4px) rotate(-4deg)} 60%{transform:translateY(-2px) rotate(3deg)} }
        @keyframes shieldGlow{ 0%,100%{filter:drop-shadow(0 0 4px rgba(124,92,252,0.4))} 50%{filter:drop-shadow(0 0 12px rgba(124,92,252,0.8))} }
        @keyframes tagPop    { from{opacity:0;transform:translateX(-14px) scale(0.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes dotBlink  { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(0.8)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: "clamp(200px,40vw,400px)",
          height: "clamp(200px,40vw,400px)",
          background:
            "radial-gradient(circle,rgba(124,92,252,0.1) 0%,transparent 65%)",
          animation: "glowPulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          right: "-5%",
          width: "clamp(150px,30vw,300px)",
          height: "clamp(150px,30vw,300px)",
          background:
            "radial-gradient(circle,rgba(99,60,220,0.08) 0%,transparent 65%)",
          animation: "glowPulse 9s ease-in-out infinite 1.5s",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 520,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2.2vw,22px)",
        }}
      >
        {/* ── Tag ── */}
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
            animation: visible ? "tagPop 0.5s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#a78bfa">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span
            style={{
              fontSize: "clamp(9px,1.1vw,11px)",
              fontWeight: 700,
              color: "#a78bfa",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Features
          </span>
        </div>

        {/* ── Headline ── */}
        <div
          style={{
            animation: visible ? "fadeUp 0.65s 0.1s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(40px,7vw,68px)",
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "white" }}>Integr</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradShift 4s ease infinite",
              }}
            >
              ations
            </span>
          </h1>

          <p
            style={{
              margin: "clamp(10px,1.8vw,16px) 0 0",
              fontSize: "clamp(17px,2.5vw,24px)",
              color: "rgba(255,255,255,0.72)",
              fontWeight: 500,
              lineHeight: 1.32,
            }}
          >
            Connect Operino with the tools
            <br />
            you already use
          </p>
        </div>

        {/* ── Body text ── */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(13px,1.5vw,15px)",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.78,
            animation: visible ? "fadeUp 0.65s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          Seamlessly integrate your favorite apps and platforms. Build powerful
          workflows, sync data, and automate across your entire stack.
        </p>

        {/* ── Buttons ── */}
        <div
          style={{
            display: "flex",
            gap: "clamp(10px,1.8vw,14px)",
            flexWrap: "wrap",
            animation: visible ? "fadeUp 0.65s 0.28s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Primary */}
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
              padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
              fontSize: "clamp(13px,1.5vw,14.5px)",
              fontWeight: 700,
              color: "white",
              cursor: "pointer",
              transition: "all 0.22s ease",
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
              Explore Integrations
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

          {/* Secondary */}
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
              padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
              fontSize: "clamp(13px,1.5vw,14.5px)",
              fontWeight: 600,
              color: h2 ? "white" : "rgba(255,255,255,0.68)",
              cursor: "pointer",
              transition: "all 0.22s ease",
              transform: h2 ? "scale(1.04)" : "scale(1)",
              whiteSpace: "nowrap",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            View API Docs
          </button>
        </div>

        {/* ── Security badge ── */}
        <div
          onMouseEnter={() => setShieldHover(true)}
          onMouseLeave={() => setShieldHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: shieldHover
              ? "rgba(124,92,252,0.08)"
              : "rgba(255,255,255,0.04)",
            border: shieldHover
              ? "1px solid rgba(124,92,252,0.35)"
              : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "clamp(13px,2vw,18px) clamp(14px,2.2vw,20px)",
            transition: "all 0.25s ease",
            animation: visible ? "fadeUp 0.65s 0.36s ease both" : "none",
            opacity: visible ? 1 : 0,
            cursor: "default",
          }}
        >
          {/* shield icon */}
          <div
            style={{
              flexShrink: 0,
              animation: "shieldGlow 3s ease-in-out infinite",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                stroke={shieldHover ? "#a78bfa" : "rgba(124,92,252,0.6)"}
                strokeWidth="1.6"
                fill={
                  shieldHover
                    ? "rgba(124,92,252,0.12)"
                    : "rgba(124,92,252,0.06)"
                }
                style={{ transition: "all 0.25s" }}
              />
              <polyline
                points="9 12 11 14 15 10"
                stroke={shieldHover ? "#c4b5fd" : "#a78bfa"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* text */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(12.5px,1.5vw,14px)",
                fontWeight: 700,
                color: "white",
              }}
            >
              Secure. Reliable. Scalable.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(10px,1.2vw,12px)",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.55,
              }}
            >
              Enterprise-grade integrations with
              <br />
              99.9% uptime and top-tier security.
            </p>
          </div>

          {/* lock icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              flexShrink: 0,
              background: shieldHover
                ? "rgba(124,92,252,0.2)"
                : "rgba(124,92,252,0.1)",
              border: shieldHover
                ? "1px solid rgba(124,92,252,0.5)"
                : "1px solid rgba(124,92,252,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.25s",
              animation: shieldHover ? "lockBounce 0.6s ease" : "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={shieldHover ? "#c4b5fd" : "rgba(167,139,250,0.75)"}
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
              <circle
                cx="12"
                cy="16"
                r="1"
                fill={shieldHover ? "#c4b5fd" : "rgba(167,139,250,0.75)"}
                stroke="none"
              />
            </svg>
          </div>
        </div>

        {/* ── Live stats strip ── */}
        <div
          style={{
            display: "flex",
            gap: "clamp(16px,3vw,28px)",
            flexWrap: "wrap",
            animation: visible ? "fadeUp 0.65s 0.44s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {[
            { val: "100+", label: "Integrations" },
            { val: "99.9%", label: "Uptime" },
            { val: "10K+", label: "Teams using it" },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.45s ease ${0.44 + i * 0.08}s, transform 0.45s ease ${0.44 + i * 0.08}s`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#a78bfa",
                  boxShadow: "0 0 6px rgba(167,139,250,0.8)",
                  animation: `dotBlink ${2 + i * 0.4}s ease-in-out infinite ${i * 0.3}s`,
                }}
              />
              <span
                style={{
                  fontSize: "clamp(13px,1.5vw,15px)",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                {s.val}
              </span>
              <span
                style={{
                  fontSize: "clamp(10px,1.2vw,12px)",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
