import React from "react";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import ProjectSelector from "./ProjectSelector";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevopsView = () => {
  const createData = (name, id, isPublic) => {
    return { name, id, isPublic };
  };

  const getDummyReleases = () => {
    var releasesRows = [];
    dummyReleases.map(r => {
      releasesRows.push(createData(r.title, r.id));
    });
    return releasesRows;
  };

  const dummyReleases = [
    { id: 200, title: "Azure Release 2.2" },
    { id: 20, title: "Azure Release 3.2" },
    { id: 202, title: "Azure Release 2.3" },
    { id: 201, title: "Azure Release 6.2" },
    { id: 99, title: "Azure Release 5.2" }
  ];
  const getDummyProjects = () => {
    var projects = [];
    dummyProjects.map(p => {
      projects.push(p.title);
    });
    return projects;
  };

  const dummyProjects = [
    { id: 200, title: "Azure Release 2.2" },
    { id: 20, title: "Azure Release 3.2" },
    { id: 202, title: "Azure Release 2.3" },
    { id: 201, title: "Azure Release 6.2" },
    { id: 99, title: "Azure Release 5.2" }
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
        summaryComponent={<ProjectSelector projects={getDummyProjects()} />}
        icon={<Description />}
        rows={getDummyReleases()}
        onAction={handleAction}
        import={true}
      />
    </React.Fragment>
  );
};

export default AzureDevopsView;
