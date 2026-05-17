import React, { useState } from "react";

const members = [
  { name:"Mohsen", email:"mohsen@exemple.com", role:"Owner", team:"Management", perm:"All Access", permColor:"#22c55e", lastActive:"Today, 10:30 AM", status:"Active", you:true },
  { name:"Ali Rezaei", email:"alirezaei@exemple.com", role:"Admin", team:"Support Team", perm:"All Access", permColor:"#22c55e", lastActive:"Today, 9:15 AM", status:"Active" },
  { name:"Neda Farahani", email:"neda@exemple.com", role:"Admin", team:"Sales Team", perm:"All Access", permColor:"#22c55e", lastActive:"Yesterday, 6:45 PM", status:"Active" },
  { name:"Hamed Mohammadi", email:"hamed@exemple.com", role:"Member", team:"Support Team", perm:"Limited Access", permColor:"#fbbf24", lastActive:"Yesterday, 4:20 PM", status:"Active" },
  { name:"Sara Ahmadi", email:"sara@exemple.com", role:"Member", team:"Marketing Team", perm:"Limited Access", permColor:"#fbbf24", lastActive:"May 15, 2024", status:"Active" },
  { name:"Reza Khosravi", email:"reza@exemple.com", role:"Member", team:"Automation Team", perm:"Limited Access", permColor:"#fbbf24", lastActive:"May 14, 2024", status:"Active" },
  { name:"Elham Bagheri", email:"elham@exemple.com", role:"Guest", team:"Support Team", perm:"View Only", permColor:"#6b7280", lastActive:"May 13, 2024", status:"Active" },
  { name:"Taha Yousefi", email:"taha@exemple.com", role:"Guest", team:"Sales Team", perm:"View Only", permColor:"#6b7280", lastActive:"May 10, 2024", status:"Invited" },
];

const teams=[{name:"Support Team",count:6},{name:"Sales Team",count:4},{name:"Marketing Team",count:3},{name:"Automation Team",count:3}];

