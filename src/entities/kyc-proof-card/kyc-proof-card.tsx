// import { ReactComponent as CheckIcon } from "shared/icons/check.svg";
import { Field } from "shared/ui/field";
import { cardDefaultStyle } from "shared/utils";
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
};

export function KYCProofCard({ kyc, level, expiration }: Props) {
  const map = CARDS_MAP[kyc];

  return (
    <div className={`${cardDefaultStyle} relative  bg-pampas`}>
      <div
        className="absolute left-0 top-0 z-0 h-full w-full bg-right-top  bg-no-repeat shadow-card grayscale"
        style={{ backgroundImage: `url(${map.background})` }}
      ></div>
      <div className="relative z-10 flex h-full w-full flex-col justify-between">
        <div className="">
          <div className="text-[1.75rem] font-light">KYC Proof</div>
          <div className="mt-[0.8rem] w-[80%] text-[0.875rem] text-mineShaft/50">
            This SBT proves that you hold a valid KYC with these fields:
          </div>
        </div>
        <div className="flex justify-between">
          <Field
            title="Provider"
            tooltip="TODO some text"
            value={
              <div className="flex items-center">
                {map.name}{" "}
                <div
                  className="ml-[0.375rem] h-[1rem] w-[1rem] bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${map.logo})` }}
                />
              </div>
            }
          />
          <Field title="KYC-level" value={level} tooltip="TODO some text" />
          <Field title="Expiration date" value={expiration} />
        </div>
      </div>
    </div>
  );
}
