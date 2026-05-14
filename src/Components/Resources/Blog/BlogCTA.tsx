import React, { useEffect, useRef, useState } from "react";

const BlogCTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        .bcta-fade { animation: fadeUp 0.55s ease forwards; }
        @keyframes mailBounce { 0%,100%{transform:rotate(-8deg) scale(1);}50%{transform:rotate(8deg) scale(1.1);} }
        .mail-bounce { animation: mailBounce 3s ease-in-out infinite; }
        .bcta-input:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.12); }
        .bcta-btn {
          transition:background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease;
          position:relative; overflow:hidden;
        }
        .bcta-btn:hover { background:#6b4ce0!important; transform:translateY(-2px); box-shadow:0 6px 22px rgba(124,92,252,0.45); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .bcta-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .bcta-btn:hover::after { animation:shimmer 0.55s ease forwards; }
        @keyframes checkPop { 0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);} }
        .check-pop { animation:checkPop 0.4s ease forwards; }
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
        className={`relative overflow-hidden rounded-2xl border border-white/8 bg-[#0c0a1e] ${visible ? "bcta-fade" : "opacity-0"}`}
      >
        {/* Spotlight */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(400px circle at ${mouse.x}% ${mouse.y}%, rgba(124,92,252,0.09), transparent 65%)`,
          }}
        />
        <div className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center gap-6 px-6 py-5">
          {/* Icon */}
          <div className="mail-bounce flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7c5cfc]/20 text-2xl ring-1 ring-[#7c5cfc]/30">
            ✉️
          </div>

          {/* Text */}
          <div className="flex-1 min-w-50">
            <p className="text-[15px] font-bold text-white">
              Never miss an update
            </p>
            <p className="mt-0.5 text-[12px] text-gray-500">
              Join 12,000+ readers getting AI insights and Operino updates.
            </p>
          </div>

          {/* Email + Button */}
          <div className="flex flex-wrap items-center gap-2 ml-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bcta-input rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-gray-200 placeholder-gray-600 transition-all w-50"
            />
            {subscribed ? (
              <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-2.5 text-[13px] font-semibold text-emerald-400">
                ✓ Subscribed!
              </div>
            ) : (
              <button
                onClick={() => email && setSubscribed(true)}
                className="bcta-btn rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-semibold text-white"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCTA;
