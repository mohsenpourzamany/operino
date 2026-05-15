/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import opiHelp from "../../../Assets/Photos/Opi-HelpCenter-1.png";
interface Props {
  search: string;
  onSearch: (s: string) => void;
}

const HelpHero: React.FC<Props> = ({ search, onSearch }) => {
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
        .hh-fade { animation: fadeUp 0.6s ease forwards; }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);} }
        .hh-robot { animation: robotFloat 4s ease-in-out infinite; }
        @keyframes iconFloat { 0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-9px) scale(1.07);} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        .hh-title {
          background:linear-gradient(135deg,#fff 0%,#a78bfa 50%,#fff 100%);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:gradShift 5s ease infinite;
        }
        .hh-search:focus { outline:none; border-color:rgba(124,92,252,0.65); box-shadow:0 0 0 3px rgba(124,92,252,0.13); }
        @keyframes searchGlow { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0);}50%{box-shadow:0 0 20px 4px rgba(124,92,252,0.18);} }
        .hh-search-wrap:focus-within { animation:searchGlow 2s ease-in-out infinite; }
      `}</style>

      <div ref={ref} className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[15%] top-[-15%] h-70 w-70 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-[80px]" />

        <div className="flex flex-wrap items-start justify-between gap-4 pb-8 pt-2">
          {/* Left */}
          <div className="flex-1 min-w-60">
            <p
              className={`mb-4 text-[11px] text-gray-600 ${visible ? "hh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0s" }}
            >
              Home <span className="mx-1">›</span> Resources{" "}
              <span className="mx-1">›</span>
              <span className="text-[#a78bfa]">Help Center</span>
            </p>

            <h1
              className={`hh-title font-['DM_Sans'] text-[clamp(30px,5vw,52px)] font-bold leading-tight ${visible ? "hh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.1s" }}
            >
              Help Center
            </h1>
            <p
              className={`mt-2 max-w-xs text-[clamp(13px,1.4vw,15px)] leading-relaxed text-gray-400 ${visible ? "hh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Find answers, get support, and learn how to
              <br />
              make the most of Operino.
            </p>

            <div
              className={`hh-search-wrap relative mt-6 max-w-sm rounded-xl ${visible ? "hh-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.32s" }}
            >
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search for help articles..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="hh-search w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-[13px] text-gray-200 placeholder-gray-600 transition-all"
              />
            </div>
          </div>

          {/* Right: robot + icons */}
          <div
            className={`relative shrink-0 ${visible ? "hh-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            {[
              { e: "💬", top: "5%", left: "2%", d: "0s" },
              { e: "❓", top: "4%", right: "0%", d: "0.5s" },
              { e: "✉️", bottom: "22%", right: "0%", d: "1s" },
            ].map((b, i) => (
              <div
                key={i}
                className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl backdrop-blur-sm"
                style={{
                  top: b.top,
                  left: (b as any).left,
                  right: (b as any).right,
                  bottom: (b as any).bottom,
                  animation: "iconFloat 3s ease-in-out infinite",
                  animationDelay: b.d,
                }}
              >
                {b.e}
              </div>
            ))}
            <div className="absolute bottom-0 left-1/2 h-10 w-28 -translate-x-1/2 rounded-full bg-[#7c5cfc]/20 blur-2xl" />
            <img
              src={opiHelp}
              alt="Help Robot"
              className="hh-robot relative z-10 w-[clamp(180px,24vw,300px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.45)]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpHero;
