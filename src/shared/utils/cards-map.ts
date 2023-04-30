import binanceLogoUrl from "shared/icons/kyc/binance.svg";
import bitfinexLogoUrl from "shared/icons/kyc/bitfinex.svg";
import bitsampLogoUrl from "shared/icons/kyc/bitsamp.svg";
import coinbaseLogoUrl from "shared/icons/kyc/coinbase.svg";
import krakenLogoUrl from "shared/icons/kyc/kraken.svg";
import swissborgLogoUrl from "shared/icons/kyc/swissborg.svg";
import binanceBgUrl from "shared/images/cards-bg/binance.svg";
import bitfinexBgUrl from "shared/images/cards-bg/bitfinex.svg";
import bitsampBgUrl from "shared/images/cards-bg/bitsamp.svg";
import coinbaseBgUrl from "shared/images/cards-bg/coinbase.svg";
import krakenBgUrl from "shared/images/cards-bg/kraken.svg";
import swissborgBgUrl from "shared/images/cards-bg/swissborg.svg";

export const CARDS_MAP: {
  [key: string]: {
    name: string;
    kycTitle: string;
    background?: string;
    logo?: string;
  };
} = {
  binance: {
    name: "Binance",
    kycTitle: "Binance KYC",
    background: binanceBgUrl,
    logo: binanceLogoUrl,
  },
  coinbase: {
    name: "Coinbase",
    kycTitle: "Coinbase KYC",
    background: coinbaseBgUrl,
    logo: coinbaseLogoUrl,
  },
  swissborg: {
    name: "SwissBorg",
    kycTitle: "SwissBorg KYC",
    background: swissborgBgUrl,
    logo: swissborgLogoUrl,
  },
  bitfinex: {
    name: "Bitfinex",
    kycTitle: "Bitfinex KYC",
    background: bitfinexBgUrl,
    logo: bitfinexLogoUrl,
  },
  bitsamp: {
    name: "BitStamp",
    kycTitle: "BitStamp KYC",
    background: bitsampBgUrl,
    logo: bitsampLogoUrl,
  },
  kraken: {
    name: "Kraken",
    kycTitle: "Kraken KYC",
    background: krakenBgUrl,
    logo: krakenLogoUrl,
  },
  accreditation: {
    name: "Accreditation Certificate",
    kycTitle: "Accreditation Certificate",
  },
};
