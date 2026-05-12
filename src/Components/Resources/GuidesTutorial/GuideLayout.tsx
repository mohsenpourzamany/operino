import React from "react";
import GuideSidebar from "./GuideSidebar";
import GuideHero from "./GuideHero";
import GuidePopularGuides from "./GuidePopularGuides";
import GuideVideoTutorials from "./GuideVideoTutorials";
import GuideLearningPath from "./GuideLearningPath";

const GuideLayout: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .guide-layout { font-family: 'DM Sans', sans-serif; }
        .guide-main::-webkit-scrollbar { width:4px; }
        .guide-main::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
        .guide-rp::-webkit-scrollbar { width:3px; }
        .guide-rp::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.2); border-radius:4px; }
        .section-divider { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0 0 28px; }
      `}</style>

      <div className="guide-layout flex h-screen w-full overflow-hidden bg-[#07050f]">
        {/* Left Sidebar — sticky */}
        <div className="sticky top-0 h-screen shrink-0">
          <GuideSidebar />
        </div>

        {/* Main — scrollable */}
        <main className="guide-main flex-1 overflow-y-auto px-[clamp(16px,3vw,40px)] py-7">
          <GuideHero />
          <hr className="section-divider" />
          <GuidePopularGuides />
          <hr className="section-divider" />
          <GuideVideoTutorials />
        </main>

        {/* Right Sidebar — sticky */}
        <div className="sticky top-0 h-screen shrink-0">
          <GuideLearningPath />
        </div>
      </div>
    </>
  );
};

export default GuideLayout;
