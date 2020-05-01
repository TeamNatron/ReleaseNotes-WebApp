import {
  getReleasesSuccess,
  azureReducer,
  fetchProjects,
  getProjectsSuccess,
} from "./azureSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
import { fetchReleases } from "./azureSlice";
import { AzureAxios } from "./azureSlice";

const initialState = {
  sucessMsg: "",
  projects: [],
  releases: [],
};

describe("azureReducer", () => {
  it("should return the initial state", () => {
    expect(azureReducer(undefined, {})).toEqual(initialState);
  });
});

describe("getReleasesSuccess", () => {
  it("should fill all releases", () => {
    const updatedState = azureReducer(
      undefined,
      getReleasesSuccess({ data: dummyReleases })
    );
    expect(updatedState.releases).toEqual(dummyReleases.value);
  });
});

describe("getProjectsSuccess", () => {
  it("should fill all projects", () => {
    const expectedLength = dummyProjects.value.length;
    const updatedState = azureReducer(
      undefined,
      getProjectsSuccess({ data: dummyProjects })
    );
    expect(updatedState.projects.length).toEqual(expectedLength);
    expect(updatedState.projects).toEqual(
      expect.arrayContaining(["Dummy project"])
    );
  });
});

describe("azure Thunks", () => {
  testThunkConformance(
    () => fetchProjects({ authToken: "SKRRTSKRRT", organization: "someOrg" }),
    AzureAxios
  );
  testThunkConformance(
    () =>
      fetchReleases({
        authToken: "Rattatattata",
        organization: "some0rg",
        project: "project_01",
      }),
    AzureAxios
  );
});

describe("Import Release", () => {
  it.todo("should fetchWorkItemIds");
  it.todo("should fetchWorkItems");
  it.todo("should importRelease");
});

// DUMMY DATA
const dummyReleases = {
  count: 17,
  value: [
    {
      id: 18,
      name: "Release-18",
      status: "abandoned",
      createdOn: "2017-06-16T01:36:20.397Z",
      modifiedOn: "2017-06-16T01:36:21.07Z",
      modifiedBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
      },
      createdBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
      },
      variables: {},
      variableGroups: [],
      releaseDefinition: {
        id: 1,
        name: "MyShuttle.CD",
        url:
          "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1",
        _links: {
          self: {
            href:
              "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1",
          },
          web: {
            href:
              "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?definitionId=1",
          },
        },
      },
      description: "Creating Sample release",
      reason: "manual",
      releaseNameFormat: "Release-$(rev:r)",
      keepForever: false,
      definitionSnapshotRevision: 1,
      logsContainerUrl:
        "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/releases/18/logs",
      url:
        "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/releases/18",
      _links: {
        self: {
          href:
            "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/releases/18",
        },
        web: {
          href:
            "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?releaseId=18&_a=release-summary",
        },
      },
      tags: [],
      projectReference: {
        id: "d07908bc-118f-47d2-8a13-ff75601a6b1a",
        name: "MyFirstProject",
      },
      properties: {},
    },
    {
      id: 17,
      name: "Release-17",
      status: "active",
      createdOn: "2017-06-16T01:36:19.35Z",
      modifiedOn: "2017-06-16T01:36:19.35Z",
      modifiedBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
      },
      createdBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
      },
      variables: {},
      variableGroups: [],
      releaseDefinition: {
        id: 1,
        name: "MyShuttle.CD",
        url:
          "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1",
        _links: {
          self: {
            href:
              "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1",
          },
          web: {
            href:
              "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?definitionId=1",
          },
        },
      },
    },
  ],
};

const dummyProjects = {
  count: 1,
  value: [
    {
      id: "kkkkceeeexxx-9999-ffff-bbbb-kkkkceeeexxx",
      name: "Dummy project",
      description: "dummy",
      url:
        "https://dev.azure.com/ReleaseNoteSystem/_apis/projects/kkkkceeeexxx-9999-ffff-bbbb-kkkkceeeexxx",
      state: "wellFormed",
      revision: 20,
      visibility: "public",
      lastUpdateTime: "2020-01-15T14:02:56.87Z",
    },
  ],
};
