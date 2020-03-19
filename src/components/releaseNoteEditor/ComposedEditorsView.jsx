import React from 'react';
import { Editor, EditorState } from "draft-js";
import { Paper, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Map } from "immutable";
import { Editor as EditorWysiwyg } from "react-draft-wysiwyg";
import PropTypes from "prop-types";

const ComposedEditorsView = props => {
  const titleRenderMap = Map({
    unstyled: {
      element: "h2"
    }
  });

  const ingressRenderMap = Map({
    unstyled: {
      element: "section"
    }
  });

  const killAllSpacing = {
    padding: "0px",
    margin: "0px"
  };

  return (
    <Paper variant="outlined">
      <EditorInner>
        <Typography
          style={{ fontSize: 12 }}
          display="block"
          color="textSecondary"
          gutterBottom
        >
          Forhåndsvisning
        </Typography>
        {props.title.getCurrentContent().hasText() ? (
          <Editor
            editorState={EditorState.createWithContent(
              props.title.getCurrentContent()
            )}
            blockRenderMap={titleRenderMap}
            readOnly
          />
        ) : (
          <React.Fragment />
        )}
        {props.ingress.getCurrentContent().hasText() ? (
          <Editor
            editorState={EditorState.createWithContent(
              props.ingress.getCurrentContent()
            )}
            blockRenderMap={ingressRenderMap}
            readOnly
          />
        ) : (
          <React.Fragment />
        )}

        {props.description.getCurrentContent().hasText() ? (
          <EditorWysiwyg
            toolbarHidden
            editorState={EditorState.createWithContent(
              props.description.getCurrentContent()
            )}
            readOnly
            wrapperStyle={killAllSpacing}
            editorStyle={killAllSpacing}
            toolbarStyle={killAllSpacing}
          />
        ) : (
          <React.Fragment />
        )}
      </EditorInner>
    </Paper>
  );
};

export default ComposedEditorsView;

ComposedEditorsView.defaultProps = {
  title: EditorState.createEmpty(),
  ingress: EditorState.createEmpty(),
  description: EditorState.createEmpty()
};

ComposedEditorsView.defaultProps = {
  title: PropTypes.object,
  ingress: PropTypes.object,
  description: PropTypes.object
};

const EditorInner = styled.div`
  margin: 14px 18.5px;
`;
