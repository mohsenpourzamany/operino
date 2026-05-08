import { useState, useEffect, useRef } from "react";

// ── Logo definitions ──────────────────────────────────────────────────────────
const logos = [
  {
    name: "Stripe",
    icon: (
      <svg width="54" height="22" viewBox="0 0 54 22" fill="currentColor">
        <path
          d="M4.5 7.5C4.5 6.1 5.6 5.5 7.4 5.5c2.5 0 5.6.8 8.1 2.1V1.9C13 .7 10.5 0 7.4 0 3 0 0 2.3 0 7.8c0 7.6 10.4 6.4 10.4 9.7 0 1.6-1.4 2.1-3.3 2.1-2.8 0-6.4-1.2-9.2-2.7V23c3.1 1.3 6.3 2 9.2 2 4.5 0 7.7-2.2 7.7-7.8C14.8 9.5 4.5 11 4.5 7.5z"
          transform="scale(0.85)"
        />
      </svg>
    ),
  },
  {
    name: "OpenAI",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.28 9.3a5.88 5.88 0 00-.5-4.83A6 6 0 0015.45.82a5.88 5.88 0 00-4.45-.79A6 6 0 007.22 2.9a5.87 5.87 0 00-3.89 2.86 6 6 0 00-.74 4.5 5.88 5.88 0 00-.5 4.83 6 6 0 006.33 3.65A5.87 5.87 0 0012 20.6a6 6 0 005.72-4.17 5.88 5.88 0 003.89-2.86 6 6 0 00.67-4.27zM12 18.9a4.45 4.45 0 01-2.85-1.02l.14-.08 4.72-2.72a.77.77 0 00.39-.67v-6.65l2 1.15a.07.07 0 01.04.05v5.5A4.49 4.49 0 0112 18.9zM3.22 15.53a4.45 4.45 0 01-.53-3l.14.08 4.72 2.73a.77.77 0 00.77 0l5.77-3.33v2.3a.07.07 0 01-.03.06L9.3 17.13a4.49 4.49 0 01-6.08-1.6zm-.74-9.8A4.45 4.45 0 015 3.5l-.01.16v5.45a.77.77 0 00.39.67l5.76 3.32-2 1.15a.07.07 0 01-.07 0L4.3 11.5a4.49 4.49 0 01-.82-5.77zm15.6 3.86l-5.76-3.33 2-1.15a.07.07 0 01.07 0l4.76 2.75a4.49 4.49 0 01-.7 7.65v-5.6a.77.77 0 00-.37-.32zm2-3.06l-.14-.08-4.72-2.73a.77.77 0 00-.77 0L8.69 7.72V5.42a.07.07 0 01.03-.06l4.76-2.75a4.49 4.49 0 016.6 4.87v.04zm-12.5 4.12L5.56 9.5a.07.07 0 01-.04-.05v-5.5a4.49 4.49 0 017.37-3.45l-.14.08-4.72 2.73a.77.77 0 00-.39.67v6.64zm1.08-2.35L12 7l2.34 1.35v2.69L12 12.39l-2.34-1.35v-2.7z" />
      </svg>
    ),
  },
  {
    name: "Notion",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187z" />
      </svg>
    ),
  },
  {
    name: "Dropbox",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2L0 6l6 4L0 14l6 4 6-4 6 4 6-4-6-4 6-4-6-4-6 4zm6 4l6 4-6 4-6-4 6-4zm-6 8l6 4 6-4" />
      </svg>
    ),
  },
  {
    name: "Shopify",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.337 23.979l6.21-1.343S18.784 7.2 18.764 7.031a.238.238 0 00-.235-.2c-.1 0-1.888-.033-1.888-.033s-1.254-1.22-1.4-1.36v16.541zm-2.486.539L12 24l-2.16-2.394V9.8l.28-.038 4.732-.647v15.403zm-7.04-17.98l.443-.08L8 23.33l-4.813-1.31 1.624-15.482zm9.285-3.046c-.015.086-.033.19-.052.302-.508.194-1.002.476-1.46.84-.073-.53-.224-1.278-.6-1.848a2.356 2.356 0 011.085.334 2.44 2.44 0 011.027 1.372zm-3.092-.504c-.093-.004-.185 0-.276.012-.4-1.544-.16-2.766.604-3.5a2.72 2.72 0 011.14-.683 8.12 8.12 0 00-.574 1.7 7.67 7.67 0 00-.894 2.471z" />
      </svg>
    ),
  },
  {
    name: "Calendly",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 8.5h-11V7h11v1.5zm0 3h-11V10h11v1.5zm-5.5 3H6.5V13H12v1.5z" />
      </svg>
    ),
  },
];

// Duplicate for seamless loop
const logosDuped = [...logos, ...logos, ...logos];

export default function TrustedBrands() {
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
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
        width: "70%",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(24px,3.5vw,40px) 0",
        overflow: "hidden",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        margin: "0 auto",
      }}
    >
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes shieldGlow {
          0%,100% { filter: drop-shadow(0 0 3px rgba(124,92,252,0.4)); }
          50%      { filter: drop-shadow(0 0 10px rgba(124,92,252,0.8)); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>

      {/* ── Label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginBottom: "clamp(16px,2.5vw,24px)",
          animation: visible ? "fadeUp 0.55s ease both" : "none",
        }}
      >
        {/* divider left */}
        <div
          style={{
            height: 1,
            width: "clamp(40px,8vw,100px)",
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.15))",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(167,139,250,0.7)"
            strokeWidth="1.8"
            style={{ animation: "shieldGlow 3s ease-in-out infinite" }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span
            style={{
              fontSize: "clamp(11px,1.3vw,13px)",
              color: "rgba(255,255,255,0.38)",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            Trusted by thousands of teams worldwide
          </span>
        </div>

        {/* divider right */}
        <div
          style={{
            height: 1,
            width: "clamp(40px,8vw,100px)",
            background:
              "linear-gradient(90deg,rgba(255,255,255,0.15),transparent)",
          }}
        />
      </div>

      {/* ── Marquee container ── */}
      <div
        style={{ position: "relative", overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredIdx(null);
        }}
      >
        {/* left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "clamp(40px,8vw,100px)",
            background: "linear-gradient(90deg,rgba(0,0,0,0.6),transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "clamp(40px,8vw,100px)",
            background: "linear-gradient(-90deg,rgba(0,0,0,0.6),transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(32px,5vw,60px)",
            width: "max-content",
            animation: `marqueeScroll 18s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {logosDuped.map((logo, i) => {
            const isHov = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  color: isHov
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.28)",
                  transition: "color 0.25s ease, transform 0.25s ease",
                  transform: isHov
                    ? "scale(1.12) translateY(-2px)"
                    : "scale(1) translateY(0)",
                  cursor: "default",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {logo.icon}
                </span>
                <span
                  style={{
                    fontSize: "clamp(14px,1.8vw,17px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "inherit",
                    fontStyle: "italic",
                  }}
                >
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
