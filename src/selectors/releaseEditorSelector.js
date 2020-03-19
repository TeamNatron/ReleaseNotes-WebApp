import { createSelector } from "@reduxjs/toolkit";

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
    state => state.releaseNotes.items,
    state => state.loading,
    (release, releaseNotes, loading) => {
      if (loading) return [];
      if (!id) return releaseNotes;
      if (!release) return [];
      const idsToRemove = release.releaseNotes.map(rn => rn.id);
      return releaseNotes.filter(x => idsToRemove.indexOf(x.id) === -1);
    }
  );
