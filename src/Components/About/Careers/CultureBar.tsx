/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";

const perks = [
  {
    label: "Global Team",
    sub: "Work from anywhere",
    color: "#7c5cfc",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    label: "Meaningful Impact",
    sub: "Build things that matter",
    color: "#a78bfa",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Growth Mindset",
    sub: "Learn, grow, repeat",
    color: "#818cf8",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: "Great Culture",
    sub: "Be yourself, do your best",
    color: "#c4b5fd",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
        <path d="M12 21.23l-1-1" strokeOpacity="0" />
      </svg>
    ),
  },
];

function PerkItem({
  perk,
  index,
  visible,
}: {
  perk: (typeof perks)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleEnter = () => {
    setHovered(true);
    const burst = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * -30 - 8,
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 700);
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 180px",
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px,1.8vw,16px)",
        padding: "clamp(16px,2.5vw,22px) clamp(14px,2vw,20px)",
        position: "relative",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s cubic-bezier(.34,1.4,.64,1) ${index * 0.1}s`,
        overflow: "hidden",
      }}
    >
      {/* Hover background sweep */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `radial-gradient(ellipse at 30% 50%, ${perk.color}15 0%, transparent 65%)`
            : "transparent",
          transition: "background 0.35s ease",
          pointerEvents: "none",
        }}
      />

      {/* Vertical divider (not on last) */}
      {index < perks.length - 1 && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "20%",
            bottom: "20%",
            width: 1,
            background: `linear-gradient(180deg,transparent,rgba(124,92,252,0.2),transparent)`,
          }}
        />
      )}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: "clamp(24px,3.5vw,32px)",
            top: "50%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: perk.color,
            // @ts-ignore
            "--px": `${p.x}px`,
            "--py": `${p.y}px`,
            animation: "particlePop 0.65s ease-out forwards",
            zIndex: 5,
            boxShadow: `0 0 6px ${perk.color}`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Icon */}
      <div
        style={{
          width: "clamp(38px,5.5vw,48px)",
          height: "clamp(38px,5.5vw,48px)",
          borderRadius: "clamp(10px,1.5vw,14px)",
          flexShrink: 0,
          background: hovered ? `${perk.color}22` : "rgba(124,92,252,0.1)",
          border: hovered
            ? `1px solid ${perk.color}60`
            : "1px solid rgba(124,92,252,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? perk.color : "rgba(167,139,250,0.65)",
          transition: "all 0.3s ease",
          transform: hovered
            ? "rotate(-8deg) scale(1.12)"
            : "rotate(0) scale(1)",
          boxShadow: hovered ? `0 0 18px ${perk.color}40` : "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {perk.icon}
      </div>

      {/* Text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={
            {
              margin: 0,
              fontSize: "clamp(12px,1.5vw,14px)",
              fontWeight: 600,
              color: hovered ? "white" : "rgba(255,255,255,0.8)",
              transition: "color 0.25s",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
              display: "block",
              transition2: "transform 0.25s ease",
            } as React.CSSProperties
          }
        >
          {perk.label}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: "clamp(10px,1.2vw,12px)",
            color: hovered ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.3)",
            transition: "color 0.25s",
            whiteSpace: "nowrap",
          }}
        >
          {perk.sub}
        </p>
      </div>
    </div>
  );
}

export default function CultureBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "0 clamp(12px,4vw,40px)",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <style>{`
        @keyframes particlePop {
          0%   { transform: translate(0,0) scale(1); opacity: 1; }
          100% { transform: translate(var(--px), var(--py)) scale(0); opacity: 0; }
        }
        @keyframes borderGlow {
          0%,100% { opacity:0.6; } 50% { opacity:1; }
        }
        * { box-sizing:border-box; }
      `}</style>

      {/* Wrapper with animated gradient border */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          borderRadius: 16,
          padding: "1.5px",
          background:
            "linear-gradient(90deg,rgba(124,92,252,0.4),rgba(167,139,250,0.2),rgba(99,60,220,0.4),rgba(167,139,250,0.2),rgba(124,92,252,0.4))",
          backgroundSize: "300% 100%",
          animation: "borderGlow 4s ease-in-out infinite",
        }}
      >
        <div
          ref={ref}
          style={{
            borderRadius: 15,
            background: "linear-gradient(135deg,#111128,#0d0c22)",
            display: "flex",
            flexWrap: "wrap",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Subtle inner top glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "50%",
              height: 1,
              background:
                "linear-gradient(90deg,transparent,rgba(124,92,252,0.3),transparent)",
              pointerEvents: "none",
            }}
          />

          {perks.map((perk, i) => (
            <PerkItem
              key={perk.label}
              perk={perk}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
