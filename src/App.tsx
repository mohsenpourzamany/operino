import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import MultiChannelSection from "./Screens/MultiChannelSection";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <MultiChannelSection />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
