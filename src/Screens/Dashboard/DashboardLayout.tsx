import React, { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import DashboardHome from "./DashboardHome";
import DashboardAIEmployees from "./DashboardAIEmployees";
import DashboardConversations from "./DashboardConversations";
import DashboardAutomations from "./DashboardAutomations";
import DashboardAnalytics from "./DashboardAnalytics";
import DashboardIntegrations from "./DashboardIntegrations";
import DashboardKnowledgeBase from "./DashboardKnowledgeBase";
import SettingsLayout from "./SettingsLayout";

// Placeholder for pages not yet built
const ComingSoon: React.FC<{ page: string }> = ({ page }) => (
  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
    <span className="text-5xl">🚧</span>
    <p className="text-[18px] font-bold text-white">{page}</p>
    <p className="text-[13px] text-gray-500">This page is coming soon.</p>
  </div>
);

const DashboardLayout: React.FC = () => {
  const [activePage, setActivePage] = useState("home");
  const [collapsed, setCollapsed] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "home": return <DashboardHome />;
      case "ai-employees": return <DashboardAIEmployees />;
      case "conversations": return <DashboardConversations />;
      case "automations": return <DashboardAutomations />;
      case "analytics": return <DashboardAnalytics />;
      case "integrations": return <DashboardIntegrations />;
      case "knowledge-base": return <DashboardKnowledgeBase />;
      case "settings": return <SettingsLayout />;
      default: return <ComingSoon page={activePage.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        .dl-wrap { font-family: 'DM Sans', sans-serif; }
        .page-scroll::-webkit-scrollbar { width: 4px; }
        .page-scroll::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.2); border-radius: 4px; }
        @keyframes pageIn { from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);} }
        .page-in { animation: pageIn 0.35s ease forwards; }
      `}</style>

      <div className="dl-wrap flex h-screen w-screen overflow-hidden bg-[#07050f]" style={{fontFamily:"'DM Sans',sans-serif"}}>
        {/* Sidebar */}
        <DashboardSidebar
          active={activePage}
          onNavigate={(id) => setActivePage(id)}
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        />

        {/* Main */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <div key={activePage} className="page-in page-scroll flex-1 overflow-y-auto">
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
