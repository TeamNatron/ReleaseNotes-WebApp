import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import PageContainer from "../shared/PageContainer";
import {
  ExpansionPanelSummary,
  Typography,
  List,
  Container,
  ListItem
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import ScreenTitle from "../shared/ScreenTitle";
import Ingress from "../shared/Ingress";
import SpacedDivider from "../shared/SpacedDivider";
import PanelUser from "../adminpanel/PanelUser";
import PanelProduct from "../adminpanel/PanelProduct";
import {
  PermIdentity,
  DesktopWindows,
  Edit,
  LocalOffer
} from "@material-ui/icons";

class AdminScreen extends Component {
  createProducts = () => {
    let table = [];

    let children = [];
    //Inner loop to create children
    for (let j = 0; j < 5; j++) {
      children.push(
        <PanelListItem>
          <DesktopWindows color="disabled" fontSize="small" />
          <PanelProduct />
          <LocalOffer color="disabled" />
          <span>1.2.3</span>
          <EditButton fontSize="small" />
        </PanelListItem>
      );
    }

    // Create the parent and add the children
    table.push(<List>{children}</List>);

    return table;
  };

  createUsers = () => {
    let table = [];

    let children = [];
    //Inner loop to create children
    for (let j = 0; j < 5; j++) {
      children.push(
        <PanelListItem>
          <PermIdentity color="disabled" fontSize="small" />
          <PanelUser />
          <EditButton fontSize="small" />
        </PanelListItem>
      );
    }

    // Create the parent and add the children
    table.push(<List>{children}</List>);

    return table;
  };

  render() {
    return (
      <PageContainer>
        <ScreenTitle>ADMINPANEL</ScreenTitle>
        <Ingress gutterBottom>Behandle produkter og brukere.</Ingress>
        <SpacedDivider />
        <Container>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Produkter</Typography>
            </ExpansionPanelSummary>
            <List>{this.createProducts()}</List>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Brukere</Typography>
            </ExpansionPanelSummary>
            <List>{this.createUsers()}</List>
          </ExpansionPanel>
        </Container>
      </PageContainer>
    );
  }
}

export default AdminScreen;

const PanelListItem = styled(ListItem)`
  svg,
  div,
  span {
    margin-right: 12px;
  }
`;

const EditButton = styled(Edit)`
  margin-left: auto;
`;
