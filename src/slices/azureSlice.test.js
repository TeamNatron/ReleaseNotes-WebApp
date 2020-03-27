import { fetchProjects } from "./azureSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";

describe("azure thunks", () => {
  testThunkConformance(fetchProjects);
});
