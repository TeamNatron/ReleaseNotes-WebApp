import React, { useEffect } from "react";
import PageContainer from "../shared/PageContainer";
import ScreenTitle from "../shared/ScreenTitle";
import {
  Button,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Icon,
  Container,
  Box,
  Menu,
  MenuItem
} from "@material-ui/core";
import styled from "styled-components";
import { LocalOffer, CalendarToday, Sort } from "@material-ui/icons";
import Ingress from "../shared/Ingress";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import articleParameters, { sortKeys } from "../../articleParameters";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/parser";
import { fetchReleases } from "../../slices/releaseSlice";

const ReleasesScreen = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let query = useQuery();
  const dispatch = useDispatch();
  const productId = query.get("product");

  // https://blog.bitsrc.io/using-react-redux-hooks-97654aff01e4
  // Query trick https://reacttraining.com/react-router/web/example/query-parameters
  useEffect(() => {
    dispatch(fetchReleases(articleParameters(productId)));
  }, [dispatch, productId]);

  function handleSortByNewest() {
    dispatch(fetchReleases(articleParameters(productId, sortKeys.NEWEST)));
    handleSortMenuClose();
  }

  function handleSortByOldest() {
    dispatch(fetchReleases(articleParameters(productId, sortKeys.OLDEST)));
    handleSortMenuClose();
  }

  const handleSortBtnClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const articles = useSelector(state => state.releases.items);

  return (
    <PageContainer>
      <ScreenTitle>Releases</ScreenTitle>
      <Ingress gutterBottom>Få med deg det aller siste</Ingress>
      <SpacedDivider></SpacedDivider>
      <NarrowContainer>
        <StyledToolbar component="div">
          <Toolbar>
            <Button
              disableElevation
              color="primary"
              onClick={handleSortBtnClick}
              startIcon={<Sort />}
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              Sorter etter
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleSortMenuClose}
            >
              <MenuItem onClick={handleSortByNewest}>Dato (Nyeste)</MenuItem>
              <MenuItem onClick={handleSortByOldest}>Dato (Eldste)</MenuItem>
            </Menu>
          </Toolbar>
        </StyledToolbar>
        <StyledList>
          {articles.map(article => (
            <li key={article.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <StyledLink to={"/release/" + article.id}>
                        {article.title}
                      </StyledLink>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        <StyledIcon>
                          <LocalOffer fontSize="small" />
                        </StyledIcon>
                        {article.version}
                        <Space />
                        <StyledIcon>
                          <CalendarToday fontSize="small" />
                        </StyledIcon>
                        {formatDate(article.date)}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="textPrimary">
                        {article.text}
                      </Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
              </ListItem>
              <Divider />
            </li>
          ))}
        </StyledList>
      </NarrowContainer>
    </PageContainer>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3f51b5;
  font-size: 1.5rem;
`;

const StyledIcon = styled(Icon)`
  margin-right: 4px;
`;

const StyledList = styled(List)`
  && {
    margin: auto;
    justify-self: center;
  }
`;

const NarrowContainer = styled(Container)`
  width: 700px;
  max-width: 700px;
`;

const Space = styled.span`
  margin: 0 10px;
`;

const SpacedDivider = styled(Divider)`
  && {
    margin: 32px 0;
  }
`;

const StyledToolbar = styled(Box)`
  && {
    padding: 4px 0;
    background-color: ${props => props.theme.sectionColorDark};
    border-radius: 6px;
  }
`;

export default ReleasesScreen;
