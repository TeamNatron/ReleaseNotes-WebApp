import React, { useEffect } from "react";
import ReleaseView from "../releaseView/ReleaseView";
import PageContainer from "../shared/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { findReleaseById } from "../../selectors/releaseEditorSelector";
import { fetchReleaseById } from "../../slices/releaseSlice";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";

const ReleaseScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    if (id) dispatch(fetchReleaseById(id));
  }, [id, dispatch]);

  const release = useSelector(findReleaseById(id));
  const productVersion =
    release?.productVersion.product.name +
    " " +
    release?.productVersion.version;

  const title = "Revisjonsnytt " + productVersion;
  const ingress =
    "Her finner du informasjon om de vikstigste endringene/korreksjonene i " +
    productVersion +
    ".";
  return (
    <PageContainer>
      <ScreenTitle>{release ? title : ""}</ScreenTitle>
      <Ingress>{release ? ingress : ""}</Ingress>
      <SpacedDivider></SpacedDivider>
      <ReleaseView release={release} />
    </PageContainer>
  );
};

export default ReleaseScreen;
