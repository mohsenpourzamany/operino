import { Rocket, Code2, Users, Globe, Sparkles } from "lucide-react";

const steps = [
  {
    year: "2023",
    title: "The Spark",
    desc: "The idea for Operino was born from our frustration with repetitive tasks and fragmented tools.",
    icon: Rocket,
  },
  {
    year: "Early 2024",
    title: "First Steps",
    desc: "We built our first AI agents and realized the impact automation could have on businesses.",
    icon: Code2,
  },
  {
    year: "Mid 2024",
    title: "Growing Together",
    desc: "We launched publicly and early users helped shape the platform.",
    icon: Users,
  },
  {
    year: "Late 2024",
    title: "Scaling Globally",
    desc: "Operino grew to thousands of businesses across industries.",
    icon: Globe,
  },
  {
    year: "2025+",
    title: "The Future",
    desc: "We’re just getting started. The mission is bigger than ever.",
    icon: Sparkles,
  },
];

// const particlePositions = Array.from({ length: 20 }, (_, i) => ({
//   left: `${Math.random() * 100}%`,
//   delay: i * 0.3,
// }));

export default function JourneyTimeline() {
  return (
    <div className="w-full py-20 bg-linear-to-b from-[#020617] to-[#020617] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-16">
          Our Journey
        </h2>

        <div className="relative">
          {/* Animated line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500 via-indigo-500 to-purple-500" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Glow circle */}
                  <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                    <div className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition bg-purple-600" />

                    <div className="relative w-14 h-14 flex items-center justify-center rounded-full bg-[#0f172a] border border-purple-500/30 shadow-lg">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>

                  <p className="text-sm text-purple-400 mb-1">{step.year}</p>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Floating particles */}
          {/* <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particlePositions.map((pos, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                style={{
                  left: pos.left,
                  bottom: "0%",
                }}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
