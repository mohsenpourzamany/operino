import { useState, useEffect, useRef } from "react";

// ── Integration data ──────────────────────────────────────────────────────────
// angle: degrees (0 = right, 90 = bottom, 180 = left, 270 = top)
// dist: % of half the container
const nodes = [
  {
    id: "slack",
    label: "Slack",
    sub: "Team Collaboration",
    angle: 270,
    dist: 58,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24">
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
    id: "gsheets",
    label: "Google Sheets",
    sub: "Spreadsheets",
    angle: 320,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#0F9D58" />
        <rect x="5" y="6" width="14" height="12" rx="1" fill="white" />
        <line
          x1="5"
          y1="9.5"
          x2="19"
          y2="9.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="5"
          y1="12.5"
          x2="19"
          y2="12.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="5"
          y1="15.5"
          x2="19"
          y2="15.5"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
        <line
          x1="10"
          y1="6"
          x2="10"
          y2="18"
          stroke="#0F9D58"
          strokeWidth="1.1"
        />
      </svg>
    ),
  },
  {
    id: "hubspot",
    label: "HubSpot",
    sub: "CRM",
    angle: 15,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#FF7A59" />
        <path
          d="M9 7v4.26A2.5 2.5 0 1014.5 14a2.5 2.5 0 00-2-2.45V7H9z"
          fill="white"
        />
        <circle cx="14.5" cy="14" r="2.5" fill="white" fillOpacity="0" />
      </svg>
    ),
  },
  {
    id: "salesforce",
    label: "Salesforce",
    sub: "CRM",
    angle: 55,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 36 24">
        <rect width="36" height="24" rx="5" fill="#00A1E0" />
        <text
          x="18"
          y="16"
          textAnchor="middle"
          fill="white"
          fontSize="9"
          fontWeight="bold"
          fontFamily="Arial"
        >
          Salesforce
        </text>
      </svg>
    ),
  },
  {
    id: "webhooks",
    label: "Webhooks",
    sub: "Real-time Data",
    angle: 100,
    dist: 58,
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(167,139,250,0.9)"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    id: "mailchimp",
    label: "Mailchimp",
    sub: "Marketing",
    angle: 145,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#FFE01B" />
        <path
          d="M12 6c-2 0-4 1.5-4 4 0 1 .4 2 1 2.7-.2.4-.2.8 0 1.2.3.6.9.8 1.5.8h3c.6 0 1.2-.2 1.5-.8.2-.4.2-.8 0-1.2.6-.7 1-1.7 1-2.7 0-2.5-2-4-4-4z"
          fill="#241C15"
        />
      </svg>
    ),
  },
  {
    id: "gmail",
    label: "Gmail",
    sub: "Email",
    angle: 195,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="white" />
        <path d="M2 6l10 7L22 6v14H2z" fill="#EA4335" />
        <path d="M2 6l10 7L22 6" fill="none" stroke="white" strokeWidth="0" />
        <path d="M2 6h20L12 13z" fill="#4285F4" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    sub: "Messaging",
    angle: 235,
    dist: 58,
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#25d366" />
        <path
          fill="white"
          d="M17.5 14.4c-.3-.1-1.7-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.1-.3.2-.5 0-.2 0-.4-.1-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2 3 4.9 4.2.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.1-1.4z"
        />
      </svg>
    ),
  },
];

