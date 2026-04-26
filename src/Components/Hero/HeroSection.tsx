import LeftHero from "./LeftHero";
import RightHero from "./RightHero";

const HeroSection = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-10 px-4 py-10 lg:gap-20">
      <LeftHero />
      <RightHero />
    </div>
  );
};

export default HeroSection;
