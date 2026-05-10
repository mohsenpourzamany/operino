import { useState, useEffect, useRef } from "react";

const tools = [
  {
    name: "Slack",
    color: "#E01E5A",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z"
          fill="#E01E5A"
        />
        <path
          d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.527 2.527 0 012.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 012.521 2.521 2.527 2.527 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z"
          fill="#36C5F0"
        />
        <path
          d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.527 2.527 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.527 2.527 0 01-2.521 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.167 0a2.528 2.528 0 012.521 2.522v6.312z"
          fill="#2EB67D"
        />
        <path
          d="M15.167 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.167 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 01-2.521-2.521 2.527 2.527 0 012.521-2.521h6.312A2.528 2.528 0 0124 15.167a2.528 2.528 0 01-2.521 2.521h-6.312z"
          fill="#ECB22E"
        />
      </svg>
    ),
  },
  {
    name: "Intercom",
    color: "#1F8FFF",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="5" fill="#1F8FFF" />
        <path
          d="M4 5.5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H8l-4 4V5.5z"
          fill="white"
          opacity="0.9"
        />
        <circle cx="8" cy="10" r="1.2" fill="#1F8FFF" />
        <circle cx="12" cy="10" r="1.2" fill="#1F8FFF" />
        <circle cx="16" cy="10" r="1.2" fill="#1F8FFF" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    color: "#FF4A00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF4A00" />
        <path
          d="M12 4l2.1 5.5 5.9.5-4.5 3.9 1.4 5.8L12 16.5l-4.9 3.2 1.4-5.8L4 10l5.9-.5z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "HubSpot",
    color: "#FF7A59",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#FF7A59" />
        <path
          d="M9 7v4.26A2.5 2.5 0 1014.5 14a2.5 2.5 0 00-2-2.45V7H9z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    name: "Google Analytics",
    color: "#F9AB00",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect x="3" y="12" width="4" height="9" rx="1.5" fill="#F9AB00" />
        <rect x="10" y="7" width="4" height="14" rx="1.5" fill="#E37400" />
        <rect
          x="17"
          y="3"
          width="4"
          height="18"
          rx="1.5"
          fill="#E37400"
          opacity="0.8"
        />
      </svg>
    ),
  },
  {
    name: "Segment",
    color: "#52BD94",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11" fill="#52BD94" />
        <path
          d="M7 12h10M12 7l5 5-5 5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "SendGrid",
    color: "#1A82E2",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#1A82E2" />
        <rect
          x="3"
          y="3"
          width="8"
          height="8"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="13"
          y="3"
          width="8"
          height="8"
          rx="1.5"
          fill="white"
          opacity="0.45"
        />
        <rect
          x="3"
          y="13"
          width="8"
          height="8"
          rx="1.5"
          fill="white"
          opacity="0.45"
        />
        <rect
          x="13"
          y="13"
          width="8"
          height="8"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
      </svg>
    ),
  },
];

function ToolChip({
  tool,
  index,
  visible,
}: {
  tool: (typeof tools)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const r = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((rs) => [...rs, r]);
    setTimeout(() => setRipples((rs) => rs.filter((x) => x.id !== r.id)), 600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "10px 16px",
        borderRadius: 11,
        background: hovered
          ? `linear-gradient(135deg,${tool.color}18,${tool.color}08)`
          : "rgba(255,255,255,0.05)",
        border: hovered
          ? `1px solid ${tool.color}55`
          : "1px solid rgba(255,255,255,0.1)",
        cursor: "default",
        flexShrink: 0,
        whiteSpace: "nowrap",
        position: "relative",
        overflow: "hidden",
        transition:
          "background 0.22s, border-color 0.22s, transform 0.25s, box-shadow 0.25s",
        transform: visible
          ? hovered
            ? "translateY(-5px) scale(1.04)"
            : "translateY(0) scale(1)"
          : "translateY(16px) scale(0.94)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.06}s` : "0s",
        boxShadow: hovered ? `0 10px 24px ${tool.color}28` : "none",
      }}
    >
      {/* ripple */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: "absolute",
            left: r.x - 16,
            top: r.y - 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: `${tool.color}40`,
            animation: "rippleOut 0.6s ease-out forwards",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* icon */}
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 7,
          overflow: "hidden",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.25s",
          transform: hovered
            ? "scale(1.12) rotate(-6deg)"
            : "scale(1) rotate(0deg)",
        }}
      >
        {tool.icon}
      </div>

      {/* name */}
      <span
        style={{
          fontSize: "clamp(12px,1.3vw,13.5px)",
          fontWeight: 600,
          color: hovered ? "white" : "rgba(255,255,255,0.72)",
          transition: "color 0.22s",
        }}
      >
        {tool.name}
      </span>

      {/* bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "15%",
          right: "15%",
          height: 2,
          borderRadius: 2,
          background: `linear-gradient(90deg,transparent,${tool.color},transparent)`,
          opacity: hovered ? 0.75 : 0,
          transition: "opacity 0.25s",
        }}
      />
    </div>
  );
}

function MoreChip({ visible }: { visible: boolean }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 16px",
        borderRadius: 11,
        flexShrink: 0,
        background: h ? "rgba(124,92,252,0.12)" : "rgba(255,255,255,0.04)",
        border: h
          ? "1px solid rgba(124,92,252,0.45)"
          : "1px dashed rgba(255,255,255,0.2)",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: visible
          ? h
            ? "translateY(-5px) scale(1.04)"
            : "translateY(0)"
          : "translateY(16px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${tools.length * 0.06}s` : "0s",
        boxShadow: h ? "0 10px 24px rgba(124,92,252,0.2)" : "none",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          fontSize: "clamp(12px,1.3vw,13.5px)",
          fontWeight: 700,
          background: h ? "linear-gradient(90deg,#a78bfa,#7c5cfc)" : "none",
          WebkitBackgroundClip: h ? "text" : "unset",
          WebkitTextFillColor: h ? "transparent" : "rgba(255,255,255,0.5)",
          transition: "all 0.22s",
        }}
      >
        + 100+ more
      </span>
    </div>
  );
}

export default function SaaSIntegrations() {
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
        width: "100%",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(24px,4vw,44px) clamp(16px,4vw,40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(14px,2.2vw,22px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP   { 0%,100%{opacity:0.22} 50%{opacity:0.45} }
        @keyframes rippleOut{ from{transform:scale(0);opacity:1} to{transform:scale(5);opacity:0} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60%",
          height: "200%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowP 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* title */}
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(15px,2vw,20px)",
          fontWeight: 700,
          color: "white",
          letterSpacing: "-0.15px",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          position: "relative",
          zIndex: 1,
        }}
      >
        Seamlessly integrates with your favorite tools
      </h2>

      {/* chips */}
      <div
        style={{
          display: "flex",
          gap: "clamp(7px,1.1vw,10px)",
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {tools.map((tool, i) => (
          <ToolChip key={tool.name} tool={tool} index={i} visible={visible} />
        ))}
        <MoreChip visible={visible} />
      </div>
    </div>
  );
}
