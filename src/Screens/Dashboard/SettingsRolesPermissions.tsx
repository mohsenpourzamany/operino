import React, { useState } from "react";

const roles = [
  { icon:"👑", name:"Owner", badge:"System", desc:"Full access to all features", type:"System", users:1, userPct:"1 user", description:"Owners have full access to all features and settings including billing, integrations, and member management.", updated:"May 15, 2024 10:30 AM", color:"#f97316" },
  { icon:"🛡️", name:"Admin", badge:"System", desc:"Manage workspace", type:"System", users:4, userPct:"4 users", description:"Manage members, roles, AI Employees, and most workspace settings.", updated:"May 15, 2024 10:30 AM", color:"#3b82f6" },
  { icon:"👤", name:"Member", badge:"System", desc:"Standard access", type:"System", users:9, userPct:"9 users", description:"Access conversations, AI Employees, and view analytics.", updated:"May 15, 2024 10:30 AM", color:"#22c55e" },
  { icon:"🎧", name:"Support Agent", badge:"Custom", desc:"Customer support access", type:"Custom", users:3, userPct:"3 users", description:"Access to conversations, create responses, and manage tickets.", updated:"May 14, 2024 02:15 PM", color:"#a78bfa" },
  { icon:"📊", name:"Analyst", badge:"Custom", desc:"Analytics and reports access", type:"Custom", users:2, userPct:"2 users", description:"View analytics, reports, and export data. No access to conversations.", updated:"May 13, 2024 11:45 AM", color:"#7c5cfc" },
];

const permMatrix = [
  { group:"Conversations", desc:"Access and manage conversations", vals:["full","full","full","full","none"] },
  { group:"AI Employees", desc:"Create and manage AI Employees", vals:["full","full","full","limited","none"] },
  { group:"Automations", desc:"Create and manage automations", vals:["full","full","limited","limited","none"] },
  { group:"Analytics & Reports", desc:"View analytics and export reports", vals:["full","full","full","limited","full"] },
  { group:"Integrations", desc:"Manage integrations and connections", vals:["full","full","limited","none","none"] },
  { group:"Billing & Subscription", desc:"Manage billing and subscription", vals:["full","limited","none","none","none"] },
];

