import { useState, useEffect, useRef, useCallback } from "react";

const reviews = [
  [
    {
      quote:
        "Operino's AI assistant has reduced our no-show rate by 25% and improved patient satisfaction.",
      name: "Dr. Emily Carter",
      role: "Clinic Director",
      avatar: "https://i.pravatar.cc/48?img=47",
    },
    {
      quote:
        "Our front-desk workload is down 40% thanks to AI handling appointments and patient inquiries.",
      name: "Michael Lee",
      role: "Operations Manager",
      avatar: "https://i.pravatar.cc/48?img=12",
    },
    {
      quote:
        "The AI symptom checker helps us triage better and provide faster care to patients.",
      name: "Sarah Johnson",
      role: "Head of Patient Experience",
      avatar: "https://i.pravatar.cc/48?img=25",
    },
  ],
  [
    {
      quote:
        "Billing queries dropped 60% after we deployed Operino's AI. Our staff can finally focus on care.",
      name: "Dr. James Park",
      role: "Medical Director",
      avatar: "https://i.pravatar.cc/48?img=33",
    },
    {
      quote:
        "Medication reminder automation has improved our patient adherence rates by nearly 35%.",
      name: "Lisa Chen",
      role: "Pharmacy Lead",
      avatar: "https://i.pravatar.cc/48?img=20",
    },
    {
      quote:
        "Operino onboarded in a day. The ROI on reduced admin time was clear within the first week.",
      name: "Carlos Mendes",
      role: "Hospital Administrator",
      avatar: "https://i.pravatar.cc/48?img=60",
    },
  ],
];

// ── Card with flip reveal effect ─────────────────────────────────────────────
function TestimonialCard({
  review,
  index,
  visible,
}: {
  review: (typeof reviews)[0][0];
  index: number;
  pageKey: number;
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
      x: ((e.clientY - cy) / (r.height / 2)) * -7,
      y: ((e.clientX - cx) / (r.width / 2)) * 7,
    });
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        flex: "1 1 240px",
        minWidth: 220,
        perspective: 900,
        opacity: visible ? 1 : 0,
        animation: visible
          ? `cardFlipIn 0.55s cubic-bezier(.34,1.2,.64,1) ${index * 0.12}s both`
          : "none",
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(160deg,#1c1648,#141035)"
            : "linear-gradient(160deg,#13112b,#0f0d24)",
          border: hovered
            ? "1px solid rgba(124,92,252,0.45)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "clamp(18px,2.5vw,24px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 18,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.08s ease, border-color 0.25s, background 0.25s, box-shadow 0.25s"
            : "transform 0.5s cubic-bezier(.4,0,.2,1), border-color 0.25s, background 0.25s, box-shadow 0.25s",
          boxShadow: hovered
            ? "0 20px 40px rgba(0,0,0,0.5), 0 0 24px rgba(124,92,252,0.18)"
            : "0 4px 16px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
          cursor: "default",
        }}
      >
        {/* spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(124,92,252,0.16) 0%, transparent 52%)`,
            }}
          />
        )}

        {/* quote mark */}
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            fontSize: 52,
            fontFamily: "Georgia, serif",
            lineHeight: 1,
            color: "rgba(124,92,252,0.12)",
            pointerEvents: "none",
            transform: `translateZ(${hovered ? 8 : 0}px)`,
            transition: "transform 0.28s ease",
            userSelect: "none",
          }}
        >
          "
        </div>

        {/* quote text */}
        <p
          style={{
            margin: 0,
            flex: 1,
            fontSize: "clamp(12.5px,1.45vw,14.5px)",
            color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.68)",
            lineHeight: 1.72,
            fontStyle: "italic",
            transition: "color 0.25s",
            transform: `translateZ(${hovered ? 6 : 0}px)`,
            position: "relative",
          }}
        >
          "{review.quote}"
        </p>

        {/* author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            transform: `translateZ(${hovered ? 4 : 0}px)`,
            transition: "transform 0.28s ease",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={review.avatar}
              alt={review.name}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                objectFit: "cover",
                display: "block",
                border: "2px solid rgba(124,92,252,0.45)",
                boxShadow: hovered ? "0 0 10px rgba(124,92,252,0.4)" : "none",
                transition: "box-shadow 0.25s",
              }}
            />
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  border: "1px solid rgba(124,92,252,0.25)",
                }}
              />
            )}
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(12px,1.4vw,13.5px)",
                fontWeight: 700,
                color: "white",
              }}
            >
              {review.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(9.5px,1.1vw,11px)",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {review.role}
            </p>
          </div>
        </div>

        {/* bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "12%",
            right: "12%",
            height: 2,
            borderRadius: 2,
            background:
              "linear-gradient(90deg,transparent,rgba(124,92,252,0.7),transparent)",
            opacity: hovered ? 0.7 : 0,
            transition: "opacity 0.25s",
          }}
        />
      </div>
    </div>
  );
}

export default function HealthcareTestimonials() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [pageKey, setPageKey] = useState(0);
  const [dir, setDir] = useState<"r" | "l">("r");
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

  const go = (d: "prev" | "next") => {
    setDir(d === "next" ? "r" : "l");
    setPageKey((k) => k + 1);
    setPage((p) =>
      d === "next"
        ? (p + 1) % reviews.length
        : (p - 1 + reviews.length) % reviews.length,
    );
  };

  const current = reviews[page];

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(28px,4.5vw,52px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp     { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cardFlipIn { from{opacity:0;transform:rotateY(-25deg) translateY(16px) scale(0.93)} to{opacity:1;transform:rotateY(0) translateY(0) scale(1)} }
        @keyframes glowP      { 0%,100%{opacity:0.22} 50%{opacity:0.44} }
        @keyframes slideInR   { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInL   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "25%",
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

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(16px,2.5vw,24px)",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(13px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(15px,2vw,20px)",
              fontWeight: 700,
              color: "white",
              flex: 1,
              textAlign: "center",
            }}
          >
            Trusted by healthcare professionals
          </h2>
          {/* arrows */}
          <div style={{ display: "flex", gap: 8 }}>
            {["prev", "next"].map((d) => (
              <button
                key={d}
                onClick={() => go(d as "prev" | "next")}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.22s",
                  color: "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(124,92,252,0.2)";
                  el.style.borderColor = "rgba(124,92,252,0.5)";
                  el.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.color = "rgba(255,255,255,0.7)";
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  {d === "prev" ? (
                    <path d="M15 18l-6-6 6-6" />
                  ) : (
                    <path d="M9 18l6-6-6-6" />
                  )}
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* cards */}
        <div
          key={pageKey}
          style={{
            display: "flex",
            gap: "clamp(10px,1.6vw,14px)",
            flexWrap: "wrap",
            alignItems: "stretch",
            perspective: 1200,
            animation: visible
              ? `${dir === "r" ? "slideInR" : "slideInL"} 0.4s cubic-bezier(.4,0,.2,1) both`
              : "none",
          }}
        >
          {current.map((r, i) => (
            <TestimonialCard
              key={r.name}
              review={r}
              index={i}
              pageKey={pageKey}
              visible={visible}
            />
          ))}
        </div>

        {/* dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 7,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > page ? "r" : "l");
                setPageKey((k) => k + 1);
                setPage(i);
              }}
              style={{
                width: i === page ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background:
                  i === page
                    ? "linear-gradient(90deg,#a855f7,#7c5cfc)"
                    : "rgba(255,255,255,0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.32s cubic-bezier(.4,0,.2,1)",
                boxShadow: i === page ? "0 0 8px rgba(124,92,252,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
