import React, { useState } from "react";

const actions = [
  { icon:"👥", label:"Transfer Workspace Ownership", desc:"Transfer ownership of this workspace to another member.", btnLabel:"Transfer Ownership", confirmWord:"", btnColor:"red", serious:false },
  { icon:"🗑️", label:"Delete Workspace", desc:"Permanently delete this workspace and all of its data, including conversations, employees, automations, integrations, and files.\nThis action cannot be undone.", btnLabel:"Delete Workspace", confirmWord:"DELETE", btnColor:"red", serious:true },
  { icon:"👤", label:"Remove All Members", desc:"Remove all members from this workspace.\nYou will remain as the owner.", btnLabel:"Remove All Members", confirmWord:"REMOVE", btnColor:"red", serious:true },
  { icon:"🚫", label:"Disable All AI Employees", desc:"This will disable all AI employees in this workspace.\nThey can be re-enabled later.", btnLabel:"Disable All Employees", confirmWord:"DISABLE", btnColor:"red", serious:false },
  { icon:"💬", label:"Delete All Conversations", desc:"Permanently delete all conversations and messages.\nThis action cannot be undone.", btnLabel:"Delete Conversations", confirmWord:"DELETE", btnColor:"red", serious:true },
  { icon:"💾", label:"Delete All Data", desc:"Permanently delete all workspace data including files, knowledge base, logs, and settings.\nThis action cannot be undone.", btnLabel:"Delete All Data", confirmWord:"DELETE", btnColor:"red", serious:true },
  { icon:"❌", label:"Cancel Subscription", desc:"Cancel your current subscription at the end of the billing period.\nYou will lose access to premium features.", btnLabel:"Cancel Subscription", confirmWord:"CANCEL", btnColor:"red", serious:false },
];

const DangerAction: React.FC<{action:typeof actions[0];index:number}> = ({action,index}) => {
  const [confirmVal,setConfirmVal]=useState("");
  const [done,setDone]=useState(false);
  const [open,setOpen]=useState(false);

  const needsConfirm = !!action.confirmWord;
  const canProceed = !needsConfirm || confirmVal===action.confirmWord;

  const handleClick = () => {
    if(canProceed){ setDone(true); setTimeout(()=>setDone(false),2500); setConfirmVal(""); setOpen(false); }
  };

  return (
    <div className={`dz-row rounded-2xl border p-5 ${action.serious?"border-red-500/20 bg-red-500/04":"border-white/8 bg-[#0d0b1f]"}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-xl">{action.icon}</div>
          <div>
            <p className="text-[14px] font-bold text-white">{action.label}</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-gray-400 whitespace-pre-line">{action.desc}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {done?(
            <div className="rounded-xl bg-emerald-500/15 px-4 py-2 text-[12px] font-bold text-emerald-400">✓ Done</div>
          ):(
            <button onClick={()=>needsConfirm?setOpen(o=>!o):handleClick()}
              className="dz-action-btn rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-[12px] font-bold text-red-400 hover:bg-red-500/20 hover:border-red-500/60 transition-all">
              {action.btnLabel}
            </button>
          )}
          {needsConfirm && open && !done && (
            <div className="flex items-center gap-2">
              <input type="text" placeholder={`Type ${action.confirmWord} to confirm`}
                value={confirmVal} onChange={e=>setConfirmVal(e.target.value)}
                className="dz-input w-48 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-white placeholder-gray-600 transition-all"
                onKeyDown={e=>e.key==="Enter"&&handleClick()}/>
              <button onClick={handleClick} disabled={!canProceed}
                className={`rounded-xl px-3 py-1.5 text-[12px] font-bold transition-all ${canProceed?"bg-red-500 text-white hover:bg-red-600":"bg-white/10 text-gray-600 cursor-not-allowed"}`}>
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsDangerZone: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .dz-fade{animation:fadeUp 0.5s ease forwards;}
        .dz-row{transition:border-color 0.2s ease,background 0.2s ease;}
        .dz-action-btn{transition:all 0.2s ease;}
        .dz-input:focus{outline:none;border-color:rgba(248,113,113,0.6);box-shadow:0 0 0 3px rgba(248,113,113,0.1);}
        @keyframes warningPulse{0%,100%{box-shadow:0 0 0 0 rgba(248,113,113,0.2);}50%{box-shadow:0 0 0 8px rgba(248,113,113,0);}}
        .warn-icon{animation:warningPulse 3s ease-in-out infinite;}
        @keyframes shake{0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-3px);}40%,80%{transform:translateX(3px);}}
        .warn-banner:hover .warn-icon{animation:shake 0.4s ease;}
      `}</style>

      <div className="overflow-y-auto px-7 py-6">
        {/* Header */}
        <div className="dz-fade mb-5 flex items-center gap-3">
          <span className="warn-icon text-2xl text-red-400">⚠️</span>
          <div>
            <h1 className="font-['Syne'] text-[clamp(18px,2.5vw,24px)] font-bold text-white">Danger Zone</h1>
            <p className="mt-0.5 text-[13px] text-gray-500">Irreversible and sensitive actions. Please read carefully before proceeding.</p>
          </div>
        </div>

        {/* Warning banner */}
        <div className="dz-fade warn-banner mb-6 flex items-start gap-3 rounded-2xl border border-red-500/30 bg-red-500/08 px-5 py-4" style={{animationDelay:"0.05s"}}>
          <span className="warn-icon flex-shrink-0 text-xl text-red-400 mt-0.5">🚫</span>
          <div>
            <p className="text-[14px] font-bold text-red-400">Be careful!</p>
            <p className="mt-0.5 text-[12px] text-gray-400">Actions in this section are permanent and cannot be undone. Please proceed with caution.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {actions.map((action,i)=>(
            <div key={i} className={`dz-fade`} style={{animationDelay:`${0.08+i*0.06}s`}}>
              <DangerAction action={action} index={i}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default SettingsDangerZone;
