/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ProfileModalManager, type ModalType } from "./ProfileModals";

const navItems = [
  { icon: "🏠", label: "Home", id: "home" },
  { icon: "🤖", label: "AI Employees", id: "ai-employees" },
  { icon: "💬", label: "Conversations", id: "conversations", badge: 24 },
  { icon: "⚡", label: "Automations", id: "automations" },
  { icon: "📊", label: "Analytics", id: "analytics" },
  { icon: "🔗", label: "Integrations", id: "integrations" },
  { icon: "📚", label: "Knowledge Base", id: "knowledge-base" },
  { icon: "⚙️", label: "Settings", id: "settings" },
  { icon: "📬", label: "Contact", id: "contact" },
  {
    icon: "ℹ️",
    label: "About",
    id: "about",
    hasArrow: true,
    children: [
      { icon: "🆕", label: "What's New", id: "whats-new" },
      { icon: "🗺️", label: "Roadmap", id: "roadmap" },
      { icon: "🔒", label: "Privacy Policy", id: "privacy-policy" },
      { icon: "📋", label: "Terms of Service", id: "terms" },
      { icon: "📬", label: "Contact", id: "contact" },
      { icon: "❓", label: "Help Center", id: "help-center" },
    ],
  },
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>(["about"]);

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
        @keyframes dropdownUp { from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);} }
        .profile-dropdown { animation: dropdownUp 0.25s cubic-bezier(0.34,1.2,0.64,1) forwards; }
        .profile-item { transition: background 0.18s ease; }
        .profile-item:hover { background: rgba(124,92,252,0.1); }
        .profile-item:hover span:last-child { color: #a78bfa; }
        .profile-item-danger { transition: background 0.18s ease; }
        .profile-item-danger:hover { background: rgba(248,113,113,0.08); }
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
            <div key={item.id}>
              <div
                onClick={() => {
                  if ((item as any).children) {
                    setExpandedItems((prev) =>
                      prev.includes(item.id)
                        ? prev.filter((x) => x !== item.id)
                        : [...prev, item.id],
                    );
                  } else {
                    onNavigate(item.id);
                  }
                }}
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
                {(item as any).badge && !collapsed && (
                  <span className="badge-pulse flex h-5 min-w-5 items-center justify-center rounded-full bg-[#7c5cfc] px-1.5 text-[10px] font-bold text-white">
                    {(item as any).badge}
                  </span>
                )}
                {(item as any).children && !collapsed && (
                  <span
                    className={`text-[10px] text-gray-600 transition-transform duration-200 ${expandedItems.includes(item.id) ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                )}
                {(item as any).badge && collapsed && (
                  <div className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#7c5cfc]" />
                )}
                {collapsed && hoveredItem === item.id && (
                  <div className="ds-tooltip">
                    {item.label}
                    {(item as any).badge ? ` (${(item as any).badge})` : ""}
                  </div>
                )}
              </div>

              {/* Children submenu */}
              {(item as any).children &&
                expandedItems.includes(item.id) &&
                !collapsed && (
                  <div className="ml-3 mt-0.5 mb-1 border-l border-white/8 pl-3">
                    {(item as any).children.map((child: any) => (
                      <div
                        key={child.id}
                        onClick={() => onNavigate(child.id)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] cursor-pointer transition-all hover:bg-[#7c5cfc]/10 ${active === child.id ? "text-[#a78bfa] font-semibold" : "text-gray-500 hover:text-white"}`}
                      >
                        <span className="text-sm">{child.icon}</span>
                        <span>{child.label}</span>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div
          className={`relative border-t border-white/8 p-2 ${collapsed ? "flex justify-center" : ""}`}
        >
          <div
            onClick={() => setProfileOpen((o) => !o)}
            className={`flex items-center gap-2.5 rounded-xl p-2 transition-all cursor-pointer border ${profileOpen ? "border-[#7c5cfc]/50 bg-[#7c5cfc]/10" : "border-transparent hover:bg-white/5"} ${collapsed ? "" : ""}`}
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
            {!collapsed && (
              <span
                className={`text-gray-500 text-xs transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            )}
          </div>

          {/* Profile dropdown */}
          {profileOpen && !collapsed && (
            <div
              className="profile-dropdown absolute bottom-full left-2 right-2 mb-2 z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0b1f] shadow-2xl"
              style={{
                boxShadow:
                  "0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,92,252,0.15)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7c5cfc] text-[14px] font-bold text-white ring-2 ring-[#7c5cfc]/40">
                    M
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white leading-none">
                      Mohsen
                    </p>
                    <p className="mt-0.5 text-[10px] text-gray-500">Owner</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="text-gray-600 hover:text-white transition-colors text-sm"
                >
                  ∧
                </button>
              </div>

              {/* Plan */}
              <div className="border-b border-white/8 px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">👑</span>
                    <span className="text-[12px] font-bold text-white">
                      Pro Plan
                    </span>
                  </div>
                  <button className="rounded-lg border border-[#7c5cfc]/40 px-2.5 py-0.5 text-[11px] font-bold text-[#a78bfa] hover:bg-[#7c5cfc]/15 transition-all">
                    Upgrade
                  </button>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#7c5cfc] to-[#a78bfa]"
                    style={{ width: "62%" }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-gray-500">
                  12,450 / 20,000 Credits used
                </p>
              </div>

              {/* Quick Access */}
              <div className="px-3 py-2">
                <p className="mb-1.5 px-2 text-[9px] font-bold tracking-widest text-gray-600">
                  QUICK ACCESS
                </p>
                {[
                  {
                    icon: "👤",
                    label: "My Profile",
                    desc: "View and edit your profile",
                  },
                  {
                    icon: "⚙️",
                    label: "Account Settings",
                    desc: "Manage your account preferences",
                  },
                  {
                    icon: "💳",
                    label: "Billing & Subscription",
                    desc: "View invoices and manage subscription",
                  },
                  {
                    icon: "📊",
                    label: "Usage & Limits",
                    desc: "Monitor your usage and limits",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="profile-item flex items-center gap-3 rounded-xl px-2 py-2.5 cursor-pointer"
                    onClick={() => {
                      setProfileOpen(false);
                      const map: ModalType[] = [
                        "profile",
                        "account",
                        "billing",
                        "usage",
                      ];
                      setActiveModal(map[i]);
                    }}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-base">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-gray-600 text-xs">›</span>
                  </div>
                ))}

                {/* Divider */}
                <div className="my-1 border-t border-white/8" />

                {/* Quick command */}
                <div className="profile-item flex items-center gap-3 rounded-xl px-2 py-2.5 cursor-pointer">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-base">
                    ⌘
                  </div>
                  <span className="flex-1 text-[12px] font-semibold text-white">
                    Quick command
                  </span>
                  <span className="flex items-center gap-0.5 rounded bg-white/8 px-1.5 py-0.5 text-[10px] text-[#a78bfa] font-semibold">
                    ⌘ K
                  </span>
                </div>

                {/* Sign out */}
                <div className="profile-item-danger flex items-center gap-3 rounded-xl px-2 py-2.5 cursor-pointer">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-base">
                    ↪️
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-red-400">
                      Sign out
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Sign out of your account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
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

      {/* Profile Modals */}
      <ProfileModalManager
        modal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
};

export default DashboardSidebar;
