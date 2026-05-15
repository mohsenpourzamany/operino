import React, { useEffect, useState } from "react";

interface Props { userData: any; onFinish: () => void; }

const OnboardingStep6Dashboard: React.FC<Props> = ({ userData, onFinish }) => {
  const [visible, setVisible] = useState(false);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const animate = (setter: (v:number)=>void, target: number, duration: number) => {
      let start = 0;
      const step = target / (duration / 16);
      const interval = setInterval(() => {
        start = Math.min(start + step, target);
        setter(Math.round(start));
        if (start >= target) clearInterval(interval);
      }, 16);
    };
    setTimeout(() => {
      animate(setCount1, 1, 600);
      animate(setCount2, 24, 1000);
      animate(setCount3, 2450, 1400);
    }, 300);
  }, []);

  const nextSteps = [
    { done: true, label: "Connect a channel" },
    { done: true, label: "Customize your agent" },
    { done: false, label: "Test your agent" },
    { done: false, label: "Go live" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .s6-fade{animation:fadeUp 0.5s ease forwards;}
        @keyframes robotWave{0%,100%{transform:rotate(-5deg) scale(1);}50%{transform:rotate(5deg) scale(1.05);}}
        .s6-robot{animation:robotWave 2.5s ease-in-out infinite;}
        @keyframes confetti{0%{transform:translateY(-20px) rotate(0deg);opacity:1;}100%{transform:translateY(40px) rotate(180deg);opacity:0;}}
        .confetti-piece{animation:confetti linear infinite;}
        @keyframes countIn{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}
        .count-in{animation:countIn 0.4s ease 0.3s both;}
        .finish-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease,background 0.22s ease;}
        .finish-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(124,92,252,0.5);background:#6b4ce0!important;}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .finish-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .finish-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.3);}50%{box-shadow:0 0 0 8px rgba(124,92,252,0);}}
        .glow-pulse{animation:glowPulse 2s ease-in-out infinite;}
      `}</style>
      <div className="relative flex h-full flex-col gap-4 overflow-hidden p-6">
        {/* Confetti */}
        {visible&&[...Array(8)].map((_,i)=>(
          <div key={i} className="confetti-piece pointer-events-none absolute text-lg"
            style={{left:`${10+i*11}%`,top:"-10px",animationDuration:`${1.5+Math.random()}s`,animationDelay:`${i*0.2}s`,fontSize:`${10+Math.random()*8}px`}}>
            {["🎉","✨","🎊","⭐"][i%4]}
          </div>
        ))}

        {/* Header */}
        <div className={`flex items-start justify-between ${visible?"s6-fade":"opacity-0"}`} style={{animationDelay:"0s"}}>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">6</div>
            <span className="text-[13px] font-semibold text-[#a78bfa]">Dashboard</span>
          </div>
          <img src="/Opi-Hello.png" alt="Opi" className="s6-robot w-[80px] drop-shadow-[0_8px_20px_rgba(124,92,252,0.5)]"/>
        </div>

        <div className={`${visible?"s6-fade":"opacity-0"}`} style={{animationDelay:"0.1s"}}>
          <h2 className="font-['Syne'] text-[clamp(18px,2.5vw,26px)] font-extrabold text-white">You're all set! 🎉</h2>
          <p className="mt-0.5 text-[12px] text-gray-400">Your AI workforce is ready. Let's build something amazing!</p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-3 ${visible?"s6-fade":"opacity-0"}`} style={{animationDelay:"0.2s"}}>
          {[
            {label:"AI Employees",val:count1,suffix:"",extra:null},
            {label:"Conversations",val:count2,suffix:"",extra:"+12%"},
            {label:"Messages",val:count3,suffix:"",extra:"+18%"},
          ].map((s,i)=>(
            <div key={i} className="glow-pulse rounded-2xl border border-white/8 bg-white/4 p-3">
              <p className="text-[11px] text-gray-500">{s.label}</p>
              <div className="mt-1 flex items-end gap-1.5">
                <span className="count-in text-[22px] font-bold text-white">{s.val.toLocaleString()}</span>
                {s.extra&&<span className="mb-0.5 text-[10px] font-semibold text-emerald-400">{s.extra}</span>}
              </div>
              <button className="mt-1 text-[10px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all →</button>
            </div>
          ))}
        </div>

        {/* Agent + Next steps */}
        <div className={`grid grid-cols-2 gap-3 ${visible?"s6-fade":"opacity-0"}`} style={{animationDelay:"0.3s"}}>
          <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
            <p className="mb-2 text-[12px] font-bold text-white">Your first AI employee</p>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7c5cfc]/25 text-lg">🤖</div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[12px] font-semibold text-white">Support Agent</p>
                  <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400">Active</span>
                </div>
                <p className="text-[10px] text-gray-500">Handles customer support 24/7 across all channels.</p>
              </div>
            </div>
            <button className="mt-2 w-full rounded-lg bg-[#7c5cfc]/20 py-1.5 text-[11px] font-semibold text-[#a78bfa] transition-all hover:bg-[#7c5cfc]/35">Open</button>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/4 p-3">
            <p className="mb-2 text-[12px] font-bold text-white">Next steps</p>
            {nextSteps.map((s,i)=>(
              <div key={i} className="flex items-center gap-2 py-0.5">
                <div className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px] ${s.done?"bg-[#7c5cfc] text-white":"border border-white/20 text-transparent"}`}>✓</div>
                <span className={`text-[11px] ${s.done?"text-gray-300 line-through opacity-60":"text-white"}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore + Finish */}
        <div className={`${visible?"s6-fade":"opacity-0"}`} style={{animationDelay:"0.4s"}}>
          <div className="mb-3 flex items-center justify-between rounded-2xl border border-[#7c5cfc]/30 bg-[#7c5cfc]/10 px-4 py-3 cursor-pointer hover:bg-[#7c5cfc]/15 transition-colors">
            <div>
              <p className="text-[12px] font-bold text-white">Explore templates</p>
              <p className="text-[11px] text-gray-400">Need help getting started? Visit our template gallery.</p>
            </div>
            <span className="text-[#a78bfa]">›</span>
          </div>
          <button onClick={onFinish}
            className="finish-btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cfc] py-3 text-[14px] font-bold text-white">
            Go to Dashboard 🚀
          </button>
        </div>
      </div>
    </>
  );
};
export default OnboardingStep6Dashboard;
