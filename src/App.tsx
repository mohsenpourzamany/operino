import "./App.css";
import OperinoBg from "./Components/OperinoBg";
import HomePage from "./Screens/HomePage";

function App() {
  return (
    <>
      <OperinoBg>
        <div className="operino-bg">
          <HomePage />
        </div>
      </OperinoBg>
    </>
  );
}

export default App;
