import React, { useState } from "react";

const navItems = [
  { icon: "🏠", label: "Get Started", hasArrow: true, expanded: false },
  {
    icon: "📖", label: "Guides & Tutorials", hasArrow: true, expanded: true,
    children: [
      { icon: "•", label: "All Guides", active: true },
      { icon: "▶️", label: "Video Tutorials" },
      { icon: "🔄", label: "Step-by-Step" },
      { icon: "✅", label: "Best Practices" },
    ],
  },
  { icon: "🔌", label: "API Reference", hasArrow: true },
  { icon: "🔗", label: "Integrations", hasArrow: true },
  { icon: "🛠️", label: "SDKs", hasArrow: true },
  { icon: "📋", label: "Changelog" },
];

const GuideSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState("All Guides");
  const [expanded, setExpanded] = useState<string[]>(["Guides & Tutorials"]);
  const [search, setSearch] = useState("");

  const toggleExpand = (label: string) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  return (
    <>
      <style>{`
        .gs-item { transition: background 0.2s ease, padding-left 0.2s ease; cursor: pointer; }
        .gs-item:hover { background: rgba(124,92,252,0.1); }
        .gs-item.gs-active { background: rgba(124,92,252,0.18); border-left: 2px solid #7c5cfc; }
        .gs-child { transition: background 0.2s ease; cursor: pointer; }
        .gs-child:hover { background: rgba(124,92,252,0.08); }
        .gs-child.gs-active { color: #a78bfa; font-weight: 600; }
        .gs-search:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.1); }
        .gs-scroll::-webkit-scrollbar { width:3px; }
        .gs-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.3); border-radius:4px; }
      `}</style>

      <aside className="flex h-screen w-[200px] flex-shrink-0 flex-col border-r border-white/8 bg-[#07050f]">
        {/* Logo */}
        <div className="border-b border-white/8 px-4 py-3">
          <p className="text-[10px] font-bold tracking-widest text-gray-600">DOCUMENTATION</p>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-gray-600">🔍</span>
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="gs-search w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pl-7 pr-8 text-[12px] text-gray-300 placeholder-gray-600 transition-all"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1 text-[9px] text-gray-600">⌘K</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="gs-scroll flex-1 overflow-y-auto px-2 pb-3">
          {navItems.map((item) => (
            <div key={item.label}>
              <div
                className={`gs-item flex items-center justify-between rounded-lg px-3 py-2 text-[12px] ${
                  activeItem === item.label && !item.children ? "gs-active text-[#a78bfa]" : "text-gray-400 hover:text-white"
                }`}
                onClick={() => {
                  if (item.children) toggleExpand(item.label);
                  else setActiveItem(item.label);
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.hasArrow && (
                  <span className={`text-[10px] transition-transform duration-200 ${expanded.includes(item.label) ? "rotate-90" : ""}`}>›</span>
                )}
              </div>

              {/* Children */}
              {item.children && expanded.includes(item.label) && (
                <div className="ml-3 mt-0.5 mb-1 border-l border-white/8 pl-3">
                  {item.children.map((child) => (
                    <div
                      key={child.label}
                      onClick={() => setActiveItem(child.label)}
                      className={`gs-child rounded-lg px-2 py-1.5 text-[12px] ${
                        activeItem === child.label ? "gs-active text-[#a78bfa]" : "text-gray-500 hover:text-white"
                      }`}
                    >
                      {child.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Need Help */}
        <div className="m-3 rounded-xl border border-white/8 bg-white/4 p-3">
          <p className="text-[12px] font-bold text-white">Need help?</p>
          <p className="mt-0.5 text-[10px] leading-snug text-gray-500">Can't find what you're looking for? We're here to help.</p>
          <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg bg-[#7c5cfc] py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-[#6b4ce0]">
            🎧 Contact Support
          </button>
        </div>
      </aside>
    </>
  );
};

export default GuideSidebar;
