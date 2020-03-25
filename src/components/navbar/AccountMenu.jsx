import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Popper,
  Link,
  ClickAwayListener,
  Paper,
  Button
} from "@material-ui/core";
import styled from "styled-components";

const AccountMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { handleLogout } = props;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Link onClick={handleClick}>
      <StyledAccountCircle fontSize="large" />
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClick}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <MenuContainer>
            <StyledButton onClick={handleLogout} variant="outlined">
              Logg ut
            </StyledButton>
          </MenuContainer>
        </ClickAwayListener>
      </StyledPopper>
    </Link>
  );
};

export default AccountMenu;

const StyledAccountCircle = styled(AccountCircle)`
  :hover {
    fill: ${props => props.theme.secondaryColor};
  }
  color: white;
  cursor: pointer;
  font-size: 2rem;
`;

const MenuContainer = styled(Paper)`
  padding: 1rem;
  min-height: 7rem;
  display: grid;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
`;

const StyledPopper = styled(Popper)`
  z-index: 9999;
`;
