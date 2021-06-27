import { csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
  return function (d) {
    d.date = parse(d.time);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse("%d-%m-%Y");

export function fetchData() {
  const promiseMSFT = fetch("http://localhost:8000/reliance.csv")
    .then((response) => response.text())
    .then((data) => csvParse(data, parseData(parseDate)));
  return promiseMSFT;
}
