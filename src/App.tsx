import "./App.css";
import ContactSection from "./Components/About/Contact/ContactSection";
import OperinoBg from "./Components/OperinoBg";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <ContactSection />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
