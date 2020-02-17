import React, { useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import { Editor, EditorState } from "draft-js";

const ReleaseNoteRichInput = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorChange = editorState => {
    setEditorState(editorState);
    props.onChange(editorState);
  };

  const _id = shortid.generate();
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={_id}>{props.label}</InputLabel>
      <Paper variant="outlined">
        <Editor editorState={editorState} onChange={onEditorChange} />
      </Paper>
    </FormControl>
  );
};

export default ReleaseNoteRichInput;