const SettingsRolesPermissions: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState(0);
  const [activeTab, setActiveTab] = useState("All Roles");
  const [search, setSearch] = useState("");
  const role = roles[selectedRole];

  const AccessIcon: React.FC<{type:string}> = ({type}) => {
    if(type==="full") return <span className="text-emerald-400 text-base">✓</span>;
    if(type==="limited") return <span className="text-yellow-400 text-base">◑</span>;
    return <span className="text-gray-700 text-base">○</span>;
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .rp-fade{animation:fadeUp 0.5s ease forwards;}
        .role-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;cursor:pointer;}
        .role-row:hover{background:rgba(124,92,252,0.06);}
        .role-row.rp-selected{background:rgba(124,92,252,0.1);}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease;}
        .stat-card:hover{transform:translateY(-2px);border-color:rgba(124,92,252,0.3);}
        .rp-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .rp-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .rp-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .rp-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .rp-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* Header */}
          <div className="rp-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Roles & Permissions</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Create and manage roles. Customize permissions to control access across Operino.</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">⚙️ Permissions Settings</button>
              <button className="rp-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">+ Create Role</button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="rp-fade mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4" style={{animationDelay:"0.05s"}}>
            {[{icon:"👥",l:"Total Roles",v:"5",sub:"Manage roles and access levels",c:"#7c5cfc"},{icon:"🛡️",l:"Custom Permissions",v:"32",sub:"Customized permission rules",c:"#3b82f6"},{icon:"👤",l:"Users with Roles",v:"18",sub:"Across all roles",c:"#22c55e"},{icon:"🔒",l:"Permission Groups",v:"6",sub:"Functional permission groups",c:"#f97316"}].map((s,i)=>(
              <div key={i} className="stat-card rounded-2xl bg-[#0d0b1f] p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl" style={{background:`${s.c}20`}}>{s.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500">{s.l}</p>
                    <p className="text-[20px] font-bold text-white leading-none">{s.v}</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Roles table */}
          <div className="rp-fade rounded-2xl border border-white/8 bg-[#0d0b1f] overflow-hidden mb-4" style={{animationDelay:"0.1s"}}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-3">
              <div className="flex gap-1 rounded-xl bg-white/5 p-1">
                {["All Roles","System Roles","Custom Roles"].map(t=>(
                  <button key={t} onClick={()=>setActiveTab(t)}
                    className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${activeTab===t?"bg-[#7c5cfc] text-white":"text-gray-400 hover:text-white"}`}>{t}</button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                  <input type="text" placeholder="Search roles..." value={search} onChange={e=>setSearch(e.target.value)}
                    className="rp-search w-[160px] rounded-xl border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
                </div>
                <button className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 hover:text-white">🔽 Filter</button>
              </div>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600"
              style={{gridTemplateColumns:"1.5fr 80px 80px 1.5fr 150px 60px"}}>
              <span>Role</span><span>Users</span><span>Type</span><span>Description</span><span>Last Updated</span><span>Actions</span>
            </div>
            {roles.filter(r=>!search||r.name.toLowerCase().includes(search.toLowerCase())).filter(r=>activeTab==="All Roles"||(activeTab==="System Roles"&&r.type==="System")||(activeTab==="Custom Roles"&&r.type==="Custom")).map((r,i)=>(
              <div key={i} onClick={()=>setSelectedRole(roles.indexOf(r))}
                className={`role-row grid items-center px-5 py-3 ${selectedRole===roles.indexOf(r)?"rp-selected":""}`}
                style={{gridTemplateColumns:"1.5fr 80px 80px 1.5fr 150px 60px"}}>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl" style={{background:`${r.color}20`}}>{r.icon}</div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] font-bold text-white">{r.name}</p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${r.badge==="System"?"bg-[#7c5cfc]/20 text-[#a78bfa]":"bg-emerald-500/15 text-emerald-400"}`}>{r.badge}</span>
                    </div>
                    <p className="text-[10px] text-gray-500">{r.desc}</p>
                  </div>
                </div>
                <div className="flex -space-x-1">
                  {[...Array(Math.min(r.users,3))].map((_,j)=>(
                    <div key={j} className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7c5cfc]/30 text-[9px] font-bold text-white ring-2 ring-[#0d0b1f]">
                      {String.fromCharCode(65+j)}
                    </div>
                  ))}
                  {r.users>3&&<div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[9px] text-gray-400 ring-2 ring-[#0d0b1f]">+{r.users-3}</div>}
                  <span className="ml-2 text-[11px] text-gray-400">{r.users}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.type==="System"?"bg-[#7c5cfc]/15 text-[#a78bfa]":"bg-emerald-500/15 text-emerald-400"}`}>{r.type}</span>
                <p className="text-[11px] text-gray-400 truncate pr-4">{r.description}</p>
                <span className="text-[10px] text-gray-600">{r.updated}</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-2.5">
              <span className="text-[11px] text-gray-500">Showing 1 to 5 of 5 roles</span>
              <div className="flex gap-1">
                {["‹",1,"›"].map((p,i)=>(
                  <button key={i} className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] ${p===1?"bg-[#7c5cfc] text-white font-bold":"border border-white/10 text-gray-400 hover:text-white"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="rp-fade rounded-2xl border border-white/8 bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h3 className="mb-1 text-[14px] font-bold text-white">Permission Matrix</h3>
            <p className="mb-4 text-[12px] text-gray-500">Overview of what each role can access.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="pb-2 text-left font-semibold text-gray-500 pr-4 w-48">Permission Groups</th>
                    {roles.map(r=><th key={r.name} className="pb-2 text-center font-semibold text-gray-400 px-3">{r.name}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {permMatrix.map((row,i)=>(
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2.5 pr-4">
                        <p className="font-semibold text-white">{row.group}</p>
                        <p className="text-[10px] text-gray-600">{row.desc}</p>
                      </td>
                      {row.vals.map((v,vi)=>(
                        <td key={vi} className="py-2.5 px-3 text-center">
                          {v==="full"?<span className="text-emerald-400 text-base">✓</span>:v==="limited"?<span className="text-yellow-400 text-base">◑</span>:<span className="text-gray-700 text-base">○</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 flex items-center gap-4 text-[11px]">
                <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span><span className="text-gray-500">Full Access</span></div>
                <div className="flex items-center gap-1.5"><span className="text-yellow-400">◑</span><span className="text-gray-500">Limited Access</span></div>
                <div className="flex items-center gap-1.5"><span className="text-gray-700">○</span><span className="text-gray-500">No Access</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — Role Details */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-4">
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Role Details</p>
            <p className="mb-3 text-[11px] text-gray-500">View and edit role details and permissions.</p>
            <div className="rounded-xl border border-white/8 bg-white/4 p-3 mb-3">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl text-xl" style={{background:`${role.color}20`}}>{role.icon}</div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-bold text-white">{role.name}</p>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${role.badge==="System"?"bg-[#7c5cfc]/20 text-[#a78bfa]":"bg-emerald-500/15 text-emerald-400"}`}>{role.badge} Role</span>
                  </div>
                  <p className="text-[10px] text-gray-500">{role.desc}</p>
                </div>
              </div>
              <p className="mb-2 text-[11px] font-semibold text-gray-400">Description</p>
              <p className="text-[11px] leading-relaxed text-gray-500">{role.description}</p>
              <div className="mt-3">
                <p className="mb-1.5 text-[11px] font-semibold text-gray-400">Users with this role</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_,i)=>(
                      <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc]/30 text-[10px] font-bold text-white ring-2 ring-[#08060f]">{String.fromCharCode(65+i)}</div>
                    ))}
                  </div>
                  <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all ({role.users})</button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Permissions Overview</p>
            <p className="mb-2 text-[11px] text-gray-500">This role has access to:</p>
            {["Conversations","AI Employees","Automations","Analytics","Integrations","Settings","Billing & Subscription"].map((p,i)=>(
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5">
                <span className="text-[11px] text-gray-400">{p}</span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-semibold text-emerald-400">Full Access</span>
                  <span className="text-gray-600 text-xs">›</span>
                </div>
              </div>
            ))}
            <button className="mt-3 w-full rounded-xl border border-[#7c5cfc]/30 py-2 text-[12px] font-semibold text-[#a78bfa] hover:border-[#7c5cfc]/60 transition-all">
              Edit Permissions
            </button>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Learn more about roles and permissions.</p>
            <button className="mb-1.5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white transition-all">📖 View Documentation</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[11px] text-gray-300 hover:text-white transition-all">🎧 Contact Support</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsRolesPermissions;
