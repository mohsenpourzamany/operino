export default function HowItWorks() {
  return (
    <div className="w-full bg-[#0b0b1a] py-12 px-6 flex flex-col items-center gap-10 mt-5">
      {/* Title */}
      <h2 className="text-white text-2xl font-bold tracking-tight">
        How Operino Works
      </h2>

      {/* Steps Row */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-5 max-w-50 text-center mx-15 ">
          {/* Icon cluster */}
          <div className="relative w-27.5 h-20 flex items-center justify-center">
            {/* Step number badge */}
            <div className="absolute top-0 left-3 w-6 h-6 rounded-full bg-[#7c5cfc] flex items-center justify-center z-10">
              <span className="text-white text-[11px] font-bold">1</span>
            </div>
            {/* Chat bubble icon */}
            <div className="absolute bottom-0 left-4.5 w-9 h-9 rounded-xl bg-[#7c5cfc] flex items-center justify-center shadow-lg shadow-purple-900/50">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            {/* Instagram */}
            <div
              className="absolute bottom-0 left-9.5 w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(145deg,#f9174b,#f07133)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
              </svg>
            </div>
            {/* WhatsApp */}
            <div className="absolute bottom-0 right-4 w-9 h-9 rounded-xl bg-[#25d366] flex items-center justify-center shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.19-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.24-1.44l-.37-.22-3.87 1.01 1.04-3.77-.24-.39A9.93 9.93 0 012 12C2 6.48 6.48 2 12 2c2.65 0 5.14 1.03 7.01 2.9A9.89 9.89 0 0122 12c0 5.52-4.48 10-10 10zm5.5-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.48.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.1-.27-.17-.57-.32z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] mb-1">
              Connect your channels
            </p>
            <p className="text-white/40 text-[12.5px] leading-relaxed">
              Connect Instagram, WhatsApp
              <br />
              or your website in just a few clicks.
            </p>
          </div>
        </div>

        {/* Arrow 1 */}
        <Arrow />

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-4 max-w-50 text-center mx-15">
          <div className="relative w-27.5 h-20 flex items-center justify-center">
            {/* Step number badge */}
            <div className="absolute top-0 left-6 w-6 h-6 rounded-full bg-[#7c5cfc] flex items-center justify-center z-10">
              <span className="text-white text-[11px] font-bold">2</span>
            </div>
            {/* Robot face */}
            <div
              className="w-17.5 h-17.5 rounded-full bg-[#1a1030] border-2 border-[#7c5cfc]/40 flex items-center justify-center mt-2"
              style={{ boxShadow: "0 0 24px rgba(124,92,252,0.25)" }}
            >
              <RobotFace />
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] mb-1">
              Train your AI agent
            </p>
            <p className="text-white/40 text-[12.5px] leading-relaxed">
              Teach your AI about your business,
              <br />
              products, and how to talk to customers.
            </p>
          </div>
        </div>

        {/* Arrow 2 */}
        <Arrow />

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-4 max-w-50 text-center mx-15">
          <div className="relative w-27.5 h-20 flex items-center justify-center">
            {/* Step number badge */}
            <div className="absolute top-0 left-6 w-6 h-6 rounded-full bg-[#7c5cfc] flex items-center justify-center z-10">
              <span className="text-white text-[11px] font-bold">3</span>
            </div>
            {/* Lightning box */}
            <div
              className="w-14.5 h-14.5 rounded-2xl flex items-center justify-center mt-2"
              style={{
                background: "rgba(124,92,252,0.18)",
                boxShadow: "0 0 28px rgba(124,92,252,0.35)",
                border: "1px solid rgba(124,92,252,0.3)",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#a78bfa">
                <path d="M13 2L4.09 12.26a1 1 0 00.79 1.62H11l-1 8.12L19.91 11.74a1 1 0 00-.79-1.62H13l1-8.12z" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-white font-semibold text-[15px] mb-1">
              Let it reply and capture leads
            </p>
            <p className="text-white/40 text-[12.5px] leading-relaxed">
              Your AI employee replies, answers
              <br />
              questions and captures qualified leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center pb-10">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </div>
  );
}

function RobotFace() {
  return (
    <svg width="44" height="44" viewBox="0 0 80 80" fill="none">
      {/* Antenna */}
      <line
        x1="40"
        y1="8"
        x2="40"
        y2="20"
        stroke="#a78bfa"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="40" cy="6" r="4" fill="#7c5cfc" />

      {/* Head */}
      <rect
        x="16"
        y="20"
        width="48"
        height="42"
        rx="14"
        fill="#2d1b69"
        stroke="#7c5cfc"
        strokeWidth="2"
      />

      {/* Eyes */}
      <rect
        x="25"
        y="33"
        width="10"
        height="10"
        rx="3"
        fill="#7c5cfc"
        opacity="0.9"
      />
      <rect
        x="45"
        y="33"
        width="10"
        height="10"
        rx="3"
        fill="#7c5cfc"
        opacity="0.9"
      />
      {/* Eye shine */}
      <rect
        x="27"
        y="35"
        width="3"
        height="3"
        rx="1"
        fill="white"
        opacity="0.6"
      />
      <rect
        x="47"
        y="35"
        width="3"
        height="3"
        rx="1"
        fill="white"
        opacity="0.6"
      />

      {/* Mouth */}
      <rect
        x="26"
        y="50"
        width="28"
        height="5"
        rx="2.5"
        fill="#7c5cfc"
        opacity="0.5"
      />
      {/* Mouth dots */}
      <circle cx="31" cy="52.5" r="2" fill="#a78bfa" />
      <circle cx="40" cy="52.5" r="2" fill="#a78bfa" />
      <circle cx="49" cy="52.5" r="2" fill="#a78bfa" />
    </svg>
  );
}
