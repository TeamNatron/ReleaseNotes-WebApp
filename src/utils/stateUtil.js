// Utils for manipulating redux state with immer

export const updateInArray = (state, action) => {
  let index = state.items.findIndex(obj => obj.id == action.payload.id);
  if (index === -1) {
    state.items.push(action.payload.data);
  } else {
    state.items[index] = action.payload.data;
  }
};
export const deleteInArray = (state, action) => {
  let index = state.items.findIndex(obj => obj.id == action.payload.id);
  if (index !== -1) {
    state.items.splice(index, 1);
  }
};
