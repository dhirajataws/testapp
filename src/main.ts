import {
  asyncGenerator,
} from './fileRead';
import { parseLine } from './parseLine';

export type IController = () => void

export const controller: IController = () => {
  (async function () {
    for await (let line of asyncGenerator()) {
      parseLine(line)
    }
  })();
}