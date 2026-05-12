import React, { useEffect, useRef, useState } from "react";

const resources = [
  {
    title: "Best Practices",
    desc: "Learn how to get the most out of Operino and build great AI experiences.",
    icon: "🏆",
    gradient: "from-[#7c5cfc]/20 to-[#4f3db0]/10",
    glowColor: "rgba(124,92,252,0.35)",
  },
  {
    title: "Tutorials",
    desc: "Step-by-step tutorials and examples to accelerate your development.",
    icon: "🎓",
    gradient: "from-[#a78bfa]/20 to-[#7c5cfc]/10",
    glowColor: "rgba(167,139,250,0.35)",
  },
  {
    title: "FAQ",
    desc: "Find answers to common questions about Operino.",
    icon: "❓",
    gradient: "from-[#6d4fd4]/20 to-[#3d2a8a]/10",
    glowColor: "rgba(109,79,212,0.35)",
  },
];

const DocsResources: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }[]>(
    resources.map(() => ({ x: 50, y: 50 })),
  );

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => {
      const next = [...prev];
      next[i] = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      return next;
    });
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .res-fade { animation: fadeUp 0.6s ease forwards; }

        @keyframes iconBounce {
          0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
          30%      { transform: translateY(-10px) rotate(-8deg) scale(1.15); }
          60%      { transform: translateY(-4px) rotate(4deg) scale(1.05); }
        }

        @keyframes shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }

        .res-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .res-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(124,92,252,0.45);
          box-shadow: 0 16px 48px rgba(124,92,252,0.18);
        }
        .res-card:hover .res-icon {
          animation: iconBounce 0.6s ease forwards;
        }
        .res-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 35%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.07), transparent);
          transform: translateX(-100%) skewX(-15deg);
        }
        .res-card:hover::after {
          animation: shimmer 0.65s ease forwards;
        }

        /* Bottom bar reveal */
        .res-card .bottom-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0;
          background: linear-gradient(90deg, #7c5cfc, #a78bfa);
          border-radius: 0 0 16px 16px;
          transition: width 0.4s ease;
        }
        .res-card:hover .bottom-bar { width: 100%; }

        .explore-link {
          transition: gap 0.2s ease, color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .explore-link:hover { gap: 10px; color: #c4b5fd; }
        .explore-arrow { transition: transform 0.2s ease; }
        .res-card:hover .explore-arrow { transform: translateX(4px); }
      `}</style>

      <div ref={ref} className="flex w-full py-6 mr-30 ml-50">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {resources.map((r, i) => (
            <div
              key={i}
              className={`res-card rounded-2xl bg-[#0c0a1e] p-6 ${visible ? "res-fade" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.12}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseMove={(e) => handleMouseMove(e, i)}
            >
              {/* Mouse spotlight */}
              {hovered === i && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    background: `radial-gradient(180px circle at ${mousePos[i].x}% ${mousePos[i].y}%, ${r.glowColor}, transparent 70%)`,
                  }}
                />
              )}

              {/* Content row */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-[16px] font-bold text-white">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
                    {r.desc}
                  </p>
                  <button className="explore-link mt-5 text-[13px] font-semibold text-[#a78bfa]">
                    Explore <span className="explore-arrow">→</span>
                  </button>
                </div>

                {/* Icon */}
                <div
                  className={`res-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${r.gradient} text-3xl`}
                  style={{ border: `1px solid rgba(124,92,252,0.2)` }}
                >
                  {r.icon}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="bottom-bar" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsResources;
