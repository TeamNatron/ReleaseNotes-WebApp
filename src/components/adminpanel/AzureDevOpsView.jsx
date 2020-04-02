import React from "react";
import DevOpsForm from "./DevOpsForm";
import { useState, useEffect } from "react";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import { useDispatch, useSelector } from "react-redux";
import ProjectSelector from "./ProjectSelector";
import { updateAzureInfo, fetchAzureInfo, getAzureInfo } from "../../slices/authSlice";
import { Grid } from "@material-ui/core";
import GeneralSelector from "../shared/GeneralSelector";
import {
  getAllProductVersionsSelector,
  fetchProducts
} from "../../slices/productsSlice";

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
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAzureInfo());
  }, [dispatch]);


  const azureInfo = useSelector(state => state.auth.currentUser.AzureInformation);
  console.log(azureInfo);

  // remember to pass the data to the component
  // adminscreem method, see users and userRow
  const productVersions = useSelector(getAllProductVersionsSelector);

  useEffect(() => {
    dispatch(fetchProducts);
  }, [dispatch]);

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
      <DevOpsForm />
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
                helperText="Velg et produkt å importere til"
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
