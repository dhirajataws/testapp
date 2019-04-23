import {
  validator
} from "../src/validate";
import proxyquire from 'proxyquire';

describe("validate", () => {
  afterEach(() => {
    process.argv[2] = 'test';
    process.argv[3] = 'test';
    process.argv[4] = 'test';
    proxyquire.preserveCache();
  })
  it("module should exist", () => {
    expect(validator).toBeDefined();
  })
  it("should raise error when paramaters missing", () => {
    try {
      proxyquire.noPreserveCache();
      process.argv[2] = '';
      proxyquire('../src/validate.ts', {})
      validator()
    } catch (err) {
      expect(err.message).toEqual("MISSING_PARAMETERS")
    }
  })
})
