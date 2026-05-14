import React, { useState } from "react";

const navGroups = [
  {
    label: "GET STARTED",
    items: [
      { icon: "🏠", label: "Introduction" },
      { icon: "⚡", label: "Quick Start" },
      { icon: "📦", label: "Installation" },
      { icon: "📋", label: "Changelog" },
    ],
  },
  {
    label: "GUIDES",
    items: [
      { icon: "🤖", label: "AI Chatbot" },
      { icon: "🧠", label: "Knowledge Base" },
      { icon: "🔗", label: "Integrations" },
      { icon: "⚙️", label: "Workflows" },
      { icon: "📊", label: "Analytics" },
      { icon: "👤", label: "User Management" },
    ],
  },
  {
    label: "API REFERENCE",
    items: [
      { icon: "🌐", label: "Overview" },
      { icon: "🔐", label: "Authentication" },
      { icon: "📡", label: "Endpoints" },
      { icon: "🪝", label: "Webhooks" },
      { icon: "❌", label: "Error Codes" },
      { icon: "🛠️", label: "SDKs" },
    ],
  },
  {
    label: "RESOURCES",
    items: [
      { icon: "✅", label: "Best Practices" },
      { icon: "🎓", label: "Guides & Tutorials" },
      { icon: "📄", label: "Templates", active: true },
      { icon: "❓", label: "FAQ" },
    ],
  },
];

const TemplateSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Templates");
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? navGroups
        .map((g) => ({
          ...g,
          items: g.items.filter((i) =>
            i.label.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter((g) => g.items.length > 0)
    : navGroups;

  return (
    <>
      <style>{`
        .ts-item { transition: background 0.2s ease, padding-left 0.2s ease; cursor: pointer; }
        .ts-item:hover { background: rgba(124,92,252,0.1); }
        .ts-item.ts-active { background: rgba(124,92,252,0.18); border-left: 2px solid #7c5cfc; }
        .ts-search:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.1); }
        .ts-scroll::-webkit-scrollbar { width:3px; }
        .ts-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.3); border-radius:4px; }
      `}</style>

      <aside className="flex h-screen w-50 shrink-0 flex-col border-r border-white/8 bg-[#07050f]">
        <div className="border-b border-white/8 px-4 py-3">
          <p className="text-[10px] font-bold tracking-widest text-gray-600">
            DOCUMENTATION
          </p>
        </div>

        <div className="px-3 py-2.5">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-600">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ts-search w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-7 pr-8 text-[12px] text-gray-300 placeholder-gray-600 transition-all"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1 text-[9px] text-gray-600">
              ⌘K
            </span>
          </div>
        </div>

        <nav className="ts-scroll flex-1 overflow-y-auto px-2 pb-3">
          {filtered.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="mb-1 px-3 text-[9px] font-bold tracking-wider text-gray-600">
                {group.label}
              </p>
              {group.items.map((item) => (
                <div
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`ts-item flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] ${
                    activeItem === item.label
                      ? "ts-active text-[#a78bfa]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-xl border border-white/8 bg-white/4 p-3">
          <p className="text-[11px] font-bold text-white">Need help?</p>
          <p className="mt-0.5 text-[10px] leading-snug text-gray-500">
            Can't find what you're looking for? We're here to help.
          </p>
          <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-[#7c5cfc] py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#6b4ce0] hover:-translate-y-0.5">
            🎧 Contact Support
          </button>
        </div>
      </aside>
    </>
  );
};

export default TemplateSidebar;
