import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { updateAzureInfo, fetchAzureInfo } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import GeneralSelector from "../shared/GeneralSelector";

const DevOpsForm = (props) => {
  const { azureProjects, handleSelectedProject, selectedProject } = props;
  const [name, setName] = useState("");
  const [PAT, setPAT] = useState("");
  const [org, setOrg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAzureInfo());
  }, [dispatch]);

  const azureInfo = useSelector(
    (state) => state.auth.currentUser.azureInformation
  );

  useEffect(() => {
    setName(azureInfo.userId);
    setPAT(azureInfo.pat);
    setOrg(azureInfo.organization);
  }, [azureInfo]);

  const handleSubmit = () => {
    // see if the fields have beeen filled out
    if (name === "" || PAT === "" || org === "") {
      alert("felt mangler innhold");
    } else dispatch(updateAzureInfo(name, PAT, org));
  };

  return (
    <MyPaper>
      <Grid container spacing={7} direction="row">
        <Grid item>
          <MyGrid container spacing={1} direction="column" justify="center">
            <Grid item>
              <Typography variant="body1" style={{ marginBottom: "1.2em" }}>
                Azure Pålogging
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                id="standard-required DevOpsName"
                label="DevOps Brukernavn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                id="standard-required DevOpsOrg"
                label="DevOps Organisasjon"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-required DevOpsPAT"
                label="Personal Access Token"
                value={PAT}
                onChange={(e) => setPAT(e.target.value)}
              />
            </Grid>
            <Grid>
              <MyButton
                variant="contained"
                color="primary"
                id="sendDataBtn"
                onClick={handleSubmit}
              >
                Lagre
              </MyButton>
            </Grid>
          </MyGrid>
        </Grid>
        <Grid item>
          <MyGrid container spacing={1} direction="column" justify="center">
            <Grid item>
              {/* Don't touch marginBottom, it's perfect */}
              <Typography variant="body1" style={{ marginBottom: "13px" }}>
                Azure Prosjekt
              </Typography>
            </Grid>
            <Grid item>
              <GeneralSelector
                items={azureProjects}
                selected={selectedProject}
                handleChange={handleSelectedProject}
                label="Prosjekt"
                helperText="Velg et prosjekt"
              />
            </Grid>
          </MyGrid>
        </Grid>
      </Grid>
    </MyPaper>
  );
};

export default DevOpsForm;

const MyButton = styled(Button)`
  && {
    display: box;
    float: left;
    margin: 1vh 0 0 0;
  }
`;

const MyGrid = styled(Grid)`
  && {
    max-width: 500px;
    margin: 0 1vh;
  }
`;

const MyPaper = styled(Paper)`
  && {
    margin: 1vh 0;
    padding: 1.2em;
  }
`;
