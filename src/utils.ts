import moment from 'moment';
import { IErrorStruct } from "./main";

export const parseLine = (line: string) => {
  const regex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g
  const matchRegex = regex.exec(line);
  if (!matchRegex || matchRegex.length < 1) {
    throw new Error("IPADDRESS_NOT_FOUND");
  } else {
    return matchRegex
  }
}

const filterTommorrowWrapper = () => {
  const searchTommorowDate = moment().add(1, "day").format("YYYY-MM-DD");
  return (row: any) => {
    if (row.dt_txt.search(searchTommorowDate))
      return true;
    else
      return false;
  }
}
//TODO add types for accumulator and currentValue
export const reducer = (accumulator: any, currentValue: any) => {
  if (currentValue === 0)
    return -200;
  if (currentValue.main.temp > accumulator)
    accumulator = currentValue.main.temp
  return accumulator
}
export const findMaxTemp = (input: any) =>
  input.list.filter(filterTommorrowWrapper()).reduce(reducer, 0)

export const errorReducer = (accumulator: any, currentValue: IErrorStruct) => {
  if (accumulator[currentValue.errorMessage]) {
    accumulator[currentValue.errorMessage] = accumulator[currentValue.errorMessage] + 1;
  } else {
    accumulator[currentValue.errorMessage] = 1;
  }
  return accumulator
}
