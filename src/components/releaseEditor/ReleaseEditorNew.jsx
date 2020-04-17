import PropTypes from "prop-types";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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

const columns = ["release", "releaseNotes"];
const ReleaseEditor = (props) => {
  const release = props.release;
  const [filterQuery, setFilterQuery] = useState("?");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(release?.isPublic || false);
  const [title, setTitle] = useState(release?.title || "");
  const [selectedPv, setSelectedPv] = useState("");

  const [allItems, setAllItems] = useState({
    release: {
      id: columns[0],
      name: "Release",
      list: props.release?.releaseNotes || [],
    },
    releaseNotes: {
      id: columns[1],
      name: "Release Notes",
      list: props.releaseNotesResource || [],
    },
  });

  // init loaded release
  useEffect(() => {
    setAllItems((oldAllItems) => {
      const newAll = {
        ...oldAllItems,
        release: {
          ...oldAllItems.release,
          list: props.release.releaseNotes || [],
        },
      };
      return newAll;
    });

    setTitle(props.release.title);
    setIsPublic(Boolean(props.release.isPublic));

    //this.validateTitle();
    //this.validateProductVersion();
  }, [props.release]);

  // init loaded releaseNotes
  useEffect(() => {
    setAllItems((oldAllItems) => {
      const newAllItems = {
        ...oldAllItems,
        releaseNotes: {
          ...oldAllItems.releaseNotes,
          list: props.releaseNotesResource || [],
        },
      };
      return newAllItems;
    });
  }, [props.releaseNotesResource]);

  // apply filter on filterQuery change
  const { onFilter } = props;
  useEffect(() => {
    onFilter(filterQuery);
  }, [filterQuery]);

  // init loaded productversion
  useEffect(() => {
    // need to find pv from this array, as mui-select component
    // relies on reference equality
    const itemToSelect = props.release.productVersion
      ? props.productVersionsResource.items.find(
          (item) => props.release.productVersion.id === item.id
        )
      : undefined;
    itemToSelect && setSelectedPv(itemToSelect);
  }, [props.release, props.productVersionsResource]);

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

  const moveWithinSameColumn = useCallback(
    (srcDroppableId, srcIndex, destIndex) => {
      let allItemsCopy = JSON.parse(JSON.stringify(allItems));

      let column = allItemsCopy[srcDroppableId].list;

      let item = column[srcIndex];

      column.splice(srcIndex, 1);
      column.splice(destIndex, 0, item);

      setAllItems(allItemsCopy);
      //validateReleaseNotes();
    },
    [allItems]
  );

  const moveToAnotherColumn = useCallback(
    (srcDroppableId, destDroppableId, srcIndex, destIndex) => {
      let allItemsCopy = JSON.parse(JSON.stringify(allItems));

      const srcColumn = allItemsCopy[srcDroppableId].list;
      const destColumn = allItemsCopy[destDroppableId].list;

      let item = srcColumn[srcIndex];

      srcColumn.splice(srcIndex, 1);
      destColumn.splice(destIndex, 0, item);

      setAllItems(allItemsCopy);
      //validateReleaseNotes();
    },
    [allItems]
  );

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

  const handleRemoveReleaseNote = useCallback(
    (srcIndex) => {
      moveToAnotherColumn("release", "releaseNotes", srcIndex, 0);
    },
    [moveToAnotherColumn]
  );

  const handleSave = () => {
    const release = {
      productVersionId: selectedPv.id,
      title: title,
      isPublic: isPublic,
      releaseNotesId: allItems.release.list.map((rn) => rn.id),
    };
    props.onSave(release);
  };

  const getCurrentReleaseState = useCallback(() => {
    if (props.release) {
      return {
        productVersion: props.productVersionsResource.items.find(
          (item) => item.id === selectedPv.id
        ),
        isPublic: isPublic,
        id: props.release.id,
        title: title,
        releaseNotes: allItems.release.list,
        date: Date.now(),
      };
    }
  }, [
    allItems.release.list,
    isPublic,
    props.productVersionsResource.items,
    props.release,
    selectedPv.id,
    title,
  ]);

  const handleSaveReleaseNote = useCallback(
    (releaseNoteId, releaseNote) => {
      // save editor state locally, then save release note
      const release = getCurrentReleaseState();
      props.onSaveEditorState(release);
      props.onSaveReleaseNote(releaseNoteId, releaseNote);
    },
    [props, getCurrentReleaseState]
  );

  const releaseNoteStyle = {
    minWidth: "20rem",
    flexBasis: "20%",
  };

  const handlePvChange = (ev) => {
    if (ev.target.value) {
      const itemToSelect = props.productVersionsResource.items.find(
        (item) => ev.target.value.id === item.id
      );
      if (itemToSelect) {
        setSelectedPv(itemToSelect);
      }
    }
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
            onClick={handleSave}
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
      <ToolbarBase
        left={
          <PVSelect
            items={props.productVersionsResource.items}
            onChange={handlePvChange}
            value={selectedPv}
          ></PVSelect>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <FlexContainer>
          <ReleaseContainer>
            <TitleTextField
              value={title}
              handleOnChangeTitle={handleOnChangeTitle}
              //error={titleIsError}
              //helperText={titleErrorMsg}
            />
            {useMemo(
              () => (
                <Column
                  isRelease={true}
                  key={allItems.release.id}
                  id={allItems.release.id}
                  title={allItems.release.name}
                  releaseNotes={allItems.release.list}
                  handleRemoveReleaseNote={handleRemoveReleaseNote}
                  onSaveReleaseNote={handleSaveReleaseNote}
                />
              ),
              [allItems.release, handleRemoveReleaseNote, handleSaveReleaseNote]
            )}
          </ReleaseContainer>

          <VerticalDivider orientation={"vertical"} />
          {useMemo(
            () => (
              <Column
                isRelease={false}
                styleSheet={releaseNoteStyle}
                key={allItems.releaseNotes.id}
                id={allItems.releaseNotes.id}
                title={allItems.releaseNotes.name}
                releaseNotes={allItems.releaseNotes.list}
                handleRemoveReleaseNote={handleRemoveReleaseNote}
                onSaveReleaseNote={handleSaveReleaseNote}
              />
            ),
            [allItems.releaseNotes, releaseNoteStyle]
          )}
        </FlexContainer>
      </DragDropContext>
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
  const [open, setOpen] = useState(false);
  return (
    <StyledFormControl
      error={
        ""
        //productVersionIsError
      }
    >
      <InputLabel id="product-version-error-label">Produkt</InputLabel>
      <Select
        labelId="product-version-error-label"
        id="product-version-error-label"
        value={props.value}
        onChange={props.onChange}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {props.items.map((productVersion) => (
          <MenuItem
            id={productVersion.id}
            key={shortid.generate()}
            value={productVersion}
          >
            {productVersion.fullName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {
          //productVersionErrorMsg
        }
      </FormHelperText>
    </StyledFormControl>
  );
};
