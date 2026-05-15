import React, { useEffect, useRef, useState } from "react";
import OpiHello from "../../../src/assets/Photos/Opi-Hello.png";
interface Props {
  billing: "monthly" | "yearly";
  onBillingChange: (b: "monthly" | "yearly") => void;
}

const PricingHero: React.FC<Props> = ({ billing, onBillingChange }) => {
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

  const badges = [
    { icon: "💳", label: "No credit card required" },
    { icon: "🔄", label: "Cancel anytime" },
    { icon: "🛡️", label: "14-day money-back guarantee" },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .ph-fade { animation: fadeUp 0.6s ease forwards; }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);} }
        .ph-robot { animation: robotFloat 4s ease-in-out infinite; }
        @keyframes gradShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        .ph-gradient {
          background: linear-gradient(135deg,#a78bfa,#7c5cfc,#c4b5fd);
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:gradShift 4s ease infinite;
        }
        .billing-toggle {
          transition: all 0.3s ease;
        }
        .toggle-pill {
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease;
        }
        @keyframes saveBadgePop { 0%{transform:scale(0) translateY(4px);}70%{transform:scale(1.1);}100%{transform:scale(1) translateY(0);} }
        .save-badge-enter { animation:saveBadgePop 0.4s ease forwards; }
      `}</style>

      <div ref={ref} className="relative overflow-hidden">
        <div className="pointer-events-none absolute right-[10%] top-[-10%] h-80 w-[320px] rounded-full bg-[#7c5cfc] opacity-[0.07] blur-[90px]" />

        <div className="flex flex-wrap items-center justify-between gap-6 pb-10">
          {/* Left */}
          <div className="flex-1 min-w-65">
            <h1
              className={`font-['DM_Sans'] text-[clamp(28px,4.5vw,50px)] font-bold leading-[1.15] text-white ${visible ? "ph-fade" : "opacity-0"}`}
              style={{ animationDelay: "0s" }}
            >
              Simple, transparent pricing
              <br />
              for teams of <span className="ph-gradient">every size</span>
            </h1>
            <p
              className={`mt-3 max-w-sm text-[clamp(13px,1.4vw,15px)] leading-relaxed text-gray-400 ${visible ? "ph-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.15s" }}
            >
              Start free. Upgrade when you grow. No hidden fees,
              <br />
              cancel anytime.
            </p>

            {/* Trust badges */}
            <div
              className={`mt-5 flex flex-wrap gap-3 ${visible ? "ph-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.28s" }}
            >
              {badges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-gray-400"
                >
                  <span className="text-sm">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>

            {/* Billing toggle */}
            <div
              className={`mt-7 flex items-center justify-center gap-3 ${visible ? "ph-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="relative flex items-center rounded-full border border-white/12 bg-white/6 p-1">
                {/* Sliding pill */}
                <div
                  className="toggle-pill absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-[#1a1332]"
                  style={{
                    left: billing === "monthly" ? "4px" : "calc(50% + 0px)",
                  }}
                />
                <button
                  onClick={() => onBillingChange("monthly")}
                  className={`relative z-10 rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors duration-300 ${billing === "monthly" ? "text-white" : "text-gray-500"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => onBillingChange("yearly")}
                  className={`relative z-10 rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors duration-300 ${billing === "yearly" ? "text-white" : "text-gray-500"}`}
                >
                  Yearly
                </button>
              </div>
              {billing === "yearly" && (
                <span className="save-badge-enter rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">
                  Save 20%
                </span>
              )}
            </div>
          </div>

          {/* Right: Robot */}
          <div
            className={`relative shrink-0 ${visible ? "ph-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.18s" }}
          >
            <div className="absolute bottom-0 left-1/2 h-12 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/20 blur-2xl" />
            <img
              src={OpiHello}
              alt="Pricing Robot"
              className="ph-robot relative z-10 w-[clamp(160px,22vw,280px)] drop-shadow-[0_16px_48px_rgba(124,92,252,0.45)]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingHero;
