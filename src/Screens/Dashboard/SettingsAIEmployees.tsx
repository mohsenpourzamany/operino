import React, { useState } from "react";

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const Select: React.FC<{value:string;options:string[];onChange:(v:string)=>void;width?:string}> = ({value,options,onChange,width="w-full"}) => {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative">
      <button onClick={()=>setOpen(o=>!o)} className={`${width} flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all hover:border-[#7c5cfc]/40`}>
        <span>{value}</span><span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open&&(
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
          {options.map(o=><div key={o} onClick={()=>{onChange(o);setOpen(false);}} className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value===o?"text-[#a78bfa] font-semibold":"text-gray-400"}`}>{o}</div>)}
        </div>
      )}
    </div>
  );
};

const workingDays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const SettingsAIEmployees: React.FC = () => {
  const [activeTab,setActiveTab]=useState("General");
  const [defaultModel,setDefaultModel]=useState("Operino Pro (Recommended)");
  const [language,setLanguage]=useState("English");
  const [timezone,setTimezone]=useState("(GMT+03:30) Tehran");
  const [priorityHandling,setPriorityHandling]=useState("Auto Detect");
  const [toggles,setToggles]=useState([true,false]);
  const [selectedDays,setSelectedDays]=useState(["Mon","Tue","Wed","Thu","Fri"]);
  const [saved,setSaved]=useState(false);

  const tabs=["General","Capabilities","Behavior","Knowledge & Data","Guardrails","Integrations","Advanced"];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .sae-fade{animation:fadeUp 0.5s ease forwards;}
        .sae-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .sae-card:hover{border-color:rgba(124,92,252,0.2);}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease;}
        .stat-card:hover{transform:translateY(-2px);border-color:rgba(124,92,252,0.3);}
        .save-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .save-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.45);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .save-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .save-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .day-btn{transition:background 0.2s ease,border-color 0.2s ease,color 0.2s ease;}
        @keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
        .check-pop{animation:checkPop 0.4s ease forwards;}
        .qa-item{border:1px solid rgba(255,255,255,0.06);transition:border-color 0.2s ease,background 0.2s ease;cursor:pointer;}
        .qa-item:hover{border-color:rgba(124,92,252,0.3);background:rgba(124,92,252,0.06);}
      `}</style>

      <div className="flex gap-0 h-full">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* Header */}
          <div className="sae-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">AI Employees Settings</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Configure global settings, capabilities, and behaviors for your AI Employees.</p>
            </div>
            {saved?(
              <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-2.5 text-[13px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">✓ Saved!</div>
            ):(
              <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}} className="save-btn rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-bold text-white">Save changes</button>
            )}
          </div>

          {/* Sub tabs */}
          <div className="sae-fade mb-5 flex gap-0 overflow-x-auto border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`flex-shrink-0 pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}
              </button>
            ))}
          </div>

          {/* Overview stats */}
          <div className="sae-fade mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4" style={{animationDelay:"0.1s"}}>
            {[{icon:"🤖",l:"Total AI Employees",v:"12",sub:"Active",c:"#7c5cfc"},{icon:"⚡",l:"Online Now",v:"8",sub:"66% of total",c:"#22c55e"},{icon:"💬",l:"Conversations (Today)",v:"1,248",sub:"↑18% from yesterday",c:"#3b82f6"},{icon:"✅",l:"Tasks Completed (Today)",v:"892",sub:"↑16% from yesterday",c:"#f97316"}].map((s,i)=>(
              <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-4">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl" style={{background:`${s.c}20`}}>{s.icon}</div>
                  <p className="text-[10px] text-gray-500">{s.l}</p>
                </div>
                <p className="text-[clamp(16px,2.5vw,22px)] font-bold text-white leading-none">{s.v}</p>
                <p className="mt-0.5 text-[10px] text-emerald-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* General Settings */}
          <div className="sae-fade sae-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[15px] font-bold text-white">General Settings</h2>
            <p className="mb-4 text-[12px] text-gray-500">Configure default settings that apply to all AI Employees.</p>
            <div className="flex flex-col gap-4">
              {[
                {icon:"⚡",label:"Default AI Model",desc:"Select the default model for AI Employees.",select:<Select value={defaultModel} options={["Operino Pro (Recommended)","GPT-4o","Claude 3.5","GPT-3.5 Turbo"]} onChange={setDefaultModel}/>},
                {icon:"🌐",label:"Response Language",desc:"Set the default language for AI Employees.",select:<Select value={language} options={["English","Persian","Arabic","French","Spanish"]} onChange={setLanguage}/>},
                {icon:"🕐",label:"Time Zone",desc:"Set the default time zone for AI Employees.",select:<Select value={timezone} options={["(GMT+03:30) Tehran","(GMT+00:00) UTC","(GMT-05:00) New York","(GMT+01:00) London"]} onChange={setTimezone}/>},
              ].map((s,i)=>(
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{s.icon}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white">{s.label}</p>
                    <p className="text-[11px] text-gray-500">{s.desc}</p>
                  </div>
                  <div className="w-[240px] flex-shrink-0">{s.select}</div>
                </div>
              ))}
              {[{icon:"💾",label:"Auto-save Conversations",desc:"Automatically save conversations and context."},{icon:"🔘",label:"AI Employee Status",desc:"Allow AI Employees to go offline when inactive."}].map((s,i)=>(
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{s.icon}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{s.label}</p>
                      <p className="text-[11px] text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                  <Toggle on={toggles[i]} onChange={()=>setToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
                </div>
              ))}
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">⚡</div>
                <div className="flex-1"><p className="text-[13px] font-semibold text-white">Priority Handling</p><p className="text-[11px] text-gray-500">Define how AI Employees handle high priority conversations.</p></div>
                <div className="w-[240px] flex-shrink-0">
                  <Select value={priorityHandling} options={["Auto Detect","Always Priority","Manual"]} onChange={setPriorityHandling}/>
                </div>
              </div>
            </div>
          </div>

          {/* Default Availability */}
          <div className="sae-fade sae-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <h2 className="mb-1 text-[15px] font-bold text-white">Default Availability</h2>
            <p className="mb-4 text-[12px] text-gray-500">Set working hours and availability for AI Employees.</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">⏰</div>
                <div className="flex-1"><p className="text-[13px] font-semibold text-white">Working Hours</p><p className="text-[11px] text-gray-500">Define default working hours.</p></div>
                <div className="flex items-center gap-2">
                  <input type="text" defaultValue="09:00 AM" className="w-[100px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white text-center"/>
                  <span className="text-gray-500">→</span>
                  <input type="text" defaultValue="06:00 PM" className="w-[100px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white text-center"/>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">📅</div>
                <div className="flex-1"><p className="text-[13px] font-semibold text-white">Working Days</p><p className="text-[11px] text-gray-500">Select default working days.</p></div>
                <div className="flex gap-1.5">
                  {workingDays.map(d=>(
                    <button key={d} onClick={()=>setSelectedDays(days=>days.includes(d)?days.filter(x=>x!==d):[...days,d])}
                      className={`day-btn h-8 w-10 rounded-lg text-[11px] font-semibold border ${selectedDays.includes(d)?"border-[#7c5cfc] bg-[#7c5cfc] text-white":"border-white/15 bg-white/4 text-gray-400 hover:border-[#7c5cfc]/50 hover:text-white"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Employee Naming */}
          <div className="sae-fade sae-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.25s"}}>
            <h2 className="mb-1 text-[15px] font-bold text-white">AI Employee Naming</h2>
            <p className="mb-4 text-[12px] text-gray-500">Set naming rules and display preferences.</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Naming Prefix (Optional)</label>
                <input placeholder="e.g. AI, Bot, Assistant" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-gray-400 placeholder-gray-600 outline-none focus:border-[#7c5cfc]/60"/>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Naming Format Preview</label>
                <div className="flex h-[42px] items-center rounded-xl border border-white/10 bg-white/4 px-3">
                  <p className="text-[13px] text-white">AI Support Agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Quick Actions */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Quick Actions</p>
            {[{icon:"➕",title:"Create AI Employee",desc:"Add a new AI Employee with default settings."},{icon:"📋",title:"Clone Settings",desc:"Clone settings from another AI Employee."},{icon:"⬇️",title:"Import Configuration",desc:"Import settings from a JSON file."}].map((a,i)=>(
              <div key={i} className="qa-item mb-2 flex items-start gap-2.5 rounded-xl bg-white/3 px-3 py-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white">{a.title}</p>
                  <p className="text-[10px] text-gray-500 leading-snug">{a.desc}</p>
                </div>
                <span className="text-gray-600 flex-shrink-0">›</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8"/>
          {/* AI Model Usage donut */}
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">AI Model Usage</p>
            <p className="mb-3 text-[11px] text-gray-500">Distribution of AI models used by your AI Employees.</p>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 80 80" className="h-[80px] w-[80px] -rotate-90">
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#7c5cfc" strokeWidth="14" strokeDasharray="117 176" strokeDashoffset="0"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="44 176" strokeDashoffset="-117"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#22c55e" strokeWidth="14" strokeDasharray="16 176" strokeDashoffset="-161"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#6b7280" strokeWidth="14" strokeDasharray="0 176" strokeDashoffset="-177"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[13px] font-bold text-white">12</span>
                  <span className="text-[8px] text-gray-500">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {[{c:"#7c5cfc",l:"Operino Pro",v:"8 (66%)"},{c:"#3b82f6",l:"GPT-4o",v:"3 (25%)"},{c:"#22c55e",l:"Claude 3.5",v:"1 (9%)"},{c:"#6b7280",l:"Other",v:"0 (0%)"}].map(s=>(
                  <div key={s.l} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{background:s.c}}/>
                    <span className="text-[10px] text-gray-400 w-16 truncate">{s.l}</span>
                    <span className="text-[10px] font-semibold text-white">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* System Prompts */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">System Prompts</p>
            <p className="mb-3 text-[11px] text-gray-500">Manage global system prompts for AI Employees.</p>
            <div className="rounded-xl border border-white/8 bg-white/4 p-3 mb-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[12px] font-bold text-white">Default System Prompt</p>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-400">Active</span>
              </div>
              <p className="text-[11px] text-gray-500">Default instructions that guide AI Employees behavior and responses.</p>
              <button className="mt-2 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Edit Prompt</button>
            </div>
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage All Prompts →</button>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Learn more about AI Employees settings.</p>
            <button className="mb-1.5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white transition-all">📖 View Documentation</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white transition-all">🎧 Contact Support</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsAIEmployees;
