import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Paper } from "@material-ui/core";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { updateAzureInfo, fetchAzureInfo, getAzureInfo } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DevOpsForm = () => {
    const [name, setName] = useState("");
    const [PAT, setPAT] = useState("");
    const [org, setOrg] = useState("");
    const dispatch = useDispatch();

    /*


    useEffect(() => { dispatch(fetchAzureInfo()) }, [dispatch]);

    /*
    useEffect(() => {
        setName(props.name || "");
        setPAT(props.PAT || "");
        setOrg(props.org || "");
    }, [dispatch]);


    const azureInfo = useSelector(state => state.auth.currentUser.AzureInformation);
    */


    const handleSubmit = () => {
        // see if the fields have beeen filled out
        if (name === "" || PAT === "" || org === "") {
            alert("felt mangler innhold")
        } else
            dispatch(updateAzureInfo(name, PAT, org))
    };

    return (
        <MyPaper>
            <Typography gutterBottom variant="h4">Azure Integrasjon</Typography>
            <MyGrid container spacing={0} direction="column" justify="center" alignContent="space-between">
                <Grid item>
                    <TextField id="standard-required DevOpsName"
                        label="DevOps Brukernavn"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id="standard-required DevOpsPAT" label="Personal Access Token"
                        value={PAT}
                        onChange={(e) => setPAT(e.target.value)} />
                </Grid>
                <Grid item>
                    <TextField id="standard-required DevOpsOrg" label="DevOps Organisasjon"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)} />
                </Grid>
                <Grid item>
                    <MyButton variant="contained" color="primary"
                        id="sendDataBtn" onClick={handleSubmit}>SEND</MyButton>
                </Grid>
            </MyGrid>
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
    margin: 0 1vh;
}
`;

const MyPaper = styled(Paper)`
&& {
    margin: 1vh 0;
    padding: 1.2em;
}
`;