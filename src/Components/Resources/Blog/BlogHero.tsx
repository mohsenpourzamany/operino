/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import opiblogrobot from "../../../assets/Photos/Opi-Blog-1.png";
const tabs = [
  "All Articles",
  "AI Agents",
  "Automation",
  "Tutorials",
  "Product Updates",
  "Case Studies",
];

interface Props {
  activeTab: string;
  onTabChange: (t: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

const BlogHero: React.FC<Props> = ({
  activeTab,
  onTabChange,
  search,
  onSearchChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .bh-fade { animation: fadeUp 0.6s ease forwards; }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);} }
        .bh-robot { animation: robotFloat 4s ease-in-out infinite; }
        @keyframes iconFloat { 0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        .bh-title {
          background: linear-gradient(135deg,#fff 0%,#a78bfa 50%,#fff 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:gradShift 5s ease infinite;
        }
        .bh-search:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.12); }
        .bh-tab { transition:background 0.2s ease,color 0.2s ease,border-color 0.2s ease; white-space:nowrap; }
        .bh-tab:hover { background:rgba(124,92,252,0.12); color:white; }
      `}</style>

      <div ref={ref} className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute right-[20%] top-[-20%] h-75 w-75 rounded-full bg-[#7c5cfc] opacity-[0.08] blur-[80px]" />

        <div className="flex flex-wrap items-start justify-between gap-6 pb-8 pt-4">
          {/* Left */}
          <div className="flex-1 min-w-60">
            {/* Breadcrumb */}
            <p
              className={`mb-4 text-[11px] text-gray-600 ${visible ? "bh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0s" }}
            >
              Home <span className="mx-1">›</span> Resources{" "}
              <span className="mx-1">›</span>
              <span className="text-[#a78bfa]">Blogs</span>
            </p>

            <h1
              className={`bh-title font-['DM_Sans'] text-[clamp(28px,5vw,52px)] font-bold leading-tight ${visible ? "bh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              Operino Blog
            </h1>
            <p
              className={`mt-2 max-w-xs text-[clamp(13px,1.4vw,15px)] leading-relaxed text-gray-400 ${visible ? "bh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Insights, tutorials, and updates on AI, automation,
              <br />
              and building smarter workflows.
            </p>

            {/* Search */}
            <div
              className={`relative mt-5 max-w-sm ${visible ? "bh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bh-search w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-12 text-[13px] text-gray-200 placeholder-gray-600 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-gray-500">
                ⌘K
              </span>
            </div>

            {/* Tabs */}
            <div
              className={`mt-4 flex flex-wrap gap-2 ${visible ? "bh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => onTabChange(t)}
                  className={`bh-tab rounded-full px-4 py-1.5 text-[12px] font-semibold border transition-all ${
                    activeTab === t
                      ? "bg-[#7c5cfc] border-[#7c5cfc] text-white"
                      : "border-white/12 bg-white/5 text-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Right: robot */}
          <div
            className={`relative shrink-0 ${visible ? "bh-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            {[
              { e: "💬", top: "8%", left: "0%", d: "0s" },
              { e: "✏️", top: "5%", right: "0%", d: "0.5s" },
              { e: "📄", top: "40%", right: "-2%", d: "1s" },
            ].map((b, i) => (
              <div
                key={i}
                className="absolute flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl backdrop-blur-sm"
                style={{
                  top: b.top,
                  left: (b as any).left,
                  right: (b as any).right,
                  animation: "iconFloat 3s ease-in-out infinite",
                  animationDelay: b.d,
                }}
              >
                {b.e}
              </div>
            ))}
            <div className="absolute bottom-0 left-1/2 h-10 w-28 -translate-x-1/2 rounded-full bg-[#7c5cfc]/20 blur-2xl" />
            <img
              src={opiblogrobot}
              alt="Blog Robot"
              className="bh-robot relative z-10 w-[clamp(180px,24vw,300px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.45)]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogHero;
