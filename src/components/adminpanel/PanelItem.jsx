import React from "react";
import styled from "styled-components";

const PanelItem = props => {
  return (
    <PanelContainer id="panelItem">
      <span>{props.title}</span>
    </PanelContainer>
  );
};

export default PanelItem;

const PanelContainer = styled.div``;
