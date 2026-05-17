import React, { useEffect, useState } from "react";
import opifree from "../../assets/Photos/Opi-FreeStart.png";
interface Props {
  onDone: () => void;
}

const steps = [
  "Setting things up",
  "Configuring your AI",
  "Preparing integrations",
];

const OnboardingStep5Creating: React.FC<Props> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 1.2;
      setProgress(Math.min(p, 100));
      setCurrentStep(p < 35 ? 0 : p < 70 ? 1 : 2);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onDone, 600);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .s5-fade{animation:fadeUp 0.5s ease forwards;}
        @keyframes robotSpin{0%,100%{transform:rotate(-3deg) scale(1);}50%{transform:rotate(3deg) scale(1.04);}}
        .s5-robot{animation:robotSpin 2s ease-in-out infinite;}
        @keyframes orbitSpin{from{transform:rotate(0deg) translateX(80px);}to{transform:rotate(360deg) translateX(80px);}}
        .orbit-dot{animation:orbitSpin 3s linear infinite;}
        .orbit-dot:nth-child(2){animation-delay:-1s;}
        .orbit-dot:nth-child(3){animation-delay:-2s;}
        @keyframes progressGlow{0%,100%{box-shadow:0 0 8px rgba(124,92,252,0.4);}50%{box-shadow:0 0 18px rgba(124,92,252,0.8);}}
        .prog-bar{animation:progressGlow 1.5s ease-in-out infinite;}
        @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
        .s5-pct{animation:pulse 1s ease-in-out infinite;}
      `}</style>
      <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center">
        <div className="s5-fade" style={{ animationDelay: "0s" }}>
          <div className="flex items-center gap-2 justify-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">
              5
            </div>
            <span className="text-[13px] font-semibold text-[#a78bfa]">
              Creating
            </span>
          </div>
        </div>
        <div className="s5-fade" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-['Poppins'] text-[clamp(22px,3vw,45px)] font-extrabold text-white">
            Creating your AI workspace...
          </h2>
          <p className="mt-1 text-[13px] text-gray-400">
            This will only take a few seconds.
          </p>
        </div>

        {/* Robot with orbiting icons */}
        <div
          className="s5-fade relative flex h-50 w-50 items-center justify-center"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute inset-0 rounded-full bg-[#7c5cfc]/10 blur-2xl" />
          {/* Orbit rings */}
          {[80, 110].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-[#7c5cfc]/20"
              style={{ width: r * 2, height: r * 2 }}
            />
          ))}
          {/* Orbiting dots */}
          {["💬", "👥", "⚡"].map((e, i) => (
            <div
              key={i}
              className="orbit-dot absolute flex h-9 w-9 items-center justify-center rounded-full bg-[#7c5cfc]/30 text-base ring-1 ring-[#7c5cfc]/40"
              style={{
                animationDelay: `${-i}s`,
                top: "50%",
                left: "50%",
                marginTop: "-18px",
                marginLeft: "-18px",
              }}
            >
              {e}
            </div>
          ))}
          <img
            src={opifree}
            alt="Creating"
            className="s5-robot relative z-10 w-70 drop-shadow-[0_8px_24px_rgba(124,92,252,0.6)]"
          />
        </div>

        {/* Progress bar */}
        <div
          className="s5-fade w-full max-w-xs"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="prog-bar h-full rounded-full bg-linear-to-r from-[#7c5cfc] to-[#a78bfa] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px]">
                  <div
                    className={`h-2 w-2 rounded-full transition-all ${i <= currentStep ? "bg-[#7c5cfc]" : "bg-white/20"}`}
                  />
                  <span
                    className={
                      i <= currentStep ? "text-[#a78bfa]" : "text-gray-600"
                    }
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <span className="s5-pct text-[13px] font-bold text-[#a78bfa]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default OnboardingStep5Creating;
