import React from "react";
import DevOpsForm from "./DevOpsForm";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import ProjectSelector from "./ProjectSelector";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevOpsView = props => {
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
      <DevOpsForm></DevOpsForm>
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
      ></AdminExpansionPanelBase>
    </React.Fragment>
  );
};

export default AzureDevOpsView;
