import { useState, useEffect, useRef } from "react";

// ─── Animated envelope SVG ────────────────────────────────────────────────────
function EnvelopeScene({ hovered }: { hovered: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        width: "clamp(120px,20vw,200px)",
        flexShrink: 0,
      }}
    >
      {/* Orbit ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "clamp(150px,24vw,240px)",
          height: "clamp(150px,24vw,240px)",
          borderRadius: "50%",
          border: "1px solid rgba(124,92,252,0.2)",
          animation: "ringPulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "clamp(110px,18vw,185px)",
          height: "clamp(110px,18vw,185px)",
          borderRadius: "50%",
          border: "1px dashed rgba(124,92,252,0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Floating mini icons around envelope */}
      {[
        {
          top: "-18%",
          left: "-20%",
          delay: 0,
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
        },
        {
          top: "-22%",
          right: "-14%",
          delay: 0.8,
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#818cf8"
              strokeWidth="1.8"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          ),
        },
        {
          bottom: "-10%",
          right: "-18%",
          delay: 1.4,
          icon: (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c4b5fd"
              strokeWidth="1.8"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          ),
        },
        {
          bottom: "-15%",
          left: "-10%",
          delay: 2,
          icon: (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#7c5cfc">
              <rect x="4" y="4" width="16" height="16" rx="3" />
            </svg>
          ),
        },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "rgba(124,92,252,0.12)",
            border: "1px solid rgba(124,92,252,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `floatIcon${i} ${3.5 + i * 0.5}s ease-in-out ${item.delay}s infinite`,
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
            zIndex: 2,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Envelope SVG */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          animation: hovered
            ? "envelopeOpen 0.5s ease forwards"
            : "envelopeFloat 4s ease-in-out infinite",
          filter:
            "drop-shadow(0 0 24px rgba(124,92,252,0.5)) drop-shadow(0 8px 32px rgba(80,20,180,0.4))",
        }}
      >
        <svg
          width="clamp(100px,16vw,160px)"
          viewBox="0 0 160 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* Envelope body */}
          <rect
            x="10"
            y="40"
            width="140"
            height="85"
            rx="8"
            fill="url(#envGrad)"
          />
          {/* Bottom fold lines */}
          <path d="M10 125 L80 82 L150 125" fill="rgba(80,40,180,0.4)" />
          <line
            x1="10"
            y1="125"
            x2="80"
            y2="82"
            stroke="rgba(167,139,250,0.25)"
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="125"
            x2="80"
            y2="82"
            stroke="rgba(167,139,250,0.25)"
            strokeWidth="1"
          />

          {/* Flap (open on hover) */}
          <path
            d={
              hovered
                ? "M10 40 Q80 10 150 40 L80 20 Z"
                : "M10 40 Q80 90 150 40 L80 72 Z"
            }
            fill="url(#flapGrad)"
            style={{ transition: "d 0.4s ease" }}
          />

          {/* Letter peeking out */}
          <rect
            x="45"
            y={hovered ? 10 : 30}
            width="70"
            height="55"
            rx="6"
            fill="rgba(220,210,255,0.92)"
            style={{ transition: "y 0.5s ease" }}
          />
          <line
            x1="55"
            y1={hovered ? 28 : 48}
            x2="105"
            y2={hovered ? 28 : 48}
            stroke="rgba(124,92,252,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="55"
            y1={hovered ? 38 : 56}
            x2="95"
            y2={hovered ? 38 : 56}
            stroke="rgba(124,92,252,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line
            x1="55"
            y1={hovered ? 48 : 64}
            x2="88"
            y2={hovered ? 48 : 64}
            stroke="rgba(124,92,252,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <defs>
            <linearGradient
              id="envGrad"
              x1="10"
              y1="40"
              x2="150"
              y2="125"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#5535e8" />
              <stop offset="100%" stopColor="#3a1fa8" />
            </linearGradient>
            <linearGradient
              id="flapGrad"
              x1="80"
              y1="40"
              x2="80"
              y2="90"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#7c5cfc" />
              <stop offset="100%" stopColor="#5535e8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Glow under envelope */}
      <div
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: 18,
          background:
            "radial-gradient(ellipse,rgba(124,92,252,0.5) 0%,transparent 70%)",
          filter: "blur(8px)",
          animation: "ringPulse 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function NoRoleCTA() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dot = { id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top };
    setRipples((d) => [...d, dot]);
    setTimeout(() => setRipples((d) => d.filter((x) => x.id !== dot.id)), 600);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "0 clamp(16px,4vw,40px) clamp(40px,6vw,64px)",
        fontFamily: "'Inter',sans-serif",
        marginTop: 40,
      }}
    >
      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gradFlow    { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes ringPulse   { 0%,100%{opacity:0.4;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.75;transform:translate(-50%,-50%) scale(1.05)} }
        @keyframes envelopeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes envelopeOpen  { from{transform:translateY(0)} to{transform:translateY(-8px) scale(1.04)} }
        @keyframes floatIcon0  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-4px,-10px)} }
        @keyframes floatIcon1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5px,-12px)} }
        @keyframes floatIcon2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(6px,-8px)} }
        @keyicons floatIcon3   { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-3px,-9px)} }
        @keyframes shimmerBtn  { 0%{transform:translateX(-100%) skewX(-12deg)} 100%{transform:translateX(300%) skewX(-12deg)} }
        @keyframes rippleOut   { from{transform:scale(0);opacity:1} to{transform:scale(4.5);opacity:0} }
        @keyframes borderGlow  { 0%,100%{opacity:0.55} 50%{opacity:0.9} }
        @keyframes scanLine    { 0%{transform:translateX(-100%)} 100%{transform:translateX(250%)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Gradient border wrapper */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          borderRadius: 20,
          padding: "1.5px",
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.55),rgba(99,60,220,0.3),rgba(167,139,250,0.5),rgba(80,40,200,0.45))",
          backgroundSize: "300% 300%",
          animation:
            "gradFlow 5s ease infinite, borderGlow 3s ease-in-out infinite",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(22px)",
          transition:
            "opacity 0.65s ease, transform 0.65s cubic-bezier(.34,1.2,.64,1)",
          boxShadow: "0 14px 56px rgba(124,92,252,0.2)",
        }}
      >
        <div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: 19,
            background:
              "linear-gradient(135deg,#14103a 0%,#0d0b28 50%,#160d38 100%)",
            padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(20px,4vw,48px)",
            flexWrap: "wrap",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Scan line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "20%",
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent)",
              animation: "scanLine 6s ease-in-out infinite",
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
                "radial-gradient(circle,rgba(124,92,252,0.09) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: -40,
              left: -30,
              width: "clamp(160px,28vw,280px)",
              height: "clamp(160px,28vw,280px)",
              background:
                "radial-gradient(circle,rgba(124,92,252,0.14) 0%,transparent 70%)",
              pointerEvents: "none",
              transition: "opacity 0.4s",
              opacity: hovered ? 1 : 0.6,
            }}
          />

          {/* LEFT: Text */}
          <div
            style={{
              flex: "1 1 220px",
              minWidth: 180,
              position: "relative",
              zIndex: 2,
            }}
          >
            <h2
              style={{
                margin: "0 0 clamp(10px,1.8vw,14px)",
                fontSize: "clamp(18px,3vw,26px)",
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.3px",
                lineHeight: 1.25,
              }}
            >
              Don't see the right role?
            </h2>
            <p
              style={{
                margin: "0 0 clamp(18px,3vw,28px)",
                fontSize: "clamp(12px,1.6vw,14px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.75,
              }}
            >
              We're always looking for exceptional people.
              <br />
              Send us your resume and let's talk.
            </p>

            {/* CTA Button */}
            <button
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={handleBtnClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: btnHover
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 11,
                padding: "clamp(11px,1.8vw,14px) clamp(18px,2.5vw,26px)",
                fontSize: "clamp(12px,1.5vw,14px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: btnHover ? "scale(1.05)" : "scale(1)",
                boxShadow: btnHover
                  ? "0 10px 30px rgba(124,92,252,0.65)"
                  : "0 6px 20px rgba(124,92,252,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {btnHover && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                    animation: "shimmerBtn 0.7s ease",
                  }}
                />
              )}
              {ripples.map((r) => (
                <div
                  key={r.id}
                  style={{
                    position: "absolute",
                    left: r.x - 12,
                    top: r.y - 12,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                    animation: "rippleOut 0.6s ease-out forwards",
                    pointerEvents: "none",
                  }}
                />
              ))}
              <span style={{ position: "relative", zIndex: 1 }}>
                Send Your Resume
              </span>
              <svg
                style={{
                  position: "relative",
                  zIndex: 1,
                  transition: "transform 0.22s ease",
                  transform: btnHover ? "translateX(4px)" : "none",
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
          </div>

          {/* RIGHT: Envelope scene */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
            }}
          >
            <EnvelopeScene hovered={hovered} />
          </div>
        </div>
      </div>
    </div>
  );
}
