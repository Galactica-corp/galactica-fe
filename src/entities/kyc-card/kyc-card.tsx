import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { Field } from "shared/ui/field";
import { CARDS_MAP } from "shared/utils/cards-map";

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
  isActive?: boolean;
};

export function KYCCard({ kyc, level, expiration, isActive }: Props) {
  const map = CARDS_MAP[kyc];

  return (
    <div className="card" style={{ backgroundImage: `url(${map.background})` }}>
      <div className="text-[1.75rem] font-light">{map.kycTitle}</div>
      <div className="flex justify-between">
        <Field
          title="KYC-status"
          tooltip="TODO some text"
          value={
            <>
              {isActive ? (
                <div className="flex items-center text-sandyBrown">
                  Active <CheckIcon className="ml-[0.5rem]" />
                </div>
              ) : (
                "Expired"
              )}
            </>
          }
        />
        <Field title="KYC-level" value={level} tooltip="TODO some text" />
        <Field title="Expiration date" value={expiration} />
      </div>
    </div>
  );
}
