import React from "react";
import AddProductForm from "./AddProductForm";
import { Divider } from "@material-ui/core";
import SpacedDivider from "../shared/SpacedDivider";
import PropTypes from "prop-types";
const EditProductForm = () => {
  return (
    <React.Fragment>
      <AddProductForm>
        <SpacedDivider />
        <h3>Versjoner</h3>
      </AddProductForm>
    </React.Fragment>
  );
};

export default EditProductForm;

EditProductForm.propTypes = {
  id: PropTypes.number
};
