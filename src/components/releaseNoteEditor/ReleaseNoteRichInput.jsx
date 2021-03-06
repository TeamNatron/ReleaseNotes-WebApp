import React from "react";
import { FormControl, Divider } from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../slices/imageSlice";

const ReleaseNoteRichInput = (props) => {
  let editor = React.createRef();
  const dispatch = useDispatch();

  const focusEditor = () => {
    editor.current.focusEditor();
  };

  const onEditorChange = (editorState) => {
    props.onChange(editorState);
  };

  const handleImageUpload = (image) => {
    return new Promise((resolve, reject) => {
      dispatch(
        uploadImage(
          image,
          (url) => resolve({ data: { link: url } }),
          (err) => reject()
        )
      );
    });
  };

  return (
    <FormControl variant="outlined" fullWidth margin="normal">
      <EditorWrapper>
        <Divider />
        <EditorInner onClick={focusEditor}>
          <Editor
            placeholder="Beskrivelse"
            ref={editor}
            editorState={props.editorState}
            onEditorStateChange={onEditorChange}
            editorStyle={{
              padding: "14px 18.5px",
            }}
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
                "history",
              ],
              image: {
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: false,
                uploadCallback: handleImageUpload,
                previewImage: true,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                alt: { present: false, mandatory: false },
                defaultSize: {
                  height: "auto",
                  width: "auto",
                },
              },
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
