import { cardDefaultStyle } from "shared/utils";
import { UploadKycButton } from "./button";

export function UploadKycCard() {
  return (
    <div
      className={`
        ${cardDefaultStyle}
        flex-col items-center justify-center
        border-dashed border-naturalGray/30 shadow-none
      `}
    >
      <UploadKycButton />
      <div className="mt-[1.05rem] w-[15rem] text-center text-[0.875rem] text-mineShaft/50">
        If you already passed KYC but didn&apos;t upload its secret file to your
        wallet
      </div>
    </div>
  );
}
