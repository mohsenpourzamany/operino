import { ArrowRight } from "lucide-react";

export default function HireAICta() {
  return (
    <section className="w-full bg-[#020617] px-4 py-2">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-indigo-500/40 bg-linear-to-r from-purple-950/80 via-slate-950 to-blue-950/70 p-px shadow-[0_0_35px_rgba(99,102,241,0.35)]">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(168,85,247,0.18),transparent)] animate-[shimmer_4s_infinite]" />

        <div className="relative flex flex-col gap-6 rounded-2xl bg-linear-to-r from-[#170c3a]/90 via-[#0b1028]/95 to-[#071631]/90 px-8 py-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Ready to hire your AI employee?
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-200 md:text-base">
              Start your free trial today. No credit card required.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-purple-500 px-8 py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(139,92,246,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.75)]">
              Start Free
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button className="rounded-xl border border-slate-500/60 bg-slate-950/40 px-8 py-4 text-sm font-bold text-white shadow-inner transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:bg-violet-950/30 hover:shadow-[0_0_25px_rgba(139,92,246,0.35)]">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
