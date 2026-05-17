import React, { useState } from "react";

const invoices = [
  { date:"May 15, 2024", desc:"Pro Plan – Monthly", amount:"$79.00", status:"Paid", inv:"INV-2024-05015" },
  { date:"Apr 15, 2024", desc:"Pro Plan – Monthly", amount:"$79.00", status:"Paid", inv:"INV-2024-04015" },
  { date:"Mar 15, 2024", desc:"Pro Plan – Monthly", amount:"$79.00", status:"Paid", inv:"INV-2024-03015" },
  { date:"Feb 15, 2024", desc:"Pro Plan – Monthly", amount:"$79.00", status:"Paid", inv:"INV-2024-02015" },
  { date:"Jan 15, 2024", desc:"Pro Plan – Monthly", amount:"$79.00", status:"Paid", inv:"INV-2024-01015" },
];

const UsageBar: React.FC<{label:string;used:number;total:number;pct:number;color:string}> = ({label,used,total,pct,color}) => (
  <div className="mb-3">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[11px] text-gray-400">{label}</span>
      <span className="text-[11px] font-semibold text-white">{pct}%</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full transition-all duration-1000" style={{width:`${pct}%`,background:color}}/>
    </div>
    <p className="mt-0.5 text-[10px] text-gray-600">{used} / {total}</p>
  </div>
);

