import React, { useState } from "react";

const Toggle: React.FC<{ on: boolean; onChange: () => void }> = ({ on, onChange }) => (
  <button onClick={onChange} className={`relative h-6 w-11 rounded-full transition-all duration-300 flex-shrink-0 ${on ? "bg-[#7c5cfc]" : "bg-white/15"}`}>
    <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${on ? "left-5" : "left-0.5"}`} />
  </button>
);

const Select: React.FC<{ value: string; options: string[]; onChange: (v: string) => void }> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all hover:border-[#7c5cfc]/40">
        <span>{value}</span><span className="text-gray-500 text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0d1f] shadow-xl">
          {options.map(o => (
            <div key={o} onClick={() => { onChange(o); setOpen(false); }}
              className={`cursor-pointer px-3 py-2 text-[12px] hover:bg-[#7c5cfc]/15 ${value === o ? "text-[#a78bfa] font-semibold" : "text-gray-400"}`}>{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="mb-4">
    <h2 className="text-[15px] font-bold text-white">{title}</h2>
    <p className="mt-0.5 text-[12px] text-gray-500">{desc}</p>
  </div>
);

const SettingsGeneral: React.FC = () => {
  const [orgName, setOrgName] = useState("Operino");
  const [orgUrl, setOrgUrl] = useState("operino.ai");
  const [industry, setIndustry] = useState("SaaS");
  const [companySize, setCompanySize] = useState("11-50 employees");
  const [timezone, setTimezone] = useState("(GMT+03:30) Tehran");
  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("May 15, 2024 (MMM D, YYYY)");
  const [timeFormat, setTimeFormat] = useState("12-hour (1:30 PM)");
  const [defaultModel, setDefaultModel] = useState("Operino Pro (Recommended)");
  const [toggles, setToggles] = useState([true, true, false, false]);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .sg-fade{animation:fadeUp 0.5s ease forwards;}
        .sg-input:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        .sg-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .sg-card:hover{border-color:rgba(124,92,252,0.2);}
        .save-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease,background 0.2s ease;}
        .save-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.45);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .save-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .save-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        @keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);}}
        .check-pop{animation:checkPop 0.4s ease forwards;}
      `}</style>

      <div className="flex gap-0">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Header */}
          <div className="sg-fade mb-6 flex items-start justify-between">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">General</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Manage your organization's basic information and preferences.</p>
            </div>
            {saved ? (
              <div className="check-pop flex items-center gap-2 rounded-xl bg-emerald-500/20 px-5 py-2.5 text-[13px] font-bold text-emerald-400 ring-1 ring-emerald-500/30">✓ Saved!</div>
            ) : (
              <button onClick={handleSave} className="save-btn rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-bold text-white">Save changes</button>
            )}
          </div>

          {/* Organization Info */}
          <div className="sg-fade sg-card mb-5 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.05s"}}>
            <SectionHeader title="Organization Information" desc="Update your organization's details and primary settings." />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Organization name</label>
                <input value={orgName} onChange={e=>setOrgName(e.target.value)}
                  className="sg-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white placeholder-gray-600 transition-all"/>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Logo</label>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7c5cfc]/25 text-2xl">🤖</div>
                  <div>
                    <button className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Change logo</button>
                    <p className="mt-0.5 text-[10px] text-gray-600">JPG, PNG or SVG. Max size 2MB.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Organization URL <span className="ml-1 text-gray-600">ℹ️</span></label>
                <input value={orgUrl} onChange={e=>setOrgUrl(e.target.value)}
                  className="sg-input w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[13px] text-white transition-all"/>
                <a href="#" className="mt-1 block text-[11px] text-[#a78bfa] hover:text-[#c4b5fd]">https://{orgUrl}</a>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Industry</label><Select value={industry} options={["SaaS","E-commerce","Agency","Healthcare","Education","Other"]} onChange={setIndustry}/></div>
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Company size</label><Select value={companySize} options={["1-10 employees","11-50 employees","51-200 employees","201-500 employees","500+ employees"]} onChange={setCompanySize}/></div>
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Time zone</label><Select value={timezone} options={["(GMT+03:30) Tehran","(GMT+00:00) UTC","(GMT-05:00) New York","(GMT+01:00) London","(GMT+08:00) Singapore"]} onChange={setTimezone}/></div>
            </div>
          </div>

          {/* Localization */}
          <div className="sg-fade sg-card mb-5 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <SectionHeader title="Localization" desc="Set the language, date format, and time format for your organization." />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Language</label><Select value={language} options={["English","Persian","Arabic","French","Spanish","German"]} onChange={setLanguage}/></div>
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Date format</label><Select value={dateFormat} options={["May 15, 2024 (MMM D, YYYY)","15/05/2024","05-15-2024","2024-05-15"]} onChange={setDateFormat}/></div>
              <div><label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Time format</label><Select value={timeFormat} options={["12-hour (1:30 PM)","24-hour (13:30)"]} onChange={setTimeFormat}/></div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Preview</label>
                <div className="rounded-xl border border-white/10 bg-white/4 px-3 py-2.5">
                  <p className="text-[12px] text-white">May 15, 2024</p>
                  <p className="text-[11px] text-gray-400">1:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Default Settings */}
          <div className="sg-fade sg-card mb-5 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <SectionHeader title="Default Settings" desc="Configure default behaviors and preferences across the platform." />
            <div className="flex flex-col gap-3">
              {[
                {icon:"⚡",title:"Auto-save",desc:"Automatically save changes you make."},
                {icon:"💡",title:"Enable tips & suggestions",desc:"Show helpful tips to improve your experience."},
                {icon:"🔔",title:"Play sound for notifications",desc:"Play a sound when new notifications arrive."},
                {icon:"⊞",title:"Compact mode",desc:"Reduce spacing for a more compact experience."},
              ].map((s,i)=>(
                <div key={i} className="flex items-center justify-between rounded-xl border border-white/6 bg-white/3 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{s.icon}</div>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{s.title}</p>
                      <p className="text-[11px] text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                  <Toggle on={toggles[i]} onChange={()=>setToggles(t=>{const n=[...t];n[i]=!n[i];return n;})}/>
                </div>
              ))}
            </div>
          </div>

          {/* Default AI Model */}
          <div className="sg-fade sg-card rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.2s"}}>
            <SectionHeader title="Default AI Model" desc="Set the default AI model for conversations and automations." />
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="mb-1.5 block text-[12px] font-semibold text-gray-300">Default model</label>
                <Select value={defaultModel} options={["Operino Pro (Recommended)","GPT-4o","Claude 3.5","GPT-3.5 Turbo"]} onChange={setDefaultModel}/>
              </div>
              <p className="flex-1 text-[12px] text-gray-500">You can override this in individual AI Employees or automations.</p>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Account Owner */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Account Owner</p>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/4 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7c5cfc] text-[14px] font-bold text-white">M</div>
              <div>
                <p className="text-[13px] font-bold text-white">Mohsen</p>
                <p className="text-[11px] text-gray-500">mohsen@example.com</p>
              </div>
            </div>
            <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View profile ↗</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Plan & Usage */}
          <div>
            <p className="mb-3 text-[13px] font-bold text-white">Plan & Usage</p>
            <div className="rounded-xl border border-white/8 bg-white/4 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="text-sm">👑</span><span className="text-[13px] font-bold text-white">Pro Plan</span></div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Active</span>
              </div>
              <p className="mb-1.5 text-[11px] text-gray-500">Credits</p>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">12,450 / 20,000</span>
                <span className="text-gray-500">62%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#7c5cfc] to-[#a78bfa]" style={{width:"62%"}}/></div>
              <div className="mt-2 flex flex-col gap-1">
                {["Unlimited AI Employees","Advanced Automations","Priority Support","Custom Integrations","Analytics & Reports"].map(f=>(
                  <div key={f} className="flex items-center gap-1.5"><span className="text-[#7c5cfc] text-xs">✓</span><span className="text-[11px] text-gray-400">{f}</span></div>
                ))}
              </div>
              <button className="mt-2 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Manage Subscription</button>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Need Help */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Our support team is here to help you.</p>
            <button className="mb-1.5 flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-all">🎧 Contact Support</button>
            <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-all">📖 View Documentation</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Tips */}
          <div>
            <p className="mb-2 text-[13px] font-bold text-white">💡 Tips</p>
            {["Your organization URL is how your team will access the platform.","Changes to general settings apply to the entire workspace."].map((t,i)=>(
              <div key={i} className="mb-2 flex items-start gap-1.5"><span className="mt-0.5 text-[#7c5cfc] text-xs flex-shrink-0">→</span><p className="text-[11px] text-gray-500">{t}</p></div>
            ))}
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Learn more ↗</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsGeneral;
