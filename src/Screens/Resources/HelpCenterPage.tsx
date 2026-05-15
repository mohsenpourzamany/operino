import React, { useState } from "react";
import HelpHero from "../../Components/Resources/HelpCenter/HelpHero";
import HelpCategories from "../../Components/Resources/HelpCenter/HelpCategories";
import HelpContent from "../../Components/Resources/HelpCenter/HelpContent";
import HelpCTA from "../../Components/Resources/HelpCenter/HelpCTA";

const HelpCenterPage: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .hcp-wrap { font-family:'DM Sans',sans-serif; }
        .hcp-scroll::-webkit-scrollbar { width:4px; }
        .hcp-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
        .sec-div { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0 0 28px; }
      `}</style>

      <div className="hcp-wrap hcp-scroll min-h-screen w-full overflow-y-auto bg-[#07050f]">
        <div className="mx-auto max-w-5xl px-[clamp(16px,4vw,48px)] py-8">
          <HelpHero search={search} onSearch={setSearch} />
          <hr className="sec-div" />
          <HelpCategories />
          <hr className="sec-div" />
          <HelpContent search={search} />
          <hr className="sec-div" />
          <HelpCTA />
          <div className="h-8" />
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage;
