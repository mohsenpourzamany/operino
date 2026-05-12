import React, { useState } from "react";

const navGroups = [
  {
    label: "GET STARTED",
    items: [
      { icon: "🏠", label: "Introduction", active: true, hasArrow: true },
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
      { icon: "🎓", label: "Tutorials" },
      { icon: "❓", label: "FAQ" },
    ],
  },
];

const DocsSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("Introduction");
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? navGroups.map((g) => ({
        ...g,
        items: g.items.filter((i) =>
          i.label.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((g) => g.items.length > 0)
    : navGroups;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .docs-sidebar { font-family: 'DM Sans', sans-serif; }

        .sidebar-item {
          transition: background 0.2s ease, color 0.2s ease, padding-left 0.2s ease;
          cursor: pointer;
        }
        .sidebar-item:hover {
          background: rgba(124,92,252,0.1);
          padding-left: 14px;
        }
        .sidebar-item.active-item {
          background: rgba(124,92,252,0.15);
          border-left: 2px solid #7c5cfc;
        }

        .sidebar-search:focus {
          outline: none;
          border-color: rgba(124,92,252,0.6);
          box-shadow: 0 0 0 3px rgba(124,92,252,0.1);
        }

        /* Custom scrollbar */
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.3); border-radius: 4px; }
      `}</style>

      <aside className="docs-sidebar flex h-full w-[220px] flex-shrink-0 flex-col border-r border-white/8 bg-[#080614]">
        {/* Logo */}
        <div className="flex items-center gap-2 border-b border-white/8 px-4 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7c5cfc]/20 text-sm">📖</div>
          <span className="text-[14px] font-semibold text-white">Documentation</span>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-500">🔍</span>
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sidebar-search w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-8 pr-10 text-[12px] text-gray-300 placeholder-gray-600 transition-all duration-200"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1 py-0.5 text-[9px] text-gray-500">⌘K</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-scroll flex-1 overflow-y-auto px-2 pb-4">
          {filtered.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="mb-1 px-3 text-[10px] font-semibold tracking-wider text-gray-600">
                {group.label}
              </p>
              {group.items.map((item) => (
                <div
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`sidebar-item flex items-center justify-between rounded-lg px-3 py-[7px] text-[13px] ${
                    activeItem === item.label
                      ? "active-item text-[#a78bfa]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {(item as any).hasArrow && (
                    <span className="text-[10px] text-gray-600">›</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Help box */}
        <div className="m-3 rounded-xl border border-white/8 bg-white/4 p-3">
          <p className="text-[12px] font-semibold text-white">Need help?</p>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
            Can't find what you're looking for? We're here to help.
          </p>
          <button className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7c5cfc] py-2 text-[12px] font-semibold text-white transition-all hover:bg-[#6b4ce0] hover:-translate-y-0.5">
            🎧 Contact Support
          </button>
        </div>
      </aside>
    </>
  );
};

export default DocsSidebar;
