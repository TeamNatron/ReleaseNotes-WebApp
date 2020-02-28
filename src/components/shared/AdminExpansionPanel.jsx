import React from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  ExpansionPanelSummary,
  ExpansionPanel,
  DialogContent,
  Modal,
  Fade,
  Typography,
  Button,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { Edit } from "@material-ui/icons";

const AdminExpansionPanel = props => {
  const [open, setOpen] = React.useState();
  const [modalContent, setModalContent] = React.useState();

  const columns = [
    { id: "avatar", label: "", maxWidth: 20 },
    { id: "name", label: "Name", minWidth: 100 },
    props.editContentComponent
      ? {
          id: "button",
          label: "",
          minWidth: 170,
          align: "right",
          format: value => value.toFixed(2)
        }
      : {}
  ];
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <DialogContent>{modalContent}</DialogContent>
        </Fade>
      </Modal>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.label}</Typography>
        </ExpansionPanelSummary>
        <TablePanel>
          <AddButton
            onClick={() => {
              setModalContent(props.createContentComponent);
              setOpen(true);
            }}
            color="primary"
            variant="contained"
          >
            Legg til
          </AddButton>
        </TablePanel>
        {props.rows && props.rows.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rows.map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map(column => {
                        if (column.id === "avatar") {
                          return (
                            <StyledTableCell>
                              {props.icon ? (
                                React.cloneElement(props.icon, {
                                  color: "disabled",
                                  fontSize: "medium"
                                })
                              ) : (
                                <React.Fragment />
                              )}
                            </StyledTableCell>
                          );
                        } else if (column.id === "button") {
                          return props.editContentComponent ? (
                            <StyledTableCell>
                              <IconButton
                                onClick={() => {
                                  setModalContent(props.editContentComponent);
                                  setOpen(true);
                                }}
                              >
                                <EditButton fontSize="small" />
                              </IconButton>
                            </StyledTableCell>
                          ) : (
                            <React.Fragment />
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
        ) : (
          <ErrorLabel>Ingen innhold funnet</ErrorLabel>
        )}
      </ExpansionPanel>
    </React.Fragment>
  );
};

export default AdminExpansionPanel;

AdminExpansionPanel.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.array,
  icon: PropTypes.element,
  createContentComponent: PropTypes.element,
  editContentComponent: PropTypes.element
};

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

const EditButton = styled(Edit)`
  margin-left: auto;
`;

const ErrorLabel = styled.div`
  text-align: center;
  margin: 16px;
`;
