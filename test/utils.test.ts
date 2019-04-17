import {
  parseLine,
  reducer,
  findMaxTemp
} from "../src/utils";
var testData = require('./testData.json')

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

describe("reducer", () => {
  it("module should exist", () => {
    expect(reducer).toBeDefined();
  })
  it("should return -200", () => {
    expect(reducer({}, 0)).toEqual(-200)
  })
  it("should return greater temp", () => {
    expect(reducer(50, {
      main: {
        temp: 51
      }
    })).toEqual(51);
  })
})

describe("findMaxTemp", () => {
  it("module should exist", () => {
    expect(findMaxTemp).toBeDefined();
  })
  it("should return max temp from list", () => {
    expect(findMaxTemp(testData)).toEqual(288.12)
  })
})