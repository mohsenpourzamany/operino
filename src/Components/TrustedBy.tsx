const brands = [
  {
    name: "travelio",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <rect x="3" y="5" width="18" height="15" rx="2.5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M3 9h18" />
        <path d="M8 5V3M16 5V3" />
      </svg>
    ),
  },
  {
    name: "ClinicPro",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
  },
  {
    name: "Foodora",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    name: "Shopino",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    name: "EasyStay",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v9l4 4" strokeLinecap="round" />
        <path d="M7.5 7.5l1.5 1.5M16.5 7.5l-1.5 1.5M7.5 16.5l1.5-1.5M16.5 16.5l-1.5-1.5" />
      </svg>
    ),
  },
];

export default function TrustedBy() {
  return (
    <div className="max-w-9/12 bg-[#0b0f1e] py-8 px-6 flex flex-col items-center gap-6 rounded-2xl mx-auto border border-gray-800">
      {/* Label */}
      <p
        className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30"
        style={{ letterSpacing: "0.18em" }}
      >
        Trusted by businesses worldwide
      </p>

      {/* Brands */}
      <div className="flex flex-wrap items-center justify-center gap-x-20 gap-y-6">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200 cursor-default select-none"
          >
            <span className="text-white/40">{brand.icon}</span>
            <span className="text-[15px] font-semibold tracking-wide text-white/40">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
