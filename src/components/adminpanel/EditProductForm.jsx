import React, { useMemo } from "react";
import AddProductForm from "./AddProductForm";
import SpacedDivider from "../shared/SpacedDivider";
import PropTypes from "prop-types";
import AdminTableBase from "../shared/AdminTableBase";
import { createData } from "../shared/AdminTableRow";
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
      <AddProductForm>
        <SpacedDivider />
        <h3>Versjoner</h3>
        <AdminTableBase rows={versionRows} onAction={handleAction} />
      </AddProductForm>
    </React.Fragment>
  );
};

export default EditProductForm;

EditProductForm.propTypes = {
  id: PropTypes.number,
  value: PropTypes.object
};
