import React, { useState } from "react";

const apiKeys = [
  { name:"Production Key", key:"op_live_••••••••••••••••a1b2c3d4", created:"May 10, 2024", lastUsed:"May 15, 2024\n10:24 PM", status:"Active", primary:true },
  { name:"Development Key", key:"op_live_••••••••••••••••e5f6g7h8", created:"Apr 28, 2024", lastUsed:"May 14, 2024\n03:42 PM", status:"Active" },
  { name:"Analytics Integration", key:"op_live_••••••••••••••••i9j0k1l2", created:"Apr 12, 2024", lastUsed:"May 1, 2024\n11:15 AM", status:"inactive" },
];

const endpoints = [
  { path:"/conversations", method:"GET", desc:"Retrieve a list of conversations", auth:"API Key" },
  { path:"/conversations", method:"POST", desc:"Create a new conversation", auth:"API Key" },
  { path:"/messages", method:"GET", desc:"Retrieve messages in a conversation", auth:"API Key" },
  { path:"/messages", method:"POST", desc:"Send a message", auth:"API Key" },
  { path:"/employees", method:"GET", desc:"Retrieve your AI employees", auth:"API Key" },
];

const webhooks = [
  { name:"CRM Sync", url:"https://crm.example.com/webhook", events:3, status:"Active" },
  { name:"Slack Notifications", url:"https://hooks.slack.com/servic...", events:2, status:"Active" },
  { name:"Analytics Tracker", url:"https://analytics.example.com/hook", events:5, status:"Inactive" },
];

const methodColor: Record<string,{bg:string;text:string}> = {
  GET:{bg:"rgba(34,197,94,0.15)",text:"#22c55e"},
  POST:{bg:"rgba(124,92,252,0.2)",text:"#a78bfa"},
};

