import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import styled from "styled-components";
import {
  Divider,
  Button,
  MenuItem,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import TitleTextField from "./TitleTextField";
import PropTypes from "prop-types";
import BottomToolbar from "../shared/BottomToolbar";
import shortid from "shortid";

class ReleaseEditor extends Component {
  constructor(props) {
    super(props);
    this.handleRemoveReleaseNote = this.handleRemoveReleaseNote.bind(this);

    const release = props.release;
    const productVersion = release?.productVersion;
    const isError = release ? false : true;
    this.state = {
      open: false,
      titleIsError: isError,
      releaseNotesIsError: isError,
      productVersionIsError: isError,
      submitDisabled: true,
      isPublic: release?.isPublic,
      title: release?.title,
      productVersions: [],
      selectedProductVersionLabel:
        productVersion?.product?.name + " - " + productVersion?.version,
      selectedProductVersionId: productVersion?.id,
      allItems: {
        release: {
          id: "release",
          name: "Release",
          list: []
        },
        releaseNotes: {
          id: "releaseNotes",
          name: "Release Notes",
          list: props.releaseNotesResource ? props.releaseNotesResource : []
        }
      }
    };
  }

  componentDidMount() {
    this.validateSubmit();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.release !== this.props.release && this.props.release) {
      this.setState(
        prevState => {
          const newAllItems = prevState.allItems;
          newAllItems.release.list = this.props.release.releaseNotes;
          const selectedVersion =
            this.props.release.productVersion?.product?.name +
            " - " +
            this.props.release.productVersion.version;
          return {
            title: this.props.release.title,
            allItems: newAllItems,
            isPublic: this.props.release.isPublic,
            selectedProductVersionLabel: selectedVersion,
            selectedProductVersionId: this.props.release.productVersion?.id
          };
        },
        () => {
          this.validateTitle();
          this.validateProductVersion();
        }
      );
    }
    if (
      prevProps.releaseNotesResource !== this.props.releaseNotesResource &&
      this.props.releaseNotesResource
    ) {
      this.setState(
        prevState => {
          const newAllItems = prevState.allItems;
          newAllItems.releaseNotes.list = this.props.releaseNotesResource;
          return {
            allItems: newAllItems
          };
        },
        () => this.validateReleaseNotes()
      );
    }
  }

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
      releaseNotesId: this.state.allItems.release.list.map(rn => rn.id)
    };
    this.props.onSave(release);
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
          releaseNoteErrorMsg: "Du må i hvert fall velge en Release Note"
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
      <React.Fragment>
        <BottomToolbar
          loading={this.props.loading}
          left={[
            <Button
              key="cancelBtn"
              color="secondary"
              variant="contained"
              onClick={this.props.onCancel}
            >
              Avbryt
            </Button>
          ]}
          right={[
            <FormControlLabel
              key="isPublicSwitch"
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
            />,
            <SaveButton
              key="cancelBtn"
              disabled={this.state.submitDisabled}
              variant="contained"
              onClick={this.handleSave}
            >
              Lagre
            </SaveButton>
          ]}
          middle={[
            <ErrorMsgContainer key="errorMsgContainer">
              <span>{this.state.releaseNoteErrorMsg}</span>
            </ErrorMsgContainer>
          ]}
        />

        {this.props.productVersionsResource ? (
          // make sure props are not undefined
          <StyledFormControl error={this.state.productVersionIsError}>
            <InputLabel id="product-version-error-label">Produkt</InputLabel>
            <Select
              labelId="product-version-error-label"
              id="product-version-error-label"
              value={this.state.selectedProductVersionLabel}
              onChange={this.handleOnChangeProductVersion}
              onClose={this.handleCloseProductVersions}
              onOpen={this.handleOpenProductVersions}
              open={this.state.open}
              disabled={this.props.loading}
            >
              {!this.props.loading &&
                this.props.productVersionsResource.items.map(productVersion => (
                  <MenuItem
                    id={productVersion.id}
                    key={shortid.generate()}
                    value={
                      productVersion.product.name +
                      " - " +
                      productVersion.version
                    }
                  >
                    {productVersion.product.name +
                      " - " +
                      productVersion.version}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>{this.state.productVersionErrorMsg}</FormHelperText>
          </StyledFormControl>
        ) : (
          <React.Fragment />
        )}

        {this.props.releaseNotesResource ? (
          <FlexContainer>
            <DragDropContext
              onBeforeCapture={this.onBeforeCapture}
              onDragEnd={this.onDragEnd}
            >
              <ReleaseContainer>
                <TitleTextField
                  value={this.state.title}
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
          </FlexContainer>
        ) : (
          <React.Fragment />
        )}
      </React.Fragment>
    );
  }
}

export default ReleaseEditor;

ReleaseEditor.defaultProps = {};

ReleaseEditor.propTypes = {
  releaseNotesResource: PropTypes.array,
  productVersionsResource: PropTypes.object,

  /**
   * Optional release object to populate the editor
   */
  release: PropTypes.object,

  onCancel: PropTypes.func,
  onSave: PropTypes.func
};

const ErrorMsgContainer = styled.div`
  margin-left: auto;
  color: red;
`;

const ReleaseContainer = styled.div`
  flex-basis: 80%;
`;

const StyledFormControl = styled(FormControl)`
  && {
    margin-bottom: 1rem;
    min-width: 7rem;
  }
`;

const SaveButton = styled(Button)`
  && {
    background-color: ${props => props.theme.secondaryColor};
    color: white;
    margin-left: 1rem;
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
