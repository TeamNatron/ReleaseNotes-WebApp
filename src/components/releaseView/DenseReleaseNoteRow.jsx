import React from "react";
import HtmlWrapper from "./HtmlWrapper";
import { TableCell } from "@material-ui/core";

const DenseReleaseNoteRow = props => {
  return (
    <HtmlWrapper
      align="right"
      strip
      component={TableCell}
      html={props.note.description}
    />
  );
};

export default DenseReleaseNoteRow;
