import { useState, useEffect, useRef, useCallback } from "react";

const solutions = [
  {
    title: "AI Product Recommendations",
    desc: "Show the right products to the right customers and increase conversions.",
    color: "#7c5cfc",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Smart Search & Discovery",
    desc: "AI-powered search understands intent and helps users find what they need.",
    color: "#818cf8",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11h6M11 8v6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "AI Chatbot & Support",
    desc: "Provide 24/7 support, answer FAQs, and help customers instantly.",
    color: "#a78bfa",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Cart Abandonment Recovery",
    desc: "AI identifies abandoned carts and sends personalized reminders.",
    color: "#c4b5fd",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "Demand Forecasting & Inventory",
    desc: "Predict demand and optimize inventory to never miss a selling opportunity.",
    color: "#818cf8",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Dynamic Pricing Optimization",
    desc: "AI adjusts prices in real-time to maximize revenue and competitiveness.",
    color: "#7c5cfc",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M16 8h-6a2 2 0 000 4h4a2 2 0 010 4H8M12 6v2m0 8v2" />
      </svg>
    ),
  },
];

// ── 3D Tilt Card ──────────────────────────────────────────────────────────────
function SolutionCard({
  item,
  index,
  visible,
}: {
  item: (typeof solutions)[0];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );
  const trailTimer = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (r.height / 2)) * -8,
      y: ((e.clientX - cx) / (r.width / 2)) * 8,
    });
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
    // trail
    const dot = {
      id: Date.now() + Math.random(),
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    };
    setTrail((t) => [...t.slice(-5), dot]);
    if (trailTimer.current !== null) {
      clearTimeout(trailTimer.current);
    }
    trailTimer.current = window.setTimeout(() => setTrail([]), 350);
  }, []);

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setTrail([]);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 150px",
        perspective: 800,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s cubic-bezier(.34,1.3,.64,1) ${index * 0.08}s`,
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
          borderRadius: 16,
          padding: "clamp(16px,2.2vw,22px)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.08s ease, border-color 0.25s, background 0.25s, box-shadow 0.25s"
            : "transform 0.5s cubic-bezier(.4,0,.2,1), border-color 0.25s, background 0.25s, box-shadow 0.25s",
          boxShadow: hovered
            ? `0 20px 44px rgba(0,0,0,0.5), 0 0 28px ${item.color}22`
            : "0 4px 18px rgba(0,0,0,0.3)",
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
              borderRadius: 16,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${item.color}22 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Mouse trail dots */}
        {trail.map((dot, di) => (
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
              opacity: ((di + 1) / trail.length) * 0.4,
              pointerEvents: "none",
              filter: "blur(1.5px)",
              transform: `scale(${0.4 + (di / trail.length) * 0.6})`,
            }}
          />
        ))}

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
            opacity: hovered ? 0.8 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 13,
            flexShrink: 0,
            background: hovered ? `${item.color}28` : `${item.color}14`,
            border: hovered
              ? `1px solid ${item.color}60`
              : `1px solid ${item.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            transition: "all 0.28s ease",
            transform: `translateZ(${hovered ? 16 : 0}px) ${hovered ? "scale(1.08)" : "scale(1)"}`,
            boxShadow: hovered ? `0 0 18px ${item.color}45` : "none",
          }}
        >
          {item.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(13px,1.5vw,15px)",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.3,
            letterSpacing: "-0.15px",
            transform: `translateZ(${hovered ? 8 : 0}px)`,
            transition: "transform 0.28s ease",
          }}
        >
          {item.title}
        </h3>

        {/* Desc */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(11px,1.2vw,12.5px)",
            color: hovered
              ? "rgba(255,255,255,0.55)"
              : "rgba(255,255,255,0.38)",
            lineHeight: 1.65,
            transition: "color 0.25s",
            transform: `translateZ(${hovered ? 4 : 0}px)`,
          }}
        >
          {item.desc}
        </p>

        {/* Bottom underline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
            opacity: hovered ? 0.6 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AISolutions() {
  const [visible, setVisible] = useState(false);
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

  return (
    <div
      ref={ref}
      style={{
        width: "70%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(32px,5vw,56px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP   { 0%,100%{opacity:0.22} 50%{opacity:0.45} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "80%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowP 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          margin: "0 0 clamp(20px,3.5vw,36px)",
          fontSize: "clamp(16px,2.2vw,22px)",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.2px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        AI Solutions for E-commerce
      </h2>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: "clamp(10px,1.6vw,16px)",
          flexWrap: "wrap",
          perspective: 1200,
          alignItems: "stretch",
        }}
      >
        {solutions.map((s, i) => (
          <SolutionCard key={s.title} item={s} index={i} visible={visible} />
        ))}
      </div>
    </div>
  );
}
