import React, { useState } from "react";
import BlogHero from "./BlogHero";
import BlogFeatured from "./BlogFeatured";
import BlogLatest from "./BlogLatest";
import BlogCTA from "./BlogCTA";

const BlogsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Articles");
  const [search, setSearch] = useState("");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .blogs-page { font-family:'DM Sans',sans-serif; }
        .blogs-scroll::-webkit-scrollbar { width:4px; }
        .blogs-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
        .sec-div { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0 0 32px; }
      `}</style>

      <div className="blogs-page blogs-scroll min-h-screen w-full overflow-y-auto ">
        <div className="mx-auto max-w-5xl px-[clamp(16px,4vw,48px)] py-8">
          <BlogHero
            activeTab={activeTab}
            onTabChange={setActiveTab}
            search={search}
            onSearchChange={setSearch}
          />
          <hr className="sec-div" />
          <BlogFeatured />
          <hr className="sec-div" />
          <BlogLatest search={search} activeTab={activeTab} />
          <hr className="sec-div" />
          <BlogCTA />
          <div className="h-10" />
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
