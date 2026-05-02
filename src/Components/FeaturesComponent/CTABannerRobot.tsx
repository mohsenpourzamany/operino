import { useState, useEffect, useRef } from "react";
import opiprobot from "../../assets/Photos/Opi-Promotion-1.png";

export default function CTABannerRobot() {
  const [visible, setVisible] = useState(false);
  const [hoverPrimary, setHoverPrimary] = useState(false);
  const [hoverSecondary, setHoverSecondary] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [robotWave, setRobotWave] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const waveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Intersection trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Robot wave on hover
  const handleRobotHover = () => {
    setRobotWave(true);
    if (waveTimer.current) {
      clearTimeout(waveTimer.current);
    }
    waveTimer.current = setTimeout(() => setRobotWave(false), 1200);
  };

  const robX = (mousePos.x - 0.5) * 12;
  const robY = (mousePos.y - 0.5) * 8;

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "48px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes robotFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          40%     { transform: translateY(-10px) rotate(1.5deg); }
          70%     { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes robotWave {
          0%   { transform: translateY(0) rotate(0deg); }
          20%  { transform: translateY(-14px) rotate(3deg) scale(1.03); }
          40%  { transform: translateY(-8px) rotate(-2deg); }
          60%  { transform: translateY(-12px) rotate(2deg); }
          80%  { transform: translateY(-4px) rotate(-1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes borderGlow {
          0%,100% { opacity: 0.6; }
          50%     { opacity: 1; }
        }
        @keyframes shimmerSweep {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes gradBg {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(5px); }
        }
        @keyframes glowRing {
          0%,100% { transform: scale(1); opacity: 0.4; }
          50%     { transform: scale(1.12); opacity: 0.7; }
        }
        @keyframes textGradientShift {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        .arrow-bounce { animation: arrowBounce 1s ease-in-out infinite; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Banner card */}
      <div
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
        style={{
          maxWidth: 960,
          width: "100%",
          borderRadius: 22,
          position: "relative",
          padding: 2,
          background:
            "linear-gradient(120deg,rgba(124,92,252,0.7),rgba(99,60,220,0.4),rgba(167,139,250,0.6),rgba(80,40,200,0.5))",
          backgroundSize: "300% 300%",
          animation: visible
            ? "gradBg 5s ease infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          boxShadow: "0 12px 60px rgba(124,92,252,0.25)",
        }}
      >
        {/* Border glow rings */}
        <div
          style={{
            position: "absolute",
            inset: -2,
            borderRadius: 24,
            border: "1px solid rgba(124,92,252,0.3)",
            animation: "glowRing 3s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: 28,
            border: "1px solid rgba(124,92,252,0.1)",
            animation: "glowRing 3s ease-in-out infinite 0.5s",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Inner */}
        <div
          style={{
            borderRadius: 20,
            background:
              "linear-gradient(135deg,#1a1040 0%,#120b2e 40%,#1a0f3a 100%)",
            padding: "32px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Shimmer sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "30%",
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",
              animation: "shimmerSweep 4s ease-in-out infinite",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Grid dot pattern bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(124,92,252,0.12) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Ambient orbs */}
          <div
            style={{
              position: "absolute",
              top: -60,
              left: -40,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(124,92,252,0.2) 0%,transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
              transform: `translate(${robX * 0.3}px,${robY * 0.3}px)`,
              transition: "transform 0.1s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -40,
              right: 100,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(99,60,220,0.15) 0%,transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Left: Text */}
          <div
            style={{
              flex: 1,
              minWidth: 220,
              position: "relative",
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.15s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h2
              style={{
                margin: "0 0 10px",
                fontSize: 24,
                fontWeight: 800,
                color: "white",
                lineHeight: 1.25,
                letterSpacing: "-0.4px",
              }}
            >
              Ready to build your{" "}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a78bfa,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "textGradientShift 3s ease infinite",
                }}
              >
                AI workforce?
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 13.5,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.65,
                maxWidth: 300,
              }}
            >
              Join thousands of businesses already using Operino to automate and
              grow.
            </p>
          </div>

          {/* Center: Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
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
                padding: "14px 26px",
                fontSize: 14,
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverPrimary ? "scale(1.05)" : "scale(1)",
                boxShadow: hoverPrimary
                  ? "0 10px 30px rgba(124,92,252,0.65), 0 0 0 1px rgba(255,255,255,0.1) inset"
                  : "0 6px 20px rgba(124,92,252,0.45)",
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
                    animation: "shimmerSweep 1s ease-in-out",
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
                border: `1px solid ${hoverSecondary ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: 12,
                padding: "14px 26px",
                fontSize: 14,
                fontWeight: 600,
                color: hoverSecondary ? "white" : "rgba(255,255,255,0.75)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverSecondary ? "scale(1.05)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              Book a Demo
            </button>
          </div>

          {/* Right: Robot */}
          <div
            onMouseEnter={handleRobotHover}
            style={{
              position: "relative",
              width: 120,
              flexShrink: 0,
              zIndex: 2,
              animation: visible ? "fadeSlideUp 0.7s 0.4s ease both" : "none",
              opacity: visible ? 1 : 0,
              cursor: "pointer",
            }}
          >
            {/* Glow under robot */}
            <div
              style={{
                position: "absolute",
                bottom: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 90,
                height: 30,
                background:
                  "radial-gradient(ellipse,rgba(124,92,252,0.5) 0%,transparent 70%)",
                filter: "blur(8px)",
                pointerEvents: "none",
                animation: "glowRing 2.5s ease-in-out infinite",
              }}
            />

            {/* Robot image */}
            <img
              src={opiprobot}
              alt="Operino Robot"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter:
                  "drop-shadow(0 0 24px rgba(124,92,252,0.5)) drop-shadow(0 8px 30px rgba(80,20,180,0.4))",
                animation: robotWave
                  ? "robotWave 1.2s ease-in-out"
                  : `robotFloat 5s ease-in-out infinite`,
                transform: `translateX(${robX}px) translateY(${robY}px)`,
                transition: robotWave ? "none" : "transform 0.15s ease",
              }}
            />

            {/* Speech bubble */}
            {robotWave && (
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -20,
                  background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
                  borderRadius: 10,
                  padding: "5px 10px",
                  fontSize: 11,
                  color: "white",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 14px rgba(124,92,252,0.5)",
                  animation: "fadeSlideUp 0.3s ease both",
                }}
              >
                👋 Hi there!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
