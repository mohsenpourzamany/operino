/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import opitemplate from "../../../assets/Photos/Opi-Template-1.png";
export interface TemplateFilters {
  category: string;
  useCase: string;
  integration: string;
  search: string;
}

interface Props {
  filters: TemplateFilters;
  onFilterChange: (f: TemplateFilters) => void;
}

const categories = [
  "All Categories",
  "Customer Support",
  "Lead Generation",
  "E-commerce",
  "Internal Tools",
  "Marketing",
];
const useCases = [
  "All Use Cases",
  "Automation",
  "Analytics",
  "Customer Service",
  "Sales",
  "HR",
];
const integrations = [
  "All Integrations",
  "Slack",
  "WhatsApp",
  "Gmail",
  "HubSpot",
  "Shopify",
];

const DropdownSelect: React.FC<{
  value: string;
  options: string[];
  onChange: (v: string) => void;
}> = ({ value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3 py-2 text-[12px] font-medium text-gray-300 transition-all hover:border-[#7c5cfc]/50 hover:bg-[#7c5cfc]/10"
      >
        {value}{" "}
        <span
          className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 min-w-40 overflow-hidden rounded-xl border border-white/10 bg-[#120e2a] shadow-xl shadow-black/40">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 text-[12px] transition-all hover:bg-[#7c5cfc]/15 ${value === opt ? "text-[#a78bfa] font-semibold" : "text-gray-400"}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const TemplateHero: React.FC<Props> = ({ filters, onFilterChange }) => {
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
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleClear = () =>
    onFilterChange({
      category: "All Categories",
      useCase: "All Use Cases",
      integration: "All Integrations",
      search: "",
    });

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        .th-fade { animation: fadeUp 0.6s ease forwards; }
        @keyframes robotFloat { 0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(1deg);} }
        .robot-float { animation: robotFloat 4s ease-in-out infinite; }
        @keyframes iconFloat { 0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-8px) scale(1.08);} }
        @keyframes gradShift { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }
        .th-title {
          background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 5s ease infinite;
        }
        .th-search:focus { outline:none; border-color:rgba(124,92,252,0.7); box-shadow:0 0 0 3px rgba(124,92,252,0.12); }
      `}</style>

      <div
        ref={ref}
        className="relative flex flex-wrap items-start justify-between gap-4 pb-8"
      >
        {/* Breadcrumb */}
        <div
          className={`w-full text-[11px] text-gray-600 ${visible ? "th-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          Home <span className="mx-1">›</span> Resources{" "}
          <span className="mx-1">›</span>
          <span className="text-[#a78bfa]">Templates</span>
        </div>

        {/* Left */}
        <div className="flex-1 min-w-60">
          <div
            className={`flex items-center gap-3 ${visible ? "th-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="th-title font-['DM_Sans'] text-[clamp(28px,4vw,46px)] font-bold">
              Templates
            </h1>
            <span className="rounded-full bg-[#7c5cfc]/25 px-2.5 py-0.5 text-[11px] font-bold text-[#a78bfa] ring-1 ring-[#7c5cfc]/40">
              Beta
            </span>
          </div>
          <p
            className={`mt-2 max-w-md text-[clamp(12px,1.4vw,14px)] leading-relaxed text-gray-400 ${visible ? "th-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.18s" }}
          >
            Use pre-built templates to quickly build powerful AI chatbots,
            <br />
            automations, and workflows.
          </p>

          {/* Search */}
          <div
            className={`relative mt-4 max-w-sm ${visible ? "th-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.28s" }}
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search templates..."
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
              className="th-search w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-12 text-[13px] text-gray-200 placeholder-gray-600 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-gray-500">
              ⌘K
            </span>
          </div>

          {/* Filters */}
          <div
            className={`mt-3 flex flex-wrap items-center gap-2 ${visible ? "th-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.38s" }}
          >
            <DropdownSelect
              value={filters.category}
              options={categories}
              onChange={(v) => onFilterChange({ ...filters, category: v })}
            />
            <DropdownSelect
              value={filters.useCase}
              options={useCases}
              onChange={(v) => onFilterChange({ ...filters, useCase: v })}
            />
            <DropdownSelect
              value={filters.integration}
              options={integrations}
              onChange={(v) => onFilterChange({ ...filters, integration: v })}
            />
            <button
              onClick={handleClear}
              className="text-[12px] font-medium text-gray-500 hover:text-[#a78bfa] transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right: Robot */}
        <div
          className={`relative shrink-0 ${visible ? "th-fade" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {[
            { emoji: "💬", top: "5%", left: "-8%", delay: "0s" },
            { emoji: "🗂️", top: "3%", right: "-4%", delay: "0.5s" },
            { emoji: "📄", bottom: "18%", right: "-2%", delay: "1s" },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7c5cfc]/30 bg-[#120e2a]/80 text-xl backdrop-blur-sm"
              style={{
                top: b.top,
                left: (b as any).left,
                right: (b as any).right,
                bottom: (b as any).bottom,
                animation: "iconFloat 3s ease-in-out infinite",
                animationDelay: b.delay,
              }}
            >
              {b.emoji}
            </div>
          ))}
          <div className="absolute bottom-0 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-[#7c5cfc]/25 blur-2xl" />
          <img
            src={opitemplate}
            alt="Template Robot"
            className="robot-float relative z-10 w-[clamp(150px,20vw,240px)] drop-shadow-[0_16px_40px_rgba(124,92,252,0.5)]"
          />
        </div>
      </div>
    </>
  );
};

export default TemplateHero;
