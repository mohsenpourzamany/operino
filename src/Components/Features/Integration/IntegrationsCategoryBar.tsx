import { useState, useEffect, useRef } from "react";

const categories = [
  {
    label: "Communication",
    sub: "Connect everywhere",
    color: "#7c5cfc",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "CRM",
    sub: "Manage relationships",
    color: "#818cf8",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Productivity",
    sub: "Boost your workflow",
    color: "#a78bfa",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
      </svg>
    ),
  },
  {
    label: "Marketing",
    sub: "Grow your audience",
    color: "#f59e0b",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      >
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    sub: "Data-driven insights",
    color: "#34d399",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.5" />
        <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.75" />
        <rect x="17" y="3" width="4" height="18" rx="1" />
      </svg>
    ),
  },
  {
    label: "Developer",
    sub: "APIs & Webhooks",
    color: "#60a5fa",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

function CategoryItem({
  cat,
  index,
  visible,
}: {
  cat: (typeof categories)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        flexShrink: 0,
        padding: "8px 10px",
        borderRadius: 12,
        background: hovered ? `${cat.color}12` : "transparent",
        border: hovered ? `1px solid ${cat.color}35` : "1px solid transparent",
        transition: "all 0.22s ease",
        transform: visible
          ? hovered
            ? "translateY(-3px)"
            : "translateY(0)"
          : "translateY(14px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.06}s`,
        cursor: "default",
      }}
    >
      {/* icon bubble */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: hovered ? `${cat.color}22` : `${cat.color}14`,
          border: hovered
            ? `1px solid ${cat.color}55`
            : `1px solid ${cat.color}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: cat.color,
          flexShrink: 0,
          transition: "all 0.22s ease",
          transform: hovered
            ? "scale(1.1) rotate(-6deg)"
            : "scale(1) rotate(0deg)",
          boxShadow: hovered ? `0 0 14px ${cat.color}40` : "none",
        }}
      >
        {cat.icon}
      </div>

      {/* text */}
      <div>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: "clamp(12px,1.3vw,13.5px)",
            fontWeight: 700,
            color: hovered ? "white" : "rgba(255,255,255,0.8)",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {cat.label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(10px,1.1vw,11.5px)",
            color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.32)",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {cat.sub}
        </p>
      </div>
    </div>
  );
}

export default function IntegrationsCategoryBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "68%",
        background: "linear-gradient(145deg,#11102a,#0d0c22)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(14px,2vw,20px) clamp(16px,2.5vw,28px)",
        overflow: "hidden",
        position: "relative",
        margin: "60px auto 60px",
      }}
    >
      <style>{`
        @keyframes shimmerLine { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes countUp     { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes dotBlink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes glowPulse   { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        * { box-sizing:border-box; }
      `}</style>

      {/* subtle top shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(124,92,252,0.4),transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translate(-50%,-50%)",
          width: "40%",
          height: "200%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.06) 0%,transparent 65%)",
          animation: "glowPulse 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(8px,1.5vw,14px)",
          overflowX: "auto",
          scrollbarWidth: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── 100+ badge ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
            paddingRight: "clamp(14px,2vw,22px)",
            borderRight: "1px solid rgba(255,255,255,0.09)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition:
              "opacity 0.5s ease 0s, transform 0.5s cubic-bezier(.34,1.2,.64,1) 0s",
          }}
        >
          {/* icon */}
          <div style={{ position: "relative" }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7c5cfc"
              strokeWidth="1.7"
            >
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            {/* pulse dot */}
            <div
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#7c5cfc",
                boxShadow: "0 0 6px rgba(124,92,252,0.8)",
                animation: "dotBlink 2s ease-in-out infinite",
              }}
            />
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(20px,2.5vw,26px)",
                fontWeight: 900,
                color: "white",
                lineHeight: 1,
                background: "linear-gradient(90deg,#a78bfa,#7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: visible ? "countUp 0.5s ease both" : "none",
              }}
            >
              100+
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(9.5px,1.1vw,11px)",
                color: "rgba(255,255,255,0.35)",
                lineHeight: 1.4,
              }}
            >
              Integrations
              <br />
              and counting
            </p>
          </div>
        </div>

        {/* ── Category items ── */}
        {categories.map((cat, i) => (
          <CategoryItem
            key={cat.label}
            cat={cat}
            index={i + 1}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}
