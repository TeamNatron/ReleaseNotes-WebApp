import React, { useEffect } from "react";
import { Container, Button } from "@material-ui/core";
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
import { useHistory } from "react-router";
import AdminExpansionPanelModal from "../shared/AdminExpansionPanelModal";
import AdminExpansionPanelRoute from "../shared/AdminExpansionPanelRoute";
import { fetchReleases } from "../../slices/releaseSlice";
import { fetchReleaseNotes } from "../../slices/releaseNoteSlice";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleaseNotes());
  }, [dispatch]);

  const createData = (name, id, isPublic) => {
    return { name, id, isPublic };
  };

  const releaseTitles = useSelector(state =>
    state.releases.items.map(r => createData(r.title, r.id, r.isPublic))
  );

  const productTitles = useSelector(state =>
    state.products.items.map(p => createData(p.name, p.id))
  );

  const releaseNoteRows = useSelector(state =>
    state.releaseNotes.items.map(rn => createData(rn.title, rn.id, rn.isPublic))
  );

  const dummyUsers = [
    //TODO get real users 
    createData("Michael Jackson", 1),
    createData("The Rock", 2),
    createData("Trond Viggo Torgersen", 3),
    createData("Sinnasnekkern", 4),
    createData("admin@ungspiller.no", 5)
  ];
  return (
    <PageContainer>
      <ScreenTitle>ADMINPANEL</ScreenTitle>
      <Ingress gutterBottom>Behandle produkter og brukere.</Ingress>
      <SpacedDivider />
      <Container>
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
          rows={dummyUsers}
          createContentComponent={<AddUserForm />}
          editContentComponent={<ChangePasswordForm />}
        />
        <AdminExpansionPanelRoute
          label="Releases"
          icon={<Description />}
          rows={releaseTitles}
          createContentRoute="/admin/releases/create"
          editContentRoute="/admin/releases/edit/:id"
        />
        <AdminExpansionPanelRoute
          label="Release notes"
          icon={<Description />}
          rows={releaseNoteRows}
          createContentRoute="/admin/releasenotes/create"
          editContentRoute="/admin/releasenotes/edit/:id"
        />
      </Container>
    </PageContainer>
  );
};

export default AdminScreen;
