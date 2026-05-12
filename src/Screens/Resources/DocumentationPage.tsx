import DocsHelpBanner from "../../Components/Resources/Documentation/DocsHelpBanner";
import DocsLayout from "../../Components/Resources/Documentation/DocsLayout";
import DocsResources from "../../Components/Resources/Documentation/DocsResources";

const DocumentationPage = () => {
  return (
    <div>
      {/* 5 componenent in DocsLayout */}
      <DocsLayout />
      <DocsResources />
      <DocsHelpBanner />
    </div>
  );
};

export default DocumentationPage;
