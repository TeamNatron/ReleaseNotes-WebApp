import React, { useEffect } from "react";
import { Container, Tabs, Tab, Typography, Divider } from "@material-ui/core";
import { PermIdentity, DesktopWindows, Description } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import AddUserForm from "../adminpanel/AddUserForm";
import AddProductForm from "../adminpanel/AddProductForm";
import ChangePasswordForm from "../adminpanel/ChangePasswordForm";
import { useSelector, useDispatch } from "react-redux";
import AdminExpansionPanelModal from "../shared/AdminExpansionPanelModal";
import AdminExpansionPanelRoute from "../shared/AdminExpansionPanelRoute";
import {
  fetchReleases,
  putReleaseById,
  deleteRelease
} from "../../slices/releaseSlice";
import { fetchUsers } from "../../slices/userSlice";
import {
  fetchReleaseNotes,
  putReleaseNote,
  deleteReleaseNote
} from "../../slices/releaseNoteSlice";
import {
  fetchReleases as fetchAzureReleases,
  importRelease
} from "../../slices/azureSlice";
import { useState } from "react";
import styled from "styled-components";
import { fetchProjects } from "../../slices/azureSlice";
import { azureApiSelector } from "../../slices/authSlice";
import AzureDevOpsView from "../adminpanel/AzureDevOpsView";
import { fetchProducts } from "../../slices/productsSlice";
import { createSelector } from "@reduxjs/toolkit";
import EditProductForm from "../adminpanel/EditProductForm";
import { createData } from "../shared/AdminTableRow";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProductVersion, setSelectedProductVersion] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleaseNotes());
  }, [dispatch]);

  const azureProps = useSelector(azureApiSelector);
  useEffect(() => {
    dispatch(fetchProjects(azureProps));
  }, [dispatch, azureProps]);

  useEffect(() => dispatch(fetchUsers()), [dispatch]);

  // Fetches all releases based on selected Project
  useEffect(() => {
    const params = {
      organization: azureProps.organization,
      project: selectedProject,
      authToken: azureProps.authToken
    };
    if (params.project !== "") dispatch(fetchAzureReleases(params));
  }, [dispatch, azureProps, selectedProject]);

  const azureProjects = useSelector(state => state.azure.projects);
  const releaseTitles = useSelector(releaseTitlesSelector);
  const azureReleases = useSelector(azureReleasesSelector);
  const productTitles = useSelector(productTitlesSelector);
  const userRows = useSelector(userRowsSelector);
  const releaseNoteRows = useSelector(releaseNoteRowsSelector);

  const handleSelectedProject = event => {
    setSelectedProject(event.target.value);
  };

  const handleSelectedProductVersion = event => {
    setSelectedProductVersion(event.target.value);
  };

  const handleImport = data => {
    dispatch(
      importRelease(
        selectedProductVersion.id,
        selectedProject,
        azureProps,
        data.id,
        data.name
      )
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Container>{children}</Container>}
      </Typography>
    );
  };

  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>
        Her kan du gjøre administrative oppgaver for systemet.
      </Ingress>

      <TurboDivider />
      <StyledAppBar color="transparent" position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Release Notes System" {...tabProps(0)} />
          <Tab label="Azure DevOps" {...tabProps(1)} />
        </Tabs>
      </StyledAppBar>

      <TabPanel value={value} index={0}>
        <AdminExpansionPanelModal
          label="Produkter"
          icon={<DesktopWindows />}
          rows={productTitles}
          createContentComponent={<AddProductForm />}
          editContentComponent={<EditProductForm />}
        />
        <AdminExpansionPanelModal
          label="Brukere"
          icon={<PermIdentity />}
          rows={userRows}
          createContentComponent={<AddUserForm />}
          editContentComponent={<ChangePasswordForm />}
        />
        <AdminExpansionPanelRoute
          label="Releases"
          icon={<Description />}
          rows={releaseTitles}
          createContentRoute="/admin/releases/create"
          editContentRoute="/admin/releases/edit/:id"
          onUpdate={putReleaseById}
          onDelete={deleteRelease}
        />
        <AdminExpansionPanelRoute
          label="Release notes"
          icon={<Description />}
          rows={releaseNoteRows}
          createContentRoute="/admin/releasenotes/create"
          editContentRoute="/admin/releasenotes/edit/:id"
          onUpdate={putReleaseNote}
          onDelete={deleteReleaseNote}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AzureDevOpsView
          azureReleases={azureReleases}
          azureProjects={azureProjects}
          azureProps={azureProps}
          selectedProject={selectedProject}
          selectedProductVersion={selectedProductVersion}
          handleSelectedProject={handleSelectedProject}
          handleSelectedProductVersion={handleSelectedProductVersion}
          handleImport={handleImport}
        />
      </TabPanel>
    </PageContainer>
  );
};

export default AdminScreen;

const TurboDivider = styled(Divider)`
  && {
    margin-top: 32px;
    margin-bottom: 0;
  }
`;

const StyledAppBar = styled.div`
  && {
    border: 1px solid #80808047;
    z-index: 10;
    width: inherit;
    margin-bottom: 34px;
    background-color: white;
  }
`;

// selectors
const releaseTitlesSelector = createSelector(
  state => state.releases.items,
  items => items.map(r => createData(r, r.title, r.id, r.isPublic))
);

const azureReleasesSelector = createSelector(
  state => state.azure.releases,
  releases => releases.map(r => createData(r, r.name, r.id))
);

const productTitlesSelector = createSelector(
  state => state.products.items,
  items => items.map(p => createData(p, p.name, p.id))
);

const userRowsSelector = createSelector(
  state => state.users.items,
  items => items.map(u => createData(u, u.email, u.id))
);

const releaseNoteRowsSelector = createSelector(
  state => state.releaseNotes.items,
  items =>
    items.map(r => {
      return createData(
        r,
        r.title === "" ? "Release note #" + r.id : r.title,
        r.id,
        r.isPublic
      );
    })
);
