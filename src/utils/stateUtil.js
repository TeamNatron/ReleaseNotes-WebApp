// Utils for manipulating redux state with immer

export const updateItems = (state, action) => {
  updateInArray(state.items, action.payload.id, action.payload.data);
};

export const deleteItem = (state, action) => {
  deleteInArray(state.items, action.payload.id);
};

export const deleteInArray = (arr, id) => {
  let index = arr.findIndex(obj => obj.id == id);
  if (index !== -1) {
    arr.splice(index, 1);
  }
};

export const updateInArray = (arr, id, data) => {
  let index = arr.findIndex(obj => obj.id == id);
  if (index === -1) {
    arr.push(data);
  } else {
    arr[index] = data;
  }
};
