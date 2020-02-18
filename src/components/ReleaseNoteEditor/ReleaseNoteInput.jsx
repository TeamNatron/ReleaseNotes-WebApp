import React, { useState } from "react";
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

const ReleaseNoteInput = props => {
  function handleClearInput() {
    props.onChange({ target: { value: "" } });
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorChange = editorState => {
    setEditorState(editorState);
  };

  const _id = shortid.generate();
  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <InputLabel htmlFor={_id}>{props.label}</InputLabel>
      {props.rich ? (
        <Paper variant="outlined">
          <Editor editorState={editorState} onChange={onEditorChange} />
        </Paper>
      ) : (
        <OutlinedInput
          id={_id}
          type="text"
          multiline
          value={props.value}
          onChange={props.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClearInput}>
                <Clear />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={90}
        />
      )}
    </FormControl>
  );
};

export default ReleaseNoteInput;

ReleaseNoteInput.defaultProps = {
  rich: false
};
