import React, { useEffect, useRef, useState } from "react";

const cats = [
  { icon: "🚀", title: "Getting Started", desc: "New to Operino? Start here and set up in minutes.", count: 12, color: "#7c5cfc" },
  { icon: "💳", title: "Account & Billing", desc: "Manage your account, billing, and subscription details.", count: 8, color: "#a78bfa" },
  { icon: "📖", title: "Using Operino", desc: "Learn how to build, automate, and scale with Operino.", count: 24, color: "#7c5cfc" },
  { icon: "🔗", title: "Integrations", desc: "Connect Operino with your favorite tools and platforms.", count: 16, color: "#a78bfa" },
  { icon: "🔧", title: "Troubleshooting", desc: "Find solutions to common issues and errors.", count: 10, color: "#7c5cfc" },
];

interface Props { onCategoryClick?: (title: string) => void; }

const HelpCategories: React.FC<Props> = ({ onCategoryClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .hcat-fade { animation: fadeUp 0.55s ease forwards; }
        .hcat-card {
          border:1px solid rgba(255,255,255,0.07);
          transition:transform 0.28s ease,border-color 0.28s ease,box-shadow 0.28s ease,background 0.28s ease;
          cursor:pointer; position:relative; overflow:hidden;
        }
        .hcat-card:hover, .hcat-card.hcat-active {
          transform:translateY(-5px);
          border-color:rgba(124,92,252,0.5);
          box-shadow:0 12px 36px rgba(124,92,252,0.2);
          background:rgba(124,92,252,0.09)!important;
        }
        .hcat-card:hover .hcat-icon, .hcat-card.hcat-active .hcat-icon { transform:scale(1.15) rotate(-6deg); }
        .hcat-icon { transition:transform 0.3s ease; }
        .hcat-link { transition:gap 0.2s ease,color 0.2s ease; display:inline-flex; align-items:center; gap:4px; }
        .hcat-card:hover .hcat-link { gap:8px; color:#c4b5fd; }
        /* Bottom reveal line */
        .hcat-card .hcat-line { position:absolute; bottom:0; left:0; height:2px; width:0; background:linear-gradient(90deg,#7c5cfc,#a78bfa); border-radius:2px; transition:width 0.4s ease; }
        .hcat-card:hover .hcat-line, .hcat-card.hcat-active .hcat-line { width:100%; }
        /* Shimmer */
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .hcat-card::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(167,139,250,0.05),transparent); transform:translateX(-100%) skewX(-15deg); pointer-events:none; }
        .hcat-card:hover::after { animation:shimmer 0.65s ease forwards; }
      `}</style>

      <div ref={ref} className="pb-8">
        <h2 className={`mb-5 text-[clamp(16px,2vw,20px)] font-bold text-white ${visible ? "hcat-fade" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
          Browse by category
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {cats.map((c, i) => (
            <div key={i}
              onClick={() => { setActive(active === c.title ? null : c.title); onCategoryClick?.(c.title); }}
              className={`hcat-card rounded-2xl bg-[#0c0a1e] p-4 ${active === c.title ? "hcat-active" : ""} ${visible ? "hcat-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.08 + i * 0.08}s` }}>

              <div className="hcat-icon mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl"
                style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}>
                {c.icon}
              </div>
              <p className="text-[13px] font-bold text-white leading-snug">{c.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-gray-500">{c.desc}</p>
              <div className="hcat-link mt-3 text-[11px] font-semibold text-[#a78bfa]">
                {c.count} articles <span>→</span>
              </div>
              <div className="hcat-line" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HelpCategories;
