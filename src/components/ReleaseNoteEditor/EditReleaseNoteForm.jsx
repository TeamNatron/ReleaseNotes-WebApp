import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  LinearProgress,
  Fade
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

const EditReleaseNoteForm = props => {
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
  const [ready, setReady] = React.useState();

  // saved / changed indicator
  const [changed, setChanged] = React.useState();

  // initalize editors with loaded data
  useEffect(() => {
    setTitle(createStateFromText(props.note.item.title));
    setIngress(createStateFromText(props.note.item.ingress));
    setDescription(createStateFromText(props.note.item.description));
  }, [props.note.item]);

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
    // "ready for release" switch handler
    setReady(!ready);
  };

  useEffect(() => {
    // editor contents are saved
    setChanged(false);
  }, [props.note.updated]);

  return (
    <React.Fragment>
      <BottomToolbar
        loading={props.note.pending}
        left={[
          <CancelButton color="secondary" onClick={props.onCancel}>
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

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const CancelButton = styled(Button)`
  && {
    color: white;
    padding: 0 16px;
  }
`;
const ToolbarWrapper = styled.div`
  width: ${props => props.theme.contentWidth};
  max-width: ${props => props.theme.contentWidth};
  margin: auto;
`;
const BottomAppBar = styled(AppBar)`
  & {
    background-color: ${props => props.theme.mainColor} !important;
    position: fixed;
    top: auto !important;
    bottom: 0 !important;
  }
`;
