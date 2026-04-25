import Logo from "../assets/operino-favicon.svg";

const ChevronDown = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const NavItem = ({
  label,
  hasDropdown,
  active,
}: {
  label: string;
  hasDropdown?: boolean;
  active?: boolean;
}) => (
  <div className="relative flex flex-col items-center cursor-pointer group">
    <div className="flex items-center gap-1 text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 py-1 px-1">
      {label}
      {hasDropdown && (
        <span className="text-white/50 group-hover:text-white/80 transition-colors">
          <ChevronDown />
        </span>
      )}
    </div>
    {active && (
      <span
        className="absolute -bottom-4.5 h-0.5 w-full rounded-full"
        style={{ background: "linear-gradient(90deg, #a855f7, #6366f1)" }}
      />
    )}
  </div>
);

export default function OperinHeader() {
  return (
    <div className="py-6">
      <nav
        className="flex items-center justify-between px-4 py-0 rounded-2xl mx-auto max-w-325"
        style={{
          background: "#0f0c2a",
          border: "1px solid rgba(139,92,246,0.25)",
          boxShadow:
            "0 0 0 1px rgba(109,40,217,0.08), inset 0 1px 0 rgba(168,85,247,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top purple glow line inside navbar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #a855f7, #7c3aed, #a855f7, transparent)",
            opacity: 0.9,
          }}
        />
        {/* {Logo Section} */}
        <div className="flex items-center">
          <img src={Logo} alt="OperinoLogo" className="w-18 ml-2 my-1" />

          <div className="flex flex-col text-center ">
            <span className="text-white text-lg">OPERINO</span>

            <div>
              <div className="ml-2 px-1.5 py-0.5 text-xs font-medium text-blue-50">
                Your AI Employee
              </div>
            </div>
          </div>
        </div>
        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <NavItem label="Features" hasDropdown active />
          <NavItem label="Use Cases" active />
          <NavItem label="Pricing" />
          <NavItem label="Resources" hasDropdown />
          <NavItem label="About" />
        </div>

        {/* Auth */}
        <div className="flex items-center gap-4">
          <button className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200">
            Log in
          </button>
          <div className="w-px h-5 bg-white/15" />
          <button
            className="px-5 py-2 rounded-xl text-white text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #6366f1 100%)",
              boxShadow: "0 0 18px rgba(147,51,234,0.45)",
            }}
          >
            Start Free
          </button>
        </div>
      </nav>
    </div>
  );
}
