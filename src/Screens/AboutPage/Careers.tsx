// import LeftHeroCareers from "../Components/About/Careers/LeftHeroCareers";
import CultureBar from "../../Components/About/Careers/CultureBar";
import NoRoleCTA from "../../Components/About/Careers/NoRoleCTA";
import OpenPositions from "../../Components/About/Careers/OpenPositions";
import RightHeroCareers from "../../Components/About/Careers/RightHeroCareers";
import WhyJoin from "../../Components/About/Careers/WhyJoin";

const Careers = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center">
        {/* <LeftHeroCareers /> */}
        <RightHeroCareers />
      </div>
      <CultureBar />
      <WhyJoin />
      <OpenPositions />
      <NoRoleCTA />
    </>
  );
};

export default Careers;
