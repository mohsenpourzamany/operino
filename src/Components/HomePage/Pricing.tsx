import { useState, useEffect } from "react";

interface Plan {
  name: string;
  price: string;
  period?: string;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
  highlight?: boolean;
  free?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    tagline: "Try it, no credit card needed",
    free: true,
    features: [
      "1 AI Agent",
      "1 Channel",
      "100 Conversations / month",
      "Basic Analytics",
      "Community Support",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    tagline: "Perfect for small businesses",
    features: [
      "1 AI Agent",
      "2 Channels",
      "1,000 Conversations / month",
      "Basic Analytics",
      "Email Support",
    ],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    tagline: "For growing businesses",
    badge: "Most Popular",
    highlight: true,
    features: [
      "3 AI Agents",
      "5 Channels",
      "10,000 Conversations / month",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Start Free",
  },
  {
    name: "Business",
    price: "$199",
    period: "/month",
    tagline: "For high volume businesses",
    features: [
      "Unlimited AI Agents",
      "Unlimited Channels",
      "Unlimited Conversations",
      "Custom Integrations",
      "Dedicated Support",
    ],
    cta: "Book a Demo",
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, marginTop: 1 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Animated shimmer border for Free card
function ShimmerBorder({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 18,
        padding: 2,
        background: "transparent",
      }}
    >
      <div
        className="shimmer-border"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          background:
            "conic-gradient(from var(--angle, 0deg), #7c5cfc, #3b82f6, #06b6d4, #7c5cfc)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100 + index * 130);
  }, [index]);

  const checkColor = plan.highlight
    ? "#c4b5fd"
    : plan.free
      ? "#67e8f9"
      : "#a78bfa";

  const cardInner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: plan.highlight
          ? "linear-gradient(160deg, #1a1040, #120d30)"
          : plan.free
            ? "linear-gradient(160deg, #0d1a24, #080f18)"
            : "linear-gradient(160deg, #111124, #0c0c1e)",
        borderRadius: plan.free ? 16 : 14,
        padding: "28px 26px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        height: "100%",
        border: plan.highlight
          ? "1px solid rgba(124,92,252,0.6)"
          : plan.free
            ? "none"
            : "1px solid rgba(255,255,255,0.08)",
        transform: visible
          ? hovered
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)"
          : "translateY(28px)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.55s cubic-bezier(.4,0,.2,1), opacity 0.55s ease, box-shadow 0.3s ease",
        boxShadow: plan.highlight
          ? hovered
            ? "0 24px 60px rgba(124,92,252,0.4)"
            : "0 12px 40px rgba(124,92,252,0.25)"
          : plan.free
            ? hovered
              ? "0 20px 50px rgba(6,182,212,0.2)"
              : "0 8px 30px rgba(6,182,212,0.08)"
            : hovered
              ? "0 18px 44px rgba(0,0,0,0.5)"
              : "0 4px 20px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      {/* Free card: animated particle dots */}
      {plan.free && (
        <>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`particle-${i}`}
              style={{
                position: "absolute",
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: i % 2 === 0 ? "#06b6d4" : "#7c5cfc",
                opacity: 0.5,
                top: `${15 + i * 15}%`,
                right: `${8 + i * 6}%`,
                animation: `floatDot${i} ${3 + i * 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
          {/* Glow blob top right */}
          <div
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 120,
              height: 120,
              background:
                "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 100,
              height: 100,
              background:
                "radial-gradient(circle, rgba(124,92,252,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Popular glow */}
      {plan.highlight && (
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            background:
              "radial-gradient(circle, rgba(124,92,252,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header */}
      <div>
        {plan.free && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background:
                "linear-gradient(90deg,rgba(6,182,212,0.15),rgba(124,92,252,0.15))",
              border: "1px solid rgba(6,182,212,0.3)",
              borderRadius: 20,
              padding: "3px 10px",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#67e8f9",
                textTransform: "uppercase",
              }}
            >
              ✦ Always Free
            </span>
          </div>
        )}
        <p
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 700,
            color: plan.free ? "#e0f7fa" : "white",
          }}
        >
          {plan.name}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 4,
            margin: "10px 0 6px",
          }}
        >
          <span
            style={{
              fontSize: plan.free ? 38 : 36,
              fontWeight: 800,
              color: plan.free ? "#67e8f9" : "white",
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {plan.price}
          </span>
          {plan.period && (
            <span
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                fontWeight: 400,
              }}
            >
              {plan.period}
            </span>
          )}
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            color: plan.free
              ? "rgba(103,232,249,0.6)"
              : "rgba(255,255,255,0.4)",
          }}
        >
          {plan.tagline}
        </p>
      </div>

      {/* Features */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: 11, flex: 1 }}
      >
        {plan.features.map((f) => (
          <div
            key={f}
            style={{ display: "flex", alignItems: "flex-start", gap: 9 }}
          >
            <CheckIcon color={checkColor} />
            <span
              style={{
                fontSize: 12.5,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.4,
              }}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 10,
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
          border: plan.highlight
            ? "none"
            : plan.free
              ? "none"
              : "1px solid rgba(255,255,255,0.2)",
          background: plan.highlight
            ? "linear-gradient(90deg,#7c5cfc,#6d28d9)"
            : plan.free
              ? "linear-gradient(90deg,#0891b2,#7c5cfc)"
              : "transparent",
          color: "white",
          letterSpacing: "0.01em",
          transition: "all 0.2s",
          boxShadow: plan.highlight
            ? "0 6px 20px rgba(124,92,252,0.45)"
            : plan.free
              ? "0 6px 20px rgba(6,182,212,0.3)"
              : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* shimmer on hover */}
        <span style={{ position: "relative", zIndex: 1 }}>{plan.cta}</span>
      </button>
    </div>
  );

  if (plan.free) {
    return (
      <div
        style={{
          transform: visible ? "translateY(0)" : "translateY(28px)",
          opacity: visible ? 1 : 0,
          transition: `transform 0.55s cubic-bezier(.4,0,.2,1) ${index * 0.13}s, opacity 0.55s ease ${index * 0.13}s`,
        }}
      >
        <ShimmerBorder>{cardInner}</ShimmerBorder>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", paddingTop: plan.badge ? 20 : 0 }}>
      {plan.badge && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            background: "linear-gradient(90deg,#7c5cfc,#6d28d9)",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 20,
            padding: "5px 16px",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 14px rgba(124,92,252,0.5)",
          }}
        >
          {plan.badge}
        </div>
      )}
      {cardInner}
    </div>
  );
}

export default function Pricing() {
  const [titleVisible, setTitleVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setTitleVisible(true), 50);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "70vh",
        background: "#09091a",
        padding: "64px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 52,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
        @keyframes spin { to { --angle: 360deg; } }
        .shimmer-border { animation: spin 3s linear infinite; }
        @keyframes floatDot0 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-10px) translateX(4px)} }
        @keyframes floatDot1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes floatDot2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-8px) translateX(-5px)} }
        @keyframes floatDot3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatDot4 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-9px) translateX(3px)} }
      `}</style>

      {/* Title */}
      <div
        style={{
          textAlign: "center",
          transform: titleVisible ? "translateY(0)" : "translateY(20px)",
          opacity: titleVisible ? 1 : 0,
          transition: "all 0.6s ease",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: 30,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.5px",
          }}
        >
          Simple, transparent pricing
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.4)" }}>
          Start free. Upgrade when you grow.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1060,
          width: "100%",
        }}
      >
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            style={{ flex: "1 1 220px", maxWidth: 250, minWidth: 200 }}
          >
            <PricingCard plan={plan} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
