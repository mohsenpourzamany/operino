import React, { useState } from "react";

const navItems = [
  { icon: "🏠", label: "Home", id: "home" },
  { icon: "🤖", label: "AI Employees", id: "ai-employees" },
  { icon: "💬", label: "Conversations", id: "conversations", badge: 24 },
  { icon: "⚡", label: "Automations", id: "automations" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "🔗", label: "Integrations", id: "integrations" },
  { icon: "📚", label: "Knowledge Base", id: "knowledge-base" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

interface Props {
  active: string;
  onNavigate: (id: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<Props> = ({
  active,
  onNavigate,
  collapsed,
  onToggle,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .ds-item { transition: background 0.2s ease, color 0.2s ease, padding 0.2s ease; cursor: pointer; position: relative; }
        .ds-item:hover { background: rgba(124,92,252,0.1); }
        .ds-item.ds-active { background: rgba(124,92,252,0.18); }
        .ds-item.ds-active::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:60%; background:#7c5cfc; border-radius:0 3px 3px 0; }
        .ds-tooltip {
          position: absolute; left: calc(100% + 12px); top: 50%; transform: translateY(-50%);
          background: #1a1535; border: 1px solid rgba(124,92,252,0.3); color: white;
          padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;
          white-space: nowrap; pointer-events: none; z-index: 100;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .ds-tooltip::before { content:''; position:absolute; right:100%; top:50%; transform:translateY(-50%); border:5px solid transparent; border-right-color:#1a1535; }
        .sidebar-transition { transition: width 0.3s cubic-bezier(0.4,0,0.2,1); }
        .label-transition { transition: opacity 0.2s ease, width 0.3s ease; overflow: hidden; white-space: nowrap; }
        .toggle-btn { transition: background 0.2s ease, transform 0.3s ease; }
        .toggle-btn:hover { background: rgba(124,92,252,0.15); }
        .plan-bar { background: linear-gradient(90deg, #7c5cfc, #a78bfa); border-radius: 4px; height: 4px; }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.4);}50%{box-shadow:0 0 0 5px rgba(124,92,252,0);} }
        .badge-pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <aside
        className={`sidebar-transition relative flex h-screen shrink-0 flex-col border-r border-white/8 bg-[#08060f] ${collapsed ? "w-16" : "w-50"}`}
      >
        {/* Logo */}
        <div
          className={`flex h-14 shrink-0 items-center border-b border-white/8 px-3 ${collapsed ? "justify-center" : "gap-2.5"}`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7c5cfc]/25 text-base ring-1 ring-[#7c5cfc]/40">
            🤖
          </div>
          <span
            className={`label-transition text-[15px] font-bold text-white ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
          >
            Operino
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`ds-item flex items-center gap-3 rounded-xl px-2.5 py-2.5 ${active === item.id ? "ds-active text-white" : "text-gray-400 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
            >
              <span className="shrink-0 text-[17px]">{item.icon}</span>
              <span
                className={`label-transition flex-1 text-[13px] font-medium ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
              >
                {item.label}
              </span>
              {item.badge && !collapsed && (
                <span className="badge-pulse flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7c5cfc] px-1.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && (
                <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#7c5cfc]" />
              )}
              {/* Tooltip when collapsed */}
              {collapsed && hoveredItem === item.id && (
                <div className="ds-tooltip">
                  {item.label}
                  {item.badge ? ` (${item.badge})` : ""}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div
          className={`border-t border-white/8 p-2 ${collapsed ? "flex justify-center" : ""}`}
        >
          <div
            className={`flex items-center gap-2.5 rounded-xl p-2 transition-all hover:bg-white/5 cursor-pointer ${collapsed ? "" : ""}`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7c5cfc] text-[13px] font-bold text-white ring-2 ring-[#7c5cfc]/40">
              M
            </div>
            <div
              className={`label-transition flex-1 ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}
            >
              <p className="text-[12px] font-semibold text-white leading-none">
                Mohsen
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">Owner</p>
            </div>
            {!collapsed && <span className="text-gray-600 text-xs">▾</span>}
          </div>
        </div>

        {/* Plan */}
        {!collapsed && (
          <div className="border-t border-white/8 px-3 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-gray-400">
                Pro Plan
              </span>
              <button className="text-[11px] font-bold text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">
                Upgrade
              </button>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
              <div className="plan-bar" style={{ width: "62%" }} />
            </div>
            <p className="mt-1 text-[10px] text-gray-600">
              12,450 / 20,000 Credits used
            </p>
          </div>
        )}

        {/* Quick command */}
        {!collapsed && (
          <div className="border-t border-white/8 px-3 py-2">
            <div className="flex items-center gap-1.5 rounded-lg bg-white/4 px-2.5 py-1.5 cursor-pointer hover:bg-white/8 transition-all">
              <span className="text-[11px] text-gray-600">⌘⌘</span>
              <span className="flex-1 text-[11px] text-gray-500">
                Quick command
              </span>
              <span className="rounded bg-white/10 px-1 text-[9px] text-gray-600">
                ⌘K
              </span>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="toggle-btn absolute -right-3 top-18 flex h-6 w-6 items-center justify-center rounded-full border border-white/15 bg-[#0d0b1f] text-[11px] text-gray-400 hover:text-white z-10"
          style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ‹
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
