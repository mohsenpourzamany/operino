/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";

export default function HireAICta() {
  const [visible, setVisible] = useState(false);
  const [hoverStart, setHoverStart] = useState(false);
  const [hoverDemo, setHoverDemo] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        // minHeight: "10vh",
        background: "#09091a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 24px",
        fontFamily: "'Inter', sans-serif",
        marginTop: -60,
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(18px, -12px) scale(1.08); }
          66% { transform: translate(-10px, 8px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(-20px, 10px) scale(1.05); }
          70% { transform: translate(12px, -8px) scale(0.97); }
        }
        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,92,252,0.3), 0 0 60px rgba(124,92,252,0.1); }
          50% { box-shadow: 0 0 40px rgba(124,92,252,0.5), 0 0 100px rgba(124,92,252,0.2); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
          100% { transform: translateY(-60px) translateX(var(--dx)) scale(0); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arrowBounce {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .arrow-bounce { animation: arrowBounce 1.2s ease-in-out infinite; }
      `}</style>

      <div
        ref={bannerRef}
        style={{
          maxWidth: 860,
          width: "100%",
          position: "relative",
          borderRadius: 20,
          padding: 2,
          background:
            "linear-gradient(135deg, rgba(124,92,252,0.6), rgba(99,102,241,0.3), rgba(124,92,252,0.6))",
          animation: visible
            ? "glowPulse 3s ease-in-out infinite, fadeSlideUp 0.7s ease both"
            : "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* Animated border shimmer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
            backgroundSize: "400px 100%",
            animation: "shimmer 3s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Inner */}
        <div
          style={{
            position: "relative",
            borderRadius: 18,
            background: "linear-gradient(135deg, #1a0f3a, #120b2e, #1a1040)",
            padding: "32px 40px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {/* Background orbs */}
          <div
            style={{
              position: "absolute",
              left: -60,
              top: -60,
              width: 220,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(124,92,252,0.22) 0%, transparent 70%)",
              animation: "floatOrb1 7s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -40,
              bottom: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
              animation: "floatOrb2 9s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 300,
              height: 100,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Scanline sweep */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "25%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
              animation: "scanline 5s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: i % 2 === 0 ? 3 : 2,
                height: i % 2 === 0 ? 3 : 2,
                borderRadius: "50%",
                background:
                  i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#818cf8" : "#c4b5fd",
                left: `${12 + i * 14}%`,
                bottom: "15%",
                // @ts-expect-error
                "--dx": `${(i % 2 === 0 ? 1 : -1) * (8 + i * 4)}px`,
                animation: `particleDrift ${2.5 + i * 0.6}s ease-out ${i * 0.8}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}

          {/* Text */}
          <div
            style={{
              flex: 1,
              minWidth: 240,
              animation: visible ? "fadeSlideUp 0.7s 0.15s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h2
              style={{
                margin: "0 0 8px",
                fontSize: 22,
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.4px",
                lineHeight: 1.2,
              }}
            >
              Ready to hire your AI employee?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.5,
              }}
            >
              Start your free trial today. No credit card required.
            </p>
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              animation: visible ? "fadeSlideUp 0.7s 0.3s ease both" : "none",
              opacity: visible ? 1 : 0,
              flexShrink: 0,
            }}
          >
            {/* Start Free */}
            <button
              onMouseEnter={() => setHoverStart(true)}
              onMouseLeave={() => setHoverStart(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: hoverStart
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 10,
                padding: "13px 24px",
                fontSize: 14,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverStart ? "scale(1.04)" : "scale(1)",
                boxShadow: hoverStart
                  ? "0 8px 28px rgba(124,92,252,0.6), 0 0 0 1px rgba(255,255,255,0.1) inset"
                  : "0 4px 18px rgba(124,92,252,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              Start Free
              <span className={hoverStart ? "arrow-bounce" : ""}>
                <svg
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
              </span>
            </button>

            {/* Book a Demo */}
            <button
              onMouseEnter={() => setHoverDemo(true)}
              onMouseLeave={() => setHoverDemo(false)}
              style={{
                background: hoverDemo
                  ? "rgba(255,255,255,0.08)"
                  : "transparent",
                border: `1px solid ${hoverDemo ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: 10,
                padding: "13px 24px",
                fontSize: 14,
                fontWeight: 600,
                color: hoverDemo ? "white" : "rgba(255,255,255,0.75)",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverDemo ? "scale(1.04)" : "scale(1)",
                boxShadow: hoverDemo ? "0 4px 16px rgba(0,0,0,0.3)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
