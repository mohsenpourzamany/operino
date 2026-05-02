import { useState, useRef, useEffect } from "react";

interface DropdownSection {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: string[];
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0,
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FeaturesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const UseCasesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#818cf8"
    strokeWidth="1.8"
  >
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const ResourcesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c4b5fd"
    strokeWidth="1.8"
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);
const AboutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a78bfa"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const dropdownData: Record<string, DropdownSection[]> = {
  Features: [
    {
      icon: <FeaturesIcon />,
      title: "Features",
      subtitle: "Overview page (you're here)",
      items: [
        "AI Agent Builder",
        "Multi-Channel",
        "Automation",
        "Integrations",
        "Analytics",
      ],
    },
  ],
  "Use Cases": [
    {
      icon: <UseCasesIcon />,
      title: "Use Cases",
      subtitle: "Real-world solutions by industry & role",
      items: [
        "E-commerce",
        "SaaS & Tech",
        "Healthcare",
        "Education",
        "Agencies",
      ],
    },
  ],
  Resources: [
    {
      icon: <ResourcesIcon />,
      title: "Resources",
      subtitle: "Knowledge & support",
      items: [
        "Documentation",
        "Guides & Tutorials",
        "Templates",
        "Blog",
        "Help Center",
      ],
    },
  ],
  About: [
    {
      icon: <AboutIcon />,
      title: "About",
      subtitle: "Learn about Operino",
      items: ["Our Story", "Careers", "Contact"],
    },
  ],
};

// ─── Desktop Dropdown Panel ───────────────────────────────────────────────────
function DropdownPanel({
  sections,
  visible,
}: {
  sections: DropdownSection[];
  visible: boolean;
}) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 14px)",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-8px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "transform 0.28s cubic-bezier(.4,0,.2,1), opacity 0.22s ease",
        zIndex: 100,
        minWidth: 260,
      }}
    >
      {/* Arrow tip */}
      <div
        style={{
          position: "absolute",
          top: -6,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: 12,
          height: 12,
          background: "#13112b",
          border: "1px solid rgba(124,92,252,0.3)",
          borderBottom: "none",
          borderRight: "none",
          zIndex: 101,
        }}
      />

      <div
        style={{
          background: "linear-gradient(145deg,#16143a,#0f0d28)",
          border: "1px solid rgba(124,92,252,0.3)",
          borderRadius: 16,
          padding: "6px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.55), 0 0 40px rgba(124,92,252,0.08)",
          backdropFilter: "blur(20px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            left: "50%",
            transform: "translateX(-50%)",
            width: 180,
            height: 80,
            background:
              "radial-gradient(ellipse,rgba(124,92,252,0.18) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {sections.map((section) => (
          <div key={section.title} style={{ padding: "10px 6px 4px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "4px 10px 10px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: "rgba(124,92,252,0.14)",
                  border: "1px solid rgba(124,92,252,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {section.icon}
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {section.title}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 1,
                  }}
                >
                  {section.subtitle}
                </p>
              </div>
            </div>
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,rgba(124,92,252,0.2),transparent)",
                margin: "0 6px 6px",
              }}
            />

            {section.items.map((item, i) => (
              <div
                key={item}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "8px 12px",
                  borderRadius: 9,
                  cursor: "pointer",
                  background:
                    hoveredItem === item
                      ? "rgba(124,92,252,0.12)"
                      : "transparent",
                  transform:
                    hoveredItem === item ? "translateX(4px)" : "translateX(0)",
                  transition: "background 0.2s, transform 0.2s",
                  animation: visible
                    ? `dropItemIn 0.35s cubic-bezier(.4,0,.2,1) ${i * 0.04}s both`
                    : "none",
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background:
                      hoveredItem === item ? "#a78bfa" : "rgba(124,92,252,0.4)",
                    transform: hoveredItem === item ? "scale(1.5)" : "scale(1)",
                    boxShadow:
                      hoveredItem === item
                        ? "0 0 8px rgba(167,139,250,0.8)"
                        : "none",
                    transition: "all 0.2s",
                  }}
                />
                <span
                  style={{
                    fontSize: 12.5,
                    color:
                      hoveredItem === item
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.55)",
                    fontWeight: hoveredItem === item ? 500 : 400,
                    transition: "color 0.2s",
                  }}
                >
                  {item}
                </span>
                {hoveredItem === item && (
                  <svg
                    style={{ marginLeft: "auto", opacity: 0.6 }}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Desktop NavItem ──────────────────────────────────────────────────────────
function NavItem({
  label,
  hasDropdown,
}: {
  label: string;
  hasDropdown?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const handleEnter = () => {
    clearTimeout(closeTimer.current);
    setHovered(true);
    if (hasDropdown) setOpen(true);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setHovered(false);
    }, 120);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const sections = dropdownData[label];

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
          position: "relative",
          color: hovered || open ? "white" : "rgba(255,255,255,0.72)",
          fontSize: 14,
          fontWeight: 500,
          transition: "color 0.2s",
          padding: "18px 6px",
          userSelect: "none",
        }}
      >
        {label}
        {hasDropdown && <ChevronDown open={open} />}

        {/* Hover underline — always present but animates width */}
        <span
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            height: 2,
            borderRadius: 2,
            background: "linear-gradient(90deg,#a855f7,#6366f1)",
            transform: hovered || open ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.28s cubic-bezier(.4,0,.2,1)",
            transformOrigin: "left",
          }}
        />
      </div>

      {hasDropdown && sections && (
        <DropdownPanel sections={sections} visible={open} />
      )}
    </div>
  );
}

