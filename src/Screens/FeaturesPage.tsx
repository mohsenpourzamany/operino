import Header from "../UI/Header";
import HeroComponent from "../Components/FeaturesComponent/HeroComponent";
import Footer from "../UI/Footer";
import FeaturesTabs from "../Components/FeaturesComponent/FeaturesTabs ";
import IntegrationsSection from "../Components/FeaturesComponent/IntegrationsSection";
import StatsBar from "../Components/FeaturesComponent/StatsBar";
import CTABannerRobot from "../Components/FeaturesComponent/CTABannerRobot";
const FeaturesPage = () => {
  return (
    <div>
      <Header />
      <HeroComponent />
      <FeaturesTabs />
      <IntegrationsSection />
      <StatsBar />
      <CTABannerRobot />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
