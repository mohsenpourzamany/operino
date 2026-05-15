import React, { useEffect, useRef, useState } from "react";
import Lighting from "../../../Assets/Photos/LightingBook-1.png";
const allArticles = [
  {
    icon: "📄",
    title: "How to create your first AI agent",
    category: "Getting Started",
  },
  {
    icon: "📄",
    title: "How to integrate Operino with Slack",
    category: "Integrations",
  },
  {
    icon: "📄",
    title: "Understanding credits and pricing",
    category: "Account & Billing",
  },
  {
    icon: "📄",
    title: "How to invite team members",
    category: "Getting Started",
  },
  { icon: "📄", title: "Setting up webhooks", category: "Integrations" },
  {
    icon: "📄",
    title: "Troubleshooting API errors",
    category: "Troubleshooting",
  },
];

interface Props {
  search: string;
}

const HelpContent: React.FC<Props> = ({ search }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = allArticles.filter(
    (a) =>
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .hc-fade { animation: fadeUp 0.55s ease forwards; }

        .art-row {
          border:1px solid rgba(255,255,255,0.07);
          transition:transform 0.22s ease,border-color 0.22s ease,background 0.22s ease;
          cursor:pointer;
        }
        .art-row:hover { transform:translateX(5px); border-color:rgba(124,92,252,0.4); background:rgba(124,92,252,0.08)!important; }
        .art-row:hover .art-arrow { transform:translateX(4px); color:#a78bfa; }
        .art-arrow { transition:transform 0.2s ease,color 0.2s ease; }

        @keyframes bookFloat { 0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-10px) scale(1.03);} }
        .book-float { animation:bookFloat 4s ease-in-out infinite; }

        @keyframes glowPulse { 0%,100%{opacity:0.4;}50%{opacity:0.8;} }
        .book-glow { animation:glowPulse 3s ease-in-out infinite; }

        .contact-btn {
          transition:background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease;
          position:relative; overflow:hidden;
        }
        .contact-btn:hover { background:#6b4ce0!important; transform:translateY(-2px); box-shadow:0 6px 22px rgba(124,92,252,0.45); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .contact-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .contact-btn:hover::after { animation:shimmer 0.55s ease forwards; }
      `}</style>

      <div ref={ref} className="pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_280px]">
          {/* Left: Popular articles */}
          <div
            className={`${visible ? "hc-fade" : "opacity-0"}`}
            style={{ animationDelay: "0s" }}
          >
            <h2 className="mb-4 text-[clamp(16px,2vw,20px)] font-bold text-white">
              Popular articles
            </h2>
            <div className="flex flex-col gap-2">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="text-3xl">🔍</span>
                  <p className="mt-2 text-[13px] font-semibold text-white">
                    No articles found
                  </p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Try a different search term.
                  </p>
                </div>
              ) : (
                filtered.map((a, i) => (
                  <div
                    key={i}
                    className={`art-row flex items-center justify-between gap-3 rounded-xl bg-[#0c0a1e] px-4 py-3 ${visible ? "hc-fade" : "opacity-0"}`}
                    style={{ animationDelay: `${0.08 + i * 0.07}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/15 text-sm">
                        {a.icon}
                      </span>
                      <div>
                        <p className="text-[13px] font-medium text-white leading-snug">
                          {a.title}
                        </p>
                        <p className="text-[10px] text-gray-600">
                          {a.category}
                        </p>
                      </div>
                    </div>
                    <span className="art-arrow text-gray-600 text-sm shrink-0">
                      ›
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Center: Book image */}
          <div
            className={`hidden lg:flex items-center justify-center px-4 ${visible ? "hc-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative">
              <div className="book-glow absolute inset-0 rounded-full bg-[#7c5cfc] blur-3xl opacity-20" />
              <img
                src={Lighting}
                alt="Knowledge"
                className="book-float relative z-10 w-[clamp(120px,14vw,180px)] drop-shadow-[0_12px_32px_rgba(124,92,252,0.4)]"
              />
            </div>
          </div>

          {/* Right: Still need help */}
          <div
            className={`${visible ? "hc-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="rounded-2xl border border-white/8 bg-[#0c0a1e] p-5">
              <h3 className="text-[16px] font-bold text-white">
                Still need help?
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-gray-400">
                Can't find what you're looking for?
                <br />
                Our support team is here for you.
              </p>
              <button className="contact-btn mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7c5cfc] py-3 text-[13px] font-semibold text-white">
                🎧 Contact Support
              </button>
              <p className="mt-3 text-center text-[11px] text-gray-600">
                Average response time: &lt; 24h
              </p>

              {/* Divider */}
              <div className="my-4 border-t border-white/8" />

              {/* Quick tips */}
              <p className="mb-3 text-[12px] font-semibold text-gray-400">
                Quick tips
              </p>
              {[
                "Check our FAQ section first",
                "Browse articles by category",
                "Search with specific keywords",
              ].map((tip, i) => (
                <div key={i} className="mb-2 flex items-start gap-2">
                  <span className="mt-0.5 text-[#7c5cfc] text-sm">✓</span>
                  <p className="text-[11px] text-gray-500">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpContent;
