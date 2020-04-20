import React from "react";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import styled from "styled-components";

/**
 *
 * @param {*} props.items Must be an array with objects containing id and value or be a single fielded
 */
const GeneralSelector = (props) => {
  const { items, selected, handleChange, helperText, label, ml } = props;

  return (
    <StyledFormControl
      adornedStartfalse
      color="primary"
      disabledfalse
      errorfalse
      filledtrue
      focusedfalse
      fullWidthfalse
      hiddenLabelfalse
      margin="none"
      requiredfalse
      variant="standard"
      ml={ml ? ml : 0}
    >
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
      <Select label={label} value={selected} onChange={handleChange}>
        {items.map((obj) => (
          <MenuItem key={typeof obj === "string" ? obj : obj.id} value={obj}>
            {typeof obj === "string" ? obj : obj.value}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

GeneralSelector.prototype = {
  items: PropTypes.array,
  ml: PropTypes.string,
};

export default GeneralSelector;

const StyledFormControl = styled(FormControl)`
  && {
    margin-left: ${(props) => (props.ml ? props.ml : 0)}px;
  }
`;
