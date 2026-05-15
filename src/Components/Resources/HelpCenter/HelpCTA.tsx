import React, { useEffect, useRef, useState } from "react";

const HelpCTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        .hcta-fade { animation: fadeUp 0.55s ease forwards; }
        @keyframes mailWiggle { 0%,100%{transform:rotate(-8deg) scale(1);}50%{transform:rotate(8deg) scale(1.12);} }
        .mail-wiggle { animation: mailWiggle 3s ease-in-out infinite; }
        .hcta-btn {
          transition:background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease,color 0.22s ease,border-color 0.22s ease;
          position:relative; overflow:hidden;
        }
        .hcta-btn:hover { transform:translateY(-2px); }
        .hcta-btn.primary:hover { background:#6b4ce0!important; box-shadow:0 6px 20px rgba(124,92,252,0.45); }
        .hcta-btn.outline:hover { border-color:rgba(167,139,250,0.7)!important; background:rgba(124,92,252,0.1)!important; }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .hcta-btn.primary::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .hcta-btn.primary:hover::after { animation:shimmer 0.55s ease forwards; }
        @keyframes checkPop { 0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);} }
        .check-pop { animation:checkPop 0.4s ease forwards; }
      `}</style>

      <div ref={ref}
        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
        className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0a1e] ${visible ? "hcta-fade" : "opacity-0"}`}>

        {/* Spotlight */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(380px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.09), transparent 65%)` }} />
        <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center gap-5 px-6 py-4">
          {/* Mail icon */}
          <div className="mail-wiggle flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#7c5cfc]/20 text-xl ring-1 ring-[#7c5cfc]/30">
            ✉️
          </div>

          {/* Text */}
          <div className="flex-1 min-w-[160px]">
            <p className="text-[14px] font-bold text-white">Can't find an answer?</p>
            <p className="text-[12px] text-gray-500 mt-0.5">Send us a message and we'll get back to you as soon as possible.</p>
          </div>

          {/* Button */}
          <div className="ml-auto">
            {sent ? (
              <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/15 px-5 py-2.5 text-[13px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                ✓ Message sent!
              </div>
            ) : (
              <button onClick={() => setSent(true)}
                className="hcta-btn outline rounded-xl border border-[#7c5cfc]/50 bg-transparent px-5 py-2.5 text-[13px] font-semibold text-[#a78bfa]">
                Send a message
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCTA;
