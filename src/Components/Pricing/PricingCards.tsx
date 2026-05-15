import React, { useEffect, useRef, useState } from "react";

const plans = {
  monthly: [
    {
      tag: "FREE", name: "Free", sub: "Perfect for trying out Operino",
      price: 0, period: "/month",
      features: ["1 AI Agent", "1 Channel", "100 Conversations / month", "Basic Analytics", "Community Support"],
      cta: "Get Started Free", ctaStyle: "filled", popular: false,
    },
    {
      tag: null, name: "Starter", sub: "Perfect for small teams",
      price: 29, period: "/month",
      features: ["1 AI Agent", "2 Channels", "1,000 Conversations / month", "Basic Analytics", "Email Support"],
      cta: "Start Free", ctaStyle: "outline", popular: false,
    },
    {
      tag: "MOST POPULAR", name: "Pro", sub: "For growing teams",
      price: 79, period: "/month",
      features: ["3 AI Agents", "5 Channels", "10,000 Conversations / month", "Advanced Analytics", "Priority Support"],
      cta: "Start Free", ctaStyle: "filled", popular: true,
    },
    {
      tag: null, name: "Business", sub: "For high volume teams",
      price: 199, period: "/month",
      features: ["Unlimited AI Agents", "Unlimited Channels", "Unlimited Conversations", "Custom Integrations", "Dedicated Support"],
      cta: "Book a Demo", ctaStyle: "outline", popular: false,
    },
  ],
  yearly: [
    {
      tag: "FREE", name: "Free", sub: "Perfect for trying out Operino",
      price: 0, period: "/month, billed yearly",
      features: ["1 AI Agent", "1 Channel", "100 Conversations / month", "Basic Analytics", "Community Support"],
      cta: "Get Started Free", ctaStyle: "filled", popular: false,
    },
    {
      tag: null, name: "Starter", sub: "Perfect for small teams",
      price: 23, period: "/month, billed yearly",
      originalPrice: 29,
      features: ["1 AI Agent", "3 Channels", "2,000 Conversations / month", "Advanced Analytics", "Email Support", "API Access"],
      cta: "Start Free", ctaStyle: "outline", popular: false,
    },
    {
      tag: "MOST POPULAR", name: "Pro", sub: "For growing teams",
      price: 63, period: "/month, billed yearly",
      originalPrice: 79,
      features: ["5 AI Agents", "10 Channels", "25,000 Conversations / month", "Advanced Analytics", "Priority Support", "Custom Branding"],
      cta: "Start Free", ctaStyle: "filled", popular: true,
    },
    {
      tag: null, name: "Business", sub: "For high volume teams",
      price: 159, period: "/month, billed yearly",
      originalPrice: 199,
      features: ["Unlimited AI Agents", "Unlimited Channels", "Unlimited Conversations", "Custom Integrations", "Dedicated Support", "SLA Guarantee"],
      cta: "Book a Demo", ctaStyle: "outline", popular: false,
    },
  ],
};

interface Props { billing: "monthly" | "yearly"; }

