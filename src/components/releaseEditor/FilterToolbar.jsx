import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import PopperButton from "../shared/PopperButton";
import DateRangePicker from "../shared/DateRangePicker";
import ToolbarBase from "../shared/ToolbarBase";
import PropTypes from "prop-types";

const FilterToolbar = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  return (
    <StyledBox my={3} px={2}>
      <ToolbarBase
        right={
          <PopperButton label="Dato">
            <DateRangePicker
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              {...props}
            />
          </PopperButton>
        }
      ></ToolbarBase>
    </StyledBox>
  );
};

export default FilterToolbar;

FilterToolbar.propTypes = {
  onChange: PropTypes.func,
};

const StyledBox = styled(Box)`
  background-color: #f0f0f0;
  border-radius: 6px;
`;
