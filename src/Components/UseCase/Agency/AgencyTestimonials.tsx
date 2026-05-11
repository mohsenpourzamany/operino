import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Operino has transformed how we deliver results for our clients. We've saved hours every week and achieved better outcomes.",
    name: "Alex Morgan",
    role: "Founder, Digital Creators",
    avatar: "AM",
    color: "#7c5cfc",
  },
  {
    quote:
      "The AI insights help us make smarter decisions and show real impact to our clients.",
    name: "Jessica Lee",
    role: "CEO, Bright Marketing",
    avatar: "JL",
    color: "#a78bfa",
  },
  {
    quote:
      "Automating reports and tasks has allowed us to scale without hiring more staff.",
    name: "Michael Chen",
    role: "Head of Operations, Nova Solutions",
    avatar: "MC",
    color: "#6d4fd4",
  },
  {
    quote:
      "We doubled our client capacity in 3 months. Operino is a game changer for any growing agency.",
    name: "Sarah Kim",
    role: "Director, Growth Agency",
    avatar: "SK",
    color: "#9b6dff",
  },
  {
    quote:
      "The campaign analysis feature alone saves us 10+ hours a week. Absolutely worth it.",
    name: "David Patel",
    role: "CMO, Spark Digital",
    avatar: "DP",
    color: "#7c5cfc",
  },
];

const AgencyTestimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [animating, setAnimating] = useState(false);

  const visibleCount = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    const t = setInterval(() => navigate("right"), 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const navigate = (dir: "left" | "right") => {
    if (animating) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "right"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length,
      );
      setAnimating(false);
    }, 350);
  };

  const getVisible = () =>
    Array.from(
      { length: visibleCount },
      (_, i) => testimonials[(current + i) % testimonials.length],
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .test-wrap { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .t-fade { animation: fadeUp 0.6s ease forwards; }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(40px); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-40px); }
        }

        .cards-enter-right { animation: slideInRight 0.35s ease forwards; }
        .cards-enter-left  { animation: slideInLeft  0.35s ease forwards; }
        .cards-exit-right  { animation: slideOutRight 0.35s ease forwards; }
        .cards-exit-left   { animation: slideOutLeft  0.35s ease forwards; }

        .t-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .t-card:hover {
          transform: translateY(-5px);
          border-color: rgba(124,92,252,0.4);
          box-shadow: 0 12px 40px rgba(124,92,252,0.15);
        }

        .nav-btn {
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .nav-btn:hover {
          background: rgba(124,92,252,0.25) !important;
          transform: scale(1.1);
        }

        /* Quote mark decoration */
        .quote-mark {
          position: absolute;
          top: 12px; right: 16px;
          font-size: 64px;
          line-height: 1;
          color: rgba(124,92,252,0.12);
          font-family: Georgia, serif;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="test-wrap w-full bg-transparent py-16 px-4"
      >
        {/* Title */}
        <h2
          className={`mb-10 text-center text-[clamp(18px,2.5vw,24px)] font-semibold text-white ${visible ? "t-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          Loved by agencies worldwide
        </h2>

        {/* Slider area */}
        <div
          className={`relative mx-auto max-w-5xl ${visible ? "t-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.15s" }}
        >
          {/* Left arrow */}
          <button
            onClick={() => navigate("left")}
            className="nav-btn absolute -left-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-white border border-white/10"
          >
            ‹
          </button>

          {/* Cards */}
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden ${
              animating
                ? animDir === "right"
                  ? "cards-exit-left"
                  : "cards-exit-right"
                : animDir === "right"
                  ? "cards-enter-right"
                  : "cards-enter-left"
            }`}
          >
            {getVisible().map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="t-card relative rounded-2xl bg-[#0f0d1f] p-6"
              >
                {/* Big quote mark */}
                <span className="quote-mark">"</span>

                {/* Quote */}
                <p className="mb-6 text-[14px] leading-relaxed text-gray-300">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                    style={{
                      background: `${t.color}33`,
                      border: `1.5px solid ${t.color}66`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => navigate("right")}
            className="nav-btn absolute -right-5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/8 text-white border border-white/10"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div
          className={`mt-8 flex justify-center gap-2 ${visible ? "t-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAnimDir("right");
                setCurrent(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                background: i === current ? "#7c5cfc" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default AgencyTestimonials;
