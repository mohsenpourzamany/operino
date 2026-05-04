import { useState, useEffect, useRef, useCallback } from "react";
import mohsen from "../../../assets/Photos/MohsenPourzamanyPhoto.png";
// ─── Data ─────────────────────────────────────────────────────────────────────
const team = [
  {
    name: "Mohsen Pourzamany",
    role: "Founder & CEO",
    bio: "Passionate about AI and automation. On a mission to build the future workforce.",
    avatar: mohsen,
    linkedin: "#",
    color: "#7c5cfc",
  },
  {
    name: "Sara Nikzad",
    role: "Head of Product",
    bio: "Product thinker with a love for solving real problems and creating beautiful experiences.",
    avatar: "https://i.pravatar.cc/160?img=47",
    linkedin: "#",
    color: "#a78bfa",
  },
  {
    name: "Mahdi Rahimi",
    role: "Head of Engineering",
    bio: "Full-stack builder who loves turning complex ideas into powerful solutions.",
    avatar: "https://i.pravatar.cc/160?img=12",
    linkedin: "#",
    color: "#818cf8",
  },
  {
    name: "Neda Farahani",
    role: "Head of Design",
    bio: "Designing intuitive interfaces that make powerful technology easy to use.",
    avatar: "https://i.pravatar.cc/160?img=25",
    linkedin: "#",
    color: "#c4b5fd",
  },
  {
    name: "Kian Pour",
    role: "Head of Growth",
    bio: "Growth strategist focused on helping businesses succeed with AI.",
    avatar: "https://i.pravatar.cc/160?img=57",
    linkedin: "#",
    color: "#7c5cfc",
  },
];

// ─── LinkedIn icon ────────────────────────────────────────────────────────────
const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

// ─── 3D tilt card ─────────────────────────────────────────────────────────────
function TeamCard({
  member,
  index,
  isVisible,
}: {
  member: (typeof team)[0];
  index: number;
  isVisible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: px, y: py });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        flex: "1 1 170px",
        maxWidth: 220,
        minWidth: 150,
        perspective: 800,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s cubic-bezier(.34,1.3,.64,1) ${index * 0.1}s`,
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(160deg,#1c1648,#151035)"
            : "linear-gradient(160deg,#14112e,#0f0d26)",
          border: hovered
            ? `1px solid ${member.color}55`
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 20,
          padding: "clamp(16px,2.5vw,24px) clamp(12px,2vw,18px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          cursor: "default",
          position: "relative",
          overflow: "hidden",
          transform: hovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.03)`
            : "rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.1s ease, border-color 0.3s, background 0.3s, box-shadow 0.3s"
            : "transform 0.5s cubic-bezier(.4,0,.2,1), border-color 0.3s, background 0.3s, box-shadow 0.3s",
          boxShadow: hovered
            ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${member.color}25`
            : "0 4px 20px rgba(0,0,0,0.3)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Moving glow spotlight */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              borderRadius: 20,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${member.color}20 0%, transparent 55%)`,
              transition: "background 0.05s",
              zIndex: 0,
            }}
          />
        )}

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: -30,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 80,
            background: `radial-gradient(ellipse,${member.color}${hovered ? "28" : "10"} 0%,transparent 70%)`,
            transition: "background 0.4s",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Avatar container */}
        <div
          style={{
            position: "relative",
            marginBottom: "clamp(14px,2vw,20px)",
            zIndex: 1,
            transformStyle: "preserve-3d",
            transform: hovered ? "translateZ(20px)" : "translateZ(0)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Ring */}
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: `2px solid ${member.color}`,
              opacity: hovered ? 0.7 : 0.25,
              transition: "opacity 0.4s, box-shadow 0.4s",
              boxShadow: hovered ? `0 0 20px ${member.color}60` : "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              border: `1px solid ${member.color}`,
              opacity: hovered ? 0.25 : 0,
              transition: "opacity 0.4s",
            }}
          />

          {/* Avatar */}
          <div
            style={{
              width: "clamp(80px,12vw,110px)",
              height: "clamp(80px,12vw,110px)",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {!imgLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(124,92,252,0.15)",
                  borderRadius: "50%",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }}
              />
            )}
            <img
              src={member.avatar}
              alt={member.name}
              onLoad={() => setImgLoaded(true)}
              style={
                {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: hovered
                    ? "brightness(1.1) saturate(1.1)"
                    : "brightness(0.9) saturate(0.8)",
                  transition: "filter 0.4s",
                  opacity: imgLoaded ? 1 : 0,
                  transition2: "opacity 0.4s",
                } as React.CSSProperties
              }
            />
          </div>
        </div>

        {/* Text content */}
        <div
          style={{
            textAlign: "center",
            zIndex: 1,
            width: "100%",
            transformStyle: "preserve-3d",
            transform: hovered ? "translateZ(10px)" : "translateZ(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <h3
            style={{
              margin: "0 0 4px",
              fontSize: "clamp(13px,1.8vw,15px)",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.2px",
            }}
          >
            {member.name}
          </h3>
          <p
            style={{
              margin: "0 0 clamp(8px,1.5vw,12px)",
              fontSize: "clamp(10px,1.3vw,12px)",
              color: member.color,
              fontWeight: 600,
              fontStyle: "italic",
            }}
          >
            {member.role}
          </p>
          <p
            style={{
              margin: "0 0 clamp(12px,2vw,18px)",
              fontSize: "clamp(10.5px,1.3vw,12px)",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.65,
            }}
          >
            {member.bio}
          </p>
        </div>

        {/* LinkedIn button */}
        <a
          href={member.linkedin}
          onClick={(e) => e.preventDefault()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            borderRadius: 10,
            background: hovered
              ? `${member.color}25`
              : "rgba(255,255,255,0.05)",
            border: hovered
              ? `1px solid ${member.color}55`
              : "1px solid rgba(255,255,255,0.1)",
            color: hovered ? member.color : "rgba(255,255,255,0.4)",
            textDecoration: "none",
            transition: "all 0.3s ease",
            transform: hovered ? "translateZ(15px) scale(1.1)" : "scale(1)",
            boxShadow: hovered ? `0 4px 16px ${member.color}35` : "none",
            zIndex: 2,
          }}
        >
          <LinkedInIcon />
        </a>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function MeetTheTeam() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        background: "linear-gradient(160deg,#09091a,#0d0b22 50%,#09091a)",
        padding: "clamp(56px,8vw,96px) clamp(16px,5vw,48px)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glowPulse { 0%,100%{opacity:0.25} 50%{opacity:0.5} }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
      `}</style>

      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: "50%",
          height: "60%",
          background:
            "radial-gradient(ellipse,rgba(80,40,200,0.07) 0%,transparent 70%)",
          animation: "glowPulse 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "35%",
          height: "45%",
          background:
            "radial-gradient(ellipse,rgba(124,92,252,0.06) 0%,transparent 70%)",
          animation: "glowPulse 6s ease-in-out infinite 2s",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(36px,6vw,60px)",
          animation: isVisible ? "fadeUp 0.65s ease both" : "none",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <h2
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(22px,4vw,34px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.4px",
          }}
        >
          Meet the Team
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(13px,1.8vw,15px)",
            color: "rgba(255,255,255,0.38)",
          }}
        >
          A diverse group of builders, thinkers, and dreamers.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(12px,2vw,20px)",
          justifyContent: "center",
          maxWidth: 1100,
          margin: "0 auto",
          perspective: 1000,
        }}
      >
        {team.map((member, i) => (
          <TeamCard
            key={member.name}
            member={member}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
