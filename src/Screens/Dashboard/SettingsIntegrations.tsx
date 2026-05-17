import React, { useState } from "react";

const connected = [
  { icon:"💜", name:"Slack", desc:"Send messages, receive notifications, and more.", category:"Communication", status:"Connected", color:"#7c5cfc" },
  { icon:"🔵", name:"Google Drive", desc:"Store, sync, and access your files.", category:"Storage", status:"Connected", color:"#3b82f6" },
  { icon:"⬛", name:"Notion", desc:"Sync pages and databases with Operino.", category:"Productivity", status:"Connected", color:"#ffffff" },
  { icon:"🔴", name:"Zapier", desc:"Automate workflows between your favorite apps.", category:"Automation", status:"Connected", color:"#f97316" },
  { icon:"🟢", name:"OpenAI", desc:"Use OpenAI models and embeddings.", category:"AI", status:"Connected", color:"#22c55e" },
];

const available = [
  { icon:"🔷", name:"Microsoft Teams", desc:"Collaborate with your team inside Microsoft Teams.", category:"Communication" },
  { icon:"🔵", name:"Trello", desc:"Sync tasks and boards with Operino.", category:"Project Management" },
  { icon:"⬛", name:"GitHub", desc:"Connect repositories and track development.", category:"Developer Tools" },
  { icon:"💙", name:"Dropbox", desc:"Access and manage your files in Dropbox.", category:"Storage" },
  { icon:"🧡", name:"HubSpot", desc:"Sync contacts, deals, and activities.", category:"CRM" },
  { icon:"📅", name:"Calendly", desc:"Schedule meetings and sync availability.", category:"Scheduling" },
  { icon:"📧", name:"Mailchimp", desc:"Sync contacts and email campaigns.", category:"Marketing" },
  { icon:"🌐", name:"Webflow", desc:"Sync CMS collections and content.", category:"Content Management" },
];

const catColors: Record<string,string> = {
  Communication:"#7c5cfc", Storage:"#3b82f6", Productivity:"#22c55e",
  Automation:"#f97316", AI:"#a78bfa", CRM:"#ec4899",
  "Project Management":"#fbbf24", "Developer Tools":"#6b7280",
  Scheduling:"#06b6d4", Marketing:"#ef4444", "Content Management":"#8b5cf6",
};

