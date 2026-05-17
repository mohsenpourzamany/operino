import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
  </button>
);

const devices = [
  { icon:"💻", name:"MacBook Pro 16\"", detail:"Tehran, Iran • Chrome on macOS", time:"Active now", current:true },
  { icon:"📱", name:"iPhone 14 Pro",    detail:"Tehran, Iran • Safari on iOS",   time:"May 13, 2024, 10:24 PM" },
  { icon:"🖥️", name:"Windows PC",       detail:"Tehran, Iran • Chrome on Windows",time:"May 10, 2024, 04:15 PM" },
];

const activity = [
  { icon:"🔓", label:"Successful login",  sub:"Tehran, Iran • Chrome on macOS", date:"May 15, 2024", time:"10:30 PM", color:"#22c55e" },
  { icon:"🔑", label:"Password changed",  sub:"Tehran, Iran",                    date:"May 12, 2024", time:"11:20 AM", color:"#f97316" },
  { icon:"🛡️", label:"2FA enabled",       sub:"Tehran, Iran",                    date:"May 5, 2024",  time:"09:15 PM", color:"#7c5cfc" },
  { icon:"📱", label:"New device login",  sub:"Tehran, Iran • iOS",              date:"May 1, 2024",  time:"08:45 PM", color:"#3b82f6" },
];

