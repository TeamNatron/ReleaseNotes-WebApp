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
import { fetchUsers } from "../../slices/userSlice";

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
    dispatch(fetchReleases());
  }, []);

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

  const handleEditReleaseNotes = () => {
    history.push("/admin/releasenotes");
  };

  const dummyUsers = [
    createData("Michael Jackson", 1),
    createData("The Rock", 2),
    createData("Trond Viggo Torgersen", 3),
    createData("Sinnasnekkern", 4)
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
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditReleaseNotes}
        >
          Release Notes
        </Button>
      </Container>
    </PageContainer>
  );
};

export default AdminScreen;
