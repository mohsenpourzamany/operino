import React from "react";
import DocsSidebar from "./DocsSidebar";
import DocsHero from "./DocsHero";
import DocsQuickStart from "./DocsQuickStart";
import DocsGuides from "./DocsGuides";
import DocsApiReference from "./DocsApiReference";

const DocsLayout: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .docs-layout { font-family: 'DM Sans', sans-serif; }

        /* Scrollbar for main */
        .docs-main::-webkit-scrollbar { width: 5px; }
        .docs-main::-webkit-scrollbar-track { background: transparent; }
        .docs-main::-webkit-scrollbar-thumb { background: rgba(124,92,252,0.25); border-radius: 4px; }

        /* Section divider */
        .section-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0 0 32px;
        }
      `}</style>

      <div className="docs-layout flex h-screen w-full overflow-hidden bg-[#080614]">
        {/* Sidebar — sticky, full height */}
        <div className="sticky top-0 h-screen shrink-0">
          <DocsSidebar />
        </div>

        {/* Main content — scrollable */}
        <main className="docs-main flex-1 overflow-y-auto px-[clamp(20px,4vw,52px)] py-8">
          {/* Hero */}
          <DocsHero />

          <hr className="section-divider" />

          {/* Quick Start */}
          <DocsQuickStart />

          <hr className="section-divider" />

          {/* Guides */}
          <DocsGuides />

          <hr className="section-divider" />

          {/* API Reference */}
          <DocsApiReference />
        </main>
      </div>
    </>
  );
};

export default DocsLayout;
