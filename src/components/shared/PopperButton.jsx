import React from "react";
import { Button, Paper, Box, Popover } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

/**
 *
 * @param {*} props
 */
const PopperButton = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        endIcon={<ExpandMore />}
      >
        {props.label}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Paper>
          <Box p={2}>{props.children}</Box>
        </Paper>
      </Popover>
    </React.Fragment>
  );
};

export default PopperButton;
