import React, { useEffect } from "react";
import { Tabs, Tab, Divider } from "@material-ui/core";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import { Link, useLocation, Switch, Route, Redirect } from "react-router-dom";
import AdminHomeView from "./AdminHomeView";
import AdminAzureView from "./AdminAzureView";
import styled from "styled-components";

const AdminScreen = () => {
  const location = useLocation();

  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>
        Her kan du gjøre administrative oppgaver for systemet.
      </Ingress>

      <TurboDivider />
      <StyledAppBar color="transparent" position="static">
        <Tabs
          value={location.pathname}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            component={Link}
            label="Release Note System"
            to="/admin/home"
            value="/admin/home"
          />
          <Tab
            component={Link}
            label="Azure DevOps"
            to="/admin/azure"
            value="/admin/azure"
          />
        </Tabs>
      </StyledAppBar>
      <Switch>
        <Route exact path="/admin/">
          <Redirect push to="/admin/home" />
        </Route>
        <Route path="/admin/home">
          <AdminHomeView />
        </Route>
        <Route path="/admin/azure">
          <AdminAzureView />
        </Route>
      </Switch>
    </PageContainer>
  );
};

export default AdminScreen;

const TurboDivider = styled(Divider)`
  && {
    margin-top: 32px;
    margin-bottom: 0;
  }
`;

const StyledAppBar = styled.div`
  && {
    border: 1px solid #80808047;
    z-index: 10;
    width: inherit;
    margin-bottom: 34px;
    background-color: white;
  }
`;
