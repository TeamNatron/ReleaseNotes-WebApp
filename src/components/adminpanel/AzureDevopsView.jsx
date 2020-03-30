import React from "react";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import ProjectSelector from "./ProjectSelector";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevopsView = props => {
  const { azureReleases, handleSelectedProject, selected } = props;

  const getDummyProjects = () => {
    var projects = [];
    dummyProjects.forEach(p => {
      projects.push(p.title);
    });
    return projects;
  };

  const dummyProjects = [
    { id: 200, title: "Release Note System" },
    { id: 20, title: "Release Note System 3.2" },
    { id: 202, title: "Release Note System 2.3" },
    { id: 201, title: "Release Note System 6.2" },
    { id: 99, title: "Release Note System 5.2" }
  ];

  const handleAction = (action, id) => {
    switch (action) {
      case "IMPORT":
        postReleaseById();
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
            projects={getDummyProjects()}
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
