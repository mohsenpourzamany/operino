/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Operino's AI assistant saves us hours every week and helps our teachers focus on what matters most—students.",
    name: "Jessica Lee",
    title: "Principal",
    company: "Greenfield High School",
    avatar: "JL",
    accent: "#a78bfa",
  },
  {
    quote:
      "The automated grading and analytics have transformed how we manage courses and support learners.",
    name: "Dr. Michael Brown",
    title: "Director of Online Learning",
    company: "EduTech",
    avatar: "MB",
    accent: "#7c5cfc",
  },
  {
    quote:
      "Our student support bot has improved response times and student satisfaction significantly.",
    name: "Sarah Johnson",
    title: "Academic Advisor",
    company: "Bright Future College",
    avatar: "SJ",
    accent: "#c4b5fd",
  },
  {
    quote:
      "Implementing Operino was the single best decision we made for our remote learning program this year.",
    name: "Prof. Alan Carter",
    title: "Department Head",
    company: "Metro University",
    avatar: "AC",
    accent: "#818cf8",
  },
  {
    quote:
      "The analytics dashboard gives us real-time insight into every student's journey. It's a game changer.",
    name: "Linda Torres",
    title: "Chief Learning Officer",
    company: "FutureLearn Academy",
    avatar: "LT",
    accent: "#a78bfa",
  },
];

const VISIBLE = 3;

