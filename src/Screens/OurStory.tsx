import RightHeroOurStory from "../Components/About/OurStory/RightHeroOurStory";
import LeftHeroOurStory from "../Components/About/OurStory/LeftHeroOurStory";
import JourneyTimeline from "../Components/About/OurStory/JourneyTimeline";
import MissionSection from "../Components/About/OurStory/MissionSection";
import ValuesSection from "../Components/About/OurStory/ValuesSection";

const OurStory = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center-safe">
        <LeftHeroOurStory />
        <RightHeroOurStory />
      </div>
      <JourneyTimeline />
      <MissionSection />
      <ValuesSection />
    </>
  );
};

export default OurStory;
