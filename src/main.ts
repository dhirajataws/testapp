import { fileRead } from './fileRead';

export type IMain = () => void
export const main: IMain = () => {
  return (fileRead !== undefined)
}