import React from "react";
import {
  Paper,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Typography
} from "@material-ui/core";
import styled from "styled-components";
import RichEditor from "./RichEditor";
import PageContainer from "../shared/PageContainer";
import ReleaseNoteInput from "./ReleaseNoteInput";
import ReleaseNoteRichInput from "./ReleaseNoteRichInput";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

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
  const handleDescriptionChange = editorState => {
    setDescription(editorState);
  };

  const [ready, setReady] = React.useState();

  const handleSave = () => {
    if (description) {
      const rawContentState = convertToRaw(description.getCurrentContent());
      const savedHtml = draftToHtml(rawContentState);
      const readyForRelease = ready;
    } else {

    }
  };

  const handleReady = ev => {
    setReady(!ready);
  };

  const dummyRawText = {
    __html:
      "<div> <h2>This is the raw release note</h2> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div></div>"
  };

  const dummyBlame = "@BenRedicFyFazan";

  return (
    <PageContainer>
      <StyledForm>
        <div>
          <Paper variant="outlined">
            <Box m={2}>
              <Box m={2}>
                <div dangerouslySetInnerHTML={dummyRawText} />
              </Box>
              <Divider light p={9} />
              <Box m={2}>
                <a href="/">{dummyBlame}</a>
              </Box>
            </Box>
          </Paper>
        </div>
        <div>
          <ReleaseNoteInput
            onChange={handleTitleChange}
            value={title}
            label="Tittel"
          />
        </div>

        <div>
          <ReleaseNoteInput
            onChange={handleIngressChange}
            value={ingress}
            label="Ingress"
          />
        </div>

        <div>
          <ReleaseNoteRichInput
            onChange={handleDescriptionChange}
            label="Beskrivelse"
          />
        </div>

        <Box mt={5} mb={4}>
          <p>Forhåndsvisning</p>
          <RichEditor
            title={title}
            ingress={ingress}
            descriptionEditorState={description}
          />
        </Box>

        <div>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Lagre
          </Button>
          <StyledFormControlLabel
            control={
              <Switch
                checked={ready}
                onChange={handleReady}
                value="ready"
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Klar for release"
          />
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default EditReleaseNoteForm;

const StyledFormControlLabel = styled(FormControlLabel)`
  padding: 0 16px;
`;

const StyledForm = styled.form`
  margin-top: 20px;
`;
