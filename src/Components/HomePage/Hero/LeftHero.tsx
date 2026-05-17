import React from "react";

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="9" cy="9" r="8.5" stroke="#6366f1" strokeOpacity="0.6" />
    <path
      d="M5.5 9L7.5 11L12.5 7"
      stroke="#a5b4fc"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const badges = [
  { text: "No credit card required" },
  { text: "Setup in under 5 minutes" },
  { text: "7-day free trial" },
];

const LeftHero: React.FC = () => {
  return (
    <section className="relative  flex items-center justify-center overflow-hidden rounded-3xl ">
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-100 h-100 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 flex flex-col items-start">
        {/* Eyebrow pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
          <span
            className="text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#a5b4fc" }}
          >
            AI Employee for Your Business
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mt-5 mb-6 font-extrabold leading-[1.04] tracking-tight"
          style={{
            fontFamily: "'Poppins', 'Clash Display', system-ui, sans-serif",
            fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
            color: "#f0efff",
            marginBottom: "4px",
          }}
        >
          Your AI Employee
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #818cf8 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            for Customer
            <br />
            Conversations
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-lg leading-relaxed"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "1.05rem",
            color: "rgba(210,208,255,0.65)",
          }}
        >
          Operino answers messages, captures leads and grows your business 24/7
          across Instagram, WhatsApp and your website.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            className="group flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5 active:scale-95"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.95rem",
              background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
              boxShadow: "0 4px 24px rgba(99,102,241,0.45)",
            }}
          >
            Start Free
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>

          <button
            className="flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-all duration-200 hover:bg-white/5 active:scale-95"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.95rem",
              color: "rgba(230,228,255,0.9)",
              borderColor: "rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Book a Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center gap-5">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2">
              <CheckIcon />
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(200,198,255,0.55)",
                }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeftHero;
