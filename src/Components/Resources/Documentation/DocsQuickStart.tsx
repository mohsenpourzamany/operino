import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "1",
    icon: "👤",
    title: "Create Account",
    desc: "Sign up for a free account and get your API key.",
    color: "#7c5cfc",
  },
  {
    num: "2",
    icon: "⬇️",
    title: "Install SDK",
    desc: "Install Operino SDK using your preferred package manager.",
    color: "#a78bfa",
  },
  {
    num: "3",
    icon: "🧩",
    title: "Add Integration",
    desc: "Connect your favorite tools and data sources.",
    color: "#7c5cfc",
  },
  {
    num: "4",
    icon: "🚀",
    title: "Launch",
    desc: "Build, test, and launch your AI-powered experience.",
    color: "#a78bfa",
  },
];

const DocsQuickStart: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .qs-fade { animation: fadeUp 0.55s ease forwards; }

        .qs-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .qs-card:hover {
          transform: translateY(-5px);
          border-color: rgba(124,92,252,0.45);
          background: rgba(124,92,252,0.08) !important;
          box-shadow: 0 10px 32px rgba(124,92,252,0.18);
        }
        .qs-card:hover .qs-icon {
          transform: scale(1.15) rotate(-5deg);
        }
        .qs-icon { transition: transform 0.3s ease; }

        .learn-link {
          transition: gap 0.2s ease, color 0.2s ease;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .learn-link:hover { color: #c4b5fd; gap: 8px; }

        /* Connector line between steps */
        .step-connector {
          position: absolute;
          top: 22px; right: -50%;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, rgba(124,92,252,0.4), rgba(124,92,252,0.1));
          pointer-events: none;
        }
      `}</style>

      <div ref={ref} className="pb-10">
        {/* Header */}
        <div
          className={`mb-6 ${visible ? "qs-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <h2 className="text-[clamp(18px,2vw,22px)] font-bold text-white">Quick Start</h2>
          <p className="mt-1 text-[13px] text-gray-500">Get up and running in minutes with Operino.</p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`qs-card relative rounded-2xl bg-white/4 p-5 ${visible ? "qs-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Step number badge */}
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="qs-icon flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}44` }}
                >
                  {s.icon}
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ color: `${s.color}99` }}
                >
                  0{s.num}
                </span>
              </div>

              <p className="text-[14px] font-semibold text-white">{s.num}. {s.title}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-gray-500">{s.desc}</p>

              <button className="learn-link mt-4 text-[12px] font-semibold text-[#a78bfa]">
                Learn more <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsQuickStart;
