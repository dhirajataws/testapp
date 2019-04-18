import * as fs from "fs";
import * as readline from "readline";
import { IHistObject } from "./histogramGenerator";

export async function* asyncGenerator() {
  let input: any;
  try {
    input = fs.createReadStream(`${process.argv[2]}`);
    const rl = readline.createInterface({ input });
    for await (const line of rl) {
      yield line;
    }
  } catch (err) {
    throw err;
  } finally {
    input.close();
  }
}
export const fileWrite = (range: IHistObject[]) => {
  let fileWriteStream: any;
  try {
    fileWriteStream = fs.createWriteStream(`${process.argv[3]}`); // TODO create file if not exits and give permission
    fileWriteStream.write(`start    end     count`)
    range.forEach(item => {
      fileWriteStream.write("\n")
      fileWriteStream.write(`${item.min.toFixed(2)}   ${item.max.toFixed(2)}   ${item.count}`)
    })
  } catch (err) {
    throw err;
  } finally {
    fileWriteStream.close()
  }
}