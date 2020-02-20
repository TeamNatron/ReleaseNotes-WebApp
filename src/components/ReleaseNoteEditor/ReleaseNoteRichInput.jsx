import React, { useState } from "react";
import { FormControl, Divider } from "@material-ui/core";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";

const ReleaseNoteRichInput = props => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  let editor = React.createRef();

  const focusEditor = () => {
    editor.current.focusEditor();
  };
  /*const handleFormat = (event, newFormats) => {
    // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
    let diff = newFormats
      .filter(format => !formats.includes(format))
      .concat(formats.filter(formats => !newFormats.includes(formats)));
    setFormats(newFormats);
    for (const format of diff) {
      onEditorChange(RichUtils.toggleInlineStyle(editorState, format));
    }

    // TODO: currently only applies to selected text
  };*/
  const onEditorChange = editorState => {
    setEditorState(editorState);
    props.onChange(editorState);
  };

  const handleImageUpload = image => {
    return new Promise(
      (resolve, reject) => {
        resolve({data: {link: URL.createObjectURL(image)}});
      }
    );
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <EditorWrapper>
        <Divider />
        <EditorInner onClick={focusEditor}>
          <Editor
            placeholder="Beskrivelse"
            ref={editor}
            editorState={editorState}
            onEditorStateChange={onEditorChange}
            editorClassName={"editor"}
            toolbarClassName={"toolbar"}
            toolbar={{
              options: [
                "inline",
                "blockType",
                "list",
                "textAlign",
                "colorPicker",
                "link",
                "emoji",
                "embedded",
                "image",
                "remove",
                "history"
              ],
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: handleImageUpload,
                previewImage: true,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: { present: false, mandatory: false },
                defaultSize: {
                  height: "auto",
                  width: "auto"
                }
              }
            }}
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
  }
`;
const EditorInner = styled.div`
  cursor: text;
`;
