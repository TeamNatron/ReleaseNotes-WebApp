import { classifyReleaseNote } from "./releaseNoteUtil";

describe("releaseNoteUtil", () => {
  it("returns FULL when there is text is description and title", () => {
    const note = {
      title: "TEST ME",
      ingress: "",
      description:
        '<p>Release note med bildre</p><p></p><img src="blob:http://localhost:3000/09558ba1-b879-4e15-8b1c-209387fb3d3e" alt="undefined" style="height: auto;width: auto"/><p></p>',
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("FULL");
  });
  it("is FULL when there is an image and no text", () => {
    const note = {
      title: "TEST ME",
      ingress: "",
      description:
        '<p></p><p></p><img src="blob:http://localhost:3000/09558ba1-b879-4e15-8b1c-209387fb3d3e" alt="undefined" style="height: auto;width: auto"/><p></p>',
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("FULL");
  });
  it("is FULL when there is only image and no text", () => {
    const note = {
      title: "TEST ME",
      ingress: "",
      description:
        '<img src="blob:http://localhost:3000/09558ba1-b879-4e15-8b1c-209387fb3d3e" alt="undefined" style="height: auto;width: auto"/>',
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("FULL");
  });
  it("is undefined when description only has empty html tags", () => {
    const note = {
      title: "",
      ingress: "",
      description: "<p></p><p></p><p></p>",
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("DENSE");
  });

  it("is not undefined when a tag has text ", () => {
    const note = {
      title: "TEST ME",
      ingress: "",
      description: "<p>Hello world </p><p></p><p></p>",
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("FULL");
  });
  it("works with undefined fields ", () => {
    const note = {
      title: undefined,
      ingress: undefined,
      description: undefined,
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("DENSE");
  });
  it("returns dense", () => {
    const note = {
      title: undefined,
      ingress: undefined,
      description: "<p>Compelling description</p>",
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("DENSE");
  });
  it("doenst accidentally mutate parameters", () => {
    const note = {
      title: "Newest release note",
      ingress: "Interesting ingress",
      description: "<p>Compelling description</p>",
    };
    const noteCopy = JSON.parse(JSON.stringify(note));
    classifyReleaseNote(note);
    expect(note).toEqual(noteCopy);
  });

  it("is not undefined when description is normal string", () => {
    const note = {
      title: "Newest release note",
      ingress: "Interesting ingress",
      description: "Compelling description",
    };
    const result = classifyReleaseNote(note);
    expect(result).toEqual("FULL");
  });
});
