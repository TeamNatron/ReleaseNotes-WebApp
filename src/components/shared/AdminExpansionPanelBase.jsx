import React from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanelSummary,
  ExpansionPanel,
  Typography,
  Button,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Switch
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styled from "styled-components";
import { Edit } from "@material-ui/icons";
import DeleteDialogButton from "./DeleteDialogButton";

const AdminExpansionPanelBase = props => {
  const columns = [
    { id: "avatar", label: "", maxWidth: 20 },
    { id: "name", label: "Name", minWidth: 100 }
  ];
  if (props.isPublic) {
    columns.push({
      id: "isPublicSwitch",
      label: "Publisert"
    });
  }
  if (props.edit) {
    columns.push({
      id: "button",
      label: "",
      minWidth: 77,
      align: "right",
      format: value => value.toFixed(2)
    });
  }
  if (props.delete) {
    columns.push({
      id: "deleteButton",
      label: "",
      minWidth: 77,
      align: "right",
      format: value => value.toFixed(2)
    });
  }

  return (
    <React.Fragment>
      <ExpansionPanel defaultExpanded={props.expanded ? true : false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.label}</Typography>
        </ExpansionPanelSummary>
        <TablePanel>
          {props.createContentComponent ? (
            <AddButton
              onClick={() => props.onAction("CREATE")}
              color="primary"
              variant="contained"
            >
              Legg til
            </AddButton>
          ) : (
            React.Fragment
          )}
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
                            <StyledTableCell key={column.id}>
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
                        } else if (column.id === "isPublicSwitch") {
                          return (
                            <StyledTableCell key={column.id}>
                              <Switch
                                color="primary"
                                value={row.isPublic}
                                checked={row.isPublic}
                                onChange={() =>
                                  props.onAction(
                                    "UPDATE",
                                    row.id,
                                    !row.isPublic
                                  )
                                }
                                inputProps={{
                                  "aria-label": "primary checkbox"
                                }}
                              />
                            </StyledTableCell>
                          );
                        } else if (column.id === "deleteButton") {
                          return (
                            props.edit && (
                              <StyledTableCell key={column.id}>
                                <DeleteDialogButton
                                  onConfirm={() =>
                                    props.onAction("DELETE", row.id)
                                  }
                                  entityName={row.name}
                                />
                              </StyledTableCell>
                            )
                          );
                        } else if (column.id === "button") {
                          return (
                            props.edit && (
                              <StyledTableCell key={column.id}>
                                <IconButton
                                  onClick={() => props.onAction("EDIT", row.id)}
                                >
                                  <EditButton fontSize="small" />
                                </IconButton>
                              </StyledTableCell>
                            )
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

export default AdminExpansionPanelBase;

AdminExpansionPanelBase.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.array,
  icon: PropTypes.element,
  onAction: PropTypes.func,
  expanded: PropTypes.bool
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
