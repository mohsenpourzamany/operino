import { useState, useEffect, useRef, useCallback } from "react";

const reasons = [
  {
    label: "Work on cutting-edge AI",
    description:
      "Solve real problems with the latest AI technologies and make a huge impact.",
    color: "#7c5cfc",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L8 8H4l4 4-2 8 6-4 6 4-2-8 4-4h-4L12 2z"
          fill="#a78bfa"
          opacity="0.85"
        />
        <path
          d="M12 6L10 10H7l3 3-1.5 5.5L12 16l3.5 2.5L14 13l3-3h-3L12 6z"
          fill="#7c5cfc"
        />
      </svg>
    ),
  },
  {
    label: "Learn & grow every day",
    description:
      "We invest in your growth with mentorship, learning budgets, and a culture of feedback.",
    color: "#818cf8",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Remote-first & flexible",
    description:
      "Work from anywhere with flexible hours and a healthy work-life balance.",
    color: "#a78bfa",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    label: "People & culture",
    description:
      "Join a team that values trust, collaboration, diversity, and continuous improvement.",
    color: "#c4b5fd",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

// ─── 3D tilt card with mouse-tracked glow ────────────────────────────────────
function ReasonCard({
  item,
  index,
  visible,
}: {
  item: (typeof reasons)[0];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [trailDots, setTrailDots] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const trailRef = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (r.height / 2)) * -9,
      y: ((e.clientX - cx) / (r.width / 2)) * 9,
    });
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    setGlow({ x: px, y: py });

    // trail dot
    const dot = {
      id: Date.now() + Math.random(),
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    };
    setTrailDots((d) => [...d.slice(-6), dot]);
    clearTimeout(trailRef.current);
    trailRef.current = setTimeout(() => setTrailDots([]), 400);
  }, []);

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setTrailDots([]);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 200px",
        maxWidth: 280,
        minWidth: 180,
        perspective: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(.34,1.3,.64,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(160deg,#1c1648,#141035)"
            : "linear-gradient(160deg,#14112e,#0f0d26)",
          border: hovered
            ? `1px solid ${item.color}55`
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 18,
          padding: "clamp(18px,2.8vw,26px) clamp(16px,2.5vw,22px)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(14px,2vw,20px)",
          position: "relative",
          overflow: "hidden",
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.08s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s"
            : "transform 0.55s cubic-bezier(.4,0,.2,1), border-color 0.3s, background 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? `0 24px 52px rgba(0,0,0,0.5), 0 0 32px ${item.color}25`
            : "0 4px 20px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
          cursor: "default",
        }}
      >
        {/* Mouse-tracked spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: 18,
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${item.color}22 0%, transparent 52%)`,
            }}
          />
        )}

        {/* Trail dots */}
        {trailDots.map((dot, di) => (
          <div
            key={dot.id}
            style={{
              position: "absolute",
              left: dot.x - 3,
              top: dot.y - 3,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: item.color,
              opacity: ((di + 1) / trailDots.length) * 0.5,
              pointerEvents: "none",
              filter: `blur(2px)`,
              transform: `scale(${0.4 + (di / trailDots.length) * 0.6})`,
              transition: "opacity 0.3s ease",
            }}
          />
        ))}

        {/* Icon */}
        <div
          style={{
            width: "clamp(44px,6.5vw,54px)",
            height: "clamp(44px,6.5vw,54px)",
            borderRadius: "clamp(11px,1.5vw,15px)",
            background: hovered ? `${item.color}28` : "rgba(124,92,252,0.12)",
            border: hovered
              ? `1px solid ${item.color}60`
              : "1px solid rgba(124,92,252,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: `translateZ(${hovered ? 18 : 0}px) ${hovered ? "scale(1.1)" : "scale(1)"}`,
            boxShadow: hovered ? `0 0 22px ${item.color}45` : "none",
            flexShrink: 0,
          }}
        >
          {item.icon}
        </div>

        {/* Label */}
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(14px,1.9vw,16.5px)",
            fontWeight: 700,
            color: hovered ? "white" : "rgba(255,255,255,0.88)",
            letterSpacing: "-0.2px",
            lineHeight: 1.3,
            transform: `translateZ(${hovered ? 10 : 0}px)`,
            transition: "transform 0.3s ease, color 0.25s",
          }}
        >
          {item.label}
        </h3>

        {/* Description */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(11.5px,1.4vw,13px)",
            color: hovered
              ? "rgba(255,255,255,0.52)"
              : "rgba(255,255,255,0.38)",
            lineHeight: 1.72,
            transform: `translateZ(${hovered ? 6 : 0}px)`,
            transition: "transform 0.3s ease, color 0.25s",
          }}
        >
          {item.description}
        </p>

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
            opacity: hovered ? 0.7 : 0,
            transition: "opacity 0.35s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WhyJoin() {
  const [visible, setVisible] = useState(false);
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
        width: "100%",
        background: "linear-gradient(160deg,#09091a,#0d0b22 50%,#09091a)",
        padding: "clamp(56px,8vw,96px) clamp(16px,5vw,48px)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "65%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(32px,5vw,56px)",
          animation: visible ? "fadeUp 0.65s ease both" : "none",
          opacity: visible ? 1 : 0,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(22px,4vw,34px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.4px",
          }}
        >
          Why join Operino?
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(12px,2vw,18px)",
          justifyContent: "center",
          maxWidth: 1080,
          margin: "0 auto",
          perspective: 1200,
        }}
      >
        {reasons.map((item, i) => (
          <ReasonCard
            key={item.label}
            item={item}
            index={i}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}
