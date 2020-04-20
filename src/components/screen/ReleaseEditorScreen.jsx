import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import ReleaseEditor from "../releaseEditor/ReleaseEditor";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchProductVersions } from "../../actions/productVersionsActions";
import {
  fetchReleaseById,
  putReleaseById,
  postRelease,
  putByIdSuccess,
} from "../../slices/releaseSlice";
import { loadingSelector } from "../../slices/loadingSlice";
import {
  fetchReleaseNotes,
  putReleaseNote,
} from "../../slices/releaseNoteSlice";
import {
  initReleaseEditorReleaseNotes,
  findReleaseById,
} from "../../selectors/releaseEditorSelector";

const ReleaseEditorScreen = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReleaseNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductVersions());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchReleaseById(id));
  }, [dispatch, id]);

  const handleSave = (objectToSave) => {
    // if screen has an id, a release is being updated
    // otherwise, a release is being created
    console.log(objectToSave);
    if (id) {
      dispatch(putReleaseById(id, objectToSave));
    } else {
      dispatch(postRelease(objectToSave));
    }
  };

  const handleSaveReleaseNote = useCallback(
    (id, objectToSave) => {
      dispatch(putReleaseNote(id, objectToSave));
    },
    [dispatch]
  );

  const handleSaveEditorState = useCallback(
    (release) => {
      dispatch(putByIdSuccess({ data: release, id }));
    },
    [dispatch, id]
  );

  const handleFilter = (query) => {
    dispatch(fetchReleaseNotes(query));
  };

  const productVersionsResource = useSelector((state) => state.productVersions);
  const releaseNotes = useSelector(initReleaseEditorReleaseNotes(id));
  const loadedRelease = useSelector(findReleaseById(id));
  const loading = useSelector(loadingSelector);

  const history = useHistory();
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <StyledPageContainer>
      <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
      <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
      <SpacedDivider />

      <ReleaseEditor
        releaseNotesResource={releaseNotes}
        productVersionsResource={productVersionsResource}
        release={loadedRelease}
        onCancel={handleCancel}
        onSave={handleSave}
        onFilter={handleFilter}
        onSaveEditorState={handleSaveEditorState}
        onSaveReleaseNote={handleSaveReleaseNote}
        loading={loading}
      />
    </StyledPageContainer>
  );
};

export default ReleaseEditorScreen;

const StyledPageContainer = styled(PageContainer)`
  && {
    margin-top: 8rem;
  }
`;
