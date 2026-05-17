import IntegrationNetwork from "../../Components/Features/Integration/IntegrationNetwork";
import IntegrationsCategoryBar from "../../Components/Features/Integration/IntegrationsCategoryBar";
import IntegrationsHero from "../../Components/Features/Integration/IntegrationsHero";
import TrustedBrands from "../../Components/Features/Integration/TrustedBrands";

const IntegrationsSection = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-full flex xl:flex-row  flex-col items-center  gap-20">
        <IntegrationsHero />
        <IntegrationNetwork />
      </div>
      <IntegrationsCategoryBar />
      <TrustedBrands />
    </div>
  );
};

export default IntegrationsSection;
