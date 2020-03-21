import { fetchProducts } from "./productActions";
import { testThunkConformance } from "../utils/test/testThunkConformance";

describe("async actions", () => {
  testThunkConformance(fetchProducts);
});
