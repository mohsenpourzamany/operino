import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import Footer from "./UI/Footer";
import Header from "./UI/Header";
import { useMouseSpotlight } from "./Components/useMouseSpotlight";
import DashboardLayout from "./Screens/Dashboard/DashboardLayout";
function App() {
  useMouseSpotlight();
  return (
    <>
      <Header />
      <OperinoBg>
        <div className="operino-bg">
          <DashboardLayout />
        </div>
      </OperinoBg>
      <Footer />
    </>
  );
}

export default App;
