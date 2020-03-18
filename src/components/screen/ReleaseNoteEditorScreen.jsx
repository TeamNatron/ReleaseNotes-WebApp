import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../shared/PageContainer";
import {
  fetchReleaseNoteById,
  putReleaseNote,
  postReleaseNote
} from "../../slices/releaseNoteSlice";
import ReleaseNoteEditor from "../releaseNoteEditor/ReleaseNoteEditor";

const ReleaseNoteEditorScreen = props => {
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const note = useSelector(state =>
    state.releaseNotes.items.find(r => r.id == id)
  );

  useEffect(() => {
    if (!note) {
      dispatch(fetchReleaseNoteById(id));
    }
  }, [dispatch, note, id]);

  const handleSave = objectToSave => {
    // if screen has an id, a release is being updated
    // otherwise, a release is being created
    if (id) dispatch(putReleaseNote(id, objectToSave));
    else {
      dispatch(postReleaseNote(objectToSave));
      handleCancel()
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <PageContainer>
        <Box my={5}>
          <ReleaseNoteEditor
            note={note}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Box>
      </PageContainer>
    </React.Fragment>
  );
};

export default ReleaseNoteEditorScreen;
