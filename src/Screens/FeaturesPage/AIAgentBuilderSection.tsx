import { motion } from "framer-motion";
import { Bot, Workflow, BrainCircuit, Zap } from "lucide-react";

const features = [
  {
    title: "Visual Agent Builder",
    desc: "Design AI agents with a simple drag & drop interface. No complexity, just flow.",
    icon: Workflow,
  },
  {
    title: "Smart AI Brain",
    desc: "Powered by advanced models to understand, decide, and act intelligently.",
    icon: BrainCircuit,
  },
  {
    title: "Automation Engine",
    desc: "Connect actions, triggers, and workflows to automate real business tasks.",
    icon: Zap,
  },
  {
    title: "Multi-Agent System",
    desc: "Create teams of AI agents working together seamlessly.",
    icon: Bot,
  },
];

export default function AIAgentBuilderSection() {
  return (
    <section className="relative w-full py-24 bg-[#020617] text-white overflow-hidden">
      {/* animated gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.2),transparent_40%)]" />

      {/* animated lines */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.15)_1px,transparent_1px)] bg-size-[80px_80px]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-purple-400 mb-4">AI Agent Builder</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            Build powerful AI agents <br /> without complexity
          </h2>
          <p className="text-gray-400">
            Create, connect, and deploy intelligent agents that automate your
            workflows and scale your operations.
          </p>
        </motion.div>

        {/* main layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* left visual mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6">
              {/* fake nodes */}
              <div className="flex flex-col gap-4">
                {["Trigger", "AI Decision", "Action"].map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity }}
                    className="p-4 rounded-xl bg-[#0f172a] border border-purple-500/20"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              {/* connecting line */}
              <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-linear-to-b from-purple-500 to-blue-500 opacity-40" />
            </div>
          </motion.div>

          {/* right features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group relative p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-purple-600/20 to-blue-500/20 blur-xl" />

                  <div className="relative">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0f172a] border border-purple-500/30 mb-3">
                      <Icon className="w-5 h-5 text-purple-400" />
                    </div>

                    <h3 className="font-semibold mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
