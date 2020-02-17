import React from "react";
import { Paper, Box } from "@material-ui/core";
import styled from "styled-components";
import RichEditor from "./RichEditor";
import PageContainer from "../shared/PageContainer";
import ReleaseNoteInput from "./ReleaseNoteInput";
import ReleaseNoteRichInput from "./ReleaseNoteRichInput";

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
    console.log(editorState)
    setDescription(editorState)
  };

  const dummyRawText = {
    __html:
      "<div> DOG DOG DOG <br /> what what what what <div> what what 123 123</div></div>"
  };

  return (
    <PageContainer>
      <StyledForm>
        <div>
          <Paper variant="outlined">
            <Box m={2}>
              <div dangerouslySetInnerHTML={dummyRawText} />
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
        <div>
          <RichEditor
            title={title}
            ingress={ingress}
            descriptionEditorState={description}
          />
        </div>
      </StyledForm>
    </PageContainer>
  );
};

export default EditReleaseNoteForm;

const StyledForm = styled.form`
  margin-top: 20px;
`;
