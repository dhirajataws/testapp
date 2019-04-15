import { fileRead } from './fileRead';

export type IMain = () => void
export const main: IMain = () => {
  const output = (fileRead !== undefined)
  return output;
}