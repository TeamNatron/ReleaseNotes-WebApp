import React from "react";
import {
  Paper,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Divider
} from "@material-ui/core";
import styled from "styled-components";
import ComposedEditorsView from "./ComposedEditorsView";
import PageContainer from "../shared/PageContainer";
import ReleaseNoteInput from "./ReleaseNoteInput";
import ReleaseNoteRichInput from "./ReleaseNoteRichInput";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, RichUtils, EditorState } from "draft-js";

const EditReleaseNoteForm = () => {
  const [title, setTitle] = React.useState(
    RichUtils.toggleBlockType(EditorState.createEmpty(), "header-two")
  );
  const [ingress, setIngress] = React.useState(
    RichUtils.toggleInlineStyle(EditorState.createEmpty(), "ITALIC")
  );
  const [description, setDescription] = React.useState();
  const [ready, setReady] = React.useState();

  const handleTitleChange = editorState => {
    setTitle(editorState);
  };

  const handleIngressChange = editorState => {
    setIngress(editorState);
  };

  const handleDescriptionChange = editorState => {
    setDescription(editorState);
  };

  const handleSave = () => {
    if (description && title && ingress) {
      const rawContentState1 = convertToRaw(title.getCurrentContent());
      const rawContentState2 = convertToRaw(ingress.getCurrentContent());
      const rawContentState3 = convertToRaw(description.getCurrentContent());

      const savedHtml1 = draftToHtml(rawContentState1);
      const savedHtml2 = draftToHtml(rawContentState2);
      const savedHtml3 = draftToHtml(rawContentState3);
      const readyForRelease = ready;

      const concatedHtml = savedHtml1 + savedHtml2 + savedHtml3;
      console.log(concatedHtml);
    } else {
    }
  };

  const handleReady = ev => {
    setReady(!ready);
  };

  var dummyRawText = {
    __html:
      "<div> <h2>This is the raw release note</h2> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</div><img src =https://cdn.mos.cms.futurecdn.net/z9WmRFVhrCJLKbmy4DcmjY-320-80.jpg /></div>"
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
            editorState={title}
            label="Tittel"
          />
        </div>

        <div>
          <ReleaseNoteInput
            onChange={handleIngressChange}
            editorState={ingress}
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
          <ComposedEditorsView
            title={title}
            ingress={ingress}
            description={description}
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
