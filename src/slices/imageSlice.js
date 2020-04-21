import { createAction } from "@reduxjs/toolkit";
import Axios from "axios";

const name = "images/";
export const uploadImagePending = createAction(name + "uploadImagePending");
export const uploadImageError = createAction(name + "uploadImageError");
export const uploadImageSuccess = createAction(name + "uploadImageSuccess");

export const uploadImage = (image, onSuccess, onError) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", image);

  dispatch(uploadImagePending());
  Axios.post("images", formData)
    .then((res) => {
      dispatch(uploadImageSuccess());
      onSuccess(res.data.url);
    })
    .catch((error) => {
      dispatch(uploadImageError(error));
      onError();
    });
};