const PricingCards: React.FC<Props> = ({ billing }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prevBilling, setPrevBilling] = useState(billing);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (billing !== prevBilling) {
      setAnimKey(k => k + 1);
      setPrevBilling(billing);
    }
  }, [billing]);

  const currentPlans = plans[billing];

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
        .pc-fade { animation: fadeUp 0.55s ease forwards; }

        @keyframes priceFlip {
          0%   { opacity:1; transform:translateY(0) scale(1); }
          40%  { opacity:0; transform:translateY(-16px) scale(0.9); }
          60%  { opacity:0; transform:translateY(16px) scale(0.9); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        .price-flip { animation: priceFlip 0.5s ease forwards; }

        @keyframes featureIn {
          from { opacity:0; transform:translateX(-8px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .feature-in { animation: featureIn 0.35s ease forwards; }

        .pc-card {
          border:1px solid rgba(255,255,255,0.08);
          transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;
          position:relative; overflow:hidden;
        }
        .pc-card:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(124,92,252,0.18); }
        .pc-card.popular {
          border-color:rgba(124,92,252,0.6)!important;
          box-shadow:0 0 32px rgba(124,92,252,0.2);
        }
        .pc-card.popular:hover { box-shadow:0 16px 52px rgba(124,92,252,0.3); }

        /* Shimmer on popular */
        @keyframes borderShimmer {
          0%,100%{box-shadow:0 0 20px rgba(124,92,252,0.2),inset 0 0 20px rgba(124,92,252,0.03);}
          50%{box-shadow:0 0 36px rgba(124,92,252,0.4),inset 0 0 28px rgba(124,92,252,0.07);}
        }
        .pc-card.popular { animation:borderShimmer 3s ease-in-out infinite; }

        .cta-filled {
          transition:background 0.22s ease,transform 0.22s ease,box-shadow 0.22s ease;
          position:relative; overflow:hidden;
        }
        .cta-filled:hover { background:#6b4ce0!important; transform:translateY(-2px); box-shadow:0 6px 22px rgba(124,92,252,0.45); }
        @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);}100%{transform:translateX(300%) skewX(-15deg);} }
        .cta-filled::after { content:''; position:absolute; top:0; left:0; width:30%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent); transform:translateX(-100%) skewX(-15deg); }
        .cta-filled:hover::after { animation:shimmer 0.55s ease forwards; }

        .cta-outline {
          transition:border-color 0.22s ease,background 0.22s ease,transform 0.22s ease,color 0.22s ease;
        }
        .cta-outline:hover { border-color:rgba(124,92,252,0.7)!important; background:rgba(124,92,252,0.1)!important; transform:translateY(-2px); color:#c4b5fd!important; }

        .check-icon { color:#7c5cfc; }

        @keyframes tagPulse { 0%,100%{box-shadow:0 0 0 0 rgba(124,92,252,0.4);}50%{box-shadow:0 0 0 6px rgba(124,92,252,0);} }
        .popular-tag { animation:tagPulse 2.5s ease-in-out infinite; }
      `}</style>

      <div ref={ref} className="pb-8">
        <div key={animKey} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentPlans.map((plan, i) => (
            <div key={plan.name}
              className={`pc-card flex flex-col rounded-2xl bg-[#0d0b1f] p-5 ${plan.popular ? "popular" : ""} ${visible ? "pc-fade" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.08}s` }}>

              {/* Popular badge */}
              {plan.tag === "MOST POPULAR" ? (
                <div className="popular-tag mb-3 self-start rounded-full bg-[#7c5cfc] px-3 py-0.5 text-[10px] font-bold text-white">
                  MOST POPULAR
                </div>
              ) : plan.tag === "FREE" ? (
                <div className="mb-3 self-start rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-bold text-gray-400">
                  FREE
                </div>
              ) : <div className="mb-3 h-5" />}

              <p className="text-[18px] font-bold text-white">{plan.name}</p>
              <p className="mt-0.5 text-[12px] text-gray-500">{plan.sub}</p>

              {/* Price */}
              <div className="mt-4 flex items-end gap-1">
                <span key={`${animKey}-price-${i}`} className="price-flip text-[clamp(32px,4vw,44px)] font-bold text-white leading-none">
                  ${plan.price}
                </span>
                <div className="mb-1 flex flex-col">
                  {(plan as any).originalPrice && (
                    <span className="text-[11px] text-gray-600 line-through">${(plan as any).originalPrice}</span>
                  )}
                  <span className="text-[11px] text-gray-500">{plan.period}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-white/8" />

              {/* Features */}
              <ul className="flex flex-1 flex-col gap-2">
                {plan.features.map((f, fi) => (
                  <li key={`${animKey}-f-${fi}`}
                    className="feature-in flex items-center gap-2 text-[12px] text-gray-300"
                    style={{ animationDelay: `${i * 0.08 + fi * 0.05}s` }}>
                    <span className="check-icon flex-shrink-0 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-5 w-full rounded-xl py-2.5 text-[13px] font-semibold ${
                  plan.ctaStyle === "filled"
                    ? "cta-filled bg-[#7c5cfc] text-white"
                    : "cta-outline border border-[#7c5cfc]/40 bg-transparent text-[#a78bfa]"
                }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingCards;
