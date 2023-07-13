import binanceBgPng from "shared/images/cards/kyc/binance-bg.png";
import bitfinexBgPng from "shared/images/cards/kyc/bitfinex-bg.png";
import bitsampBgPng from "shared/images/cards/kyc/bitstamp-bg.png";
import coinbaseBgPng from "shared/images/cards/kyc/coinbase-bg.png";
import krakenBgPng from "shared/images/cards/kyc/kraken-bg.png";
import swissborgBgPng from "shared/images/cards/kyc/swissborg-bg.png";

export type KycType =
  | "binance"
  | "coinbase"
  | "swissborg"
  | "bitfinex"
  | "bitsamp"
  | "kraken"
  | "example";

export const KYC_MAP: Record<
  KycType,
  {
    name: string;
    title: string;
    background: string;
    // logo?: string;
  }
> = {
  binance: {
    name: "Binance",
    title: "Binance KYC",
    background: binanceBgPng,
    // logo: binanceLogoUrl,
  },
  coinbase: {
    name: "Coinbase",
    title: "Coinbase KYC",
    background: coinbaseBgPng,
    // logo: coinbaseLogoUrl,
  },
  swissborg: {
    name: "SwissBorg",
    title: "SwissBorg KYC",
    background: swissborgBgPng,
    // logo: swissborgLogoUrl,
  },
  bitfinex: {
    name: "Bitfinex",
    title: "Bitfinex KYC",
    background: bitfinexBgPng,
    // logo: bitfinexLogoUrl,
  },
  bitsamp: {
    name: "BitStamp",
    title: "BitStamp KYC",
    background: bitsampBgPng,
    // logo: bitsampLogoUrl,
  },
  kraken: {
    name: "Kraken",
    title: "Kraken KYC",
    background: krakenBgPng,
    // logo: krakenLogoUrl,
  },
  example: {
    name: "Example",
    title: "Example zkKYC",
    background: "",
  },
};
