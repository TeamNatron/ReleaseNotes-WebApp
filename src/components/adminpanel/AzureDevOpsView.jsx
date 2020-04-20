import React from "react";
import DevOpsForm from "./DevOpsForm";
import { Description } from "@material-ui/icons";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import { Grid } from "@material-ui/core";
import GeneralSelector from "../shared/GeneralSelector";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllProductVersionsSelector,
  fetchProducts,
} from "../../slices/productsSlice";
import AzureMappingView from "./AzureMappingView";

// EXAMPLE COMPONENT USED TO CONTAIN AZURE DEVOPS TOOLS
// CAN BE MODYFIED OR REMOVED
const AzureDevOpsView = (props) => {
  const {
    azureReleases,
    handleImport,
    selectedProductVersion,
    handleSelectedProductVersion,
  } = props;
  const dispatch = useDispatch();

  const productVersions = useSelector(getAllProductVersionsSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAction = (action, data) => {
    switch (action) {
      case "IMPORT":
        handleImport(data);
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <DevOpsForm {...props} />
      <AdminExpansionPanelBase
        expanded
        label="Azure Devops Releases"
        summaryComponent={
          <Grid container>
            <Grid item>
              <GeneralSelector
                items={productVersions}
                selected={selectedProductVersion}
                handleChange={handleSelectedProductVersion}
                label="Produkt"
                helperText="Velg et produkt å importere til"
                ml={25}
              />
            </Grid>
          </Grid>
        }
        icon={<Description />}
        rows={azureReleases}
        onAction={handleAction}
        import={true}
      />
      <AzureMappingView
        project={selectedProject}
        org={props.azureProps.organization}
        authToken={props.azureProps.authToken}
      />
    </React.Fragment>
  );
};

export default AzureDevOpsView;
