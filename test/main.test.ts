import { controller } from "../src/main";

describe("main", () => {
  it("should expose a main method", () => {
    expect(controller).toBeDefined();
  })
})