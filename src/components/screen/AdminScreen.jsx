import React, { Component } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Container,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  DialogContent
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { PermIdentity, DesktopWindows, Edit } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import SpacedDivider from "../shared/SpacedDivider";
import AddUserForm from "../adminpanel/AddUserForm";
import AddProductForm from "../adminpanel/AddProductForm";
import AdminExpansionPanel from "../shared/AdminExpansionPanel";
import { useSelector } from "react-redux";

const AdminScreen = () => {

  const articleTitles = useSelector(state =>
    state.articles.items.map(a => a.title)
  );
  const productTitles = useSelector(state =>
    state.products.items.map(p => p.name)
  );

  const createData = name => {
    return { name };
  };

  const dummyUsers = [
    createData("Michael Jackson"),
    createData("The Rock"),
    createData("Trond Viggo Torgersen"),
    createData("Sinnasnekkern")
  ];

  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>Behandle produkter og brukere.</Ingress>
      <SpacedDivider />
      <Container>
        <AdminExpansionPanel
          label="Produkter"
          rows={productTitles}
          editContentComponent={<AddProductForm />}
        />
        <AdminExpansionPanel
          label="Brukere"
          rows={dummyUsers}
          editContentComponent={<AddUserForm />}
        />
        <AdminExpansionPanel
          label="Releases"
          //rows={articleTitles}
          //editContentComponent={AddReleaseForm}
        />
      </Container>
    </PageContainer>
  );
};

export default AdminScreen;

const EditButton = styled(Edit)`
  margin-left: auto;
`;

const AddButton = styled(Button)`
  && {
    align-self: end;
    margin-left: auto;
    margin-right: 2rem;
  }
`;

const StyledTableCell = styled(TableCell)`
  width: 0;
`;

const TablePanel = styled.div`
  display: flex;
`;
