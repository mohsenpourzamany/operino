import React, { useEffect, useRef, useState } from "react";
import opidocs from "../../assets/Photos/OpiDocs-1.png";
const DocsHelpBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hb-fade { animation: fadeIn 0.55s ease forwards; }

        @keyframes robotWiggle {
          0%,100% { transform: rotate(-3deg) scale(1); }
          50%      { transform: rotate(3deg) scale(1.06); }
        }
        .robot-wiggle { animation: robotWiggle 3s ease-in-out infinite; }

        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(350%) skewX(-15deg); }
        }

        .btn-primary-hb {
          position: relative; overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }
        .btn-primary-hb::after {
          content:''; position:absolute;
          top:0; left:0; width:30%; height:100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%) skewX(-15deg);
        }
        .btn-primary-hb:hover { transform:translateY(-2px); box-shadow:0 6px 22px rgba(124,92,252,0.5); }
        .btn-primary-hb:hover::after { animation: shimmer 0.55s ease forwards; }

        .btn-outline-hb {
          transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
        }
        .btn-outline-hb:hover {
          transform: translateY(-2px);
          border-color: rgba(167,139,250,0.7);
          background: rgba(124,92,252,0.1);
        }
      `}</style>

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden rounded-2xl border mr-50 ml-50 border-white/8 bg-[#0c0a1e] ${visible ? "hb-fade" : "opacity-0"}`}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.09), transparent 65%)`,
          }}
        />

        {/* Ambient orb */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-wrap items-center gap-4 px-5 py-4">
          {/* Robot */}
          <div className="robot-wiggle shrink-0">
            <div className="flex w-40 items-center justify-center rounded-full bg-[#7c5cfc]/20 text-2xl ring-1 ring-[#7c5cfc]/30">
              <img src={opidocs} alt="Robot" className="w-40" />
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-40">
            <p className="text-[14px] font-bold text-white">Still need help?</p>
            <p className="text-[12px] text-gray-500">
              Our team is here to support you with any questions.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3 ml-auto">
            <button className="btn-primary-hb rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-semibold text-white">
              Contact Support
            </button>
            <button className="btn-outline-hb flex items-center gap-2 rounded-xl border border-white/15 bg-white/4 px-5 py-2.5 text-[13px] font-semibold text-white">
              <span className="text-[12px]">👥</span> Join Community
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsHelpBanner;
