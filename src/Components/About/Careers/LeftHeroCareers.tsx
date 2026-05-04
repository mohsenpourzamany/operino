import { useState, useEffect, useRef } from "react";

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current) return;
    triggered.current = true;
    const duration = 1600;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

// ─── Typewriter for "with us." ────────────────────────────────────────────────
function Typewriter({ phrases }: { phrases: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx % phrases.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < current.length) {
      t = setTimeout(() => setText(current.slice(0, text.length + 1)), 75);
    } else if (!deleting && text.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && text.length > 0) {
      t = setTimeout(() => setText(text.slice(0, -1)), 42);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setIdx((i) => i + 1);
      }, 0);
    }
    return () => clearTimeout(t);
  }, [text, deleting, idx, phrases]);

  return (
    <span style={{ position: "relative" }}>
      <span
        style={{
          background: "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
          backgroundSize: "300% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradShift 3s ease infinite",
        }}
      >
        {text || "\u00A0"}
      </span>
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: "0.82em",
          background: "#a855f7",
          marginLeft: 4,
          borderRadius: 2,
          verticalAlign: "middle",
          animation: "blink 0.9s step-end infinite",
          boxShadow: "0 0 8px rgba(168,85,247,0.9)",
        }}
      />
    </span>
  );
}

// ─── Perks ────────────────────────────────────────────────────────────────────
const perks = [
  {
    label: "Global Team",
    sub: "Work from anywhere",
    icon: (
      <svg
        width="20"
        height="20"
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
    label: "Meaningful Impact",
    sub: "Build things that matter",
    icon: (
      <svg
        width="20"
        height="20"
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
    label: "Fast Growth",
    sub: "Level up every day",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: "AI-First Culture",
    sub: "Work with the future",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#a78bfa"
        strokeWidth="1.8"
      >
        <rect x="5" y="8" width="14" height="10" rx="3" />
        <path d="M9 12h.01M15 12h.01" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="12" y1="8" x2="12" y2="5" strokeLinecap="round" />
        <circle cx="12" cy="4" r="1.2" fill="#a78bfa" stroke="none" />
      </svg>
    ),
  },
];

// ─── Floating particles ───────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: 1.5 + (i % 3) * 0.8,
  left: `${(i * 19 + 7) % 95}%`,
  top: `${(i * 31 + 11) % 90}%`,
  dur: 3.5 + (i % 5) * 0.8,
  delay: (i * 0.35) % 4,
  color: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#7c5cfc" : "#c4b5fd",
}));

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LeftHeroCareers() {
  const [visible, setVisible] = useState(false);
  const [hoverPos, setHoverPos] = useState(false);
  const [hoverLife, setHoverLife] = useState(false);
  const [hoveredPerk, setHoveredPerk] = useState<string | null>(null);
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
        width: "60%",
        minHeight: "80vh",
        // background:
        //   "linear-gradient(160deg,#07071a 0%,#0c0a22 55%,#080816 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(56px,9vw,110px) clamp(20px,7vw,90px)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.25;transform:scale(1)} 50%{opacity:0.55;transform:scale(1.06)} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(220%)} }
        @keyframes tagPop    { from{opacity:0;transform:translateX(-12px) scale(0.95)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes pFloat0   { 0%,100%{transform:translateY(0) translateX(0)}   50%{transform:translateY(-13px) translateX(5px)} }
        @keyframes pFloat1   { 0%,100%{transform:translateY(0) translateX(0)}   50%{transform:translateY(-9px) translateX(-7px)} }
        @keyframes pFloat2   { 0%,100%{transform:translateY(0)}                  40%{transform:translateY(-16px) translateX(4px)} 70%{transform:translateY(-7px) translateX(-3px)} }
        @keyframes pFloat3   { 0%,100%{transform:translateY(0) translateX(0)}   60%{transform:translateY(-11px) translateX(6px)} }
        @keyframes perkSlide { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
        @keyframes underlineW{ from{width:0} to{width:100%} }
        @keyframes countUp   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.3,
            animation: `pFloat${p.id % 4} ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-5%",
          width: "clamp(220px,40vw,580px)",
          height: "clamp(220px,40vw,580px)",
          background:
            "radial-gradient(circle,rgba(124,92,252,0.11) 0%,transparent 65%)",
          animation: "glowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "0%",
          width: "clamp(160px,28vw,400px)",
          height: "clamp(160px,28vw,400px)",
          background:
            "radial-gradient(circle,rgba(99,60,220,0.08) 0%,transparent 65%)",
          animation: "glowPulse 10s ease-in-out infinite 2s",
          pointerEvents: "none",
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(124,92,252,0.14),transparent)",
          animation: "scanLine 10s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 640,
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,92,252,0.1)",
            border: "1px solid rgba(124,92,252,0.28)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: "clamp(18px,3vw,28px)",
            animation: visible ? "tagPop 0.5s ease both" : "none",
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
              fontSize: "clamp(10px,1.4vw,12px)",
              fontWeight: 700,
              color: "#a78bfa",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Careers at Operino
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 clamp(14px,2.5vw,22px)",
            fontSize: "clamp(32px,6.5vw,62px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "white",
          }}
        >
          {visible && (
            <>
              <span
                style={{
                  display: "block",
                  animation: "fadeUp 0.6s 0s ease both",
                }}
              >
                Build the future
              </span>
              <span
                style={{
                  display: "block",
                  animation: "fadeUp 0.6s 0.18s ease both",
                }}
              >
                of AI,{" "}
                <Typewriter
                  phrases={["with us.", "together.", "boldly.", "for all."]}
                />
              </span>
            </>
          )}
        </h1>

        {/* Accent line */}
        <div
          style={{
            height: 2,
            borderRadius: 2,
            marginBottom: "clamp(14px,2.5vw,22px)",
            background: "linear-gradient(90deg,#7c5cfc,#a855f7,transparent)",
            animation: visible ? "underlineW 1.1s 0.6s ease both" : "none",
            width: visible ? "100%" : "0%",
          }}
        />

        {/* Body */}
        <p
          style={{
            margin: "0 0 clamp(24px,4vw,40px)",
            fontSize: "clamp(13px,1.8vw,16px)",
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.8,
            maxWidth: 520,
            animation: visible ? "fadeUp 0.65s 0.7s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          We're on a mission to empower every business with AI agents that work,
          so humans can focus on what truly matters. Join a team of builders,
          dreamers, and doers shaping the future.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "clamp(10px,2vw,14px)",
            flexWrap: "wrap",
            marginBottom: "clamp(28px,5vw,48px)",
            animation: visible ? "fadeUp 0.65s 0.85s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <button
            onMouseEnter={() => setHoverPos(true)}
            onMouseLeave={() => setHoverPos(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              background: hoverPos
                ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
              border: "none",
              borderRadius: 12,
              padding: "clamp(12px,2vw,15px) clamp(18px,3vw,28px)",
              fontSize: "clamp(13px,1.7vw,15px)",
              fontWeight: 700,
              color: "white",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
              transform: hoverPos ? "scale(1.05)" : "scale(1)",
              boxShadow: hoverPos
                ? "0 10px 30px rgba(124,92,252,0.65)"
                : "0 6px 22px rgba(124,92,252,0.4)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {hoverPos && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                  animation: "scanLine 0.6s ease",
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>
              View Open Positions
            </span>
            <svg
              style={{
                position: "relative",
                zIndex: 1,
                transition: "transform 0.25s ease",
                transform: hoverPos ? "translateX(4px)" : "none",
              }}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <button
            onMouseEnter={() => setHoverLife(true)}
            onMouseLeave={() => setHoverLife(false)}
            style={{
              background: hoverLife ? "rgba(255,255,255,0.07)" : "transparent",
              border: `1px solid ${hoverLife ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.18)"}`,
              borderRadius: 12,
              padding: "clamp(12px,2vw,15px) clamp(18px,3vw,28px)",
              fontSize: "clamp(13px,1.7vw,15px)",
              fontWeight: 600,
              color: hoverLife ? "white" : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.25s ease",
              transform: hoverLife ? "scale(1.05)" : "scale(1)",
            }}
          >
            Life at Operino
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "clamp(20px,4vw,36px)",
            flexWrap: "wrap",
            marginBottom: "clamp(22px,4vw,36px)",
            animation: visible ? "fadeUp 0.65s 1s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {[
            { label: "Open roles", val: 18, suffix: "+" },
            { label: "Countries", val: 32, suffix: "+" },
            { label: "Team members", val: 50, suffix: "+" },
          ].map((s) => (
            <div key={s.label}>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(22px,3.5vw,30px)",
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                {visible && <Counter target={s.val} suffix={s.suffix} />}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "clamp(10px,1.3vw,12px)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg,rgba(124,92,252,0.2),transparent)",
            marginBottom: "clamp(18px,3vw,28px)",
            animation: visible ? "fadeUp 0.5s 1.1s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        />

        {/* Perks grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: "clamp(10px,2vw,16px)",
            animation: visible ? "fadeUp 0.65s 1.15s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {perks.map((perk, i) => (
            <div
              key={perk.label}
              onMouseEnter={() => setHoveredPerk(perk.label)}
              onMouseLeave={() => setHoveredPerk(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "clamp(10px,1.8vw,14px) clamp(12px,2vw,16px)",
                borderRadius: 12,
                background:
                  hoveredPerk === perk.label
                    ? "rgba(124,92,252,0.12)"
                    : "rgba(255,255,255,0.03)",
                border:
                  hoveredPerk === perk.label
                    ? "1px solid rgba(124,92,252,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                cursor: "default",
                transition: "all 0.25s ease",
                transform:
                  hoveredPerk === perk.label
                    ? "translateX(4px)"
                    : "translateX(0)",
                boxShadow:
                  hoveredPerk === perk.label
                    ? "0 4px 18px rgba(124,92,252,0.15)"
                    : "none",
                animation: visible
                  ? `perkSlide 0.5s ${1.15 + i * 0.08}s ease both`
                  : "none",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  flexShrink: 0,
                  background:
                    hoveredPerk === perk.label
                      ? "rgba(124,92,252,0.2)"
                      : "rgba(124,92,252,0.1)",
                  border:
                    hoveredPerk === perk.label
                      ? "1px solid rgba(124,92,252,0.4)"
                      : "1px solid rgba(124,92,252,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                  transform:
                    hoveredPerk === perk.label
                      ? "scale(1.08) rotate(-5deg)"
                      : "scale(1) rotate(0)",
                  boxShadow:
                    hoveredPerk === perk.label
                      ? "0 0 14px rgba(167,139,250,0.35)"
                      : "none",
                }}
              >
                {perk.icon}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(11.5px,1.4vw,13px)",
                    fontWeight: 600,
                    color:
                      hoveredPerk === perk.label
                        ? "white"
                        : "rgba(255,255,255,0.72)",
                    transition: "color 0.2s",
                  }}
                >
                  {perk.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(10px,1.2vw,11.5px)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {perk.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
