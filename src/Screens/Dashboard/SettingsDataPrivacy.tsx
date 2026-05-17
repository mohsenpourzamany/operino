import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const Select: React.FC<{value:string;options:string[];onChange:(v:string)=>void}> = ({value,options,onChange}) => {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative w-36">
      <button onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white hover:border-[#7c5cfc]/40 transition-all">
        <span>{value}</span><span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open&&(<div className="absolute right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
        {options.map(o=><div key={o} onClick={()=>{onChange(o);setOpen(false);}} className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value===o?"text-[#a78bfa] font-semibold":"text-gray-400"}`}>{o}</div>)}
      </div>)}
    </div>
  );
};

const dataCards = [
  {icon:"💬",label:"Conversations",val:"18,732",sub:"messages",size:"12.4 GB",color:"#7c5cfc"},
  {icon:"📁",label:"Files & Attachments",val:"2,045",sub:"files",size:"4.7 GB",color:"#3b82f6"},
  {icon:"✨",label:"AI Generated Content",val:"8,921",sub:"items",size:"3.1 GB",color:"#a78bfa"},
  {icon:"📚",label:"Knowledge Base",val:"1,245",sub:"articles",size:"1.8 GB",color:"#f97316"},
  {icon:"💾",label:"Other Data",val:"0.9 GB",sub:"system data",size:"0.9 GB",color:"#22c55e"},
];

const SettingsDataPrivacy: React.FC = () => {
  const [activeTab,setActiveTab]=useState("Overview");
  const [dataUsage,setDataUsage]=useState(false);
  const [retention,setRetention]=useState("12 months");
  const [privToggles,setPrivToggles]=useState([true,true,false,false]);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .dp-fade{animation:fadeUp 0.5s ease forwards;}
        .dp-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .dp-card:hover{border-color:rgba(124,92,252,0.2);}
        .ctrl-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .ctrl-row:hover{background:rgba(124,92,252,0.04);}
        .dp-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .dp-btn:hover{transform:translateY(-2px);}
        .req-item{border:1px solid rgba(255,255,255,0.06);transition:border-color 0.2s ease,background 0.2s ease;cursor:pointer;}
        .req-item:hover{border-color:rgba(124,92,252,0.3);background:rgba(124,92,252,0.06);}
        .policy-card{border:1px solid rgba(255,255,255,0.06);transition:border-color 0.2s ease,background 0.2s ease;cursor:pointer;}
        .policy-card:hover{border-color:rgba(124,92,252,0.3);background:rgba(124,92,252,0.07);}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="dp-fade mb-5">
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Data & Privacy</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">Manage your data, privacy settings, and control how your information is used.</p>
          </div>

          <div className="dp-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["Overview","Data Controls","Privacy Settings","Data Requests"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Data Overview */}
          <div className="dp-fade dp-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-[14px] font-bold text-white">Data Overview</h2><p className="text-[11px] text-gray-500">Here's a summary of your data and how it's stored.</p></div>
              <button className="dp-btn rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">View Data Details</button>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              {dataCards.map((d,i)=>(
                <div key={i} className="rounded-xl border border-white/6 bg-white/3 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg text-base mb-2" style={{background:`${d.color}20`}}>{d.icon}</div>
                  <p className="text-[10px] text-gray-500">{d.label}</p>
                  <p className="text-[16px] font-bold text-white leading-none mt-1">{d.val}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{d.sub}</p>
                  <div className="mt-2">
                    <div className="h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full" style={{width:`${Math.min(parseInt(d.size)*8,100)}%`,background:d.color}}/>
                    </div>
                    <p className="mt-0.5 text-[9px] text-gray-600">{d.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Controls */}
          <div className="dp-fade dp-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Data Controls</h2>
            <p className="mb-4 text-[11px] text-gray-500">Control how your data is used and stored.</p>
            <div className="flex flex-col gap-0 divide-y divide-white/5">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">🔒</div>
                  <div><p className="text-[13px] font-semibold text-white">Data Usage for AI Improvement</p><p className="text-[11px] text-gray-500">Allow Operino to use your data to improve AI models and features.</p></div>
                </div>
                <Toggle on={dataUsage} onChange={()=>setDataUsage(d=>!d)}/>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">📅</div>
                  <div><p className="text-[13px] font-semibold text-white">Data Retention</p><p className="text-[11px] text-gray-500">Choose how long we keep your data.</p></div>
                </div>
                <Select value={retention} options={["3 months","6 months","12 months","24 months","Forever"]} onChange={setRetention}/>
              </div>
              {[
                {icon:"⬇️",label:"Data Export",desc:"Export a copy of your data at any time.",action:<button className="dp-btn rounded-xl bg-white/8 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white border border-white/10">Export Data</button>},
                {icon:"🗑️",label:"Delete Data",desc:"Permanently delete your data from Operino.",action:<button className="dp-btn rounded-xl bg-red-500/10 px-4 py-2 text-[12px] font-semibold text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all">Delete Data</button>},
                {icon:"💾",label:"Data Backup",desc:"Manage your data backup preferences.",action:<button className="dp-btn rounded-xl bg-white/8 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white border border-white/10">Manage Backups</button>},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{r.icon}</div>
                    <div><p className="text-[13px] font-semibold text-white">{r.label}</p><p className="text-[11px] text-gray-500">{r.desc}</p></div>
                  </div>
                  {r.action}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="dp-fade dp-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Privacy Policy & Compliance</h2>
            <p className="mb-4 text-[11px] text-gray-500">We're committed to protecting your privacy and being transparent.</p>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {[{icon:"🛡️",title:"Privacy Policy",desc:"Learn how we collect, use, and protect your data.",link:"View policy →"},{icon:"📄",title:"Data Processing Agreement",desc:"Review our terms for data processing and security.",link:"View agreement →"},{icon:"✅",title:"Compliance",desc:"Operino is compliant with GDPR and SOC 2 Type II.",link:"Learn more →"}].map((p,i)=>(
                <div key={i} className="policy-card rounded-xl bg-white/3 p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base mb-2">{p.icon}</div>
                  <p className="text-[12px] font-bold text-white">{p.title}</p>
                  <p className="mt-0.5 text-[10px] text-gray-500">{p.desc}</p>
                  <button className="mt-2 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">{p.link}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Privacy Settings */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Privacy Settings</p>
            <p className="mb-3 text-[11px] text-gray-500">Manage your privacy preferences.</p>
            {[
              {icon:"🧠",label:"Hide my data from AI training",desc:"Prevent your data from being used for training."},
              {icon:"👤",label:"Anonymize conversation data",desc:"Remove identifiable information from conversations."},
              {icon:"📊",label:"Share usage analytics",desc:"Help us improve by sharing anonymous analytics."},
              {icon:"✉️",label:"Marketing communications",desc:"Receive updates about new features and offers."},
            ].map((s,i)=>(
              <div key={i} className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-sm mt-0.5">{s.icon}</div>
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-snug">{s.label}</p>
                    <p className="text-[10px] text-gray-500 leading-snug">{s.desc}</p>
                  </div>
                </div>
                <Toggle on={privToggles[i]} onChange={()=>setPrivToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8"/>
          {/* Data Requests */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Data Requests</p>
            <p className="mb-3 text-[11px] text-gray-500">Submit and track your data-related requests.</p>
            {[{icon:"⬇️",label:"Export my data",desc:"Request a copy of all your data."},{icon:"🗑️",label:"Delete my data",desc:"Request to permanently delete your data.",red:true},{icon:"👁️",label:"Access my data",desc:"Request to view your personal data."},{icon:"✏️",label:"Correction request",desc:"Request to correct inaccurate data."}].map((r,i)=>(
              <div key={i} className="req-item mb-2 flex items-center justify-between rounded-xl bg-white/3 px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <span className="text-base mt-0.5">{r.icon}</span>
                  <div><p className={`text-[11px] font-semibold ${r.red?"text-red-400":"text-white"}`}>{r.label}</p><p className="text-[10px] text-gray-500">{r.desc}</p></div>
                </div>
                <span className="text-gray-600 flex-shrink-0">›</span>
              </div>
            ))}
            <button className="mt-1 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all requests →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Information */}
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">Information</p>
            <p className="mb-2 text-[11px] text-gray-500">Important things to know.</p>
            {["Your data is encrypted in transit and at rest.","We never sell your data to third parties.","You can request data deletion at any time.","For any privacy questions, contact our support team."].map((t,i)=>(
              <div key={i} className="mb-1.5 flex items-start gap-1.5"><span className="mt-0.5 text-[#7c5cfc] text-xs flex-shrink-0">🔒</span><p className="text-[11px] text-gray-500">{t}</p></div>
            ))}
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Learn more about data & privacy →</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsDataPrivacy;
