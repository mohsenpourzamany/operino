import Dashboard from "../Components/HomePage/Dashboard";
import FAQ from "../Components/HomePage/Faq";
import HeroSection from "../Components/HomePage/Hero/HeroSection";
import HireAICta from "../Components/HomePage/HireAICta";
import HowItWorks from "../Components/HomePage/HowItWorks";
import PerfectForEveryIndustry from "../Components/HomePage/Perfectforeveryindustry ";
import Pricing from "../Components/HomePage/Pricing";
import TrustedBy from "../Components/HomePage/TrustedBy";

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
