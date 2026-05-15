import React from "react";
import Opiheloo from "../../assets/Photos/Opi-Hello.png";
interface Props {
  onNext: () => void;
}

const OnboardingStep1Welcome: React.FC<Props> = ({ onNext }) => (
  <>
    <style>{`
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      .s1-fade{animation:fadeUp 0.6s ease forwards;}
      @keyframes robotFloat{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);}}
      .s1-robot{animation:robotFloat 4s ease-in-out infinite;}
      @keyframes bubblePop{0%{opacity:0;transform:scale(0.7) translateY(8px);}60%{transform:scale(1.05);}100%{opacity:1;transform:scale(1) translateY(0);}}
      .s1-bubble{animation:bubblePop 0.5s ease 0.8s both;}
      @keyframes gradShift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
      .s1-gradient{background:linear-gradient(135deg,#a78bfa,#7c5cfc,#c4b5fd);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 4s ease infinite;}
      .s1-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease,background 0.22s ease;}
      .s1-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,92,252,0.5);background:#6b4ce0!important;}
      @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
      .s1-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
      .s1-btn:hover::after{animation:shimmer 0.55s ease forwards;}
      @keyframes pulseGlow{0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.4);}50%{box-shadow:0 0 0 8px rgba(124,92,252,0);}}
      .step-num-active{animation:pulseGlow 2s ease-in-out infinite;}
    `}</style>
    <div className="flex h-full flex-col items-center justify-between p-8 lg:flex-row lg:items-center lg:gap-8">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-5">
        <div
          className="s1-fade flex items-center gap-2"
          style={{ animationDelay: "0s" }}
        >
          <div className="step-num-active flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">
            1
          </div>
          <span className="text-[13px] font-semibold text-[#a78bfa]">
            Welcome to Operino
          </span>
        </div>
        <div className="s1-fade" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-['Poppins'] text-[clamp(24px,3.5vw,45px)] font-extrabold leading-tight text-white">
            Let's build your
            <br />
            first <span className="s1-gradient">AI employee.</span>
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
            Opi will guide you in a few simple steps to get everything ready.
          </p>
        </div>
        <div
          className="s1-fade flex flex-col gap-2"
          style={{ animationDelay: "0.25s" }}
        >
          {[
            "No credit card required",
            "Setup in under 2 minutes",
            "Cancel anytime",
          ].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[13px] text-gray-400"
            >
              <span className="text-[#7c5cfc]">✓</span>
              {t}
            </div>
          ))}
        </div>
        <div className="s1-fade" style={{ animationDelay: "0.4s" }}>
          <button
            onClick={onNext}
            className="s1-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-6 py-3 text-[14px] font-bold text-white"
          >
            Let's get started <span>→</span>
          </button>
        </div>
      </div>
      {/* Right: Robot */}
      <div
        className="s1-fade relative flex shrink-0 items-center justify-center"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="absolute bottom-2 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/25 blur-2xl" />
        <div className="s1-bubble absolute -right-2 top-4 z-20 rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-[12px] font-semibold text-gray-800 shadow-lg">
          Hi! I'm Opi 👋
          <br />
          <span className="font-normal text-gray-500 text-[11px]">
            I'll help you set up
            <br />
            your AI workforce.
          </span>
        </div>
        <img
          src={Opiheloo}
          alt="Opi"
          className="s1-robot relative z-10 w-[clamp(160px,22vw,260px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.5)]"
        />
      </div>
    </div>
  </>
);
export default OnboardingStep1Welcome;
