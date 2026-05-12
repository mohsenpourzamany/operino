import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import GuidesTutorialPage from "./Screens/Resources/GuidesTutorialPage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <GuidesTutorialPage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
