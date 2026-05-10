import { useState, useEffect, useRef } from "react";

// ── Story data ────────────────────────────────────────────────────────────────
const stories = [
  {
    id: 1,
    brand: "StyleHub",
    headline: "StyleHub increased revenue by 32%",
    body: "By using Operino's AI recommendations and smart search, StyleHub improved customer experience and boosted conversions.",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=280&q=80",
    imageAlt: "Leather handbag",
    stats: [
      { value: "32%", label: "Revenue Increase" },
      { value: "22%", label: "Higher Conversion Rate" },
      { value: "18%", label: "Reduced Support Tickets" },
    ],
    quote:
      '"Operino\'s AI solutions transformed how we engage with our customers. The results speak for themselves."',
    author: {
      name: "Sarah Johnson",
      role: "Head of E-commerce, StyleHub",
      avatar: "https://i.pravatar.cc/48?img=47",
    },
  },
  {
    id: 2,
    brand: "TechGear",
    headline: "TechGear reduced cart abandonment by 41%",
    body: "With Operino's intelligent cart recovery system, TechGear re-engaged lost customers and drove a significant lift in completed purchases.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=280&q=80",
    imageAlt: "Laptop product",
    stats: [
      { value: "41%", label: "Lower Cart Abandonment" },
      { value: "29%", label: "More Repeat Purchases" },
      { value: "3.1x", label: "ROI on AI Spend" },
    ],
    quote:
      '"The cart recovery feature alone paid for itself in the first week. We wish we had started sooner."',
    author: {
      name: "David Chen",
      role: "CEO, TechGear Store",
      avatar: "https://i.pravatar.cc/48?img=12",
    },
  },
  {
    id: 3,
    brand: "GlowBeauty",
    headline: "GlowBeauty boosted AOV by 27%",
    body: "Personalized product recommendations from Operino helped GlowBeauty upsell effectively, growing average order value across all channels.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=280&q=80",
    imageAlt: "Beauty products",
    stats: [
      { value: "27%", label: "Higher Avg Order Value" },
      { value: "35%", label: "Better Engagement" },
      { value: "19%", label: "Reduced Churn" },
    ],
    quote:
      '"Our customers feel like we understand them personally. Operino made that possible at scale."',
    author: {
      name: "Lena Park",
      role: "Marketing Director, GlowBeauty",
      avatar: "https://i.pravatar.cc/48?img=25",
    },
  },
];

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedStat({
  value,
  label,
  delay,
  active,
}: {
  value: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const [displayed, setDisplayed] = useState("0");
  const rafRef = useRef<number>(0);

  const target = active ? value : "0";

  useEffect(() => {
    const isFloat = target.includes("x");
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let start: number;
    const dur = 1200;
    const t = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(2, -10 * p);
        const cur = eased * num;
        setDisplayed(
          isFloat ? cur.toFixed(1) + suffix : Math.floor(cur) + suffix,
        );
        if (p < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, value, delay, target]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <span
        style={{
          fontSize: "clamp(20px,2.8vw,26px)",
          fontWeight: 900,
          background: "linear-gradient(90deg,#a855f7,#7c5cfc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1,
        }}
      >
        {displayed}
      </span>
      <span
        style={{
          fontSize: "clamp(10px,1.2vw,11.5px)",
          color: "rgba(255,255,255,0.42)",
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SuccessStories() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const story = stories[activeIdx];

  const go = (dir: "prev" | "next") => {
    setDirection(dir === "next" ? "right" : "left");
    setImgLoaded(false);
    setAnimKey((k) => k + 1);
    setActiveIdx((i) =>
      dir === "next"
        ? (i + 1) % stories.length
        : (i - 1 + stories.length) % stories.length,
    );
  };

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "transparent",
        fontFamily: "'Inter', sans-serif",
        padding: "clamp(28px,4.5vw,52px) clamp(16px,4vw,40px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideInR { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInL { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer  { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        @keyframes glowP    { 0%,100%{opacity:0.22} 50%{opacity:0.45} }
        @keyframes imgReveal{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes quoteFade{ from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ambient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "60%",
          height: "80%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 65%)",
          animation: "glowP 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(16px,2.5vw,24px)",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(15px,2vw,20px)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.2px",
            }}
          >
            Real results from e-commerce businesses
          </h2>
          {/* nav arrows */}
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
                  transition: "all 0.22s ease",
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

        {/* ── Story card ── */}
        <div
          key={animKey}
          style={{
            background: "linear-gradient(145deg,#111028,#0d0c22)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18,
            display: "grid",
            gridTemplateColumns: "auto 1fr 1fr",
            gap: "clamp(14px,2.5vw,28px)",
            padding: "clamp(16px,2.5vw,28px)",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            animation: visible
              ? `${direction === "right" ? "slideInR" : "slideInL"} 0.45s cubic-bezier(.4,0,.2,1) both`
              : "none",
            alignItems: "center",
          }}
        >
          {/* Product image */}
          <div
            style={{
              position: "relative",
              width: "clamp(100px,14vw,170px)",
              height: "clamp(100px,14vw,170px)",
              flexShrink: 0,
            }}
          >
            {!imgLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 12,
                  background:
                    "linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))",
                  backgroundSize: "200px 100%",
                  animation: "shimmer 1.4s ease-in-out infinite",
                }}
              />
            )}
            <img
              src={story.image}
              alt={story.imageAlt}
              onLoad={() => setImgLoaded(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
                display: "block",
                opacity: imgLoaded ? 1 : 0,
                animation: imgLoaded ? "imgReveal 0.6s ease both" : "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
            />
          </div>

          {/* Left: headline + body + stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(10px,1.6vw,16px)",
              minWidth: 0,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(14px,1.8vw,18px)",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.3,
                letterSpacing: "-0.2px",
              }}
            >
              {story.headline}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(11.5px,1.3vw,13.5px)",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.72,
              }}
            >
              {story.body}
            </p>
            <div
              style={{
                display: "flex",
                gap: "clamp(16px,2.5vw,28px)",
                flexWrap: "wrap",
              }}
            >
              {story.stats.map((s, i) => (
                <AnimatedStat
                  key={s.label}
                  value={s.value}
                  label={s.label}
                  delay={i * 150}
                  active={visible}
                />
              ))}
            </div>
          </div>

          {/* Right: quote + author */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "clamp(12px,2vw,18px)",
              paddingLeft: "clamp(12px,2vw,20px)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              animation: "quoteFade 0.6s 0.2s ease both",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(12px,1.4vw,14px)",
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.72,
                fontStyle: "italic",
              }}
            >
              {story.quote}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={story.author.avatar}
                  alt={story.author.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(124,92,252,0.45)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: -2,
                    borderRadius: "50%",
                    border: "1px solid rgba(124,92,252,0.25)",
                  }}
                />
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
                  {story.author.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(10px,1.1vw,11.5px)",
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {story.author.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 7,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > activeIdx ? "right" : "left");
                setImgLoaded(false);
                setAnimKey((k) => k + 1);
                setActiveIdx(i);
              }}
              style={{
                width: i === activeIdx ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background:
                  i === activeIdx
                    ? "linear-gradient(90deg,#a855f7,#7c5cfc)"
                    : "rgba(255,255,255,0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.32s cubic-bezier(.4,0,.2,1)",
                boxShadow:
                  i === activeIdx ? "0 0 8px rgba(124,92,252,0.6)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
