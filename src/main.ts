import {
  asyncGenerator,
  fileWrite
} from './fileUtils';
import {
  parseLine,
  findMaxTemp,
  errorReducer
} from './utils';
import { fetchCoordinates } from "./fetchCoordinates";
import { fetchWeather } from './fetchWeatherInfo';
import {
  reducer as histogramReducer,
  createHistogramGroups,
  IAccumulated,
  IHistObject
} from './histogramGenerator';
import { validator } from "./validate";

interface IController {
  (): Promise<IHistObject[]>
}
export interface IErrorStruct {
  errorMessage: string;
  line: string;
}
export const controller: IController = async () => {
  const maxTempArray: any[] = [];
  let errorArray: IErrorStruct[] = [];
  for await (let line of asyncGenerator()) {
    try {
      const ipAddress: string = parseLine(line)[0] // TODO error handling for parsing failed
      const coordinates = await fetchCoordinates(ipAddress)
      const weatherList = await fetchWeather(
        coordinates.latitude,
        coordinates.longitude
      )
      maxTempArray.push(findMaxTemp(weatherList))
    } catch (err) {
      errorArray = [...errorArray, { line, errorMessage: err.message }]
    }
  }
  console.log(`Summary of Failed Lines :
  ${JSON.stringify(errorArray.reduce(errorReducer, {}))}`);

  errorArray.forEach(item =>
    console.log(`Failed line: ${item.line}
    Failure reason : ${item.errorMessage} `))


  if (maxTempArray && maxTempArray.length > 0) {
    maxTempArray.sort();
    const accumulated: IAccumulated = {
      active: 0,
      range: createHistogramGroups(
        maxTempArray[0],
        maxTempArray[maxTempArray.length - 1],
        parseInt(process.argv[4])
      )
    }
    return maxTempArray.reduce(histogramReducer, accumulated).range
  } else {
    throw new Error("NO_RECORD_PROCESSED");
  }
}

export async function main() {
  try {
    validator() // validates basic configuration
    const range: IHistObject[] = await controller()
    fileWrite(range) // output result to file
  } catch (err) {
    console.log(err.message) // TODO needs logger
  }
};
