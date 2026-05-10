import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import EducationPage from "./Screens/UseCase/EducationPage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <EducationPage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
