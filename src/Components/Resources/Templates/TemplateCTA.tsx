import React, { useEffect, useRef, useState } from "react";
import opitemp from "../../../assets/Photos/Opi-Template-1.png";
const TemplateCTA: React.FC = () => {
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

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);} }
        .tcta-fade { animation: fadeUp 0.55s ease forwards; }
        .create-btn {
          transition:transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          position:relative; overflow:hidden;
        }
        .create-btn:hover { transform:translateY(-2px); box-shadow:0 6px 22px rgba(124,92,252,0.45); background:#6b4ce0!important; }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .create-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .create-btn:hover::after { animation:shimmer 0.55s ease forwards; }
        @keyframes robotPulse { 0%,100%{transform:scale(1) rotate(-3deg);}50%{transform:scale(1.08) rotate(3deg);} }
        .robot-pulse { animation: robotPulse 3s ease-in-out infinite; }
      `}</style>

      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: ((e.clientX - r.left) / r.width) * 100,
            y: ((e.clientY - r.top) / r.height) * 100,
          });
        }}
        className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0a1e] ${visible ? "tcta-fade" : "opacity-0"}`}
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(350px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.1), transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center gap-4 px-6 py-5">
          {/* Robot icon */}
          <div className="robot-pulse flex  w-30 shrink-0 items-center justify-center rounded-2xl bg-[#7c5cfc]/20 text-2xl ring-1 ring-[#7c5cfc]/30">
            <img src={opitemp} alt="Robot Icon" className=" w-30" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-45">
            <p className="text-[15px] font-bold text-white">
              Can't find what you need?
            </p>
            <p className="mt-0.5 text-[12px] text-gray-500">
              Create your own template from scratch and share it with your team.
            </p>
          </div>

          {/* Button */}
          <button className="create-btn ml-auto flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-semibold text-white">
            <span>＋</span> Create Custom Template
          </button>
        </div>
      </div>
    </>
  );
};

export default TemplateCTA;
