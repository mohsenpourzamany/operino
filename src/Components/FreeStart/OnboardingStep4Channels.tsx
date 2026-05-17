import React, { useState } from "react";

const channels = [
  { icon: "🌐", label: "Website" },
  { icon: "💚", label: "WhatsApp" },
  { icon: "📷", label: "Instagram" },
  { icon: "✈️", label: "Telegram" },
  { icon: "✉️", label: "Email" },
  { icon: "•••", label: "Other" },
];

interface Props {
  onNext: (data: { channels: string[] }) => void;
  onBack: () => void;
}

const OnboardingStep4Channels: React.FC<Props> = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState<string[]>([
    "Website",
    "WhatsApp",
    "Instagram",
  ]);
  const toggle = (l: string) =>
    setSelected((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .s4-fade{animation:fadeUp 0.5s ease forwards;}
        .ch-card{border:1.5px solid rgba(255,255,255,0.08);transition:all 0.22s ease;cursor:pointer;}
        .ch-card:hover{border-color:rgba(124,92,252,0.5);background:rgba(124,92,252,0.1)!important;transform:translateY(-3px);}
        .ch-card.sel{border-color:#7c5cfc!important;background:rgba(124,92,252,0.18)!important;}
        .s4-btn{position:relative;overflow:hidden;transition:transform 0.22s ease,box-shadow 0.22s ease,background 0.22s ease;}
        .s4-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 24px rgba(124,92,252,0.45);background:#6b4ce0!important;}
        .s4-btn:disabled{opacity:0.4;cursor:not-allowed;}
      `}</style>
      <div className="flex h-full flex-col gap-6 p-8">
        <div
          className="s4-fade flex items-center gap-2"
          style={{ animationDelay: "0s" }}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7c5cfc] text-[12px] font-bold text-white">
            4
          </div>
          <span className="text-[13px] font-semibold text-[#a78bfa]">
            Channels
          </span>
        </div>
        <div className="s4-fade" style={{ animationDelay: "0.1s" }}>
          <h2 className="font-['Poppins'] text-[clamp(20px,3vw,45px)] font-extrabold text-white">
            Where should your
            <br />
            AI employee work?
          </h2>
          <p className="mt-1 text-[13px] text-gray-400">
            Select all the channels you want to connect.
          </p>
        </div>
        <div
          className="s4-fade grid grid-cols-3 gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          {channels.map((c, i) => (
            <div
              key={i}
              onClick={() => toggle(c.label)}
              className={`ch-card relative flex flex-col items-center gap-2 rounded-2xl bg-white/4 p-4 ${selected.includes(c.label) ? "sel" : ""}`}
            >
              {selected.includes(c.label) && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#7c5cfc] text-[10px] text-white">
                  ✓
                </div>
              )}
              <span className="text-2xl">{c.icon}</span>
              <span className="text-[12px] font-semibold text-white">
                {c.label}
              </span>
            </div>
          ))}
        </div>
        <div
          className="s4-fade mt-auto flex items-center justify-between"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-5 py-2.5 text-[13px] font-semibold text-gray-300 transition-all hover:border-white/25 hover:text-white"
          >
            ← Back
          </button>
          <button
            onClick={() =>
              selected.length > 0 && onNext({ channels: selected })
            }
            disabled={selected.length === 0}
            className="s4-btn flex items-center gap-2 rounded-xl bg-[#7c5cfc] px-6 py-2.5 text-[13px] font-bold text-white"
          >
            Continue →
          </button>
        </div>
      </div>
    </>
  );
};
export default OnboardingStep4Channels;
