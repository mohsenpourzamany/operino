/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
import React, { useState } from "react";
import OnboardingStep1Welcome from "../Components/FreeStart/OnboardingStep1Welcome";
import OnboardingStep2Business from "../Components/FreeStart/OnboardingStep2Business";
import OnboardingStep3Goal from "../Components/FreeStart/OnboardingStep3Goal";
import OnboardingStep4Channels from "../Components/FreeStart/OnboardingStep4Channels";
import OnboardingStep5Creating from "../Components/FreeStart/OnboardingStep5Creating";
import OnboardingStep6Dashboard from "../Components/FreeStart/OnboardingStep6Dashboard";

const STEPS = [
  "Welcome",
  "Business",
  "Goal",
  "Channels",
  "Creating",
  "Dashboard",
];

const FreeStartPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "back">("next");
  const [userData, setUserData] = useState<any>({});
  const [animKey, setAnimKey] = useState(0);

  const goNext = (data?: any) => {
    if (data) setUserData((p: any) => ({ ...p, ...data }));
    setDirection("next");
    setAnimKey((k) => k + 1);
    setStep((s) => Math.min(s + 1, 5));
  };
  const goBack = () => {
    setDirection("back");
    setAnimKey((k) => k + 1);
    setStep((s) => Math.max(s - 1, 0));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .fs-wrap { font-family:'DM Sans',sans-serif; }

        /* Grid bg */
        .fs-grid {
          position:absolute;inset:0;
          background-image:linear-gradient(rgba(124,92,252,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,92,252,0.04) 1px,transparent 1px);
          background-size:48px 48px;
        }

        /* Step connector line */
        .step-line { height:1px; background:linear-gradient(90deg,#7c5cfc,rgba(124,92,252,0.2)); }
        .step-line-inactive { height:1px; background:rgba(255,255,255,0.08); }

        /* Card slide animations */
        @keyframes slideInRight{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-40px);}to{opacity:1;transform:translateX(0);}}
        @keyframes slideOutLeft{from{opacity:1;transform:translateX(0);}to{opacity:0;transform:translateX(-40px);}}
        .slide-in-right{animation:slideInRight 0.4s cubic-bezier(0.34,1.1,0.64,1) forwards;}
        .slide-in-left{animation:slideInLeft 0.4s cubic-bezier(0.34,1.1,0.64,1) forwards;}

        .fs-card {
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:0 24px 64px rgba(0,0,0,0.5);
          transition:box-shadow 0.4s ease;
        }
        .fs-card:hover { box-shadow:0 32px 80px rgba(0,0,0,0.6),0 0 40px rgba(124,92,252,0.08); }

        /* Scrollbar */
        .fs-scroll::-webkit-scrollbar{width:3px;}
        .fs-scroll::-webkit-scrollbar-thumb{background:rgba(124,92,252,0.25);border-radius:4px;}

        /* Star */
        .fs-star{position:absolute;border-radius:50%;background:white;}
        @keyframes twinkle{0%,100%{opacity:0.1;}50%{opacity:0.8;}}

        /* Ambient orb */
        @keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(15px,-10px) scale(1.1);}}
      `}</style>

      <div className="fs-wrap relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07050f] px-4 py-8">
        <div className="fs-grid" />

        {/* Ambient orbs */}
        <div
          className="pointer-events-none absolute left-[-5%] top-[15%] h-87.5 w-87.5 rounded-full bg-[#7c5cfc] opacity-[0.07] blur-[100px]"
          style={{ animation: "orbFloat 8s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[-5%] h-62.5 w-62.5 rounded-full bg-[#a78bfa] opacity-[0.06] blur-[80px]"
          style={{ animation: "orbFloat 10s ease-in-out infinite reverse" }}
        />

        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="fs-star"
            style={{
              width: "2px",
              height: "2px",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationName: "twinkle",
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 3}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-250">
          {/* Step indicator */}
          <div className="mb-6 flex items-center justify-between px-1">
            {STEPS.map((label, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold transition-all duration-400 ${
                      i < step
                        ? "bg-[#7c5cfc] text-white shadow-[0_0_12px_rgba(124,92,252,0.5)]"
                        : i === step
                          ? "bg-[#7c5cfc] text-white ring-2 ring-[#a78bfa]/50 ring-offset-2 ring-offset-[#07050f]"
                          : "border border-white/15 bg-transparent text-gray-600"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-medium ${i === step ? "text-white" : i < step ? "text-[#a78bfa]" : "text-gray-600"}`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 mx-1 mb-4 ${i < step ? "step-line" : "step-line-inactive"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div
            key={animKey}
            className={`fs-card fs-scroll overflow-y-auto rounded-3xl bg-[#0c0a1e] ${direction === "next" ? "slide-in-right" : "slide-in-left"}`}
            style={{ minHeight: "clamp(420px,60vh,600px)" }}
          >
            {step === 0 && <OnboardingStep1Welcome onNext={() => goNext()} />}
            {step === 1 && (
              <OnboardingStep2Business onNext={goNext} onBack={goBack} />
            )}
            {step === 2 && (
              <OnboardingStep3Goal onNext={goNext} onBack={goBack} />
            )}
            {step === 3 && (
              <OnboardingStep4Channels onNext={goNext} onBack={goBack} />
            )}
            {step === 4 && <OnboardingStep5Creating onDone={() => goNext()} />}
            {step === 5 && (
              <OnboardingStep6Dashboard
                userData={userData}
                onFinish={() => alert("🚀 Welcome to your dashboard!")}
              />
            )}
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex justify-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === step ? 20 : 6,
                  height: 6,
                  background:
                    i < step
                      ? "#7c5cfc"
                      : i === step
                        ? "#a78bfa"
                        : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default FreeStartPage;
