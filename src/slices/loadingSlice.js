import { createSelector } from "@reduxjs/toolkit";

//medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
/**
 * Reducer to handle all loading flags
 * @param {*} state
 * @param {*} action
 */
export const loadingReducer = (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)(Pending|Success|Error)/.exec(type);

  // not a *_REQUEST / *_SUCCESS /  *_FAILURE actions, so we ignore them
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "Pending"
  };
};

/**
 * Selector that returns a bool telling if anything is currently loading
 */
export const loadingSelector = state => Object.values(state.loading).includes(true);
