import HealthcareAISolutions from "../../Components/UseCase/HealthCare/HealthcareAISolutions";
import HealthcareCTA from "../../Components/UseCase/HealthCare/HealthcareCTA";
import HealthcareDashboard from "../../Components/UseCase/HealthCare/HealthcareDashboard";
import HealthcareHero from "../../Components/UseCase/HealthCare/HealthcareHero";
import HealthcareIntegrations from "../../Components/UseCase/HealthCare/HealthcareIntegrations";
import HealthcareTestimonials from "../../Components/UseCase/HealthCare/HealthcareTestimonials";

const HealthCarePage = () => {
  return (
    <div>
      <HealthcareHero />
      <HealthcareDashboard />
      <HealthcareAISolutions />
      <HealthcareIntegrations />
      <HealthcareTestimonials />
      <HealthcareCTA />
    </div>
  );
};

export default HealthCarePage;
