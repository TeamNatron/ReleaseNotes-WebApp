import React, { useMemo } from "react";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/nb";
import ControlledDatePicker from "./ControlledDatePicker";
import styled from "styled-components";
import PropTypes from "prop-types";
moment.locale("nb");

const DateRangePicker = props => {
  const { onChange, startDate, endDate, setStartDate, setEndDate } = props;
  useMemo(() => {
    onChange({
      startDate: startDate?.toJSON(),
      endDate: endDate?.toJSON()
    });
  }, [startDate, endDate, onChange]);

  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      libInstance={moment}
      locale="nb"
    >
      <FlexBox>
        <ControlledDatePicker
          label="Fra"
          value={startDate}
          setValue={setStartDate}
        />
        <ControlledDatePicker
          label="Til"
          value={endDate}
          setValue={setEndDate}
        />
      </FlexBox>
    </MuiPickersUtilsProvider>
  );
};

export default DateRangePicker;

DateRangePicker.propTypes = {
  onChange: PropTypes.func
};

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;
