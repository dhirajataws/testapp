import { parseLine } from "../src/parseLine";

describe("parseLine", () => {
  it("module should exist", () => {
    expect(parseLine).toBeDefined();
  })
  it("should return parsed IP address", () => {
    const sample: string = `97.68.237.19 - - [03-12-2014:04:59:59 -1000] "POST /api/v2.1 / register HTTP / 1.0" 200 0.61983468`;
    expect(parseLine(sample)[0]).toEqual("97.68.237.19");
  })
  it("should fail parsed IP address", () => {
    expect(parseLine).toBeDefined();
    const sample: string = `97.68.237- - [03-12-2014:04:59:59 -1000] "POST /api/v2.1 / register HTTP / 1.0" 200 0.61983468`;
    try {
      parseLine(sample)
    } catch (err) {
      expect(err.message).toEqual("IPADDRESS_NOT_FOUND");
    }
  })
})