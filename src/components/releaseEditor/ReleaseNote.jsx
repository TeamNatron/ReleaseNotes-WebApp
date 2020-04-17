import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Paper, Divider, IconButton, Box } from "@material-ui/core";
import styled from "styled-components";
import { Delete } from "@material-ui/icons";
import ReleaseNotePreview from "../shared/ReleaseNotePreview";
import ReleaseNoteEditorModal from "../releaseNoteEditor/ReleaseNoteEditorModal";

const ReleaseNote = (props) => {
  return (
    <Draggable draggableId={"draggable-" + props.id} index={props.index}>
      {(provided) => (
        <StyledContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isRelease={props.isRelease}
        >
          <Box display="flex" flexDirection="row">
            <Box flexGrow={2}>
              <ReleaseNotePreview note={props.releaseNote} />
            </Box>
            <Box>
              {props.isRelease && (
                <React.Fragment>
                  <FlexEnd>
                    <ReleaseNoteEditorModal
                      note={props.releaseNote}
                      onSave={props.onSave}
                    />
                  </FlexEnd>

                  <StyledIconButton
                    onClick={() => props.handleRemoveReleaseNote(props.index)}
                  >
                    <Delete />
                  </StyledIconButton>
                </React.Fragment>
              )}
            </Box>
          </Box>
          <ReleaseNoteDivider isRelease={props.isRelease ? true : undefined} />
        </StyledContainer>
      )}
    </Draggable>
  );
};

export default ReleaseNote;

const StyledIconButton = styled(IconButton)`
  && {
    margin-left: auto;
    display: flex-end;
  }
`;

const FlexEnd = styled.div`
  margin-left: auto;
  display: flex-end;
`;

const StyledContainer = styled(Paper)`
  && {
    h3 {
      /* color: ${(props) => props.theme.secondaryColor}; */
      color: #6f6969
    }
    width: ${(props) => (props.isRelease ? "100%" : "20rem")};
    padding: 1rem;
    margin-top: 5px;
    border-style: solid;
    border-color: #cac9c9;
    text-align: left;
  }
`;

const ReleaseNoteDivider = styled(Divider)`
  /* prettier-ignore-start */

  && {
    height: 7px;
    border-radius: 3px;
    background-color: ${(props) => (props.isRelease ? "#05865a" : "#ffa900")};
  }
  /* prettier-ignore-start */
`;
