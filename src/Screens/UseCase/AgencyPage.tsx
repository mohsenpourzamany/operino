import SeamlessIntegrations from "../../Components/Features/Analytics/SeamlessIntegrations";
import AgencyAISolutions from "../../Components/UseCase/Agency/AgencyAISolutions";
import AgencyCTA from "../../Components/UseCase/Agency/AgencyCTA";
import AgencyDashboard from "../../Components/UseCase/Agency/AgencyDashboard";
import AgencyHero from "../../Components/UseCase/Agency/AgencyHero";
import AgencyTestimonials from "../../Components/UseCase/Agency/AgencyTestimonials";

const AgencyPage = () => {
  return (
    <div>
      <AgencyHero />
      <AgencyDashboard />
      <AgencyAISolutions />
      <SeamlessIntegrations />
      <AgencyTestimonials />
      <AgencyCTA />
    </div>
  );
};

export default AgencyPage;
