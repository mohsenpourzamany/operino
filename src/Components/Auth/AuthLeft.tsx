/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";
import OpiLogin from "../../assets/Photos/Opi-Login-1.png";
import OpiLogo from "../../assets/operino-favicon.svg";
const features = [
  {
    icon: "⚡",
    title: "AI Employees",
    desc: "Smart agents that work 24/7 for your business.",
  },
  {
    icon: "📊",
    title: "Automate & Scale",
    desc: "Streamline operations and grow without limits.",
  },
  {
    icon: "🛡️",
    title: "Secure & Reliable",
    desc: "Enterprise-grade security you can trust.",
  },
];

interface Props {
  mode: "login" | "register";
}

const AuthLeft: React.FC<Props> = ({ mode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prevMode, setPrevMode] = useState(mode);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (mode !== prevMode) {
      setAnimKey((k) => k + 1);
      setPrevMode(mode);
    }
  }, [mode, prevMode]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);} }
        .al-fade { animation: fadeUp 0.65s ease forwards; }

        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-16px) rotate(1deg);} }
        .al-robot { animation: robotFloat 5s ease-in-out infinite; }

        @keyframes gradShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        .al-gradient {
          background: linear-gradient(135deg,#a78bfa,#7c5cfc,#c4b5fd,#7c5cfc);
          background-size:300% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:gradShift 4s ease infinite;
        }

        @keyframes waveFloat {
          0%,100%{transform:translateY(0) scaleY(1);}
          50%{transform:translateY(-8px) scaleY(1.05);}
        }
        .wave-anim { animation:waveFloat 6s ease-in-out infinite; }

        @keyframes particleDrift {
          0%{transform:translate(0,0) scale(1); opacity:0.6;}
          50%{transform:translate(10px,-15px) scale(1.2); opacity:1;}
          100%{transform:translate(0,0) scale(1); opacity:0.6;}
        }

        .feat-card {
          transition:background 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .feat-card:hover { background:rgba(124,92,252,0.12)!important; border-color:rgba(124,92,252,0.4)!important; transform:translateX(4px); }
        .feat-card:hover .feat-icon { transform:scale(1.15) rotate(-5deg); }
        .feat-icon { transition:transform 0.28s ease; }

        @keyframes titleSwitch {
          0%{opacity:0;transform:translateY(12px);}
          100%{opacity:1;transform:translateY(0);}
        }
        .title-switch { animation:titleSwitch 0.5s ease forwards; }

        /* Particle dots */
        .particle {
          position:absolute; border-radius:50%;
          background:rgba(167,139,250,0.5);
          animation:particleDrift ease-in-out infinite;
        }

        /* Stars */
        .star { position:absolute; width:2px; height:2px; border-radius:50%; background:white; }
        @keyframes twinkle { 0%,100%{opacity:0.15;}50%{opacity:0.9;} }
      `}</style>

      <div
        ref={ref}
        className="relative flex h-full w-full flex-col justify-between overflow-hidden px-[clamp(28px,5vw,64px)] py-[clamp(24px,4vw,48px)]"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Starfield */}
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
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

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute left-[-10%] top-[20%] h-75 w-75 rounded-full bg-[#7c5cfc] opacity-[0.12] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[10%] right-[-5%] h-50 w-50 rounded-full bg-[#a78bfa] opacity-[0.1] blur-[80px]" />

        {/* Logo */}
        <div
          className={`${visible ? "al-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex w-12 items-center justify-center rounded-lg bg-[#7c5cfc]/25 text-base ring-1 ring-[#7c5cfc]/40">
              <img src={OpiLogo} alt="Opi" className=" w-10" />
            </div>
            <span className="text-[16px] font-bold text-white">Operino</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div
            key={`title-${animKey}`}
            className={`${visible ? "al-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            {mode === "login" ? (
              <h1
                key="login-title"
                className="title-switch font-['Syne'] text-[clamp(26px,4vw,46px)] font-extrabold leading-[1.15] text-white"
              >
                Welcome to your
                <br />
                <span className="al-gradient">AI workforce.</span>
              </h1>
            ) : (
              <h1
                key="reg-title"
                className="title-switch font-['inter'] text-[clamp(26px,4vw,46px)] font-bold leading-[1.15] text-white"
              >
                Build your first
                <br />
                <span className="al-gradient">AI employee</span>
                <br />
                in minutes.
              </h1>
            )}
            <p className="mt-3 max-w-xs text-[clamp(12px,1.4vw,14px)] leading-relaxed text-gray-400">
              Automate conversations, workflows, and
              <br />
              operations with Operino AI Agents.
            </p>
          </div>

          {/* Robot */}
          <div
            className={`relative ${visible ? "al-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="absolute bottom-2 left-1/2 h-14 w-45 -translate-x-1/2 rounded-full bg-[#7c5cfc]/20 blur-2xl" />
            <img
              src={OpiLogin}
              alt="Operino AI"
              className="al-robot relative z-10 w-[clamp(200px,28vw,340px)] drop-shadow-[0_20px_60px_rgba(124,92,252,0.5)]"
            />
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feat-card flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 ${visible ? "al-fade" : "opacity-0"}`}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="feat-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/20 text-base ring-1 ring-[#7c5cfc]/30">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{f.title}</p>
                  <p className="text-[11px] text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div
          className={`${visible ? "al-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3 backdrop-blur-sm">
            <div className="flex">
              {["👨", "👩", "👨‍💼", "👩‍💼"].map((a, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 -ml-2 first:ml-0 items-center justify-center rounded-full bg-[#7c5cfc]/25 text-base ring-2 ring-[#07050f]"
                >
                  {a}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#a78bfa] text-xs">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                Trusted by{" "}
                <span className="font-semibold text-white">1,200+ teams</span>{" "}
                worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="wave-anim pointer-events-none absolute bottom-0 left-0 right-0 h-20 opacity-20">
          <svg
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c5cfc" stopOpacity="0" />
                <stop offset="50%" stopColor="#7c5cfc" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,40 C50,10 100,70 150,40 C200,10 250,70 300,40 C350,10 380,60 400,40 L400,80 L0,80 Z"
              fill="url(#wg)"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default AuthLeft;
