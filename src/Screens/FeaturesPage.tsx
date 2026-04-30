import Header from "../UI/Header";
import HeroComponent from "../Components/FeaturesComponent/HeroComponent";
import Footer from "../UI/Footer";
import FeaturesTabs from "../Components/FeaturesComponent/FeaturesTabs ";

const FeaturesPage = () => {
  return (
    <div>
      <Header />
      <HeroComponent />
      <FeaturesTabs />
      <Footer />
    </div>
  );
};

export default FeaturesPage;
