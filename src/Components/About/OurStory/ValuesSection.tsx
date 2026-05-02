import { Zap, Target, Users, Flag, TrendingUp } from "lucide-react";

const values = [
  {
    title: "Simplicity",
    desc: "Powerful doesn’t have to be complicated. We keep things simple and intuitive.",
    icon: Zap,
  },
  {
    title: "Impact",
    desc: "We measure success by the impact we create for our users and their customers.",
    icon: Target,
  },
  {
    title: "Collaboration",
    desc: "We believe the best results come from working together and sharing knowledge.",
    icon: Users,
  },
  {
    title: "Ownership",
    desc: "We take ownership, act with responsibility, and always go the extra mile.",
    icon: Flag,
  },
  {
    title: "Growth",
    desc: "We grow with our users, learn fast, and never stop improving.",
    icon: TrendingUp,
  },
];

export default function ValuesSection() {
  return (
    <section className="relative w-2/3 mx-auto rounded-3xl py-16 px-10 text-white overflow-hidden ">
      {/* animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.25),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.2),transparent_40%)]" />

      {/* moving grid light effect */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-size-[60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-center text-purple-400 mb-12 font-extrabold text-3xl md:text-4xl">
          Our Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
              >
                {/* neon border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 border border-purple-500/40 blur-sm" />

                {/* gradient hover light */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-purple-600/20 via-transparent to-blue-500/20" />

                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0f172a] border border-purple-500/30 mb-4">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>

                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
