import Dashboard from "../Components/Dashboard";
import AnalyticsCTA from "../Components/Features/Analytics/AnalyticsCTA";
import AnalyticsDashboard from "../Components/Features/Analytics/AnalyticsDashboard";
import AnalyticsHero from "../Components/Features/Analytics/AnalyticsHero";
import SeamlessIntegrations from "../Components/Features/Analytics/SeamlessIntegrations";

const AnalyticsPage = () => {
  return (
    <>
      <div>
        <AnalyticsHero />
      </div>
      <div className="mx-40">
        <Dashboard />
      </div>
      <AnalyticsDashboard />
      <SeamlessIntegrations />
      <AnalyticsCTA />
    </>
  );
};

export default AnalyticsPage;
