import React from "react";
import DevOpsForm from "./DevOpsForm";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import { Grid } from "@material-ui/core";
import GeneralSelector from "../shared/GeneralSelector";
import { useSelector } from "react-redux";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevOpsView = props => {
  const {
    azureReleases,
    azureProjects,
    handleSelectedProject,
    selectedProject,
    handleImport,
    selectedProductVersion,
    handleSelectedProductVersion
  } = props;

  const productVersions = useSelector(state => state.productVersions.items);

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
      <DevOpsForm></DevOpsForm>
      <AdminExpansionPanelBase
        expanded
        label="Azure Devops Releases"
        summaryComponent={
          <Grid container>
            <Grid item>
              <GeneralSelector
                items={azureProjects}
                selected={selectedProject}
                handleChange={handleSelectedProject}
                label="Prosjekt"
                helperText="Velg et prosjekt"
              />
            </Grid>
            <Grid item>
              <GeneralSelector
                items={productVersions}
                selected={selectedProductVersion}
                handleChange={handleSelectedProductVersion}
                label="Produkt"
                helperText="Velg et produkt"
              />
            </Grid>
          </Grid>
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
