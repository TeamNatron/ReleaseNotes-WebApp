import React, { useEffect } from "react";
import ReleaseView from "../releaseView/ReleaseView";
import PageContainer from "../shared/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { findReleaseById } from "../../selectors/releaseEditorSelector";
import { fetchReleaseById } from "../../slices/releaseSlice";

const ReleaseScreen = props => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    if (id) dispatch(fetchReleaseById(id));
  }, [id]);

  const release = useSelector(findReleaseById(id));

  return (
    <PageContainer>
      <ReleaseView release={release} />
    </PageContainer>
  );
};

export default ReleaseScreen;
