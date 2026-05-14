import React, { useEffect, useRef, useState } from "react";

const featured = [
  {
    date: "May 20, 2024",
    read: "8 min read",
    title: "How to Build Smarter AI Chatbots with Operino",
    desc: "Learn the core principles and best practices for building AI chatbots that users love.",
    tag: "Tutorial",
    thumb: "🤖",
    color: "#7c5cfc",
  },
  {
    date: "May 15, 2024",
    read: "6 min read",
    title: "Automate Workflows with Operino in Minutes",
    desc: "Step-by-step guide to automate repetitive tasks and save hours every week.",
    tag: "Automation",
    thumb: "⚙️",
    color: "#a78bfa",
  },
  {
    date: "May 10, 2024",
    read: "7 min read",
    title: "Understanding NLP: A Beginner's Guide",
    desc: "A quick introduction to Natural Language Processing and how it powers AI.",
    tag: "AI & NLP",
    thumb: "🧠",
    color: "#7c5cfc",
  },
];

const BlogFeatured: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .bf-fade { animation: fadeUp 0.55s ease forwards; }
        .bf-card {
          border:1px solid rgba(255,255,255,0.07);
          transition:transform 0.28s ease,border-color 0.28s ease,box-shadow 0.28s ease;
          cursor:pointer; overflow:hidden;
        }
        .bf-card:hover { transform:translateY(-6px); border-color:rgba(124,92,252,0.45); box-shadow:0 14px 40px rgba(124,92,252,0.2); }
        .bf-thumb { transition:transform 0.4s ease; }
        .bf-card:hover .bf-thumb { transform:scale(1.06); }
        .bf-arrow { transition:transform 0.2s ease; }
        .bf-card:hover .bf-arrow { transform:translateX(5px); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .bf-card::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(167,139,250,0.04),transparent); transform:translateX(-100%) skewX(-15deg); pointer-events:none; }
        .bf-card:hover::after { animation:shimmer 0.7s ease forwards; }
      `}</style>

      <div ref={ref} className="pb-10">
        <div
          className={`mb-5 flex items-center justify-between ${visible ? "bf-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          <h2 className="text-[clamp(17px,2vw,21px)] font-bold text-white">
            Featured Articles
          </h2>
          <button className="text-[12px] font-semibold text-[#a78bfa] hover:text-[#c4b5fd] flex items-center gap-1 transition-colors">
            View all featured →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {featured.map((a, i) => (
            <div
              key={i}
              className={`bf-card relative flex flex-col rounded-2xl bg-[#0c0a1e] ${visible ? "bf-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              {/* Thumbnail */}
              <div className="relative h-40 overflow-hidden rounded-t-2xl bg-[#120e2a]">
                <div className="bf-thumb absolute inset-0 flex items-center justify-center text-[64px] opacity-15">
                  {a.thumb}
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#0c0a1e] via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-lg bg-[#7c5cfc] px-2.5 py-1 text-[10px] font-bold text-white">
                  FEATURED
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] text-gray-600">
                  {a.date} &nbsp;•&nbsp; {a.read}
                </p>
                <h3 className="mt-2 text-[14px] font-bold leading-snug text-white">
                  {a.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-gray-500">
                  {a.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full border border-[#7c5cfc]/40 px-2.5 py-0.5 text-[11px] font-semibold text-[#a78bfa]">
                    {a.tag}
                  </span>
                  <span className="bf-arrow text-gray-600">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogFeatured;
