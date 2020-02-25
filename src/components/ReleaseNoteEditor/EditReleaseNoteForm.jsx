import React from "react";
import {
  Paper,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import styled from "styled-components";
import ComposedEditorsView from "./ComposedEditorsView";
import ReleaseNoteInput from "./ReleaseNoteInput";
import ReleaseNoteRichInput from "./ReleaseNoteRichInput";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import PropTypes from "prop-types";
import {
  convertToRaw,
  RichUtils,
  EditorState,
  convertFromHTML,
  ContentState
} from "draft-js";
import { Assignment, Person } from "@material-ui/icons";

const EditReleaseNoteForm = props => {
  const [title, setTitle] = React.useState(
    RichUtils.toggleBlockType(
      createStateFromText(props.note.item.title),
      "header-two"
    )
  );

  const [ingress, setIngress] = React.useState(
    RichUtils.toggleInlineStyle(
      createStateFromText(props.note.item.ingress),
      "ITALIC"
    )
  );
  const [description, setDescription] = React.useState(
    createStateFromText(props.note.item.description)
  );
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

  function createStateFromText(text) {
    if (!text) {
      return EditorState.createEmpty();
    }
    const blocksFromHTML = convertFromHTML(text);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  }

  const handleSave = () => {
    const rawContentState1 = convertToRaw(title.getCurrentContent());
    const rawContentState2 = convertToRaw(ingress.getCurrentContent());
    const rawContentState3 = convertToRaw(description.getCurrentContent());

    const savedHtml1 = draftToHtml(rawContentState1);
    const savedHtml2 = draftToHtml(rawContentState2);
    const savedHtml3 = draftToHtml(rawContentState3);

    const returnObject = {
      title: savedHtml1,
      ingress: savedHtml2,
      description: savedHtml3,
      ready
    };
    props.onSave(returnObject);
  };

  const canSave = () => {
    return !(
      ingress.getCurrentContent().hasText() ||
      description.getCurrentContent().hasText() ||
      title.getCurrentContent().hasText()
    );
  };

  const handleReady = ev => {
    setReady(!ready);
  };
  return (
    <React.Fragment>
      <BottomAppBar>
        <ToolbarWrapper>
          <StyledToolbar disableGutters variant="dense">
            <CancelButton color="secondary" onClick={props.onCancel}>
              Tilbake
            </CancelButton>
            <div>
              <StyledFormControlLabel
                edge="end"
                control={
                  <Switch
                    checked={ready}
                    size="small"
                    onChange={handleReady}
                    value="ready"
                    color="primary"
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                }
                label="Klar for release"
              />
              <SaveButton onClick={handleSave} disabled={canSave()}>
                Lagre
              </SaveButton>
            </div>
          </StyledToolbar>
        </ToolbarWrapper>
      </BottomAppBar>
      <form>
        <Box>
          <div>
            <Paper variant="outlined">
              <Box my={1} mx={3}>
                <Typography
                  style={{ fontSize: 12 }}
                  display="block"
                  color="textSecondary"
                  gutterBottom
                >
                  Work item
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box display="flex" alignItems="center">
                    <Assignment display="flex" fontSize="small" />
                    Task {props.note.item.workItemId}
                  </Box>
                  <Box display="flex" alignItems="center" ml={2}>
                    <Typography>{props.note.item.workItemTitle}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" ml={2}>
                    <Person fontSize="small" />
                    {props.note.item.authorName}
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box m={3}>
                {props.note.item.workItemDescriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.note.item.workItemDescriptionHtml
                    }}
                  />
                ) : (
                  <div></div>
                )}
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
              editorState={description}
              label="Beskrivelse"
            />
          </div>

          <Box mt={5} mb={4}>
            <ComposedEditorsView
              title={title}
              ingress={ingress}
              description={description}
            />
          </Box>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default EditReleaseNoteForm;

EditReleaseNoteForm.defaultProps = {
  note: { item: { error: "note is undefined" } }
};

EditReleaseNoteForm.propTypes = {
  onSave: PropTypes.func,
  note: PropTypes.object
};

const StyledFormControlLabel = styled(FormControlLabel)`
  padding: 0 16px;
`;

const SaveButton = styled(Button)`
  && {
    background-color: ${props => props.theme.secondaryColor};
    color: white;
  }
`;

const ToolbarWrapper = styled.div`
  width: ${props => props.theme.contentWidth};
  max-width: ${props => props.theme.contentWidth};
  margin: auto;
`;
const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const CancelButton = styled(Button)`
  && {
    color: white;
    padding: 0 16px;
  }
`;

const BottomAppBar = styled(AppBar)`
  & {
    background-color: ${props => props.theme.mainColor} !important;
    position: fixed;
    top: auto !important;
    bottom: 0 !important;
  }
`;
