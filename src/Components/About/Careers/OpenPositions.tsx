import { useState, useRef, useEffect } from "react";

type Department =
  | "All Departments"
  | "Engineering"
  | "Product"
  | "Design"
  | "Marketing"
  | "Sales"
  | "Operations";

interface Job {
  id: number;
  title: string;
  department: Department;
  tags: string[];
  type: string;
  icon: React.ReactNode;
  color: string;
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const CodeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
const RobotIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="5" y="8" width="14" height="10" rx="3" />
    <path d="M9 12h.01M15 12h.01" strokeWidth="2.2" strokeLinecap="round" />
    <line x1="12" y1="8" x2="12" y2="5" strokeLinecap="round" />
    <circle cx="12" cy="4" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const BoxIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const PenIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);
const MegaphoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M3 11l19-9-9 19-2-8-8-2z" />
  </svg>
);
const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="12" width="4" height="9" rx="1" opacity="0.55" />
    <rect x="10" y="7" width="4" height="14" rx="1" opacity="0.75" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);
const GearIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const deptColors: Record<Department, string> = {
  "All Departments": "#7c5cfc",
  Engineering: "#818cf8",
  Product: "#a78bfa",
  Design: "#c4b5fd",
  Marketing: "#7c5cfc",
  Sales: "#6366f1",
  Operations: "#4f46e5",
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Backend Engineer",
    department: "Engineering",
    tags: ["Node.js", "TypeScript", "PostgreSQL"],
    type: "Remote",
    icon: <CodeIcon />,
    color: "#818cf8",
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    department: "Engineering",
    tags: ["Python", "LLM", "AI Agents"],
    type: "Remote",
    icon: <RobotIcon />,
    color: "#818cf8",
  },
  {
    id: 3,
    title: "Product Manager",
    department: "Product",
    tags: ["Product Strategy", "Roadmap", "Analytics"],
    type: "Remote",
    icon: <BoxIcon />,
    color: "#a78bfa",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    department: "Design",
    tags: ["Figma", "UI Design", "Prototyping"],
    type: "Remote",
    icon: <PenIcon />,
    color: "#c4b5fd",
  },
  {
    id: 5,
    title: "Growth Marketer",
    department: "Marketing",
    tags: ["Growth", "Content", "Performance"],
    type: "Remote",
    icon: <MegaphoneIcon />,
    color: "#7c5cfc",
  },
  {
    id: 6,
    title: "Sales Development Rep",
    department: "Sales",
    tags: ["Outbound", "CRM", "SaaS"],
    type: "Remote",
    icon: <ChartIcon />,
    color: "#6366f1",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    department: "Operations",
    tags: ["Kubernetes", "CI/CD", "AWS"],
    type: "Remote",
    icon: <GearIcon />,
    color: "#4f46e5",
  },
];

const tabs: Department[] = [
  "All Departments",
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
];

// ─── Globe icon ───────────────────────────────────────────────────────────────
const GlobeSmall = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(167,139,250,0.6)"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

