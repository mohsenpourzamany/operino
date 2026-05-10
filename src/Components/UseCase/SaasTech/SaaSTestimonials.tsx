import { useState, useEffect, useRef } from "react";

const reviews = [
  {
    brand: null,
    quote:
      "Operino's AI support agent handles 70% of our tickets, saving us hundreds of hours every month.",
    author: {
      name: "Sarah Chen",
      role: "Head of Customer Success, Taskly",
      avatar: "https://i.pravatar.cc/48?img=47",
    },
    color: "#7c5cfc",
  },
  {
    brand: {
      name: "stripe",
      icon: (
        <svg
          width="42"
          height="18"
          viewBox="0 0 60 25"
          fill="white"
          style={{ opacity: 0.85 }}
        >
          <path d="M4.5 10.5C4.5 9.1 5.6 8.5 7.4 8.5c2.5 0 5.6.8 8.1 2.1V5c-2.5-1.1-5-.8-8.1-.8C3.2 4.2 0 6.5 0 12c0 7.6 10.4 6.4 10.4 9.7 0 1.6-1.4 2.1-3.3 2.1-2.8 0-6.4-1.2-9.2-2.7v5.5c3.1 1.3 6.3 2 9.2 2 4.5 0 7.7-2.2 7.7-7.8C14.8 12.5 4.5 14 4.5 10.5z" />
        </svg>
      ),
    },
    quote:
      "We reduced churn by 28% after using Operino's AI insights and predictions.",
    author: {
      name: "Michael Rodriguez",
      role: "Growth Lead, Stripe",
      avatar: "https://i.pravatar.cc/48?img=12",
    },
    color: "#635BFF",
  },
  {
    brand: {
      name: "notion",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="white"
          style={{ opacity: 0.85 }}
        >
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933l3.222-.187z" />
        </svg>
      ),
    },
    quote:
      "The onboarding automation helped us increase activation rate by 35% in just two months.",
    author: {
      name: "Priya Shah",
      role: "Product Manager, Notion",
      avatar: "https://i.pravatar.cc/48?img=25",
    },
    color: "#000000",
  },
  {
    brand: null,
    quote:
      "Our support team finally has breathing room. Operino handles the repetitive stuff so we can focus on what matters.",
    author: {
      name: "James Park",
      role: "VP Engineering, Launchly",
      avatar: "https://i.pravatar.cc/48?img=33",
    },
    color: "#06b6d4",
  },
  {
    brand: {
      name: "linear",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 100 100"
          fill="white"
          style={{ opacity: 0.85 }}
        >
          <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L37.olean 99.1782c.6889.6889.0915 1.8218-.857 1.5994C20.3942 97.1474 5.19505 81.9483 1.22541 61.5228zM.00189135 46.8891c-.01764-.5518.45681-1.0088 1.01051-.9924 1.3477.0394 2.74296.1145 4.18008.2166C17.7819 47.1992 31.7932 52.1947 43 63.0001c10.8053 10.5012 15.8008 24.2125 16.8867 37.602.1021 1.4371.1773 2.8323.2167 4.1799.0163.5538-.4406 1.0282-.9924 1.0106L46.8891 106.002c-.5518-.0176-.9924.4444-.9748-.0926C46.0619 95.2028 46.2898 82.7397 39.7656 72.2343 33.2414 61.729 20.7784 56.0131 0 56.0131c-.5518 0-1.0106-.4606-.98319-1.0124l.00508-8.1116zM0 36.5455C0 36 .454545 35.5455 1 35.5455H15.0909C15.6364 35.5455 16.0909 36 16.0909 36.5455V50.6364C16.0909 51.1818 15.6364 51.6364 15.0909 51.6364H1C.454545 51.6364 0 51.1818 0 50.6364V36.5455z" />
        </svg>
      ),
    },
    quote:
      "Integrating Operino took less than a day. ROI was visible within the first week.",
    author: {
      name: "Emma Wilson",
      role: "CTO, Buildfast",
      avatar: "https://i.pravatar.cc/48?img=20",
    },
    color: "#5B5BD6",
  },
  {
    brand: null,
    quote:
      "Customer satisfaction scores jumped 22 points after deploying Operino across all support channels.",
    author: {
      name: "Carlos Mendes",
      role: "Director of CX, FlowDesk",
      avatar: "https://i.pravatar.cc/48?img=60",
    },
    color: "#22c55e",
  },
];

