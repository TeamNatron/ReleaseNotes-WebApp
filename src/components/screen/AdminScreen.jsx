import React, { useEffect } from "react";
import { Container, Button, Box } from "@material-ui/core";
import { PermIdentity, DesktopWindows, Description } from "@material-ui/icons";
import PageContainer from "../shared/PageContainer";
import Ingress from "../shared/Ingress";
import ScreenTitle from "../shared/ScreenTitle";
import SpacedDivider from "../shared/SpacedDivider";
import AddUserForm from "../adminpanel/AddUserForm";
import AddProductForm from "../adminpanel/AddProductForm";
import AdminExpansionPanel from "../shared/AdminExpansionPanel";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import { fetchArticles } from "../../actions/articleActions";
import styled from "styled-components";
import { useHistory } from "react-router";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const createData = name => {
    return { name };
  };

  const releaseTitles = useSelector(state =>
    state.articles.items.map(a => createData(a.title))
  );
  const productTitles = useSelector(state =>
    state.products.items.map(p => createData(p.name))
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
        <AdminExpansionPanel
          label="Brukere"
          icon={<PermIdentity />}
          rows={dummyUsers}
          createContentComponent={<AddUserForm />}
          //editContentComponent={<AddUserForm />}
        />
        <AdminExpansionPanel
          label="Releases"
          icon={<Description />}
          rows={releaseTitles}
          //createContentComponent={<AddReleaseForm />}
          //editContentComponent={<AddReleaseForm />}
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
