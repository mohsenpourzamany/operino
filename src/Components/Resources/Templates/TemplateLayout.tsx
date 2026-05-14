import React, { useState } from "react";
import TemplateSidebar from "./TemplateSidebar";
import TemplateHero from "./TemplateHero";
import TemplateCategories from "./TemplateCategories";
import TemplatePopular from "./TemplatePopular";
import TemplateCTA from "./TemplateCTA";
import type { TemplateFilters } from "./TemplateHero";

const TemplateLayout: React.FC = () => {
  const [filters, setFilters] = useState<TemplateFilters>({
    category: "All Categories",
    useCase: "All Use Cases",
    integration: "All Integrations",
    search: "",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .tl-wrap { font-family: 'DM Sans', sans-serif; }
        .tl-main::-webkit-scrollbar { width:4px; }
        .tl-main::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
        .sec-divider { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0 0 28px; }
      `}</style>

      <div className="tl-wrap flex h-screen w-full overflow-hidden bg-[#07050f]">
        {/* Left sidebar */}
        <div className="sticky top-0 h-screen shrink-0">
          <TemplateSidebar />
        </div>

        {/* Main scrollable */}
        <main className="tl-main flex-1 overflow-y-auto px-[clamp(16px,3vw,40px)] py-6">
          <TemplateHero filters={filters} onFilterChange={setFilters} />
          <hr className="sec-divider" />
          <TemplateCategories filters={filters} onFilterChange={setFilters} />
          <hr className="sec-divider" />
          <TemplatePopular filters={filters} />
          <hr className="sec-divider" />
          <TemplateCTA />
          <div className="h-8" />
        </main>
      </div>
    </>
  );
};

export default TemplateLayout;
