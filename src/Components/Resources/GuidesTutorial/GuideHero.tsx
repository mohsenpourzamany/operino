/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import opiguide from "../../../assets/Photos/Opi-Guide-1.png";
const GuideHero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
        .gh-fade { animation: fadeUp 0.6s ease forwards; }

        @keyframes robotFloat {
          0%,100% { transform:translateY(0) rotate(-1deg); }
          50%      { transform:translateY(-12px) rotate(1deg); }
        }
        .robot-float { animation: robotFloat 4s ease-in-out infinite; }

        @keyframes iconFloat {
          0%,100% { transform:translateY(0) scale(1); }
          50%      { transform:translateY(-8px) scale(1.08); }
        }

        @keyframes gradShift {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }
        .hero-title {
          background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 5s ease infinite;
        }

        .gh-search:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.12); }
      `}</style>

      <div
        ref={ref}
        className="relative flex flex-wrap items-center justify-between gap-4 pb-8"
      >
        {/* Left */}
        <div className="flex-1 min-w-55">
          <h1
            className={`hero-title font-['DM_Sans'] text-[clamp(28px,4vw,46px)] font-bold leading-tight ${visible ? "gh-fade" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            Guides &amp; Tutorials
          </h1>
          <p
            className={`mt-2 max-w-md text-[clamp(12px,1.4vw,15px)] leading-relaxed text-gray-400 ${visible ? "gh-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            Step-by-step guides and video tutorials to help you build,
            integrate,
            <br />
            and scale with Operino.
          </p>
          <div
            className={`relative mt-5 max-w-xs ${visible ? "gh-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search guides..."
              className="gh-search w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-12 text-[13px] text-gray-200 placeholder-gray-600 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-gray-500">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right: Robot */}
        <div
          className={`relative shrink-0 ${visible ? "gh-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {[
            { emoji: "▶️", top: "5%", left: "-10%", delay: "0s" },
            { emoji: "🎓", top: "8%", right: "-5%", delay: "0.6s" },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl backdrop-blur-sm"
              style={{
                top: b.top,
                left: (b as any).left,
                right: (b as any).right,
                animation: `iconFloat 3s ease-in-out infinite`,
                animationDelay: b.delay,
              }}
            >
              {b.emoji}
            </div>
          ))}
          <div className="absolute bottom-0 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/25 blur-2xl" />
          <img
            src={opiguide}
            alt="Guide Robot"
            className="robot-float relative z-10 w-[clamp(150px,20vw,240px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.5)]"
          />
        </div>
      </div>
    </>
  );
};

export default GuideHero;
