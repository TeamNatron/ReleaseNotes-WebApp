import React from "react";
import {
  Button,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import AdminTableRow from "./AdminTableRow";
import styled from "styled-components";
import { actions } from "./AdminExpansionPanelBase";
import PropTypes from "prop-types";

const AdminTableBase = (props) => {
  const columns = [
    { id: "avatar", label: "", maxWidth: 20 },
    { id: "name", label: "Name", minWidth: 100 },
  ];
  if (props.isPublic) {
    columns.push({
      id: "isPublicSwitch",
      label: "Publisert",
    });
  }
  if (props.edit) {
    columns.push({
      id: "button",
      label: "",
      minWidth: 77,
      align: "right",
      format: (value) => value.toFixed(2),
    });
  }
  if (props.delete) {
    columns.push({
      id: "deleteButton",
      label: "",
      minWidth: 77,
      align: "right",
      format: (value) => value.toFixed(2),
    });
  }
  if (props.import) {
    columns.push({
      id: "importButton",
      label: "Import",
      minWidth: 77,
      align: "center",
      format: (value) => value.toFixed(2),
    });
  }
  return (
    <React.Fragment>
      <TablePanel>
        {props.summaryComponent ? (
          React.cloneElement(props.summaryComponent, {})
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
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.map((row) => (
                <AdminTableRow
                  row={row}
                  columns={columns}
                  {...props}
                  key={row.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <ErrorLabel>Ingen innhold funnet</ErrorLabel>
      )}
    </React.Fragment>
  );
};

export default AdminTableBase;

export const basePropTypes = {
  /**
   * Row data used to render each row
   * @typedef {Object} row
   * @property {string} name
   * @property {number} id
   *
   * @param {row}
   */
  rows: PropTypes.array.isRequired,

  /**
   * Returns the action performed as a string
   * @param {actions} action
   * @param {Object} {id, rowData, value}
   */
  onAction: PropTypes.func,
  icon: PropTypes.element,
};
const AddButton = styled(Button)`
  && {
    align-self: end;
    margin-left: auto;
    margin-right: 2rem;
  }
`;

const TablePanel = styled.div`
  display: flex;
`;

const ErrorLabel = styled.div`
  text-align: center;
  margin: 16px;
`;
