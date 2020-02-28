import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import ReleaseEditor from "../releaseEditor/ReleaseEditor";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const ReleaseEditorScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //TODO: Uncomment when implemented
    //dispatch(fetchReleaseNotes());
  });
  const handleSave = objectToSave => {
    //TODO: Uncomment when implemented
    //dispatch(createRelease(objectToSave))
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
