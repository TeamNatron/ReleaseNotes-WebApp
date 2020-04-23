import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import GlobalAxios from "axios";
import Axios from "axios";
import { authHeader } from "../utils/azureUtils";

// azure axios instance
export const AzureAxios = GlobalAxios.create({
  timeout: 5000,
});

const ERROR_WORK_ITEM_TYPE_NOT_PROVIDED = "You need to provide a WormItemType!";

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

export const putMappingPending = createAction(NAME + "putMappingPending");
export const putMappingError = createAction(NAME + "putMappingError");
export const putMappingSuccess = createAction(NAME + "putMappingSuccess");

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
  [putMappingSuccess]: (state, action) => {
    //todo implement update state with new mapping
    const incomingObject = action.payload.data.entity;
    const index = state.RNSMappings.entity.findIndex((obj) => {
      return obj.id === incomingObject.id;
    });
    if (index !== -1) {
      state.RNSMappings.entity[index].azureDevOpsField =
        incomingObject.azureDevOpsField;
    }
  },
});

// THUNKS
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

export const fetchRNSMappings = (type) => async (dispatch) => {
  if (!type || type === "") throw Error(ERROR_WORK_ITEM_TYPE_NOT_PROVIDED);

  const url = "/MappableFields?mapped&type=" + type;

  dispatch(fetchRNSMappingsPending());
  Axios.get(url)
    .then((res) => {
      dispatch(fetchRNSMappingsSuccess({ data: res.data }));
    })
    .catch(() => {
      dispatch(fetchRNSMappingsError());
    });
};

export const putMapping = (id, data, workItemType) => async (dispatch) => {
  if (!workItemType || workItemType === "")
    throw Error(ERROR_WORK_ITEM_TYPE_NOT_PROVIDED);
  const url = "/MappableFields/" + id;
  const object = { azureDevOpsField: data };

  dispatch(putMappingPending());
  Axios.put(url, object)
    .then((res) => {
      dispatch(
        putMappingSuccess({
          data: res.data,
          successMsg: res.data.message,
        })
      );
    })
    .catch((err) => {
      dispatch(putMappingError(err));
    });
};

// SELECTORS
export const RNSFieldsSelector = createSelector(
  (state) => {
    if (!state) return [];
    return state.mapping.RNSMappable;
  },
  (fields) => {
    return fields;
  }
);

export const RNSTableFieldSelector = createSelector(
  RNSFieldsSelector,
  (fields) =>
    fields.map((obj) => {
      return { rnsFieldName: obj.name };
    })
);

export const AZDFieldSelector = createSelector(
  (state) => {
    if (!state) return [];
    return state.mapping.AZDMappable;
  },
  (fields) => {
    return fields;
  }
);

export const AZDTableFieldSelector = createSelector(
  AZDFieldSelector,
  (fields) => {
    let obj = {};
    for (const [i, value] of fields.entries()) {
      obj[i] = value;
    }
    return obj;
  }
);

export const rnsFieldMappingSelector = createSelector(
  (state) => {
    if (!state) return {};
    return state.mapping.RNSMappings;
  },
  (mappings) => {
    return mappings.entity;
  }
);

export const rnsMappingsTableFields = createSelector(
  rnsFieldMappingSelector,
  (fields) => {
    if (!fields) return;
    return fields.map((obj) => ({
      rnsFieldName: obj.mappableField,
      azureDevOpsField: obj.azureDevOpsField,
    }));
  }
);
