import React from "react";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import styled from "styled-components";

const GeneralSelector = props => {
  const { items, selected, handleChange, helperText, label } = props;

  return (
    <StyledFormControl>
      <Select label={label} value={selected} onChange={handleChange}>
        {items.map(obj => (
          <MenuItem key={obj} value={obj}>
            {obj}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </StyledFormControl>
  );
};

GeneralSelector.prototype = {
  items: PropTypes.array
};

export default GeneralSelector;

const StyledFormControl = styled(FormControl)`
  && {
    margin-left: 25px;
  }
`;
