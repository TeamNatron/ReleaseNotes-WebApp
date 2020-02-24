import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Paper, Divider, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { Delete } from "@material-ui/icons";

const ReleaseNote = props => {
  return (
    <Draggable
      draggableId={props.releaseNote.workItemTitle}
      id={props.id}
      index={props.index}
    >
      {provided => (
        <StyledContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isRelease={props.isRelease}
        >
          <ReleaseNoteHeader>
            <Title>{props.releaseNote.workItemTitle}</Title>
            {props.isRelease && (
              <StyledIconButton
                onClick={() => props.handleRemoveReleaseNote(props.index)}
              >
                <Delete />
              </StyledIconButton>
            )}
          </ReleaseNoteHeader>
          <ReleaseNoteDivider isRelease={props.isRelease ? true : undefined} />
          <span style={{ marginTop: "15px" }}>{props.releaseNote.ingress}</span>
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

const ReleaseNoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 0.8rem;
  font-size: 1.2rem;
`;

const Title = styled.span`
  margin: 0;
  display: flex;
`;

const StyledContainer = styled(Paper)`
  && {
    h3 {
      /* color: ${props => props.theme.secondaryColor}; */
      color: #6f6969
    }
    width: ${props => (props.isRelease ? "100%" : "20rem")};
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
    background-color: ${props => (props.isRelease ? "#05865a" : "#ffa900")};
    transition: background-color 1s;
  }
  /* prettier-ignore-start */
`;
