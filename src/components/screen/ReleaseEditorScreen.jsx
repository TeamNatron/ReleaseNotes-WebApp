import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import ReleaseEditor from "../releaseEditor/ReleaseEditor";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchProductVersions } from "../../actions/productVersionsActions";
import { saveRelease, createRelease, updateRelease } from "../../actions/articleActions";
import { fetchAllReleaseNotes } from "../../actions/releaseNoteActions";

const ReleaseEditorScreen = props => {
  const id = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: Uncomment when implemented
    dispatch(fetchAllReleaseNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductVersions());
  }, [dispatch]);

  const handleSave = objectToSave => {
    // if screen has an id, a release is being updated 
    // otherwise, a release is being created
    if(id) {
      dispatch(updateRelease(objectToSave, id));
    } else {
      dispatch(createRelease(objectToSave));
    }
  };
  const releaseNotesResource = useSelector(state => state.releaseNotes);
  const productVersionsResource = useSelector(state => state.productVersions);
  const history = useHistory();

  const loadedContent = useSelector(state => state.articles.items.find(a => a.id == id))

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <StyledPageContainer>
      <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
      <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
      <SpacedDivider />

      <ReleaseEditor
        releaseNotesResource={releaseNotesResource}
        productVersionsResource={productVersionsResource}
        release={loadedContent}
        onCancel={handleCancel}
        onSave={handleSave}
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
