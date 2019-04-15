import * as fs from "fs";

export type IFileRead = (path: string) => void

export const fileRead: IFileRead = (path) => {
  return fs !== undefined;
}