import { useState, useEffect, useRef } from "react";
import opiworking from "../../../assets/Photos/Opi-Working-1.png";
// ─── Orbiting icon data ────────────────────────────────────────────────────────
const orbitIcons = [
  {
    id: "code",
    angle: 320, // initial degrees (top-left area)
    orbitR: 48, // % of container width as orbit radius
    size: 46,
    color: "#7c5cfc",
    icon: (
      <svg
        width="19"
        height="19"
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
    label: "Code",
    speed: 18, // seconds per orbit
    direction: 1,
  },
  {
    id: "chat",
    angle: 45,
    orbitR: 46,
    size: 46,
    color: "#a78bfa",
    icon: (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    label: "Chat",
    speed: 22,
    direction: 1,
  },
  {
    id: "team",
    angle: 210,
    orbitR: 44,
    size: 44,
    color: "#818cf8",
    icon: (
      <svg
        width="19"
        height="19"
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
    label: "Team",
    speed: 26,
    direction: -1,
  },
  {
    id: "bolt",
    angle: 130,
    orbitR: 46,
    size: 44,
    color: "#c4b5fd",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
      </svg>
    ),
    label: "Speed",
    speed: 20,
    direction: 1,
  },
];

// ─── Culture items ────────────────────────────────────────────────────────────
const cultureItems = [
  {
    label: "Growth Mindset",
    sub: "Learn, grow, repeat",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
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
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    label: "Ship Fast",
    sub: "Ideas into reality quickly",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <path d="M12 2L8 8H4l4 4-2 8 6-4 6 4-2-8 4-4h-4L12 2z" />
      </svg>
    ),
  },
  {
    label: "Open by Default",
    sub: "Radical transparency",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

// ─── Single orbiting icon ─────────────────────────────────────────────────────
function OrbitIcon({
  icon: item,
  containerSize,
  time,
}: {
  icon: (typeof orbitIcons)[0];
  containerSize: number;
  time: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [pulsed, setPulsed] = useState(false);

  // Independent pulse every few seconds
  useEffect(() => {
    const t = setInterval(
      () => {
        setPulsed(true);
        setTimeout(() => setPulsed(false), 500);
      },
      3000 + Math.random() * 2000,
    );
    return () => clearInterval(t);
  }, []);

  // Current angle = initial + time * speed * direction
  const rads =
    ((item.angle + (time / item.speed) * 360 * item.direction) * Math.PI) / 180;
  const orbitPx = (item.orbitR / 100) * containerSize;
  const cx = containerSize / 2 + Math.cos(rads) * orbitPx;
  const cy = containerSize / 2 + Math.sin(rads) * orbitPx;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: cx - item.size / 2,
        top: cy - item.size / 2,
        width: item.size,
        height: item.size,
        borderRadius: 12,
        background:
          hovered || pulsed
            ? `linear-gradient(135deg,${item.color}40,${item.color}20)`
            : "rgba(20,16,50,0.85)",
        border:
          hovered || pulsed
            ? `1px solid ${item.color}90`
            : `1px solid rgba(124,92,252,0.25)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered || pulsed ? item.color : "rgba(167,139,250,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow:
          hovered || pulsed
            ? `0 0 20px ${item.color}60, 0 0 8px ${item.color}30 inset`
            : "0 4px 16px rgba(0,0,0,0.4)",
        transition:
          "background 0.3s, border-color 0.3s, box-shadow 0.3s, color 0.3s, transform 0.3s",
        transform: hovered ? "scale(1.2)" : pulsed ? "scale(1.1)" : "scale(1)",
        cursor: "default",
        zIndex: 4,
      }}
    >
      {item.icon}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LifeAtOperino() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(0);
  const [containerSize, setContainerSize] = useState(420);
  const [hoveredCulture, setHoveredCulture] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Animate time for orbit
  useEffect(() => {
    if (!visible) return;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTime((ts - startRef.current) / 1000);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  // Responsive container size
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerSize(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        // background: "linear-gradient(160deg,#07071a,#0d0b22 50%,#08081a)",
        padding: "clamp(48px,7vw,88px) clamp(16px,5vw,48px)",
        fontFamily: "'Inter',sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes robotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes glowPulse  { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.06)} }
        @keyframes ringPulse  { 0%{opacity:0.12;transform:scale(1)} 100%{opacity:0;transform:scale(1.35)} }
        @keyframes cultureIn  { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "40%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.08) 0%,transparent 65%)",
          animation: "glowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px,5vw,64px)",
          alignItems: "center",
        }}
      >
        {/* ── LEFT: Robot scene ── */}
        <div
          ref={containerRef}
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%", // square aspect
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease",
            marginRight: "70px",
          }}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            {/* Orbit track ring */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: containerSize * 0.96,
                height: containerSize * 0.96,
                transform: "translate(-50%,-50%)",
                borderRadius: "50%",
                border: "1px dashed rgba(124,92,252,0.15)",
                animation: "glowPulse 5s ease-in-out infinite",
              }}
            />
            {/* Pulse rings */}
            {[0, 0.6, 1.2].map((d) => (
              <div
                key={d}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: containerSize * 0.72,
                  height: containerSize * 0.72,
                  transform: "translate(-50%,-50%)",
                  borderRadius: "50%",
                  border: "1px solid rgba(124,92,252,0.3)",
                  animation: `ringPulse 3s ease-out ${d}s infinite`,
                }}
              />
            ))}

            {/* Robot */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "30%",
                transform: "translate(-50%,-50%)",
                width: "clamp(140px,48%,220px)",
                zIndex: 3,
                animation: "robotFloat 4.5s ease-in-out infinite",
              }}
            >
              <img
                src={opiworking}
                alt="Operino Robot Working"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter:
                    "drop-shadow(0 0 32px rgba(124,92,252,0.5)) drop-shadow(0 12px 40px rgba(80,20,180,0.4))",
                }}
              />
              {/* Glow under robot */}
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "70%",
                  height: 20,
                  background:
                    "radial-gradient(ellipse,rgba(124,92,252,0.5) 0%,transparent 70%)",
                  filter: "blur(8px)",
                  animation: "glowPulse 3s ease-in-out infinite",
                }}
              />
            </div>

            {/* Orbiting icons */}
            {orbitIcons.map((item) => (
              <OrbitIcon
                key={item.id}
                icon={item}
                containerSize={containerSize}
                time={time}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Text + culture ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(16px,3vw,28px)",
          }}
        >
          {/* Tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(124,92,252,0.1)",
              border: "1px solid rgba(124,92,252,0.28)",
              borderRadius: 20,
              padding: "5px 14px",
              width: "fit-content",
              animation: visible ? "fadeLeft 0.55s 0.1s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#a78bfa",
                boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "clamp(10px,1.3vw,12px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Life at Operino
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(24px,4.5vw,42px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "white",
              animation: visible ? "fadeLeft 0.6s 0.2s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            A place where great
            <br />
            people do their{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "glowPulse 3s ease-in-out infinite",
              }}
            >
              best work.
            </span>
          </h2>

          {/* Body */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(12.5px,1.6vw,15px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
              animation: visible ? "fadeLeft 0.6s 0.32s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            We move fast, think big, and build products used by thousands of
            businesses every day. At Operino, everyone's voice matters and every
            idea counts.
          </p>

          {/* Culture grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(8px,1.5vw,12px)",
            }}
          >
            {cultureItems.map((item, i) => (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredCulture(item.label)}
                onMouseLeave={() => setHoveredCulture(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "clamp(10px,1.8vw,14px)",
                  borderRadius: 12,
                  background:
                    hoveredCulture === item.label
                      ? "rgba(124,92,252,0.12)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    hoveredCulture === item.label
                      ? "1px solid rgba(124,92,252,0.38)"
                      : "1px solid rgba(255,255,255,0.06)",
                  cursor: "default",
                  transition: "all 0.25s ease",
                  transform:
                    hoveredCulture === item.label
                      ? "translateY(-3px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredCulture === item.label
                      ? "0 8px 24px rgba(124,92,252,0.16)"
                      : "none",
                  animation: visible
                    ? `cultureIn 0.5s ${0.4 + i * 0.08}s ease both`
                    : "none",
                  opacity: visible ? 1 : 0,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    flexShrink: 0,
                    background:
                      hoveredCulture === item.label
                        ? "rgba(124,92,252,0.22)"
                        : "rgba(124,92,252,0.1)",
                    border:
                      hoveredCulture === item.label
                        ? "1px solid rgba(124,92,252,0.45)"
                        : "1px solid rgba(124,92,252,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s",
                    transform:
                      hoveredCulture === item.label
                        ? "rotate(-8deg) scale(1.1)"
                        : "rotate(0) scale(1)",
                    boxShadow:
                      hoveredCulture === item.label
                        ? "0 0 14px rgba(167,139,250,0.4)"
                        : "none",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(11px,1.4vw,13px)",
                      fontWeight: 600,
                      color:
                        hoveredCulture === item.label
                          ? "white"
                          : "rgba(255,255,255,0.75)",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(9.5px,1.2vw,11px)",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 640px) {
          .life-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
