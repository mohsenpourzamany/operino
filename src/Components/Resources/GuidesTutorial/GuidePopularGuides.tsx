import React, { useEffect, useRef, useState } from "react";

const guides = [
  { icon: "⚡", title: "Get Started in 5 Minutes", desc: "Set up your account and make your first API request in just a few steps.", time: "8 min read", level: "Beginner", color: "#7c5cfc" },
  { icon: "🧩", title: "Integrate with Your App", desc: "Learn how to integrate Operino with popular frameworks and platforms.", time: "12 min read", level: "Intermediate", color: "#a78bfa" },
  { icon: "📊", title: "Analyze & Improve Results", desc: "Track performance, analyze data, and optimize your AI applications.", time: "10 min read", level: "Intermediate", color: "#7c5cfc" },
  { icon: "🛡️", title: "Authentication Guide", desc: "Secure your applications and manage API keys like a pro.", time: "7 min read", level: "Beginner", color: "#a78bfa" },
];

const levelColor: Record<string, string> = {
  Beginner: "rgba(52,211,153,0.15)",
  Intermediate: "rgba(251,191,36,0.15)",
  Advanced: "rgba(248,113,113,0.15)",
};
const levelText: Record<string, string> = {
  Beginner: "#34d399",
  Intermediate: "#fbbf24",
  Advanced: "#f87171",
};

const GuidePopularGuides: React.FC = () => {
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
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }
        .pg-fade { animation: fadeUp 0.55s ease forwards; }
        .pg-card {
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;
          cursor: pointer;
        }
        .pg-card:hover { transform:translateY(-5px); border-color:rgba(124,92,252,0.45); box-shadow:0 10px 32px rgba(124,92,252,0.18); background:rgba(124,92,252,0.07)!important; }
        .pg-card:hover .pg-icon { transform:scale(1.15) rotate(-5deg); }
        .pg-icon { transition:transform 0.3s ease; }
        .pg-arrow { transition:transform 0.2s ease; }
        .pg-card:hover .pg-arrow { transform:translateX(4px); }
      `}</style>

      <div ref={ref} className="pb-8">
        <div className={`mb-5 flex items-center justify-between ${visible ? "pg-fade" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
          <div>
            <h2 className="text-[clamp(16px,2vw,20px)] font-bold text-white">Popular Guides</h2>
          </div>
          <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] flex items-center gap-1">View all guides →</button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g, i) => (
            <div key={i}
              className={`pg-card rounded-2xl bg-white/4 p-4 ${visible ? "pg-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}>
              <div className="pg-icon mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
                style={{ background: `${g.color}22`, border: `1px solid ${g.color}40` }}>
                {g.icon}
              </div>
              <p className="text-[13px] font-bold text-white leading-snug">{g.title}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">{g.desc}</p>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-600">
                <span>{g.time}</span>
                <span>•</span>
                <span className="rounded-full px-2 py-0.5 font-semibold"
                  style={{ background: levelColor[g.level], color: levelText[g.level] }}>
                  {g.level}
                </span>
              </div>
              <div className="mt-3 flex justify-end">
                <span className="pg-arrow text-gray-600 text-sm">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuidePopularGuides;
