import { combineReducers } from "redux";
import { articlesReducer } from "./articlesReducer";
import { productsReducer } from "./productsReducer";
import { productVersionsReducer } from "./productVersionsReducer";
import { loadingReducer } from "../slices/loadingSlice";
import { releaseReducer } from "../slices/releaseSlice";
import { releaseNoteReducer } from "../slices/releaseNoteSlice";
import { errorReducer } from "../slices/errorSlice";
import { authReducer } from "../slices/authSlice";

export default combineReducers({
  articles: articlesReducer,
  products: productsReducer,
  productVersions: productVersionsReducer,
  releaseNotes: releaseNoteReducer,
  releases: releaseReducer,
  loading: loadingReducer,
  error: errorReducer,
  auth: authReducer
});
