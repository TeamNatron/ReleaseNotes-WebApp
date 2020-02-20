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

class AdminScreen extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      productColumns: [
        { id: "avatar", label: "", maxWidth: 20 },
        { id: "name", label: "Name", minWidth: 100 },
        {
          id: "button",
          label: "",
          minWidth: 170,
          align: "right",
          format: value => value.toFixed(2)
        }
      ],
      userColumns: [
        { id: "avatar", label: "", maxWidth: 20 },
        { id: "name", label: "Name", minWidth: 100 },
        {
          id: "button",
          label: "",
          minWidth: 170,
          align: "right",
          format: value => value.toFixed(2)
        }
      ],

      productRows: [
        this.createData("Cordel INNE"),
        this.createData("Cordel UTE"),
        this.createData("Cordel HER"),
        this.createData("Cordel DER")
      ],
      userRows: [
        this.createData("Michael Jackson"),
        this.createData("The Rock"),
        this.createData("Trond Viggo Torgersen"),
        this.createData("Sinnasnekkern")
      ],
      formToRender: <div />
    };
  }

  createData = name => {
    return { name };
  };

  handleClose = () => {
    const newValue = false;
    this.setState({ open: newValue });
  };

  handleOpenUserForm = () => {
    const newValue = true;
    this.setState({ open: newValue, formToRender: <AddUserForm /> }, () => {});
  };

  handleOpenProductForm = () => {
    const newValue = true;
    this.setState(
      { open: newValue, formToRender: <AddProductForm /> },
      () => {}
    );
  };

  render() {
    return (
      <PageContainer>
        <ScreenTitle>ADMINPANEL</ScreenTitle>
        <Ingress gutterBottom>Behandle produkter og brukere.</Ingress>
        <SpacedDivider />
        <Container>
          <AdminExpansionPanel
            label="Produkter"
            rows={this.state.productRows}
            editContentComponent={<AddProductForm />}
          />
          <AdminExpansionPanel
            label="Brukere"
            rows={this.state.userRows}
            editContentComponent={<AddUserForm />}
          />
          <AdminExpansionPanel
            label="Releases"
            rows={this.state.productRows}
            //editContentComponent={AddReleaseForm}
          />
        </Container>
      </PageContainer>
    );
  }
}
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
