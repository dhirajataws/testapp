export const parseLine = (line: string) => {
  const regex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g
  const matchRegex = regex.exec(line);
  if (!matchRegex || matchRegex.length < 1) {
    throw Error("IPADDRESS_NOT_FOUND");
  } else {
    return matchRegex
  }
}