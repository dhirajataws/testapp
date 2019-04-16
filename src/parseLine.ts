export const parseLine = (line: string) =>
  line.split(/\\*\-\s\-/i)[0].trim();
  //TODO add error handling if parsing result zero