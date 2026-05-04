import PhotoStory from "../../../assets/Photos/opi-connect.png";
const RightHeroOurStory = () => {
  return (
    <div>
      <img
        src={PhotoStory}
        alt="Hero Image"
        className="items-center justify-center mt-24 rounded-5xl"
        style={{
          width: "100%",
          minHeight: "50vh",
        }}
      />
    </div>
  );
};

export default RightHeroOurStory;
