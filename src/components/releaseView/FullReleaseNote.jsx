import React from "react";
import HtmlWrapper from "./HtmlWrapper";
import { Typography, Box } from "@material-ui/core";

const FullReleaseNote = props => {
  return (
    <Box mb={1}>
      <HtmlWrapper gutterBottom={true} variant="h4" strip html={props.note.title} />
      <HtmlWrapper variant="subtitle2" strip html={props.note.ingress} />
      <HtmlWrapper variant="body1" html={props.note.description} />
    </Box>
  );
};

export default FullReleaseNote;

