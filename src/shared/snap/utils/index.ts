import BigNumber from "bignumber.js";

export function fromHexToDec(hexIn: string): string {
  if (hexIn.startsWith("0x")) {
    return new BigNumber(hexIn.slice(2).toUpperCase(), 16).toString(10);
  }
  return new BigNumber(hexIn, 16).toString(10);
}

export function fromDecToHex(dec: string, withPrefix = false): string {
  if (withPrefix) {
    return `0x${new BigNumber(dec, 10).toString(16)}`;
  }
  return new BigNumber(dec, 10).toString(16);
}
