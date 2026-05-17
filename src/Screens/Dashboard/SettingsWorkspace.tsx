import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const Select: React.FC<{value:string;options:string[];onChange:(v:string)=>void}> = ({value,options,onChange}) => {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative w-52">
      <button onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white hover:border-[#7c5cfc]/40 transition-all">
        <span>{value}</span><span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open&&<div className="absolute right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
        {options.map(o=><div key={o} onClick={()=>{onChange(o);setOpen(false);}} className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value===o?"text-[#a78bfa] font-semibold":"text-gray-400"}`}>{o}</div>)}
      </div>}
    </div>
  );
};

const UsageRow: React.FC<{icon:string;label:string;used:number;total:number;color:string}> = ({icon,label,used,total,color}) => (
  <div className="mb-3">
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-2"><span className="text-sm">{icon}</span><span className="text-[12px] text-gray-400">{label}</span></div>
      <span className="text-[12px] font-semibold text-white">{used} / {total}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full transition-all duration-1000" style={{width:`${(used/total)*100}%`,background:color}}/>
    </div>
  </div>
);

const SettingsWorkspace: React.FC = () => {
  const [activeTab,setActiveTab]=useState("General");
  const [wsName,setWsName]=useState("Operino");
  const [wsDomain,setWsDomain]=useState("operino");
  const [wsDesc,setWsDesc]=useState("AI-powered workspace to automate support, operations, and employee productivity.");
  const [lang,setLang]=useState("English (US)");
  const [tz,setTz]=useState("(GMT+03:30) Tehran");
  const [dtFormat,setDtFormat]=useState("MMM DD, YYYY • 12h");
  const [visibility,setVisibility]=useState("Invite only");
  const [publicLinks,setPublicLinks]=useState(true);
  const [aiAccess,setAiAccess]=useState(true);
  const [saved,setSaved]=useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .sw-fade{animation:fadeUp 0.5s ease forwards;}
        .sw-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .sw-card:hover{border-color:rgba(124,92,252,0.2);}
        .sw-input:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        .sw-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .sw-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .sw-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .sw-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
        .check-pop{animation:checkPop 0.4s ease forwards;}
        .danger-item{border:1px solid rgba(248,113,113,0.15);transition:border-color 0.2s ease,background 0.2s ease;cursor:pointer;}
        .danger-item:hover{border-color:rgba(248,113,113,0.35);background:rgba(248,113,113,0.05);}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="sw-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Workspace Settings</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Manage your workspace details, preferences, and configuration.</p>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="sw-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["General","Workspace Profile","Preferences","Features","Data Management"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Workspace Information */}
          <div className="sw-fade sw-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Workspace Information</h2>
            <p className="mb-4 text-[11px] text-gray-500">Update your workspace name, domain, and basic information.</p>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Workspace Name</label>
                <input value={wsName} onChange={e=>setWsName(e.target.value)}
                  className="sw-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all"/>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Workspace Logo</label>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7c5cfc]/25 text-2xl">🤖</div>
                  <div>
                    <button className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Change Logo</button>
                    <p className="mt-0.5 text-[10px] text-gray-600">Upload a square image (PNG or JPG).</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Workspace Domain</label>
                <div className="flex items-center gap-0">
                  <input value={wsDomain} onChange={e=>setWsDomain(e.target.value)}
                    className="sw-input flex-1 rounded-l-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all"/>
                  <span className="rounded-r-xl border border-l-0 border-white/10 bg-white/8 px-3 py-2.5 text-[13px] text-gray-400">.operino.ai</span>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Workspace Description</label>
                <textarea value={wsDesc} onChange={e=>setWsDesc(e.target.value)} rows={3}
                  className="sw-input w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all"/>
                <p className="mt-0.5 text-right text-[10px] text-gray-600">{wsDesc.length} / 160</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/8 pt-4">
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-gray-300">Workspace ID</label>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <span className="flex-1 font-mono text-[11px] text-gray-400">ws_7f3a9e18b6d44c8b9a2e5f6d</span>
                  <button className="text-gray-500 hover:text-white transition-colors text-sm">📋</button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[12px] font-semibold text-gray-300">Created</label>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                  <p className="text-[13px] text-gray-400">Jan 15, 2024, 10:30 AM</p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              {saved?(<div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-2.5 text-[13px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">✓ Saved!</div>):(
                <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}} className="sw-btn rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-bold text-white">Save Changes</button>
              )}
            </div>
          </div>

          {/* Workspace Preferences */}
          <div className="sw-fade sw-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Workspace Preferences</h2>
            <p className="mb-4 text-[11px] text-gray-500">Configure how your workspace behaves and what features are enabled.</p>
            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {[
                {icon:"🌐",label:"Default Language",desc:"Set the default language for your workspace.",el:<Select value={lang} options={["English (US)","Persian","Arabic","French"]} onChange={setLang}/>},
                {icon:"🕐",label:"Default Time Zone",desc:"Set the default time zone for your workspace.",el:<Select value={tz} options={["(GMT+03:30) Tehran","(GMT+00:00) UTC","(GMT-05:00) New York"]} onChange={setTz}/>},
                {icon:"📅",label:"Date & Time Format",desc:"Choose your preferred date and time format.",el:<Select value={dtFormat} options={["MMM DD, YYYY • 12h","DD/MM/YYYY • 24h","MM-DD-YYYY • 12h"]} onChange={setDtFormat}/>},
                {icon:"🔒",label:"Workspace Visibility",desc:"Control who can discover and join your workspace.",el:<Select value={visibility} options={["Invite only","Anyone with link","Public"]} onChange={setVisibility}/>},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{r.icon}</div>
                    <div><p className="text-[13px] font-semibold text-white">{r.label}</p><p className="text-[11px] text-gray-500">{r.desc}</p></div>
                  </div>
                  {r.el}
                </div>
              ))}
              {[
                {icon:"🔗",label:"Allow Public Links",desc:"Allow anyone with a link to access shared content.",state:publicLinks,set:setPublicLinks},
                {icon:"🤖",label:"AI Features Access",desc:"Allow members to use AI features in this workspace.",state:aiAccess,set:setAiAccess},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{r.icon}</div>
                    <div><p className="text-[13px] font-semibold text-white">{r.label}</p><p className="text-[11px] text-gray-500">{r.desc}</p></div>
                  </div>
                  <Toggle on={r.state} onChange={()=>r.set(s=>!s)}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Workspace Usage */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Workspace Usage</p>
            <p className="mb-3 text-[11px] text-gray-500">Overview of your workspace usage and limits.</p>
            <UsageRow icon="👥" label="Members" used={18} total={25} color="#7c5cfc"/>
            <UsageRow icon="🤖" label="AI Employees" used={8} total={10} color="#3b82f6"/>
            <UsageRow icon="💾" label="Storage" used={24.6} total={100} color="#22c55e"/>
            <UsageRow icon="💎" label="Credits" used={12450} total={20000} color="#a78bfa"/>
            <button className="mt-1 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View usage & limits →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Workspace Plan */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Workspace Plan</p>
            <p className="mb-3 text-[11px] text-gray-500">You are currently on the Pro Plan.</p>
            <div className="rounded-xl border border-white/8 bg-white/4 p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cfc]/20 text-sm font-bold text-[#a78bfa]">P</div>
                  <p className="text-[13px] font-bold text-white">Pro Plan</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Active</span>
              </div>
              <p className="text-[10px] text-gray-500 mb-2">Renews on May 15, 2024</p>
              {["Unlimited conversations","Up to 25 members","Advanced integrations","Priority support"].map((f,i)=>(
                <div key={i} className="mb-1 flex items-center gap-1.5"><span className="text-emerald-400 text-xs">✓</span><span className="text-[10px] text-gray-400">{f}</span></div>
              ))}
            </div>
            <button className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">
              <span>Manage Subscription</span><span className="text-sm">↗</span>
            </button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Danger Zone preview */}
          <div>
            <p className="mb-2 text-[13px] font-bold text-red-400">Danger Zone</p>
            <p className="mb-2 text-[11px] text-gray-500">Irreversible and sensitive actions for your workspace.</p>
            {[{label:"Transfer Workspace Ownership",desc:"Transfer ownership to another member."},{label:"Delete Workspace",desc:"Permanently delete your workspace and all its data.",red:true}].map((d,i)=>(
              <div key={i} className="danger-item mb-2 flex items-center justify-between rounded-xl px-3 py-2.5">
                <div><p className={`text-[11px] font-semibold ${d.red?"text-red-400":"text-white"}`}>{d.label}</p><p className="text-[10px] text-gray-600">{d.desc}</p></div>
                <span className="text-gray-600 text-xs flex-shrink-0 ml-2">›</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsWorkspace;