function TestimonialCard({
  testimonial,
  index,
  active,
}: {
  testimonial: Testimonial;
  index: number;
  active: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!active) setFlipped(false);
  }, [active]);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        perspective: "1200px",
        height: "280px",
        animation: active
          ? `cardIn 0.55s cubic-bezier(.22,1,.36,1) ${index * 0.12}s both`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${testimonial.accent}55 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          zIndex: 0,
          transform: "scale(1.08)",
        }}
      />

      {/* Card flipper */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(124,92,252,0.08) 100%)",
            border: `1px solid ${hovered ? testimonial.accent + "55" : "rgba(255,255,255,0.08)"}`,
            boxShadow: hovered
              ? `0 8px 40px ${testimonial.accent}30, inset 0 1px 0 rgba(255,255,255,0.1)`
              : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            transition: "border 0.3s, box-shadow 0.3s",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Quote mark */}
          <div
            className="absolute top-4 right-5 text-6xl leading-none font-serif select-none pointer-events-none"
            style={{ color: testimonial.accent + "33" }}
          >
            "
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={testimonial.accent}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
            }}
          >
            "{testimonial.quote}"
          </p>

          {/* Author */}
          <div
            className="flex items-center gap-3 mt-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                background: `linear-gradient(135deg, ${testimonial.accent}, ${testimonial.accent}88)`,
                color: "#fff",
                boxShadow: `0 0 12px ${testimonial.accent}66`,
                fontFamily: "monospace",
              }}
            >
              {testimonial.avatar}
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">
                {testimonial.name}
              </p>
              <p
                className="text-xs leading-tight"
                style={{ color: testimonial.accent + "cc" }}
              >
                {testimonial.title}
              </p>
            </div>
            {/* Flip hint */}
            <div
              className="ml-auto text-xs px-2 py-1 rounded-full"
              style={{
                background: testimonial.accent + "22",
                color: testimonial.accent,
                border: `1px solid ${testimonial.accent}44`,
              }}
            >
              tap ↻
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${testimonial.accent}22 0%, ${testimonial.accent}08 100%)`,
            border: `1px solid ${testimonial.accent}55`,
            boxShadow: `0 8px 40px ${testimonial.accent}30`,
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${testimonial.accent}, ${testimonial.accent}88)`,
              color: "#fff",
              boxShadow: `0 0 24px ${testimonial.accent}88`,
              fontFamily: "monospace",
            }}
          >
            {testimonial.avatar}
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{testimonial.name}</p>
            <p className="text-sm mt-1" style={{ color: testimonial.accent }}>
              {testimonial.title}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {testimonial.company}
            </p>
          </div>
          <div
            className="w-full text-center text-xs py-2 px-4 rounded-full"
            style={{
              background: testimonial.accent + "22",
              color: testimonial.accent + "cc",
              border: `1px solid ${testimonial.accent}33`,
            }}
          >
            Verified Operino User ✓
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EducationTestimonials() {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = testimonials.length;
  const maxStart = total - VISIBLE;

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActive(false);
      setTimeout(() => {
        setCurrent((c) => Math.min(Math.max(c + dir, 0), maxStart));
        setActive(true);
      }, 180);
    },
    [maxStart],
  );

  // Auto-advance
  useEffect(() => {
    autoRef.current = setTimeout(
      () => goTo(current < maxStart ? 1 : (-current as 1 | -1)),
      4500,
    );
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [current, goTo, maxStart]);

  // IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const shown = testimonials.slice(current, current + VISIBLE);

  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes titleIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden py-20 px-4"
        style={{ background: "transparent" }}
      >
        {/* Ambient background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: "clamp(300px, 50vw, 600px)",
              height: "clamp(300px, 50vw, 600px)",
              background:
                "radial-gradient(circle, #7c5cfc18 0%, transparent 70%)",
              top: "-10%",
              left: "-5%",
              animation: "floatDot 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl"
            style={{
              width: "clamp(200px, 40vw, 500px)",
              height: "clamp(200px, 40vw, 500px)",
              background:
                "radial-gradient(circle, #a78bfa18 0%, transparent 70%)",
              bottom: "-10%",
              right: "0%",
              animation: "floatDot 10s ease-in-out infinite 2s",
            }}
          />
        </div>

        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            animation: visible
              ? "titleIn 0.7s cubic-bezier(.22,1,.36,1) both"
              : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{
                  background: "#a78bfa",
                  animation: "pulse-ring 1.4s cubic-bezier(0,0,.2,1) infinite",
                }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "#7c5cfc" }}
              />
            </span>
            <span
              className="text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
              style={{
                color: "#a78bfa",
                background: "rgba(124,92,252,0.12)",
                border: "1px solid rgba(167,139,250,0.2)",
                letterSpacing: "0.15em",
              }}
            >
              Testimonials
            </span>
          </div>

          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              color: "#fff",
              fontFamily: "'Georgia', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Loved by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #a78bfa, #7c5cfc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              educators
            </span>{" "}
            and institutions
          </h2>
          <p
            className="mt-3 text-sm"
            style={{
              color: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
              margin: "12px auto 0",
            }}
          >
            Real voices from schools, universities, and EdTech platforms powered
            by Operino AI.
          </p>
        </div>

        {/* Cards */}
        <div className="relative max-w-5xl mx-auto">
          {/* Prev */}
          <button
            onClick={() => goTo(-1)}
            disabled={current === 0}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background:
                current === 0
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(124,92,252,0.2)",
              border: `1px solid ${current === 0 ? "rgba(255,255,255,0.08)" : "rgba(124,92,252,0.4)"}`,
              color: current === 0 ? "rgba(255,255,255,0.2)" : "#a78bfa",
              cursor: current === 0 ? "not-allowed" : "pointer",
              boxShadow:
                current === 0 ? "none" : "0 0 16px rgba(124,92,252,0.3)",
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Grid */}
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {shown.map((t, i) => (
              <TestimonialCard
                key={t.name}
                testimonial={t}
                index={i}
                active={active}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(1)}
            disabled={current >= maxStart}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background:
                current >= maxStart
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(124,92,252,0.2)",
              border: `1px solid ${current >= maxStart ? "rgba(255,255,255,0.08)" : "rgba(124,92,252,0.4)"}`,
              color: current >= maxStart ? "rgba(255,255,255,0.2)" : "#a78bfa",
              cursor: current >= maxStart ? "not-allowed" : "pointer",
              boxShadow:
                current >= maxStart ? "none" : "0 0 16px rgba(124,92,252,0.3)",
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxStart + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(false);
                setTimeout(() => {
                  setCurrent(i);
                  setActive(true);
                }, 180);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? "24px" : "8px",
                height: "8px",
                background:
                  current === i
                    ? "linear-gradient(90deg, #7c5cfc, #a78bfa)"
                    : "rgba(255,255,255,0.15)",
                boxShadow: current === i ? "0 0 10px #7c5cfc88" : "none",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom stat strip */}
        <div
          className="mt-14 max-w-3xl mx-auto grid grid-cols-3 gap-4"
          style={{
            animation: visible
              ? "titleIn 0.9s cubic-bezier(.22,1,.36,1) 0.4s both"
              : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {[
            { val: "98%", label: "Satisfaction Rate" },
            { val: "500+", label: "Institutions" },
            { val: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-4 px-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="font-bold"
                style={{
                  fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                  background: "linear-gradient(90deg, #a78bfa, #7c5cfc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Georgia', serif",
                }}
              >
                {stat.val}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
