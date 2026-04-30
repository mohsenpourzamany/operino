import { useState, useEffect, useRef } from "react";
import Logo from "../assets/operino-favicon.svg";
const links = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Resources: ["Help Center", "Blog", "Guides", "Status"],
  Company: ["About Us", "Careers", "Privacy Policy", "Terms of Service"],
};

const socials = [
  {
    label: "Instagram",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.944 4.667a1.5 1.5 0 00-1.61-.24L2.57 11.52c-.72.3-.69 1.34.05 1.59l4.43 1.38 1.68 5.13c.2.6.96.77 1.39.3l2.47-2.7 4.86 3.57c.54.4 1.31.11 1.45-.54l3.13-14.74a1.5 1.5 0 00-.09-.84zM9.86 14.6l-.38 3.36-1.06-3.24 9.3-7.27-7.86 7.15z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.32 4.37A19.8 19.8 0 0016.24 3l-.22.45a18.3 18.3 0 00-8.04 0L7.76 3a19.74 19.74 0 00-4.1 1.37C1.2 7.87.56 11.28.82 14.65a19.9 19.9 0 005.94 2.97l.5-.82a13 13 0 01-1.97-.94c.17-.12.34-.25.5-.38 3.8 1.76 7.92 1.76 11.68 0 .16.13.33.26.5.38a13 13 0 01-1.97.94l.5.82a19.86 19.86 0 005.94-2.97c.33-3.89-.56-7.26-2.42-10.28zM8.02 12.6c-.92 0-1.67-.84-1.67-1.87s.74-1.87 1.67-1.87c.93 0 1.68.84 1.67 1.87 0 1.03-.74 1.87-1.67 1.87zm7.96 0c-.92 0-1.67-.84-1.67-1.87s.74-1.87 1.67-1.87c.93 0 1.68.84 1.67 1.87 0 1.03-.74 1.87-1.67 1.87z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [visible, setVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      style={{
        width: "100%",
        background: "linear-gradient(180deg,#09091a 0%,#060612 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'Inter', sans-serif",
        padding: "48px 40px 28px",
        position: "relative",
        overflow: "hidden",
        marginTop: 40,
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 0.75; }
        }
        @keyframes underlineIn {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          left: "20%",
          width: 320,
          height: 200,
          background:
            "radial-gradient(ellipse, rgba(124,92,252,0.08) 0%, transparent 70%)",
          animation: "glowPulse 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          right: "15%",
          width: 240,
          height: 180,
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
          animation: "glowPulse 7s ease-in-out infinite 1s",
          pointerEvents: "none",
        }}
      />

      {/* Main grid */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* Brand */}
        <div
          style={{
            animation: visible ? "fadeUp 0.6s ease both" : "none",
            opacity: visible ? 1 : 0,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 14,
            }}
          >
            <img
              src={Logo}
              alt="Operino Logo"
              style={{ width: 60, height: 60 }}
            />
            <span
              style={{
                fontFamily: "'Poppins' !important",
                fontSize: 24,
                fontWeight: 700,
                color: "white",
                letterSpacing: "-0.3px",
              }}
            >
              Operino
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: 12.5,
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.65,
              maxWidth: 170,
            }}
          >
            Your AI employee for customer conversations.
          </p>
        </div>

        {/* Links + Social */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr) 140px",
            gap: 32,
          }}
        >
          {Object.entries(links).map(([group, items], gi) => (
            <div
              key={group}
              style={{
                animation: visible
                  ? `fadeUp 0.6s ${0.1 + gi * 0.1}s ease both`
                  : "none",
                opacity: visible ? 1 : 0,
              }}
            >
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.75)",
                  letterSpacing: "0.03em",
                }}
              >
                {group}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      fontSize: 12.5,
                      color:
                        hoveredLink === item
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.38)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "inline-block",
                      position: "relative",
                    }}
                  >
                    {item}
                    {/* underline on hover */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -1,
                        left: 0,
                        height: 1,
                        width: hoveredLink === item ? "100%" : "0%",
                        background: "linear-gradient(90deg,#7c5cfc,#a78bfa)",
                        transition: "width 0.25s ease",
                        borderRadius: 1,
                      }}
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Follow us */}
          <div
            style={{
              animation: visible ? "fadeUp 0.6s 0.4s ease both" : "none",
              opacity: visible ? 1 : 0,
            }}
          >
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.03em",
              }}
            >
              Follow us
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {socials.map((s) => (
                <button
                  key={s.label}
                  title={s.label}
                  onMouseEnter={() => setHoveredSocial(s.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background:
                      hoveredSocial === s.label
                        ? "rgba(124,92,252,0.2)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      hoveredSocial === s.label
                        ? "1px solid rgba(124,92,252,0.45)"
                        : "1px solid rgba(255,255,255,0.09)",
                    color:
                      hoveredSocial === s.label
                        ? "#c4b5fd"
                        : "rgba(255,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                    transform:
                      hoveredSocial === s.label
                        ? "translateY(-3px) scale(1.08)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredSocial === s.label
                        ? "0 6px 18px rgba(124,92,252,0.3)"
                        : "none",
                  }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: 1100,
          margin: "36px auto 0",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
          animation: visible ? "fadeUp 0.6s 0.5s ease both" : "none",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Bottom */}
      <div
        style={{
          maxWidth: 1100,
          margin: "18px auto 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
          animation: visible ? "fadeUp 0.6s 0.55s ease both" : "none",
          opacity: visible ? 1 : 0,
        }}
      >
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.22)" }}>
          © 2026 Operino. All rights reserved.
        </span>
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          Made with
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#7c5cfc">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
          </svg>
          by Webartino Team
        </span>
      </div>
    </footer>
  );
}
