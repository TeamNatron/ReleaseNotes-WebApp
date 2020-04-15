import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";

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
