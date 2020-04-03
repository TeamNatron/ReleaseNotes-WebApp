import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { createData } from "../shared/AdminTableRow";
import { importRelease, fetchProjects } from "../../slices/azureSlice";
import AzureDevOpsView from "../adminpanel/AzureDevOpsView";
import { azureApiSelector } from "../../slices/authSlice";
import { fetchReleases as fetchAzureReleases } from "../../slices/azureSlice";

const AdminAzureView = () => {
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProductVersion, setSelectedProductVersion] = useState("");

  const azureProps = useSelector(azureApiSelector);
  useEffect(() => {
    dispatch(fetchProjects(azureProps));
  }, [dispatch, azureProps]);

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
  const azureReleases = useSelector(azureReleasesSelector);

  const handleSelectedProject = event => {
    setSelectedProject(event.target.value);
  };

  const handleSelectedProductVersion = event => {
    setSelectedProductVersion(event.target.value);
  };

  const handleImport = (id, title) => {
    dispatch(
      importRelease(
        selectedProductVersion.id,
        selectedProject,
        azureProps,
        id,
        title
      )
    );
  };

  return (
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
  );
};

export default AdminAzureView;

// selectors
const azureReleasesSelector = createSelector(
  state => state.azure.releases,
  releases => releases.map(r => createData(r, r.name, r.id))
);
