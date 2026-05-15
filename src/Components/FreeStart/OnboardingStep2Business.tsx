import React, { useState } from "react";

const options = [
  {icon:"⚡",label:"SaaS"},{icon:"🛒",label:"E-commerce"},{icon:"🏢",label:"Agency"},
  {icon:"❤️",label:"Healthcare"},{icon:"🎓",label:"Education"},{icon:"•••",label:"Other"},
];

interface Props { onNext:(data:{businessType:string})=>void; onBack:()=>void; }

const OnboardingStep2Business: React.FC<Props> = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState("");
  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .s2-fade{animation:fadeUp 0.5s ease forwards;}
        .opt-card{border:1.5px solid rgba(255,255,255,0.08);transition:all 0.22s ease;cursor:pointer;}
        .opt-card:hover{border-color:rgba(124,92,252,0.5);background:rgba(124,92,252,0.1)!important;transform:translateY(-3px);}
        .opt-card.selected{border-color:#7c5cfc!important;background:rgba(124,92,252,0.18)!important;}
        .s2-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease,background 0.22s ease;}
        .s2-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,92,252,0.45);background:#6b4ce0!important;}
        .s2-btn:disabled{opacity:0.4;cursor:not-allowed;}
      `}</style>
      <div className="flex h-full flex-col gap-6 p-8">
        <div className="s2-fade flex items-center gap-2" style={{animationDelay:"0s"}}>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">2</div>
          <span className="text-[13px] font-semibold text-[#a78bfa]">Business type</span>
        </div>
        <div className="s2-fade" style={{animationDelay:"0.1s"}}>
          <h2 className="font-['Syne'] text-[clamp(20px,3vw,32px)] font-extrabold text-white">What type of business<br/>are you building?</h2>
          <p className="mt-1 text-[13px] text-gray-400">This helps me customize Operino for you.</p>
        </div>
        <div className="s2-fade grid grid-cols-3 gap-3" style={{animationDelay:"0.2s"}}>
          {options.map((o,i)=>(
            <div key={i} onClick={()=>setSelected(o.label)}
              className={`opt-card relative flex flex-col items-center gap-2 rounded-2xl bg-white/4 p-4 ${selected===o.label?"selected":""}`}>
              {selected===o.label&&<div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c5cfc] text-[10px] text-white">✓</div>}
              <span className="text-2xl">{o.icon}</span>
              <span className="text-[13px] font-semibold text-white">{o.label}</span>
            </div>
          ))}
        </div>
        <div className="s2-fade mt-auto flex items-center justify-between" style={{animationDelay:"0.3s"}}>
          <button onClick={onBack} className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-gray-300 transition-all hover:border-white/25 hover:text-white">← Back</button>
          <button onClick={()=>selected&&onNext({businessType:selected})} disabled={!selected}
            className="s2-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-6 py-2.5 text-[13px] font-bold text-white">Continue →</button>
        </div>
      </div>
    </>
  );
};
export default OnboardingStep2Business;
