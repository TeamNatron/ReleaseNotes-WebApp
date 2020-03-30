import { createReducer, createAction } from "@reduxjs/toolkit";
import GlobalAxios from "axios";
import { formatAzurePAT } from "../handlers/tokenFormatter";

// azure axios instance
export const AzureAxios = GlobalAxios.create({
  timeout: 5000
});

// actions
const name = "azure/";
export const getProjectsPending = createAction(name + "getProjectsPending");
export const getProjectsError = createAction(name + "getProjectsError");
export const getProjectsSuccess = createAction(name + "getProjectsSuccess");

export const getReleasesPending = createAction(name + "getReleasesPending");
export const getReleasesError = createAction(name + "getReleasesError");
export const getReleasesSuccess = createAction(name + "getReleasesSuccess");

// reducer
export const azureReducer = createReducer(
  { sucessMsg: "", projects: [], releases: [] },
  {
    [getProjectsSuccess]: (state, action) => {
      state.projects = action.payload.data.value.map(proj => proj.name);
    },
    [getReleasesSuccess]: (state, action) => {
      state.sucessMsg = action.payload.statusText;
      state.releases = action.payload.data.value;
    }
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
export const fetchProjects = params => async dispatch => {
  // create request url
  const instance = "dev.azure.com/" + params.organization;
  const url = "https://" + instance + "/_apis/projects";

  //dispatch
  dispatch(getProjectsPending());
  AzureAxios.get(url, authHeader(params.authToken))
    .then(res => {
      dispatch(getProjectsSuccess({ data: res.data }));
    })
    .catch(error => {
      dispatch(getProjectsError(error));
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

export const fetchReleases = params => async dispatch => {
  // create request url
  const instance =
    "vsrm.dev.azure.com/" + params.organization + "/" + params.project;
  const url = "https://" + instance + "/_apis/release/releases?api-version=5.1";
  const authToken = formatAzurePAT(params.authToken);

  if (params.organization && params.project && params.authToken !== null) {
    //dispatch
    dispatch(getReleasesPending());
    AzureAxios.get(url, authHeader(authToken))
      .then(res => {
        dispatch(
          getReleasesSuccess({ data: res.data, statusText: res.statusText })
        );
      })
      .catch(err => {
        getReleasesError(err);
      });
  }
};

/**
 * @param {String} authToken
 * @example Axios.get(url, authHeader("9u0fu8u94utgj03=="))
 */
const authHeader = authToken => {
  return {
    headers: {
      Authorization: "Basic " + authToken
    }
  };
};
