import {
  getReleasesSuccess,
  azureReducer,
  fetchProjects,
  getProjectsSuccess
} from "./azureSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
import { fetchReleases, createWorkItem } from "./azureSlice";
import { AzureAxios } from "./azureSlice";

const initialState = {
  sucessMsg: "",
  projects: [],
  releases: []
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
        project: "project_01"
      }),
    AzureAxios
  );
});

describe("Import Release", () => {
  it("Should return mapped Work Item", async () => {
    const workItem = createWorkItem(dummyWorkItemRaw);
    expect(workItem).toEqual(mappedWorkitem);
  });
  it.todo("should fetchWorkItemIds");
  it.todo("should fetchWorkItems");
  it.todo("should importRelease");
});

// DUMMY DATA
const mappedWorkitem = {
  WorkItemId: 224,
  WorkItemTitle:
    "Som en administrator kan jeg legge til Autentiserings-informasjon til Azure Devops.",
  ClosedDate: "2020-03-25T16:22:24.503Z",
  WorkItemDescriptionHtml:
    '<div>Wireframe:</div><div><a href="https://confluence.uials.no/pages/viewpage.action?pageId=57378685">https://confluence.uials.no/pages/viewpage.action?pageId=57378685</a></div><div><br></div><div>ERD:</div><div><a href="https://confluence.uials.no/pages/viewpage.action?pageId=57377417">https://confluence.uials.no/pages/viewpage.action?pageId=57377417</a><br></div>',
  AuthorName: "Markus Randa",
  AuthorEmail: "markuran@ntnu.no"
};

const dummyWorkItemRaw = {
  id: 224,
  rev: 10,
  fields: {
    "System.CreatedDate": "2020-03-25T16:22:24.503Z",
    "System.CreatedBy": {
      displayName: "Markus Randa",
      url:
        "https://spsprodweu1.vssps.visualstudio.com/A025f0995-ba99-4e30-998a-739dc40106c6/_apis/Identities/daab4d46-973a-64b4-9795-742508e96bfc",
      _links: {
        avatar: {
          href:
            "https://dev.azure.com/ReleaseNoteSystem/_apis/GraphProfile/MemberAvatars/aad.ZGFhYjRkNDYtOTczYS03NGI0LTk3OTUtNzQyNTA4ZTk2YmZj"
        }
      },
      id: "daab4d46-973a-64b4-9795-742508e96bfc",
      uniqueName: "markuran@ntnu.no",
      imageUrl:
        "https://dev.azure.com/ReleaseNoteSystem/_apis/GraphProfile/MemberAvatars/aad.ZGFhYjRkNDYtOTczYS03NGI0LTk3OTUtNzQyNTA4ZTk2YmZj",
      descriptor: "aad.ZGFhYjRkNDYtOTczYS03NGI0LTk3OTUtNzQyNTA4ZTk2YmZj"
    },
    "System.Title":
      "Som en administrator kan jeg legge til Autentiserings-informasjon til Azure Devops.",
    "System.Description":
      '<div>Wireframe:</div><div><a href="https://confluence.uials.no/pages/viewpage.action?pageId=57378685">https://confluence.uials.no/pages/viewpage.action?pageId=57378685</a></div><div><br></div><div>ERD:</div><div><a href="https://confluence.uials.no/pages/viewpage.action?pageId=57377417">https://confluence.uials.no/pages/viewpage.action?pageId=57377417</a><br></div>'
  },
  url: "https://dev.azure.com/ReleaseNoteSystem/_apis/wit/workItems/224"
};

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
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227"
      },
      createdBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227"
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
              "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1"
          },
          web: {
            href:
              "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?definitionId=1"
          }
        }
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
            "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/releases/18"
        },
        web: {
          href:
            "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?releaseId=18&_a=release-summary"
        }
      },
      tags: [],
      projectReference: {
        id: "d07908bc-118f-47d2-8a13-ff75601a6b1a",
        name: "MyFirstProject"
      },
      properties: {}
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
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227"
      },
      createdBy: {
        id: "4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        displayName: "Chuck Reinhart",
        uniqueName: "fabfiber@outlook.com",
        url:
          "https://vssps.dev.azure.com/fabrikam/_apis/Identities/4adb1680-0eac-6149-b5ee-fc8b4f6ca227",
        imageUrl:
          "https://dev.azure.com/fabrikam/_api/_common/identityImage?id=4adb1680-0eac-6149-b5ee-fc8b4f6ca227"
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
              "https://vsrm.dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_apis/Release/definitions/1"
          },
          web: {
            href:
              "https://dev.azure.com/fabrikam/d07908bc-118f-47d2-8a13-ff75601a6b1a/_release?definitionId=1"
          }
        }
      }
    }
  ]
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
      lastUpdateTime: "2020-01-15T14:02:56.87Z"
    }
  ]
};
