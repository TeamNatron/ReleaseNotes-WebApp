import React from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanelSummary,
  ExpansionPanel,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdminTableBase, { basePropTypes } from "./AdminTableBase";

const AdminExpansionPanelBase = props => {
  return (
    <ExpansionPanel defaultExpanded={props.defaultExpanded}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{props.label}</Typography>
      </ExpansionPanelSummary>
      <AdminTableBase {...props} />
    </ExpansionPanel>
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
AdminExpansionPanelBase.propTypes = {
  ...basePropTypes,
  label: PropTypes.string,
  defaultExpanded: PropTypes.bool
};
