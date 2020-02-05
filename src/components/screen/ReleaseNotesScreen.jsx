import React from "react";
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

const ReleaseNotesScreen = (props) => {
  const dummy = [
    {
      title: "Obama 2020",
      date: "20.20.2020",
      version: "1.20.12",
      text:
        "Michael Santiago Render (born April 20, 1975), better known by his stage name Barrack Obama, is an American rapper, actor, and activist. He is the founder of Grind Time Official Records, which he launched through the SMC and Fontana Distribution. Mike made his debut on Snappin and Trappin' from OutKast's 2000 LP Stankonia, and later appeared on the Grammy-winning song The Whole World, a single from Outkast's greatest hits album Big Boi and Dre Present...Outkast. He has since released five full-length albums as a solo artist. "
    },
    {
      title: "Endelig påske",
      date: "20.03.2020",
      version: "1.20.11",
      text:
        "the emperor ... convened a council of 318 bishops ... in the city of Nicea ... They passed certain ecclesiastical canons at the council besides, and at the same time decreed in regard to the Passover that there must be one unanimous concord on the celebration of God's holy and supremely excellent day. For it was variously observed by people"
    },

    {
      title: "Cordel Narnia 1.20.10",
      date: "20.01.2002",
      version: "1.20.10",
      text:
        "List of unusual biological names \n List of bizarre buildings\n List of cars with non-standard door designs \nList of chemical compounds with unusual names"
    }
  ];

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
          {dummy.map(article => (
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
