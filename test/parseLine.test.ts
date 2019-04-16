import { parseLine } from "../src/parseLine";

describe("parseLine", () => {
  it("should return parsed IP address", () => {
    expect(parseLine).toBeDefined();
    const sample: string = `97.68.237.19 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1 / register HTTP / 1.0" 200 0.61983468`;
    expect(parseLine(sample)).toEqual("97.68.237.19");
  })
})