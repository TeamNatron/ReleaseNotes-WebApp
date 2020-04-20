import React from "react";
import ReleaseNoteEditorScreen from "./ReleaseNoteEditorScreen";
import { testScreenConformance } from "../../utils/test/testScreenConformance";

describe("<ReleaseNoteEditorScreen />", () => {
  testScreenConformance(<ReleaseNoteEditorScreen />);
});
