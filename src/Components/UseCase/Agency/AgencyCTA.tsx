import React, { useEffect, useRef, useState } from "react";
import opiagency from "../../../assets/Photos/Opi-Agency-1.png";
const AgencyCTA: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    if (sectionRef.current) observer.observe(sectionRef.current);
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
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .agency-cta { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-fade { animation: fadeUp 0.65s ease forwards; }

        @keyframes robotFloat {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        .robot-anim { animation: robotFloat 4s ease-in-out infinite; }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-7px) scale(1.06); }
        }

        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .btn-main {
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-main::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0.55s ease;
        }
        .btn-main:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(124,92,252,0.55); }
        .btn-main:hover::after { left: 160%; }

        .btn-outline {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .btn-outline:hover {
          transform: translateY(-3px);
          border-color: rgba(167,139,250,0.7);
          background: rgba(124,92,252,0.1);
        }

        .float-icon {
          animation: iconFloat 3s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }
      `}</style>

      <div
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="agency-cta relative  overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, #0d0b1f 0%, #130f2e 60%, #0d0b1f 100%)",
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-100"
          style={{
            background: `radial-gradient(500px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.1), transparent 65%)`,
          }}
        />

        {/* Ambient orb */}
        <div className="pointer-events-none absolute right-[28%] top-[-40%] h-70 w-70 rounded-full bg-[#7c5cfc] opacity-[0.08] blur-[80px]" />

        {/* Content */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-[clamp(24px,5vw,64px)] py-[clamp(28px,4vw,48px)]">
          {/* Left: text */}
          <div
            className={`max-w-xs ${visible ? "cta-fade" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            <h2 className="text-[clamp(20px,3vw,32px)] font-bold leading-[1.2] text-white">
              Ready to scale your agency
              <br />
              with AI?
            </h2>
            <p className="mt-3 text-[clamp(13px,1.4vw,15px)] leading-relaxed text-gray-400">
              Join thousands of agencies using Operino to deliver
              <br />
              better results and grow faster.
            </p>
          </div>

          {/* Center: buttons */}
          <div
            className={`flex flex-wrap items-center gap-4 ${visible ? "cta-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <button className="btn-main flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-[clamp(18px,2.5vw,28px)] py-[clamp(11px,1.5vw,14px)] text-[clamp(13px,1.3vw,15px)] font-semibold text-white">
              Start for Free <span>→</span>
            </button>
            <button className="btn-outline rounded-xl border border-white/20 bg-white/5 px-[clamp(18px,2.5vw,28px)] py-[clamp(11px,1.5vw,14px)] text-[clamp(13px,1.3vw,15px)] font-semibold text-white">
              Book a Demo
            </button>
          </div>

          {/* Right: robot + floating icons */}
          <div
            className={`relative shrink-0 ${visible ? "cta-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.35s" }}
          >
            {/* Floating icon — chart */}
            <div
              className="float-icon absolute -left-8 top-0 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl"
              style={{ animationDelay: "0s" }}
            >
              📈
            </div>

            {/* Floating icon — people */}
            <div
              className="float-icon absolute -right-2 top-2 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl"
              style={{ animationDelay: "0.6s" }}
            >
              👥
            </div>

            {/* Glow under robot */}
            <div className="absolute bottom-0 left-1/2 h-10 w-28 -translate-x-1/2 rounded-full bg-[#7c5cfc]/30 blur-xl" />

            {/* Robot */}
            <img
              src={opiagency}
              alt="Operino Agency Robot"
              className="robot-anim relative z-10 w-[clamp(120px,18vw,200px)] drop-shadow-[0_12px_32px_rgba(124,92,252,0.5)]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyCTA;