// ── Traveling dot component ───────────────────────────────────────────────────
function TravelDot({
  pathId,
  delay,
  dur,
  color,
}: {
  pathId: string;
  delay: number;
  dur: string;
  color: string;
}) {
  return (
    <circle
      r="4"
      fill={color}
      style={{ filter: `drop-shadow(0 0 4px ${color})` }}
    >
      <animateMotion
        dur={dur}
        begin={`${delay}s`}
        repeatCount="indefinite"
        calcMode="linear"
      >
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

// ── Node card ─────────────────────────────────────────────────────────────────
function NodeCard({
  node,
  cx,
  cy,
  containerSize,
  hovered,
  onHover,
}: {
  node: (typeof nodes)[0];
  cx: number;
  cy: number;
  containerSize: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
}) {
  // Fixed card size — all cards same dimensions so center-to-center distance is equal
  const cardW = Math.max(78, containerSize * 0.155);
  const cardH = Math.max(72, containerSize * 0.148);

  return (
    <div
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        position: "absolute",
        left: cx - cardW / 2,
        top: cy - cardH / 2,
        width: cardW,
        height: cardH,
        background: hovered
          ? "linear-gradient(145deg,#1e1848,#16123a)"
          : "linear-gradient(145deg,#11102a,#0d0c20)",
        border: hovered
          ? "1px solid rgba(124,92,252,0.6)"
          : "1px solid rgba(255,255,255,0.1)",
        borderRadius: Math.max(12, containerSize * 0.025),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        cursor: "default",
        transition: "all 0.28s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        boxShadow: hovered
          ? "0 12px 32px rgba(124,92,252,0.35), 0 0 24px rgba(124,92,252,0.15)"
          : "0 4px 18px rgba(0,0,0,0.5)",
        zIndex: 5,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* icon */}
      <div
        style={{
          width: cardW * 0.42,
          height: cardW * 0.42,
          borderRadius: Math.max(8, cardW * 0.1),
          background: "rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: hovered ? "0 0 12px rgba(124,92,252,0.3)" : "none",
          transition: "box-shadow 0.28s",
        }}
      >
        {node.icon}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: Math.max(10, cardW * 0.115),
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          lineHeight: 1.2,
          paddingInline: 4,
        }}
      >
        {node.label}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: Math.max(8.5, cardW * 0.094),
          color: "rgba(255,255,255,0.42)",
          textAlign: "center",
        }}
      >
        {node.sub}
      </p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function IntegrationNetwork() {
  const [size, setSize] = useState(500);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const obsRef = useRef<HTMLDivElement>(null);

  // responsive size
  useEffect(() => {
    const update = () => {
      if (wrapRef.current) setSize(wrapRef.current.offsetWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // visibility
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (obsRef.current) obs.observe(obsRef.current);
    return () => obs.disconnect();
  }, []);

  const C = size / 2; // center

  return (
    <div
      ref={obsRef}
      style={{
        width: "80%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        padding: "clamp(32px,5vw,64px) clamp(16px,4vw,60px)",
      }}
    >
      <style>{`
        @keyframes coreBreath  { 0%,100%{box-shadow:0 0 28px rgba(124,92,252,0.55),0 0 56px rgba(124,92,252,0.22)} 50%{box-shadow:0 0 52px rgba(124,92,252,0.9),0 0 90px rgba(124,92,252,0.4)} }
        @keyframes ringPulse0  { 0%,100%{opacity:0.45;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.75;transform:translate(-50%,-50%) scale(1.02)} }
        @keyframes ringPulse1  { 0%,100%{opacity:0.28;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.5;transform:translate(-50%,-50%) scale(1.03)} }
        @keyframes ringPulse2  { 0%,100%{opacity:0.15;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.3;transform:translate(-50%,-50%) scale(1.04)} }
        @keyframes spinDash    { from{stroke-dashoffset:0} to{stroke-dashoffset:-100} }
        @keyframes glowBg      { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
        @keyframes nodeIn      { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* diagram wrapper — square aspect */}
      <div
        ref={wrapRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 580,
          aspectRatio: "1 / 1",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {/* ── SVG layer: rings + lines + traveling dots ── */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            {/* radial gradient for glow */}
            <radialGradient id="coreRadial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#7c5cfc" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
            </radialGradient>
            {/* path defs for traveling dots */}
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = (node.dist / 100) * C;
              const ex = C + Math.cos(rad) * r;
              const ey = C + Math.sin(rad) * r;
              return (
                <path
                  key={`def-${node.id}`}
                  id={`line-${node.id}`}
                  d={`M${C} ${C} L${ex} ${ey}`}
                  fill="none"
                />
              );
            })}
          </defs>

          {/* outer glow circle */}
          <circle
            cx={C}
            cy={C}
            r={size * 0.29}
            fill="url(#coreRadial)"
            opacity="0.8"
          />

          {/* concentric rings */}
          {[0.41, 0.31, 0.22].map((r, i) => (
            <circle
              key={i}
              cx={C}
              cy={C}
              r={size * r}
              fill="none"
              stroke={`rgba(124,92,252,${0.18 - i * 0.04})`}
              strokeWidth="1"
            />
          ))}

          {/* spinning dashed ring */}
          <circle
            cx={C}
            cy={C}
            r={size * 0.26}
            fill="none"
            stroke="rgba(167,139,250,0.22)"
            strokeWidth="1.2"
            strokeDasharray="4 7"
            style={{
              animation: "spinDash 18s linear infinite",
              transformOrigin: `${C}px ${C}px`,
            }}
          />

          {/* lines + dots */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const r = (node.dist / 100) * C;
            const ex = C + Math.cos(rad) * r;
            const ey = C + Math.sin(rad) * r;
            const isHov = hovered === node.id;

            return (
              <g key={node.id}>
                {/* line */}
                <line
                  x1={C}
                  y1={C}
                  x2={ex}
                  y2={ey}
                  stroke={
                    isHov ? "rgba(167,139,250,0.6)" : "rgba(124,92,252,0.25)"
                  }
                  strokeWidth={isHov ? 2 : 1.3}
                  strokeDasharray="5 5"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                {/* mid node dot */}
                <circle
                  cx={C + Math.cos(rad) * r * 0.5}
                  cy={C + Math.sin(rad) * r * 0.5}
                  r={isHov ? 4.5 : 3.5}
                  fill={isHov ? "#c4b5fd" : "#7c5cfc"}
                  style={{
                    filter: `drop-shadow(0 0 ${isHov ? 6 : 4}px #7c5cfc)`,
                    transition: "all 0.3s",
                  }}
                />
                {/* traveling dots */}
                {[0, 0.45, 0.9].map((off, j) => (
                  <TravelDot
                    key={j}
                    pathId={`line-${node.id}`}
                    delay={off * 0.7}
                    dur={`${2 + i * 0.18}s`}
                    color={isHov ? "#c4b5fd" : "#a78bfa"}
                  />
                ))}
              </g>
            );
          })}
        </svg>

        {/* ── Center Hub ── */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#4c1d95,#2e1065)",
            border: "2.5px solid rgba(167,139,250,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "coreBreath 2.5s ease-in-out infinite",
            zIndex: 3,
          }}
        >
          {/* Operino logo / G icon */}
          <div
            style={{
              width: size * 0.1,
              height: size * 0.1,
              borderRadius: "20%",
              background: "linear-gradient(135deg,#7c5cfc,#5535e8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(124,92,252,0.7)",
            }}
          >
            <svg
              width={size * 0.055}
              height={size * 0.055}
              viewBox="0 0 40 40"
              fill="none"
            >
              <circle
                cx="20"
                cy="20"
                r="17"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.5"
              />
              <path
                d="M28 20h-8v4h4.5A8 8 0 1120 12v0"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Node cards ── */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const r = (node.dist / 100) * C;
          const cx = C + Math.cos(rad) * r;
          const cy = C + Math.sin(rad) * r;
          return (
            <NodeCard
              key={node.id}
              node={node}
              cx={cx}
              cy={cy}
              containerSize={size}
              hovered={hovered === node.id}
              onHover={setHovered}
            />
          );
        })}
      </div>
    </div>
  );
}
