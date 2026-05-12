import React, { useEffect, useRef, useState } from "react";

const endpoints = [
  {
    method: "POST",
    path: "/v1/chat/completions",
    desc: "Send a message to the AI and get a response.",
  },
  {
    method: "GET",
    path: "/v1/knowledge",
    desc: "List all knowledge bases.",
  },
  {
    method: "POST",
    path: "/v1/knowledge",
    desc: "Create a new knowledge base.",
  },
  {
    method: "GET",
    path: "/v1/analytics/overview",
    desc: "Retrieve analytics overview.",
  },
];

const methodColor: Record<string, { bg: string; text: string }> = {
  POST: { bg: "rgba(124,92,252,0.2)", text: "#a78bfa" },
  GET:  { bg: "rgba(52,211,153,0.15)", text: "#34d399" },
  PUT:  { bg: "rgba(251,191,36,0.15)", text: "#fbbf24" },
  DELETE: { bg: "rgba(248,113,113,0.15)", text: "#f87171" },
};

const DocsApiReference: React.FC = () => {
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
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .api-fade { animation: fadeUp 0.55s ease forwards; }

        .endpoint-row {
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
        }
        .endpoint-row:hover {
          background: rgba(124,92,252,0.07) !important;
          border-color: rgba(124,92,252,0.3);
          transform: translateX(3px);
        }

        .view-all-btn {
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .view-all-btn:hover {
          background: rgba(124,92,252,0.15) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(124,92,252,0.2);
        }
      `}</style>

      <div ref={ref} className="pb-4">
        {/* Header */}
        <div
          className={`mb-5 flex items-end justify-between ${visible ? "api-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div>
            <h2 className="text-[clamp(18px,2vw,22px)] font-bold text-white">API Reference</h2>
            <p className="mt-1 text-[13px] text-gray-500">
              Full API reference to build and scale with confidence.
            </p>
          </div>
          <button className="flex items-center gap-1 text-[13px] font-semibold text-[#a78bfa] transition-all hover:text-[#c4b5fd]">
            View all endpoints <span>→</span>
          </button>
        </div>

        {/* Endpoint rows */}
        <div className="flex flex-col gap-2">
          {endpoints.map((ep, i) => {
            const mc = methodColor[ep.method] ?? methodColor.POST;
            return (
              <div
                key={i}
                className={`endpoint-row flex items-center gap-4 rounded-xl bg-white/3 px-4 py-3.5 ${visible ? "api-fade" : "opacity-0"}`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Method badge */}
                <span
                  className="w-14 flex-shrink-0 rounded-md px-2 py-0.5 text-center text-[11px] font-bold"
                  style={{ background: mc.bg, color: mc.text }}
                >
                  {ep.method}
                </span>

                {/* Path */}
                <span className="flex-1 font-mono text-[13px] font-semibold text-white">
                  {ep.path}
                </span>

                {/* Desc */}
                <span className="hidden flex-1 text-[12px] text-gray-500 sm:block">
                  {ep.desc}
                </span>

                {/* Arrow */}
                <span
                  className="text-gray-600 transition-all duration-200"
                  style={{ color: hovered === i ? "#a78bfa" : undefined }}
                >
                  ›
                </span>
              </div>
            );
          })}
        </div>

        {/* View full button */}
        <div
          className={`mt-5 ${visible ? "api-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.5s" }}
        >
          <button className="view-all-btn flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/4 py-3 text-[13px] font-semibold text-gray-300">
            📖 View full API reference
          </button>
        </div>
      </div>
    </>
  );
};

export default DocsApiReference;
