import { User, Shield, Rocket } from "lucide-react";
import missionPhoto from "../../../assets/Photos/mission-bg.png";
const features = [
  {
    title: "Human First",
    desc: "We build technology that augments humans, not replaces them.",
    icon: User,
  },
  {
    title: "Trust & Transparency",
    desc: "Security, privacy, and ethical AI are at the core of everything we do.",
    icon: Shield,
  },
  {
    title: "Relentless Innovation",
    desc: "We constantly push the boundaries to deliver more value to our users.",
    icon: Rocket,
  },
];

const floatingPositions = Array.from({ length: 10 }, () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
}));

export default function MissionSection() {
  const positions = floatingPositions;

  return (
    <div className="flex flex-col lg:flex-row justify-center-safe">
      <div>
        <img
          src={missionPhoto}
          alt="Our Mission"
          className="items-center justify-center mt-24"
          style={{
            width: "120%",
            minHeight: "56vh",
          }}
        />
      </div>
      <div>
        <section className="relative py-24 text-white overflow-hidden">
          {/* animated gradient glow */}
          <div className="absolute inset-0 " />

          {/* floating blobs */}
          <div className="absolute inset-0 pointer-events-none">
            {positions.map((pos, i) => (
              <div
                key={i}
                className="absolute w-40 h-40 bg-purple-600/10 blur-3xl rounded-full"
                style={{
                  top: pos.top,
                  left: pos.left,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            {/* header */}
            <div className="max-w-2xl">
              <p className="text-purple-400 mb-4">Our Mission</p>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Empower every business <br /> with AI employees.
              </h2>
              <p className="text-gray-400 leading-relaxed">
                We’re on a mission to make powerful AI accessible to every
                business. Operino helps you build, deploy, and scale AI agents
                that automate conversations, workflows, and operations — so you
                can focus on what really matters.
              </p>
            </div>

            {/* features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-purple-500/40 transition"
                  >
                    {/* hover glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-purple-600/20 to-blue-500/10 blur-xl" />

                    <div className="relative">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0f172a] border border-purple-500/30 mb-4">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>

                      <h3 className="font-semibold mb-2">{f.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
