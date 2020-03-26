import React, { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useState } from "react";


const DevOpsForm = props => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [PAT, setPAT] = useState("");
    const [org, setOrg] = useState("");
    // TODO: useEffect to get azure info AND project releases

    const handleSubmit = () => {
        // TODO: send the info to azure
        alert(name + PAT + org);
    }

    return (
        <React.Fragment>
            <h1>Azure Integrasjon</h1>
            <Grid container spacing={3} justify="center" alignItems="center" direction="column">
                <Grid item>
                    <TextField id="standard-basic DevOpsName"
                        label="DevOps Brukernavn"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id="standard-basic DevOpsPAT" label="Personal Access Token"
                        value={PAT}
                        onChange={(e) => setPAT(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id="standard-basic DevOpsOrg" label="DevOps Organisasjon"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary"
                        id="sendDataBtn" onClick={handleSubmit}>SEND</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default DevOpsForm;
