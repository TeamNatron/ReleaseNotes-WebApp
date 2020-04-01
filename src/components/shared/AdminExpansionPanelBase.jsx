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
import { Edit, Add } from "@material-ui/icons";
import DeleteDialogButton from "./DeleteDialogButton";

const AdminExpansionPanelBase = props => {
  const [expanded, setExpanded] = React.useState(false);
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
  if (props.import) {
    columns.push({
      id: "importButton",
      label: "Import",
      minWidth: 77,
      align: "center",
      format: value => value.toFixed(2)
    });
  }

  const createRow = row => {
    return (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
        {columns.map(column => {
          if (column.id === "avatar") {
            return (
              <StyledTableCell key={column.id}>
                {props.icon ? (
                  React.cloneElement(props.icon, {
                    color: "disabled",
                    fontSize: "small"
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
                  onChange={() => {
                    row.isPublic = !row.isPublic;
                    return props.onAction(actions.UPDATE, { ...row });
                  }}
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
                    onConfirm={() => props.onAction(actions.DELETE, { ...row })}
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
                    onClick={() => props.onAction(actions.EDIT, { ...row })}
                  >
                    <EditButton fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              )
            );
          } else if (column.id === "importButton") {
            return (
              <StyledTableCell label={column.label} key={column.id}>
                <IconButton
                  onClick={() => props.onAction(actions.IMPORT, { ...row })}
                >
                  <Add fontSize="small" />
                </IconButton>
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
  };

  return (
    <React.Fragment>
      <ExpansionPanel
        defaultExpanded={props.defaultExpanded}
        expanded={expanded}
        onChange={ev => setExpanded(!expanded)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.label}</Typography>
        </ExpansionPanelSummary>
        <TablePanel>
          {props.summaryComponent ? (
            React.cloneElement(props.summaryComponent, {
              style: { border: "1px solid red" }
            })
          ) : (
            <React.Fragment />
          )}
          {props.createContentComponent ? (
            <AddButton
              onClick={() => props.onAction(actions.CREATE)}
              color="primary"
              variant="contained"
            >
              Legg til
            </AddButton>
          ) : (
            <React.Fragment />
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
                  return createRow(row);
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

/**
 * @enum {string}
 */
export const actions = {
  EDIT: "EDIT",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  IMPORT: "IMPORT"
};

export const basePropTypes = {
  label: PropTypes.string,
  /**
   * Row data used to render each row
   * @typedef {Object} row
   * @property {string} name
   * @property {number} id
   *
   * @param {row}
   */
  rows: PropTypes.array.isRequired,
  icon: PropTypes.element,

  /**
   * Returns the action performed as a string
   * @param {actions} action
   * @param {Object} {id, rowData, value}
   */
  onAction: PropTypes.func,

  defaultExpanded: PropTypes.bool
};
AdminExpansionPanelBase.propTypes = basePropTypes;

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
