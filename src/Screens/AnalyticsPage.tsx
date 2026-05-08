import Dashboard from "../Components/Dashboard";
import AnalyticsDashboard from "../Components/Features/Analytics/AnalyticsDashboard";
import AnalyticsHero from "../Components/Features/Analytics/AnalyticsHero";

const AnalyticsPage = () => {
  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <AnalyticsHero />
        <div className="flex mt-10 @minlg:display-none">
          <Dashboard />
        </div>
      </div>
      <AnalyticsDashboard />
    </>
  );
};

export default AnalyticsPage;
