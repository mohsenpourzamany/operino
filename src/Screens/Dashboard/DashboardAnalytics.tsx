import React, { useEffect, useState } from "react";

const Sparkline: React.FC<{data:number[];color:string}> = ({data,color}) => {
  const w=80,h=24,min=Math.min(...data),max=Math.max(...data);
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/(max-min||1))*h}`).join(" ");
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}><polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts}/></svg>;
};

const AreaChart: React.FC = () => {
  const thisWeek=[500,900,800,1200,1100,1600,1742];
  const lastWeek=[400,700,600,1000,900,1300,1400];
  const labels=["May 11","May 12","May 13","May 14","May 15","May 16","May 17"];
  const w=100,h=100,max=2000;
  const line=(d:number[])=>d.map((v,i)=>`${(i/(d.length-1))*w},${h-(v/max)*h}`).join(" ");
  return (
    <div>
      <div className="mb-2 flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5"><div className="h-2 w-4 rounded-full bg-[#7c5cfc]"/><span className="text-gray-400">This week</span></div>
        <div className="flex items-center gap-1.5"><div className="h-2 w-4 rounded-full border border-dashed border-gray-500"/><span className="text-gray-400">Last week</span></div>
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[120px] w-full">
        <defs>
          <linearGradient id="wg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c5cfc" stopOpacity="0.35"/><stop offset="100%" stopColor="#7c5cfc" stopOpacity="0"/></linearGradient>
        </defs>
        {[25,50,75].map(y=><line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>)}
        <polygon fill="url(#wg1)" points={`0,${h} ${line(thisWeek)} ${w},${h}`}/>
        <polyline fill="none" stroke="#7c5cfc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={line(thisWeek)}/>
        <polyline fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3,2" points={line(lastWeek)}/>
        <circle cx={(6/6)*100} cy={h-(1742/2000)*100} r="2" fill="#a78bfa"/>
      </svg>
      <div className="flex justify-between text-[9px] text-gray-600 mt-1">{labels.map(l=><span key={l}>{l}</span>)}</div>
    </div>
  );
};

const DonutChart: React.FC = () => {
  const segs=[{l:"WhatsApp",p:45,c:"#22c55e"},{l:"Instagram",p:25,c:"#ec4899"},{l:"Website",p:15,c:"#3b82f6"},{l:"Email",p:10,c:"#f97316"},{l:"Others",p:5,c:"#6b7280"}];
  const r=38,cx=50,cy=50,stroke=14,circ=2*Math.PI*r;
  let cum=0;
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <svg viewBox="0 0 100 100" className="h-[90px] w-[90px] -rotate-90">
          {segs.map(s=>{const dash=(s.p/100)*circ;const offset=circ-(cum/100)*circ;cum+=s.p;return <circle key={s.l} cx={cx} cy={cy} r={r} fill="none" stroke={s.c} strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={offset}/>;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[12px] font-bold text-white">2,453</span>
          <span className="text-[9px] text-gray-500">Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {segs.map(s=>(
          <div key={s.l} className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full flex-shrink-0" style={{background:s.c}}/>
            <span className="text-[10px] text-gray-400 w-16">{s.l}</span>
            <span className="text-[10px] font-bold text-white">{s.p}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SatisfactionChart: React.FC = () => {
  const data=[4.2,4.0,4.3,4.1,4.5,4.4,4.6,4.3,4.7,4.6,4.5,4.6];
  const labels=["May 11","May 12","May 13","May 14","May 15","May 16","May 17"];
  const w=100,h=100,min=3.5,max=5;
  const pts=data.map((v,i)=>({x:(i/(data.length-1))*w,y:h-((v-min)/(max-min))*h}));
  const line=pts.map(p=>`${p.x},${p.y}`).join(" ");
  return (
    <div>
      <div className="mb-1 flex justify-between text-[10px] text-gray-600"><span>5.0</span></div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-[80px] w-full">
        <polyline fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={line}/>
        {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#a78bfa"/>)}
      </svg>
      <div className="flex justify-between text-[9px] text-gray-600">{labels.map(l=><span key={l}>{l}</span>)}</div>
    </div>
  );
};

const statCards=[
  {label:"Conversations",val:"2,453",delta:"+18.6%",color:"#7c5cfc",data:[900,1200,1000,1500,1300,1800,2000,2453]},
  {label:"Unique Contacts",val:"1,276",delta:"+16.2%",color:"#3b82f6",data:[500,650,600,800,750,950,1100,1276]},
  {label:"Resolution Rate",val:"92.4%",delta:"+5.3%",color:"#22c55e",data:[85,86,87,88,89,90,91,92.4]},
  {label:"Avg. Response Time",val:"2m 34s",delta:"▼12.5%",color:"#f97316",data:[5,4.5,4,3.8,3.5,3.2,3,2.5],neg:true},
  {label:"Automation Rate",val:"78.6%",delta:"+8.7%",color:"#a78bfa",data:[60,63,65,68,70,73,76,78.6]},
];

const employees=[
  {name:"Support Agent",conv:1245,delta:"+12.5%",rate:96,sat:4.8,color:"#7c5cfc"},
  {name:"Sales Agent",conv:532,delta:"+8.3%",rate:94,sat:4.6,color:"#3b82f6"},
  {name:"Instagram Agent",conv:384,delta:"+15.7%",rate:89,sat:4.5,color:"#ec4899"},
  {name:"WhatsApp Agent",conv:292,delta:"+10.2%",rate:94,sat:4.7,color:"#22c55e"},
  {name:"Email Agent",conv:120,delta:"-4.1%",rate:91,sat:4.3,color:"#f97316"},
];

const insights=[
  {icon:"🎉",title:"Great Job!",text:"Your resolution rate improved 5.3% compared to last week.",color:"#22c55e"},
  {icon:"📈",title:"Peak Performance",text:"Thursday had the highest number of conversations.",color:"#7c5cfc"},
  {icon:"⏱️",title:"Response Time Improved",text:"Your average response time decreased by 12.5%.",color:"#f97316"},
];

const intents=[{l:"Pricing",p:28},{l:"General Inquiry",p:22},{l:"Product Information",p:18},{l:"Technical Support",p:15},{l:"Other",p:17}];

const DashboardAnalytics: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState("Overview");
  const subTabs=["Overview","Conversations","AI Employees","Automations","Channels","Leads"];

  useEffect(()=>{ setVisible(true); },[]);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .an-fade{animation:fadeUp 0.5s ease forwards;}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.25s ease,border-color 0.25s ease,box-shadow 0.25s ease;}
        .stat-card:hover{transform:translateY(-3px);border-color:rgba(124,92,252,0.35);box-shadow:0 8px 24px rgba(124,92,252,0.15);}
        .an-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .an-btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,0.3);}
        .emp-row{transition:background 0.2s ease;}
        .emp-row:hover{background:rgba(124,92,252,0.06);}
        .intent-bar{transition:width 1s ease;}
      `}</style>

      <div className={`flex h-full overflow-hidden ${visible?"an-fade":"opacity-0"}`}>
        {/* Main */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white flex items-center gap-2">Analytics 📈</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Track and analyze your AI workforce performance.</p>
            </div>
            <div className="flex gap-2">
              <button className="an-btn flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">
                📅 May 11 – May 17, 2024 ▾
              </button>
              <button className="an-btn flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">
                ⬇️ Export
              </button>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="mb-5 flex gap-1 overflow-x-auto border-b border-white/8 pb-0">
            {subTabs.map(t=>(
              <button key={t} onClick={()=>setActiveSubTab(t)}
                className={`flex-shrink-0 pb-2.5 px-3 text-[12px] font-semibold border-b-2 transition-all ${activeSubTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Stat cards */}
          <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {statCards.map((s,i)=>(
              <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-3">
                <p className="text-[10px] text-gray-500">{s.label}</p>
                <p className="mt-1 text-[clamp(14px,2vw,20px)] font-bold text-white leading-none">{s.val}</p>
                <div className="mt-1.5 flex items-end justify-between">
                  <span className={`text-[10px] font-semibold ${s.neg?"text-red-400":"text-emerald-400"}`}>{s.delta} from last week</span>
                </div>
                <div className="mt-1"><Sparkline data={s.data} color={s.color}/></div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-white">Conversations Over Time</h3>
                <button className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-400">Daily ▾</button>
              </div>
              <AreaChart/>
            </div>
            <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
              <h3 className="mb-3 text-[13px] font-bold text-white">Conversations by Channel</h3>
              <DonutChart/>
            </div>
          </div>

          {/* Performance table */}
          <div className="mb-5 rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-white">Performance by AI Employee</h3>
            </div>
            <div className="grid grid-cols-[1fr_100px_120px_100px] gap-2 border-b border-white/8 pb-2 text-[10px] font-semibold text-gray-600">
              <span>AI Employee</span><span>Conversations</span><span>Resolution Rate</span><span>Satisfaction</span>
            </div>
            {employees.map((e,i)=>(
              <div key={i} className="emp-row grid grid-cols-[1fr_100px_120px_100px] items-center gap-2 rounded-xl px-2 py-2.5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg text-base" style={{background:`${e.color}20`}}>🤖</div>
                  <span className="text-[12px] font-semibold text-white">{e.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] font-bold text-white">{e.conv.toLocaleString()}</span>
                  <span className={`text-[10px] font-semibold ${e.delta.startsWith("+")?"text-emerald-400":"text-red-400"}`}>{e.delta}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5"><span className="text-white font-semibold">{e.rate}%</span></div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-emerald-400" style={{width:`${e.rate}%`}}/>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#fbbf24] text-sm">★</span>
                  <span className="text-[12px] font-semibold text-white">{e.sat}</span>
                </div>
              </div>
            ))}
            <button className="mt-3 w-full rounded-xl border border-[#7c5cfc]/30 py-2 text-[12px] font-semibold text-[#a78bfa] hover:border-[#7c5cfc]/60 transition-all">
              View all employees
            </button>
          </div>

          {/* Satisfaction chart */}
          <div className="rounded-2xl border border-white/7 bg-[#0d0b1f] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[13px] font-bold text-white">Satisfaction Over Time</h3>
              <button className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-400">Daily ▾</button>
            </div>
            <SatisfactionChart/>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* AI Insights */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white flex items-center gap-1.5">✨ AI Insights</p>
            <div className="flex flex-col gap-3">
              {insights.map((ins,i)=>(
                <div key={i} className="flex items-start gap-2.5 rounded-xl border border-white/6 bg-white/3 p-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-base" style={{background:`${ins.color}20`}}>{ins.icon}</div>
                  <div>
                    <p className="text-[11px] font-bold text-white">{ins.title}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-gray-500">{ins.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full rounded-xl border border-[#7c5cfc]/30 py-2 text-[11px] font-semibold text-[#a78bfa] hover:border-[#7c5cfc]/60 transition-all">
              View full report
            </button>
          </div>

          <div className="border-t border-white/8"/>

          {/* Top Intents */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Top Intents</p>
              <button className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd]">View all</button>
            </div>
            {intents.map((t,i)=>(
              <div key={i} className="mb-2">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] text-gray-400">{t.l}</span>
                  <span className="text-[11px] font-bold text-white">{t.p}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="intent-bar h-full rounded-full bg-gradient-to-r from-[#7c5cfc] to-[#a78bfa]" style={{width:`${t.p*3}px`,maxWidth:"100%"}}/>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8"/>

          {/* Leads overview */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Leads Overview</p>
            <div className="grid grid-cols-2 gap-2">
              {[{l:"Total Leads",v:"356",d:"+23.4%"},{l:"Qualified Leads",v:"198",d:"+18.7%"},{l:"Conversion Rate",v:"24.6%",d:"+4.3%"},{l:"Deals Created",v:"48",d:"+12.1%"}].map((s,i)=>(
                <div key={i} className="rounded-xl bg-white/4 p-2">
                  <p className="text-[9px] text-gray-500">{s.l}</p>
                  <p className="text-[13px] font-bold text-white">{s.v}</p>
                  <p className="text-[9px] font-semibold text-emerald-400">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardAnalytics;