const SettingsTeamMembers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Members");

  const filtered = members.filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .tm-fade{animation:fadeUp 0.5s ease forwards;}
        .tm-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .tm-row:hover{background:rgba(124,92,252,0.06);}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease;}
        .stat-card:hover{transform:translateY(-2px);border-color:rgba(124,92,252,0.3);}
        .tm-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .tm-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .tm-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .tm-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .tm-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
      `}</style>

      <div className="flex gap-0 h-full">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* Header */}
          <div className="tm-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Team & Members</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Manage your team members, roles, permissions, and workspace access.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">👥 View Organization Chart</button>
              <button className="tm-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">+ Invite Member</button>
            </div>
          </div>

          {/* Sub tabs */}
          <div className="tm-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["Members","Roles & Permissions","Invitations","Teams","Activity Logs"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Stat cards */}
          <div className="tm-fade mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5" style={{animationDelay:"0.1s"}}>
            {[
              {icon:"👥",label:"Total Members",val:"18",sub:"+2 this month",color:"#7c5cfc"},
              {icon:"🛡️",label:"Admins",val:"4",sub:"22% of team",color:"#3b82f6"},
              {icon:"👤",label:"Members",val:"12",sub:"67% of team",color:"#22c55e"},
              {icon:"👁️",label:"Guests",val:"2",sub:"11% of team",color:"#f97316"},
              {icon:"📈",label:"Active This Month",val:"16",sub:"89% of members",color:"#a78bfa"},
            ].map((s,i)=>(
              <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl text-base" style={{background:`${s.color}20`}}>{s.icon}</div>
                  <p className="text-[10px] text-gray-500 leading-tight">{s.label}</p>
                </div>
                <p className="text-[20px] font-bold text-white leading-none">{s.val}</p>
                <p className="mt-0.5 text-[10px] text-emerald-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Members table */}
          <div className="tm-fade rounded-2xl border border-white/8 bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.15s"}}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3">
              <h3 className="text-[14px] font-bold text-white">All Members</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                  <input type="text" placeholder="Search members..." value={search} onChange={e=>setSearch(e.target.value)}
                    className="tm-search w-[180px] rounded-xl border border-white/10 bg-white/5 py-2 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
                </div>
                <button className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-400 hover:text-white">🔽 Filter</button>
                <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white text-sm">⚙️</button>
              </div>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600"
              style={{gridTemplateColumns:"1.5fr 100px 120px 130px 150px 80px 60px"}}>
              <span>Member</span><span>Role</span><span>Team</span><span>Permissions</span><span>Last Active</span><span>Status</span><span>Actions</span>
            </div>
            {filtered.map((m,i)=>(
              <div key={i} className="tm-row grid items-center px-5 py-3" style={{gridTemplateColumns:"1.5fr 100px 120px 130px 150px 80px 60px"}}>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{background:`hsl(${m.name.charCodeAt(0)*7%360},60%,40%)`}}>
                    {m.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-semibold text-white">{m.name}</p>
                      {m.you && <span className="rounded-full bg-[#7c5cfc]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#a78bfa]">You</span>}
                    </div>
                    <p className="text-[10px] text-gray-600">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] text-gray-300">{m.role}</span>
                  <span className="text-gray-600 text-xs">▾</span>
                </div>
                <span className="text-[11px] text-gray-400">{m.team}</span>
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold" style={{background:`${m.permColor}20`,color:m.permColor}}>{m.perm}</span>
                <span className="text-[11px] text-gray-500">{m.lastActive}</span>
                <div className="flex items-center gap-1">
                  <div className={`h-1.5 w-1.5 rounded-full ${m.status==="Active"?"bg-emerald-400":"bg-yellow-400"}`}/>
                  <span className={`text-[10px] font-medium ${m.status==="Active"?"text-emerald-400":"text-yellow-400"}`}>{m.status}</span>
                </div>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
              <span className="text-[11px] text-gray-500">Showing 1 to {filtered.length} of 18 members</span>
              <div className="flex gap-1">
                {["‹",1,2,3,"›"].map((p,i)=>(
                  <button key={i} className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] transition-all ${p===1?"bg-[#7c5cfc] text-white font-bold":"border border-white/10 text-gray-400 hover:text-white"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Workspace Permissions */}
          <div className="tm-fade mt-4 rounded-2xl border border-white/8 bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <h3 className="mb-1 text-[14px] font-bold text-white">Workspace Permissions Overview</h3>
            <p className="mb-4 text-[12px] text-gray-500">Review what different roles can access and manage.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="pb-2 text-left font-semibold text-gray-500 pr-4">Role</th>
                    {["Create AI Employees","Edit Automations","Access Analytics","Manage Billing","Manage Integrations","Export Data","Workspace Settings"].map(h=>(
                      <th key={h} className="pb-2 text-center font-semibold text-gray-500 px-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {role:"Owner",vals:[1,1,1,1,1,1,1]},
                    {role:"Admin",vals:[1,1,1,1,1,1,0]},
                    {role:"Member",vals:[1,1,1,0,0,0,0]},
                    {role:"Guest",vals:[0,0,0,0,0,0,0]},
                  ].map((r,ri)=>(
                    <tr key={ri} className="border-b border-white/5">
                      <td className="py-2.5 pr-4 font-semibold text-white">{r.role}</td>
                      {r.vals.map((v,vi)=>(
                        <td key={vi} className="py-2.5 px-2 text-center">
                          <span className={`text-base ${v?"text-emerald-400":"text-gray-700"}`}>{v?"✓":"○"}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[220px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-4">
          {/* Roles donut */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Roles Overview</p>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <svg viewBox="0 0 80 80" className="h-[80px] w-[80px] -rotate-90">
                  {[{p:5.6,c:"#7c5cfc"},{p:22.2,c:"#3b82f6"},{p:50,c:"#22c55e"},{p:11.1,c:"#f97316"},{p:11.1,c:"#6b7280"}].reduce((acc,s,i,arr)=>{
                    const r=30,circ=2*Math.PI*r,dash=(s.p/100)*circ,offset=circ-acc.cum;
                    acc.elements.push(<circle key={i} cx="40" cy="40" r={r} fill="none" stroke={s.c} strokeWidth="16" strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={offset}/>);
                    acc.cum-=dash;return acc;
                  },{elements:[] as any[],cum:2*Math.PI*30}).elements}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[13px] font-bold text-white">18</span>
                  <span className="text-[9px] text-gray-500">Total</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {[{l:"Owner",v:1,c:"#7c5cfc"},{l:"Admin",v:4,c:"#3b82f6"},{l:"Member",v:9,c:"#22c55e"},{l:"Guest",v:2,c:"#f97316"}].map(s=>(
                  <div key={s.l} className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full flex-shrink-0" style={{background:s.c}}/>
                    <span className="text-[10px] text-gray-400 w-12">{s.l}</span>
                    <span className="text-[10px] font-bold text-white">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Teams */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Teams Overview</p>
            </div>
            {teams.map((t,i)=>(
              <div key={i} className="mb-2 flex items-center justify-between rounded-xl bg-white/4 px-3 py-2 border border-white/6">
                <div className="flex items-center gap-2"><span className="text-sm">👥</span><span className="text-[11px] font-medium text-white">{t.name}</span></div>
                <span className="text-[10px] text-gray-500">{t.count} members</span>
              </div>
            ))}
            <button className="mt-1 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage Teams</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Recent Activity */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Recent Activity</p>
              <button className="text-[11px] text-[#a78bfa] hover:text-[#c4b5fd]">View all</button>
            </div>
            {[
              {icon:"👥",text:"Ali Rezaei was promoted to Admin",time:"Today, 9:15 AM"},
              {icon:"✉️",text:"Taha Yousefi was invited to the team",time:"May 10, 3:40 PM"},
              {icon:"🛡️",text:"Neda Farahani updated permissions",time:"May 9, 11:20 AM"},
              {icon:"👤",text:"Sara Ahmadi joined the team",time:"May 8, 2:10 PM"},
            ].map((a,i)=>(
              <div key={i} className="mb-2 flex items-start gap-2">
                <span className="text-base flex-shrink-0">{a.icon}</span>
                <div><p className="text-[11px] text-gray-300 leading-snug">{a.text}</p><p className="text-[10px] text-gray-600">{a.time}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsTeamMembers;
