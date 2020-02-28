import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import ReleaseEditor from "../releaseEditor/ReleaseEditor";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { fetchAllReleaseNotes } from "../../actions/releaseNoteActions";

const ReleaseEditorScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("asdasdsadsadsad");
    //TODO: Uncomment when implemented
    dispatch(fetchAllReleaseNotes());
  }, [dispatch]);
  const handleSave = objectToSave => {
    //TODO: Uncomment when implemented
    //dispatch(createRelease(objectToSave));
  };
  const releaseNotesResource = useSelector(state => state.releaseNotes);
  const productVersionsResource = useSelector(state => state.productVersions);

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
        releaseNotesResource={releaseNotesResource}
        productVersionsResource={productVersionsResource}
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
