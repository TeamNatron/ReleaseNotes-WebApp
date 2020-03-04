import { combineReducers } from "redux";
import { articlesReducer } from "./articlesReducer";
import { productsReducer } from "./productsReducer";
import { productVersionsReducer } from "./productVersionsReducer";
import { releaseNotesReducer } from "./releaseNotesReducer";

export default combineReducers({
  articles: articlesReducer,
  products: productsReducer,
  productVersions: productVersionsReducer,
  releaseNotes: releaseNotesReducer
});
