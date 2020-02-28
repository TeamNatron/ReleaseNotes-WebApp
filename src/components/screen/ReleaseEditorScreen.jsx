import React, { useEffect } from "react";
import styled from "styled-components";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import ReleaseEditor from "./ReleaseEditor";
import { useSelector, useDispatch } from "react-redux";
//import { fetchReleaseNotes } from "../../actions/releaseNotesActions";

const ReleaseEditorScreen = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(fetchReleaseNotes());
  });
  const releaseNotes = useSelector(state => state.releaseNotes);

  return (
    <StyledPageContainer>
      <ScreenTitle>RELEASE REDIGERING</ScreenTitle>
      <Ingress gutterBottom>Redigering/Opprettelse av releases.</Ingress>
      <SpacedDivider />

      <ReleaseEditor releaseNotes={releaseNotes} />
    </StyledPageContainer>
  );
};

export default ReleaseEditorScreen;

const StyledPageContainer = styled(PageContainer)`
  && {
    margin-top: 8rem;
  }
`;
