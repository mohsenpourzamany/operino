import React, { useEffect, useRef, useState } from "react";

const features = [
  { icon: "🛡️", title: "Secure & Reliable", desc: "Enterprise-grade security and 99.9% uptime." },
  { icon: "📈", title: "Scalable", desc: "Easily upgrade or downgrade as your needs change." },
  { icon: "🎧", title: "24/7 Support", desc: "Get help from our team whenever you need it." },
  { icon: "💳", title: "Flexible Billing", desc: "Pay monthly or yearly. Cancel anytime." },
];

const PricingFeatures: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        .pf-fade { animation: fadeUp 0.55s ease forwards; }
        .pf-card {
          border:1px solid rgba(255,255,255,0.07);
          transition:transform 0.25s ease,border-color 0.25s ease,background 0.25s ease;
        }
        .pf-card:hover { transform:translateY(-4px); border-color:rgba(124,92,252,0.4); background:rgba(124,92,252,0.07)!important; }
        .pf-card:hover .pf-icon { transform:scale(1.15) rotate(-5deg); }
        .pf-icon { transition:transform 0.28s ease; }
      `}</style>

      <div ref={ref} className="pb-4">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i}
              className={`pf-card flex items-start gap-3 rounded-2xl bg-[#0d0b1f] p-4 ${visible ? "pf-fade" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.09}s` }}>
              <div className="pf-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#7c5cfc]/15 text-xl border border-[#7c5cfc]/25">
                {f.icon}
              </div>
              <div>
                <p className="text-[13px] font-bold text-white">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingFeatures;
