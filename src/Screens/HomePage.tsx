import HeroSection from "../Components/Hero/HeroSection";
import HowItWorks from "../Components/HowItWorks";
import PerfectForEveryIndustry from "../Components/Perfectforeveryindustry ";
import TrustedBy from "../Components/TrustedBy";
import Header from "../UI/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <PerfectForEveryIndustry />
    </div>
  );
};

export default HomePage;
