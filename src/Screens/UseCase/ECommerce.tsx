import SeamlessIntegrations from "../../Components/Features/Analytics/SeamlessIntegrations";
import AISolutions from "../../Components/UseCase/ECommerce/AISolutions";
import EcommerceCTA from "../../Components/UseCase/ECommerce/EcommerceCTA";
import EcommerceDashboard from "../../Components/UseCase/ECommerce/EcommerceDashboard";
import EcommerceHero from "../../Components/UseCase/ECommerce/EcommerceHero";
import SuccessStories from "../../Components/UseCase/ECommerce/SuccessStories";

const ECommerce = () => {
  return (
    <div>
      <EcommerceHero />
      <EcommerceDashboard />
      <AISolutions />
      <SuccessStories />
      <SeamlessIntegrations />
      <EcommerceCTA />
    </div>
  );
};

export default ECommerce;
