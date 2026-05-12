import React, { useEffect, useRef, useState } from "react";

const guides = [
  {
    icon: "💬",
    title: "Build an AI Chatbot",
    desc: "Create a smart chatbot in minutes and deploy it anywhere.",
    time: "10 min read",
    color: "#7c5cfc",
  },
  {
    icon: "📚",
    title: "Train on Your Data",
    desc: "Import documents and train your AI on custom knowledge.",
    time: "8 min read",
    color: "#a78bfa",
  },
  {
    icon: "🧩",
    title: "Integrate with Apps",
    desc: "Connect Operino with 100+ tools and platforms.",
    time: "12 min read",
    color: "#7c5cfc",
  },
  {
    icon: "📊",
    title: "Analyze & Improve",
    desc: "Track performance and improve accuracy with analytics.",
    time: "7 min read",
    color: "#a78bfa",
  },
];

const DocsGuides: React.FC = () => {
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
        .g-fade { animation: fadeUp 0.55s ease forwards; }

        .guide-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease,
                      border-color 0.28s ease, background 0.28s ease;
          border: 1px solid rgba(255,255,255,0.07);
        }
        .guide-card:hover {
          transform: translateY(-4px);
          border-color: rgba(124,92,252,0.4);
          background: rgba(124,92,252,0.08) !important;
          box-shadow: 0 8px 28px rgba(124,92,252,0.15);
        }
        .guide-card:hover .g-icon {
          transform: scale(1.12) rotate(-4deg);
        }
        .g-icon { transition: transform 0.3s ease; }
      `}</style>

      <div ref={ref} className="pb-10">
        {/* Header */}
        <div
          className={`mb-6 flex items-end justify-between ${visible ? "g-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div>
            <h2 className="text-[clamp(18px,2vw,22px)] font-bold text-white">Guides</h2>
            <p className="mt-1 text-[13px] text-gray-500">
              Step-by-step guides to help you build powerful AI solutions.
            </p>
          </div>
          <button className="flex items-center gap-1 text-[13px] font-semibold text-[#a78bfa] transition-all hover:text-[#c4b5fd]">
            View all guides <span>→</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {guides.map((g, i) => (
            <div
              key={i}
              className={`guide-card flex gap-4 rounded-2xl bg-white/4 p-5 cursor-pointer ${visible ? "g-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.09}s` }}
            >
              {/* Icon */}
              <div
                className="g-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
                style={{ background: `${g.color}20`, border: `1px solid ${g.color}40` }}
              >
                {g.icon}
              </div>

              {/* Text */}
              <div>
                <p className="text-[14px] font-semibold text-white">{g.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-gray-500">{g.desc}</p>
                <p className="mt-2.5 text-[11px] font-medium text-gray-600">{g.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsGuides;
