import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import SaasTechPage from "./Screens/UseCase/SaasTechPage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <SaasTechPage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
