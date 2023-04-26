import { Field } from "shared/ui/field";
import { ReactComponent as ActiveIcon } from "./images/active.svg";
import binanceBgUrl from "./images/binance.svg";
import bitfinexBgUrl from "./images/bitfinex.svg";
import bitsampBgUrl from "./images/bitsamp.svg";
import coinbaseBgUrl from "./images/coinbase.svg";
import krakenBgUrl from "./images/kraken.svg";
import swissborgBgUrl from "./images/swissborg.svg";

export type KYCName =
  | "binance"
  | "coinbase"
  | "swissborg"
  | "bitfinex"
  | "bitsamp"
  | "kraken"
  | "accreditation";

type Props = {
  kyc: KYCName;
  level: string;
  expiration: string;
};

export const CARDS_MAP: {
  [key: string]: { title: string; background?: string };
} = {
  binance: {
    title: "Binance KYC",
    background: binanceBgUrl,
  },
  coinbase: {
    title: "Coinbase KYC",
    background: coinbaseBgUrl,
  },
  swissborg: {
    title: "SwissBorg KYC",
    background: swissborgBgUrl,
  },
  bitfinex: {
    title: "Bitfinex KYC",
    background: bitfinexBgUrl,
  },
  bitsamp: {
    title: "BitStamp KYC",
    background: bitsampBgUrl,
  },
  kraken: {
    title: "Kraken KYC",
    background: krakenBgUrl,
  },
  accreditation: {
    title: "Accreditation Certificate",
  },
};

export function KYCCard({ kyc, level, expiration }: Props) {
  const map = CARDS_MAP[kyc];

  return (
    <div
      className="
        flex h-[14.875rem] w-[23.75rem] flex-col justify-between
        rounded-[0.625rem] border border-naturalGray/20 bg-pampas 
        bg-right-top bg-no-repeat px-[1.875rem]
        py-[1.625rem] shadow-card
      "
      style={{ backgroundImage: `url(${map.background})` }}
    >
      <div className="text-[1.75rem] font-light">{map.title}</div>
      <div className="flex justify-between">
        <Field
          title="KYC-status"
          tooltip="TODO some text"
          value={
            <div className="flex items-center text-sandyBrown">
              Active <ActiveIcon className="ml-[0.5rem]" />
            </div>
          }
        />
        <Field title="KYC-level" value={level} tooltip="TODO some text" />
        <Field title="Expiration date" value={expiration} />
      </div>
    </div>
  );
}
