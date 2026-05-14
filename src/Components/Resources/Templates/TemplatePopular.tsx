/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useRef, useState } from "react";
import type { TemplateFilters } from "./TemplateHero";

const allTemplates = [
  {
    icon: "💬",
    title: "Customer Support Bot",
    desc: "Answer common questions and resolve customer issues 24/7.",
    category: "Customer Support",
    integrations: ["🟢", "💚", "🔵"],
    extra: "+2",
    usedBy: "1.2k",
    useCase: "Customer Service",
  },
  {
    icon: "👥",
    title: "Lead Qualification Bot",
    desc: "Qualify leads, ask the right questions and collect details.",
    category: "Lead Generation",
    integrations: ["🟣", "🔴", "📧"],
    extra: "+3",
    usedBy: "890",
    useCase: "Sales",
  },
  {
    icon: "🛒",
    title: "E-commerce Assistant",
    desc: "Help shoppers find products and answer order-related questions.",
    category: "E-commerce",
    integrations: ["🟢", "🟡", "🔵"],
    extra: "+2",
    usedBy: "756",
    useCase: "Customer Service",
  },
  {
    icon: "🔧",
    title: "Internal Helpdesk Bot",
    desc: "Assist your team with internal requests and documentation.",
    category: "Internal Tools",
    integrations: ["🟢", "🔷", "🟣"],
    extra: "+2",
    usedBy: "643",
    useCase: "HR",
  },
  {
    icon: "📣",
    title: "Marketing Campaign Bot",
    desc: "Generate campaign ideas, copy, and improve your content.",
    category: "Marketing",
    integrations: ["🟢", "📝", "🔵"],
    extra: "+2",
    usedBy: "532",
    useCase: "Automation",
  },
  {
    icon: "📊",
    title: "Analytics Reporter",
    desc: "Auto-generate performance reports and share insights with your team.",
    category: "Internal Tools",
    integrations: ["🟢", "📊", "📧"],
    extra: "+1",
    usedBy: "410",
    useCase: "Analytics",
  },
  {
    icon: "🎓",
    title: "Onboarding Assistant",
    desc: "Guide new users through setup and key features automatically.",
    category: "Customer Support",
    integrations: ["🟢", "🔵", "💬"],
    extra: "+2",
    usedBy: "380",
    useCase: "Automation",
  },
  {
    icon: "🛍️",
    title: "Product Recommender",
    desc: "Suggest products based on user preferences and purchase history.",
    category: "E-commerce",
    integrations: ["🛒", "🟢", "📧"],
    extra: "+2",
    usedBy: "295",
    useCase: "Sales",
  },
];

interface Props {
  filters: TemplateFilters;
}

const TemplatePopular: React.FC<Props> = ({ filters }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [filters]);

  const filtered = allTemplates.filter((t) => {
    const catMatch =
      filters.category === "All Categories" || t.category === filters.category;
    const ucMatch =
      filters.useCase === "All Use Cases" || t.useCase === filters.useCase;
    const searchMatch =
      !filters.search ||
      t.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.desc.toLowerCase().includes(filters.search.toLowerCase());
    return catMatch && ucMatch && searchMatch;
  });

  const toggleBookmark = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .tp-fade { animation: fadeUp 0.5s ease forwards; }
        @keyframes filterIn { from{opacity:0;transform:scale(0.96) translateY(10px);}to{opacity:1;transform:scale(1) translateY(0);} }
        .tp-filter { animation: filterIn 0.35s ease forwards; }

        .tp-card {
          border:1px solid rgba(255,255,255,0.07);
          transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;
          cursor:pointer;
        }
        .tp-card:hover { transform:translateY(-5px); border-color:rgba(124,92,252,0.45); box-shadow:0 12px 36px rgba(124,92,252,0.2); background:rgba(124,92,252,0.07)!important; }

        .bm-btn { transition:transform 0.2s ease, color 0.2s ease; }
        .bm-btn:hover { transform:scale(1.2); }
        .bm-active { color:#a78bfa!important; }

        .use-btn {
          transition:background 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
          position:relative; overflow:hidden;
        }
        .use-btn:hover { background:#6b4ce0!important; transform:translateY(-2px); box-shadow:0 4px 16px rgba(124,92,252,0.4); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .use-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .use-btn:hover::after { animation:shimmer 0.55s ease forwards; }

        .no-results { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <div ref={ref} className="pb-8">
        <div
          className={`mb-5 flex items-center justify-between ${visible ? "tp-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-[clamp(16px,2vw,20px)] font-bold text-white">
              Popular Templates
            </h2>
            <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-gray-500">
              {filtered.length}
            </span>
          </div>
          <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] flex items-center gap-1">
            View all templates →
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="no-results flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[14px] font-semibold text-white">
              No templates found
            </p>
            <p className="mt-1 text-[12px] text-gray-500">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <div
            key={animKey}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((t, i) => (
              <div
                key={i}
                className={`tp-card flex flex-col rounded-2xl bg-[#0c0a1e] p-4 tp-filter`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7c5cfc]/20 text-2xl border border-[#7c5cfc]/30">
                    {t.icon}
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(i, e)}
                    className={`bm-btn text-lg ${bookmarked.has(i) ? "bm-active" : "text-gray-700"}`}
                  >
                    {bookmarked.has(i) ? "🔖" : "🏷️"}
                  </button>
                </div>

                <p className="mt-3 text-[13px] font-bold text-white leading-snug">
                  {t.title}
                </p>
                <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-gray-500">
                  {t.desc}
                </p>

                {/* Integration icons */}
                <div className="mt-3 flex items-center gap-1">
                  {t.integrations.map((ic, j) => (
                    <span
                      key={j}
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/8 text-[12px]"
                    >
                      {ic}
                    </span>
                  ))}
                  <span className="rounded-lg bg-white/8 px-1.5 py-0.5 text-[10px] text-gray-500">
                    {t.extra}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-gray-600">
                    Used by {t.usedBy} teams
                  </span>
                  <button className="use-btn rounded-lg bg-[#7c5cfc] px-3 py-1.5 text-[11px] font-semibold text-white">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TemplatePopular;
