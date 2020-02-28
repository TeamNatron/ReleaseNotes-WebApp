import React, { useEffect, useState } from "react";
import EditReleaseNoteForm from "../ReleaseNoteEditor/EditReleaseNoteForm";
import { Box, LinearProgress, Zoom } from "@material-ui/core";
import { useHistory } from "react-router";
import {
  putReleaseNote,
  fetchReleaseNote
} from "../../actions/releaseNoteActions";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../shared/PageContainer";

const EditReleaseNoteScreen = props => {
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  const note = useSelector(state =>
    state.releaseNotes.items.find(r => r.item.id == id)
  );

  useEffect(() => {
    if (!note) {
      dispatch(fetchReleaseNote(id));
    }
  }, []);

  const handleSave = objectToSave => {
    dispatch(putReleaseNote(id, objectToSave));
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <React.Fragment>
      <PageContainer>
        <Box my={5}>
          <EditReleaseNoteForm
            note={note}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Box>
      </PageContainer>
    </React.Fragment>
  );
};

export default EditReleaseNoteScreen;