// ── Single review card ────────────────────────────────────────────────────────
function ReviewCard({
  review,
  index,
  visible,
}: {
  review: (typeof reviews)[0];
  index: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        flex: "1 1 260px",
        minWidth: 240,
        maxWidth: 360,
        perspective: 800,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s cubic-bezier(.34,1.2,.64,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(160deg,#1c1648,#141035)"
            : "linear-gradient(160deg,#13112b,#0f0d24)",
          border: hovered
            ? `1px solid ${review.color === "#000000" ? "#555" : review.color}45`
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: "clamp(18px,2.5vw,26px)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          height: "100%",
          position: "relative",
          overflow: "hidden",
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.08s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s"
            : "transform 0.5s cubic-bezier(.4,0,.2,1), border-color 0.3s, background 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? `0 20px 44px rgba(0,0,0,0.5), 0 0 24px ${review.color === "#000000" ? "rgba(80,80,80,0.3)" : review.color + "22"}`
            : "0 4px 18px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
          cursor: "default",
        }}
      >
        {/* tracked spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${review.color === "#000000" ? "rgba(80,80,80,0.15)" : review.color + "1a"} 0%, transparent 55%)`,
            }}
          />
        )}

        {/* top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "15%",
            right: "15%",
            height: 2,
            borderRadius: 2,
            background:
              review.color === "#000000"
                ? "linear-gradient(90deg,transparent,rgba(180,180,180,0.5),transparent)"
                : `linear-gradient(90deg,transparent,${review.color},transparent)`,
            opacity: hovered ? 0.8 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* brand logo */}
        {review.brand && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              transform: `translateZ(${hovered ? 8 : 0}px)`,
              transition: "transform 0.28s ease",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {review.brand.icon}
            </div>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "-0.02em",
              }}
            >
              {review.brand.name}
            </span>
          </div>
        )}

        {/* quote */}
        <p
          style={{
            margin: 0,
            flex: 1,
            fontSize: "clamp(13px,1.5vw,15px)",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.72,
            fontStyle: "italic",
            transform: `translateZ(${hovered ? 5 : 0}px)`,
            transition: "transform 0.28s ease",
          }}
        >
          "{review.quote}"
        </p>

        {/* author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            transform: `translateZ(${hovered ? 4 : 0}px)`,
            transition: "transform 0.28s ease",
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={review.author.avatar}
              alt={review.author.name}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${review.color === "#000000" ? "rgba(255,255,255,0.25)" : review.color + "55"}`,
                display: "block",
              }}
            />
            {hovered && (
              <div
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: "50%",
                  border: `1px solid ${review.color === "#000000" ? "rgba(255,255,255,0.15)" : review.color + "30"}`,
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
              {review.author.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(9.5px,1.1vw,11px)",
                color: "rgba(255,255,255,0.38)",
              }}
            >
              {review.author.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SaaSTestimonials() {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const [slideKey, setSlideKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const PER_PAGE = 3;
  const totalPages = Math.ceil(reviews.length / PER_PAGE);
  const pageReviews = reviews.slice(
    page * PER_PAGE,
    page * PER_PAGE + PER_PAGE,
  );

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

  const go = (dir: "prev" | "next") => {
    setSlideDir(dir === "next" ? "right" : "left");
    setSlideKey((k) => k + 1);
    setPage((p) =>
      dir === "next" ? (p + 1) % totalPages : (p - 1 + totalPages) % totalPages,
    );
  };

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter',sans-serif",
        padding: "clamp(32px,5vw,56px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowP    { 0%,100%{opacity:0.22} 50%{opacity:0.45} }
        @keyframes slideInR { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInL { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
        * { box-sizing:border-box; }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: "30%",
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
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(20px,3vw,32px)",
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
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(16px,2.2vw,22px)",
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              flex: 1,
            }}
          >
            Loved by SaaS & Tech teams
          </h2>
          <div style={{ display: "flex", gap: 8 }}>
            {["prev", "next"].map((dir) => (
              <button
                key={dir}
                onClick={() => go(dir as "prev" | "next")}
                style={{
                  width: 36,
                  height: 36,
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
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  {dir === "prev" ? (
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
          key={slideKey}
          style={{
            display: "flex",
            gap: "clamp(10px,1.8vw,16px)",
            flexWrap: "wrap",
            alignItems: "stretch",
            animation: visible
              ? `${slideDir === "right" ? "slideInR" : "slideInL"} 0.4s cubic-bezier(.4,0,.2,1) both`
              : "none",
          }}
        >
          {pageReviews.map((r, i) => (
            <ReviewCard
              key={r.author.name}
              review={r}
              index={i}
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
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setSlideDir(i > page ? "right" : "left");
                setSlideKey((k) => k + 1);
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
