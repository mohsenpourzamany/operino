import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-5 w-9 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${on?"left-4":"left-0.5"}`}/>
  </button>
);

const usageData = [
  {icon:"💎",label:"Credits",used:12450,limit:20000,limitStr:"20,000",pct:62,color:"#7c5cfc"},
  {icon:"🤖",label:"AI Employees",used:8,limit:null,limitStr:"Unlimited",pct:0,color:"#22c55e"},
  {icon:"💬",label:"Conversations",used:18732,limit:50000,limitStr:"50,000",pct:37,color:"#3b82f6"},
  {icon:"⚡",label:"Automations Executions",used:3215,limit:10000,limitStr:"10,000",pct:32,color:"#f97316"},
  {icon:"💾",label:"Storage",used:"45 GB",limit:null,limitStr:"100 GB",pct:45,color:"#a78bfa"},
  {icon:"🔌",label:"API Requests",used:"128,456",limit:null,limitStr:"500,000",pct:26,color:"#22c55e"},
];

const MultiLineChart: React.FC = () => {
  const series = [
    {name:"Credits",color:"#7c5cfc",data:[25000,28000,30000,32000,35000,38000,40000,38000,41000,43000,40000,42000]},
    {name:"Conversations",color:"#3b82f6",data:[12000,14000,15000,16000,18000,19000,20000,19000,21000,22000,21000,22000]},
    {name:"API Requests",color:"#f97316",data:[5000,6000,7000,8000,9000,10000,11000,10000,11000,12000,11000,12000]},
    {name:"Storage",color:"#22c55e",data:[1000,1200,1400,1600,1800,2000,2200,2400,2600,2800,3000,3200]},
  ];
  const labels=["Apr 16","Apr 20","Apr 24","Apr 28","May 2","May 6","May 10","May 14"];
  const w=100,h=100,max=50000;
  const getPath=(d:number[])=>d.map((v,i)=>`${(i/(d.length-1))*w},${h-(v/max)*h}`).join(" ");

  return (
    <div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[140px] w-full">
        {[20,40,60,80].map(y=><line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
        {[0,10000,20000,30000,40000,50000].map(v=>(
          <text key={v} x="0" y={h-(v/max)*h} fontSize="3" fill="rgba(255,255,255,0.2)">{v===0?"0":v>=1000?`${v/1000}K`:v}</text>
        ))}
        {series.map(s=>(
          <polyline key={s.name} fill="none" stroke={s.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" points={getPath(s.data)}/>
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {series.map(s=>(
            <div key={s.name} className="flex items-center gap-1.5">
              <div className="h-2 w-4 rounded-full" style={{background:s.color}}/>
              <span className="text-[10px] text-gray-500">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          {["Apr 16","Apr 20","Apr 24","Apr 28","May 2","May 6","May 10","May 14"].map(l=><span key={l}>{l}</span>)}
        </div>
      </div>
    </div>
  );
};

const SettingsUsageLimits: React.FC = () => {
  const [activeTab,setActiveTab]=useState("Overview");
  const [alerts,setAlerts]=useState([true,true,false]);
  const tabs=["Overview","AI Employees","Conversations","Automations","Storage","API & Webhooks"];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .ul-fade{animation:fadeUp 0.5s ease forwards;}
        .ul-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease;}
        .ul-card:hover{transform:translateY(-2px);border-color:rgba(124,92,252,0.3);}
        .ul-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .ul-row:hover{background:rgba(124,92,252,0.04);}
        .ul-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .ul-btn:hover{transform:translateY(-2px);}
        .upgrade-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .upgrade-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .upgrade-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .upgrade-btn:hover::after{animation:shimmer 0.55s ease forwards;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="ul-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Usage & Limits</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Track your usage across the platform and manage limits to stay on track.</p>
            </div>
            <button className="ul-btn flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">⬇️ Export Usage Report</button>
          </div>

          {/* Sub tabs */}
          <div className="ul-fade mb-5 flex gap-0 overflow-x-auto border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {tabs.map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`flex-shrink-0 pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Usage stat cards */}
          <div className="ul-fade mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5" style={{animationDelay:"0.1s"}}>
            {usageData.map((s,i)=>(
              <div key={i} className="ul-card rounded-2xl bg-[#0d0b1f] p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-base">{s.icon}</span>
                  <p className="text-[10px] text-gray-500">{s.label}</p>
                </div>
                <p className="text-[14px] font-bold text-white leading-none">{typeof s.used==="number"?s.used.toLocaleString():s.used} <span className="text-[10px] text-gray-500">/ {s.limitStr}</span></p>
                {s.pct>0&&(
                  <div className="mt-1.5">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{width:`${s.pct}%`,background:s.color}}/></div>
                    <p className="mt-0.5 text-[9px] text-gray-600">{s.pct}% used</p>
                  </div>
                )}
                {s.label==="AI Employees"&&<div className="mt-1 flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-emerald-400"/><p className="text-[9px] text-emerald-400">Active</p></div>}
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="ul-fade rounded-2xl border border-white/7 bg-[#0d0b1f] p-5 mb-4" style={{animationDelay:"0.15s"}}>
            <div className="mb-3 flex items-center justify-between">
              <div><h3 className="text-[14px] font-bold text-white">Usage Over Time</h3><p className="text-[11px] text-gray-500">Your usage trends for the selected period.</p></div>
              <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 cursor-pointer">Last 30 days ▾ <span className="ml-1">📅</span></div>
            </div>
            <MultiLineChart/>
          </div>

          {/* Usage Breakdown */}
          <div className="ul-fade rounded-2xl border border-white/7 bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.2s"}}>
            <div className="border-b border-white/8 px-5 py-3">
              <h3 className="text-[14px] font-bold text-white">Usage Breakdown</h3>
              <p className="text-[11px] text-gray-500">Detailed breakdown of your current usage and limits.</p>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"1fr 80px 100px 1fr 120px"}}>
              <span>Category</span><span>Used</span><span>Limit</span><span>Usage</span><span>Actions</span>
            </div>
            {usageData.map((s,i)=>(
              <div key={i} className="ul-row grid items-center px-5 py-3" style={{gridTemplateColumns:"1fr 80px 100px 1fr 120px"}}>
                <div className="flex items-center gap-2"><span className="text-base">{s.icon}</span><span className="text-[13px] font-semibold text-white">{s.label}</span></div>
                <span className="text-[12px] text-white">{typeof s.used==="number"?s.used.toLocaleString():s.used}</span>
                <span className="text-[12px] text-gray-400">{s.limitStr}</span>
                <div className="pr-6">
                  {s.pct>0?(
                    <>
                      <div className="flex items-center justify-between mb-0.5"><span className="text-[10px] text-white">{s.pct}%</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full" style={{width:`${s.pct}%`,background:s.color}}/></div>
                    </>
                  ):<span className="text-[11px] text-gray-500">—</span>}
                </div>
                <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                  {s.label==="AI Employees"?"Manage":"Manage Limit"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Plan Limits */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Plan Limits</p>
            <p className="mb-3 text-[11px] text-gray-500">Your current plan and limits.</p>
            <div className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-2">
              <div className="flex items-center gap-2"><span className="text-sm">👑</span><span className="text-[12px] font-bold text-white">Pro Plan</span></div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-full bg-emerald-500/15 text-[9px] font-bold text-emerald-400 px-1.5 py-0.5">Active</span>
                <span className="text-[11px] font-semibold text-white">$79/mo</span>
              </div>
            </div>
            {[{l:"Credits",v:"20,000/month"},{l:"AI Employees",v:"Unlimited"},{l:"Conversations",v:"50,000/month"},{l:"Automations",v:"10,000/month"},{l:"Storage",v:"100 GB"},{l:"API Requests",v:"500K/month"},{l:"Team Members",v:"Up to 20"}].map((r,i)=>(
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[11px] text-gray-500">{r.l}</span>
                <span className="text-[11px] font-semibold text-white">{r.v}</span>
              </div>
            ))}
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage Subscription</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Need More */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need More?</p>
            <p className="mb-3 text-[11px] text-gray-500">If you're reaching your limits frequently, consider upgrading your plan.</p>
            {["Higher usage limits","Advanced features","Priority support"].map((f,i)=>(
              <div key={i} className="mb-1.5 flex items-center gap-1.5"><span className="text-[#7c5cfc] text-xs">✓</span><span className="text-[11px] text-gray-400">{f}</span></div>
            ))}
            <button className="upgrade-btn mt-2 w-full rounded-xl bg-[#7c5cfc] py-2 text-[12px] font-bold text-white">Upgrade Plan</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Usage Alerts */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Usage Alerts</p>
            <p className="mb-3 text-[11px] text-gray-500">Get notified when you're close to reaching your limits.</p>
            {[{l:"Credits",v:"80%"},{l:"Storage",v:"80%"},{l:"API Requests",v:"80%"}].map((a,i)=>(
              <div key={i} className="mb-2 flex items-center justify-between">
                <div><span className="text-[11px] text-gray-400">{a.l}</span><span className="ml-2 text-[11px] text-gray-600">{a.v}</span></div>
                <Toggle on={alerts[i]} onChange={()=>setAlerts(prev=>{const n=[...prev];n[i]=!n[i];return n;})}/>
              </div>
            ))}
            <button className="mt-1 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-400 hover:text-white transition-all">
              <span>Manage Alerts</span><span>›</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsUsageLimits;
