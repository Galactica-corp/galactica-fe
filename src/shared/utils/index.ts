export { tw } from "./tw";
export { shortenAddress } from "./shorten-address";
export { sleep } from "./sleep";
export { parseJSONFile } from "./parse-file-to-json";

export function formatDateFromUnixTime(unixTime: string | number) {
  const date = new Date(Number(unixTime) * 1000);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

export function unixTimeMoreThenNow(unixTime: string | number) {
  const date = new Date(Number(unixTime) * 1000);
  const nowDate = new Date();

  return date > nowDate;
}
