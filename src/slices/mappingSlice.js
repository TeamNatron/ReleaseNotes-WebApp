import { createAction, createReducer } from "@reduxjs/toolkit";
import GlobalAxios from "axios";
import Axios from "axios";
import { authHeader } from "../utils/azureUtils";

// azure axios instance
export const AzureAxios = GlobalAxios.create({
  timeout: 5000,
});

/*
    RNS == Release Note System
    AZD == Azure DevOps
*/
const NAME = "mappable/";

const RNS_MAPPABLE = NAME + "RNS/";
export const fetchRNSMappablePending = createAction(
  RNS_MAPPABLE + "getPending"
);
export const fetchRNSMappableError = createAction(RNS_MAPPABLE + "getError");
export const fetchRNSMappableSuccess = createAction(
  RNS_MAPPABLE + "getSuccess"
);

const AZD_MAPPABLE = NAME + "AZD/";
export const fetchAZDMappablePending = createAction(
  AZD_MAPPABLE + "getPending"
);
export const fetchAZDMappableError = createAction(AZD_MAPPABLE + "getError");
export const fetchAZDMappableSuccess = createAction(
  AZD_MAPPABLE + "getSuccess"
);

const RNS_MAPPING = NAME + "RNSMappings/";
export const fetchRNSMappingsPending = createAction(RNS_MAPPING + "getPending");
export const fetchRNSMappingsError = createAction(RNS_MAPPING + "getError");
export const fetchRNSMappingsSuccess = createAction(RNS_MAPPING + "getSuccess");

export const putMappingPending = createAction(
  NAME + "postProductVersionPending"
);
export const putMappingError = createAction(NAME + "postProductVersionError");
export const putMappingSuccess = createAction(
  NAME + "postProductVersionSuccess"
);

export const initialState = {
  RNSMappable: [],
  AZDMappable: [],
  RNSMappings: [],
};

export const mappingReducer = createReducer(initialState, {
  [fetchRNSMappableSuccess]: (state, action) => {
    state.RNSMappable = action.payload.data;
  },
  [fetchAZDMappableSuccess]: (state, action) => {
    state.AZDMappable = action.payload.data;
  },
  [fetchRNSMappingsSuccess]: (state, action) => {
    state.RNSMappings = action.payload.data;
  },
});

export const fetchRNSMappable = () => async (dispatch) => {
  dispatch(fetchRNSMappablePending());
  Axios.get("mappablefields/")
    .then((res) => {
      dispatch(fetchRNSMappableSuccess({ data: res.data.entity }));
    })
    .catch((error) => {
      dispatch(fetchRNSMappableError(error));
    });
};

export const fetchAZDMappable = (authToken, project, org, itemType) => async (
  dispatch
) => {
  const url = buildWorkitemTypeURL(project, org, itemType);

  dispatch(fetchAZDMappablePending());

  AzureAxios.get(url, authHeader(authToken))
    .then((res) => {
      console.log(authHeader(authToken));
      console.log(res);
      fetchFieldsOfWorkItem(res.data, authToken, dispatch);
    })
    .catch((error) => {
      var errMsg = error;
      if (error.payload?.message) errMsg = error.payload.message;
      dispatch(fetchAZDMappableError(errMsg));
    });
};

const fetchFieldsOfWorkItem = (data, authParams, dispatch) => {
  AzureAxios.get(data._links.workItemType.href, authHeader(authParams))
    .then((res) => {
      var fields = parseFieldsWorkItem(res.data);
      if (!fields) throw new Error("No fields for given Work Item");
      dispatch(fetchAZDMappableSuccess({ data: fields }));
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const parseFieldsWorkItem = (data) => {
  return data.fields.map((field) => field.name);
};

const buildWorkitemTypeURL = (project, org, itemType) => {
  return (
    "https://dev.azure.com/" +
    org +
    "/" +
    project +
    "/_apis/wit/workitems/$" +
    itemType +
    "?api-version=5.1"
  );
};
