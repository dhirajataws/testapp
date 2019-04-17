import {
  asyncGenerator,
} from './fileRead';
import { parseLine } from './parseLine';
import { fetchCoordinates } from "./fetchCoordinates";

export type IController = () => void

export const controller: IController = () => {
  (async function () {
    for await (let line of asyncGenerator()) {
      const ipAddress: string = parseLine(line)[0] // TODO error handling for parsing failed
      const coordinates = await fetchCoordinates(ipAddress)
      // fetch temperatures
      // add temp into data
    }
  })();
}
controller()