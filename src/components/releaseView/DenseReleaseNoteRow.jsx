import React from "react";
import HtmlWrapper from "./HtmlWrapper";
import { TableCell } from "@material-ui/core";
import styled from "styled-components";

const DenseReleaseNoteRow = props => {
  return (
    <HtmlWrapper
      align="right"
      strip
      component={StyledTableCell}
      variant="body1"
      html={props.note.description}
    />
  );
};

export default DenseReleaseNoteRow;

const StyledTableCell = styled(TableCell)`
  && {
    font-size: 1rem;
  }
`;
