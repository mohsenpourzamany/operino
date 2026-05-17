import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import Footer from "./UI/Footer";
import Header from "./UI/Header";
import { useMouseSpotlight } from "./Components/useMouseSpotlight";
import DashboardLayout from "./Screens/Dashboard/DashboardLayout";
import WhatsAppWidget from "./Components/WhatsAppWidget";
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
      <WhatsAppWidget />
      <Footer />
    </>
  );
}

export default App;