const SettingsSecurity: React.FC = () => {
  const [loginNotif, setLoginNotif] = useState(true);
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .ss-fade{animation:fadeUp 0.5s ease forwards;}
        .ss-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .ss-card:hover{border-color:rgba(124,92,252,0.2);}
        .dev-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .dev-row:hover{background:rgba(124,92,252,0.04);}
        .act-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .act-row:hover{background:rgba(124,92,252,0.04);}
        .ss-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease,background 0.2s ease;}
        .ss-btn:hover{transform:translateY(-2px);}
        @keyframes scoreGlow{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.2);}50%{box-shadow:0 0 0 8px rgba(34,197,94,0);}}
        .score-ring{animation:scoreGlow 3s ease-in-out infinite;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="ss-fade mb-5">
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Security</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">Manage your account security settings and monitor important activity.</p>
          </div>

          {/* Overview cards */}
          <div className="ss-fade mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4" style={{animationDelay:"0.05s"}}>
            {[
              {icon:"🛡️",label:"Two-Factor Auth",desc:"Keep your account protected with 2FA.",val:"Enabled",valColor:"#22c55e"},
              {icon:"🔑",label:"Password",desc:"Use a strong password to keep your account safe.",val:"Strong",valColor:"#22c55e"},
              {icon:"🖥️",label:"Active Sessions",desc:"You're currently active on 2 devices.",val:"2 active",valColor:"#a78bfa"},
              {icon:"📱",label:"Trusted Devices",desc:"Manage devices that can access your account.",val:"3 devices",valColor:"#3b82f6"},
            ].map((s,i)=>(
              <div key={i} className="ss-card rounded-2xl bg-[#0d0b1f] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-xl mb-3">{s.icon}</div>
                <p className="text-[12px] font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-gray-500 leading-snug">{s.desc}</p>
                <p className="mt-2 text-[12px] font-semibold" style={{color:s.valColor}}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* 2FA */}
          <div className="ss-fade ss-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🛡️</div>
                <div>
                  <p className="text-[14px] font-bold text-white">Two-Factor Authentication (2FA)</p>
                  <p className="mt-0.5 text-[12px] text-gray-500">Add an extra layer of security to your account.</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">Status</span>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">Enabled</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">You're using authentication app to generate verification codes.</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="ss-btn rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">Manage</button>
                <button className="ss-btn rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">View Recovery Codes</button>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="ss-fade ss-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.13s"}}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🔑</div>
                <div>
                  <p className="text-[14px] font-bold text-white">Password</p>
                  <p className="mt-0.5 text-[12px] text-gray-500">Update your password regularly to keep your account secure.</p>
                  <p className="mt-1.5 text-[11px] text-gray-500">Last changed <span className="text-white font-semibold">May 12, 2024</span> <span className="text-gray-600">(12 days ago)</span></p>
                </div>
              </div>
              <button className="ss-btn flex-shrink-0 rounded-xl bg-[#7c5cfc]/20 px-4 py-2 text-[12px] font-semibold text-[#a78bfa] hover:bg-[#7c5cfc]/35 transition-all">Change Password</button>
            </div>
          </div>

          {/* Login & Access */}
          <div className="ss-fade ss-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.16s"}}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🔒</div>
              <p className="text-[14px] font-bold text-white">Login & Access</p>
            </div>
            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {[
                {label:"Email",val:"Mohsen@exemple.com",action:<button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">Change</button>},
                {label:"Account Recovery Email",val:"mohsen.backup@example.com",action:<button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">Change</button>},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-[12px] text-gray-400">{r.label}</span>
                  <div className="flex items-center gap-4"><span className="text-[12px] text-white">{r.val}</span>{r.action}</div>
                </div>
              ))}
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[12px] text-gray-400">Login Notifications</p>
                  <p className="text-[11px] text-gray-600">Get notified when a new device signs in to your account.</p>
                </div>
                <Toggle on={loginNotif} onChange={()=>setLoginNotif(l=>!l)}/>
              </div>
            </div>
          </div>

          {/* Trusted Devices */}
          <div className="ss-fade ss-card rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.2s"}}>
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-xl">🖥️</div>
                <div><p className="text-[14px] font-bold text-white">Trusted Devices</p><p className="text-[11px] text-gray-500">These devices have recently accessed your account.</p></div>
              </div>
              <button className="ss-btn rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-[12px] font-semibold text-gray-300 hover:text-white">Manage Devices</button>
            </div>
            {devices.map((d,i)=>(
              <div key={i} className="dev-row flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[12px] font-semibold text-white">{d.name}</p>
                      {d.current&&<span className="rounded-full bg-[#7c5cfc]/20 px-2 py-0.5 text-[9px] font-bold text-[#a78bfa]">Current Device</span>}
                    </div>
                    <p className="text-[11px] text-gray-500">{d.detail}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold ${d.current?"text-emerald-400":"text-gray-500"}`}>{d.time}</span>
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
                </div>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-2 border-t border-white/8 py-3 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
              View all devices ▾
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Security Score */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Security Score</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="score-ring relative flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full border-4 border-emerald-400/30">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-400" style={{clipPath:"inset(0 0 0 0 round 50%)"}}/>
                <span className="text-lg">🛡️</span>
              </div>
              <div>
                <p className="text-[18px] font-bold text-emerald-400">Excellent</p>
                <p className="text-[13px] text-white font-semibold">90 <span className="text-gray-500 text-[11px]">/ 100</span></p>
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10 mb-2">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{width:"90%"}}/>
            </div>
            <p className="mb-3 text-[11px] text-gray-500">Great job! Your account security is in excellent shape.</p>
            {["Two-factor authentication enabled","Strong password","No suspicious login activity","Recovery email is set","Active sessions are monitored"].map((c,i)=>(
              <div key={i} className="mb-1.5 flex items-center gap-2"><span className="text-emerald-400 text-xs">✓</span><span className="text-[11px] text-gray-400">{c}</span></div>
            ))}
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Improve Score</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Recent Activity */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Recent Security Activity</p>
            {activity.map((a,i)=>(
              <div key={i} className="act-row flex items-start gap-2.5 py-2.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-base" style={{background:`${a.color}20`}}>{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white">{a.label}</p>
                  <p className="text-[10px] text-gray-500 truncate">{a.sub}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-[9px] text-gray-600">{a.date}</p>
                  <p className="text-[9px] text-gray-600">{a.time}</p>
                </div>
              </div>
            ))}
            <button className="mt-1 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all activity →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Active Sessions */}
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">Active Sessions</p>
            <p className="mb-3 text-[11px] text-gray-500">You are currently signed in on the following sessions.</p>
            {[
              {label:"Current Session",sub:"MacBook Pro 16\" • Chrome on macOS",loc:"Tehran, Iran",time:"Active now",current:true},
              {label:"iPhone 14 Pro",sub:"Safari on iOS",loc:"Tehran, Iran",time:"1h ago"},
            ].map((s,i)=>(
              <div key={i} className="mb-2 rounded-xl border border-white/6 bg-white/3 p-2.5">
                <div className="flex items-center justify-between">
                  <p className={`text-[11px] font-semibold ${s.current?"text-[#a78bfa]":"text-white"}`}>{s.label}</p>
                  <span className={`text-[9px] font-semibold ${s.current?"text-emerald-400":"text-gray-500"}`}>{s.time}</span>
                </div>
                <p className="text-[10px] text-gray-500">{s.sub}</p>
                <p className="text-[10px] text-gray-600">{s.loc}</p>
              </div>
            ))}
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage all sessions →</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsSecurity;
