import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import FeaturesPage from "./Screens/FeaturesPage";

function App() {
  return (
    <>
      <OperinoBg>
        <div className="operino-bg">
          <FeaturesPage />
        </div>
      </OperinoBg>
    </>
  );
}

export default App;
