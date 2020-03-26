import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl
} from "@material-ui/core";
import { DomainPropTypes } from "@material-ui/pickers/constants/prop-types";
import styled from "styled-components";

const ProjectSelector = props => {
  const { projects } = props;
  const [selected, setSelected] = useState("");

  const handleChange = event => {
    setSelected(event.target.value);
  };

  return (
    <StyledFormControl>
      <Select label="Project" value={selected} onChange={handleChange}>
        {projects.map(obj => (
          <MenuItem key={obj} value={obj}>
            {obj}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Velg et prosjekt</FormHelperText>
    </StyledFormControl>
  );
};

ProjectSelector.prototype = {
  projects: DomainPropTypes.array
};

export default ProjectSelector;

const StyledFormControl = styled(FormControl)`
  && {
    margin-left: 25px;
  }
`;
