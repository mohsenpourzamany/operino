/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import opidocs from "../../../assets/Photos/OpiDocs-1.png";
const DocsHero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-fade { animation: fadeUp 0.6s ease forwards; }

        @keyframes robotFloat {
          0%,100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(1deg); }
        }
        .robot-float { animation: robotFloat 4s ease-in-out infinite; }

        @keyframes iconFloat {
          0%,100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-8px) scale(1.08); }
        }

        .search-bar:focus {
          outline: none;
          border-color: rgba(124,92,252,0.7);
          box-shadow: 0 0 0 3px rgba(124,92,252,0.15);
        }

        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #ffffff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }
      `}</style>

      <div
        ref={ref}
        className="relative flex flex-wrap items-center justify-between gap-6 pb-10 pt-2"
      >
        {/* Left: text + search */}
        <div className="flex-1 min-w-65">
          <h1
            className={`hero-title font-['DM_Sans'] text-[clamp(32px,5vw,52px)] font-bold leading-tight ${visible ? "hero-fade" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            Documentation
          </h1>
          <p
            className={`mt-2 max-w-sm text-[clamp(13px,1.5vw,16px)] leading-relaxed text-gray-400 ${visible ? "hero-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            Everything you need to build, deploy, and scale
            <br />
            AI experiences with Operino.
          </p>

          {/* Search */}
          <div
            className={`relative mt-6 max-w-sm ${visible ? "hero-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentation..."
              className="search-bar w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-14 text-[14px] text-gray-200 placeholder-gray-600 transition-all duration-200"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-gray-500">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: robot + floating icons */}
        <div
          className={`relative shrink-0 ${visible ? "hero-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Floating icon badges */}
          {[
            { emoji: "💬", top: "0%", left: "0%", delay: "0s" },
            { emoji: "</>", top: "5%", right: "0%", delay: "0.5s", text: true },
            { emoji: "📄", bottom: "15%", right: "0%", delay: "1s" },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-lg backdrop-blur-sm"
              style={{
                top: b.top,
                left: (b as any).left,
                right: (b as any).right,
                bottom: (b as any).bottom,
                animation: `iconFloat 3s ease-in-out infinite`,
                animationDelay: b.delay,
              }}
            >
              {b.text ? (
                <span className="text-[10px] font-bold text-[#a78bfa]">
                  {b.emoji}
                </span>
              ) : (
                b.emoji
              )}
            </div>
          ))}

          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 h-12 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/25 blur-2xl" />

          {/* Robot */}
          <img
            src={opidocs}
            alt="Operino Docs Robot"
            className="robot-float relative z-10 w-[clamp(160px,22vw,260px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.5)]"
          />
        </div>
      </div>
    </>
  );
};

export default DocsHero;