const SettingsBilling: React.FC = () => {
  const [saved, setSaved] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .sb-fade{animation:fadeUp 0.5s ease forwards;}
        .sb-card{border:1px solid rgba(255,255,255,0.07);transition:border-color 0.2s ease;}
        .sb-card:hover{border-color:rgba(124,92,252,0.2);}
        .sb-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease,background 0.2s ease;}
        .sb-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .sb-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .sb-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .inv-row{border-bottom:1px solid rgba(255,255,255,0.05);transition:background 0.2s ease;}
        .inv-row:hover{background:rgba(124,92,252,0.05);}
        .upgrade-btn{position:relative;overflow:hidden;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .upgrade-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,92,252,0.5);}
        .upgrade-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .upgrade-btn:hover::after{animation:shimmer 0.55s ease forwards;}
      `}</style>

      <div className="flex h-full gap-0">
        {/* Main */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          {/* Header */}
          <div className="sb-fade mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Billing & Subscription</h1>
              <p className="mt-0.5 text-[13px] text-gray-500">Manage your subscription, billing information, and payment methods.</p>
            </div>
            <button className="sb-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-5 py-2.5 text-[13px] font-bold text-white">⚙️ Manage Subscription</button>
          </div>

          {/* Current Plan */}
          <div className="sb-fade sb-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.05s"}}>
            <h2 className="mb-3 text-[14px] font-bold text-white">Current Plan</h2>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c5cfc]/20 text-2xl">👑</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-white">Pro Plan</span>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Active</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-gray-400">For growing teams building advanced AI experiences.</p>
                  <button className="mt-1.5 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View plan details →</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[clamp(24px,3vw,36px)] font-bold text-white">$79 <span className="text-[14px] font-normal text-gray-400">/ month</span></p>
                <p className="text-[11px] text-gray-500">Billed monthly</p>
              </div>
            </div>
            {/* Plan features */}
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 border-t border-white/8 pt-4">
              {[{icon:"🤖",label:"AI Employees",val:"Unlimited"},{icon:"👥",label:"Team Members",val:"Up to 20"},{icon:"💬",label:"Credits",val:"20,000 / month"},{icon:"💾",label:"Storage",val:"100 GB"}].map((f,i)=>(
                <div key={i} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-base">{f.icon}</div>
                  <div><p className="text-[10px] text-gray-500">{f.label}</p><p className="text-[13px] font-bold text-white">{f.val}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="sb-fade sb-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.1s"}}>
            <h2 className="mb-4 text-[14px] font-bold text-white">Subscription & Billing</h2>
            <div className="flex flex-col gap-0 divide-y divide-white/5">
              {[
                {label:"Billing Cycle",val:"Monthly",action:<button className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Change</button>},
                {label:"Next Billing Date",val:<><span className="text-white">June 15, 2024</span><span className="ml-2 rounded-full bg-[#7c5cfc]/20 px-2 py-0.5 text-[10px] font-semibold text-[#a78bfa]">In 23 days</span></>,action:null},
                {label:"Subscription Status",val:<span className="flex items-center gap-1.5 text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400"/>Active</span>,action:<button className="text-[12px] font-semibold text-red-400 hover:text-red-300 transition-colors">Cancel Subscription</button>},
                {label:"Price",val:"$79.00 / month",action:null},
                {label:"Tax",val:"Calculated at checkout",action:null},
                {label:"Total",val:"$79.00 / month",action:null},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between py-3">
                  <span className="text-[13px] text-gray-400">{r.label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] text-white">{r.val}</span>
                    {r.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="sb-fade sb-card mb-4 rounded-2xl bg-[#0d0b1f] p-5" style={{animationDelay:"0.15s"}}>
            <h2 className="mb-4 text-[14px] font-bold text-white">Payment Method</h2>
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-14 items-center justify-center rounded-lg bg-white/10 text-sm font-bold text-blue-400">VISA</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-white">Visa ending in 4242</p>
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">Default</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Expires 04/28</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-xl border border-white/12 bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-gray-300 hover:text-white transition-all">Update</button>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all">⋮</button>
              </div>
            </div>
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#7c5cfc]/30 py-2.5 text-[12px] font-semibold text-[#a78bfa] hover:border-[#7c5cfc]/60 hover:bg-[#7c5cfc]/05 transition-all">
              + Add Payment Method
            </button>
          </div>

          {/* Billing History */}
          <div className="sb-fade sb-card rounded-2xl bg-[#0d0b1f] overflow-hidden" style={{animationDelay:"0.2s"}}>
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
              <h2 className="text-[14px] font-bold text-white">Billing History</h2>
              <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View All Invoices →</button>
            </div>
            <div className="grid border-b border-white/8 px-5 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"130px 1fr 80px 80px 130px 40px"}}>
              <span>Date</span><span>Description</span><span>Amount</span><span>Status</span><span>Invoice</span><span/>
            </div>
            {invoices.map((inv,i)=>(
              <div key={i} className="inv-row grid items-center px-5 py-3" style={{gridTemplateColumns:"130px 1fr 80px 80px 130px 40px"}}>
                <span className="text-[12px] text-gray-400">{inv.date}</span>
                <span className="text-[12px] text-white">{inv.desc}</span>
                <span className="text-[12px] font-semibold text-white">{inv.amount}</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400 w-fit">{inv.status}</span>
                <span className="text-[11px] text-gray-500 font-mono">{inv.inv}</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-500 hover:text-white transition-all text-sm">⬇️</button>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
              <span className="text-[11px] text-gray-500">Showing 1 to 5 of 12 invoices</span>
              <div className="flex gap-1">
                {["‹",1,2,3,"›"].map((p,i)=>(
                  <button key={i} className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] transition-all ${p===1?"bg-[#7c5cfc] text-white font-bold":"border border-white/10 text-gray-400 hover:text-white"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[240px] flex-shrink-0 overflow-y-auto border-l border-white/8 bg-[#08060f] px-4 py-5 flex flex-col gap-5">
          {/* Plan Usage */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Plan Usage</p>
            <p className="mb-3 text-[11px] text-gray-500">Resets on June 15, 2024</p>
            <UsageBar label="Credits" used="12,450" total="20,000" pct={62} color="linear-gradient(90deg,#7c5cfc,#a78bfa)"/>
            <UsageBar label="AI Employees" used="8" total="Unlimited" pct={40} color="#22c55e"/>
            <UsageBar label="Storage" used="45 GB" total="100 GB" pct={45} color="#3b82f6"/>
            <UsageBar label="API Requests" used="128K" total="500K" pct={26} color="#f97316"/>
            <button className="mt-1 text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">View Usage & Limits →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Upgrade */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <p className="text-[13px] font-bold text-white">Upgrade Your Plan</p>
              <span className="text-lg">⭐</span>
            </div>
            <p className="mb-3 text-[11px] text-gray-500">Need more power and flexibility?</p>
            {["Advanced AI capabilities","Priority support","Custom integrations","Higher limits & more"].map((f,i)=>(
              <div key={i} className="mb-1.5 flex items-center gap-1.5"><span className="text-[#7c5cfc] text-xs">✓</span><span className="text-[11px] text-gray-400">{f}</span></div>
            ))}
            <button className="upgrade-btn mt-3 w-full rounded-xl bg-[#7c5cfc] py-2.5 text-[13px] font-bold text-white">Upgrade Plan</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Invoices */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Invoices & Receipts</p>
            <p className="mb-2 text-[11px] text-gray-500">Download your invoices and receipts.</p>
            <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors flex items-center gap-1.5">📄 View All Invoices →</button>
          </div>
          <div className="border-t border-white/8"/>
          {/* Help */}
          <div>
            <p className="mb-1 text-[13px] font-bold text-white">Need Help?</p>
            <p className="mb-2 text-[11px] text-gray-500">Our billing team is here to help you.</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 py-2 text-[11px] text-gray-300 hover:text-white transition-all">🎧 Contact Support</button>
              <button className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 py-2 text-[11px] text-gray-300 hover:text-white transition-all">❓ Billing FAQ</button>
            </div>
          </div>
          <div className="border-t border-white/8"/>
          {/* Secure */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/05 p-3">
            <div className="flex items-center gap-2 mb-1"><span className="text-emerald-400">🔒</span><p className="text-[12px] font-semibold text-emerald-400">Secure Billing</p></div>
            <p className="text-[10px] text-gray-500 mb-2">All payments are secure and encrypted.</p>
            <div className="flex items-center gap-2">
              {["VISA","MC","AMEX","🍎Pay"].map(c=><div key={c} className="flex h-6 items-center justify-center rounded bg-white/10 px-1.5 text-[9px] font-bold text-gray-300">{c}</div>)}
            </div>
            <p className="mt-1.5 text-[9px] text-gray-600">Powered by stripe</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default SettingsBilling;
