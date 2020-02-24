import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "../releaseEditor/Column";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import {
  Divider,
  Button,
  Menu,
  MenuItem,
  ListItemText
} from "@material-ui/core";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import { ArrowDropDown } from "@material-ui/icons";
import { getReleaseNotes } from "../../requests/releaseNote";
import { getProductVersions } from "../../requests/productVersion";
import { saveRelease } from "../../requests/release";

class ReleaseEditorScreen extends Component {
  constructor() {
    super();
    this.handleRemoveReleaseNote = this.handleRemoveReleaseNote.bind(this);
  }

  componentDidMount() {
    getReleaseNotes()
      .then(response => {
        const newReleaseNotes = response.data;
        let allItemsCopy = JSON.parse(JSON.stringify(this.state.allItems));
        allItemsCopy.releaseNotes.list = newReleaseNotes;
        this.setState({ allItems: allItemsCopy }, () => {
          this.setState({ isLoaded: true });
        });
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert("Du er ikke logget inn!");
        } else {
          console.log(error.response);
        }
      });
    getProductVersions().then(response => {
      if (response.status === 200) {
        const newProductVersions = response.data;
        this.setState({ productVersions: newProductVersions }, () =>
          console.log(this.state.productVersions)
        );
      } else {
        console.log(
          "Something went wrong while fetching productVersions" +
            response.statusText
        );
      }
    });
  }

  state = {
    title: "",
    isLoaded: false,
    productVersions: [],
    selectedProductVersionLabel: "",
    selectedProductVersionId: "",
    anchorEl: {},
    openMenu: false,
    allItems: {
      release: {
        id: "release",
        name: "Release",
        list: []
      },
      releaseNotes: {
        id: "releaseNotes",
        name: "Release Notes",
        list: []
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
    const release = {
      productVersionId: this.state.selectedProductVersionId,
      title: this.state.title,
      isPublic: this.state.isPublic,
      releaseNotesIds: this.state.allItems.release.list.map(rn => rn.id)
    };
    saveRelease(release)
      .then(response => {
        if (response.status === 200) {
          alert("Opprettet!");
        } else {
          console.log(response.statusText);
        }
      })
      .catch(error => {
        alert(error.response.data);
      });
  };

  handleCancel = () => {
    window.location = "http://localhost:3000/";
  };

  handleClickProductVersion = event => {
    const currentTarget = event.currentTarget;
    this.setState({ anchorEl: currentTarget });
    this.setState({ openMenu: true });
  };

  handleCloseProductVersion = event => {
    console.log(event.currentTarget);
    const newProductVersionId = event.currentTarget.id;
    const newProductVersionLabel = event.currentTarget.textContent;
    console.log(newProductVersionLabel);
    this.setState(
      {
        selectedProductVersionId: newProductVersionId,
        selectedProductVersionLabel: newProductVersionLabel,
        anchorEl: null,
        openMenu: false
      },
      console.log(this.state.selectedProductVersionLabel)
    );
  };

  handleOnChangeTitle = result => {
    const newTitle = result.target.value;
    this.setState({ title: newTitle });
  };

  render() {
    return (
      <StyledPageContainer>
        <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
        <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
        <SpacedDivider />
        <ButtonToolbar>
          <SaveButton variant="contained" onClick={this.handleSave}>
            Opprett
          </SaveButton>
          <CancelButton
            color="secondary"
            variant="contained"
            onClick={this.handleCancel}
          >
            Avbryt
          </CancelButton>
          <SelectProductVersion
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            onClick={this.handleClickProductVersion}
            endIcon={<ArrowDropDown />}
          >
            {this.state.selectedProductVersionLabel === ""
              ? "Product"
              : this.state.selectedProductVersionLabel}
          </SelectProductVersion>
          <Menu
            id="customized-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={this.state.openMenu}
            onClose={this.handleCloseProductVersion}
          >
            {this.state.productVersions.map(productVersion => (
              <MenuItem
                id={productVersion.id}
                key={productVersion.product.name}
                onClick={this.handleCloseProductVersion}
              >
                <ListItemText
                  primary={
                    productVersion.product.name + " - " + productVersion.version
                  }
                />
              </MenuItem>
            ))}
          </Menu>
        </ButtonToolbar>
        <FlexContainer>
          {this.state.isLoaded ? (
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
                handleOnChangeTitle={this.handleOnChangeTitle}
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
          ) : (
            ""
          )}
        </FlexContainer>
      </StyledPageContainer>
    );
  }
}

export default ReleaseEditorScreen;

const SelectProductVersion = styled(Button)`
  && {
    align-self: flex-end;
    margin-left: auto;
  }
`;

const SaveButton = styled(Button)`
  && {
    background-color: green;
    color: white;
    align-self: flex-start;
    margin-right: 1rem;
  }
`;

const CancelButton = styled(Button)`
  && {
    color: white;
    align-self: flex-start;
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
