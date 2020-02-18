import React, { Component } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  ContentState,
  ContentBlock,
  CharacterMetadata
} from "draft-js";
import { List, Repeat } from "immutable";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

class RichEditor extends React.Component {
  TITLE = "title";
  INGRESS = "ingress";
  DESCRIPTION = "desciption";
  constructor(props) {
    super(props);
    const dummyText1 = "Title";
    const dummyText2 = "Ingress Ingress Ingress Ingress Ingress ";
    const dummyText3 =
      "Description Description Description Description Description Description ";
    const blocks = [
      new ContentBlock({
        key: this.TITLE,
        text: dummyText1,
        type: "header-two",
        depth: 0,
        characterList: new List(
          Repeat(CharacterMetadata.create(), dummyText1.length)
        )
      }),
      new ContentBlock({
        key: this.INGRESS,
        text: dummyText2,
        type: "paragraph",
        depth: 0,
        characterList: new List(
          Repeat(CharacterMetadata.create(), dummyText2.length)
        )
      }),
      new ContentBlock({
        key: this.DESCRIPTION,
        text: dummyText3,
        type: "paragraph",
        depth: 0,
        characterList: new List(
          Repeat(CharacterMetadata.create(), dummyText3.length)
        )
      })
    ];

    const contentState = ContentState.createFromBlockArray(blocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState: editorState
    };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      var editorState = this.state.editorState;
      var content = editorState.getCurrentContent();

      if (this.props.title !== prevProps.title) {
        content = this.updateBlock(editorState, this.TITLE, this.props.title);
      }
      if (this.props.ingress !== prevProps.ingress) {
        content = this.updateBlock(
          editorState,
          this.INGRESS,
          this.props.ingress
        );
      }
      if (
        this.props.descriptionEditorState !== prevProps.descriptionEditorState
      ) {
        content = this.updateBlockMap(
          editorState,
          this.props.descriptionEditorState
        );
      }
      this.onChange(
        EditorState.push(editorState, content, "change-block-data")
      );
    }
  }

  updateBlockMap(editorState, descriptionEditorState) {
    const descriptionBlocks = descriptionEditorState
      .getCurrentContent()
      .getBlockMap();
    return editorState
      .getCurrentContent()
      .update("blockMap", blockMap =>
        blockMap.take(2).merge(descriptionBlocks)
      );
  }

  updateBlock(editorState, key, text) {
    return editorState.getCurrentContent().update("blockMap", blockMap =>
      blockMap.update(key, block =>
        block.merge({
          text: text,
          characterList: new List(
            Repeat(CharacterMetadata.create(), text.length)
          )
        })
      )
    );
  }

  render() {
    return (
      <Paper variant="outlined">
        <EditorInner>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            readOnly
          />
        </EditorInner>
      </Paper>
    );
  }
}

export default RichEditor;

RichEditor.defaultProps = {
  descriptionEditorState: EditorState.createEmpty()
};

const EditorInner = styled.div`
  margin: 14px 18.5px;
`;
