import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import AnalyticsPage from "./Screens/AnalyticsPage";
import Footer from "./UI/Footer";
import Header from "./UI/Header";

function App() {
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <AnalyticsPage />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
