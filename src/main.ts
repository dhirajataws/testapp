import {
  asyncGenerator,
} from './fileRead';
import { parseLine, findMaxTemp } from './utils';
import { fetchCoordinates } from "./fetchCoordinates";
import { fetchWeather } from './fetchWeatherInfo';

export type IController = () => void

export const controller: IController = () => {
  (async function () {
    const maxTempArray = []
    for await (let line of asyncGenerator()) {
      const ipAddress: string = parseLine(line)[0] // TODO error handling for parsing failed
      const coordinates = await fetchCoordinates(ipAddress)
      const weatherList = await fetchWeather(
        coordinates.latitude,
        coordinates.longitude
      )
      maxTempArray.push(findMaxTemp(weatherList))

      // fetch temperatures
      // add temp into data
    }
  })();
}
controller()