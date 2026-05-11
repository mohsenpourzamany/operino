import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import AgencyPage from "./Screens/UseCase/AgencyPage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <AgencyPage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
