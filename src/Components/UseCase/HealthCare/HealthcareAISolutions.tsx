import { useState, useEffect, useRef, useCallback } from "react";

const solutions = [
  {
    title: "AI Patient Assistant",
    desc: "Answer patient questions, provide guidance, and escalate when needed.",
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
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Appointment Scheduling",
    desc: "Automate booking, reminders, and rescheduling with natural conversations.",
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
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path
          d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Symptom Checker",
    desc: "Collect symptoms and provide smart triage recommendations.",
    color: "#a78bfa",
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
        <path d="M9 12l2 2 4-4" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Follow-up Automation",
    desc: "Send post-visit instructions, medication reminders, and follow-up messages.",
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
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Document & Note AI",
    desc: "Generate summaries and notes from conversations and visit data.",
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
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

// ── Card with magnetic hover + ink drop ──────────────────────────────────────
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
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [inkDrops, setInkDrops] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const inkTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (r.height / 2)) * -8,
      y: ((e.clientX - cx) / (r.width / 2)) * 8,
    });
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
    // ink drops on move
    if (Math.random() > 0.72) {
      const drop = {
        id: Date.now() + Math.random(),
        x: e.clientX - r.left,
        y: e.clientY - r.top,
      };
      setInkDrops((d) => [...d.slice(-4), drop]);
      clearTimeout(inkTimer.current);
      inkTimer.current = setTimeout(() => setInkDrops([]), 500);
    }
  }, []);

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setInkDrops([]);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        margin: "0 auto",
        flex: "1 1 160px",
        minWidth: 100,
        maxWidth: 230,
        perspective: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${index * 0.09}s, transform 0.55s cubic-bezier(.34,1.3,.64,1) ${index * 0.09}s`,
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(160deg,#1c1648,#141035)"
            : "linear-gradient(160deg,#13112b,#0f0d24)",
          border: hovered
            ? `1px solid ${item.color}50`
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "clamp(16px,2.2vw,22px)",
          display: "flex",
          flexDirection: "column",
          gap: 13,
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
            ? `0 20px 40px rgba(0,0,0,0.5), 0 0 26px ${item.color}20`
            : "0 4px 16px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
          cursor: "default",
        }}
      >
        {/* tracked spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%,${item.color}22 0%,transparent 52%)`,
            }}
          />
        )}

        {/* ink drops */}
        {inkDrops.map((d, di) => (
          <div
            key={d.id}
            style={{
              position: "absolute",
              left: d.x - 5,
              top: d.y - 5,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: item.color,
              opacity: ((di + 1) / inkDrops.length) * 0.35,
              pointerEvents: "none",
              filter: `blur(3px)`,
              transform: `scale(${0.3 + (di / inkDrops.length) * 0.7})`,
              transition: "opacity 0.3s ease",
            }}
          />
        ))}

        {/* top shimmer line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
            opacity: hovered ? 0.8 : 0,
            transition: "opacity 0.28s",
          }}
        />

        {/* icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 13,
            background: hovered ? `${item.color}28` : `${item.color}14`,
            border: hovered
              ? `1px solid ${item.color}60`
              : `1px solid ${item.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: item.color,
            flexShrink: 0,
            transition: "all 0.28s ease",
            transform: `translateZ(${hovered ? 16 : 0}px) ${hovered ? "scale(1.1)" : "scale(1)"}`,
            boxShadow: hovered ? `0 0 18px ${item.color}45` : "none",
          }}
        >
          {item.icon}
        </div>

        {/* title */}
        <h3
          style={{
            margin: 0,
            fontSize: "clamp(13px,1.4vw,14.5px)",
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

        {/* desc */}
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

        {/* bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "12%",
            right: "12%",
            height: 2,
            borderRadius: 2,
            background: `linear-gradient(90deg,transparent,${item.color},transparent)`,
            opacity: hovered ? 0.55 : 0,
            transition: "opacity 0.28s",
          }}
        />
      </div>
    </div>
  );
}

export default function HealthcareAISolutions() {
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
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(28px,4.5vw,52px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP  { 0%,100%{opacity:0.22} 50%{opacity:0.44} }
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
            "radial-gradient(ellipse,rgba(80,40,200,0.06) 0%,transparent 65%)",
          animation: "glowP 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* title */}
      <h2
        style={{
          textAlign: "center",
          margin: "0 0 clamp(18px,3vw,32px)",
          fontSize: "clamp(16px,2.2vw,21px)",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.15px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        AI solutions for better healthcare
      </h2>

      {/* cards */}
      <div
        style={{
          display: "flex",
          gap: "clamp(10px,1.6vw,14px)",
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
