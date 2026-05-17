import React, { useEffect, useState } from "react";

const categories = [
  { icon: "⊞", label: "All Categories", count: 156, active: true },
  { icon: "📁", label: "Getting Started", count: 18 },
  { icon: "📁", label: "Product Information", count: 24 },
  { icon: "📁", label: "Pricing & Plans", count: 12 },
  { icon: "📁", label: "Technical Support", count: 32 },
  { icon: "📁", label: "Integrations", count: 15 },
  { icon: "📁", label: "Billing & Payments", count: 10 },
  { icon: "📁", label: "Policies", count: 8 },
  { icon: "📁", label: "Use Cases", count: 14 },
  { icon: "📁", label: "Troubleshooting", count: 23 },
  { icon: "🗑️", label: "Archived", count: 6 },
];

const articles = [
  { title: "How to set up your AI Employee", desc: "Learn how to create and configure your first AI employee...", category: "Getting Started", categoryColor: "#22c55e", views: 512, helpful: "98%", updated: "2h ago" },
  { title: "Understanding Conversations", desc: "Everything you need to know about how conversations work...", category: "Product Information", categoryColor: "#3b82f6", views: 436, helpful: "97%", updated: "5h ago" },
  { title: "Connecting WhatsApp Business", desc: "Step-by-step guide to connect your WhatsApp Business...", category: "Integrations", categoryColor: "#f97316", views: 389, helpful: "95%", updated: "1d ago" },
  { title: "Pricing Plans Explained", desc: "Compare our plans and find the perfect fit for your business.", category: "Pricing & Plans", categoryColor: "#a78bfa", views: 312, helpful: "96%", updated: "1d ago" },
  { title: "How Automations Work", desc: "Create powerful workflows to automate repetitive tasks...", category: "Automations", categoryColor: "#ec4899", views: 289, helpful: "94%", updated: "2d ago" },
  { title: "Billing and Invoices", desc: "Learn how billing works and how to manage your invoices.", category: "Billing & Payments", categoryColor: "#f97316", views: 235, helpful: "95%", updated: "2d ago" },
  { title: "Resetting Your Password", desc: "Quick steps to reset or change your account password.", category: "Technical Support", categoryColor: "#22c55e", views: 198, helpful: "93%", updated: "3d ago" },
  { title: "Data Security at Operino", desc: "How we keep your data safe and secure.", category: "Policies", categoryColor: "#6b7280", views: 156, helpful: "98%", updated: "4d ago" },
];

