import React, { useEffect, useRef, useState } from "react";
import opiedu from "../../../assets/Photos/Opi-Education-1.png";
const EducationCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="flex flex-col lg:flex-row"
      ref={sectionRef}
      style={{
        background: "transparent",
        padding: "clamp(32px, 5vw, 56px) clamp(24px, 6vw, 80px)",
        borderRadius: "20px",
        alignItems: "center",
        justifyContent: "center",
        gap: "clamp(20px, 4vw, 48px)",
        flexWrap: "wrap",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left: Text + Buttons */}
      <div
        style={{
          width: "50%",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(22px, 3.5vw, 38px)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            margin: "0 0 clamp(8px, 1.2vw, 12px)",
          }}
        >
          Ready to transform education
          <br />
          with AI?
        </h2>
        <p
          style={{
            fontSize: "clamp(13px, 1.4vw, 15px)",
            color: "rgba(200,190,230,0.75)",
            margin: "0 0 clamp(20px, 3vw, 32px)",
            lineHeight: 1.6,
          }}
        >
          Join thousands of educators and institutions
          <br />
          using Operino to teach smarter and achieve more.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "clamp(10px, 2vw, 14px)",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(11px, 1.4vw, 14px) clamp(22px, 2.5vw, 28px)",
              background: "#7c5cfc",
              color: "#fff",
              fontSize: "clamp(13px, 1.3vw, 15px)",
              fontWeight: 600,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#6b4ce0";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#7c5cfc";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Start for Free <span>→</span>
          </button>

          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "clamp(11px, 1.4vw, 14px) clamp(22px, 2.5vw, 28px)",
              background: "transparent",
              color: "#e2d9ff",
              fontSize: "clamp(13px, 1.3vw, 15px)",
              fontWeight: 600,
              border: "1.5px solid rgba(167,139,250,0.5)",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "border-color 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#a78bfa";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(167,139,250,0.5)";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            Book a Demo
          </button>
        </div>
      </div>

      {/* Right: Robot */}
      <div
        style={{
          flexShrink: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
        }}
      >
        <img
          src={opiedu}
          alt="Operino Education Robot"
          style={{
            width: "clamp(110px, 18vw, 200px)",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0 8px 24px rgba(124,92,252,0.45))",
            animation: "robotFloat 4s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes robotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default EducationCTA;
