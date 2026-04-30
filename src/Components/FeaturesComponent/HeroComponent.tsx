import { useState, useEffect } from "react";
import Opipro from "../../assets/Photos/Opi-Promotion-1.png";
// ── Floating icon positions around the robot ──────────────────────────────
const floatingIcons = [
  {
    id: "chat-top",
    top: "4%",
    left: "52%",
    delay: 0,
    duration: 3.2,
    icon: (
      <svg
        width="22"
        height="22"
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
    id: "bolt",
    top: "6%",
    left: "86%",
    delay: 0.6,
    duration: 3.8,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
      </svg>
    ),
  },
  {
    id: "chat-left",
    top: "36%",
    left: "36%",
    delay: 1.1,
    duration: 4.1,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "analytics",
    top: "42%",
    left: "100%",
    delay: 0.4,
    duration: 3.5,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.6" />
        <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.8" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    id: "database",
    top: "72%",
    left: "40%",
    delay: 0.9,
    duration: 4.4,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "shield",
    top: "76%",
    left: "90%",
    delay: 1.5,
    duration: 3.9,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

function FloatingIcon({
  icon: item,
  visible,
}: {
  icon: (typeof floatingIcons)[0];
  visible: boolean;
}) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
      },
      2000 + item.delay * 800,
    );
    return () => clearInterval(interval);
  }, [item.delay]);

  return (
    <div
      style={{
        position: "absolute",
        top: item.top,
        left: item.left,
        transform: visible
          ? "scale(1) translateY(0)"
          : "scale(0.5) translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: `transform 0.7s cubic-bezier(.34,1.56,.64,1) ${0.4 + item.delay * 0.2}s, opacity 0.6s ease ${0.4 + item.delay * 0.2}s`,
        animation: visible
          ? `floatIcon_${item.id} ${item.duration}s ease-in-out ${item.delay}s infinite`
          : "none",
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: pulse ? "rgba(124,92,252,0.35)" : "rgba(124,92,252,0.12)",
          border: pulse
            ? "1px solid rgba(167,139,250,0.7)"
            : "1px solid rgba(124,92,252,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: pulse ? "#e9d5ff" : "#a78bfa",
          backdropFilter: "blur(8px)",
          boxShadow: pulse
            ? "0 0 24px rgba(124,92,252,0.6), 0 0 8px rgba(124,92,252,0.4) inset"
            : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.4s ease",
          transform: pulse ? "scale(1.12)" : "scale(1)",
        }}
      >
        {item.icon}
      </div>
    </div>
  );
}

export default function HeroComponent() {
  const [visible, setVisible] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Build keyframe CSS for each floating icon
  const keyframesCSS = floatingIcons
    .map(
      (item) => `
    @keyframes floatIcon_${item.id} {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      30%     { transform: translateY(-10px) rotate(1.5deg); }
      60%     { transform: translateY(-5px) rotate(-1deg); }
    }
  `,
    )
    .join("\n");

  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        // background:
        //   "linear-gradient(160deg,#080814 0%,#0d0b22 50%,#080814 100%)",
        fontFamily: "'Inter',sans-serif",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        ${keyframesCSS}
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes robotFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes starTwinkle {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.4); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.3; }
          50%      { opacity: 0.65; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateX(0); }
          50%      { transform: translateX(5px); }
        }
        .arrow-anim { animation: arrowBounce 1.1s ease-in-out infinite; }
      `}</style>

      {/* Background stars */}
      {[...Array(28)].map((_, i) => (
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

      {/* Ambient glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "20%",
          width: 600,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(80,40,180,0.18) 0%, transparent 65%)",
          animation: "glowPulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "30%",
          width: 500,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(99,60,200,0.12) 0%, transparent 65%)",
          animation: "glowPulse 8s ease-in-out infinite 1.5s",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 0,
          width: "100%",
        }}
      >
        {/* Left — Text */}
        <div
          style={{
            animation: visible ? "fadeSlideLeft 0.8s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Features badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(124,92,252,0.12)",
              border: "1px solid rgba(124,92,252,0.3)",
              borderRadius: 20,
              padding: "5px 14px",
              marginBottom: 28,
              cursor: "pointer",
            }}
          >
            <span style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600 }}>
              + Features
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              margin: "0 0 20px",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 52,
                fontWeight: 800,
                color: "white",
              }}
            >
              Everything you need
            </span>
            <span
              style={{
                display: "block",
                fontSize: 52,
                fontWeight: 800,
                color: "white",
              }}
            >
              to build, automate, and
            </span>
            <span
              style={{
                display: "block",
                fontSize: 52,
                fontWeight: 800,
                background: "linear-gradient(90deg,#7c5cfc,#a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              scale with AI.
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              margin: "0 0 36px",
              fontSize: 16,
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            Operino provides all the tools to create AI agents, automate
            conversations and workflows, and integrate with your favorite tools
            — all in one powerful platform.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: hoverPrimary
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 12,
                padding: "15px 28px",
                fontSize: 15,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverPrimary ? "scale(1.04)" : "scale(1)",
                boxShadow: hoverPrimary
                  ? "0 10px 32px rgba(124,92,252,0.6)"
                  : "0 6px 22px rgba(124,92,252,0.4)",
              }}
            >
              Start Building for Free
              <span className={hoverPrimary ? "arrow-anim" : ""}>
                <svg
                  width="16"
                  height="16"
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

            <button
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
              style={{
                background: hoverSecondary
                  ? "rgba(255,255,255,0.07)"
                  : "transparent",
                border: `1px solid ${hoverSecondary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.22)"}`,
                borderRadius: 12,
                padding: "15px 28px",
                fontSize: 15,
                fontWeight: 600,
                color: hoverSecondary ? "white" : "rgba(255,255,255,0.75)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverSecondary ? "scale(1.04)" : "scale(1)",
              }}
            >
              Book a Demo
            </button>
          </div>
        </div>

        {/* Right — Robot + floating icons */}
        <div
          style={{
            position: "relative",
            height: 520,
            animation: visible ? "fadeSlideRight 0.8s 0.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Robot image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-48%)",
              width: 360,
              height: 480,
              animation: "robotFloat 5s ease-in-out infinite",
              zIndex: 3,
            }}
          >
            <img
              src={Opipro}
              alt="Operino AI Robot"
              style={{
                marginTop: 30,
                width: "75%",
                height: "75%",
                objectFit: "contain",
                filter:
                  "drop-shadow(0 0 40px rgba(124,92,252,0.45)) drop-shadow(0 20px 60px rgba(80,40,200,0.3))",
              }}
            />
          </div>

          {/* Floating icons */}
          {floatingIcons.map((item) => (
            <FloatingIcon key={item.id} icon={item} visible={visible} />
          ))}

          {/* Connection lines (SVG) */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            viewBox="0 0 500 520"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0" />
                <stop offset="50%" stopColor="#7c5cfc" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* lines from robot center to each icon */}
            {[
              [250, 260, 280, 30], // chat top
              [250, 260, 440, 38], // bolt
              [250, 260, 192, 195], // chat left
              [250, 260, 458, 225], // analytics
              [250, 260, 208, 378], // database
              [250, 260, 428, 403], // shield
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#lineGrad)"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
            ))}
          </svg>

          {/* Robot glow underneath */}
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 280,
              height: 80,
              background:
                "radial-gradient(ellipse, rgba(124,92,252,0.35) 0%, transparent 70%)",
              filter: "blur(18px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
}
