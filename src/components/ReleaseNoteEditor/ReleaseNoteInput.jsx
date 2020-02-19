import React from "react";
import { FormControl } from "@material-ui/core";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import styled from "styled-components";

const ReleaseNoteInput = props => {
  function handleClearInput() {
    props.onChange(EditorState.createEmpty());
  }

  const onEditorChange = editorState => {
    props.onChange(editorState);
  };

  let editor = React.createRef();

  const focusEditor = () => {
    editor.current.focusEditor();
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <EditorWrapper onClick={focusEditor}>
        <Editor
          toolbarHidden
          placeholder={props.label}
          ref={editor}
          editorState={props.editorState}
          onEditorStateChange={onEditorChange}
        />
      </EditorWrapper>
    </FormControl>
  );
};

export default ReleaseNoteInput;

ReleaseNoteInput.defaultProps = {
  editorState: EditorState.createEmpty()
};

const EditorWrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  cursor: text;
  transition: 1s ease;
  }
`;
