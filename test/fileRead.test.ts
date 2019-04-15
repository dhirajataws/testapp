import { fileRead } from "../src/fileRead";

describe("fileRead component", () => {
  it("should be defined", () => {
    expect(fileRead).toBeDefined();
    expect(fileRead("test")).toBeTruthy;
  })
})