const SettingsAPIWebhooks: React.FC = () => {
  const [activeTab,setActiveTab]=useState("API Keys");
  const [copied,setCopied]=useState<number|null>(null);

  const copyKey=(i:number)=>{ setCopied(i); setTimeout(()=>setCopied(null),2000); };

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .aw-fade{animation:fadeUp 0.5s ease forwards;}
        .aw-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .aw-card:hover{border-color:rgba(124,92,252,0.2);}
        .key-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .key-row:hover{background:rgba(124,92,252,0.04);}
        .ep-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .ep-row:hover{background:rgba(124,92,252,0.04);}
        .wh-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .wh-row:hover{background:rgba(124,92,252,0.04);}
        .aw-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .aw-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .aw-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .aw-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .doc-card{border:1px solid rgba(255,255,255,0.06);transition:border-color 0.2s ease,background 0.2s ease;cursor:pointer;}
        .doc-card:hover{border-color:rgba(124,92,252,0.35);background:rgba(124,92,252,0.07);}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="aw-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">API & Webhooks</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Build custom integrations and connect Operino with your favorite tools.</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="aw-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["API Keys","Webhooks"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-6 text-[13px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* API Keys table */}
          <div className="aw-fade aw-card mb-4 rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.1s"}}>
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <div><h2 className="text-[14px] font-bold text-white">API Keys</h2><p className="text-[11px] text-gray-500">Use API keys to authenticate your requests to the Operino API.</p></div>
              <button className="aw-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-4 py-2 text-[12px] font-bold text-white">+ Create API Key</button>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"1fr 1.5fr 100px 140px 80px 60px"}}>
              <span>Name</span><span>Key</span><span>Created</span><span>Last Used</span><span>Status</span><span>Actions</span>
            </div>
            {apiKeys.map((k,i)=>(
              <div key={i} className="key-row grid items-center px-5 py-3" style={{gridTemplateColumns:"1fr 1.5fr 100px 140px 80px 60px"}}>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-white">{k.name}</span>
                  {k.primary&&<span className="rounded-full bg-[#7c5cfc]/20 px-2 py-0.5 text-[9px] font-bold text-[#a78bfa]">Primary</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-gray-400">{k.key}</span>
                  <button onClick={()=>copyKey(i)} className="text-gray-500 hover:text-white transition-colors text-sm">{copied===i?"✓":"👁️"}</button>
                </div>
                <span className="text-[11px] text-gray-500">{k.created}</span>
                <span className="whitespace-pre text-[11px] text-gray-500">{k.lastUsed}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold w-fit ${k.status==="Active"?"bg-emerald-500/15 text-emerald-400":"bg-gray-500/15 text-gray-500"}`}>{k.status}</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            ))}
            <div className="border-t border-white/8 px-5 py-3">
              <div className="flex items-center gap-2 text-[11px] text-gray-500"><span>🔒</span><span>API keys are secret. Make sure to keep them secure and never share them in public places.</span></div>
            </div>
          </div>

          {/* API Documentation */}
          <div className="aw-fade aw-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <div className="mb-4 flex items-center justify-between">
              <div><h2 className="text-[14px] font-bold text-white">API Documentation</h2><p className="text-[11px] text-gray-500">Learn how to use the Operino API with our comprehensive documentation.</p></div>
              <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View full documentation →</button>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[{icon:"🔑",title:"Introduction",desc:"Learn the basics of the Operino API."},{icon:"🔐",title:"Authentication",desc:"Authentication methods and API keys."},{icon:"📡",title:"API Reference",desc:"Explore endpoints and resources."},{icon:"🛠️",title:"SDKs & Libraries",desc:"Official SDKs for popular languages."}].map((d,i)=>(
                <div key={i} className="doc-card rounded-xl p-3 bg-white/3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base mb-2">{d.icon}</div>
                  <p className="text-[12px] font-bold text-white">{d.title}</p>
                  <p className="mt-0.5 text-[10px] text-gray-500">{d.desc}</p>
                  <button className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">Read more →</button>
                </div>
              ))}
            </div>
          </div>

          {/* API Endpoints */}
          <div className="aw-fade aw-card rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.2s"}}>
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <div>
                <h2 className="text-[14px] font-bold text-white">API Endpoints</h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-gray-500">Base URL:</span>
                  <span className="font-mono text-[11px] text-[#a78bfa] bg-[#7c5cfc]/10 px-2 py-0.5 rounded-lg">https://api.operino.ai/v1</span>
                  <button className="text-gray-500 hover:text-white transition-colors text-sm">📋</button>
                </div>
              </div>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"1fr 60px 1fr 80px"}}>
              <span>Endpoint</span><span>Method</span><span>Description</span><span>Auth</span>
            </div>
            {endpoints.map((e,i)=>(
              <div key={i} className="ep-row grid items-center px-5 py-2.5" style={{gridTemplateColumns:"1fr 60px 1fr 80px"}}>
                <span className="font-mono text-[12px] text-white">{e.path}</span>
                <span className="rounded-md px-1.5 py-0.5 text-[10px] font-bold w-fit" style={{background:methodColor[e.method]?.bg,color:methodColor[e.method]?.text}}>{e.method}</span>
                <span className="text-[11px] text-gray-400">{e.desc}</span>
                <span className="text-[11px] text-gray-500">{e.auth}</span>
              </div>
            ))}
            <button className="flex w-full items-center justify-center gap-1.5 border-t border-white/8 py-3 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all endpoints →</button>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Rate Limits */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Rate Limits</p>
            <p className="mb-3 text-[11px] text-gray-500">API requests are limited based on your plan.</p>
            {[{l:"Requests",v:"128K / 500K",pct:26},{l:"Conversations",v:"18,732 / 50,000",pct:37},{l:"AI Employees",v:"8 / Unlimited",pct:100,unlim:true}].map((r,i)=>(
              <div key={i} className="mb-3">
                <div className="flex items-center justify-between mb-1"><span className="text-[11px] text-gray-400">{r.l}</span><span className="text-[11px] font-semibold text-white">{r.unlim?"Unlimited":r.v}</span></div>
                {!r.unlim&&<div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#7c5cfc] to-[#a78bfa]" style={{width:`${r.pct}%`}}/></div>}
                {r.unlim&&<div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" style={{width:"100%"}}/></div>}
              </div>
            ))}
            <p className="text-[10px] text-gray-600">Limits reset in 23 days (Jun 15, 2024)</p>
            <button className="mt-1.5 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View usage & limits →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Webhooks */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Webhooks</p>
              <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">+ Add Webhook</button>
            </div>
            <p className="mb-3 text-[11px] text-gray-500">Real-time notifications for events in your workspace.</p>
            <div className="grid grid-cols-[1fr_40px_60px_24px] gap-1 border-b border-white/8 pb-1 text-[9px] font-semibold text-gray-600 mb-1">
              <span>Name</span><span>URL</span><span>Events</span><span>Status</span>
            </div>
            {webhooks.map((w,i)=>(
              <div key={i} className="wh-row grid items-center gap-1 py-2" style={{gridTemplateColumns:"1fr 40px 60px 24px"}}>
                <span className="text-[11px] font-semibold text-white">{w.name}</span>
                <span className="text-[9px] text-gray-600 truncate">{w.url.slice(0,12)}...</span>
                <span className="text-[10px] text-gray-400">{w.events} events</span>
                <span className={`text-[9px] font-bold ${w.status==="Active"?"text-emerald-400":"text-gray-500"}`}>{w.status}</span>
              </div>
            ))}
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all webhooks →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Webhook Events */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Webhook Events</p>
            <p className="mb-2 text-[11px] text-gray-500">Available events you can subscribe to.</p>
            {[{icon:"💬",e:"conversation.created",d:"Triggered when a new conversation is created"},{icon:"✉️",e:"message.sent",d:"Triggered when a message is sent"},{icon:"🤖",e:"employee.updated",d:"Triggered when an AI employee is updated"},{icon:"⚡",e:"automation.executed",d:"Triggered when an automation is executed"}].map((ev,i)=>(
              <div key={i} className="mb-2 flex items-start gap-2">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-sm">{ev.icon}</div>
                <div><p className="text-[10px] font-mono font-semibold text-[#a78bfa]">{ev.e}</p><p className="text-[9px] text-gray-600">{ev.d}</p></div>
              </div>
            ))}
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View all events →</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsAPIWebhooks;
