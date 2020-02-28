import React, { Component } from "react";
import ReleaseNote from "./ReleaseNote";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import TitleTextField from "./TitleTextField";

const Column = props => {
  return (
    <StyledPaper style={props.styleSheet}>
      <Droppable droppableId={props.id}>
        {provided => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.releaseNotes.map((releaseNote, index) => (
              <ReleaseNote
                key={releaseNote.id}
                releaseNote={releaseNote}
                index={index}
                isRelease={props.isRelease}
                handleRemoveReleaseNote={
                  props.isRelease ? props.handleRemoveReleaseNote : undefined
                }
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </StyledPaper>
  );
};

export default Column;

const StyledPaper = styled.div`
  text-align: center;
  padding-bottom: 4rem;
`;

const TaskList = styled.div`
  background-color: #fff;
`;
