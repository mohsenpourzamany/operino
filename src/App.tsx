import "./App.css";
import { useState } from "react";
import OperinoBg from "./Components/OperinoBg";
import Footer from "./UI/Footer";
import { useMouseSpotlight } from "./Components/useMouseSpotlight";
import WhatsAppWidget from "./Components/WhatsAppWidget";
import Navbar from "./UI/Navbar";

// ── Pages ───────────────────────────────────────────────────────────────────
import HomePage from "./Screens/HomePage";
import FeaturesPage from "./Screens/FeaturesPage";
import PricingPage from "./Screens/PricingPage";
import AuthPage from "./Screens/AuthPage";
import FreeStartPage from "./Screens/FreeStartPage";

// Features sub-pages
import AIAgentBuilderSection from "./Screens/FeaturesPage/AIAgentBuilderSection";
import MultiChannelSection from "./Screens/FeaturesPage/MultiChannelSection";
import AutomationSection from "./Screens/FeaturesPage/AutomationSection";
import IntegrationsSection from "./Screens/FeaturesPage/IntegrationsSection";
import AnalyticsPage from "./Screens/FeaturesPage/AnalyticsPage";

// Use Cases
import AgencyPage from "./Screens/UseCase/AgencyPage";
import ECommerce from "./Screens/UseCase/ECommerce";
import EducationPage from "./Screens/UseCase/EducationPage";
import HealthCarePage from "./Screens/UseCase/HealthCarePage";
import SaasTechPage from "./Screens/UseCase/SaasTechPage";

// Resources
import BlogPage from "./Screens/Resources/‌BlogPage";
import DocumentationPage from "./Screens/Resources/DocumentationPage";
import GuidesTutorialPage from "./Screens/Resources/GuidesTutorialPage";
import HelpCenterPage from "./Screens/Resources/HelpCenterPage";
import TemplatePage from "./Screens/Resources/TemplatePage";

// About
import OurStory from "./Screens/AboutPage/OurStory";
import Careers from "./Screens/AboutPage/Careers";

// Dashboard
import DashboardLayout from "./Screens/Dashboard/DashboardLayout";
import ContactPage from "./Screens/Dashboard/ContactPage";

// ── Type ────────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "features"
  | "ai-agent-builder"
  | "multi-channel"
  | "automation"
  | "integrations"
  | "analytics"
  | "use-cases-agencies"
  | "use-cases-ecommerce"
  | "use-cases-education"
  | "use-cases-healthcare"
  | "use-cases-saas"
  | "pricing"
  | "blog"
  | "docs"
  | "guides"
  | "help-center"
  | "templates"
  | "our-story"
  | "careers"
  | "contact"
  | "login"
  | "start-free"
  | "dashboard";

// ── Nav label → Page ────────────────────────────────────────────────────────
const navMap: Record<string, Page> = {
  Home: "home",
  Pricing: "pricing",
  // Features dropdown
  "AI Agent Builder": "ai-agent-builder",
  "Multi-Channel": "multi-channel",
  Automation: "automation",
  Integrations: "integrations",
  Analytics: "analytics",
  // Use Cases dropdown
  Agencies: "use-cases-agencies",
  "E-commerce": "use-cases-ecommerce",
  Education: "use-cases-education",
  Healthcare: "use-cases-healthcare",
  "SaaS & Tech": "use-cases-saas",
  // Resources dropdown
  Blog: "blog",
  Documentation: "docs",
  "Guides & Tutorials": "guides",
  "Help Center": "help-center",
  Templates: "templates",
  // About dropdown
  "Our Story": "our-story",
  Careers: "careers",
  Contact: "contact",
};

// ── active Navbar label ──────────────────────────────────────────────────────
const activeMap: Record<Page, string> = {
  home: "Home",
  features: "Features",
  "ai-agent-builder": "Features",
  "multi-channel": "Features",
  automation: "Features",
  integrations: "Features",
  analytics: "Features",
  "use-cases-agencies": "Use Cases",
  "use-cases-ecommerce": "Use Cases",
  "use-cases-education": "Use Cases",
  "use-cases-healthcare": "Use Cases",
  "use-cases-saas": "Use Cases",
  pricing: "Pricing",
  blog: "Resources",
  docs: "Resources",
  guides: "Resources",
  "help-center": "Resources",
  templates: "Resources",
  "our-story": "About",
  careers: "About",
  contact: "About",
  login: "",
  "start-free": "",
  dashboard: "",
};

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  useMouseSpotlight();
  const [page, setPage] = useState<Page>("home");

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (label: string) => {
    if (label === "Log in") return navigate("login");
    if (label === "Start Free") return navigate("start-free");
    const mapped = navMap[label];
    if (mapped) navigate(mapped);
  };

  // ── Dashboard — بدون Navbar/Footer ──────────────────────────────────────
  if (page === "dashboard") {
    return (
      <>
        <DashboardLayout />
        <WhatsAppWidget />
      </>
    );
  }

  // ── Auth / Onboarding — بدون Navbar/Footer ──────────────────────────────
  if (page === "login" || page === "start-free") {
    return (
      <>
        <OperinoBg>
          <div className="operino-bg">
            {page === "login" ? <AuthPage /> : <FreeStartPage />}
          </div>
        </OperinoBg>
        <WhatsAppWidget />
      </>
    );
  }

  // ── محتوای صفحه ─────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "features":
        return <FeaturesPage />;
      case "ai-agent-builder":
        return <AIAgentBuilderSection />;
      case "multi-channel":
        return <MultiChannelSection />;
      case "automation":
        return <AutomationSection />;
      case "integrations":
        return <IntegrationsSection />;
      case "analytics":
        return <AnalyticsPage />;
      case "use-cases-agencies":
        return <AgencyPage />;
      case "use-cases-ecommerce":
        return <ECommerce />;
      case "use-cases-education":
        return <EducationPage />;
      case "use-cases-healthcare":
        return <HealthCarePage />;
      case "use-cases-saas":
        return <SaasTechPage />;
      case "pricing":
        return <PricingPage />;
      case "blog":
        return <BlogPage />;
      case "docs":
        return <DocumentationPage />;
      case "guides":
        return <GuidesTutorialPage />;
      case "help-center":
        return <HelpCenterPage />;
      case "templates":
        return <TemplatePage />;
      case "our-story":
        return <OurStory />;
      case "careers":
        return <Careers />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  // ── Layout عادی با Navbar + OperinoBg + Footer ───────────────────────────
  return (
    <>
      <Navbar onItemClick={handleNavClick} activePage={activeMap[page]} />
      <OperinoBg>
        <div className="operino-bg">{renderContent()}</div>
      </OperinoBg>
      <WhatsAppWidget />
      <Footer />
    </>
  );
}

export default App;
