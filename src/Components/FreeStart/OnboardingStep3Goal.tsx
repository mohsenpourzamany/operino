import React, { useState } from "react";

const goals = [
  {icon:"🎧",label:"Customer Support"},{icon:"👥",label:"Lead Generation"},{icon:"⚡",label:"Automation"},
  {icon:"📈",label:"Sales"},{icon:"📅",label:"Scheduling"},{icon:"📊",label:"Analytics"},
];

interface Props { onNext:(data:{goals:string[]})=>void; onBack:()=>void; }

const OnboardingStep3Goal: React.FC<Props> = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (l:string) => setSelected(p=>p.includes(l)?p.filter(x=>x!==l):[...p,l]);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .s3-fade{animation:fadeUp 0.5s ease forwards;}
        .goal-card{border:1.5px solid rgba(255,255,255,0.08);transition:all 0.22s ease;cursor:pointer;}
        .goal-card:hover{border-color:rgba(124,92,252,0.5);background:rgba(124,92,252,0.1)!important;transform:translateY(-3px);}
        .goal-card.sel{border-color:#7c5cfc!important;background:rgba(124,92,252,0.18)!important;}
        .s3-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease,background 0.22s ease;}
        .s3-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,92,252,0.45);background:#6b4ce0!important;}
        .s3-btn:disabled{opacity:0.4;cursor:not-allowed;}
      `}</style>
      <div className="flex h-full flex-col gap-6 p-8">
        <div className="s3-fade flex items-center gap-2" style={{animationDelay:"0s"}}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">3</div>
          <span className="text-[13px] font-semibold text-[#a78bfa]">Main goal</span>
        </div>
        <div className="s3-fade" style={{animationDelay:"0.1s"}}>
          <h2 className="font-['Syne'] text-[clamp(20px,3vw,32px)] font-extrabold text-white">What do you want your<br/>AI employee to help with?</h2>
          <p className="mt-1 text-[13px] text-gray-400">You can choose more than one.</p>
        </div>
        <div className="s3-fade grid grid-cols-3 gap-3" style={{animationDelay:"0.2s"}}>
          {goals.map((g,i)=>(
            <div key={i} onClick={()=>toggle(g.label)}
              className={`goal-card relative flex flex-col items-center gap-2 rounded-2xl bg-white/4 p-4 ${selected.includes(g.label)?"sel":""}`}>
              {selected.includes(g.label)&&<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c5cfc] text-[10px] text-white">✓</div>}
              <span className="text-2xl">{g.icon}</span>
              <span className="text-[12px] font-semibold text-white text-center">{g.label}</span>
            </div>
          ))}
        </div>
        <div className="s3-fade mt-auto flex items-center justify-between" style={{animationDelay:"0.3s"}}>
          <button onClick={onBack} className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-gray-300 transition-all hover:border-white/25 hover:text-white">← Back</button>
          <button onClick={()=>selected.length>0&&onNext({goals:selected})} disabled={selected.length===0}
            className="s3-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-6 py-2.5 text-[13px] font-bold text-white">Continue →</button>
        </div>
      </div>
    </>
  );
};
export default OnboardingStep3Goal;
