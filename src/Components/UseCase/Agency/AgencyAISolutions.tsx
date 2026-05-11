import React, { useEffect, useRef, useState } from "react";

const solutions = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <path
          d="M7 8h10M7 12h7M7 16h5"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17 14l2 2-2 2"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "AI Content Generation",
    desc: "Create high-quality content drafts, blogs, and social posts in seconds.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="#a78bfa" strokeWidth="1.5" />
        <path
          d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9M12 3c-2.5 2.5-4 5.5-4 9s1.5 6.5 4 9M3 12h18"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <path
          d="M5 7.5h14M5 16.5h14"
          stroke="#a78bfa"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "SEO Optimization",
    desc: "Get AI-powered SEO suggestions to rank higher and drive more traffic.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="#a78bfa"
          strokeWidth="1.5"
        />
        <path
          d="M8 12l3 3 5-5"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 8h18" stroke="#a78bfa" strokeWidth="1.3" />
      </svg>
    ),
    title: "Client Reporting",
    desc: "Automate reports and deliver clear insights to impress your clients.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 17l4-8 4 4 4-6 4 10"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="19" cy="6" r="2" stroke="#a78bfa" strokeWidth="1.3" />
      </svg>
    ),
    title: "Campaign Analysis",
    desc: "Analyze campaign data and get AI insights to improve performance.",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="#a78bfa" strokeWidth="1.5" />
        <path
          d="M12 7v5l3 3"
          stroke="#a78bfa"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 12h1M16 12h1M12 7v1M12 16v1"
          stroke="#a78bfa"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Task Automation",
    desc: "Automate repetitive tasks so your team can focus on strategy and growth.",
  },
];

const AgencyAISolutions: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .ai-sol { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sol-fade { animation: fadeUp 0.6s ease forwards; }

        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 0px rgba(124,92,252,0); }
          50%       { box-shadow: 0 0 18px rgba(124,92,252,0.35); }
        }

        @keyframes iconPop {
          0%   { transform: scale(1) rotate(0deg); }
          40%  { transform: scale(1.25) rotate(-6deg); }
          70%  { transform: scale(0.95) rotate(3deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .sol-card {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          border: 1px solid rgba(255,255,255,0.07);
          cursor: default;
        }
        .sol-card:hover {
          transform: translateY(-6px) scale(1.02);
          background: rgba(124,92,252,0.1) !important;
          border-color: rgba(124,92,252,0.45);
          animation: borderGlow 2s ease-in-out infinite;
        }
        .sol-card:hover .sol-icon-wrap {
          animation: iconPop 0.5s ease forwards;
          background: rgba(124,92,252,0.25) !important;
        }
        .sol-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 30%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.08), transparent);
          transform: translateX(-100%);
          transition: none;
        }
        .sol-card:hover::after {
          animation: shimmerLine 0.7s ease forwards;
        }

        /* Active card spotlight line */
        .sol-card .active-line {
          position: absolute;
          bottom: 0; left: 50%;
          width: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #7c5cfc, transparent);
          transform: translateX(-50%);
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        .sol-card:hover .active-line { width: 80%; }
      `}</style>

      <section
        ref={sectionRef}
        className="ai-sol w-full bg-transparent py-16 px-4"
      >
        {/* Title */}
        <h2
          className={`mb-10 text-center text-[clamp(18px,2.5vw,26px)] font-semibold text-white ${visible ? "sol-fade" : "opacity-0"}`}
          style={{ animationDelay: "0s" }}
        >
          AI solutions built for agencies
        </h2>

        {/* Cards grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {solutions.map((s, i) => (
            <div
              key={i}
              className={`sol-card rounded-2xl bg-white/5 p-5 ${visible ? "sol-fade" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <div className="sol-icon-wrap mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#7c5cfc]/15 transition-all duration-300">
                {s.icon}
              </div>

              {/* Title */}
              <p className="mb-2 text-[14px] font-bold text-white leading-snug">
                {s.title}
              </p>

              {/* Desc */}
              <p className="text-[13px] leading-relaxed text-gray-500">
                {s.desc}
              </p>

              {/* Bottom glow line */}
              <div className="active-line" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AgencyAISolutions;
