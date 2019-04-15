import * as fs from "fs";
import * as readline from "readline";
import * as stream from "stream";

export function readLines({ input }: { input: any }) {
  const output = new stream.PassThrough({ objectMode: true });
  const rl = readline.createInterface({ input });
  rl.on("line", line => {
    output.write(line);
  });
  rl.on("close", () => {
    output.push(null);
  });
  return output;
}

export async function* asyncGenerator() {
  const input = fs.createReadStream(`${__dirname}/../data/iot.log`);
  for await (const line of readLines({ input })) {
    yield line
  }
}
