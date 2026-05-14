import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import HomePage from "./Screens/HomePage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <HomePage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
