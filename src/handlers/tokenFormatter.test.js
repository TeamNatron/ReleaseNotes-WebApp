import { formatAzurePAT } from "./tokenFormatter";

it("Should return empty upon missing param", () => {
  expect(formatAzurePAT("admin@ungspiller.no")).toEqual("");
});

it("Should return properly formatted token", () => {
  expect(
    formatAzurePAT(
      "markuran@ntnu.no",
      "o5h5g7i25osmn2vppdqhh4tkvk7oi3nehbpgtifv4me2xgalr7dq"
    )
  ).toEqual(
    "bWFya3VyYW5AbnRudS5ubzpvNWg1ZzdpMjVvc21uMnZwcGRxaGg0dGt2azdvaTNuZWhicGd0aWZ2NG1lMnhnYWxyN2Rx"
  );
});
