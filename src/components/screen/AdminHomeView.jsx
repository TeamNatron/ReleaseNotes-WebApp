import { useSelector, useDispatch } from "react-redux";
import AdminExpansionPanelRoute from "../shared/AdminExpansionPanelRoute";
import AdminExpansionPanelModal from "../shared/AdminExpansionPanelModal";

import React, { useEffect } from "react";
import { DesktopWindows, PermIdentity, Description } from "@material-ui/icons";
import {
  putReleaseById,
  deleteRelease,
  fetchReleases,
} from "../../slices/releaseSlice";
import {
  putReleaseNote,
  deleteReleaseNote,
  fetchReleaseNotes,
} from "../../slices/releaseNoteSlice";
import { fetchProducts } from "../../slices/productsSlice";
import { createSelector } from "@reduxjs/toolkit";
import { createData } from "../shared/AdminTableRow";

import EditProductForm from "../adminpanel/EditProductForm";
import AddProductForm from "../adminpanel/AddProductForm";
import AddUserForm from "../adminpanel/AddUserForm";
import ChangePasswordForm from "../adminpanel/ChangePasswordForm";
import { fetchUsers } from "../../slices/userSlice";

const AdminHomeView = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleases());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReleaseNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const releaseTitles = useSelector(releaseTitlesSelector);
  const productTitles = useSelector(productTitlesSelector);
  const userRows = useSelector(userRowsSelector);
  const releaseNoteRows = useSelector(releaseNoteRowsSelector);

  return (
    <>
      <AdminExpansionPanelModal
        label="Produkter"
        icon={<DesktopWindows />}
        rows={productTitles}
        createContentComponent={<AddProductForm />}
        editContentComponent={<EditProductForm />}
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
        isRelease={true}
        createContentRoute="/releases/create"
        editContentRoute="/releases/edit/:id"
        onUpdate={putReleaseById}
        onDelete={deleteRelease}
      />
      <AdminExpansionPanelRoute
        label="Release notes"
        icon={<Description />}
        rows={releaseNoteRows}
        isRelease={false}
        createContentRoute="/releasenotes/create"
        editContentRoute="/releasenotes/edit/:id"
        onUpdate={putReleaseNote}
        onDelete={deleteReleaseNote}
      />
    </>
  );
};
export default AdminHomeView;

const releaseTitlesSelector = createSelector(
  (state) => state.releases.items,
  (items) => items.map((r) => createData(r, r.title, r.id, r.isPublic))
);

const productTitlesSelector = createSelector(
  (state) => state.products.items,
  (items) => items.map((p) => createData(p, p.name, p.id))
);

const userRowsSelector = createSelector(
  (state) => state.users.items,
  (items) => items.map((u) => createData(u, u.email, u.id))
);

const releaseNoteRowsSelector = createSelector(
  (state) => state.releaseNotes.items,
  (items) =>
    items.map((r) => {
      return createData(
        r,
        r.title === "" ? "Release note #" + r.id : r.title,
        r.id,
        r.isPublic
      );
    })
);
