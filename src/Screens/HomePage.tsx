import Dashboard from "../Components/Dashboard";
import FAQ from "../Components/Faq";
import HeroSection from "../Components/Hero/HeroSection";
import HireAICta from "../Components/HireAICta";
import HowItWorks from "../Components/HowItWorks";
import PerfectForEveryIndustry from "../Components/Perfectforeveryindustry ";
import Pricing from "../Components/Pricing";
import TrustedBy from "../Components/TrustedBy";
import Footer from "../UI/Footer";
import Header from "../UI/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <TrustedBy />
      <HowItWorks />
      <PerfectForEveryIndustry />
      <Dashboard />
      <Pricing />
      <FAQ />
      <HireAICta />
      <Footer />
    </div>
  );
};

export default HomePage;
