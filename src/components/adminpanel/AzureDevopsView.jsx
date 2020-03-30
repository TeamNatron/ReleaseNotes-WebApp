import React from "react";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import ProjectSelector from "./ProjectSelector";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevopsView = props => {
  const {
    azureReleases,
    azureProjects,
    handleSelectedProject,
    selected
  } = props;

  const handleAction = (action, id) => {
    switch (action) {
      case "IMPORT":
        postReleaseById();
        break;
      default:
        break;
    }
  };

  const postReleaseById = () => {
    console.log("Yes, da lag vi den!");
  };

  return (
    <React.Fragment>
      <AdminExpansionPanelBase
        expanded
        label="Azure Devops Releases"
        summaryComponent={
          <ProjectSelector
            projects={azureProjects}
            selected={selected}
            handleChange={handleSelectedProject}
          />
        }
        icon={<Description />}
        rows={azureReleases}
        onAction={handleAction}
        import={true}
      />
    </React.Fragment>
  );
};

export default AzureDevopsView;
