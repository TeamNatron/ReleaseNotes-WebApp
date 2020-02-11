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
  Box
} from "@material-ui/core";
import styled from "styled-components";
import { LocalOffer, CalendarToday, FilterListOutlined } from "@material-ui/icons";
import Ingress from "../shared/Ingress";
import { fetchArticlesByProductId } from "../../actions/articleActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const ReleaseNotesScreen = (props) => {
  

  let query = useQuery();

  const dispatch = useDispatch();

  // https://blog.bitsrc.io/using-react-redux-hooks-97654aff01e4
  
  // Query trick https://reacttraining.com/react-router/web/example/query-parameters
  useEffect(() => {
    const productId = query.get("product")
    dispatch(fetchArticlesByProductId(productId));
  }, [dispatch]);
  const articles = useSelector(state => state.articles.items);



  return (
    <PageContainer>
      <ScreenTitle>Releases</ScreenTitle>
      <Ingress gutterBottom>Få med deg det aller siste</Ingress>
      <SpacedDivider></SpacedDivider>
      <NarrowContainer>
        <StyledToolbar component="div">
          <Toolbar>
            <Icon edge="start">
              <FilterListOutlined />
            </Icon>
            <Button disableElevation color="primary">
              Example filter button
            </Button>

            <Button disableElevation color="primary">
              Example filter button
            </Button>
          </Toolbar>
        </StyledToolbar>

        <StyledList>
          {articles.map(article => (
            <li>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h4">{article.title}</Typography>
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
                        {article.date}
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

export default ReleaseNotesScreen;