const DashboardKnowledgeBase: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => { setVisible(true); }, []);

  const filtered = articles.filter(a =>
    (activeCategory === "All Categories" || a.category === activeCategory) &&
    (!search || a.title.toLowerCase().includes(search.toLowerCase()))
  );

  const article = articles[selectedArticle];

  return (
    <>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
        .kb-fade{animation:fadeUp 0.5s ease forwards;}
        .cat-item{transition:background 0.2s ease,color 0.2s ease;cursor:pointer;border-left:2px solid transparent;}
        .cat-item:hover{background:rgba(124,92,252,0.08);}
        .cat-item.cat-active{background:rgba(124,92,252,0.15);border-left-color:#7c5cfc;color:white;}
        .art-row{transition:background 0.2s ease,border-color 0.2s ease;cursor:pointer;}
        .art-row:hover{background:rgba(124,92,252,0.06);}
        .art-row.art-active{background:rgba(124,92,252,0.1);}
        .kb-btn{transition:transform 0.2s ease,box-shadow 0.2s ease;position:relative;overflow:hidden;}
        .kb-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(124,92,252,0.4);}
        @keyframes shimmer{0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);}}
        .kb-btn::after{content:'';position:absolute;top:0;left:0;width:30%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%) skewX(-15deg);}
        .kb-btn:hover::after{animation:shimmer 0.55s ease forwards;}
        .kb-search:focus{outline:none;border-color:rgba(124,92,252,0.6);box-shadow:0 0 0 3px rgba(124,92,252,0.1);}
        .stat-card{border:1px solid rgba(255,255,255,0.07);transition:transform 0.22s ease,border-color 0.22s ease;}
        .stat-card:hover{transform:translateY(-2px);border-color:rgba(124,92,252,0.3);}
        .page-btn{transition:background 0.2s ease,color 0.2s ease;}
        .page-btn:hover:not(.page-active){background:rgba(255,255,255,0.08);color:white;}
      `}</style>

      <div className={`flex h-full overflow-hidden ${visible?"kb-fade":"opacity-0"}`}>
        {/* Col 1: Categories */}
        <div className="w-[200px] flex-shrink-0 overflow-y-auto border-r border-white/8 bg-[#08060f]">
          {/* Header */}
          <div className="border-b border-white/8 px-4 py-3 flex items-center justify-between">
            <p className="text-[13px] font-bold text-white">Categories</p>
            <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#7c5cfc]/40 text-[#7c5cfc] text-sm hover:bg-[#7c5cfc]/15 transition-all">+</button>
          </div>
          <div className="py-2">
            {categories.map((c,i)=>(
              <div key={i} onClick={()=>setActiveCategory(c.label)}
                className={`cat-item flex items-center justify-between px-4 py-2 ${activeCategory===c.label?"cat-active text-white":"text-gray-400"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{c.icon}</span>
                  <span className="text-[12px] font-medium truncate">{c.label}</span>
                </div>
                <span className={`text-[10px] font-semibold ${activeCategory===c.label?"text-[#a78bfa]":"text-gray-600"}`}>{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Articles list */}
        <div className="flex flex-1 flex-col overflow-hidden border-r border-white/8">
          {/* Stat cards */}
          <div className="border-b border-white/8 px-4 py-3 flex gap-3 overflow-x-auto">
            {[
              {icon:"⊞",label:"Total Articles",val:"156",delta:"+12 from last month",color:"#7c5cfc"},
              {icon:"📂",label:"Categories",val:"12",delta:"+2 from last month",color:"#3b82f6"},
              {icon:"🤖",label:"AI Employees Using",val:"8",delta:"+1 from last month",color:"#22c55e"},
              {icon:"👁️",label:"Article Views",val:"3,245",delta:"+18.6% from last month",color:"#f97316"},
              {icon:"❤️",label:"Helpful Rate",val:"96%",delta:"+4.3% from last month",color:"#ec4899"},
            ].map((s,i)=>(
              <div key={i} className="stat-card flex-shrink-0 rounded-xl bg-[#0d0b1f] p-3 min-w-[120px]">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-base">{s.icon}</span>
                  <p className="text-[10px] text-gray-500 truncate">{s.label}</p>
                </div>
                <p className="text-[16px] font-bold text-white">{s.val}</p>
                <p className="text-[9px] text-emerald-400 mt-0.5">{s.delta}</p>
              </div>
            ))}
          </div>

          {/* Search + filter bar */}
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
              <input type="text" placeholder="Search articles..." value={search} onChange={e=>setSearch(e.target.value)}
                className="kb-search w-full rounded-xl border border-white/10 bg-white/5 py-1.5 pl-8 pr-3 text-[12px] text-gray-200 placeholder-gray-600 transition-all"/>
            </div>
            <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 hover:text-white transition-colors">🔽 Filter</button>
            <button className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-400 hover:text-white transition-colors">Sort: Newest ▾</button>
          </div>

          {/* Column headers */}
          <div className="grid border-b border-white/8 px-4 py-2 text-[10px] font-semibold text-gray-600" style={{gridTemplateColumns:"1fr 120px 60px 60px 70px 24px"}}>
            <span>Article</span><span>Category</span><span>Views</span><span>Helpful</span><span>Updated</span><span/>
          </div>

          {/* Article rows */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((a,i)=>(
              <div key={i} onClick={()=>setSelectedArticle(articles.indexOf(a))}
                className={`art-row grid items-center px-4 py-3 border-b border-white/5 ${selectedArticle===articles.indexOf(a)?"art-active":""}`}
                style={{gridTemplateColumns:"1fr 120px 60px 60px 70px 24px"}}>
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-[#a78bfa] text-sm flex-shrink-0">📄</span>
                  <div>
                    <p className="text-[12px] font-semibold text-white leading-snug">{a.title}</p>
                    <p className="text-[10px] text-gray-500 truncate max-w-[200px]">{a.desc}</p>
                  </div>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{background:`${a.categoryColor}20`,color:a.categoryColor}}>{a.category}</span>
                <span className="text-[11px] text-gray-400">{a.views}</span>
                <span className="text-[11px] font-semibold text-emerald-400">👍 {a.helpful}</span>
                <span className="text-[11px] text-gray-600">{a.updated}</span>
                <button className="text-gray-600 hover:text-white transition-colors text-sm">⋮</button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/8 px-4 py-2.5">
            <span className="text-[11px] text-gray-500">Showing 1 to {filtered.length} of 156 articles</span>
            <div className="flex items-center gap-1">
              <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 text-gray-400 text-sm">‹</button>
              {[1,2,3,"...",20].map((p,i)=>(
                <button key={i} className={`flex h-6 w-6 items-center justify-center rounded-lg text-[11px] page-btn ${p===1?"page-active bg-[#7c5cfc] text-white font-bold":"border border-white/10 text-gray-400"}`}>{p}</button>
              ))}
              <button className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 text-gray-400 text-sm">›</button>
            </div>
          </div>
        </div>

        {/* Col 3: Article preview */}
        <div className="w-[280px] flex-shrink-0 overflow-y-auto bg-[#08060f] px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-white truncate pr-2">{article.title}</h3>
            <div className="flex items-center gap-1.5">
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all text-sm">✏️</button>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white transition-all text-sm">⋮</button>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">Getting Started</span>
            <span className="rounded-full bg-[#7c5cfc]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#a78bfa]">Published</span>
            <span className="text-[10px] text-gray-500">Updated 2h ago</span>
          </div>

          {/* Sub tabs */}
          <div className="mb-3 flex gap-0 border-b border-white/8">
            {["Content","AI Employees (8)","Activity","Comments (2)"].map((t,i)=>(
              <button key={t} className={`pb-2 pr-3 text-[10px] font-semibold transition-colors ${i===0?"border-b-2 border-[#7c5cfc] text-white":"text-gray-500 hover:text-gray-300"}`}>{t}</button>
            ))}
          </div>

          {/* Thumbnail */}
          <div className="mb-4 flex h-[110px] items-center justify-center overflow-hidden rounded-xl bg-[#120e2a] border border-white/6">
            <div className="flex items-center gap-3 opacity-50">
              <span className="text-4xl">🤖</span>
              <span className="text-3xl">📊</span>
            </div>
          </div>

          {/* Content */}
          <p className="mb-3 text-[12px] leading-relaxed text-gray-400">Follow these simple steps to create and configure your first AI employee.</p>

          {[
            {num:"1.",title:"Go to AI Employees",text:"Navigate to the AI Employees page from the sidebar and click on"},
            {num:"2.",title:"Choose a Template",text:"Select a template that matches your needs or start from scratch."},
            {num:"3.",title:"Configure Basic Settings",text:null,bullets:["Give your employee a name","Select a role","Set a tone of voice","Add a short description"]},
          ].map((s,i)=>(
            <div key={i} className="mb-3">
              <p className="text-[12px] font-bold text-white">{s.num} {s.title}</p>
              {s.text && <p className="mt-0.5 text-[11px] text-gray-500">{s.text}</p>}
              {i===0 && <span className="mt-1 inline-flex items-center gap-1 rounded-lg bg-[#7c5cfc]/20 px-2 py-1 text-[10px] font-semibold text-[#a78bfa]">+ Create AI Employee</span>}
              {s.bullets && <ul className="mt-1 flex flex-col gap-0.5">{s.bullets.map((b,bi)=><li key={bi} className="flex items-center gap-1.5 text-[11px] text-gray-500"><span className="text-[#7c5cfc]">•</span>{b}</li>)}</ul>}
              {i===1 && <div className="mt-1.5 flex items-center gap-1.5 rounded-xl border border-yellow-500/20 bg-yellow-500/05 px-3 py-1.5"><span className="text-sm">💡</span><p className="text-[10px] text-gray-400">Tip: You can customize everything later.</p></div>}
            </div>
          ))}

          {/* Helpful */}
          <div className="mt-4 border-t border-white/8 pt-3 flex items-center justify-between">
            <p className="text-[11px] text-gray-500">Was this article helpful?</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-all">👍 Yes</button>
              <button className="flex items-center gap-1 rounded-lg bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/25 transition-all">👎 No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardKnowledgeBase;