// ─── Mobile menu item ─────────────────────────────────────────────────────────
function MobileNavItem({
  label,
  hasDropdown,
  onClose,
}: {
  label: string;
  hasDropdown?: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const sections = dropdownData[label];

  return (
    <div>
      <div
        onClick={() => (hasDropdown ? setOpen(!open) : onClose())}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
          cursor: "pointer",
          borderRadius: 10,
          background: open ? "rgba(124,92,252,0.1)" : "transparent",
          transition: "background 0.2s",
          color: open ? "white" : "rgba(255,255,255,0.75)",
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        <span>{label}</span>
        {hasDropdown && <ChevronDown open={open} />}
      </div>

      {/* Mobile sub-items */}
      {hasDropdown && sections && open && (
        <div style={{ paddingLeft: 16, paddingBottom: 4 }}>
          {sections[0].items.map((item) => (
            <div
              key={item}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 12px",
                cursor: "pointer",
                borderRadius: 8,
                color: "rgba(255,255,255,0.5)",
                fontSize: 13,
                fontWeight: 400,
                transition: "color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "white";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(124,92,252,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.5)";
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "rgba(124,92,252,0.5)",
                  flexShrink: 0,
                }}
              />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
import Logo from "../assets/operino-favicon.svg";

// ─── Hamburger ────────────────────────────────────────────────────────────────
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.8)"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [hoverLogin, setHoverLogin] = useState(false);
  const [hoverStart, setHoverStart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navLinks = [
    { label: "Home" },
    { label: "Features", hasDropdown: true },
    { label: "Use Cases", hasDropdown: true },
    { label: "Pricing" },
    { label: "Resources", hasDropdown: true },
    { label: "About", hasDropdown: true },
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: "20px 16px",
        background: "#09091a",
        fontFamily: "'Inter',sans-serif",
        position: "relative",
        zIndex: 50,
      }}
    >
      <style>{`
        @keyframes dropItemIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes navbarIn  { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mobileSlide { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderRadius: 18,
          maxWidth: 1100,
          margin: "0 auto",
          background: "#0f0c2a",
          border: "1px solid rgba(139,92,246,0.22)",
          boxShadow:
            "0 0 0 1px rgba(109,40,217,0.06), inset 0 1px 0 rgba(168,85,247,0.07), 0 8px 32px rgba(0,0,0,0.4)",
          position: "relative",
          overflow: "visible",
          animation: "navbarIn 0.6s cubic-bezier(.4,0,.2,1) both",
        }}
      >
        {/* Top glow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "55%",
            height: 2,
            background:
              "linear-gradient(90deg,transparent,#a855f7,#7c3aed,#a855f7,transparent)",
            opacity: 0.85,
            borderRadius: 1,
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="Operino Logo"
            style={{ width: 45, height: 45 }}
          />
          <span
            style={{
              margin: 0,
              fontFamily: "'Poppins !important'",
              fontSize: 22,
              fontWeight: 700,
              color: "white",
            }}
          >
            Operino
          </span>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map(({ label, hasDropdown }) => (
              <NavItem key={label} label={label} hasDropdown={hasDropdown} />
            ))}
          </div>
        )}

        {/* Desktop auth */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onMouseEnter={() => setHoverLogin(true)}
              onMouseLeave={() => setHoverLogin(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                color: hoverLogin ? "white" : "rgba(255,255,255,0.68)",
                transition: "color 0.2s",
                padding: 0,
              }}
            >
              Log in
            </button>
            <div
              style={{
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.12)",
              }}
            />
            <button
              onMouseEnter={() => setHoverStart(true)}
              onMouseLeave={() => setHoverStart(false)}
              style={{
                padding: "9px 20px",
                borderRadius: 11,
                background: "linear-gradient(135deg,#9333ea,#6366f1)",
                border: "none",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: hoverStart ? "scale(1.05)" : "scale(1)",
                boxShadow: hoverStart
                  ? "0 0 28px rgba(147,51,234,0.65)"
                  : "0 0 16px rgba(147,51,234,0.35)",
              }}
            >
              Start Free
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && mobileOpen && (
        <div
          style={{
            maxWidth: 1100,
            margin: "8px auto 0",
            borderRadius: 16,
            background: "linear-gradient(145deg,#13112b,#0e0c22)",
            border: "1px solid rgba(124,92,252,0.25)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            overflow: "hidden",
            animation: "mobileSlide 0.3s cubic-bezier(.4,0,.2,1) both",
            padding: "8px 8px 16px",
          }}
        >
          {/* Nav links */}
          {navLinks.map(({ label, hasDropdown }) => (
            <MobileNavItem
              key={label}
              label={label}
              hasDropdown={hasDropdown}
              onClose={() => setMobileOpen(false)}
            />
          ))}

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.06)",
              margin: "10px 16px",
            }}
          />

          {/* Mobile auth buttons */}
          <div style={{ display: "flex", gap: 10, padding: "4px 8px" }}>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 10,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Log in
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: 10,
                background: "linear-gradient(135deg,#9333ea,#6366f1)",
                border: "none",
                color: "white",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(147,51,234,0.4)",
              }}
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
