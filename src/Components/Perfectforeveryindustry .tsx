interface Industry {
  title: string;
  description: string;
  iconColor: string;
  icon: React.ReactNode;
}

const industries: Industry[] = [
  {
    title: "Travel Agencies",
    description:
      "Answer trip inquiries, provide quotes and capture bookings automatically.",
    iconColor: "#3b9eff",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
  },
  {
    title: "Clinics & Healthcare",
    description:
      "Answer patient questions, appointment booking and follow-ups.",
    iconColor: "#2dd4bf",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    title: "Restaurants",
    description:
      "Take reservations, answer menu questions and manage customer requests.",
    iconColor: "#a78bfa",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 2v7H9V2H7v7a4 4 0 003 3.87V22h2v-9.13A4 4 0 0015 9V2h-2v7h-2V2h-2zM19 2h-1c-1.1 0-2 .9-2 2v7a3 3 0 002 2.83V22h2V2z" />
      </svg>
    ),
  },
  {
    title: "E-commerce",
    description:
      "Answer product questions, track orders and increase conversions.",
    iconColor: "#fbbf24",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a2 2 0 00-2 2v11a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2zm-9-1a2 2 0 014 0v1h-4V6zm9 14H5V9h14v11z" />
      </svg>
    ),
  },
  {
    title: "Influencers",
    description:
      "Auto-reply to DMs, manage brand deals and turn followers into customers.",
    iconColor: "#f472b6",
    icon: (
      <svg
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 11l-4 4-2-2" />
        <circle
          cx="19"
          cy="8"
          r="3"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
        />
        <path d="M18 7l2 2" />
      </svg>
    ),
  },
];

export default function PerfectForEveryIndustry() {
  return (
    <div className="w-full bg-[#0b0b1a] py-14 px-6 flex flex-col items-center gap-10">
      {/* Title */}
      <h2 className="text-white text-2xl font-bold tracking-tight text-center">
        Perfect for every industry
      </h2>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-4 max-w-275 w-full">
        {industries.map((industry) => (
          <div
            key={industry.title}
            className="flex flex-col gap-4 rounded-2xl p-5 w-48.75 shrink-0"
            style={{
              background: "#13132a",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
            }}
          >
            {/* Icon + Title row */}
            <div className="flex items-center gap-3">
              {/* Icon box */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${industry.iconColor}18`,
                  color: industry.iconColor,
                }}
              >
                {industry.icon}
              </div>
              <p className="text-white font-semibold text-[13.5px] leading-snug">
                {industry.title}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/40 text-[12px] leading-relaxed">
              {industry.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
