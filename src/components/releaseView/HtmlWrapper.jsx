import React from "react";
import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * Renders a html string in a Typography component
 * @param {*} props
 */
const HtmlWrapper = (props) => {
  return (
    <React.Fragment>
      {props.strip ? (
        <Typography variant={props.variant} component={props.component}>
          {stripText(props.html)}
        </Typography>
      ) : (
        <Typography
          gutterBottom={props.gutterBottom}
          variant={props.variant}
          dangerouslySetInnerHTML={{ __html: props.html }}
        ></Typography>
      )}
    </React.Fragment>
  );
};

export default HtmlWrapper;

HtmlWrapper.propTypes = {
  strip: PropTypes.bool,
};
const stripText = (text) => {
  if (!text) return null;
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};
