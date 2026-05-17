import React, { useEffect, useRef, useState } from "react";

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const MiniChart: React.FC = () => {
  const data = [300,500,400,700,600,900,800,1000,950,1100];
  const w=100,h=100,min=0,max=1200;
  const pts = data.map((v,i)=>({x:(i/(data.length-1))*w,y:h-((v-min)/(max-min))*h}));
  const line = pts.map(p=>`${p.x},${p.y}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[60px] w-full">
      <defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.3"/><stop offset="100%" stopColor="#7c5cfc" stopOpacity="0"/></linearGradient></defs>
      <polygon fill="url(#ag)" points={area}/>
      <polyline fill="none" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={line}/>
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="2" fill="#a78bfa"/>
    </svg>
  );
};

const automations = [
  { icon:"💚", name:"WhatsApp Lead Capture", desc:"Capture new leads from WhatsApp and add to CRM", status:true, runs:1253, rate:"98.5%", trigger:"New Message", action:"Add to CRM", updated:"2h ago", color:"#22c55e" },
  { icon:"📷", name:"Instagram DM Auto Reply", desc:"Automatically reply to Instagram DMs", status:true, runs:856, rate:"96.2%", trigger:"DM Received", action:"Send Message", updated:"5h ago", color:"#ec4899" },
  { icon:"✉️", name:"Welcome Email Sequence", desc:"Send welcome email sequence to new subscribers", status:true, runs:632, rate:"97.1%", trigger:"New Subscriber", action:"Send Email (3 steps)", updated:"1d ago", color:"#3b82f6" },
  { icon:"🏷️", name:"Tag High-Intent Leads", desc:"Tag leads based on high intent keywords", status:true, runs:421, rate:"94.3%", trigger:"Keyword Matched", action:"Add Tag", updated:"1d ago", color:"#f97316" },
  { icon:"📅", name:"Booking Confirmation", desc:"Send confirmation and reminder for bookings", status:true, runs:309, rate:"99.3%", trigger:"Booking Created", action:"Send SMS + Email", updated:"2d ago", color:"#a78bfa" },
  { icon:"⚙️", name:"CRM to Slack Notification", desc:"Notify team on Slack for new CRM deals", status:false, runs:128, rate:"89.7%", trigger:"New Deal", action:"Send Slack Message", updated:"3d ago", color:"#6b7280" },
];

const templates = [
  { icon:"💚", name:"WhatsApp Lead Capture", desc:"Capture and qualify WhatsApp leads" },
  { icon:"📷", name:"Instagram Auto Reply", desc:"Auto reply to Instagram DMs" },
  { icon:"✉️", name:"Email Welcome Sequence", desc:"Send automated email sequence" },
  { icon:"📅", name:"Booking Reminder", desc:"Send booking reminders" },
];

const DashboardAutomations: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [toggles, setToggles] = useState(automations.map(a=>a.status));
  const [activeTab, setActiveTab] = useState("All Automations");
  const [search, setSearch] = useState("");

  useEffect(()=>{ setVisible(true); },[]);

  const tabs = ["All Automations 12","Active 7","Inactive 5"];

  const filtered = automations.filter(a=>{
    const tabMatch = activeTab.startsWith("All") || (activeTab.startsWith("Active") && a.status) || (activeTab.startsWith("Inactive") && !a.status);
    const searchMatch = !search || a.name.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .at-fade{animation:fadeUp 0.5s ease forwards;}
        .at-row{border:1px solid rgba(255,255,255,0.06);transition:transform 0.22s ease,border-color 0.22s ease,background 0.22s ease;}
        .at-row:hover{transform:translateX(3px);border-color:rgba(124,92,252,0.35);background:rgba(124,92,252,0.05)!important;}
        .at-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .at-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .at-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .at-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .rate-green{color:#22c55e;} .rate-yellow{color:#fbbf24;} .rate-red{color:#f87171;}
        .flow-node{border:1px solid rgba(124,92,252,0.3);transition:border-color 0.2s ease,background 0.2s ease;}
        .flow-node:hover{border-color:rgba(124,92,252,0.6);background:rgba(124,92,252,0.15)!important;}
        .use-btn{transition:background 0.2s ease,transform 0.2s ease;}
        .use-btn:hover{background:#6b4ce0!important;transform:translateY(-1px);}
        .at-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
      `}</style>

      <div className="flex h-full overflow-hidden">
        {/* Main */}
        <div className={`flex flex-1 flex-col overflow-y-auto px-6 py-5 ${visible?"at-fade":"opacity-0"}`}>
          {/* Header */}
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Automations</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Build powerful workflows to automate your business.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:border-white/25 hover:text-white transition-all">
                ⬇️ Import workflow ▾
              </button>
              <button className="at-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">
                + Create Automation ▾
              </button>
            </div>
          </div>

          {/* Tabs + search + filter */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 rounded-xl bg-white/5 p-1">
              {tabs.map(t=>(
                <button key={t} onClick={()=>setActiveTab(t.split(" ").slice(0,2).join(" ").trim())}
                  className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all ${activeTab===t.split(" ").slice(0,2).join(" ").trim()?"bg-[#7c5cfc] text-white":"text-gray-400 hover:text-white"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                <input type="text" placeholder="Search automations..." value={search} onChange={e=>setSearch(e.target.value)}
                  className="at-search w-[180px] rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-400 hover:text-white transition-colors">🔽 Filter</button>
              <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-400 hover:text-white transition-colors">Sort by: Newest ▾</button>
            </div>
          </div>

          {/* Automation rows */}
          <div className="flex flex-col gap-2">
            {filtered.map((a,i)=>(
              <div key={i} className="at-row rounded-2xl bg-[#0d0b1f] px-5 py-4">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{background:`${a.color}20`,border:`1px solid ${a.color}40`}}>{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[14px] font-bold text-white">{a.name}</p>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${a.status?"bg-emerald-500/15 text-emerald-400":"bg-gray-500/15 text-gray-500"}`}>{a.status?"Active":"Inactive"}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-gray-500">{a.desc}</p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[11px]">
                      <span className="rounded-lg bg-white/8 px-2 py-0.5 text-gray-400">When</span>
                      <span className="rounded-lg bg-[#7c5cfc]/15 px-2 py-0.5 text-[#a78bfa]">• {a.trigger}</span>
                      <span className="text-gray-600">→</span>
                      <span className="rounded-lg bg-white/8 px-2 py-0.5 text-gray-400">Then</span>
                      <span className="rounded-lg bg-[#7c5cfc]/15 px-2 py-0.5 text-[#a78bfa]">• {a.action}</span>
                      <span className="ml-auto text-gray-600">Updated {a.updated}</span>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-6">
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">Runs</p>
                      <p className="text-[14px] font-bold text-white">{a.runs.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-gray-500">Success rate</p>
                      <p className={`text-[14px] font-bold ${parseFloat(a.rate)>=95?"rate-green":parseFloat(a.rate)>=90?"rate-yellow":"rate-red"}`}>{a.rate}</p>
                    </div>
                    <Toggle on={toggles[i]} onChange={()=>setToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[12px] text-gray-500">Showing 1 to {filtered.length} of {automations.length} automations</span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400">‹</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cfc] text-[12px] font-bold text-white">1</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[12px] text-gray-400 hover:text-white">2</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400">›</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className={`w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5 ${visible?"at-fade":"opacity-0"}`} style={{animationDelay:"0.15s"}}>
          {/* Builder */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Automation Builder</p>
            <p className="mb-3 text-[11px] text-gray-500">Create custom workflows with our visual builder.</p>
            <div className="flex flex-col gap-1.5">
              {[
                {icon:"💚",label:"When this happens",sub:"New Message"},
                {icon:"🤖",label:"Do this",sub:"Add to CRM"},
                {icon:"✈️",label:"Then this",sub:"Send Welcome Message"},
              ].map((n,i)=>(
                <React.Fragment key={i}>
                  <div className="flow-node flex items-center gap-2.5 rounded-xl bg-white/4 px-3 py-2">
                    <span className="text-base">{n.icon}</span>
                    <div>
                      <p className="text-[10px] text-gray-500">{n.label}</p>
                      <p className="text-[11px] font-semibold text-white">{n.sub}</p>
                    </div>
                  </div>
                  {i < 2 && <div className="mx-auto h-4 w-px bg-[#7c5cfc]/40"/>}
                </React.Fragment>
              ))}
            </div>
            <button className="at-btn mt-3 w-full rounded-xl bg-[#7c5cfc] py-2.5 text-[12px] font-bold text-white">
              Create New Workflow
            </button>
          </div>

          <div className="border-t border-white/8"/>

          {/* Templates */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Popular Templates</p>
              <button className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all</button>
            </div>
            <p className="mb-3 text-[11px] text-gray-500">Explore pre-built automation templates.</p>
            {templates.map((t,i)=>(
              <div key={i} className="mb-2 flex items-center gap-2.5 rounded-xl bg-white/4 px-3 py-2 border border-white/6">
                <span className="text-base flex-shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{t.name}</p>
                  <p className="text-[10px] text-gray-500 truncate">{t.desc}</p>
                </div>
                <button className="use-btn flex-shrink-0 rounded-lg bg-[#7c5cfc] px-2 py-1 text-[10px] font-bold text-white">Use</button>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8"/>

          {/* Overview */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Automation Overview</p>
              <button className="flex items-center gap-1 text-[11px] text-gray-400">This month ▾</button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[{l:"Total Runs",v:"3,599",d:"+18.6%"},{l:"Success Rate",v:"96.4%",d:"+4.2%"},{l:"Active",v:"7",d:"+1"},{l:"Failed Runs",v:"128",d:"-8.3%",neg:true}].map((s,i)=>(
                <div key={i} className="rounded-xl bg-white/4 p-2">
                  <p className="text-[10px] text-gray-500">{s.label||s.l}</p>
                  <p className="text-[13px] font-bold text-white">{s.v}</p>
                  <p className={`text-[10px] font-semibold ${s.neg?"text-red-400":"text-emerald-400"}`}>{s.d}</p>
                </div>
              ))}
            </div>
            <MiniChart/>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardAutomations;
