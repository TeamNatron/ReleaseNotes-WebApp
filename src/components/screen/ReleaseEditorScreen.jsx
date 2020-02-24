import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../releaseEditor/Column";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu
} from "@material-ui/core";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";

class ReleaseEditorScreen extends Component {
  constructor() {
    super();
    this.handleRemoveReleaseNote = this.handleRemoveReleaseNote.bind(this);
  }

  state = {
    allItems: {
      release: {
        id: "release",
        name: "Release",
        list: [
          {
            title: "Release Note 1",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "1"
          },
          {
            title: "Release Note 2",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "2"
          },
          {
            title: "Release Note 3",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "3"
          },
          {
            title: "Release Note 4",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "4"
          }
        ]
      },
      releaseNotes: {
        id: "releaseNotes",
        name: "Release Notes",
        list: [
          {
            title: "Release Note 5",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "5"
          },
          {
            title: "Release Note 6",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "6"
          },
          {
            title: "Release Note 7",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "7"
          },
          {
            title: "Release Note 8",
            ingress:
              "In this release note we wrote everything we did to make things better",
            id: "8"
          }
        ]
      }
    }
  };

  onDragEnd = result => {
    const { destination, source } = result;

    // Return if destination is the same or nothing
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Moving within the same column
    if (destination.droppableId === source.droppableId) {
      this.moveWithinSameColumn(
        source.droppableId,
        source.index,
        destination.index
      );
    }
    // Moving from one column, to the other
    else {
      this.moveToAnotherColumn(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  moveWithinSameColumn = (srcDroppableId, srcIndex, destIndex) => {
    let allItemsCopy = JSON.parse(JSON.stringify(this.state.allItems));

    let column = allItemsCopy[srcDroppableId].list;

    let item = column[srcIndex];

    column.splice(srcIndex, 1);
    column.splice(destIndex, 0, item);

    this.setState({ allItems: allItemsCopy });
  };

  moveToAnotherColumn = (
    srcDroppableId,
    destDroppableId,
    srcIndex,
    destIndex
  ) => {
    let allItemsCopy = JSON.parse(JSON.stringify(this.state.allItems));

    const srcColumn = allItemsCopy[srcDroppableId].list;
    const destColumn = allItemsCopy[destDroppableId].list;

    let item = srcColumn[srcIndex];

    srcColumn.splice(srcIndex, 1);
    destColumn.splice(destIndex, 0, item);

    this.setState({ allItems: allItemsCopy });
  };

  releaseStyle = {
    flexBasis: "80%"
  };

  releaseNoteStyle = {
    flexBasis: "20%"
  };

  handleRemoveReleaseNote(srcIndex) {
    this.moveToAnotherColumn("release", "releaseNotes", srcIndex, 0);
  }

  handleSave = () => {
    console.log("Saved");
  };

  handleCancel = () => {
    window.location = "http://localhost:3000/";
  };

  render() {
    return (
      <StyledPageContainer>
        <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
        <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
        <SpacedDivider />
        <ButtonToolbar>
          <SaveButton variant="contained" onClick={this.handleSave}>
            Lagre
          </SaveButton>
          <CancelButton
            color="secondary"
            variant="contained"
            onClick={this.handleCancel}
          >
            Avbryt
          </CancelButton>
        </ButtonToolbar>
        <FlexContainer>
          <DragDropContext
            onBeforeCapture={this.onBeforeCapture}
            onDragEnd={this.onDragEnd}
          >
            <Column
              isRelease={true}
              styleSheet={this.releaseStyle}
              key={this.state.allItems.release.id}
              id={this.state.allItems.release.id}
              title={this.state.allItems.release.name}
              releaseNotes={this.state.allItems.release.list}
              noteWidth={this.state.noteWidth}
              handleRemoveReleaseNote={this.handleRemoveReleaseNote}
            />
            <VerticalDivider orientation={"vertical"} />
            <Column
              isRelease={false}
              styleSheet={this.releaseNoteStyle}
              key={this.state.allItems.releaseNotes.id}
              id={this.state.allItems.releaseNotes.id}
              title={this.state.allItems.releaseNotes.name}
              releaseNotes={this.state.allItems.releaseNotes.list}
            />
          </DragDropContext>
        </FlexContainer>
      </StyledPageContainer>
    );
  }
}

export default ReleaseEditorScreen;

const SaveButton = styled(Button)`
  && {
    background-color: ${props => props.theme.secondaryColor};
    color: white;
    align-self: flex-start;
  }
`;

const CancelButton = styled(Button)`
  && {
    color: white;
    align-self: flex-end;
    margin-left: auto;
  }
`;

const ButtonToolbar = styled.div`
  width: 100%;
  padding: 1rem;
  display: inline-flex;
`;

const StyledPageContainer = styled(PageContainer)`
  && {
    margin-top: 8rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100rem;
  margin: auto;
`;

const VerticalDivider = styled(Divider)`
  && {
    height: auto;
    width: 5px;
    border-radius: 10px;
    margin: 0 15px 0 15px;
  }
`;
