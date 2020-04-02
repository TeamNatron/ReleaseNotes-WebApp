import React, { useMemo } from "react";
import AddProductForm from "./AddProductForm";
import SpacedDivider from "../shared/SpacedDivider";
import PropTypes from "prop-types";
import AdminTableBase from "../shared/AdminTableBase";
import { createData } from "../shared/AdminTableRow";
import { Box, Paper } from "@material-ui/core";
const EditProductForm = props => {
  const versionRows = useMemo(
    () =>
      props.value.versions.map(version => {
        return createData(
          version,
          version.fullName,
          version.id,
          version.isPublic
        );
      }),
    [props]
  );

  const handleAction = (action, rowData) => {};
  return (
    <React.Fragment>
      <Paper>
        <Box px={5} py={3}>
          <h2>{props.value.name}</h2>
          <h3>Versjoner</h3>
          <AdminTableBase rows={versionRows} onAction={handleAction} />
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default EditProductForm;

EditProductForm.propTypes = {
  id: PropTypes.number,
  value: PropTypes.object
};
