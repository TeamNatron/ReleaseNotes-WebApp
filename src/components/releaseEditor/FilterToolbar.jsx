import React from "react";
import styled from "styled-components";
import { Box, IconButton, Button } from "@material-ui/core";
import PopperButton from "../shared/PopperButton";
import DateRangePicker from "../shared/DateRangePicker";
import ToolbarBase from "../shared/ToolbarBase";
import { FilterListRounded, ExpandMore } from "@material-ui/icons";
import PropTypes from "prop-types";

const FilterToolbar = props => {
  return (
    <StyledBox my={3} px={2}>
      <ToolbarBase
        right={
          <PopperButton label="Dato" >
            <DateRangePicker {...props} />
          </PopperButton>
        }
      ></ToolbarBase>
    </StyledBox>
  );
};

export default FilterToolbar;

FilterToolbar.propTypes = {
  onChange: PropTypes.func
};

const StyledBox = styled(Box)`
  background-color: #f0f0f0;
  border-radius: 6px;
`;
