import { useState, useEffect, useRef, useCallback } from "react";

const solutions = [
  {
    title: "AI Teaching Assistant",
    desc: "Assist educators in creating lesson plans, quizzes, and study materials.",
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
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Automated Grading",
    desc: "Grade assignments and quizzes instantly with AI accuracy.",
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
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 13l2 2 4-4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Student Support Bot",
    desc: "Answer student questions 24/7 and guide them to the right resources.",
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
    title: "Learning Analytics",
    desc: "Track student progress and identify improvement opportunities.",
    color: "#818cf8",
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
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Parent Engagement",
    desc: "Keep parents informed with automated updates and reports.",
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
];

// ── Card with electric border effect ─────────────────────────────────────────
function SolutionCard({
  item,
  index,
  visible,
}: {
  item: (typeof solutions)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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
  }, []);

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        perspective: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${index * 0.09}s, transform 0.55s cubic-bezier(.34,1.3,.64,1) ${index * 0.09}s`,
      }}
    >
      {/* electric border wrapper */}
      <div
        style={{
          borderRadius: 16,
          padding: "1.5px",
          background: hovered
            ? `linear-gradient(135deg,${item.color},transparent,${item.color}88,transparent)`
            : "linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))",
          backgroundSize: hovered ? "300% 300%" : "100% 100%",
          animation: hovered ? "borderSpin 2s linear infinite" : "none",
          boxShadow: hovered ? `0 0 20px ${item.color}30` : "none",
          transition: "box-shadow 0.3s",
          height: "100%",
        }}
      >
        <div
          style={{
            background: hovered
              ? "linear-gradient(160deg,#1c1648,#141035)"
              : "linear-gradient(160deg,#13112b,#0f0d24)",
            borderRadius: 15,
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
              ? "transform 0.08s ease, background 0.25s"
              : "transform 0.5s cubic-bezier(.4,0,.2,1), background 0.25s",
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
                borderRadius: 15,
                pointerEvents: "none",
                background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${item.color}20 0%, transparent 52%)`,
              }}
            />
          )}

          {/* icon */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              flexShrink: 0,
              background: hovered ? `${item.color}28` : `${item.color}14`,
              border: hovered
                ? `1px solid ${item.color}60`
                : `1px solid ${item.color}28`,
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
        </div>
      </div>
    </div>
  );
}

export default function EducationAISolutions() {
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
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(28px,4.5vw,52px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP     { 0%,100%{opacity:0.22} 50%{opacity:0.44} }
        @keyframes borderSpin{ from{background-position:0% 50%} to{background-position:300% 50%} }
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
        AI solutions for modern education
      </h2>

      {/* cards — centered, 5px gap */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
          maxWidth: 1100,
          margin: "0 auto",
          perspective: 1200,
        }}
      >
        {solutions.map((s, i) => (
          <SolutionCard key={s.title} item={s} index={i} visible={visible} />
        ))}
      </div>
    </div>
  );
}
