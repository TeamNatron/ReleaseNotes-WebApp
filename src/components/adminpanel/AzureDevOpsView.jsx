import React from "react";
import DevOpsForm from "./DevOpsForm";
import { useState, useEffect } from "react";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelector from "./ProjectSelector";
import { updateAzureInfo, fetchAzureInfo, getAzureInfo } from "../../slices/authSlice";



// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevOpsView = props => {
  const {
    azureReleases,
    azureProjects,
    handleSelectedProject,
    selected,
    handleImport
  } = props;
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAzureInfo());
  }, [dispatch]);


  const azureInfo = useSelector(state => state.auth.currentUser.AzureInformation);

  // remember to pass the data to the component
  // adminscreem method, see users and userRow

  const handleAction = (action, id, data) => {
    switch (action) {
      case "IMPORT":
        handleImport(id, data);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <DevOpsForm
        azureInfo={azureInfo} />
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
