import React from "react";
import HtmlWrapper from "./HtmlWrapper";
import { Box } from "@material-ui/core";
import ReleaseH2 from "../shared/ReleaseH2";

const FullReleaseNote = (props) => {
  return (
    <Box mb={1}>
      <HtmlWrapper
        gutterBottom={true}
        component={ReleaseH2}
        strip
        html={props.note.title}
      />
      <HtmlWrapper variant="subtitle1" strip html={props.note.ingress} />
      <HtmlWrapper variant="body1" html={props.note.description} />
    </Box>
  );
};

export default FullReleaseNote;
