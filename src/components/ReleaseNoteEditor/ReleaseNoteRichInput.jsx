import React, { useState } from "react";
import { FormControl, Divider } from "@material-ui/core";

import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { EditorState, RichUtils } from "draft-js";
import styled from "styled-components";
import {
  FormatUnderlined,
  FormatItalic,
  FormatBold,
} from "@material-ui/icons";

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ReleaseNoteRichInput = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formats, setFormats] = React.useState(() => []);

  let editor = React.createRef();

  const focusEditor = () => {
    editor.current.focus();
  };
  const handleFormat = (event, newFormats) => {
    // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
    let diff = newFormats
      .filter(format => !formats.includes(format))
      .concat(formats.filter(formats => !newFormats.includes(formats)));
    setFormats(newFormats);
    for (const format of diff) {
      onEditorChange(RichUtils.toggleInlineStyle(editorState, format));
    }
    // TODO: currently only applies to selected text
  };
  const onEditorChange = editorState => {
    setEditorState(editorState);
    props.onChange(editorState);
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <EditorWrapper>
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormat}
          aria-label="text formatting"
          size="small"
        >
          <ToggleButton value="BOLD" aria-label="bold">
            <FormatBold />
          </ToggleButton>
          <ToggleButton value="ITALIC" aria-label="italic">
            <FormatItalic />
          </ToggleButton>
          <ToggleButton value="UNDERLINE" aria-label="underline">
            <FormatUnderlined />
          </ToggleButton>

          <Divider orientation="vertical" />
        </ToggleButtonGroup>
        <Divider />
        <EditorInner onClick={focusEditor}>
          <Editor
            placeholder="Beskrivelse"
            ref={editor}
            editorState={editorState}
            onChange={onEditorChange}
          />
        </EditorInner>
      </EditorWrapper>
    </FormControl>
  );
};

export default ReleaseNoteRichInput;

const EditorWrapper = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  transition: 1s ease;
`;
const EditorInner = styled.div`
  padding: 14px 18.5px;
  cursor: text;
`;
