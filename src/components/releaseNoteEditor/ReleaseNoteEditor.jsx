import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Typography,
  Tooltip,
  IconButton
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
import {
  Assignment,
  Person,
  Save,
  Check,
  FiberManualRecord,
  Error
} from "@material-ui/icons";
import { green, orange } from "@material-ui/core/colors";
import BottomToolbar from "../shared/BottomToolbar";

const ReleaseNoteEditor = props => {
  //editor states
  const [title, setTitle] = React.useState(
    RichUtils.toggleBlockType(EditorState.createEmpty(), "header-two")
  );
  const [ingress, setIngress] = React.useState(
    RichUtils.toggleInlineStyle(EditorState.createEmpty(), "ITALIC")
  );
  const [description, setDescription] = React.useState(
    EditorState.createEmpty()
  );

  // ready for release switch
  const [ready, setReady] = React.useState(false);

  // saved / changed indicator
  const [changed, setChanged] = React.useState();

  // initalize editors with loaded data
  useEffect(() => {
    setTitle(createStateFromText(props.note.title));
    setIngress(createStateFromText(props.note.ingress));
    setDescription(createStateFromText(props.note.description));
  }, [props.note]);

  // update the given editor
  const handleEditorChange = (source, editorState) => {
    switch (source) {
      case "INGRESS":
        doUpdateEditor(setIngress, ingress, editorState);
        break;
      case "TITLE":
        doUpdateEditor(setTitle, title, editorState);
        break;
      case "DESCRIPTION":
        doUpdateEditor(setDescription, description, editorState);
        break;
      default:
        console.log("ERROR: Invalid editor name: " + source);
        break;
    }
  };
  function doUpdateEditor(setState, oldState, newState) {
    if (newState.getCurrentContent() !== oldState.getCurrentContent()) {
      setChanged(true);
    }
    setState(newState);
  }

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
    const descriptionRawContentState = convertToRaw(
      description.getCurrentContent()
    );

    const savedContent1 = title.getCurrentContent().getPlainText();
    const savedContent2 = ingress.getCurrentContent().getPlainText();
    const savedContent3 = draftToHtml(descriptionRawContentState);

    const returnObject = {
      title: savedContent1,
      ingress: savedContent2,
      description: savedContent3,
      isPublic: ready
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

  const handleReady = () => {
    // "ready for release" switch handler
    setReady(!ready);
  };

  useEffect(() => {
    // editor contents are saved
    setChanged(false);
  }, [props.note]);

  return (
    <React.Fragment>
      <BottomToolbar
        loading={props.note.pending}
        left={[
          <CancelButton color="secondary" onClick={props.onCancel}
            key={CancelButton.id}>
            Tilbake
          </CancelButton>
        ]}
        right={[
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
          />,
          <SaveButton
            key={SaveButton.id}
            onClick={handleSave}
            disabled={canSave()}
            startIcon={<Save />}
          >
            Lagre
          </SaveButton>,
          <IconButton disableRipple>
            {props.note.error ? (
              <Tooltip title="En feil oppstod når du prøvde å lagre endringene">
                <Error />
              </Tooltip>
            ) : changed ? (
              <Tooltip title="Du har ulagrede endringer">
                <FiberManualRecord
                  size="small"
                  style={{ color: orange[500], opacity: "0.7" }}
                />
              </Tooltip>
            ) : (
                  <Tooltip title="Endringene er lagret">
                    <Check style={{ color: green[500] }} />
                  </Tooltip>
                )}
          </IconButton>
        ]}
      />

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
                    Task {props.note.workItemId}
                  </Box>
                  <Box display="flex" alignItems="center" ml={2}>
                    <Typography>{props.note.workItemTitle}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" ml={2}>
                    <Person fontSize="small" />
                    {props.note.authorName}
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box m={3}>
                {props.note.workItemDescriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.note.workItemDescriptionHtml
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
              onChange={editorState => handleEditorChange("TITLE", editorState)}
              editorState={title}
              label="Tittel"
            />
          </div>

          <div>
            <ReleaseNoteInput
              onChange={editorState =>
                handleEditorChange("INGRESS", editorState)
              }
              editorState={ingress}
              label="Ingress"
            />
          </div>

          <div>
            <ReleaseNoteRichInput
              onChange={editorState =>
                handleEditorChange("DESCRIPTION", editorState)
              }
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

export default ReleaseNoteEditor;

ReleaseNoteEditor.defaultProps = {
  note: { item: { error: "note is undefined" } }
};

ReleaseNoteEditor.propTypes = {
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

const CancelButton = styled(Button)`
  && {
    color: white;
    padding: 0 16px;
  }
`;
