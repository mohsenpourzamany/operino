import React, { useEffect, useRef, useState } from "react";

const videos = [
  { title: "Introduction to Operino", desc: "Overview of Operino and its core features.", duration: "6:45", level: "Beginner", thumb: "🤖" },
  { title: "Building Your First Chatbot", desc: "Create and deploy a chatbot in minutes.", duration: "9:12", level: "Beginner", thumb: "💬" },
  { title: "Working with APIs", desc: "Make requests, handle responses, and errors.", duration: "7:30", level: "Intermediate", thumb: "🔌" },
  { title: "Advanced Analytics", desc: "Understand your data and improve model performance.", duration: "8:20", level: "Advanced", thumb: "📊" },
];

const levelColor: Record<string, string> = { Beginner: "#34d399", Intermediate: "#fbbf24", Advanced: "#f87171" };
const levelBg: Record<string, string> = {
  Beginner: "rgba(52,211,153,0.15)",
  Intermediate: "rgba(251,191,36,0.15)",
  Advanced: "rgba(248,113,113,0.15)",
};

const GuideVideoTutorials: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .vt-fade { animation: fadeUp 0.55s ease forwards; }

        .vt-card {
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
          cursor: pointer;
          overflow: hidden;
        }
        .vt-card:hover { transform:translateY(-5px); border-color:rgba(124,92,252,0.45); box-shadow:0 12px 36px rgba(124,92,252,0.2); }

        .play-btn {
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .vt-card:hover .play-btn {
          transform: scale(1.15);
          background: rgba(124,92,252,0.9) !important;
          box-shadow: 0 0 24px rgba(124,92,252,0.6);
        }

        @keyframes ripple {
          0% { transform:scale(1); opacity:0.6; }
          100% { transform:scale(2); opacity:0; }
        }
        .vt-card:hover .ripple { animation: ripple 1.2s ease-out infinite; }

        .thumb-bg {
          transition: transform 0.4s ease;
        }
        .vt-card:hover .thumb-bg { transform: scale(1.06); }
      `}</style>

      <div ref={ref} className="pb-6">
        <div className={`mb-5 flex items-center justify-between ${visible ? "vt-fade" : "opacity-0"}`} style={{ animationDelay: "0s" }}>
          <h2 className="text-[clamp(16px,2vw,20px)] font-bold text-white">Video Tutorials</h2>
          <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] flex items-center gap-1">View all videos →</button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v, i) => (
            <div key={i}
              className={`vt-card rounded-2xl bg-[#0c0a1e] ${visible ? "vt-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>

              {/* Thumbnail */}
              <div className="relative h-[110px] overflow-hidden rounded-t-2xl bg-[#120e2a]">
                <div className="thumb-bg absolute inset-0 flex items-center justify-center text-5xl opacity-20">{v.thumb}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1e] to-transparent opacity-60" />

                {/* Ripple + Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {hovered === i && (
                    <div className="ripple absolute h-12 w-12 rounded-full border border-[#7c5cfc]/40" />
                  )}
                  <div className="play-btn flex h-10 w-10 items-center justify-center rounded-full bg-[#7c5cfc]/80 backdrop-blur-sm">
                    <span className="ml-0.5 text-white text-sm">▶</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">{v.duration}</div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-[13px] font-semibold text-white leading-snug">{v.title}</p>
                <p className="mt-1 text-[11px] text-gray-500 leading-snug">{v.desc}</p>
                <div className="mt-2">
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: levelBg[v.level], color: levelColor[v.level] }}>
                    {v.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuideVideoTutorials;
