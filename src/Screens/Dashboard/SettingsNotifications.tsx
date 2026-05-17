import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void;small?:boolean}> = ({on,onChange,small}) => (
  <button onClick={onChange} className={`relative rounded-full transition-all duration-300 flex-shrink-0 ${small?"h-5 w-9":"h-6 w-11"} ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 rounded-full bg-white shadow transition-all duration-300 ${small?"h-4 w-4":"h-5 w-5"} ${on?(small?"left-4":"left-5"):"left-0.5"}`}/>
  </button>
);

const Select: React.FC<{value:string;options:string[];onChange:(v:string)=>void}> = ({value,options,onChange}) => {
  const [open,setOpen]=useState(false);
  return (
    <div className="relative">
      <button onClick={()=>setOpen(o=>!o)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white hover:border-[#7c5cfc]/40 transition-all">
        <span>{value}</span><span className="text-gray-500 text-xs ml-2">▾</span>
      </button>
      {open&&(<div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
        {options.map(o=><div key={o} onClick={()=>{onChange(o);setOpen(false);}} className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value===o?"text-[#a78bfa] font-semibold":"text-gray-400"}`}>{o}</div>)}
      </div>)}
    </div>
  );
};

const notifTypes = [
  {icon:"💬",label:"Conversations",desc:"New messages, replies, and mentions.",inApp:true,email:true,push:true},
  {icon:"🤖",label:"AI Employees",desc:"Status changes, errors, and important updates.",inApp:true,email:true,push:false},
  {icon:"⚡",label:"Automations",desc:"Execution results, failures, and throttling alerts.",inApp:true,email:true,push:false},
  {icon:"📊",label:"Analytics",desc:"Weekly reports and significant changes.",inApp:true,email:false,push:false},
  {icon:"🔗",label:"Integrations",desc:"Connection issues and sync updates.",inApp:true,email:true,push:false},
  {icon:"📚",label:"Knowledge Base",desc:"Article updates, suggestions, and feedback.",inApp:false,email:true,push:false},
  {icon:"🛡️",label:"Security & Alerts",desc:"Login alerts, security events, and warnings.",inApp:true,email:true,push:true},
  {icon:"💳",label:"Billing & Subscription",desc:"Invoices, payment updates, and plan changes.",inApp:true,email:true,push:false},
];

const SettingsNotifications: React.FC = () => {
  const [activeTab,setActiveTab]=useState("Notification Preferences");
  const [toggles,setToggles]=useState(notifTypes.map(n=>({inApp:n.inApp,email:n.email,push:n.push})));
  const [dnd,setDnd]=useState(false);
  const [dndPeriod,setDndPeriod]=useState("Everyday");
  const [emailFreq,setEmailFreq]=useState("Send emails as they happen");

  const setToggle=(i:number,key:"inApp"|"email"|"push",v:boolean)=>{
    setToggles(prev=>{const n=[...prev];n[i]={...n[i],[key]:v};return n;});
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .sn-fade{animation:fadeUp 0.5s ease forwards;}
        .sn-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .sn-card:hover{border-color:rgba(124,92,252,0.2);}
        .notif-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .notif-row:hover{background:rgba(124,92,252,0.04);}
        .period-btn{transition:background 0.2s ease,color 0.2s ease,border-color 0.2s ease;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="sn-fade mb-5">
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Notifications</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">Manage how and when you receive notifications from Operino.</p>
          </div>

          <div className="sn-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["Notification Preferences","Channels","Quiet Hours","Digest Settings"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Notification Preferences table */}
          <div className="sn-fade sn-card mb-4 rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.1s"}}>
            <div className="border-b border-white/8 px-5 py-3">
              <h2 className="text-[14px] font-bold text-white">Notification Preferences</h2>
              <p className="text-[11px] text-gray-500">Choose what you want to be notified about.</p>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-500" style={{gridTemplateColumns:"1fr 80px 80px 80px"}}>
              <span>Notification Type</span>
              <span className="text-center">In-App</span>
              <span className="text-center">Email</span>
              <span className="text-center">Push</span>
            </div>
            {notifTypes.map((n,i)=>(
              <div key={i} className="notif-row grid items-center px-5 py-3" style={{gridTemplateColumns:"1fr 80px 80px 80px"}}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-base">{n.icon}</div>
                  <div><p className="text-[12px] font-semibold text-white">{n.label}</p><p className="text-[10px] text-gray-500">{n.desc}</p></div>
                </div>
                <div className="flex justify-center"><Toggle on={toggles[i].inApp} onChange={()=>setToggle(i,"inApp",!toggles[i].inApp)} small/></div>
                <div className="flex justify-center"><Toggle on={toggles[i].email} onChange={()=>setToggle(i,"email",!toggles[i].email)} small/></div>
                <div className="flex justify-center"><Toggle on={toggles[i].push} onChange={()=>setToggle(i,"push",!toggles[i].push)} small/></div>
              </div>
            ))}
          </div>

          {/* Important Notifications */}
          <div className="sn-fade sn-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Important Notifications</h2>
            <p className="mb-4 text-[11px] text-gray-500">Critical notifications that are always enabled.</p>
            {[
              {label:"Security alerts and suspicious activities",desc:"We'll always notify you about important security events."},
              {label:"Subscription and billing updates",desc:"We'll always notify you about billing and subscription changes."},
              {label:"System announcements",desc:"We'll always notify you about important system updates."},
            ].map((n,i)=>(
              <div key={i} className="flex items-start justify-between border-b border-white/5 py-3 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">🔒</div>
                  <div><p className="text-[12px] font-semibold text-white">{n.label}</p><p className="text-[10px] text-gray-500">{n.desc}</p></div>
                </div>
                <span className="flex-shrink-0 text-[11px] font-semibold text-emerald-400 ml-4">Always on</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Summary */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Notification Summary</p>
            <p className="mb-3 text-[11px] text-gray-500">Here's how you'll receive notifications.</p>
            {[{icon:"💬",label:"In-App Notifications",count:"6 enabled",color:"#22c55e"},{icon:"✉️",label:"Email Notifications",count:"7 enabled",color:"#22c55e"},{icon:"🔔",label:"Push Notifications",count:"2 enabled",color:"#22c55e"}].map((s,i)=>(
              <div key={i} className="mb-2 flex items-center justify-between rounded-xl bg-white/4 px-3 py-2 border border-white/6">
                <div className="flex items-center gap-2"><span className="text-base">{s.icon}</span><span className="text-[11px] text-gray-300">{s.label}</span></div>
                <span className="text-[10px] font-semibold" style={{color:s.color}}>{s.count}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/3 px-3 py-2.5 cursor-pointer hover:bg-white/6 transition-all">
              <span className="text-base">🚀</span>
              <div><p className="text-[11px] font-semibold text-white">Test Notification</p><p className="text-[10px] text-gray-500">Send a test to your channels</p></div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Email Settings */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Email Settings</p>
            <p className="mb-3 text-[11px] text-gray-500">Manage your email notification preferences.</p>
            <div className="mb-3">
              <p className="mb-1 text-[11px] text-gray-400">Email address</p>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <span className="text-[11px] text-gray-300">Mohsen@example.com</span>
                <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Change</button>
              </div>
            </div>
            <div>
              <p className="mb-1 text-[11px] text-gray-400">Email frequency</p>
              <Select value={emailFreq} options={["Send emails as they happen","Daily digest","Weekly digest","Never"]} onChange={setEmailFreq}/>
              <p className="mt-1.5 text-[10px] text-gray-600">You'll receive emails right away when events occur.</p>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Do Not Disturb */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div><p className="text-[13px] font-bold text-white">Do Not Disturb</p><p className="text-[11px] text-gray-500">Pause all non-essential notifications.</p></div>
              <Toggle on={dnd} onChange={()=>setDnd(d=>!d)} small/>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div><p className="mb-1 text-[11px] text-gray-500">Start time</p><div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-[11px] text-gray-300"><span>🕐</span>10:00 PM</div></div>
              <div><p className="mb-1 text-[11px] text-gray-500">End time</p><div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-[11px] text-gray-300"><span>🕐</span>07:00 AM</div></div>
            </div>
            <div className="mb-2">
              <p className="mb-1.5 text-[11px] text-gray-500">Time zone</p>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-gray-300">(GMT+03:30) Tehran ▾</div>
            </div>
            <div>
              <p className="mb-1.5 text-[11px] text-gray-500">Applies to</p>
              <div className="flex gap-1">
                {["Everyday","Weekdays","Weekends","Custom"].map(p=>(
                  <button key={p} onClick={()=>setDndPeriod(p)}
                    className={`period-btn flex-1 rounded-lg py-1.5 text-[10px] font-semibold border ${dndPeriod===p?"border-[#7c5cfc] bg-[#7c5cfc] text-white":"border-white/12 bg-white/4 text-gray-400 hover:text-white"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Learn more about notifications.</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/4 py-2 text-[10px] text-gray-300 hover:text-white transition-all">📖 View Docs</button>
              <button className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/4 py-2 text-[10px] text-gray-300 hover:text-white transition-all">🎧 Contact</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsNotifications;
