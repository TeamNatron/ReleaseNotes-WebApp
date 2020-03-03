import React, { useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { PermIdentity, DesktopWindows, Description } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import SpacedDivider from "../shared/SpacedDivider";
import AddUserForm from "../adminpanel/AddUserForm";
import AddProductForm from "../adminpanel/AddProductForm";
import AdminExpansionPanel from "../shared/AdminExpansionPanelModal";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { fetchArticles } from "../../actions/articleActions";
import { useHistory } from "react-router";
import ReleaseEditorScreen from "./ReleaseEditorScreen";
import AdminExpansionPanelModal from "../shared/AdminExpansionPanelModal";
import AdminExpansionPanelBase from "../shared/AdminExpansionPanelBase";
import AdminExpansionPanelRoute from "../shared/AdminExpansionPanelRoute";
import { fetchReleases } from "../../slices/releaseSlice";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  useEffect(() => {
    dispatch(fetchReleases());
  }, []);

  const createData = (name, id, isPublic) => {
    return { name, id, isPublic };
  };

  const releaseTitles = useSelector(state =>
    state.articles.items.map(a => createData(a.title, a.id, a.release.isPublic))
  );

  const productTitles = useSelector(state =>
    state.products.items.map(p => createData(p.name, p.id))
  );

  const handleEditReleaseNotes = () => {
    history.push("/admin/releasenotes");
  };

  const dummyUsers = [
    createData("Michael Jackson"),
    createData("The Rock"),
    createData("Trond Viggo Torgersen"),
    createData("Sinnasnekkern")
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
          //editContentComponent={<AddUserForm />}
        />
        <AdminExpansionPanelRoute
          label="Releases"
          icon={<Description />}
          rows={releaseTitles}
          createContentRoute="admin/releases/create"
          editContentRoute="admin/releases/edit/:id"
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
