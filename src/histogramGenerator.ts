export interface IHistObject {
  min: number,
  max: number,
  count: number
}
export interface IAccumulated {
  active: number,
  range: IHistObject[]
}

export const reducer = (accumulated: IAccumulated, item: number) => {
  // TODO use spread operator
  if (item <= accumulated.range[accumulated.active].max) {
    accumulated.range[accumulated.active].count = accumulated.range[accumulated.active].count + 1;
  }
  else {
    accumulated.range[accumulated.active + 1].count = accumulated.range[accumulated.active + 1].count + 1;
    accumulated.active = accumulated.active + 1;
  }
  return accumulated
}

export const createHistogramGroups = (start: number,
  end: number,
  bucketCount: number): IHistObject[] => {
  const interval = (end - start) / bucketCount;
  let counter: number = 0;
  let range: IHistObject[] = [{
    min: start,
    max: start + interval,
    count: 0
  }]
  for (counter = 1; counter < bucketCount - 1; counter++) {
    range = [...range, {
      min: start + interval * counter,
      max: start + interval * (counter + 1),
      count: 0
    }]
  }
  return [...range, { // add last group
    min: start + interval * counter,
    max: end,
    count: 0
  }]
}