// ─── Job row ─────────────────────────────────────────────────────────────────
function JobRow({
  job,
  index,
  visible,
}: {
  job: Job;
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [applyHover, setApplyHover] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const r = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((rr) => [...rr, r]);
    setTimeout(
      () => setRipples((rr) => rr.filter((rr2) => rr2.id !== r.id)),
      600,
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        {
          display: "flex",
          alignItems: "center",
          gap: "clamp(12px,2vw,20px)",
          padding: "clamp(14px,2vw,20px) clamp(16px,2.5vw,24px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: hovered ? "rgba(124,92,252,0.06)" : "transparent",
          transition: "background 0.25s ease",
          position: "relative",
          overflow: "hidden",
          flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-20px)",
          transition2: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s cubic-bezier(.4,0,.2,1) ${index * 0.07}s`,
        } as React.CSSProperties
      }
    >
      {/* Hover left accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "15%",
          bottom: "15%",
          width: 3,
          borderRadius: 2,
          background: `linear-gradient(180deg,${job.color},${job.color}88)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Hover shimmer */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(90deg,transparent,${job.color}08,transparent)`,
            animation: "shimmerRow 1s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon box */}
      <div
        style={{
          width: "clamp(40px,5.5vw,52px)",
          height: "clamp(40px,5.5vw,52px)",
          borderRadius: "clamp(10px,1.5vw,14px)",
          flexShrink: 0,
          background: hovered ? `${job.color}22` : "rgba(124,92,252,0.1)",
          border: hovered
            ? `1px solid ${job.color}55`
            : "1px solid rgba(124,92,252,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: hovered ? job.color : "rgba(167,139,250,0.65)",
          transition: "all 0.28s ease",
          transform: hovered
            ? "scale(1.08) rotate(-5deg)"
            : "scale(1) rotate(0)",
          boxShadow: hovered ? `0 0 16px ${job.color}35` : "none",
        }}
      >
        {job.icon}
      </div>

      {/* Title + dept */}
      <div style={{ minWidth: 160, flex: "0 0 auto" }}>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(13px,1.7vw,15.5px)",
            fontWeight: 700,
            color: "white",
            letterSpacing: "-0.15px",
          }}
        >
          {job.title}
        </p>
        <p
          style={{
            margin: "3px 0 0",
            fontSize: "clamp(10px,1.2vw,12px)",
            color: deptColors[job.department],
            fontWeight: 600,
          }}
        >
          {job.department}
        </p>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "clamp(6px,1vw,10px)",
          flex: 1,
          flexWrap: "wrap",
          minWidth: 0,
        }}
      >
        {job.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "clamp(9.5px,1.2vw,11.5px)",
              color: "rgba(255,255,255,0.45)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6,
              padding: "3px 9px",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              ...(hovered
                ? {
                    background: "rgba(124,92,252,0.1)",
                    borderColor: "rgba(124,92,252,0.25)",
                    color: "rgba(255,255,255,0.65)",
                  }
                : {}),
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexShrink: 0,
          minWidth: 70,
        }}
      >
        <GlobeSmall />
        <span
          style={{
            fontSize: "clamp(11px,1.3vw,13px)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {job.type}
        </span>
      </div>

      {/* Apply button */}
      <button
        onMouseEnter={() => setApplyHover(true)}
        onMouseLeave={() => setApplyHover(false)}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "clamp(8px,1.2vw,11px) clamp(14px,2vw,20px)",
          borderRadius: 10,
          border: `1px solid ${applyHover ? job.color + "80" : "rgba(124,92,252,0.3)"}`,
          background: applyHover ? `${job.color}18` : "transparent",
          color: applyHover ? job.color : "rgba(167,139,250,0.75)",
          fontSize: "clamp(11px,1.3vw,13px)",
          fontWeight: 600,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "all 0.25s ease",
          transform: applyHover ? "scale(1.05)" : "scale(1)",
          boxShadow: applyHover ? `0 0 16px ${job.color}30` : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ripple */}
        {ripples.map((r) => (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: r.x - 20,
              top: r.y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `${job.color}40`,
              animation: "rippleOut 0.6s ease-out forwards",
              pointerEvents: "none",
            }}
          />
        ))}
        <span style={{ position: "relative", zIndex: 1 }}>Apply Now</span>
        <svg
          style={{
            position: "relative",
            zIndex: 1,
            transition: "transform 0.2s ease",
            transform: applyHover ? "translateX(3px)" : "none",
          }}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function OpenPositions() {
  const [active, setActive] = useState<Department>("All Departments");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [visible, setVisible] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = tabRefs.current[active];
    const bar = barRef.current;
    if (el && bar) {
      const er = el.getBoundingClientRect(),
        br = bar.getBoundingClientRect();
      setIndicator({ left: er.left - br.left, width: er.width });
    }
  }, [active]);

  const filtered =
    active === "All Departments"
      ? jobs
      : jobs.filter((j) => j.department === active);

  const handleTab = (tab: Department) => {
    setActive(tab);
    setGridKey((k) => k + 1);
  };

  return (
    <div
      ref={sectionRef}
      style={{
        width: "100%",
        background: "#09091a",
        padding: "clamp(15px,8vw,10px) clamp(16px,5vw,48px)",
        fontFamily: "'Inter',sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes jobIn     { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes gridFade  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        @keyframes shimmerRow{ 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes rippleOut { from{transform:scale(0);opacity:1} to{transform:scale(4);opacity:0} }
        @keyframes shimmerPill{ 0%{background-position:-200px 0} 100%{background-position:200px 0} }
        * { box-sizing:border-box; }
      `}</style>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(24px,4vw,40px)",
        }}
      >
        {/* Title */}
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "clamp(22px,4vw,34px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.4px",
            animation: visible ? "fadeUp 0.65s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          Open Positions
        </h2>

        {/* Tab bar */}
        <div
          style={{
            animation: visible ? "fadeUp 0.65s 0.1s ease both" : "none",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            overflowX: "auto",
            paddingBottom: 4,
          }}
        >
          <div
            ref={barRef}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 50,
              padding: "5px 6px",
              gap: 2,
              minWidth: "max-content",
            }}
          >
            {/* Sliding pill */}
            <div
              style={{
                position: "absolute",
                top: 5,
                left: indicator.left,
                width: indicator.width,
                height: "calc(100% - 10px)",
                borderRadius: 50,
                background: "linear-gradient(135deg,#7c5cfc,#6d28d9)",
                transition:
                  "left 0.32s cubic-bezier(.4,0,.2,1), width 0.32s cubic-bezier(.4,0,.2,1)",
                boxShadow: "0 4px 16px rgba(124,92,252,0.5)",
                zIndex: 0,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)",
                  backgroundSize: "200px 100%",
                  animation: "shimmerPill 2.5s linear infinite",
                }}
              />
            </div>

            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                onClick={() => handleTab(tab)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px clamp(10px,1.5vw,18px)",
                  borderRadius: 50,
                  fontSize: "clamp(11px,1.3vw,13px)",
                  fontWeight: active === tab ? 700 : 400,
                  color: active === tab ? "white" : "rgba(255,255,255,0.4)",
                  transition: "color 0.22s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (active !== tab)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.72)";
                }}
                onMouseLeave={(e) => {
                  if (active !== tab)
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)";
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs list */}
        <div
          key={gridKey}
          style={{
            background: "linear-gradient(145deg,#111128,#0d0c22)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            overflow: "hidden",
            animation: "gridFade 0.35s ease both",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((job, i) => (
              <JobRow key={job.id} job={job} index={i} visible={visible} />
            ))
          ) : (
            <div
              style={{
                padding: "48px 24px",
                textAlign: "center",
                color: "rgba(255,255,255,0.25)",
                fontSize: 14,
              }}
            >
              No open positions in this department right now.
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            animation: visible ? "fadeUp 0.6s 0.6s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "transparent",
              border: "1px solid rgba(124,92,252,0.35)",
              borderRadius: 12,
              padding: "13px 28px",
              fontSize: "clamp(13px,1.7vw,14.5px)",
              fontWeight: 600,
              color: "rgba(167,139,250,0.85)",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(124,92,252,0.12)";
              el.style.borderColor = "rgba(124,92,252,0.55)";
              el.style.color = "#c4b5fd";
              el.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(124,92,252,0.35)";
              el.style.color = "rgba(167,139,250,0.85)";
              el.style.transform = "scale(1)";
            }}
          >
            View All Open Positions
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
