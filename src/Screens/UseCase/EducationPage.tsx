import SeamlessIntegrations from "../../Components/Features/Analytics/SeamlessIntegrations";
import EducationAISolutions from "../../Components/UseCase/Education/EducationAISolutions";
import EducationCTA from "../../Components/UseCase/Education/EducationCTA";
import EducationDashboard from "../../Components/UseCase/Education/EducationDashboard";
import EducationHero from "../../Components/UseCase/Education/EducationHero";
import EducationTestimonials from "../../Components/UseCase/Education/EducationTestimonials";

const EducationPage = () => {
  return (
    <div>
      <EducationHero />
      <EducationDashboard />
      <EducationAISolutions />
      <SeamlessIntegrations />
      <EducationTestimonials />
      <EducationCTA />
    </div>
  );
};

export default EducationPage;