const SettingsIntegrations: React.FC = () => {
  const [activeTab,setActiveTab]=useState("All Integrations");
  const [search,setSearch]=useState("");

  const filteredAvailable = available.filter(a=>!search||a.name.toLowerCase().includes(search.toLowerCase())||a.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .si-fade{animation:fadeUp 0.5s ease forwards;}
        .si-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .si-card:hover{border-color:rgba(124,92,252,0.2);}
        .conn-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .conn-row:hover{background:rgba(124,92,252,0.04);}
        .avail-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease,background 0.22s ease;}
        .avail-card:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.4);background:rgba(124,92,252,0.07)!important;}
        .si-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .si-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .si-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .si-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .si-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        .connect-btn{transition:background 0.2s ease,transform 0.2s ease;}
        .connect-btn:hover{background:#6b4ce0!important;transform:translateY(-1px);}
        .cat-row{transition:background 0.2s ease;cursor:pointer;}
        .cat-row:hover{background:rgba(124,92,252,0.08);}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="si-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Integration Settings</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Connect and manage the tools and services you use with Operino.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="si-fade mb-5 flex flex-wrap items-center justify-between gap-3" style={{animationDelay:"0.05s"}}>
            <div className="flex gap-0 border-b border-white/8">
              {["All Integrations","Connected","Available","Custom Integrations"].map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)}
                  className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                <input type="text" placeholder="Search integrations..." value={search} onChange={e=>setSearch(e.target.value)}
                  className="si-search w-[200px] rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-400 cursor-pointer hover:text-white transition-colors">All Categories ▾</div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-400 cursor-pointer hover:text-white transition-colors">All Statuses ▾</div>
            </div>
          </div>

          {/* Connected */}
          <div className="si-fade si-card mb-4 rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.1s"}}>
            <div className="border-b border-white/8 px-5 py-3">
              <h2 className="text-[14px] font-bold text-white">Connected Integrations</h2>
              <p className="text-[11px] text-gray-500">These integrations are connected to your workspace.</p>
            </div>
            {connected.map((c,i)=>(
              <div key={i} className="conn-row flex items-center gap-4 px-5 py-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{background:`${c.color}20`,border:`1px solid ${c.color}40`}}>{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-white">{c.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{c.desc}</p>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0" style={{background:`${catColors[c.category]||"#7c5cfc"}20`,color:catColors[c.category]||"#a78bfa"}}>{c.category}</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>
                  <span className="text-[11px] font-semibold text-emerald-400">{c.status}</span>
                </div>
                <button className="flex-shrink-0 rounded-xl border border-white/12 bg-white/5 px-4 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Manage</button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-1.5 border-t border-white/8 py-3 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all connected integrations →</button>
          </div>

          {/* Available */}
          <div className="si-fade" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Available Integrations</h2>
            <p className="mb-4 text-[11px] text-gray-500">Discover and connect new tools to extend Operino's capabilities.</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {filteredAvailable.map((a,i)=>(
                <div key={i} className="avail-card rounded-2xl bg-[#0d0b1f] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl mb-3" style={{background:`${catColors[a.category]||"#7c5cfc"}15`,border:`1px solid ${catColors[a.category]||"#7c5cfc"}30`}}>{a.icon}</div>
                  <p className="text-[13px] font-bold text-white">{a.name}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500 leading-snug">{a.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold" style={{background:`${catColors[a.category]||"#7c5cfc"}15`,color:catColors[a.category]||"#a78bfa"}}>{a.category}</span>
                    <button className="connect-btn rounded-lg bg-[#7c5cfc] px-2.5 py-1 text-[10px] font-bold text-white">Connect</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 py-3 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Browse all integrations in marketplace →</button>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Overview donut */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Integration Overview</p>
            <p className="mb-3 text-[11px] text-gray-500">Your workspace integration summary.</p>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 80 80" className="h-[80px] w-[80px] -rotate-90">
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#22c55e" strokeWidth="14" strokeDasharray="95 176" strokeDashoffset="0"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="#7c5cfc" strokeWidth="14" strokeDasharray="75 176" strokeDashoffset="-95"/>
                  <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="14" strokeDasharray="6 176" strokeDashoffset="-170"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[13px] font-bold text-white">12</span>
                  <span className="text-[8px] text-gray-500">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {[{c:"#22c55e",l:"Connected",v:8},{c:"#7c5cfc",l:"Available",v:42},{c:"rgba(255,255,255,0.2)",l:"Not Configured",v:6}].map(s=>(
                  <div key={s.l} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{background:s.c}}/>
                    <span className="text-[10px] text-gray-400 w-24">{s.l}</span>
                    <span className="text-[10px] font-bold text-white">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Popular Categories */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Popular Categories</p>
            {[{icon:"💬",l:"Communication",v:"3 connected"},{icon:"⚙️",l:"Productivity",v:"2 connected"},{icon:"💾",l:"Storage",v:"2 connected"},{icon:"⚡",l:"Automation",v:"1 connected"},{icon:"🤖",l:"AI",v:"1 connected"}].map((c,i)=>(
              <div key={i} className="cat-row flex items-center justify-between rounded-xl px-2 py-2">
                <div className="flex items-center gap-2"><span className="text-sm">{c.icon}</span><span className="text-[11px] text-gray-400">{c.l}</span></div>
                <div className="flex items-center gap-1"><span className="text-[10px] text-gray-500">{c.v}</span><span className="text-gray-600 text-xs">›</span></div>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8"/>
          {/* Custom */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Custom Integrations</p>
            <p className="mb-3 text-[11px] text-gray-500">Build custom integrations using our API.</p>
            <button className="si-btn w-full flex items-center justify-center gap-2 rounded-xl border border-[#7c5cfc]/30 bg-[#7c5cfc]/08 py-2.5 text-[12px] font-semibold text-[#a78bfa] hover:border-[#7c5cfc]/60 transition-all">
              + Create Custom Integration
            </button>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Learn more about integrations and how to set them up.</p>
            <button className="mb-1.5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white">📖 View Documentation</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white">🎧 Contact Support</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsIntegrations;
