import React from "react";
import styled from "styled-components";
import ScreenTitle from "../shared/ScreenTitle";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";

const LandingScreen = props => {
  return (
    <React.Fragment>
      <PageContainer>
        <ScreenTitle>Produktoppdateringer</ScreenTitle>
        <Ingress>Velg produkt</Ingress>
        <ProductDisplay>{props.products}</ProductDisplay>
      </PageContainer>
    </React.Fragment>
  );
};

export default LandingScreen;

const ProductDisplay = styled.div`
    display: flex;
    flex-direction: row`;
