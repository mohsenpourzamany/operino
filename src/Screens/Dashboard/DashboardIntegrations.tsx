import React, { useEffect, useState } from "react";

const connected = [
  { icon: "💚", name: "WhatsApp Business", desc: "Send and receive messages via WhatsApp", status: "Connected", synced: "2 min ago", color: "#22c55e" },
  { icon: "📷", name: "Instagram", desc: "Manage DMs and comments", status: "Connected", synced: "5 min ago", color: "#ec4899" },
  { icon: "📧", name: "Gmail", desc: "Send and receive emails", status: "Connected", synced: "8 min ago", color: "#ea4335" },
  { icon: "📊", name: "Google Sheets", desc: "Sync data to Google Sheets", status: "Connected", synced: "15 min ago", color: "#34a853" },
  { icon: "🧡", name: "HubSpot", desc: "Sync leads and CRM data", status: "Connected", synced: "30 min ago", color: "#f97316" },
  { icon: "💜", name: "Slack", desc: "Receive notifications in Slack", status: "Connected", synced: "45 min ago", color: "#7c5cfc" },
];

const popular = [
  { icon: "⚡", name: "Zapier", desc: "Connect with 5,000+ apps" },
  { icon: "🔵", name: "Make", desc: "Automate workflows" },
  { icon: "🎵", name: "TikTok Lead Ads", desc: "Capture leads from TikTok" },
  { icon: "📅", name: "Calendly", desc: "Schedule appointments" },
];

const tabs = ["All Integrations", "Connected (12)", "Communication (6)", "CRM (8)", "Marketing (7)", "Storage (4)", "Other (17)"];

