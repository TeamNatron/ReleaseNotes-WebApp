import React from "react";
import styled from "styled-components";
import { TableCell, TableRow, IconButton, Switch } from "@material-ui/core";
import { Edit, Add } from "@material-ui/icons";
import DeleteDialogButton from "./DeleteDialogButton";
import { actions } from "./AdminExpansionPanelBase";
const AdminTableRow = (props) => {
  const { row, columns } = props;

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
      {columns.map((column) => {
        if (column.id === "avatar") {
          return (
            <StyledTableCell key={column.id}>
              {props.icon ? (
                React.cloneElement(props.icon, {
                  color: "disabled",
                  fontSize: "small",
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
                  "aria-label": "primary checkbox",
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
                  id={row.id}
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

export default AdminTableRow;

export const createData = (data, name, id, isPublic) => {
  return { data, name, id, isPublic };
};

const StyledTableCell = styled(TableCell)`
  width: 0;
`;

const EditButton = styled(Edit)`
  margin-left: auto;
`;
