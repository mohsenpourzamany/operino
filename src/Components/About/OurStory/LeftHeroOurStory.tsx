import { useState, useEffect, useRef } from "react";

// ─── Animated word reveal ─────────────────────────────────────────────────────
function RevealWords({
  text,
  delay = 0,
  color,
}: {
  text: string;
  delay?: number;
  color?: string;
}) {
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= words.length) clearInterval(timer);
    }, 90);
    const startDelay = setTimeout(() => {
      clearInterval(timer);
      let j = 0;
      const t = setInterval(() => {
        j++;
        setVisibleCount(j);
        if (j >= words.length) clearInterval(t);
      }, 90);
    }, delay);
    return () => {
      clearTimeout(startDelay);
    };
  }, [words.length, delay]);

  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            opacity: i < visibleCount ? 1 : 0,
            transform:
              i < visibleCount
                ? "translateY(0) rotate(0deg)"
                : "translateY(18px) rotate(2deg)",
            transition:
              "opacity 0.45s ease, transform 0.45s cubic-bezier(.34,1.56,.64,1)",
            color: color || "white",
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

// ─── Typewriter for the gradient word ────────────────────────────────────────
function TypewriterWord({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => setStarted(true), 1400);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((w) => w + 1);
      }, 0);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex, words, started]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          background: "linear-gradient(90deg,#a855f7,#7c5cfc,#c4b5fd)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "100%",
          animation: "gradShift 3s ease infinite",
        }}
      >
        {displayed || "\u00A0"}
      </span>
      {/* blinking cursor */}
      <span
        style={{
          display: "inline-block",
          width: 3,
          height: "0.8em",
          background: "#a855f7",
          marginLeft: 3,
          borderRadius: 2,
          verticalAlign: "middle",
          animation: "blink 0.9s step-end infinite",
          boxShadow: "0 0 8px rgba(168,85,247,0.8)",
        }}
      />
    </span>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: 2 + (i % 3),
    x: 5 + ((i * 17) % 90),
    y: 5 + ((i * 23) % 90),
    duration: 4 + (i % 5),
    delay: (i * 0.4) % 5,
    color: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#818cf8" : "#c4b5fd",
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.35,
            animation: `particleFloat${p.id % 4} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: "none",
            filter: `blur(${p.id % 2 === 0 ? 0.5 : 0}px)`,
          }}
        />
      ))}
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LeftHeroOurStory() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "50%",
        minHeight: "70vh",
        // background:
        //   "linear-gradient(160deg,#07071a 0%,#0c0a22 60%,#080816 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(48px,8vw,100px) clamp(20px,6vw,80px)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gradShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.05)} }
        @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
        @keyframes tagIn { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
        @keyframes underlineIn { from{width:0} to{width:100%} }
        @keyframes particleFloat0 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-14px) translateX(6px)} }
        @keyframes particleFloat1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-10px) translateX(-8px)} }
        @keyframes particleFloat2 { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-18px) translateX(4px)} 70%{transform:translateY(-8px) translateX(-3px)} }
        @keyframes particleFloat3 { 0%,100%{transform:translateY(0) translateX(0)} 60%{transform:translateY(-12px) translateX(7px)} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Ambient glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "clamp(200px,35vw,500px)",
          height: "clamp(200px,35vw,500px)",
          background:
            "radial-gradient(circle,rgba(124,92,252,0.1) 0%,transparent 65%)",
          animation: "glowPulse 7s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "clamp(150px,25vw,380px)",
          height: "clamp(150px,25vw,380px)",
          background:
            "radial-gradient(circle,rgba(99,60,220,0.08) 0%,transparent 65%)",
          animation: "glowPulse 9s ease-in-out infinite 1.5s",
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
            "linear-gradient(90deg,transparent,rgba(124,92,252,0.15),transparent)",
          animation: "scanLine 9s linear infinite",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          maxWidth: 680,
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
            gap: 7,
            background: "rgba(124,92,252,0.1)",
            border: "1px solid rgba(124,92,252,0.28)",
            borderRadius: 20,
            padding: "5px 14px",
            marginBottom: "clamp(16px,3vw,24px)",
            animation: visible ? "tagIn 0.5s ease both" : "none",
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
              fontSize: "clamp(10px,1.5vw,12px)",
              fontWeight: 700,
              color: "#a78bfa",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Our Story
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            margin: "0 0 clamp(16px,3vw,26px)",
            fontSize: "clamp(30px,6vw,58px)",
            fontWeight: 800,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "white",
          }}
        >
          {visible && (
            <>
              <span style={{ display: "block" }}>
                <RevealWords text="Building the future" delay={0} />
              </span>
              <span style={{ display: "block" }}>
                <RevealWords text="workforce," delay={400} />{" "}
                <TypewriterWord
                  words={["together.", "smarter.", "faster.", "boldly."]}
                />
              </span>
            </>
          )}
        </h1>

        {/* Decorative line */}
        <div
          style={{
            height: 2,
            borderRadius: 2,
            background: "linear-gradient(90deg,#7c5cfc,#a855f7,transparent)",
            marginBottom: "clamp(16px,3vw,28px)",
            animation: visible ? "underlineIn 1.2s 0.8s ease both" : "none",
            width: visible ? "100%" : "0%",
          }}
        />

        {/* Body text */}
        <p
          style={{
            margin: 0,
            fontSize: "clamp(13px,2vw,16px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.8,
            maxWidth: 540,
            animation: visible ? "fadeUp 0.7s 1.2s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          Operino was created with a simple belief: AI should empower people,
          not replace them. We're building a world where humans and AI agents
          work side by side to achieve extraordinary things.
        </p>

        {/* Bottom stats row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(12px,2vw,20px)",
            marginTop: "clamp(28px,5vw,44px)",
            animation: visible ? "fadeUp 0.7s 1.5s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {[
            { label: "Founded", value: "2023" },
            { label: "Team members", value: "50+" },
            { label: "Countries", value: "100+" },
          ].map((stat) => (
            <div key={stat.label} style={{ position: "relative" }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "clamp(10px,2vw,14px) clamp(14px,2.5vw,20px)",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(18px,3vw,24px)",
                    fontWeight: 800,
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "clamp(10px,1.3vw,12px)",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
