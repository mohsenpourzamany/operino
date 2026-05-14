import Dashboard from "../Components/Dashboard";
import FAQ from "../Components/Faq";
import HeroSection from "../Components/Hero/HeroSection";
import HireAICta from "../Components/HireAICta";
import HowItWorks from "../Components/HowItWorks";
import PerfectForEveryIndustry from "../Components/Perfectforeveryindustry ";
import Pricing from "../Components/Pricing";
import TrustedBy from "../Components/TrustedBy";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <PerfectForEveryIndustry />
      <Dashboard />
      <Pricing />
      <FAQ />
      <HireAICta />
    </div>
  );
};

export default HomePage;
