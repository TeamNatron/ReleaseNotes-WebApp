import { combineReducers } from "redux";
import { loadingReducer } from "./loadingSlice";
import { releaseReducer } from "./releaseSlice";
import { releaseNoteReducer } from "./releaseNoteSlice";
import { errorReducer } from "./errorSlice";
import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { azureReducer } from "./azureSlice";
import { successReducer } from "./successSlice";
import { productsReducer } from "./productsSlice";
import { mappingReducer } from "./mappingSlice";
import { productVersionsReducer } from "./productVersionsSlice";

export default combineReducers({
  products: productsReducer,
  productVersions: productVersionsReducer,
  releaseNotes: releaseNoteReducer,
  releases: releaseReducer,
  loading: loadingReducer,
  error: errorReducer,
  auth: authReducer,
  users: userReducer,
  azure: azureReducer,
  success: successReducer,
  mapping: mappingReducer,
});
