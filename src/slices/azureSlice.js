import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";
import { postRelease } from "./releaseSlice";
import { authHeader } from "../utils/azureUtils";

// azure axios instance
export const AzureAxios = GlobalAxios.create({
  timeout: 5000,
});

const API_VERSION = "&api-version=5.1";

// actions
const name = "azure/";
export const getProjectsPending = createAction(name + "getProjectsPending");
export const getProjectsError = createAction(name + "getProjectsError");
export const getProjectsSuccess = createAction(name + "getProjectsSuccess");

export const getReleasesPending = createAction(name + "getReleasesPending");
export const getReleasesError = createAction(name + "getReleasesError");
export const getReleasesSuccess = createAction(name + "getReleasesSuccess");

export const importReleasePending = createAction(name + "importReleasePending");
export const importReleaseError = createAction(name + "importReleaseError");
export const importReleaseSuccess = createAction(name + "importReleaseSuccess");

// reducer
export const azureReducer = createReducer(
  { sucessMsg: "", projects: [], releases: [] },
  {
    [getProjectsSuccess]: (state, action) => {
      state.projects = action.payload.data.value.map((proj) => proj.name);
    },
    [getReleasesSuccess]: (state, action) => {
      state.sucessMsg = action.payload.statusText;
      state.releases = action.payload.data.value;
    },
  }
);

// azure api url format
// https://{instance}[/{team-project}]/_apis[/{area}]/{resource}?api-version={version}

// devops api doc
// https://docs.microsoft.com/en-us/rest/api/azure/devops/?view=azure-devops-rest-5.1

// thunks

/**
 *
 * @param {Object} params Object of required parameters
 * @param {String} params.organization The organization
 * @param {String} params.authToken The authenication token
 *
 * @example
 *          const params = useSelector(azureApiSelector)
 *          useDispatch(fetchProjects(params))
 */
export const fetchProjects = (params) => async (dispatch) => {
  // create request url
  const instance = "dev.azure.com/" + params.organization;
  const url = "https://" + instance + "/_apis/projects";

  //dispatch
  dispatch(getProjectsPending());
  AzureAxios.get(url, authHeader(params.authToken))
    .then((res) => {
      dispatch(getProjectsSuccess({ data: res.data }));
    })
    .catch(() => {
      dispatch(getProjectsError());
    });
};

/**
 * Fetches releases related to specified project and organization
 *
 * @param {Object} params Object of required parameters
 * @param {String} params.organization The organization
 * @param {String} params.project The project
 * @param {String} params.authToken The authenication token
 *
 */

export const fetchReleases = (params) => async (dispatch) => {
  // create request url
  const instance =
    "vsrm.dev.azure.com/" + params.organization + "/" + params.project;
  const url = "https://" + instance + "/_apis/release/releases?api-version=5.1";
  const authToken = params.authToken;

  if (params.organization && params.project && params.authToken !== null) {
    //dispatch
    dispatch(getReleasesPending());
    AzureAxios.get(url, authHeader(authToken))
      .then((res) => {
        dispatch(getReleasesSuccess({ data: res.data }));
      })
      .catch((err) => {
        getReleasesError(err);
      });
  }
};

/**
 *
 * @param {*} project The project
 * @param {Object} params Object of required parameters
 * @param {String} params.organization The organization
 * @param {String} params.authToken The authenication token
 * @param {*} id Release id
 */
export const fetchWorkItemIds = async (project, params, id) => {
  // create request url
  const instance =
    "vsrm.dev.azure.com/" +
    params.organization +
    "/" +
    project.replace(/ /g, "%20");
  const url =
    "https://" + instance + "/_apis/release/releases/" + id + "/workitems";
  const authToken = params.authToken;

  return AzureAxios.get(url, authHeader(authToken));
};

/**
 *
 * @param {*} project The Project
 * @param {Object} params Object of required parameters
 * @param {String} params.organization The organization
 * @param {String} params.authToken The authenication token
 * @param {*} ids
 */
export const fetchWorkItems = async (project, params, ids) => {
  // https://dev.azure.com/{organization}/{project}/_apis/wit/workitems?ids={ids}&api-version=5.1
  // create request url
  const instance =
    "dev.azure.com/" + params.organization + "/" + project.replace(/ /g, "%20");
  const url =
    "https://" + instance + "/_apis/wit/workitems?ids=" + ids + API_VERSION;
  const authToken = params.authToken;

  return AzureAxios.get(url, authHeader(authToken));
};

/**
 *
 * @param {*} project The project
 * @param {Object} params Object of required parameters
 * @param {String} params.organization The organization
 * @param {String} params.authToken The authenication token
 * @param {*} id The id of the release
 * @param {*} title The title of the Release
 */
export const importRelease = (
  productVersionId,
  project,
  params,
  id,
  title
) => async (dispatch) => {
  dispatch(importReleasePending());

  // Get Ids of work items
  fetchWorkItemIds(project, params, id)
    .then((res) => {
      var ids = res.data.value.map(({ id }) => id);

      if (ids === undefined || ids.length === 0) {
        throw new Error("Fant ingen assosierte WorkItems.");
      }

      // Get data of each work item
      fetchWorkItems(project, params, ids)
        .then((res) => {
          var rawWorkItems = res.data.value;

          // Create new release
          const release = {
            title: title,
            isPublic: false,
            productVersionId: productVersionId,
            releaseNotes: rawWorkItems,
          };

          // all requests to azure api are successful
          dispatch(importReleaseSuccess());

          // post the new
          dispatch(postRelease(release));
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) =>
      dispatch(
        importReleaseError({
          message:
            "En feil oppstod ved innhenting av release fra azure: " +
            err.message,
        })
      )
    );
};
