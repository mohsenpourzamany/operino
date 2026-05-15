import React, { useState } from "react";
import PricingHero from "../Components/Pricing/PricingHero";
import PricingCards from "../Components/Pricing/PricingCards";
import PricingFeatures from "../Components/Pricing/PricingFeatures";

const PricingPage: React.FC = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .pp-wrap { font-family:'DM Sans',sans-serif; }
        .pp-scroll::-webkit-scrollbar { width:4px; }
        .pp-scroll::-webkit-scrollbar-thumb { background:rgba(124,92,252,0.25); border-radius:4px; }
        .sec-div { border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0 0 28px; }
      `}</style>

      <div className="pp-wrap pp-scroll min-h-screen w-full overflow-y-auto bg-[#07050f]">
        <div className="mx-auto max-w-6xl px-[clamp(16px,4vw,48px)] py-10">
          <PricingHero billing={billing} onBillingChange={setBilling} />
          <hr className="sec-div" />
          <PricingCards billing={billing} />
          <hr className="sec-div" />
          <PricingFeatures />
          <div className="h-8" />
        </div>
      </div>
    </>
  );
};

export default PricingPage;
