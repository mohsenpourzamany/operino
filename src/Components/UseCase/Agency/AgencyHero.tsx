/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */

import React, { useEffect, useRef, useState } from "react";
import opiagency from "../../../assets/Photos/Opi-Agency-1.png";
const floatingIcons = [
  { icon: "📈", label: "Growth", top: "8%", left: "52%", delay: "0s" },
  { icon: "👥", label: "Clients", top: "6%", right: "4%", delay: "0.4s" },
  { icon: "🎯", label: "Goals", top: "42%", right: "2%", delay: "0.8s" },
  { icon: "✅", label: "Tasks", bottom: "20%", right: "4%", delay: "1.2s" },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="#7c5cfc" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 3"
          stroke="#7c5cfc"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Increase Productivity",
    desc: "Automate repetitive tasks and save hours every week.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          stroke="#7c5cfc"
          strokeWidth="1.5"
        />
        <path
          d="M8 12l3 3 5-5"
          stroke="#7c5cfc"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Deliver Better Results",
    desc: "Use AI insights to improve client campaigns and ROI.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 17l4-8 4 4 4-6 4 10"
          stroke="#7c5cfc"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Scale Your Agency",
    desc: "Manage more clients and projects without increasing your team.",
  },
];

const AgencyHero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .agency-section { font-family: 'DM Sans', sans-serif; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(124,92,252,0.3); }
          50% { box-shadow: 0 0 48px rgba(124,92,252,0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        .animate-fade-up { animation: fadeSlideUp 0.7s ease forwards; }
        .animate-fade-right { animation: fadeSlideRight 0.8s ease forwards; }
        .robot-float { animation: floatY 4s ease-in-out infinite; }
        .icon-float { animation: floatIcon 3s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }

        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #7c5cfc, #c4b5fd, #7c5cfc, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .star {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: white;
          animation: starTwinkle ease-in-out infinite;
        }

        .btn-primary-agency {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-primary-agency::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-20deg);
          transition: left 0.5s ease;
        }
        .btn-primary-agency:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(124,92,252,0.5); }
        .btn-primary-agency:hover::after { left: 150%; }

        .btn-secondary-agency {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .btn-secondary-agency:hover {
          transform: translateY(-3px);
          border-color: rgba(167,139,250,0.8);
          background: rgba(124,92,252,0.1);
        }

        .feature-card {
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          background: rgba(124,92,252,0.12) !important;
        }

        .icon-badge {
          backdrop-filter: blur(12px);
          transition: transform 0.3s ease;
        }
        .icon-badge:hover { transform: scale(1.1); }
      `}</style>

      <section
        ref={sectionRef}
        className="agency-section relative w-full overflow-hidden bg-[#07050f] pb-16 pt-6"
      >
        {/* Starfield */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3,
            }}
          />
        ))}

        {/* Radial glow bg */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[40%] top-[-10%] h-125 w-125 rounded-full bg-[#7c5cfc] opacity-10 blur-[100px]" />
          <div className="absolute right-[-5%] top-[20%] h-75 w-75 rounded-full bg-[#a78bfa] opacity-8 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
          {/* Breadcrumb */}
          <div
            className={`mb-6 text-sm text-gray-500 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            Home &nbsp;›&nbsp; Use Cases &nbsp;›&nbsp;{" "}
            <span className="text-[#a78bfa]">Agencies</span>
          </div>

          {/* Main grid */}
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-0">
            {/* LEFT */}
            <div className="z-10 flex-1 lg:pt-6">
              {/* Badge */}
              <div
                className={`mb-5 inline-block rounded-full bg-[#7c5cfc]/20 px-4 py-1.5 text-sm font-semibold text-[#a78bfa] ring-1 ring-[#7c5cfc]/40 ${visible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                Agencies
              </div>

              {/* Heading */}
              <h1
                className={`font-['Syne'] text-[clamp(32px,5vw,45px)] font-abold leading-[1.1] text-white ${visible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                AI that helps agencies
                <br />
                deliver more for{" "}
                <span className="shimmer-text">
                  every
                  <br />
                  client.
                </span>
              </h1>

              {/* Description */}
              <p
                className={`mt-5 max-w-md text-[clamp(14px,1.5vw,17px)] leading-relaxed text-gray-400 ${visible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.35s" }}
              >
                Operino empowers agencies to automate tasks,
                <br />
                deliver better results, and scale their services
                <br />
                without increasing headcount.
              </p>

              {/* Buttons */}
              <div
                className={`mt-8 flex flex-wrap gap-4 ${visible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.5s" }}
              >
                <button className="btn-primary-agency flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-7 py-3.5 text-[15px] font-semibold text-white">
                  Start for Free <span>→</span>
                </button>
                <button className="btn-secondary-agency rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white">
                  Book a Demo
                </button>
              </div>

              {/* Feature cards */}
              <div
                className={`mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 ${visible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: "0.65s" }}
              >
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="feature-card rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/15">
                      {f.icon}
                    </div>
                    <p className="text-[14px] font-bold text-white">
                      {f.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-gray-500">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Robot + floating icons */}
            <div
              className={`relative flex-1 flex justify-center lg:justify-end ${visible ? "animate-fade-right" : "opacity-0"}`}
              style={{ animationDelay: "0.3s", minHeight: "420px" }}
            >
              {/* Floating icon badges */}
              {floatingIcons.map((b, i) => (
                <div
                  key={i}
                  className="icon-badge icon-float absolute flex h-14 w-14 items-center justify-center rounded-2xl bg-[#120e2a]/80 text-2xl ring-1 ring-[#7c5cfc]/30"
                  style={{
                    top: b.top,
                    left: (b as any).left,
                    right: (b as any).right,
                    bottom: (b as any).bottom,
                    animationDelay: b.delay,
                  }}
                >
                  {b.icon}
                </div>
              ))}

              {/* Glow under robot */}
              <div className="absolute bottom-[12%] left-1/2 h-16 w-48 -translate-x-1/2 rounded-full bg-[#7c5cfc]/30 blur-2xl" />

              {/* Robot PNG */}
              <img
                src={opiagency}
                alt="Operino Agency Robot"
                className="robot-float relative z-10 w-[clamp(260px,38vw,460px)] drop-shadow-[0_20px_50px_rgba(124,92,252,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AgencyHero;
