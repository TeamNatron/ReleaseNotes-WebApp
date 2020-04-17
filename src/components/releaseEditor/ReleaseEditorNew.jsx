import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import {
  Divider,
  Button,
  MenuItem,
  Switch,
  FormControlLabel,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  IconButton,
  Collapse,
} from "@material-ui/core";
import TitleTextField from "./TitleTextField";
import BottomToolbar from "../shared/BottomToolbar";
import shortid from "shortid";
import ToolbarBase from "../shared/ToolbarBase";
import { FilterListRounded } from "@material-ui/icons";
import FilterToolbar from "./FilterToolbar";

const ReleaseEditor = (props) => {
  const release = props.release;
  const productVersion = release?.productVersion;
  const [filterQuery, setFilterQuery] = useState("?");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(release?.isPublic || false);
  const [title, setTitle] = useState(release?.title || "");

  const [allItems, setAllItems] = useState({
    release: {
      id: "release",
      name: "Release",
      list: [],
    },
    releaseNotes: {
      id: "releaseNotes",
      name: "Release Notes",
      list: props.releaseNotesResource || [],
    },
  });

  useEffect(() => {
    setAllItems((oldAllItems) => {
      return {
        ...oldAllItems,
        release: {
          ...oldAllItems.release,
          list: props.release.releaseNotes || [],
        },
      };
    });

    setTitle(props.release.title);
    setIsPublic(Boolean(props.release.isPublic));
    //const selectedVersion = props.release.productVersion?.fullName
    //selectedProductVersionLabel: selectedVersion,
    //selectedProductVersionId: this.props.release.productVersion?.id,
    //this.validateTitle();
    //this.validateProductVersion();
  }, [props.release]);

  useEffect(() => {
    setAllItems((oldAllItems) => {
      return {
        ...oldAllItems,
        releaseNotes: {
          ...oldAllItems.releaseNotes,
          list: props.releaseNotesResource || [],
        },
      };
    });
  }, [props.releaseNotesResource]);

  const { onFilter } = props;
  useEffect(() => {
    onFilter(filterQuery);
  }, [filterQuery]);

  const onDragEnd = (result) => {
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
      moveWithinSameColumn(source.droppableId, source.index, destination.index);
    }
    // Moving from one column, to the other
    else {
      moveToAnotherColumn(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  const moveWithinSameColumn = (srcDroppableId, srcIndex, destIndex) => {
    let allItemsCopy = JSON.parse(JSON.stringify(allItems));

    let column = allItemsCopy[srcDroppableId].list;

    let item = column[srcIndex];

    column.splice(srcIndex, 1);
    column.splice(destIndex, 0, item);

    setAllItems(allItemsCopy);
    //validateReleaseNotes();
  };

  const moveToAnotherColumn = (
    srcDroppableId,
    destDroppableId,
    srcIndex,
    destIndex
  ) => {
    let allItemsCopy = JSON.parse(JSON.stringify(allItems));

    const srcColumn = allItemsCopy[srcDroppableId].list;
    const destColumn = allItemsCopy[destDroppableId].list;

    let item = srcColumn[srcIndex];

    srcColumn.splice(srcIndex, 1);
    destColumn.splice(destIndex, 0, item);

    setAllItems(allItemsCopy);
    //validateReleaseNotes();
  };

  /**
   * update query string based on properties in received object
   */
  const handleFilter = (object) => {
    var query = filterQuery;
    Object.entries(object).forEach((e) => {
      // e[0] = property name
      // e[1] = property value

      // does entry exist in the string?
      if (query.search(e[0]) !== -1) {
        // replace entry
        // regex to match the name+value of a given name in the query
        const regex = new RegExp("(?=[&?]*)" + e[0] + "=(.*?)(?=&|$)");
        query = query.replace(regex, e[0] + "=" + e[1]);
      } else {
        // add entry
        query = createQuery(query, e[0], e[1]);
      }
    });
    setFilterQuery(query);
  };
  const createQuery = (query, name, value) => {
    return query.length > 1
      ? query + "&" + name + "=" + value
      : query + name + "=" + value;
  };

  const handleOnChangeTitle = (result) => {
    const newTitle = result.target.value;
    setTitle(newTitle);
    //validateTitle();
  };

  const handleRemoveReleaseNote = (srcIndex) => {
    moveToAnotherColumn("release", "releaseNotes", srcIndex, 0);
  };

  const handleSave = () => {
    const release = {
      // TODO
    };
    props.onSave(release);
  };

  const handleSaveReleaseNote = (releaseNoteId, releaseNote) => {
    // save editor state locally, then save release note

    const release = {
      // TODO
    };
    props.onSaveEditorState(release);
    props.onSaveReleaseNote(releaseNoteId, releaseNote);
  };

  const releaseNoteStyle = {
    minWidth: "20rem",
    flexBasis: "20%",
  };

  return (
    <React.Fragment>
      <BottomToolbar
        left={[
          <Button
            key="cancelBtn"
            color="secondary"
            variant="contained"
            onClick={props.onCancel}
          >
            Avbryt
          </Button>,
        ]}
        right={[
          <FormControlLabel
            key="isPublicSwitch"
            style={{ marginLeft: "15px" }}
            control={
              <Switch
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                value={isPublic}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            }
            label="Publisert"
          />,
          <SaveButton
            key="saveBtn"
            //disabled={submitDisabled}
            variant="contained"
            //onClick={handleSave}
          >
            Lagre
          </SaveButton>,
        ]}
        middle={[
          <ErrorMsgContainer key="errorMsgContainer">
            <span>
              {
                //releaseNoteErrorMsg
              }
            </span>
          </ErrorMsgContainer>,
        ]}
      />

      {props.productVersionsResource ? (
        // make sure props are not undefined
        <React.Fragment>
          <ToolbarBase
            left={
              <StyledFormControl
                error={
                  ""
                  //productVersionIsError
                }
              >
                <InputLabel id="product-version-error-label">
                  Produkt
                </InputLabel>
                <PVSelect
                  items={props.productVersionsResource.items}
                ></PVSelect>
                <FormHelperText>
                  {
                    //productVersionErrorMsg
                  }
                </FormHelperText>
              </StyledFormControl>
            }
            right={
              <IconButton onClick={() => setFilterOpen(!filterOpen)}>
                <FilterListRounded />
              </IconButton>
            }
          ></ToolbarBase>
          <Collapse in={filterOpen}>
            <FilterToolbar onChange={handleFilter} />
          </Collapse>
        </React.Fragment>
      ) : (
        <React.Fragment />
      )}

      {props.releaseNotesResource ? (
        <FlexContainer>
          <DragDropContext onDragEnd={onDragEnd}>
            <ReleaseContainer>
              <TitleTextField
                value={title}
                handleOnChangeTitle={handleOnChangeTitle}
                //error={titleIsError}
                //helperText={titleErrorMsg}
              />
              <Column
                isRelease={true}
                key={allItems.release.id}
                id={allItems.release.id}
                title={allItems.release.name}
                releaseNotes={allItems.release.list}
                noteWidth={100} // TODO ?
                handleRemoveReleaseNote={handleRemoveReleaseNote}
                onSaveReleaseNote={handleSaveReleaseNote}
              />
            </ReleaseContainer>
            <VerticalDivider orientation={"vertical"} />
            <Column
              isRelease={false}
              styleSheet={releaseNoteStyle}
              key={allItems.releaseNotes.id}
              id={allItems.releaseNotes.id}
              title={allItems.releaseNotes.name}
              releaseNotes={allItems.releaseNotes.list}
            />
          </DragDropContext>
        </FlexContainer>
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default ReleaseEditor;

ReleaseEditor.defaultProps = {
  release: {},
};

ReleaseEditor.propTypes = {
  releaseNotesResource: PropTypes.array,
  productVersionsResource: PropTypes.object,

  /**
   * Optional release object to populate the editor
   */
  release: PropTypes.object,

  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onFilter: PropTypes.func,

  onSaveReleaseNote: PropTypes.func,
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
    background-color: ${(props) => props.theme.secondaryColor};
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

const PVSelect = (props) => {
  const [selected, setSelected] = useState({ fullName: "", id: -1 });
  const [open, setOpen] = useState(false);

  const handleChange = (ev) => {
    console.log(ev.target);
    if (ev.target.value) {
      setSelected(ev.target.value);
    }
  };
  return (
    <Select
      labelId="product-version-error-label"
      id="product-version-error-label"
      value={selected}
      onChange={handleChange}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      {props.items.map((productVersion) => (
        <MenuItem
          id={productVersion.id}
          key={shortid.generate()}
          value={productVersion}
          renderValue={(value) => value.fullName}
        >
          {productVersion.fullName}
        </MenuItem>
      ))}
    </Select>
  );
};
