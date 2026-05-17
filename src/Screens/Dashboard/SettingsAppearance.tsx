import React, { useState } from "react";

const Toggle: React.FC<{on:boolean;onChange:()=>void}> = ({on,onChange}) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on?"bg-[#7c5cfc]":"bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on?"left-5":"left-0.5"}`}/>
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

const themes = [
  { id:"dark", label:"Dark", desc:"Best for low-light environments", preview:"🌙" },
  { id:"light", label:"Light", desc:"Clean and bright experience", preview:"☀️" },
  { id:"system", label:"System", desc:"Follow system preferences", preview:"💻" },
];

const colorVars = [
  { label:"Primary Color", val:"#7C3AED" },
  { label:"Primary Hover", val:"#6D28D9" },
  { label:"Secondary Color", val:"#3B82F6" },
  { label:"Accent Color", val:"#10B981" },
  { label:"Background", val:"#0B0F19" },
  { label:"Surface", val:"#111827" },
  { label:"Border", val:"#1F2937" },
  { label:"Text", val:"#E5E7EB" },
];

const presets = ["#7c5cfc","#3b82f6","#22c55e","#f97316","#ec4899","#ef4444"];

const SettingsAppearance: React.FC = () => {
  const [activeTab,setActiveTab]=useState("Theme & Colors");
  const [activeTheme,setActiveTheme]=useState("dark");
  const [preset,setPreset]=useState(0);
  const [sidebarStyle,setSidebarStyle]=useState("Standard");
  const [radius,setRadius]=useState("Medium");
  const [toggles,setToggles]=useState([true,true,false,false,true,false]);
  const [saved,setSaved]=useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .ap-fade{animation:fadeUp 0.5s ease forwards;}
        .ap-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .ap-card:hover{border-color:rgba(124,92,252,0.2);}
        .theme-card{border:2px solid rgba(255,255,255,0.07);transition:all 0.22s ease;cursor:pointer;}
        .theme-card:hover{border-color:rgba(124,92,252,0.4);transform:translateY(-2px);}
        .theme-card.theme-active{border-color:#7c5cfc;background:rgba(124,92,252,0.08);}
        .color-swatch{cursor:pointer;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .color-swatch:hover{transform:scale(1.2);}
        .color-swatch.active{ring:2px solid white;transform:scale(1.25);box-shadow:0 0 0 2px white;}
        .save-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .save-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .save-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .save-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
        .check-pop{animation:checkPop 0.4s ease forwards;}
        .code-block{font-family:monospace;font-size:11px;line-height:1.6;}
        .code-keyword{color:#a78bfa;}
        .code-prop{color:#7c5cfc;}
        .code-val{color:#22c55e;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <div className="ap-fade mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Appearance</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Customize the look and feel of Operino to match your brand and preferences.</p>
            </div>
            {saved?(<div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-2.5 text-[13px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">✓ Saved!</div>):(
              <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}} className="save-btn rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-bold text-white">Save Changes</button>
            )}
          </div>

          {/* Sub tabs */}
          <div className="ap-fade mb-5 flex gap-0 border-b border-white/8" style={{animationDelay:"0.05s"}}>
            {["Theme & Colors","Branding","Layout","Typography","Icons & Graphics"].map(t=>(
              <button key={t} onClick={()=>setActiveTab(t)}
                className={`pb-2.5 pr-5 text-[12px] font-semibold border-b-2 transition-all ${activeTab===t?"border-[#7c5cfc] text-white":"border-transparent text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Theme selection */}
          <div className="ap-fade ap-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Theme</h2>
            <p className="mb-4 text-[12px] text-gray-500">Choose your preferred theme for the Operino interface.</p>
            <div className="grid grid-cols-3 gap-3">
              {themes.map(t=>(
                <div key={t.id} onClick={()=>setActiveTheme(t.id)}
                  className={`theme-card relative rounded-2xl p-4 ${activeTheme===t.id?"theme-active":""}`}>
                  {activeTheme===t.id&&<div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#7c5cfc] text-white text-sm">✓</div>}
                  <div className="mb-3 flex h-[80px] items-center justify-center overflow-hidden rounded-xl bg-[#120e2a] text-4xl">{t.preview}</div>
                  <p className="text-[13px] font-bold text-white">{t.label}</p>
                  <p className="text-[11px] text-gray-500">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div className="ap-fade ap-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div><h2 className="text-[14px] font-bold text-white">Color Palette</h2><p className="text-[11px] text-gray-500">Customize the primary colors and accents across the platform.</p></div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-500">Preset Palettes</span>
                <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-300">Operino Purple ▾</div>
                <div className="flex gap-1.5">
                  {presets.map((c,i)=>(
                    <button key={i} onClick={()=>setPreset(i)}
                      className={`color-swatch h-6 w-6 rounded-full transition-all ${preset===i?"ring-2 ring-white ring-offset-1 ring-offset-[#0d0b1f]":""}`}
                      style={{background:c}}/>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {colorVars.map((c,i)=>(
                <div key={i}>
                  <p className="mb-1.5 text-[11px] text-gray-500">{c.label}</p>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <div className="h-5 w-5 rounded-md flex-shrink-0" style={{background:c.val}}/>
                    <span className="text-[11px] font-mono text-gray-300">{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Preferences */}
          <div className="ap-fade ap-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <h2 className="mb-1 text-[14px] font-bold text-white">Other Preferences</h2>
            <p className="mb-4 text-[12px] text-gray-500">Fine-tune additional appearance settings.</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-center justify-between">
                <div><p className="text-[12px] font-semibold text-white">Sidebar Style</p><p className="text-[10px] text-gray-500">Choose the sidebar appearance.</p></div>
                <div className="w-28 flex-shrink-0"><Select value={sidebarStyle} options={["Standard","Compact","Minimal"]} onChange={setSidebarStyle}/></div>
              </div>
              <div className="flex items-center justify-between">
                <div><p className="text-[12px] font-semibold text-white">Radius</p><p className="text-[10px] text-gray-500">Set the border radius for UI elements.</p></div>
                <div className="w-28 flex-shrink-0"><Select value={radius} options={["None","Small","Medium","Large","Full"]} onChange={setRadius}/></div>
              </div>
              {[
                {label:"Glass Effect",desc:"Apply glass effect to cards and surfaces."},
                {label:"Gradient Style",desc:"Apply gradients to buttons and elements."},
                {label:"Reduce Motion",desc:"Minimize animations across the platform."},
                {label:"High Contrast",desc:"Increase contrast for better readability."},
              ].map((s,i)=>(
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-3 py-2.5">
                  <div><p className="text-[12px] font-semibold text-white">{s.label}</p><p className="text-[10px] text-gray-500">{s.desc}</p></div>
                  <Toggle on={toggles[i+2]} onChange={()=>setToggles(t=>{const n=[...t];n[i+2]=!n[i+2];return n;})}/>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[260px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Live Preview */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Live Preview</p>
            <p className="mb-3 text-[11px] text-gray-500">See how your settings look in the platform.</p>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b1f]">
              {/* Mini topbar */}
              <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
                <span className="text-sm">🤖</span>
                <span className="text-[11px] font-bold text-white">Operino</span>
                <span className="ml-auto text-gray-600 text-xs">▾</span>
              </div>
              <div className="flex">
                {/* Mini sidebar */}
                <div className="w-20 border-r border-white/8 px-2 py-2 flex flex-col gap-1">
                  {["🏠","🤖","💬","⚡","📊","🔗"].map((ic,i)=>(
                    <div key={i} className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${i===0?"bg-[#7c5cfc]/20":""}`}>
                      <span className="text-xs">{ic}</span>
                      {i===0&&<span className="text-[9px] text-white font-semibold">Dashboard</span>}
                    </div>
                  ))}
                </div>
                {/* Mini content */}
                <div className="flex-1 p-3">
                  <p className="text-[10px] font-bold text-white mb-2">Dashboard</p>
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="rounded-lg bg-white/5 p-2"><p className="text-[8px] text-gray-500">Conversations</p><p className="text-[11px] font-bold text-white">1,248</p><span className="text-[7px] text-emerald-400">+18%</span></div>
                    <div className="rounded-lg bg-white/5 p-2"><p className="text-[8px] text-gray-500">AI Employees</p><p className="text-[11px] font-bold text-white">8</p><span className="text-[7px] text-emerald-400">+2</span></div>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[8px] text-gray-500 mb-1">Recent Conversations</p>
                    {[1,2,3].map(i=><div key={i} className="flex items-center gap-1.5 py-0.5"><div className="h-3 w-3 rounded-full bg-[#7c5cfc]/30"/><div className="h-1.5 flex-1 rounded-full bg-white/10"/></div>)}
                  </div>
                </div>
                {/* Mini donut */}
                <div className="w-16 flex flex-col items-center justify-center border-l border-white/8 p-2">
                  <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90">
                    <circle cx="20" cy="20" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
                    <circle cx="20" cy="20" r="14" fill="none" stroke="#7c5cfc" strokeWidth="6" strokeDasharray="55 88" strokeDashoffset="0"/>
                  </svg>
                  <p className="text-[8px] text-gray-500 text-center">62% Used</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Custom CSS */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[13px] font-bold text-white">Custom CSS (Advanced)</p>
              <button className="text-[11px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd]">Edit CSS</button>
            </div>
            <p className="mb-2 text-[11px] text-gray-500">Add custom CSS to further customize the appearance.</p>
            <div className="code-block overflow-hidden rounded-xl border border-white/8 bg-[#0a0818] px-3 py-2.5">
              <p><span className="code-keyword">:root</span> {"{"}</p>
              <p className="pl-3"><span className="code-prop">--primary-color</span>: <span className="code-val">#7C3AED</span>;</p>
              <p className="pl-3"><span className="code-prop">--sidebar-width</span>: <span className="code-val">268px</span>;</p>
              <p>{"}"}</p>
              <p className="mt-1"><span className="code-keyword">.btn-primary</span> {"{"}</p>
              <p className="pl-3"><span className="code-prop">border-radius</span>: <span className="code-val">8px</span>;</p>
              <p>{"}"}</p>
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-yellow-400"><span>⚠️</span>Custom CSS may affect the platform layout. Use with caution.</p>
          </div>
          <div className="border-t border-white/8"/>
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Learn how to customize the appearance of Operino.</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/4 py-2 text-[10px] text-gray-300 hover:text-white">📖 View Docs</button>
              <button className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/4 py-2 text-[10px] text-gray-300 hover:text-white">🎧 Contact</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsAppearance;
