import React, { useEffect } from "react";
import {
  Container,
  Tabs,
  Tab,
  AppBar,
  Typography,
  Divider
} from "@material-ui/core";
import { PermIdentity, DesktopWindows, Description } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import SpacedDivider from "../shared/SpacedDivider";
import AddUserForm from "../adminpanel/AddUserForm";
import AddProductForm from "../adminpanel/AddProductForm";
import ChangePasswordForm from "../adminpanel/ChangePasswordForm";
import AdminExpansionPanel from "../shared/AdminExpansionPanelModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import AdminExpansionPanelModal from "../shared/AdminExpansionPanelModal";
import AdminExpansionPanelRoute from "../shared/AdminExpansionPanelRoute";
import {
  fetchReleases,
  putReleaseById,
  deleteRelease
} from "../../slices/releaseSlice";
import { fetchUsers } from "../../slices/userSlice";
import {
  fetchReleaseNotes,
  putReleaseNote,
  deleteReleaseNote
} from "../../slices/releaseNoteSlice";
import { useState } from "react";
import styled from "styled-components";
import AzureDevopsView from "../adminpanel/AzureDevopsView";

const AdminScreen = () => {
  const RELEASE_NOTE_SYSTEM = 0;
  const AZURE_DEVOPS = 1;
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleaseNotes());
  }, [dispatch]);

  useEffect(() => dispatch(fetchUsers()), [dispatch]);
  const createData = (name, id, isPublic) => {
    return { name, id, isPublic };
  };

  const releaseTitles = useSelector(state =>
    state.releases.items.map(r => createData(r.title, r.id, r.isPublic))
  );

  const productTitles = useSelector(state =>
    state.products.items.map(p => createData(p.name, p.id))
  );

  const userRows = useSelector(state =>
    state.users.items.map(u => createData(u.email, u.id))
  );

  const releaseNoteRows = useSelector(state =>
    state.releaseNotes.items.map(r => {
      return createData(
        r.title === "" ? "Release note #" + r.id : r.title,
        r.id,
        r.isPublic
      );
    })
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  };

  const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Container>{children}</Container>}
      </Typography>
    );
  };

  const ingressText = () => {
    switch (value) {
      case RELEASE_NOTE_SYSTEM:
        return "Behandle produkter og brukere.";

      case AZURE_DEVOPS:
        return "Importer det du vil, når du vil";
    }
  };

  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>
        Her kan du gjøre administrative oppgaver for systemet.
      </Ingress>

      <TurboDivider />
      <StyledAppBar color="transparent" position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Release Notes System" {...a11yProps(0)} />
          <Tab label="Azure Devops" {...a11yProps(1)} />
        </Tabs>
      </StyledAppBar>

      <TabPanel value={value} index={0}>
        <AdminExpansionPanel
          label="Produkter"
          icon={<DesktopWindows />}
          rows={productTitles}
          createContentComponent={<AddProductForm />}
          //editContentComponent={<AddProductForm />}
        />
        <AdminExpansionPanelModal
          label="Brukere"
          icon={<PermIdentity />}
          rows={userRows}
          createContentComponent={<AddUserForm />}
          editContentComponent={<ChangePasswordForm />}
        />
        <AdminExpansionPanelRoute
          label="Releases"
          icon={<Description />}
          rows={releaseTitles}
          createContentRoute="/admin/releases/create"
          editContentRoute="/admin/releases/edit/:id"
          onUpdate={putReleaseById}
          onDelete={deleteRelease}
        />
        <AdminExpansionPanelRoute
          label="Release notes"
          icon={<Description />}
          rows={releaseNoteRows}
          createContentRoute="/admin/releasenotes/create"
          editContentRoute="/admin/releasenotes/edit/:id"
          onUpdate={putReleaseNote}
          onDelete={deleteReleaseNote}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AzureDevopsView></AzureDevopsView>
      </TabPanel>
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
