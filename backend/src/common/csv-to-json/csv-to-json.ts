import * as csv from "csvtojson";
import * as toStream from "buffer-to-stream";

export function csvToJson(file: any, headers) {
  return csv({
    headers,
    noheader: false,
    eol: '\n',
    ignoreColumns: /(null)/,
    ignoreEmpty: true,
    delimiter: [',', ';'],
  }).fromStream(toStream(file.buffer));
}