import React, { useEffect, useRef, useState } from "react";
import type { TemplateFilters } from "./TemplateHero";

const cats = [
  { icon: "⊞", label: "All Templates", count: 48, color: "#7c5cfc" },
  { icon: "💬", label: "Customer Support", count: 12, color: "#a78bfa" },
  { icon: "👥", label: "Lead Generation", count: 8, color: "#7c5cfc" },
  { icon: "🛒", label: "E-commerce", count: 9, color: "#a78bfa" },
  { icon: "🔧", label: "Internal Tools", count: 7, color: "#7c5cfc" },
  { icon: "📣", label: "Marketing", count: 6, color: "#a78bfa" },
];

interface Props {
  filters: TemplateFilters;
  onFilterChange: (f: TemplateFilters) => void;
}

const TemplateCategories: React.FC<Props> = ({ filters, onFilterChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const activeLabel =
    filters.category === "All Categories" ? "All Templates" : filters.category;

  const handleClick = (label: string) => {
    const mapped = label === "All Templates" ? "All Categories" : label;
    onFilterChange({ ...filters, category: mapped });
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        .tc-fade { animation: fadeUp 0.55s ease forwards; }
        .cat-card {
          border:1px solid rgba(255,255,255,0.07);
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          cursor:pointer;
        }
        .cat-card:hover { transform:translateY(-4px); border-color:rgba(124,92,252,0.4); background:rgba(124,92,252,0.08)!important; box-shadow:0 8px 28px rgba(124,92,252,0.18); }
        .cat-card.cat-active { border-color:rgba(124,92,252,0.6)!important; background:rgba(124,92,252,0.14)!important; box-shadow:0 6px 24px rgba(124,92,252,0.25)!important; }
        .cat-card:hover .cat-icon, .cat-card.cat-active .cat-icon { transform:scale(1.15) rotate(-5deg); }
        .cat-icon { transition:transform 0.28s ease; }
      `}</style>

      <div ref={ref} className="pb-8">
        <div
          className={`mb-5 flex items-center justify-between ${visible ? "tc-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <h2 className="text-[clamp(16px,2vw,20px)] font-bold text-white">
            Categories
          </h2>
          <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] flex items-center gap-1">
            View all categories →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c, i) => (
            <div
              key={i}
              onClick={() => handleClick(c.label)}
              className={`cat-card rounded-2xl bg-white/4 p-4 ${activeLabel === c.label ? "cat-active" : ""} ${visible ? "tc-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <div
                className="cat-icon mb-3 flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
                style={{
                  background: `${c.color}22`,
                  border: `1px solid ${c.color}44`,
                }}
              >
                {c.icon}
              </div>
              <p className="text-[13px] font-semibold text-white leading-snug">
                {c.label}
              </p>
              <p className="mt-0.5 text-[11px] text-gray-600">
                {c.count} templates
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TemplateCategories;
