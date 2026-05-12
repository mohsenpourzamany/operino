import React, { useEffect, useRef, useState } from "react";

const steps = [
  { num: 1, label: "Get Started", desc: "Basics and essentials" },
  { num: 2, label: "Build", desc: "Integrate and build" },
  { num: 3, label: "Optimize", desc: "Analyze and improve" },
  { num: 4, label: "Scale", desc: "Best practices and scaling" },
];

const GuideLearningPath: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);} }
        .lp-fade { animation: fadeIn 0.6s ease forwards; }

        .lp-step {
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease;
          cursor: pointer; border: 1px solid transparent;
        }
        .lp-step:hover { background: rgba(124,92,252,0.08); border-color: rgba(124,92,252,0.2); transform: translateX(3px); }
        .lp-step.lp-active { background: rgba(124,92,252,0.12); border-color: rgba(124,92,252,0.35); }

        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.4);} 50%{box-shadow:0 0 0 6px rgba(124,92,252,0);} }
        .step-num-active { animation: pulse 2s ease-in-out infinite; }

        .start-btn {
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          position: relative; overflow: hidden;
        }
        .start-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(124,92,252,0.45); background:#6b4ce0 !important; }

        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);} 100%{transform:translateX(300%) skewX(-15deg);} }
        .start-btn::after {
          content:''; position:absolute; top:0; left:0; width:30%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
          transform:translateX(-100%) skewX(-15deg);
        }
        .start-btn:hover::after { animation:shimmer 0.55s ease forwards; }

        .contact-btn {
          transition: border-color 0.22s ease, background 0.22s ease, transform 0.22s ease;
        }
        .contact-btn:hover { border-color:rgba(124,92,252,0.5); background:rgba(124,92,252,0.08); transform:translateY(-2px); }
      `}</style>

      <aside
        ref={ref}
        className="flex h-screen w-[200px] flex-shrink-0 flex-col gap-4 overflow-y-auto border-l border-white/8 bg-[#07050f] px-3 py-5"
      >
        {/* Learning Path */}
        <div className={`${visible ? "lp-fade" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
          <p className="mb-3 text-[13px] font-bold text-white">Learning Path</p>
          <div className="flex flex-col gap-1.5">
            {steps.map((s) => (
              <div key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`lp-step flex items-center gap-3 rounded-xl p-2.5 ${activeStep === s.num ? "lp-active" : ""}`}>
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                    activeStep === s.num ? "step-num-active bg-[#7c5cfc] text-white" : "bg-white/8 text-gray-500"
                  }`}
                >
                  {s.num}
                </div>
                <div>
                  <p className={`text-[12px] font-semibold leading-tight ${activeStep === s.num ? "text-white" : "text-gray-400"}`}>{s.label}</p>
                  <p className="text-[10px] text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* New to Operino */}
        <div className={`${visible ? "lp-fade" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          <div className="flex items-start gap-2.5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🚀</div>
            <div>
              <p className="text-[12px] font-bold text-white">New to Operino?</p>
              <p className="mt-0.5 text-[10px] leading-snug text-gray-500">
                Start with our step-by-step learning path designed for beginners.
              </p>
            </div>
          </div>
          <button className="start-btn mt-3 w-full rounded-xl bg-[#7c5cfc] py-2 text-[12px] font-semibold text-white">
            Start Learning
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8" />

        {/* Still need help */}
        <div className={`${visible ? "lp-fade" : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
          <div className="flex items-start gap-2.5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-xl">🎧</div>
            <div>
              <p className="text-[12px] font-bold text-white">Still need help?</p>
              <p className="mt-0.5 text-[10px] leading-snug text-gray-500">
                Our team is here to support you with any questions.
              </p>
            </div>
          </div>
          <button className="contact-btn mt-3 w-full rounded-xl border border-white/12 bg-white/4 py-2 text-[12px] font-semibold text-white">
            🎧 Contact Support
          </button>
        </div>
      </aside>
    </>
  );
};

export default GuideLearningPath;
