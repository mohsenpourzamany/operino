import SaaS_CTA from "../../Components/UseCase/SaasTech/SaaS_CTA";
import SaaSDashboard from "../../Components/UseCase/SaasTech/SaaSDashboard";
import SaaSHero from "../../Components/UseCase/SaasTech/SaaSHero";
import SaaSIntegrations from "../../Components/UseCase/SaasTech/SaaSIntegrations";
import SaaSTestimonials from "../../Components/UseCase/SaasTech/SaaSTestimonials";

const SaasTechPage = () => {
  return (
    <div>
      <SaaSHero />
      <SaaSDashboard />
      <SaaSIntegrations />
      <SaaSTestimonials />
      <SaaS_CTA />
    </div>
  );
};

export default SaasTechPage;
