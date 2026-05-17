import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const Select: React.FC<{value:string;options:string[];onChange:(v:string)=>void}> = ({value,options,onChange}) => {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative w-44">
      <button onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[12px] text-white hover:border-[#7c5cfc]/40 transition-all">
        <span>{value}</span><span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open&&<div className="absolute right-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
        {options.map(o=><div key={o} onClick={()=>{onChange(o);setOpen(false);}} className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value===o?"text-[#a78bfa] font-semibold":"text-gray-400"}`}>{o}</div>)}
      </div>}
    </div>
  );
};

const auditLog = [
  {icon:"🔧",label:"API Debug Mode disabled",sub:"by Mohsen",date:"May 15, 2024",time:"10:30 PM"},
  {icon:"🧪",label:"Sandbox Mode enabled",sub:"by Mohsen",date:"May 15, 2024",time:"10:28 PM"},
  {icon:"⏱️",label:"Request Timeout changed",sub:"from 60s to 30s by Mohsen",date:"May 15, 2024",time:"10:20 PM"},
  {icon:"🌐",label:"Data Processing Region updated",sub:"to Auto by Mohsen",date:"May 15, 2024",time:"10:18 PM"},
  {icon:"💾",label:"Cache Duration changed",sub:"from 24h to 1h by Mohsen",date:"May 14, 2024",time:"09:45 PM"},
];

const SettingsAdvanced: React.FC = () => {
  const [activeTab,setActiveTab]=useState("General");
  const [devToggles,setDevToggles]=useState([false,false,false,true]);
  const [expToggles,setExpToggles]=useState([false,false]);
  const [concurrency,setConcurrency]=useState("10");
  const [timeout,setTimeout_]=useState("30 seconds");
  const [region,setRegion]=useState("Auto (Best Available)");
  const [cache,setCache]=useState("1 hour");
  const [cacheCleared,setCacheCleared]=useState(false);
  const [indexRebuilt,setIndexRebuilt]=useState(false);

  const devOptions = [
    {icon:"🔧",label:"API Debug Mode",desc:"Enable detailed logging for API requests and responses."},
    {icon:"🪝",label:"Webhook Debug Mode",desc:"Log webhook payloads and delivery attempts."},
    {icon:"⚡",label:"Rate Limit Bypass (Development)",desc:"Temporarily bypass rate limits for test environments."},
    {icon:"🧪",label:"Enable Sandbox Mode",desc:"Isolate changes in a sandbox environment before applying to production."},
  ];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .adv-fade{animation:fadeUp 0.5s ease forwards;}
        .adv-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .adv-card:hover{border-color:rgba(124,92,252,0.2);}
        .log-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .log-row:hover{background:rgba(124,92,252,0.04);}
        .sys-row{transition:background 0.2s ease;}
        .sys-row:hover{background:rgba(255,255,255,0.02);}
        .adv-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .adv-btn:hover{transform:translateY(-1px);}
        .exp-badge{background:rgba(124,92,252,0.2);color:#a78bfa;font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;}
        @keyframes pulse2{0%,100%{opacity:1;}50%{opacity:0.6;}}
        .status-dot{animation:pulse2 2s ease-in-out infinite;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="adv-fade mb-5">
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Advanced</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">Configure advanced settings, developer options, and system preferences.</p>
          </div>

          <div className="adv-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["General","Developer","System","Logs","Beta Features"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Developer Options */}
          <div className="adv-fade adv-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Developer Options</h2>
            <p className="mb-4 text-[11px] text-gray-500">Configure developer settings and debugging options.</p>
            <div className="flex flex-col gap-3">
              {devOptions.map((d,i)=>(
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{d.icon}</div>
                    <div><p className="text-[13px] font-semibold text-white">{d.label}</p><p className="text-[11px] text-gray-500">{d.desc}</p></div>
                  </div>
                  <Toggle on={devToggles[i]} onChange={()=>setDevToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-xl border border-[#3b82f6]/20 bg-[#3b82f6]/05 px-4 py-2.5">
                <span className="text-[#3b82f6] text-sm">ℹ️</span>
                <p className="text-[11px] text-gray-400">These settings are intended for development and testing only.</p>
              </div>
            </div>
          </div>

          {/* System & Performance */}
          <div className="adv-fade adv-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">System & Performance</h2>
            <p className="mb-4 text-[11px] text-gray-500">Configure system behavior and performance settings.</p>
            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {[
                {icon:"⚙️",label:"Background Job Concurrency",desc:"Maximum number of background jobs that can run simultaneously.",el:<Select value={concurrency} options={["5","10","15","20","Unlimited"]} onChange={setConcurrency}/>},
                {icon:"⏱️",label:"Request Timeout",desc:"Set the timeout for API requests and internal operations.",el:<Select value={timeout} options={["15 seconds","30 seconds","60 seconds","120 seconds"]} onChange={setTimeout_}/>},
                {icon:"🌐",label:"Data Processing Region",desc:"Choose the region for data processing and storage.",el:<Select value={region} options={["Auto (Best Available)","US East","EU West","Asia Pacific"]} onChange={setRegion}/>},
                {icon:"💾",label:"Cache Duration",desc:"Set how long system cache should be stored.",el:<Select value={cache} options={["15 minutes","1 hour","6 hours","24 hours","1 week"]} onChange={setCache}/>},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{r.icon}</div>
                    <div><p className="text-[13px] font-semibold text-white">{r.label}</p><p className="text-[11px] text-gray-500">{r.desc}</p></div>
                  </div>
                  {r.el}
                </div>
              ))}
            </div>
          </div>

          {/* Experimental Features */}
          <div className="adv-fade adv-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Experimental Features</h2>
            <p className="mb-4 text-[11px] text-gray-500">Try new features before they are officially released.</p>
            <div className="flex flex-col gap-3">
              {[
                {icon:"✨",label:"New AI Model (vNext)",desc:"Access the latest AI model with improved capabilities."},
                {icon:"💬",label:"Updated Conversation Engine",desc:"Use the next-generation conversation engine."},
              ].map((e,i)=>(
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{e.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-semibold text-white">{e.label}</p>
                        <span className="exp-badge">Experimental</span>
                      </div>
                      <p className="text-[11px] text-gray-500">{e.desc}</p>
                    </div>
                  </div>
                  <Toggle on={expToggles[i]} onChange={()=>setExpToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-xl border border-yellow-500/20 bg-yellow-500/05 px-4 py-2.5">
                <span className="text-yellow-400 text-sm">⚠️</span>
                <p className="text-[11px] text-gray-400">Experimental features may change or be removed without notice.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Audit Log */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Audit Log</p>
              <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">View all logs →</button>
            </div>
            <p className="mb-3 text-[11px] text-gray-500">Recent changes to advanced settings.</p>
            {auditLog.map((l,i)=>(
              <div key={i} className="log-row flex items-start gap-2.5 py-2">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-sm">{l.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white leading-snug">{l.label}</p>
                  <p className="text-[10px] text-gray-500 truncate">{l.sub}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[9px] text-gray-600">{l.date}</p>
                  <p className="text-[9px] text-gray-600">{l.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8"/>
          {/* System Status */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">System Status</p>
            <p className="mb-3 text-[11px] text-gray-500">Overview of system health and performance.</p>
            {[
              {l:"All Systems Operational",v:"99.99% uptime",ok:true},
              {l:"API Response Time",v:"120ms average",ok:true},
              {l:"Background Jobs",v:"All queues healthy",ok:true},
              {l:"Database",v:"Healthy",ok:true},
              {l:"Storage",v:"Healthy",ok:true},
              {l:"Services",v:"All services running",ok:true},
            ].map((s,i)=>(
              <div key={i} className="sys-row flex items-center justify-between rounded-xl px-2 py-1.5">
                <div className="flex items-center gap-2"><span className={`status-dot h-2 w-2 rounded-full flex-shrink-0 ${s.ok?"bg-emerald-400":"bg-red-400"}`}/><span className="text-[11px] text-gray-400">{s.l}</span></div>
                <span className="text-[10px] font-semibold text-emerald-400">{s.v}</span>
              </div>
            ))}
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View status page →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Maintenance */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Maintenance</p>
            <p className="mb-3 text-[11px] text-gray-500">System maintenance and operational tools.</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
                <div><p className="text-[11px] font-semibold text-white">Clear System Cache</p><p className="text-[10px] text-gray-500">Remove all cached data from the system.</p></div>
                <button onClick={()=>{setCacheCleared(true);setTimeout(()=>setCacheCleared(false),2000);}}
                  className={`adv-btn flex-shrink-0 ml-2 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${cacheCleared?"bg-emerald-500/20 text-emerald-400":"border border-white/15 bg-white/5 text-gray-300 hover:text-white"}`}>
                  {cacheCleared?"✓ Cleared":"Clear Cache"}
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-2.5">
                <div><p className="text-[11px] font-semibold text-white">Rebuild Search Index</p><p className="text-[10px] text-gray-500">Reindex all documents for search.</p></div>
                <button onClick={()=>{setIndexRebuilt(true);setTimeout(()=>setIndexRebuilt(false),2000);}}
                  className={`adv-btn flex-shrink-0 ml-2 rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all ${indexRebuilt?"bg-emerald-500/20 text-emerald-400":"border border-white/15 bg-white/5 text-gray-300 hover:text-white"}`}>
                  {indexRebuilt?"✓ Done":"Rebuild Index"}
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Danger zone */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-red-400">Danger Zone</p>
            <p className="mb-2 text-[11px] text-gray-500">Irreversible and sensitive actions.</p>
            <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/05 px-3 py-3">
              <div><p className="text-[11px] font-semibold text-white">Reset to Default Settings</p><p className="text-[10px] text-gray-500">This will reset all advanced settings to default.</p></div>
              <button className="flex-shrink-0 ml-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold text-red-400 hover:bg-red-500/20 transition-all">Reset All</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsAdvanced;
