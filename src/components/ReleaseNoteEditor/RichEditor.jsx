import React, { Component } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  ContentBlock,
  CharacterMetadata,
  convertToRaw
} from "draft-js";
import { List, Repeat } from "immutable";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import draftToHtml from "draftjs-to-html";

class RichEditor extends React.Component {
  TITLE = "title";
  INGRESS = "ingress";
  DESCRIPTION = "desciption";
  constructor(props) {
    super(props);

    const blocks = [
      new ContentBlock({
        key: this.TITLE,
        text: "",
        type: "header-two",
        depth: 0,
        characterList: new List(Repeat(CharacterMetadata.create(), 0))
      }),
      new ContentBlock({
        key: this.INGRESS,
        text: "atomic",
        type: "unstyled",
        depth: 0,
        characterList: new List(Repeat(CharacterMetadata.create(), 0))
      }),
      new ContentBlock({
        key: this.DESCRIPTION,
        text: "",
        type: "unstyled",
        depth: 0,
        characterList: new List(Repeat(CharacterMetadata.create(), 0))
      })
    ];

    const contentState = ContentState.createFromBlockArray(blocks);
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState: editorState
    };
  }

  onChange = editorState => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const savedHtml = draftToHtml(rawContentState);
    console.log(rawContentState);
    console.log(savedHtml);
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
