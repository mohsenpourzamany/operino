import React, { useState } from "react";
import SettingsGeneral from "./SettingsGeneral";
import SettingsTeamMembers from "./SettingsTeamMembers";
import SettingsRolesPermissions from "./SettingsRolesPermissions";
import SettingsAIEmployees from "./SettingsAIEmployees";
import SettingsBilling from "./SettingsBilling";
import SettingsUsageLimits from "./SettingsUsageLimits";
import SettingsAppearance from "./SettingsAppearance";
import SettingsNotifications from "./SettingsNotifications";
import SettingsSecurity from "./SettingsSecurity";
import SettingsAPIWebhooks from "./SettingsAPIWebhooks";
import SettingsDataPrivacy from "./SettingsDataPrivacy";
import SettingsIntegrations from "./SettingsIntegrations";
import SettingsWorkspace from "./SettingsWorkspace";
import SettingsAdvanced from "./SettingsAdvanced";
import SettingsDangerZone from "./SettingsDangerZone";

const settingsNav = [
  { id: "general", label: "General" },
  { id: "team-members", label: "Team & Members" },
  { id: "roles-permissions", label: "Roles & Permissions" },
  { id: "ai-employees-settings", label: "AI Employees Settings" },
  { id: "billing", label: "Billing & Subscription" },
  { id: "usage", label: "Usage & Limits" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "api-webhooks", label: "API & Webhooks" },
  { id: "data-privacy", label: "Data & Privacy" },
  { id: "integrations-settings", label: "Integrations Settings" },
  { id: "workspace", label: "Workspace Settings" },
  { id: "advanced", label: "Advanced" },
  { id: "danger-zone", label: "Danger Zone", danger: true },
];

const ComingSoon: React.FC<{ page: string }> = ({ page }) => (
  <div className="flex h-full flex-col items-center justify-center gap-3 text-center py-20">
    <span className="text-5xl">🚧</span>
    <p className="text-[18px] font-bold text-white">{page}</p>
    <p className="text-[13px] text-gray-500">Coming soon.</p>
  </div>
);

interface Props { onNavigateMain?: (page: string) => void; }

const SettingsLayout: React.FC<Props> = ({ onNavigateMain }) => {
  const [activeSetting, setActiveSetting] = useState("general");

  const renderPage = () => {
    switch (activeSetting) {
      case "general": return <SettingsGeneral />;
      case "team-members": return <SettingsTeamMembers />;
      case "roles-permissions": return <SettingsRolesPermissions />;
      case "ai-employees-settings": return <SettingsAIEmployees />;
      case "billing": return <SettingsBilling />;
      case "usage": return <SettingsUsageLimits />;
      case "appearance": return <SettingsAppearance />;
      case "notifications": return <SettingsNotifications />;
      case "security": return <SettingsSecurity />;
      case "api-webhooks": return <SettingsAPIWebhooks />;
      case "data-privacy": return <SettingsDataPrivacy />;
      case "integrations-settings": return <SettingsIntegrations />;
      case "workspace": return <SettingsWorkspace />;
      case "advanced": return <SettingsAdvanced />;
      case "danger-zone": return <SettingsDangerZone />;
      default: return <ComingSoon page={settingsNav.find(n => n.id === activeSetting)?.label || ""} />;
    }
  };

  return (
    <>
      <style>{`
        .sl-item { transition: background 0.2s ease, color 0.2s ease; cursor: pointer; border-left: 2px solid transparent; }
        .sl-item:hover { background: rgba(124,92,252,0.08); color: white; }
        .sl-item.sl-active { background: rgba(124,92,252,0.15); border-left-color: #7c5cfc; color: white; font-weight: 600; }
        .sl-item.sl-danger { color: #f87171 !important; }
        .sl-item.sl-danger:hover { background: rgba(248,113,113,0.08); }
        .settings-scroll::-webkit-scrollbar { width: 3px; }
        .settings-scroll::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.2); border-radius: 4px; }
      `}</style>

      <div className="flex h-full overflow-hidden">
        {/* Settings sub-nav */}
        <div className="settings-scroll w-[180px] flex-shrink-0 overflow-y-auto border-r border-white/8 bg-[#08060f] py-3">
          {settingsNav.map(item => (
            <div key={item.id}
              onClick={() => setActiveSetting(item.id)}
              className={`sl-item px-4 py-2 text-[12px] font-medium ${activeSetting === item.id ? "sl-active" : "text-gray-400"} ${item.danger ? "sl-danger mt-1" : ""}`}>
              {item.label}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="settings-scroll flex-1 overflow-y-auto">
          {renderPage()}
        </div>
      </div>
    </>
  );
};

export default SettingsLayout;
