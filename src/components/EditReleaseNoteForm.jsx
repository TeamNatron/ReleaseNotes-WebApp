import React from "react";
import {
  TextField,
  Paper,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Input
} from "@material-ui/core";
import PageContainer from "./shared/PageContainer";
import RichEditor from "./RichEditor";

const EditReleaseNoteForm = () => {
  const [title, setTitle] = React.useState();
  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const [ingress, setIngress] = React.useState();
  const handleIngressChange = event => {
    setIngress(event.target.value);
  };

  const [description, setDescription] = React.useState();
  const handleDescriptionChange = event => {
    //setDescription(event.target.value);
  };

  const dummyRawText = {
    __html:
      "<div> DOG DOG DOG <br /> what what what what <div> what what 123 123</div></div>"
  };

  return (
    <PageContainer>
      <form>
        <div>
          <Paper variant="outlined">
            <Box m={2}>
              <div dangerouslySetInnerHTML={dummyRawText} />
            </Box>
          </Paper>
        </div>
        <div>
          <TextField
            variant="outlined"
            label="Tittel"
            value={title}
            onChange={handleTitleChange}
            margin="normal"
          />
        </div>

        <div>
          <TextField
            multiline
            variant="outlined"
            label="Ingress"
            value={ingress}
            onChange={handleIngressChange}
            margin="normal"
          />
        </div>

        <div>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="component-outlined">Beskrivelse</InputLabel>
            <OutlinedInput
            id="component-outlined"
              inputComponent={RichEditor}
            />
          </FormControl>
        </div>
      </form>
    </PageContainer>
  );
};

export default EditReleaseNoteForm;
