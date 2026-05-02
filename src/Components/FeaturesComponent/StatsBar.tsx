/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const UsersIcon = ({ color }: { color: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const RobotIcon = ({ color }: { color: string }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect
      x="5"
      y="8"
      width="14"
      height="10"
      rx="3"
      stroke={color}
      strokeWidth="1.8"
    />
    <path
      d="M9 12h.01M15 12h.01"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M9 15s1 1 3 1 3-1 3-1"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <line
      x1="12"
      y1="8"
      x2="12"
      y2="5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="4" r="1.2" fill={color} />
    <line
      x1="5"
      y1="12"
      x2="2"
      y2="12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <line
      x1="19"
      y1="12"
      x2="22"
      y2="12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const ChatIcon = ({ color }: { color: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <circle cx="9" cy="10" r="1" fill={color} stroke="none" />
    <circle cx="12" cy="10" r="1" fill={color} stroke="none" />
    <circle cx="15" cy="10" r="1" fill={color} stroke="none" />
  </svg>
);
const GlobeIcon = ({ color }: { color: string }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const stats: Stat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "Active Users",
    color: "#a78bfa",
    icon: null,
  },
  {
    value: 50000,
    suffix: "+",
    label: "AI Agents Created",
    color: "#818cf8",
    icon: null,
  },
  {
    value: 1000000,
    suffix: "+",
    label: "Conversations Automated",
    color: "#c4b5fd",
    icon: null,
  },
  { value: 100, suffix: "+", label: "Countries", color: "#a78bfa", icon: null },
];

const icons = [
  (c: string) => <UsersIcon color={c} />,
  (c: string) => <RobotIcon color={c} />,
  (c: string) => <ChatIcon color={c} />,
  (c: string) => <GlobeIcon color={c} />,
];

// ─── Format number display ─────────────────────────────────────────────────
function formatNum(val: number, max: number): string {
  if (max >= 1_000_000)
    return (val / 1_000_000).toFixed(val >= 1_000_000 ? 0 : 1) + "M";
  if (max >= 10_000) return (val / 1000).toFixed(val >= 10_000 ? 0 : 1) + "K";
  return val.toString();
}

// ─── Single stat card ──────────────────────────────────────────────────────
function StatCard({
  stat,
  iconFn,
  index,
  trigger,
}: {
  stat: Stat;
  iconFn: (c: string) => React.ReactNode;
  index: number;
  trigger: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const rafRef = useRef<number>(0);

  // entrance
  useEffect(() => {
    if (trigger) setTimeout(() => setVisible(true), index * 120);
  }, [trigger, index]);

  // count-up
  useEffect(() => {
    if (!trigger) return;
    const delay = 300 + index * 150;
    const duration = 1800;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts + delay;
      const elapsed = ts - start;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * stat.value));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, stat.value, index]);

  // particle burst on hover
  const handleMouseEnter = () => {
    setHovered(true);
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * -50 - 10,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  const isLast = index === stats.length - 1;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "20px 28px",
        position: "relative",
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.07)",
        transform: visible
          ? hovered
            ? "scale(1.03)"
            : "scale(1)"
          : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.5s ease",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* hover bg glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `radial-gradient(ellipse at 40% 50%, ${stat.color}14 0%, transparent 70%)`
            : "transparent",
          transition: "background 0.4s ease",
          pointerEvents: "none",
        }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: "40%",
            left: "14%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: stat.color,
            pointerEvents: "none",
            animation: "particleBurst 0.7s ease-out forwards",
            // @ts-ignore
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
            opacity: 0.8,
            zIndex: 10,
            boxShadow: `0 0 6px ${stat.color}`,
          }}
        />
      ))}

      {/* Icon box */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          flexShrink: 0,
          background: hovered
            ? `linear-gradient(135deg,${stat.color}30,${stat.color}15)`
            : "rgba(255,255,255,0.05)",
          border: hovered
            ? `1px solid ${stat.color}60`
            : "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          transform: hovered
            ? "rotate(-8deg) scale(1.1)"
            : "rotate(0) scale(1)",
          boxShadow: hovered ? `0 6px 20px ${stat.color}30` : "none",
        }}
      >
        {iconFn(stat.color)}
      </div>

      {/* Text */}
      <div>
        {/* Animated number */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <span
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.5px",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              background: hovered
                ? `linear-gradient(90deg,white,${stat.color})`
                : "none",
              WebkitBackgroundClip: hovered ? "text" : "unset",
              WebkitTextFillColor: hovered ? "transparent" : "white",
              transition: "all 0.3s ease",
            }}
          >
            {formatNum(count, stat.value)}
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p
          style={{
            margin: "4px 0 0",
            fontSize: 12,
            color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.38)",
            fontWeight: 500,
            transition: "color 0.25s",
            whiteSpace: "nowrap",
          }}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function StatsBar() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setTriggered(true);
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#09091a",
        padding: "48px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <style>{`
        @keyframes particleBurst {
          0%   { transform: translate(0,0) scale(1); opacity: 0.8; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes borderFlow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* Card wrapper with animated gradient border */}
      <div
        style={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 20,
          padding: 2,
          background:
            "linear-gradient(90deg,rgba(124,92,252,0.5),rgba(99,102,241,0.3),rgba(167,139,250,0.5),rgba(124,92,252,0.5))",
          backgroundSize: "300% 300%",
          animation: "borderFlow 4s ease infinite",
          boxShadow: "0 8px 40px rgba(124,92,252,0.2)",
        }}
      >
        <div
          ref={ref}
          style={{
            borderRadius: 18,
            background: "linear-gradient(145deg,#111128,#0c0c1e)",
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              iconFn={icons[i]}
              index={i}
              trigger={triggered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