const DashboardIntegrations: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All Integrations");
  const [search, setSearch] = useState("");

  useEffect(() => { setVisible(true); }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .int-fade{animation:fadeUp 0.5s ease forwards;}
        .int-row{border:1px solid rgba(255,255,255,0.06);transition:transform 0.22s ease,border-color 0.22s ease,background 0.22s ease;}
        .int-row:hover{transform:translateX(3px);border-color:rgba(124,92,252,0.35);background:rgba(124,92,252,0.05)!important;}
        .int-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .int-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .int-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .int-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .int-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        @keyframes syncPulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .sync-dot{animation:syncPulse 2s ease-in-out infinite;}
        .connect-btn{transition:background 0.2s ease,transform 0.2s ease;}
        .connect-btn:hover{background:#6b4ce0!important;transform:translateY(-1px);}
        @keyframes glowRing{0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.3);}50%{box-shadow:0 0 0 6px rgba(124,92,252,0);}}
        .health-ring{animation:glowRing 3s ease-in-out infinite;}
      `}</style>

      <div className={`flex h-full overflow-hidden ${visible?"int-fade":"opacity-0"}`}>
        {/* Main */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
          {/* Header */}
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Integrations</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Connect your favorite tools and platforms to supercharge your AI workforce.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">
                ⊞ Browse all integrations
              </button>
              <button className="int-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">
                + Add custom integration
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              {icon:"⊞",label:"Connected",val:"12",sub:"Active integrations",color:"#7c5cfc"},
              {icon:"🔗",label:"Available",val:"42",sub:"Ready to connect",color:"#3b82f6"},
              {icon:"✅",label:"Successful Syncs",val:"1,247",sub:"This week ↑18.6%",color:"#22c55e"},
              {icon:"⚡",label:"Automations Powered",val:"28",sub:"Using integrations",color:"#f97316"},
            ].map((s,i)=>(
              <div key={i} className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4 transition-all hover:border-[rgba(124,92,252,0.3)] hover:-translate-y-1">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl" style={{background:`${s.color}20`}}>{s.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500">{s.label}</p>
                    <p className="text-[18px] font-bold text-white leading-none">{s.val}</p>
                  </div>
                </div>
                <p className="mt-1.5 text-[10px] text-gray-600">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Tabs + search */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-0 overflow-x-auto border-b border-white/8">
              {tabs.map(t=>(
                <button key={t} onClick={()=>setActiveTab(t)}
                  className={`flex-shrink-0 pb-2.5 pr-4 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                <input type="text" placeholder="Search integrations..." value={search} onChange={e=>setSearch(e.target.value)}
                  className="int-search w-[180px] rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-400 hover:text-white">🔽 Filter</button>
            </div>
          </div>

          {/* Your Integrations */}
          <p className="mb-3 text-[13px] font-bold text-white">Your Integrations <span className="ml-1 text-[10px] text-gray-600">ℹ️</span></p>
          <div className="flex flex-col gap-2">
            {connected.filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())).map((c,i)=>(
              <div key={i} className="int-row flex items-center gap-4 rounded-2xl bg-[#0d0b1f] px-5 py-3.5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{background:`${c.color}20`,border:`1px solid ${c.color}40`}}>{c.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-bold text-white">{c.name}</p>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Connected</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{c.desc}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[10px] text-gray-600">Last synced</p>
                  <p className="text-[12px] font-semibold text-white">{c.synced}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="sync-dot h-2 w-2 rounded-full bg-emerald-400"/>
                  <span className="text-[11px] text-gray-400">Auto-sync on</span>
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            ))}
          </div>

          {/* Add new */}
          <div className="mt-3 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#7c5cfc]/30 bg-[#7c5cfc]/05 px-5 py-4 hover:border-[#7c5cfc]/60 hover:bg-[#7c5cfc]/10 transition-all">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7c5cfc]/40 text-[#7c5cfc] text-xl">+</div>
            <div>
              <p className="text-[13px] font-semibold text-[#a78bfa]">Add new integration</p>
              <p className="text-[11px] text-gray-500">Connect another tool to expand Operino's capabilities</p>
            </div>
            <span className="ml-auto text-[#a78bfa]">›</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Health donut */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Integration Health</p>
              <span className="text-[11px] text-emerald-400 font-semibold">All good! 🎉</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="health-ring relative flex-shrink-0">
                <svg viewBox="0 0 80 80" className="h-[80px] w-[80px] -rotate-90">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"/>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#22c55e" strokeWidth="12" strokeDasharray="150 188" strokeDashoffset="0"/>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#fbbf24" strokeWidth="12" strokeDasharray="12 188" strokeDashoffset="-150"/>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#f87171" strokeWidth="12" strokeDasharray="8 188" strokeDashoffset="-162"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[14px] font-bold text-white">12</span>
                  <span className="text-[8px] text-gray-500">Active</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {[{c:"#22c55e",l:"Healthy",v:10},{c:"#fbbf24",l:"Warning",v:1},{c:"#f87171",l:"Error",v:1}].map(s=>(
                  <div key={s.l} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{background:s.c}}/>
                    <span className="text-[11px] text-gray-400">{s.l}</span>
                    <span className="ml-auto text-[11px] font-bold text-white">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/8"/>

          {/* Popular */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Popular Integrations</p>
              <button className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd]">View all</button>
            </div>
            {popular.map((p,i)=>(
              <div key={i} className="mb-2 flex items-center gap-2.5 rounded-xl bg-white/4 px-3 py-2 border border-white/6">
                <span className="text-lg flex-shrink-0">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white">{p.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{p.desc}</p>
                </div>
                <button className="connect-btn flex-shrink-0 rounded-lg bg-[#7c5cfc] px-2 py-1 text-[10px] font-bold text-white">Connect</button>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8"/>

          {/* Need help */}
          <div className="rounded-2xl border border-[#7c5cfc]/20 bg-[#7c5cfc]/08 p-3">
            <p className="text-[12px] font-bold text-white">Need help connecting?</p>
            <p className="mt-0.5 text-[10px] text-gray-500">Check our integration guides or contact support.</p>
            <button className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 py-1.5 text-[11px] font-semibold text-gray-300 hover:text-white transition-all">📖 View Documentation</button>
          </div>

          <div className="border-t border-white/8"/>

          {/* Webhooks */}
          <div>
            <p className="text-[13px] font-bold text-white mb-1">⚙️ Webhooks</p>
            <p className="text-[11px] text-gray-500 mb-2">Manage your webhook endpoints</p>
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage →</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardIntegrations;
