import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@material-ui/pickers";
/**
 *
 */
const ControlledDatePicker = (props) => {
  return (
    <DatePicker
      disableToolbar
      variant="inline"
      format="LL"
      margin="normal"
      id="date-picker-inline"
      label={props.label}
      value={props.value}
      onChange={props.setValue}
    />
  );
};

export default ControlledDatePicker;

ControlledDatePicker.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  label: PropTypes.string,
};
