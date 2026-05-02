import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import OurStory from "./Screens/OurStory";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <OperinoBg>
        <div className="operino-bg">
          <Header />
          <OurStory />
          <Footer />
        </div>
      </OperinoBg>
    </>
  );
}

export default App;
