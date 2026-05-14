import React, { useEffect, useRef, useState } from "react";

const articles = [
  {
    date: "May 8, 2024",
    title: "Introducing Operino 2.0 – Smarter, Faster, Better",
    desc: "We're excited to announce Operino 2.0 with new features, improved performance, and a better developer experience.",
    read: "5 min read",
    tag: "Product Updates",
    tagColor: "#7c5cfc",
    thumb: "🚀",
  },
  {
    date: "May 5, 2024",
    title: "How to Integrate Operino with Your Existing Stack",
    desc: "Connect Operino with your favorite tools and platforms in just a few clicks.",
    read: "6 min read",
    tag: "Tutorials",
    tagColor: "#a78bfa",
    thumb: "🔗",
  },
  {
    date: "April 30, 2024",
    title: "Measuring the ROI of AI Automation",
    desc: "Learn how businesses are measuring the real impact of AI automation and maximizing ROI.",
    read: "7 min read",
    tag: "Case Studies",
    tagColor: "#34d399",
    thumb: "📊",
  },
  {
    date: "April 25, 2024",
    title: "Security & Data Privacy at Operino",
    desc: "How we keep your data safe with enterprise-grade security and privacy practices.",
    read: "6 min read",
    tag: "Company",
    tagColor: "#fbbf24",
    thumb: "🔐",
  },
];

const categories = [
  { icon: "🤖", label: "AI Agents", count: 24 },
  { icon: "⚙️", label: "Automation", count: 18 },
  { icon: "🎓", label: "Tutorials", count: 16 },
  { icon: "📦", label: "Product Updates", count: 12 },
  { icon: "📈", label: "Case Studies", count: 10 },
  { icon: "🔗", label: "Integrations", count: 8 },
  { icon: "🏢", label: "Company", count: 6 },
];

interface Props {
  search: string;
  activeTab: string;
}

const BlogLatest: React.FC<Props> = ({ search, activeTab }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = articles.filter((a) => {
    const tabMatch = activeTab === "All Articles" || a.tag === activeTab;
    const searchMatch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.desc.toLowerCase().includes(search.toLowerCase());
    return tabMatch && searchMatch;
  });

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        .bl-fade { animation: fadeUp 0.55s ease forwards; }
        .bl-row {
          border:1px solid rgba(255,255,255,0.07);
          transition:transform 0.25s ease,border-color 0.25s ease,background 0.25s ease,box-shadow 0.25s ease;
          cursor:pointer;
        }
        .bl-row:hover { transform:translateX(4px); border-color:rgba(124,92,252,0.4); background:rgba(124,92,252,0.07)!important; box-shadow:4px 0 20px rgba(124,92,252,0.1); }
        .bl-row:hover .bl-thumb { transform:scale(1.08) rotate(-3deg); }
        .bl-thumb { transition:transform 0.3s ease; }
        .cat-row { transition:background 0.2s ease,color 0.2s ease; cursor:pointer; }
        .cat-row:hover { background:rgba(124,92,252,0.1); color:white; border-radius:12px; }
        .sub-btn {
          transition:background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease;
          position:relative; overflow:hidden;
        }
        .sub-btn:hover { background:#6b4ce0!important; transform:translateY(-2px); box-shadow:0 6px 20px rgba(124,92,252,0.4); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .sub-btn::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .sub-btn:hover::after { animation:shimmer 0.55s ease forwards; }
        .email-input:focus { outline:none; border-color:rgba(124,92,252,0.6); box-shadow:0 0 0 3px rgba(124,92,252,0.1); }
        @keyframes checkPop { 0%{transform:scale(0);}70%{transform:scale(1.2);}100%{transform:scale(1);} }
        .check-pop { animation:checkPop 0.4s ease forwards; }
      `}</style>

      <div ref={ref} className="pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Left: Articles */}
          <div className="flex-1">
            <div
              className={`mb-5 flex items-center justify-between ${visible ? "bl-fade" : "opacity-0"}`}
              style={{ animationDelay: "0s" }}
            >
              <h2 className="text-[clamp(17px,2vw,21px)] font-bold text-white">
                Latest Articles
              </h2>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-center opacity-0 animate-[fadeUp_0.5s_ease_forwards]">
                <span className="text-4xl">🔍</span>
                <p className="mt-3 text-[14px] font-semibold text-white">
                  No articles found
                </p>
                <p className="mt-1 text-[12px] text-gray-500">
                  Try a different search or category.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((a, i) => (
                  <div
                    key={i}
                    className={`bl-row flex gap-4 rounded-2xl bg-[#0c0a1e] p-4 ${visible ? "bl-fade" : "opacity-0"}`}
                    style={{ animationDelay: `${0.08 + i * 0.08}s` }}
                  >
                    {/* Thumb */}
                    <div className="bl-thumb flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-3xl border border-[#7c5cfc]/20">
                      {a.thumb}
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-600">{a.date}</p>
                      <p className="mt-0.5 text-[14px] font-bold text-white leading-snug">
                        {a.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-relaxed text-gray-500 line-clamp-2">
                        {a.desc}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[11px] text-gray-600">
                          {a.read}
                        </span>
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: `${a.tagColor}22`,
                            color: a.tagColor,
                          }}
                        >
                          {a.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className={`mt-6 ${visible ? "bl-fade" : "opacity-0"}`}
              style={{ animationDelay: "0.5s" }}
            >
              <button className="sub-btn w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-[13px] font-semibold text-gray-300">
                View all articles →
              </button>
            </div>
          </div>

          {/* Right: Categories + Newsletter */}
          <div
            className={`w-full lg:w-55 shrink-0 flex flex-col gap-4 ${visible ? "bl-fade" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Categories */}
            <div className="rounded-2xl border border-white/8 bg-[#0c0a1e] p-4">
              <h3 className="mb-3 text-[14px] font-bold text-white">
                Categories
              </h3>
              <div className="flex flex-col gap-0.5">
                {categories.map((c, i) => (
                  <div
                    key={i}
                    className="cat-row flex items-center justify-between px-2 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{c.icon}</span>
                      <span className="text-[12px] text-gray-400">
                        {c.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600">
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-white/8 bg-[#0c0a1e] p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[14px] font-bold text-white">
                  Stay updated
                </h3>
                <span className="text-lg">✉️</span>
              </div>
              <p className="text-[12px] text-gray-500 leading-snug mb-3">
                Get the latest articles and product updates straight to your
                inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input mb-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-gray-200 placeholder-gray-600 transition-all"
              />
              {subscribed ? (
                <div className="check-pop flex items-center justify-center gap-2 rounded-xl bg-emerald-500/20 py-2 text-[12px] font-semibold text-emerald-400">
                  ✓ Subscribed!
                </div>
              ) : (
                <button
                  onClick={() => email && setSubscribed(true)}
                  className="sub-btn w-full rounded-xl bg-[#7c5cfc] py-2 text-[12px] font-semibold text-white"
                >
                  Subscribe
                </button>
              )}
              <p className="mt-2 text-center text-[10px] text-gray-600">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogLatest;
