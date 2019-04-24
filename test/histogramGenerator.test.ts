import {
  reducer,
  IAccumulated,
  IHistObject,
  createHistogramGroups
} from "../src/histogramGenerator";

describe("histogram generator reducer", () => {
  it("should create histogram data", () => {
    const histogramGroups: IHistObject[] = createHistogramGroups(1, 5, 2)//testData.reduce(reducer, accumulator);
    expect(histogramGroups.length).toEqual(2)
    expect(histogramGroups[0]).toEqual({
      min: 1,
      max: 3,
      count: 0
    })
    expect(histogramGroups[1]).toEqual({
      min: 3,
      max: 5,
      count: 0
    })
    const testData = [1, 2, 2.5, 3, 4, 5]
    let accumulated: IAccumulated = {
      active: 0,
      range: createHistogramGroups(1, 5, 2) // start, end, bucketcount
    }
    const withCounter = testData.reduce(reducer, accumulated).range
    expect(withCounter.length).toEqual(2)
    expect(withCounter[0]).toEqual({
      min: 1,
      max: 3,
      count: 4
    })
    expect(withCounter[1]).toEqual({
      min: 3,
      max: 5,
      count: 2
    })
  })
  it("should create histogram data when there are few bucket with no values", () => {
    const histogramGroups: IHistObject[] = createHistogramGroups(1, 5, 2)//testData.reduce(reducer, accumulator);
    expect(histogramGroups.length).toEqual(2)
    expect(histogramGroups[0]).toEqual({
      min: 1,
      max: 3,
      count: 0
    })
    expect(histogramGroups[1]).toEqual({
      min: 3,
      max: 5,
      count: 0
    })
    const testData = [1, 1, 1, 9, 9, 9]
    let accumulated: IAccumulated = {
      active: 0,
      range: createHistogramGroups(1, 9, 3) // start, end, bucketcount
    }
    const withCounter = testData.reduce(reducer, accumulated).range
    expect(withCounter.length).toEqual(3)
    expect(withCounter[0].count).toEqual(3)
    expect(withCounter[1].count).toEqual(0)
    expect(withCounter[2].count).toEqual(3)
  })
})