import { useState, useEffect, useRef } from "react";
import opianalytics from "../../../assets/Photos/Opi-Analitics-1.png";
const features = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Real-time insights",
    sub: "See what's happening as it happens.",
    color: "#7c5cfc",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    label: "Data-driven growth",
    sub: "Find opportunities and improve continuously.",
    color: "#818cf8",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    label: "Easy to understand",
    sub: "Beautiful dashboards, built for everyone.",
    color: "#a78bfa",
  },
];

// ── Animated bar chart decoration ────────────────────────────────────────────
function AnimatedChart({ active }: { active: boolean }) {
  const bars = [35, 55, 40, 70, 50, 85, 60, 90, 65, 100, 75, 88];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 3,
        height: 44,
        opacity: active ? 0.5 : 0.22,
        transition: "opacity 0.4s",
      }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: `${h}%`,
            borderRadius: 2,
            background: `linear-gradient(180deg,#a78bfa,#7c5cfc)`,
            animation: active
              ? `barPulse${i % 4} ${1.2 + (i % 3) * 0.3}s ease-in-out ${i * 0.08}s infinite`
              : "none",
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

export default function AnalyticsHero() {
  const [visible, setVisible] = useState(false);
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [chartActive, setChartActive] = useState(false);
  const [typedText, setTypedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const robX = 0;
  const robY = 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setChartActive(true), 800);
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // typewriter for gradient phrase
  useEffect(() => {
    if (!visible) return;
    const phrases = [
      "powerful analytics.",
      "real insights.",
      "smarter decisions.",
      "actionable data.",
    ];
    const current = phrases[phraseIdx % phrases.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && typedText.length < current.length) {
      t = setTimeout(
        () => setTypedText(current.slice(0, typedText.length + 1)),
        70,
      );
    } else if (!deleting && typedText.length === current.length) {
      t = setTimeout(() => setDeleting(true), 2600);
    } else if (deleting && typedText.length > 0) {
      t = setTimeout(() => setTypedText(typedText.slice(0, -1)), 40);
    } else {
      t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx((p) => p + 1);
      }, 0);
    }
    return () => clearTimeout(t);
  }, [typedText, deleting, phraseIdx, visible]);

  return (
    <div
      className="flex flex-col justify-center"
      ref={ref}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(36px,6vw,68px) clamp(20px,5vw,52px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tagPop   { from{opacity:0;transform:translateX(-12px) scale(0.92)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes gradShift{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes shimBtn  { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
        @keyframes glowP    { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        @keyframes cursor   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes barPulse0{ 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.35)} }
        @keyframes barPulse1{ 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.7)} }
        @keyframes barPulse2{ 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.2)} }
        @keyframes barPulse3{ 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.85)} }
        @keyframes featureIn{ from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes iconSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "clamp(180px,35vw,340px)",
          height: "clamp(180px,35vw,340px)",
          background:
            "radial-gradient(circle,rgba(124,92,252,0.1) 0%,transparent 65%)",
          animation: "glowP 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-5%",
          width: "clamp(140px,28vw,260px)",
          height: "clamp(140px,28vw,260px)",
          background:
            "radial-gradient(circle,rgba(99,60,220,0.07) 0%,transparent 65%)",
          animation: "glowP 9s ease-in-out infinite 1.5s",
          pointerEvents: "none",
        }}
      />
      <div
        className="flex flex-row mx-auto items-center gap-12 justify-between"
        style={{ maxWidth: 1200, width: "100%" }}
      >
        <div
          style={{
            maxWidth: 540,
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px,2.2vw,22px)",
          }}
        >
          {/* ── Tag ── */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(124,92,252,0.1)",
              border: "1px solid rgba(124,92,252,0.3)",
              borderRadius: 20,
              padding: "5px 14px",
              width: "fit-content",
              animation: visible ? "tagPop 0.5s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#a78bfa">
              <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.5" />
              <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.75" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
            <span
              style={{
                fontSize: "clamp(9px,1.1vw,11px)",
                fontWeight: 700,
                color: "#a78bfa",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Analytics
            </span>
          </div>

          {/* ── Headline ── */}
          <div
            style={{
              animation: visible ? "fadeUp 0.65s 0.1s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(30px,5.5vw,52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.035em",
                color: "white",
              }}
            >
              Turn data into decisions
              <br />
              <span style={{ color: "white" }}>with </span>
              {/* typewriter gradient phrase */}
              <span
                style={{
                  background:
                    "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd,#7c5cfc)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "gradShift 3.5s ease infinite",
                }}
              >
                {typedText || "\u00A0"}
              </span>
              {/* blinking cursor */}
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: "0.85em",
                  background: "#a855f7",
                  marginLeft: 3,
                  borderRadius: 2,
                  verticalAlign: "middle",
                  animation: "cursor 0.9s step-end infinite",
                  boxShadow: "0 0 8px rgba(168,85,247,0.9)",
                }}
              />
            </h1>
          </div>

          {/* ── Body ── */}
          <p
            style={{
              margin: 0,
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.78,
              animation: visible ? "fadeUp 0.65s 0.2s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            Track performance, measure impact, and gain actionable insights
            across your AI agents, conversations, and workflows — all in real
            time.
          </p>

          {/* ── Buttons ── */}
          <div
            style={{
              display: "flex",
              gap: "clamp(10px,1.8vw,14px)",
              flexWrap: "wrap",
              animation: visible ? "fadeUp 0.65s 0.28s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <button
              onMouseEnter={() => setH1(true)}
              onMouseLeave={() => setH1(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                background: h1
                  ? "linear-gradient(90deg,#8b5cf6,#7c3aed)"
                  : "linear-gradient(90deg,#7c5cfc,#6d28d9)",
                border: "none",
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
                fontSize: "clamp(12.5px,1.5vw,14.5px)",
                fontWeight: 700,
                color: "white",
                cursor: "pointer",
                transition: "all 0.22s ease",
                transform: h1 ? "scale(1.04)" : "scale(1)",
                boxShadow: h1
                  ? "0 10px 28px rgba(124,92,252,0.62)"
                  : "0 5px 18px rgba(124,92,252,0.38)",
                whiteSpace: "nowrap",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {h1 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
                    animation: "shimBtn 0.6s ease",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                Start Analyzing for Free
              </span>
              <svg
                style={{
                  position: "relative",
                  zIndex: 1,
                  transform: h1 ? "translateX(3px)" : "none",
                  transition: "transform 0.2s",
                }}
                width="14"
                height="14"
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
              onMouseEnter={() => setH2(true)}
              onMouseLeave={() => setH2(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: h2 ? "rgba(255,255,255,0.07)" : "transparent",
                border: `1px solid ${h2 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.18)"}`,
                borderRadius: 12,
                padding: "clamp(11px,1.8vw,14px) clamp(20px,2.8vw,28px)",
                fontSize: "clamp(12.5px,1.5vw,14.5px)",
                fontWeight: 600,
                color: h2 ? "white" : "rgba(255,255,255,0.68)",
                cursor: "pointer",
                transition: "all 0.22s ease",
                transform: h2 ? "scale(1.04)" : "scale(1)",
                whiteSpace: "nowrap",
              }}
            >
              Book a Demo
            </button>
          </div>

          {/* ── Animated chart bar decoration ── */}
          <div
            style={{
              animation: visible ? "fadeUp 0.5s 0.35s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <AnimatedChart active={chartActive} />
          </div>

          {/* ── Feature pills ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
              gap: "clamp(10px,1.8vw,16px)",
            }}
          >
            {features.map((f, i) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const [hov, setHov] = useState(false);
              return (
                <div
                  key={f.label}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: "clamp(12px,1.8vw,16px)",
                    background: hov ? `${f.color}12` : "rgba(255,255,255,0.03)",
                    border: hov
                      ? `1px solid ${f.color}35`
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    cursor: "default",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s ease ${0.42 + i * 0.1}s, transform 0.5s cubic-bezier(.34,1.2,.64,1) ${0.42 + i * 0.1}s, background 0.22s, border-color 0.22s`,
                    boxShadow: hov ? `0 6px 18px ${f.color}20` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 9,
                      background: hov ? `${f.color}22` : `${f.color}14`,
                      border: hov
                        ? `1px solid ${f.color}50`
                        : `1px solid ${f.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: f.color,
                      transition: "all 0.25s",
                      transform: hov
                        ? "scale(1.1) rotate(-6deg)"
                        : "scale(1) rotate(0deg)",
                      boxShadow: hov ? `0 0 14px ${f.color}40` : "none",
                    }}
                  >
                    {f.icon}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(11.5px,1.4vw,13px)",
                      fontWeight: 700,
                      color: hov ? "white" : "rgba(255,255,255,0.8)",
                      transition: "color 0.2s",
                    }}
                  >
                    {f.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(10px,1.1vw,11.5px)",
                      color: "rgba(255,255,255,0.36)",
                      lineHeight: 1.5,
                    }}
                  >
                    {f.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* glow under robot */}
        <div
          className="flex flex-row"
          style={{
            position: "absolute",
            bottom: "-5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: 22,
            background:
              "radial-gradient(ellipse,rgba(124,92,252,0.55) 0%,transparent 70%)",
            filter: "blur(8px)",
            animation: "glowBreathe 2.5s ease-in-out infinite",
            pointerEvents: "none",
            marginLeft: "50px",
          }}
        />

        {/* robot */}
        <img
          src={opianalytics}
          alt="Operino Analytics Robot"
          style={{
            objectFit: "contain",
            display: "block",
            filter:
              "drop-shadow(0 0 24px rgba(124,92,252,0.5)) drop-shadow(0 8px 32px rgba(80,20,180,0.4))",
            animation: "robotFloat 4.5s ease-in-out infinite",
            transform: `translateX(${robX}px) translateY(${robY}px)`,
            transition: "transform 0.12s ease",
            position: "relative",
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}
