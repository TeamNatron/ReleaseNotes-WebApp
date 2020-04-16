import { render } from "@testing-library/react";
import ReleaseNotePreview from "./ReleaseNotePreview";
import React from "react";

describe("ReleaseNotePreview", () => {
  it("Renders full note", () => {
    const note = {
      title: "TEST ME",
      ingress: "INGRESS",
      description:
        '<p>Release note med bildre</p><p></p><img src="blob:http://localhost:3000/09558ba1-b879-4e15-8b1c-209387fb3d3e" alt="undefined" style="height: auto;width: auto"/><p></p>',
    };
    const rendered = render(<ReleaseNotePreview note={note} />);
    rendered.getByText(note.title);
    rendered.getByText(note.ingress);
  });
  it("Renders dense note", () => {
    const note = {
      title: "",
      ingress: "",
      description:
        '<p>Release note med bildre</p><p></p><img src="blob:http://localhost:3000/09558ba1-b879-4e15-8b1c-209387fb3d3e" alt="undefined" style="height: auto;width: auto"/><p></p>',
    };
    const rendered = render(<ReleaseNotePreview note={note} />);
    rendered.getByText("Release note med bildre");
  });
  it("Renders dense note with plain string description", () => {
    const note = {
      title: "",
      ingress: "",
      description: "Beveren er det eneste pattedyret som legger egg",
    };
    const rendered = render(<ReleaseNotePreview note={note} />);
    rendered.getByText(note.description);
  });
});
