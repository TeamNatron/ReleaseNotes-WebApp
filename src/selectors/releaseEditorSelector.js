import { createSelector } from "@reduxjs/toolkit";
import { loadingSelector } from "../slices/loadingSlice";

export const findReleaseById = id =>
  createSelector(
    state => state.releases.items,
    items => {
      if (isNaN(id)) return undefined;
      return items[items.findIndex(r => r.id == id)];
    }
  );

/**
 * Filters out releaseNotes that are already in the release
 * @param {id of release to edit} id
 */
export const initReleaseEditorReleaseNotes = id =>
  createSelector(
    findReleaseById(id),
    loadingSelector,
    state => state.releaseNotes.items,
    (release, loading, releaseNotes) => {
      if (loading) return [];
      if (!id) return releaseNotes;
      if (!release) return [];
      const idsToRemove = release.releaseNotes.map(rn => rn.id);
      return releaseNotes.filter(x => idsToRemove.indexOf(x.id) === -1);
    }
  );
