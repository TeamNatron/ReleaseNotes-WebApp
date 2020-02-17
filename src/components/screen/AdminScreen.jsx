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
      ]
    };
  }

  createData = (name, code, population, size) => {
    const density = population / size;
    return { name, code, population, size, density };
  };

  handleClose = () => {
    const newValue = false;
    this.setState({ open: newValue });
  };

  handleOpen = () => {
    const newValue = true;
    this.setState({ open: newValue });
  };

  render() {
    return (
      <PageContainer>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}>
            <DialogContent>
              <AddUserForm />
            </DialogContent>
          </Fade>
        </Modal>

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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.state.productColumns.map(column => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.productRows.map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {this.state.productColumns.map(column => {
                          if (column.id === "avatar") {
                            return (
                              <StyledTableCell>
                                <DesktopWindows
                                  color="disabled"
                                  fontSize="small"
                                />
                              </StyledTableCell>
                            );
                          } else if (column.id === "button") {
                            return (
                              <StyledTableCell>
                                <EditButton fontSize="small" />
                              </StyledTableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Brukere</Typography>
            </ExpansionPanelSummary>
            <TablePanel>
              <AddButton
                onClick={this.handleOpen}
                color="primary"
                variant="contained"
              >
                Legg til
              </AddButton>
            </TablePanel>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {this.state.userColumns.map(column => (
                      <TableCell key={column.id} align={column.align}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.userRows.map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {this.state.userColumns.map(column => {
                          if (column.id === "avatar") {
                            return (
                              <StyledTableCell>
                                <PermIdentity
                                  color="disabled"
                                  fontSize="small"
                                />
                              </StyledTableCell>
                            );
                          } else if (column.id === "button") {
                            return (
                              <StyledTableCell>
                                <EditButton fontSize="small" />
                              </StyledTableCell>
                            );
                          } else {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </ExpansionPanel>
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
