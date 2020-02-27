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
  ListItemText,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import { ArrowDropDown } from "@material-ui/icons";
import { getReleaseNotes } from "../../requests/releaseNote";
import { getProductVersions } from "../../requests/productVersion";
import { saveRelease } from "../../requests/release";
import TitleTextField from "../releaseEditor/TitleTextField";

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
        this.setState({ productVersions: newProductVersions });
      } else {
        console.log(
          "Something went wrong while fetching productVersions" +
            response.statusText
        );
      }
    });
  }

  state = {
    open: false,
    titleIsError: true,
    releaseNotesIsError: true,
    productVersionIsError: true,
    submitDisabled: true,
    isPublic: false,
    title: "",
    isLoaded: false,
    productVersions: [],
    selectedProductVersionLabel: "",
    selectedProductVersionId: "",
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

    this.setState({ allItems: allItemsCopy }, () => {
      this.validateReleaseNotes();
    });
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

    this.setState({ allItems: allItemsCopy }, () => {
      this.validateReleaseNotes();
    });
  };

  releaseNoteStyle = {
    minWidth: "20rem",
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

  handleOnChangeProductVersion = event => {
    const newProductVersionId = event.currentTarget.id;
    const newProductVersionLabel = event.target.value;
    this.setState(
      {
        selectedProductVersionId: newProductVersionId,
        selectedProductVersionLabel: newProductVersionLabel
      },
      () => this.validateProductVersion()
    );
  };

  handleCloseProductVersions = () => {
    this.setState({ open: false });
  };

  handleOpenProductVersions = () => {
    this.setState({ open: true });
  };

  handleOnChangeTitle = result => {
    const newTitle = result.target.value;
    this.setState({ title: newTitle }, () => {
      this.validateTitle();
    });
  };

  handleChangeIsPublic = () => {
    this.setState({ isPublic: !this.state.isPublic });
  };

  validateTitle = () => {
    const newTitle = this.state.title;
    // prettier-ignore
    if (newTitle === "") {
      this.setState(
        { titleIsError: true, titleErrorMsg: "Felt kan ikke være tomt" },
        () => {
          console.log(this.state.titleErrorMsg)
          this.validateSubmit();
        }
      );
    } else {
      this.setState({ titleIsError: false, titleErrorMsg: "" }, () => {
        this.validateSubmit();
      });
    }
  };

  validateReleaseNotes = () => {
    if (!(this.state.allItems.release.list.length === 0)) {
      this.setState(
        { releaseNotesIsError: false, releaseNoteErrorMsg: "" },
        () => {
          this.validateSubmit();
        }
      );
    } else {
      this.setState(
        {
          releaseNotesIsError: true,
          releaseNoteErrorMsg: "Du må ihvertfall velge en Release Note"
        },
        () => {
          this.validateSubmit();
        }
      );
    }
  };

  validateProductVersion = () => {
    if (this.state.selectedProductVersionId) {
      this.setState(
        { productVersionIsError: false, productVersionErrorMsg: "" },
        () => {
          this.validateSubmit();
        }
      );
    } else {
      this.setState(
        {
          productVersionIsError: true,
          productVersionErrorMsg: "Du må velge et produkt"
        },
        () => {
          this.validateSubmit();
        }
      );
    }
  };

  validateSubmit = () => {
    if (
      !(
        this.state.titleIsError ||
        this.state.releaseNotesIsError ||
        this.state.productVersionIsError
      )
    ) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  };

  render() {
    return (
      <StyledPageContainer>
        <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
        <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
        <SpacedDivider />
        <ButtonToolbar>
          <SaveButton
            disabled={this.state.submitDisabled}
            variant="contained"
            onClick={this.handleSave}
          >
            Opprett
          </SaveButton>
          <CancelButton
            color="secondary"
            variant="contained"
            onClick={this.handleCancel}
          >
            Avbryt
          </CancelButton>
          <ErrorMsgContainer>
            <span>{this.state.releaseNoteErrorMsg}</span>
          </ErrorMsgContainer>
          <StyledFormControl error={this.state.productVersionIsError}>
            <InputLabel id="product-version-error-label">Produkt</InputLabel>
            <Select
              labelId="product-version-error-label"
              id="product-version-error-label"
              value={this.state.selectedProductVersionLabel}
              onChange={this.handleOnChangeProductVersion}
              open={this.state.open}
              onClose={this.handleCloseProductVersions}
              onOpen={this.handleOpenProductVersions}
            >
              {this.state.productVersions.map(productVersion => (
                <MenuItem
                  id={productVersion.id}
                  key={productVersion.product.name}
                  value={
                    productVersion.product.name + " - " + productVersion.version
                  }
                >
                  {productVersion.product.name + " - " + productVersion.version}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{this.state.productVersionErrorMsg}</FormHelperText>
          </StyledFormControl>
          <FormControlLabel
            style={{ marginLeft: "15px" }}
            control={
              <Switch
                checked={this.state.isPublic}
                onChange={this.handleChangeIsPublic}
                value={this.state.isPublic}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Publisert"
          />
        </ButtonToolbar>
        <FlexContainer>
          {this.state.isLoaded ? (
            <DragDropContext
              onBeforeCapture={this.onBeforeCapture}
              onDragEnd={this.onDragEnd}
            >
              <ReleaseContainer>
                <TitleTextField
                  handleOnChangeTitle={this.handleOnChangeTitle}
                  error={this.state.titleIsError}
                  helperText={this.state.titleErrorMsg}
                />
                <Column
                  isRelease={true}
                  key={this.state.allItems.release.id}
                  id={this.state.allItems.release.id}
                  title={this.state.allItems.release.name}
                  releaseNotes={this.state.allItems.release.list}
                  noteWidth={this.state.noteWidth}
                  handleRemoveReleaseNote={this.handleRemoveReleaseNote}
                />
              </ReleaseContainer>
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

const ErrorMsgContainer = styled.div`
  margin-left: auto;
  color: red;
`;

const ReleaseContainer = styled.div`
  flex-basis: 80%;
`;

// const SelectProductVersion = styled(Button)`
//   && {
//     align-self: flex-end;
//     margin-left: auto;
//   }
// `;

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 7rem;
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
